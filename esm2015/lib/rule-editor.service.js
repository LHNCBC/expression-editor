import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UNIT_CONVERSION } from './units';
import * as i0 from "@angular/core";
export class RuleEditorService {
    constructor() {
        this.syntaxType = 'simple';
        this.uneditableVariablesChange = new Subject();
        this.variablesChange = new Subject();
        this.questionsChange = new Subject();
        this.mightBeScoreChange = new Subject();
        this.finalExpressionChange = new Subject();
        this.LANGUAGE_FHIRPATH = 'text/fhirpath';
        this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
        this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
        this.CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.linkIdToQuestion = {};
        this.mightBeScore = false;
        this.variables = [];
        this.uneditableVariables = [];
    }
    /**
     * Create a new variable
     */
    addVariable() {
        // Get all the existing variable names
        const existingNames = this.variables.map((e) => e.label)
            .concat(this.uneditableVariables.map((e) => e.name));
        this.variables.push({
            label: this.getNewLabelName(existingNames),
            type: 'question',
            expression: ''
        });
        this.variablesChange.next(this.variables);
    }
    /**
     * Remove a variable
     * @param i - index of variable to remove
     */
    remove(i) {
        this.variables.splice(i, 1);
    }
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire
     * @param fhir - FHIR Questionnaire
     */
    getUneditableVariables(fhir) {
        const launchContextExtensionUrl = 'http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext';
        if (Array.isArray(fhir.extension)) {
            return fhir.extension.reduce((accumulator, extension) => {
                var _a, _b;
                if (extension.url === launchContextExtensionUrl && extension.extension) {
                    const uneditableVariable = {
                        name: extension.extension.find((e) => e.url === 'name').valueId,
                        type: (_a = extension.extension.filter((e) => e.url === 'type')) === null || _a === void 0 ? void 0 : _a.map((e) => e.valueCode).join('|'),
                        description: (_b = extension.extension.find((e) => e.url === 'description')) === null || _b === void 0 ? void 0 : _b.valueString
                    };
                    accumulator.push(uneditableVariable);
                }
                return accumulator;
            }, []);
        }
        return [];
    }
    /**
     * Get and remove the variables from the FHIR object
     * @param fhir
     */
    extractVariables(fhir) {
        // Look at the top level fhirpath related extensions to populate the editable variables
        // TODO look at the focus item variables
        if (fhir.extension) {
            const variables = [];
            const nonVariableExtensions = [];
            fhir.extension.forEach((extension) => {
                if (extension.url === this.VARIABLE_EXTENSION &&
                    extension.valueExpression && extension.valueExpression.language === this.LANGUAGE_FHIRPATH) {
                    variables.push(this.processVariable(extension.valueExpression.name, extension.valueExpression.expression));
                }
                else {
                    nonVariableExtensions.push(extension);
                }
            });
            // Remove the variables so they can be re-added on export
            fhir.extension = nonVariableExtensions;
            return variables;
        }
        return [];
    }
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */
    itemHasScore(item) {
        if (typeof item === 'string') {
            item = this.linkIdToQuestion[item];
        }
        return (item.answerOption || []).some((answerOption) => {
            return (answerOption.extension || []).some((extension) => {
                return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
            });
        });
    }
    // TODO check if this is already a score calculation
    /**
     * Look at the ordinalValue on the answers of all the questions and if over the threshold
     * percentage of the items have it return true
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     */
    isProbablyScore(fhir, linkIdContext) {
        const THRESHOLD = 0.6; // Percent of questions (minus the one we're editing)
        // which need to be scores to determine we want to sum them up
        let totalQuestions = fhir.item.length;
        let scoreQuestions = 0;
        fhir.item.forEach((item) => {
            if (item.linkId === linkIdContext) {
                totalQuestions--;
            }
            else if (this.itemHasScore(item)) {
                scoreQuestions++;
            }
        });
        return scoreQuestions / totalQuestions >= THRESHOLD;
    }
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     */
    import(fhir, linkIdContext) {
        this.linkIdContext = linkIdContext; // TODO change notification for linkId?
        this.fhir = fhir;
        if (fhir.resourceType === 'Questionnaire' && fhir.item && fhir.item.length) {
            this.mightBeScore = this.isProbablyScore(fhir, linkIdContext);
            this.mightBeScoreChange.next(this.mightBeScore);
            this.uneditableVariables = this.getUneditableVariables(fhir);
            this.uneditableVariablesChange.next(this.uneditableVariables);
            this.linkIdToQuestion = {};
            const linkIdToQuestion = this.linkIdToQuestion;
            this.processItem(fhir.item);
            this.variables = this.extractVariables(fhir);
            this.variablesChange.next(this.variables);
            this.questions = [];
            // tslint:disable-next-line:forin
            for (const key in linkIdToQuestion) {
                if (!linkIdToQuestion.hasOwnProperty(key)) {
                    return;
                }
                const e = linkIdToQuestion[key];
                // TODO decimal vs choice
                const MAX_Q_LEN = 60; // Maximum question length before truncating.
                const text = e.text;
                this.questions.push({
                    linkId: e.linkId,
                    text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
                    unit: this.getQuestionUnits(e.linkId)
                });
            }
            this.questionsChange.next(this.questions);
            this.finalExpression = this.extractFinalExpression(fhir.item, linkIdContext);
            this.finalExpressionChange.next(this.finalExpression);
        }
    }
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */
    processItem(items) {
        items.forEach((e) => {
            this.linkIdToQuestion[e.linkId] = e;
            if (e.item) {
                this.processItem(e.item);
            }
        });
    }
    /**
     * Get and remove the final expression
     * @param items
     * @param linkId
     */
    extractFinalExpression(items, linkId) {
        for (const item of items) {
            if (item.extension) {
                const extensionIndex = item.extension.findIndex((e) => {
                    return e.url === this.CALCULATED_EXPRESSION && e.valueExpression.language === this.LANGUAGE_FHIRPATH &&
                        e.valueExpression.expression;
                });
                if (extensionIndex !== -1) {
                    const finalExpression = item.extension[extensionIndex].valueExpression.expression;
                    item.extension.splice(extensionIndex, 1);
                    return finalExpression;
                }
            }
            else if (item.item) {
                return this.extractFinalExpression(item.item, linkId);
            }
        }
        return '';
    }
    /**
     * Process the an expression into a possible question
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @private
     */
    processVariable(name, expression) {
        const matches = expression.match(this.QUESTION_REGEX);
        if (matches !== null) {
            const linkId = matches[1];
            const factor = matches[2];
            const variable = {
                label: name,
                type: 'question',
                linkId,
                expression
            };
            if (factor) {
                // We might be able to do unit conversion
                const sourceUnits = this.getQuestionUnits(linkId);
                if (UNIT_CONVERSION.hasOwnProperty(sourceUnits)) {
                    const conversions = UNIT_CONVERSION[sourceUnits];
                    const conversion = conversions.find((e) => {
                        return e.factor.toString() === factor;
                    });
                    variable.unit = conversion.unit;
                }
            }
            return variable;
        }
        else {
            return {
                label: name,
                type: 'expression',
                expression
            };
        }
    }
    // TODO check behavior of repeating linkId
    /**
     * Get question units for the question
     * @param linkId - Question linkId
     * @private
     */
    getQuestionUnits(linkId) {
        const QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
        const question = this.linkIdToQuestion[linkId];
        if (question.extension) {
            const extension = question.extension.find((e) => {
                return e.url === QUESTIONNAIRE_UNIT &&
                    e.valueCoding.system && e.valueCoding.system === 'http://unitsofmeasure.org';
            });
            if (extension && extension.valueCoding.code) {
                return extension.valueCoding.code;
            }
        }
        return null;
    }
    /**
     * Generate a label name like A, B, C, ... AA, AB which is not already used
     * @param existingNames {string[]} - Array of names already used by existing variables
     * @private
     */
    getNewLabelName(existingNames) {
        // All letters which can be used for a simple variable name
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        // First pass is with a single character variable name. Other passes are with two
        const firstLetterAlphabet = [''].concat(alphabet);
        for (const firstLetter of firstLetterAlphabet) {
            for (const secondLetter of alphabet) {
                const potentialName = firstLetter + secondLetter;
                const count = existingNames.filter((e) => e === potentialName);
                if (count.length === 0) {
                    return potentialName;
                }
            }
        }
        // Don't return a suggested name if we exhausted all combinations
        return '';
    }
    /**
     * Toggle the mightBeScore
     */
    toggleMightBeScore() {
        this.mightBeScore = !this.mightBeScore;
        this.mightBeScoreChange.next(this.mightBeScore);
    }
    /**
     * Add variables and finalExpression and return the new FHIR Questionnaire
     * @param finalExpression
     */
    export(finalExpression) {
        // TODO support for different variable scopes
        // Copy the fhir object so we can export more than once
        // (if we add our data the second export will have duplicates)
        const fhir = JSON.parse(JSON.stringify(this.fhir));
        const variablesToAdd = this.variables.map((e) => {
            return {
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: e.label,
                    language: this.LANGUAGE_FHIRPATH,
                    expression: e.expression
                }
            };
        });
        if (fhir.extension) {
            fhir.extension = fhir.extension.concat(variablesToAdd);
        }
        else {
            fhir.extension = variablesToAdd;
        }
        const finalExpressionExtension = {
            url: this.CALCULATED_EXPRESSION,
            valueExpression: {
                language: this.LANGUAGE_FHIRPATH,
                expression: finalExpression
            }
        };
        this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
        return fhir;
    }
    /**
     * Takes FHIR questionnaire definition and a linkId and returns a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addTotalScoreRule(fhir, linkId) {
        this.fhir = fhir;
        this.linkIdContext = linkId;
        return this.exportSumOfScores();
    }
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    exportSumOfScores() {
        const fhir = this.fhir;
        const linkIdContext = this.linkIdContext;
        const variableNames = [];
        const scoreQuestionLinkIds = [];
        // Get an array of linkIds for score questions
        fhir.item.forEach((item) => {
            if (item.linkId !== linkIdContext && this.itemHasScore(item)) {
                scoreQuestionLinkIds.push(item.linkId);
            }
        });
        // Get as many short suggested variable names as we have score questions
        scoreQuestionLinkIds.forEach(() => {
            variableNames.push(this.getNewLabelName(variableNames));
        });
        const scoreQuestions = scoreQuestionLinkIds.map((e, i) => {
            return {
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: variableNames[i],
                    language: this.LANGUAGE_FHIRPATH,
                    expression: `%questionnaire.item.where(linkId = '${e}').answerOption` +
                        `.where(valueCoding.code=%resource.item.where(linkId = '${e}').answer.valueCoding.code).extension` +
                        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value`
                }
            };
        });
        const anyQuestionAnswered = {
            url: this.VARIABLE_EXTENSION,
            valueExpression: {
                name: 'any_questions_answered',
                language: this.LANGUAGE_FHIRPATH,
                expression: variableNames.map((e) => `%${e}.exists()`).join(' or ')
            }
        };
        const sumString = variableNames.map((e) => `iif(%${e}.exists(), %${e}, 0)`).join(' + ');
        const totalCalculation = {
            url: this.CALCULATED_EXPRESSION,
            valueExpression: {
                description: 'Total score calculation',
                language: this.LANGUAGE_FHIRPATH,
                expression: `iif(%any_questions_answered, ${sumString}, {})`
            }
        };
        scoreQuestions.push(anyQuestionAnswered);
        // @ts-ignore
        scoreQuestions.push(totalCalculation);
        this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);
        return fhir;
    }
    insertExtensions(items, linkId, extensions) {
        for (const item of items) {
            if (item.linkId === linkId) {
                if (item.extension) {
                    item.extension = item.extension.concat(extensions);
                }
                else {
                    item.extension = extensions;
                }
                break;
            }
            else if (item.item) {
                this.insertExtensions(item.item, linkId, extensions);
            }
        }
    }
    /**
     * Get the expression for a question
     * @param linkId - Question linkId
     * @param itemHasScore - Answer has an ordinalValue extension
     * @param convertible - Units can be converted
     * @param unit - Base units
     * @param toUnit - Destination units
     */
    valueOrScoreExpression(linkId, itemHasScore, convertible, unit, toUnit) {
        if (itemHasScore) {
            return `%questionnaire.item.where(linkId = '${linkId}').answerOption` +
                `.where(valueCoding.code=%resource.item.where(linkId = '${linkId}').answer.valueCoding.code).extension` +
                `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value`;
        }
        else if (convertible && unit && toUnit) {
            const factor = UNIT_CONVERSION[unit].find((e) => e.unit === toUnit).factor;
            return `%resource.item.where(linkId='${linkId}').answer.value*${factor}`;
        }
        else {
            return `%resource.item.where(linkId='${linkId}').answer.value`;
        }
    }
}
RuleEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function RuleEditorService_Factory() { return new RuleEditorService(); }, token: RuleEditorService, providedIn: "root" });
RuleEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
RuleEditorService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvcnVsZS1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFLMUMsTUFBTSxPQUFPLGlCQUFpQjtJQXVCNUI7UUF0QkEsZUFBVSxHQUFHLFFBQVEsQ0FBQztRQUV0Qiw4QkFBeUIsR0FDdkIsSUFBSSxPQUFPLEVBQXdCLENBQUM7UUFDdEMsb0JBQWUsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUNqRSxvQkFBZSxHQUF3QixJQUFJLE9BQU8sRUFBYyxDQUFDO1FBQ2pFLHVCQUFrQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQzlELDBCQUFxQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBTXZELHNCQUFpQixHQUFHLGVBQWUsQ0FBQztRQUNwQyxtQkFBYyxHQUFHLDRFQUE0RSxDQUFDO1FBQzlGLHVCQUFrQixHQUFHLGtEQUFrRCxDQUFDO1FBQ3hFLDBCQUFxQixHQUFHLHVGQUF1RixDQUFDO1FBRWhILHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU5QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUduQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxzQ0FBc0M7UUFDdEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxD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O2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgbWF0aFRvRmhpcnBhdGggZnJvbSAnbWF0aC10by1maGlycGF0aCc7XG5cbmltcG9ydCB7IFF1ZXN0aW9uLCBVbmVkaXRhYmxlVmFyaWFibGUsIFZhcmlhYmxlIH0gZnJvbSAnLi92YXJpYWJsZSc7XG5pbXBvcnQgeyBVTklUX0NPTlZFUlNJT04gfSBmcm9tICcuL3VuaXRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUnVsZUVkaXRvclNlcnZpY2Uge1xuICBzeW50YXhUeXBlID0gJ3NpbXBsZSc7XG4gIGxpbmtJZENvbnRleHQ6IHN0cmluZztcbiAgdW5lZGl0YWJsZVZhcmlhYmxlc0NoYW5nZTogU3ViamVjdDxVbmVkaXRhYmxlVmFyaWFibGVbXT4gPVxuICAgIG5ldyBTdWJqZWN0PFVuZWRpdGFibGVWYXJpYWJsZVtdPigpO1xuICB2YXJpYWJsZXNDaGFuZ2U6IFN1YmplY3Q8VmFyaWFibGVbXT4gPSBuZXcgU3ViamVjdDxWYXJpYWJsZVtdPigpO1xuICBxdWVzdGlvbnNDaGFuZ2U6IFN1YmplY3Q8UXVlc3Rpb25bXT4gPSBuZXcgU3ViamVjdDxRdWVzdGlvbltdPigpO1xuICBtaWdodEJlU2NvcmVDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBmaW5hbEV4cHJlc3Npb25DaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgdW5lZGl0YWJsZVZhcmlhYmxlczogVW5lZGl0YWJsZVZhcmlhYmxlW107XG4gIHZhcmlhYmxlczogVmFyaWFibGVbXTtcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBmaW5hbEV4cHJlc3Npb246IHN0cmluZztcblxuICBwcml2YXRlIExBTkdVQUdFX0ZISVJQQVRIID0gJ3RleHQvZmhpcnBhdGgnO1xuICBwcml2YXRlIFFVRVNUSU9OX1JFR0VYID0gL14lcmVzb3VyY2VcXC5pdGVtXFwud2hlcmVcXChsaW5rSWQ9JyguKiknXFwpXFwuYW5zd2VyXFwudmFsdWUoPzpcXCooXFxkKlxcLj9cXGQqKSk/JC87XG4gIHByaXZhdGUgVkFSSUFCTEVfRVhURU5TSU9OID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi92YXJpYWJsZSc7XG4gIHByaXZhdGUgQ0FMQ1VMQVRFRF9FWFBSRVNTSU9OID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvdXYvc2RjL1N0cnVjdHVyZURlZmluaXRpb24vc2RjLXF1ZXN0aW9ubmFpcmUtY2FsY3VsYXRlZEV4cHJlc3Npb24nO1xuXG4gIHByaXZhdGUgbGlua0lkVG9RdWVzdGlvbiA9IHt9O1xuICBwcml2YXRlIGZoaXI7XG4gIG1pZ2h0QmVTY29yZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmFyaWFibGVzID0gW107XG4gICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZhcmlhYmxlXG4gICAqL1xuICBhZGRWYXJpYWJsZSgpOiB2b2lkIHtcbiAgICAvLyBHZXQgYWxsIHRoZSBleGlzdGluZyB2YXJpYWJsZSBuYW1lc1xuICAgIGNvbnN0IGV4aXN0aW5nTmFtZXMgPSB0aGlzLnZhcmlhYmxlcy5tYXAoKGUpID0+IGUubGFiZWwpXG4gICAgICAuY29uY2F0KHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlcy5tYXAoKGUpID0+IGUubmFtZSkpO1xuXG4gICAgdGhpcy52YXJpYWJsZXMucHVzaCh7XG4gICAgICBsYWJlbDogdGhpcy5nZXROZXdMYWJlbE5hbWUoZXhpc3RpbmdOYW1lcyksXG4gICAgICB0eXBlOiAncXVlc3Rpb24nLFxuICAgICAgZXhwcmVzc2lvbjogJydcbiAgICB9KTtcbiAgICB0aGlzLnZhcmlhYmxlc0NoYW5nZS5uZXh0KHRoaXMudmFyaWFibGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSB2YXJpYWJsZVxuICAgKiBAcGFyYW0gaSAtIGluZGV4IG9mIHZhcmlhYmxlIHRvIHJlbW92ZVxuICAgKi9cbiAgcmVtb3ZlKGk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudmFyaWFibGVzLnNwbGljZShpLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxpc3Qgb2YgdW5lZGl0YWJsZSB2YXJpYWJsZXMgYmFzZWQgb24gdGhlIEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKiBAcGFyYW0gZmhpciAtIEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKi9cbiAgZ2V0VW5lZGl0YWJsZVZhcmlhYmxlcyhmaGlyKTogVW5lZGl0YWJsZVZhcmlhYmxlW10ge1xuICAgIGNvbnN0IGxhdW5jaENvbnRleHRFeHRlbnNpb25VcmwgPSAnaHR0cDovL2hsNy5vcmcvZmhpci9TdHJ1Y3R1cmVEZWZpbml0aW9uL3F1ZXN0aW9ubmFpcmUtbGF1bmNoQ29udGV4dCc7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaGlyLmV4dGVuc2lvbikpIHtcbiAgICAgIHJldHVybiBmaGlyLmV4dGVuc2lvbi5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBleHRlbnNpb24pID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbi51cmwgPT09IGxhdW5jaENvbnRleHRFeHRlbnNpb25VcmwgJiYgZXh0ZW5zaW9uLmV4dGVuc2lvbikge1xuICAgICAgICAgIGNvbnN0IHVuZWRpdGFibGVWYXJpYWJsZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGV4dGVuc2lvbi5leHRlbnNpb24uZmluZCgoZSkgPT4gZS51cmwgPT09ICduYW1lJykudmFsdWVJZCxcbiAgICAgICAgICAgIHR5cGU6IGV4dGVuc2lvbi5leHRlbnNpb24uZmlsdGVyKChlKSA9PiBlLnVybCA9PT0gJ3R5cGUnKT8ubWFwKChlKSA9PiBlLnZhbHVlQ29kZSkuam9pbignfCcpLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGV4dGVuc2lvbi5leHRlbnNpb24uZmluZCgoZSkgPT4gZS51cmwgPT09ICdkZXNjcmlwdGlvbicpPy52YWx1ZVN0cmluZ1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKHVuZWRpdGFibGVWYXJpYWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW5kIHJlbW92ZSB0aGUgdmFyaWFibGVzIGZyb20gdGhlIEZISVIgb2JqZWN0XG4gICAqIEBwYXJhbSBmaGlyXG4gICAqL1xuICBleHRyYWN0VmFyaWFibGVzKGZoaXIpOiBWYXJpYWJsZVtdIHtcbiAgICAvLyBMb29rIGF0IHRoZSB0b3AgbGV2ZWwgZmhpcnBhdGggcmVsYXRlZCBleHRlbnNpb25zIHRvIHBvcHVsYXRlIHRoZSBlZGl0YWJsZSB2YXJpYWJsZXNcbiAgICAvLyBUT0RPIGxvb2sgYXQgdGhlIGZvY3VzIGl0ZW0gdmFyaWFibGVzXG5cbiAgICBpZiAoZmhpci5leHRlbnNpb24pIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IFtdO1xuICAgICAgY29uc3Qgbm9uVmFyaWFibGVFeHRlbnNpb25zID0gW107XG5cbiAgICAgIGZoaXIuZXh0ZW5zaW9uLmZvckVhY2goKGV4dGVuc2lvbikgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uLnVybCA9PT0gdGhpcy5WQVJJQUJMRV9FWFRFTlNJT04gJiZcbiAgICAgICAgICBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uICYmIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24ubGFuZ3VhZ2UgPT09IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgpIHtcbiAgICAgICAgICB2YXJpYWJsZXMucHVzaChcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1ZhcmlhYmxlKGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24ubmFtZSwgZXh0ZW5zaW9uLnZhbHVlRXhwcmVzc2lvbi5leHByZXNzaW9uKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9uVmFyaWFibGVFeHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgdmFyaWFibGVzIHNvIHRoZXkgY2FuIGJlIHJlLWFkZGVkIG9uIGV4cG9ydFxuICAgICAgZmhpci5leHRlbnNpb24gPSBub25WYXJpYWJsZUV4dGVuc2lvbnM7XG5cbiAgICAgIHJldHVybiB2YXJpYWJsZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGl0ZW0gaGFzIGFuIG9yZGluYWxWYWx1ZSBleHRlbnNpb24gb24gdGhlIGFuc3dlclxuICAgKiBAcGFyYW0gaXRlbSAtIFF1ZXN0aW9uIGl0ZW0gb3IgbGlua0lkXG4gICAqL1xuICBpdGVtSGFzU2NvcmUoaXRlbSk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGl0ZW0gPSB0aGlzLmxpbmtJZFRvUXVlc3Rpb25baXRlbV07XG4gICAgfVxuXG4gICAgcmV0dXJuIChpdGVtLmFuc3dlck9wdGlvbiB8fCBbXSkuc29tZSgoYW5zd2VyT3B0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gKGFuc3dlck9wdGlvbi5leHRlbnNpb24gfHwgW10pLnNvbWUoKGV4dGVuc2lvbikgPT4ge1xuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uLnVybCA9PT0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9vcmRpbmFsVmFsdWUnO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPIGNoZWNrIGlmIHRoaXMgaXMgYWxyZWFkeSBhIHNjb3JlIGNhbGN1bGF0aW9uXG4gIC8qKlxuICAgKiBMb29rIGF0IHRoZSBvcmRpbmFsVmFsdWUgb24gdGhlIGFuc3dlcnMgb2YgYWxsIHRoZSBxdWVzdGlvbnMgYW5kIGlmIG92ZXIgdGhlIHRocmVzaG9sZFxuICAgKiBwZXJjZW50YWdlIG9mIHRoZSBpdGVtcyBoYXZlIGl0IHJldHVybiB0cnVlXG4gICAqIEBwYXJhbSBmaGlyIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWRDb250ZXh0IC0gbGlua0lkIHRvIGV4Y2x1ZGUgZnJvbSBjYWxjdWxhdGlvblxuICAgKi9cbiAgaXNQcm9iYWJseVNjb3JlKGZoaXIsIGxpbmtJZENvbnRleHQpOiBib29sZWFuIHtcbiAgICBjb25zdCBUSFJFU0hPTEQgPSAwLjY7ICAvLyBQZXJjZW50IG9mIHF1ZXN0aW9ucyAobWludXMgdGhlIG9uZSB3ZSdyZSBlZGl0aW5nKVxuICAgIC8vIHdoaWNoIG5lZWQgdG8gYmUgc2NvcmVzIHRvIGRldGVybWluZSB3ZSB3YW50IHRvIHN1bSB0aGVtIHVwXG5cbiAgICBsZXQgdG90YWxRdWVzdGlvbnMgPSBmaGlyLml0ZW0ubGVuZ3RoO1xuICAgIGxldCBzY29yZVF1ZXN0aW9ucyA9IDA7XG5cbiAgICBmaGlyLml0ZW0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubGlua0lkID09PSBsaW5rSWRDb250ZXh0KSB7XG4gICAgICAgIHRvdGFsUXVlc3Rpb25zLS07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbUhhc1Njb3JlKGl0ZW0pKSB7XG4gICAgICAgIHNjb3JlUXVlc3Rpb25zKys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2NvcmVRdWVzdGlvbnMgLyB0b3RhbFF1ZXN0aW9ucyA+PSBUSFJFU0hPTEQ7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEgRkhJUiBRdWVzdGlvbm5haXJlIHRvIHBvcHVsYXRlIHF1ZXN0aW9uc1xuICAgKiBAcGFyYW0gZmhpciAtIEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKiBAcGFyYW0gbGlua0lkQ29udGV4dCAtIENvbnRleHQgdG8gdXNlIGZvciBmaW5hbCBleHByZXNzaW9uXG4gICAqL1xuICBpbXBvcnQoZmhpciwgbGlua0lkQ29udGV4dD8pOiB2b2lkIHtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSBsaW5rSWRDb250ZXh0OyAgLy8gVE9ETyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGZvciBsaW5rSWQ/XG4gICAgdGhpcy5maGlyID0gZmhpcjtcblxuICAgIGlmIChmaGlyLnJlc291cmNlVHlwZSA9PT0gJ1F1ZXN0aW9ubmFpcmUnICYmIGZoaXIuaXRlbSAmJiBmaGlyLml0ZW0ubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1pZ2h0QmVTY29yZSA9IHRoaXMuaXNQcm9iYWJseVNjb3JlKGZoaXIsIGxpbmtJZENvbnRleHQpO1xuICAgICAgdGhpcy5taWdodEJlU2NvcmVDaGFuZ2UubmV4dCh0aGlzLm1pZ2h0QmVTY29yZSk7XG5cbiAgICAgIHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlcyA9IHRoaXMuZ2V0VW5lZGl0YWJsZVZhcmlhYmxlcyhmaGlyKTtcbiAgICAgIHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlc0NoYW5nZS5uZXh0KHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlcyk7XG5cbiAgICAgIHRoaXMubGlua0lkVG9RdWVzdGlvbiA9IHt9O1xuICAgICAgY29uc3QgbGlua0lkVG9RdWVzdGlvbiA9IHRoaXMubGlua0lkVG9RdWVzdGlvbjtcbiAgICAgIHRoaXMucHJvY2Vzc0l0ZW0oZmhpci5pdGVtKTtcblxuICAgICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLmV4dHJhY3RWYXJpYWJsZXMoZmhpcik7XG4gICAgICB0aGlzLnZhcmlhYmxlc0NoYW5nZS5uZXh0KHRoaXMudmFyaWFibGVzKTtcblxuICAgICAgdGhpcy5xdWVzdGlvbnMgPSBbXTtcblxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBsaW5rSWRUb1F1ZXN0aW9uKSB7XG4gICAgICAgIGlmICghbGlua0lkVG9RdWVzdGlvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGUgPSBsaW5rSWRUb1F1ZXN0aW9uW2tleV07XG4gICAgICAgIC8vIFRPRE8gZGVjaW1hbCB2cyBjaG9pY2VcbiAgICAgICAgY29uc3QgTUFYX1FfTEVOID0gNjA7ICAvLyBNYXhpbXVtIHF1ZXN0aW9uIGxlbmd0aCBiZWZvcmUgdHJ1bmNhdGluZy5cblxuICAgICAgICBjb25zdCB0ZXh0ID0gZS50ZXh0O1xuXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnB1c2goe1xuICAgICAgICAgIGxpbmtJZDogZS5saW5rSWQsXG4gICAgICAgICAgdGV4dDogdGV4dC5sZW5ndGggPiBNQVhfUV9MRU4gPyB0ZXh0LnN1YnN0cmluZygwLCBNQVhfUV9MRU4pICsgJy4uLicgOiB0ZXh0LFxuICAgICAgICAgIHVuaXQ6IHRoaXMuZ2V0UXVlc3Rpb25Vbml0cyhlLmxpbmtJZClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXN0aW9uc0NoYW5nZS5uZXh0KHRoaXMucXVlc3Rpb25zKTtcblxuICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSB0aGlzLmV4dHJhY3RGaW5hbEV4cHJlc3Npb24oZmhpci5pdGVtLCBsaW5rSWRDb250ZXh0KTtcbiAgICAgIHRoaXMuZmluYWxFeHByZXNzaW9uQ2hhbmdlLm5leHQodGhpcy5maW5hbEV4cHJlc3Npb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIG5lc3RlZCBGSElSIFF1ZXN0aW9ubmFpcmUgaXRlbXNcbiAgICogQHBhcmFtIGl0ZW1zIC0gQ3VycmVudCBsZXZlbCBvZiBpdGVtIG5lc3RpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0l0ZW0oaXRlbXMpOiB2b2lkIHtcbiAgICBpdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICB0aGlzLmxpbmtJZFRvUXVlc3Rpb25bZS5saW5rSWRdID0gZTtcbiAgICAgIGlmIChlLml0ZW0pIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzSXRlbShlLml0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVtb3ZlIHRoZSBmaW5hbCBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBpdGVtc1xuICAgKiBAcGFyYW0gbGlua0lkXG4gICAqL1xuICBleHRyYWN0RmluYWxFeHByZXNzaW9uKGl0ZW1zLCBsaW5rSWQpOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKGl0ZW0uZXh0ZW5zaW9uKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbkluZGV4ID0gaXRlbS5leHRlbnNpb24uZmluZEluZGV4KChlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGUudXJsID09PSB0aGlzLkNBTENVTEFURURfRVhQUkVTU0lPTiAmJiBlLnZhbHVlRXhwcmVzc2lvbi5sYW5ndWFnZSA9PT0gdGhpcy5MQU5HVUFHRV9GSElSUEFUSCAmJlxuICAgICAgICAgICAgZS52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbiA9IGl0ZW0uZXh0ZW5zaW9uW2V4dGVuc2lvbkluZGV4XS52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbjtcbiAgICAgICAgICBpdGVtLmV4dGVuc2lvbi5zcGxpY2UoZXh0ZW5zaW9uSW5kZXgsIDEpO1xuXG4gICAgICAgICAgcmV0dXJuIGZpbmFsRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEZpbmFsRXhwcmVzc2lvbihpdGVtLml0ZW0sIGxpbmtJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIGFuIGV4cHJlc3Npb24gaW50byBhIHBvc3NpYmxlIHF1ZXN0aW9uXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSB0byBhc3NpZ24gdmFyaWFibGVcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gLSBFeHByZXNzaW9uIHRvIHByb2Nlc3NcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc1ZhcmlhYmxlKG5hbWUsIGV4cHJlc3Npb24pOiBWYXJpYWJsZSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGV4cHJlc3Npb24ubWF0Y2godGhpcy5RVUVTVElPTl9SRUdFWCk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbGlua0lkID0gbWF0Y2hlc1sxXTtcbiAgICAgIGNvbnN0IGZhY3RvciA9IG1hdGNoZXNbMl07XG5cbiAgICAgIGNvbnN0IHZhcmlhYmxlOiBWYXJpYWJsZSA9IHtcbiAgICAgICAgbGFiZWw6IG5hbWUsXG4gICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXG4gICAgICAgIGxpbmtJZCxcbiAgICAgICAgZXhwcmVzc2lvblxuICAgICAgfTtcblxuICAgICAgaWYgKGZhY3Rvcikge1xuICAgICAgICAvLyBXZSBtaWdodCBiZSBhYmxlIHRvIGRvIHVuaXQgY29udmVyc2lvblxuICAgICAgICBjb25zdCBzb3VyY2VVbml0cyA9IHRoaXMuZ2V0UXVlc3Rpb25Vbml0cyhsaW5rSWQpO1xuXG4gICAgICAgIGlmIChVTklUX0NPTlZFUlNJT04uaGFzT3duUHJvcGVydHkoc291cmNlVW5pdHMpKSB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2lvbnMgPSBVTklUX0NPTlZFUlNJT05bc291cmNlVW5pdHNdO1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNpb24gPSBjb252ZXJzaW9ucy5maW5kKChlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZS5mYWN0b3IudG9TdHJpbmcoKSA9PT0gZmFjdG9yO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdmFyaWFibGUudW5pdCA9IGNvbnZlcnNpb24udW5pdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFyaWFibGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgICB0eXBlOiAnZXhwcmVzc2lvbicsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBjaGVjayBiZWhhdmlvciBvZiByZXBlYXRpbmcgbGlua0lkXG4gIC8qKlxuICAgKiBHZXQgcXVlc3Rpb24gdW5pdHMgZm9yIHRoZSBxdWVzdGlvblxuICAgKiBAcGFyYW0gbGlua0lkIC0gUXVlc3Rpb24gbGlua0lkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGdldFF1ZXN0aW9uVW5pdHMobGlua0lkKTogc3RyaW5nIHtcbiAgICBjb25zdCBRVUVTVElPTk5BSVJFX1VOSVQgPSAnaHR0cDovL2hsNy5vcmcvZmhpci9TdHJ1Y3R1cmVEZWZpbml0aW9uL3F1ZXN0aW9ubmFpcmUtdW5pdCc7XG4gICAgY29uc3QgcXVlc3Rpb24gPSB0aGlzLmxpbmtJZFRvUXVlc3Rpb25bbGlua0lkXTtcblxuICAgIGlmIChxdWVzdGlvbi5leHRlbnNpb24pIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHF1ZXN0aW9uLmV4dGVuc2lvbi5maW5kKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLnVybCA9PT0gUVVFU1RJT05OQUlSRV9VTklUICYmXG4gICAgICAgICAgZS52YWx1ZUNvZGluZy5zeXN0ZW0gJiYgZS52YWx1ZUNvZGluZy5zeXN0ZW0gPT09ICdodHRwOi8vdW5pdHNvZm1lYXN1cmUub3JnJztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uICYmIGV4dGVuc2lvbi52YWx1ZUNvZGluZy5jb2RlKSB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb24udmFsdWVDb2RpbmcuY29kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIGxhYmVsIG5hbWUgbGlrZSBBLCBCLCBDLCAuLi4gQUEsIEFCIHdoaWNoIGlzIG5vdCBhbHJlYWR5IHVzZWRcbiAgICogQHBhcmFtIGV4aXN0aW5nTmFtZXMge3N0cmluZ1tdfSAtIEFycmF5IG9mIG5hbWVzIGFscmVhZHkgdXNlZCBieSBleGlzdGluZyB2YXJpYWJsZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZ2V0TmV3TGFiZWxOYW1lKGV4aXN0aW5nTmFtZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAvLyBBbGwgbGV0dGVycyB3aGljaCBjYW4gYmUgdXNlZCBmb3IgYSBzaW1wbGUgdmFyaWFibGUgbmFtZVxuICAgIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jy5zcGxpdCgnJyk7XG5cbiAgICAvLyBGaXJzdCBwYXNzIGlzIHdpdGggYSBzaW5nbGUgY2hhcmFjdGVyIHZhcmlhYmxlIG5hbWUuIE90aGVyIHBhc3NlcyBhcmUgd2l0aCB0d29cbiAgICBjb25zdCBmaXJzdExldHRlckFscGhhYmV0ID0gWycnXS5jb25jYXQoYWxwaGFiZXQpO1xuICAgIGZvciAoY29uc3QgZmlyc3RMZXR0ZXIgb2YgZmlyc3RMZXR0ZXJBbHBoYWJldCkge1xuICAgICAgZm9yIChjb25zdCBzZWNvbmRMZXR0ZXIgb2YgYWxwaGFiZXQpIHtcbiAgICAgICAgY29uc3QgcG90ZW50aWFsTmFtZSA9IGZpcnN0TGV0dGVyICsgc2Vjb25kTGV0dGVyO1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gZXhpc3RpbmdOYW1lcy5maWx0ZXIoKGUpID0+IGUgPT09IHBvdGVudGlhbE5hbWUpO1xuXG4gICAgICAgIGlmIChjb3VudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gcG90ZW50aWFsTmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvbid0IHJldHVybiBhIHN1Z2dlc3RlZCBuYW1lIGlmIHdlIGV4aGF1c3RlZCBhbGwgY29tYmluYXRpb25zXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgbWlnaHRCZVNjb3JlXG4gICAqL1xuICB0b2dnbGVNaWdodEJlU2NvcmUoKTogdm9pZCB7XG4gICAgdGhpcy5taWdodEJlU2NvcmUgPSAhdGhpcy5taWdodEJlU2NvcmU7XG4gICAgdGhpcy5taWdodEJlU2NvcmVDaGFuZ2UubmV4dCh0aGlzLm1pZ2h0QmVTY29yZSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHZhcmlhYmxlcyBhbmQgZmluYWxFeHByZXNzaW9uIGFuZCByZXR1cm4gdGhlIG5ldyBGSElSIFF1ZXN0aW9ubmFpcmVcbiAgICogQHBhcmFtIGZpbmFsRXhwcmVzc2lvblxuICAgKi9cbiAgZXhwb3J0KGZpbmFsRXhwcmVzc2lvbjogc3RyaW5nKTogb2JqZWN0IHtcbiAgICAvLyBUT0RPIHN1cHBvcnQgZm9yIGRpZmZlcmVudCB2YXJpYWJsZSBzY29wZXNcbiAgICAvLyBDb3B5IHRoZSBmaGlyIG9iamVjdCBzbyB3ZSBjYW4gZXhwb3J0IG1vcmUgdGhhbiBvbmNlXG4gICAgLy8gKGlmIHdlIGFkZCBvdXIgZGF0YSB0aGUgc2Vjb25kIGV4cG9ydCB3aWxsIGhhdmUgZHVwbGljYXRlcylcbiAgICBjb25zdCBmaGlyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZoaXIpKTtcblxuICAgIGNvbnN0IHZhcmlhYmxlc1RvQWRkID0gdGhpcy52YXJpYWJsZXMubWFwKChlKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHRoaXMuVkFSSUFCTEVfRVhURU5TSU9OLFxuICAgICAgICB2YWx1ZUV4cHJlc3Npb246IHtcbiAgICAgICAgICBuYW1lOiBlLmxhYmVsLFxuICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICAgIGV4cHJlc3Npb246IGUuZXhwcmVzc2lvblxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYgKGZoaXIuZXh0ZW5zaW9uKSB7XG4gICAgICBmaGlyLmV4dGVuc2lvbiA9IGZoaXIuZXh0ZW5zaW9uLmNvbmNhdCh2YXJpYWJsZXNUb0FkZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZoaXIuZXh0ZW5zaW9uID0gdmFyaWFibGVzVG9BZGQ7XG4gICAgfVxuXG4gICAgY29uc3QgZmluYWxFeHByZXNzaW9uRXh0ZW5zaW9uID0ge1xuICAgICAgdXJsOiB0aGlzLkNBTENVTEFURURfRVhQUkVTU0lPTixcbiAgICAgIHZhbHVlRXhwcmVzc2lvbjoge1xuICAgICAgICBsYW5ndWFnZTogdGhpcy5MQU5HVUFHRV9GSElSUEFUSCxcbiAgICAgICAgZXhwcmVzc2lvbjogZmluYWxFeHByZXNzaW9uXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhmaGlyLml0ZW0sIHRoaXMubGlua0lkQ29udGV4dCwgW2ZpbmFsRXhwcmVzc2lvbkV4dGVuc2lvbl0pO1xuXG4gICAgcmV0dXJuIGZoaXI7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUYWtlcyBGSElSIHF1ZXN0aW9ubmFpcmUgZGVmaW5pdGlvbiBhbmQgYSBsaW5rSWQgYW5kIHJldHVybnMgYSBuZXcgRkhJUlxuICAgKiBRdWVzdGlvbm5haXJlIHdpdGggYSBjYWxjdWxhdGVkIGV4cHJlc3Npb24gYXQgdGhlIGdpdmVuIGxpbmtJZCB3aGljaCBzdW1zIHVwXG4gICAqIGFsbCB0aGUgb3JkaW5hbCB2YWx1ZXMgaW4gdGhlIHF1ZXN0aW9ubmFpcmVcbiAgICovXG4gIGFkZFRvdGFsU2NvcmVSdWxlKGZoaXIsIGxpbmtJZCk6IG9iamVjdCB7XG4gICAgdGhpcy5maGlyID0gZmhpcjtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSBsaW5rSWQ7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3J0U3VtT2ZTY29yZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiB0aGUgY3VycmVudCBGSElSIHF1ZXN0aW9ubmFpcmUgZGVmaW5pdGlvbiBhbmQgYSBsaW5rSWQgcmV0dXJuIGEgbmV3IEZISVJcbiAgICogUXVlc3Rpb25uYWlyZSB3aXRoIGEgY2FsY3VsYXRlZCBleHByZXNzaW9uIGF0IHRoZSBnaXZlbiBsaW5rSWQgd2hpY2ggc3VtcyB1cFxuICAgKiBhbGwgdGhlIG9yZGluYWwgdmFsdWVzIGluIHRoZSBxdWVzdGlvbm5haXJlXG4gICAqL1xuICBleHBvcnRTdW1PZlNjb3JlcygpOiBvYmplY3Qge1xuICAgIGNvbnN0IGZoaXIgPSB0aGlzLmZoaXI7XG4gICAgY29uc3QgbGlua0lkQ29udGV4dCA9IHRoaXMubGlua0lkQ29udGV4dDtcblxuICAgIGNvbnN0IHZhcmlhYmxlTmFtZXMgPSBbXTtcbiAgICBjb25zdCBzY29yZVF1ZXN0aW9uTGlua0lkcyA9IFtdO1xuXG4gICAgLy8gR2V0IGFuIGFycmF5IG9mIGxpbmtJZHMgZm9yIHNjb3JlIHF1ZXN0aW9uc1xuICAgIGZoaXIuaXRlbS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5saW5rSWQgIT09IGxpbmtJZENvbnRleHQgJiYgdGhpcy5pdGVtSGFzU2NvcmUoaXRlbSkpIHtcbiAgICAgICAgc2NvcmVRdWVzdGlvbkxpbmtJZHMucHVzaChpdGVtLmxpbmtJZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBHZXQgYXMgbWFueSBzaG9ydCBzdWdnZXN0ZWQgdmFyaWFibGUgbmFtZXMgYXMgd2UgaGF2ZSBzY29yZSBxdWVzdGlvbnNcbiAgICBzY29yZVF1ZXN0aW9uTGlua0lkcy5mb3JFYWNoKCgpID0+IHtcbiAgICAgIHZhcmlhYmxlTmFtZXMucHVzaCh0aGlzLmdldE5ld0xhYmVsTmFtZSh2YXJpYWJsZU5hbWVzKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzY29yZVF1ZXN0aW9ucyA9IHNjb3JlUXVlc3Rpb25MaW5rSWRzLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiB0aGlzLlZBUklBQkxFX0VYVEVOU0lPTixcbiAgICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgICAgbmFtZTogdmFyaWFibGVOYW1lc1tpXSxcbiAgICAgICAgICBsYW5ndWFnZTogdGhpcy5MQU5HVUFHRV9GSElSUEFUSCxcbiAgICAgICAgICBleHByZXNzaW9uOiBgJXF1ZXN0aW9ubmFpcmUuaXRlbS53aGVyZShsaW5rSWQgPSAnJHtlfScpLmFuc3dlck9wdGlvbmAgK1xuICAgICAgICAgICAgYC53aGVyZSh2YWx1ZUNvZGluZy5jb2RlPSVyZXNvdXJjZS5pdGVtLndoZXJlKGxpbmtJZCA9ICcke2V9JykuYW5zd2VyLnZhbHVlQ29kaW5nLmNvZGUpLmV4dGVuc2lvbmAgK1xuICAgICAgICAgICAgYC53aGVyZSh1cmw9J2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9vcmRpbmFsVmFsdWUnKS52YWx1ZWBcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFueVF1ZXN0aW9uQW5zd2VyZWQgPSB7XG4gICAgICB1cmw6IHRoaXMuVkFSSUFCTEVfRVhURU5TSU9OLFxuICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgIG5hbWU6ICdhbnlfcXVlc3Rpb25zX2Fuc3dlcmVkJyxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgsXG4gICAgICAgIGV4cHJlc3Npb246IHZhcmlhYmxlTmFtZXMubWFwKChlKSA9PiBgJSR7ZX0uZXhpc3RzKClgKS5qb2luKCcgb3IgJylcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc3VtU3RyaW5nID0gdmFyaWFibGVOYW1lcy5tYXAoKGUpID0+IGBpaWYoJSR7ZX0uZXhpc3RzKCksICUke2V9LCAwKWApLmpvaW4oJyArICcpO1xuXG4gICAgY29uc3QgdG90YWxDYWxjdWxhdGlvbiA9IHtcbiAgICAgIHVybDogdGhpcy5DQUxDVUxBVEVEX0VYUFJFU1NJT04sXG4gICAgICB2YWx1ZUV4cHJlc3Npb246IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdUb3RhbCBzY29yZSBjYWxjdWxhdGlvbicsXG4gICAgICAgIGxhbmd1YWdlOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICBleHByZXNzaW9uOiBgaWlmKCVhbnlfcXVlc3Rpb25zX2Fuc3dlcmVkLCAke3N1bVN0cmluZ30sIHt9KWBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2NvcmVRdWVzdGlvbnMucHVzaChhbnlRdWVzdGlvbkFuc3dlcmVkKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgc2NvcmVRdWVzdGlvbnMucHVzaCh0b3RhbENhbGN1bGF0aW9uKTtcblxuICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhmaGlyLml0ZW0sIGxpbmtJZENvbnRleHQsIHNjb3JlUXVlc3Rpb25zKTtcblxuICAgIHJldHVybiBmaGlyO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRFeHRlbnNpb25zKGl0ZW1zLCBsaW5rSWQsIGV4dGVuc2lvbnMpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChpdGVtLmxpbmtJZCA9PT0gbGlua0lkKSB7XG4gICAgICAgIGlmIChpdGVtLmV4dGVuc2lvbikge1xuICAgICAgICAgIGl0ZW0uZXh0ZW5zaW9uID0gaXRlbS5leHRlbnNpb24uY29uY2F0KGV4dGVuc2lvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZXh0ZW5zaW9uID0gZXh0ZW5zaW9ucztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhpdGVtLml0ZW0sIGxpbmtJZCwgZXh0ZW5zaW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwcmVzc2lvbiBmb3IgYSBxdWVzdGlvblxuICAgKiBAcGFyYW0gbGlua0lkIC0gUXVlc3Rpb24gbGlua0lkXG4gICAqIEBwYXJhbSBpdGVtSGFzU2NvcmUgLSBBbnN3ZXIgaGFzIGFuIG9yZGluYWxWYWx1ZSBleHRlbnNpb25cbiAgICogQHBhcmFtIGNvbnZlcnRpYmxlIC0gVW5pdHMgY2FuIGJlIGNvbnZlcnRlZFxuICAgKiBAcGFyYW0gdW5pdCAtIEJhc2UgdW5pdHNcbiAgICogQHBhcmFtIHRvVW5pdCAtIERlc3RpbmF0aW9uIHVuaXRzXG4gICAqL1xuICB2YWx1ZU9yU2NvcmVFeHByZXNzaW9uKGxpbmtJZDogc3RyaW5nLCBpdGVtSGFzU2NvcmU6IGJvb2xlYW4sIGNvbnZlcnRpYmxlOiBib29sZWFuLCB1bml0OiBzdHJpbmcsIHRvVW5pdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbUhhc1Njb3JlKSB7XG4gICAgICByZXR1cm4gYCVxdWVzdGlvbm5haXJlLml0ZW0ud2hlcmUobGlua0lkID0gJyR7bGlua0lkfScpLmFuc3dlck9wdGlvbmAgK1xuICAgICAgICBgLndoZXJlKHZhbHVlQ29kaW5nLmNvZGU9JXJlc291cmNlLml0ZW0ud2hlcmUobGlua0lkID0gJyR7bGlua0lkfScpLmFuc3dlci52YWx1ZUNvZGluZy5jb2RlKS5leHRlbnNpb25gICtcbiAgICAgICAgYC53aGVyZSh1cmw9J2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9vcmRpbmFsVmFsdWUnKS52YWx1ZWA7XG4gICAgfSBlbHNlIGlmIChjb252ZXJ0aWJsZSAmJiB1bml0ICYmIHRvVW5pdCkge1xuICAgICAgY29uc3QgZmFjdG9yID0gVU5JVF9DT05WRVJTSU9OW3VuaXRdLmZpbmQoKGUpID0+IGUudW5pdCA9PT0gdG9Vbml0KS5mYWN0b3I7XG4gICAgICByZXR1cm4gYCVyZXNvdXJjZS5pdGVtLndoZXJlKGxpbmtJZD0nJHtsaW5rSWR9JykuYW5zd2VyLnZhbHVlKiR7ZmFjdG9yfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJXJlc291cmNlLml0ZW0ud2hlcmUobGlua0lkPScke2xpbmtJZH0nKS5hbnN3ZXIudmFsdWVgO1xuICAgIH1cbiAgfVxufVxuIl19
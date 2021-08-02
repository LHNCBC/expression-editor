import { __rest } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';
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
        this.SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
        this.SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression';
        this.SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';
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
            // Add an index to each extension which we will then use to get the
            // variables back in the correct order. _index will be removed on save
            fhir.extension = fhir.extension.map((e, i) => (Object.assign(Object.assign({}, e), { _index: i })));
            fhir.extension.forEach((extension) => {
                if (extension.url === this.VARIABLE_EXTENSION &&
                    extension.valueExpression && extension.valueExpression.language === this.LANGUAGE_FHIRPATH) {
                    variables.push(this.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension._index));
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
    /**
     * Get the number of ordinalValue on the answers of the questions on the
     * Questionnaire
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire
     */
    getScoreQuestionCount(fhir, linkIdContext) {
        let scoreQuestions = 0;
        fhir.item.forEach((item) => {
            if (this.itemHasScore(item)) {
                scoreQuestions++;
            }
        });
        return scoreQuestions;
    }
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param expressionUri - URI of expression extension on linkIdContext question
     *  to extract and modify
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     */
    import(expressionUri, fhir, linkIdContext) {
        this.linkIdContext = linkIdContext; // TODO change notification for linkId?
        this.fhir = copy(fhir);
        if (this.fhir.resourceType === 'Questionnaire' && this.fhir.item && this.fhir.item.length) {
            // If there is at least one score question we will ask the user if they
            // want to calculate the score
            const SCORE_MIN_QUESTIONS = 1;
            this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
            this.mightBeScoreChange.next(this.mightBeScore);
            this.uneditableVariables = this.getUneditableVariables(this.fhir);
            this.uneditableVariablesChange.next(this.uneditableVariables);
            this.linkIdToQuestion = {};
            this.processItem(this.fhir.item);
            this.variables = this.extractVariables(this.fhir);
            this.variablesChange.next(this.variables);
            this.questions = [];
            // tslint:disable-next-line:forin
            for (const key in this.linkIdToQuestion) {
                if (!this.linkIdToQuestion.hasOwnProperty(key)) {
                    return;
                }
                const e = this.linkIdToQuestion[key];
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
            const expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);
            if (expression !== null) {
                // @ts-ignore
                this.finalExpression = expression.valueExpression.expression;
                this.finalExpressionChange.next(this.finalExpression);
                const simpleSyntax = this.extractSimpleSyntax(expression);
                if (simpleSyntax === null && this.finalExpression !== '') {
                    this.syntaxType = 'fhirpath';
                }
                else {
                    this.syntaxType = 'simple';
                    this.simpleExpression = simpleSyntax;
                }
            }
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
     * Get and remove the simple syntax if available. If not return null
     * @param expression
     */
    extractSimpleSyntax(expression) {
        if (expression.extension) {
            const customExtension = expression.extension.find((e) => {
                return e.url === this.SIMPLE_SYNTAX_EXTENSION;
            });
            if (customExtension !== undefined) {
                return customExtension.valueString; // TODO move to code
            }
        }
        return null;
    }
    /**
     * Get and remove the final expression
     * @param expressionUri - Expression extension URL
     * @param items - FHIR questionnaire item array
     * @param linkId - linkId of question where to extract expression
     */
    extractExpression(expressionUri, items, linkId) {
        for (const item of items) {
            if (item.extension) {
                const extensionIndex = item.extension.findIndex((e) => {
                    return e.url === expressionUri && e.valueExpression.language === this.LANGUAGE_FHIRPATH &&
                        e.valueExpression.expression;
                });
                if (extensionIndex !== -1) {
                    const finalExpression = item.extension[extensionIndex];
                    item.extension.splice(extensionIndex, 1);
                    return finalExpression;
                }
            }
            else if (item.item) {
                return this.extractExpression(expressionUri, item.item, linkId);
            }
        }
        return null;
    }
    /**
     * Process a FHIRPath expression into a more user friendly format if possible.
     * If the format of the FHIRPath matches a format we can display with a
     * question dropdown, etc show that. If not show the FHIRPath expression.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    processVariable(name, expression, index) {
        const matches = expression.match(this.QUESTION_REGEX);
        if (matches !== null) {
            const linkId = matches[1];
            const factor = matches[2];
            const variable = {
                _index: index,
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
                _index: index,
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
     * @param url Extension URL to use for the expression
     * @param finalExpression
     */
    export(url, finalExpression) {
        // TODO support for different variable scopes
        // Copy the fhir object so we can export more than once
        // (if we add our data the second export will have duplicates)
        const fhir = copy(this.fhir);
        const variablesToAdd = this.variables.map((e) => {
            return {
                _index: e._index,
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: e.label,
                    language: this.LANGUAGE_FHIRPATH,
                    expression: e.expression
                }
            };
        });
        // Split the variables into two buckets: Variables present when
        // Questionnaire was imported and variables added by the user using the Rule
        // Editor. Add variables present initially among the existing extensions.
        // Add the remaining variables at the end
        const variablesPresentInitially = [];
        const variablesAdded = [];
        variablesToAdd.forEach(e => {
            if (e._index === undefined) {
                variablesAdded.push(e);
            }
            else {
                variablesPresentInitially.push(e);
            }
        });
        if (fhir.extension) {
            // Introduce variables present before
            fhir.extension = fhir.extension.concat(variablesPresentInitially);
            // Sort by index
            fhir.extension.sort((a, b) => a._index - b._index);
            // Add variables added by the user
            fhir.extension = fhir.extension.concat(variablesAdded);
        }
        else {
            fhir.extension = variablesPresentInitially.concat(variablesAdded);
        }
        // Remove _index
        fhir.extension = fhir.extension.map((_a) => {
            var { _index } = _a, other = __rest(_a, ["_index"]);
            return other;
        });
        const finalExpressionExtension = {
            url,
            valueExpression: {
                language: this.LANGUAGE_FHIRPATH,
                expression: finalExpression
            }
        };
        // TODO keep existing extensions
        if (this.syntaxType === 'simple') {
            finalExpressionExtension.extension = [{
                    url: this.SIMPLE_SYNTAX_EXTENSION,
                    valueString: this.simpleExpression
                }];
        }
        this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
        return fhir;
    }
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addTotalScoreRule(fhir, linkId) {
        this.fhir = fhir;
        this.linkIdContext = linkId;
        return this.addSumOfScores();
    }
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addSumOfScores() {
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
                        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`,
                    extension: [{
                            url: this.SCORE_VARIABLE_EXTENSION
                        }]
                }
            };
        });
        const anyQuestionAnswered = {
            url: this.VARIABLE_EXTENSION,
            valueExpression: {
                name: 'any_questions_answered',
                language: this.LANGUAGE_FHIRPATH,
                expression: variableNames.map((e) => `%${e}.exists()`).join(' or '),
                extension: [{
                        url: this.SCORE_VARIABLE_EXTENSION
                    }]
            }
        };
        const sumString = variableNames.map((e) => `iif(%${e}.exists(), %${e}, 0)`).join(' + ');
        const totalCalculation = {
            url: this.CALCULATED_EXPRESSION,
            valueExpression: {
                description: 'Total score calculation',
                language: this.LANGUAGE_FHIRPATH,
                expression: `iif(%any_questions_answered, ${sumString}, {})`,
                extension: [{
                        url: this.SCORE_EXPRESSION_EXTENSION
                    }]
            }
        };
        scoreQuestions.push(anyQuestionAnswered);
        // @ts-ignore
        scoreQuestions.push(totalCalculation);
        this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);
        return fhir;
    }
    /**
     * Removes any score calculation added by the rule editor
     * @param questionnaire - FHIR Questionnaire
     * @return Questionnaire without the score calculation variable and expression
     */
    removeSumOfScores(questionnaire) {
        // Deep copy
        const questionnaireWithoutScores = copy(questionnaire);
        const removeItemScoreVariables = (item) => {
            item.extension = item.extension.filter((extension) => !this.isScoreExtension(extension));
            if (item.item) {
                item.item.forEach((subItem) => removeItemScoreVariables(subItem));
            }
        };
        questionnaireWithoutScores.item.forEach(removeItemScoreVariables);
        return questionnaireWithoutScores;
    }
    /**
     * Returns true if the extension has an extension for calculating score false otherwise
     * @param extension - FHIR Extension object
     * @private
     */
    isScoreExtension(extension) {
        if (extension.valueExpression && extension.valueExpression.extension &&
            extension.valueExpression.extension.length) {
            return !!extension.valueExpression.extension.find(e => e &&
                (e.url === this.SCORE_VARIABLE_EXTENSION ||
                    e.url === this.SCORE_EXPRESSION_EXTENSION));
        }
        else {
            return false;
        }
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
                `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvcnVsZS1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUc3QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDOztBQW1CMUMsTUFBTSxPQUFPLGlCQUFpQjtJQTJCNUI7UUExQkEsZUFBVSxHQUFHLFFBQVEsQ0FBQztRQUV0Qiw4QkFBeUIsR0FDdkIsSUFBSSxPQUFPLEVBQXdCLENBQUM7UUFDdEMsb0JBQWUsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUNqRSxvQkFBZSxHQUF3QixJQUFJLE9BQU8sRUFBYyxDQUFDO1FBQ2pFLHVCQUFrQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQzlELDBCQUFxQixHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBT3ZELHNCQUFpQixHQUFHLGVBQWUsQ0FBQztRQUNwQyxtQkFBYyxHQUFHLDRFQUE0RSxDQUFDO1FBQzlGLHVCQUFrQixHQUFHLGtEQUFrRCxDQUFDO1FBQ3hFLDZCQUF3QixHQUFHLGlFQUFpRSxDQUFDO1FBQzdGLCtCQUEwQixHQUFHLDZEQUE2RCxDQUFDO1FBQzNGLDRCQUF1QixHQUFHLG9EQUFvRCxDQUFDO1FBQy9FLDBCQUFxQixHQUFHLHVGQUF1RixDQUFDO1FBRWhILHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU5QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUduQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFB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LFdBQVcsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzNFLE9BQU8sZ0NBQWdDLE1BQU0sbUJBQW1CLE1BQU0sRUFBRSxDQUFDO1NBQzFFO2FBQU07WUFDTCxPQUFPLGdDQUFnQyxNQUFNLGlCQUFpQixDQUFDO1NBQ2hFO0lBQ0gsQ0FBQzs7OztZQWpuQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IGNvcHkgZnJvbSAnZmFzdC1jb3B5JztcblxuaW1wb3J0IHsgUXVlc3Rpb24sIFVuZWRpdGFibGVWYXJpYWJsZSwgVmFyaWFibGUgfSBmcm9tICcuL3ZhcmlhYmxlJztcbmltcG9ydCB7IFVOSVRfQ09OVkVSU0lPTiB9IGZyb20gJy4vdW5pdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZVN0eWxlIHtcbiAgaDE/OiBvYmplY3Q7XG4gIGgyPzogb2JqZWN0O1xuICBwcmV2aWV3QXJlYT86IG9iamVjdDtcbiAgdmFyaWFibGVIZWFkZXI/OiBvYmplY3Q7XG4gIHZhcmlhYmxlUm93Pzogb2JqZWN0O1xuICBidXR0b25QcmltYXJ5Pzogb2JqZWN0O1xuICBidXR0b25TZWNvbmRhcnk/OiBvYmplY3Q7XG4gIGJ1dHRvbkRhbmdlcj86IG9iamVjdDtcbiAgaW5wdXQ/OiBvYmplY3Q7XG4gIHNlbGVjdD86IG9iamVjdDtcbiAgZGVzY3JpcHRpb24/OiBvYmplY3Q7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVFZGl0b3JTZXJ2aWNlIHtcbiAgc3ludGF4VHlwZSA9ICdzaW1wbGUnO1xuICBsaW5rSWRDb250ZXh0OiBzdHJpbmc7XG4gIHVuZWRpdGFibGVWYXJpYWJsZXNDaGFuZ2U6IFN1YmplY3Q8VW5lZGl0YWJsZVZhcmlhYmxlW10+ID1cbiAgICBuZXcgU3ViamVjdDxVbmVkaXRhYmxlVmFyaWFibGVbXT4oKTtcbiAgdmFyaWFibGVzQ2hhbmdlOiBTdWJqZWN0PFZhcmlhYmxlW10+ID0gbmV3IFN1YmplY3Q8VmFyaWFibGVbXT4oKTtcbiAgcXVlc3Rpb25zQ2hhbmdlOiBTdWJqZWN0PFF1ZXN0aW9uW10+ID0gbmV3IFN1YmplY3Q8UXVlc3Rpb25bXT4oKTtcbiAgbWlnaHRCZVNjb3JlQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgZmluYWxFeHByZXNzaW9uQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHVuZWRpdGFibGVWYXJpYWJsZXM6IFVuZWRpdGFibGVWYXJpYWJsZVtdO1xuICB2YXJpYWJsZXM6IFZhcmlhYmxlW107XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgZmluYWxFeHByZXNzaW9uOiBzdHJpbmc7XG4gIHNpbXBsZUV4cHJlc3Npb246IHN0cmluZztcblxuICBwcml2YXRlIExBTkdVQUdFX0ZISVJQQVRIID0gJ3RleHQvZmhpcnBhdGgnO1xuICBwcml2YXRlIFFVRVNUSU9OX1JFR0VYID0gL14lcmVzb3VyY2VcXC5pdGVtXFwud2hlcmVcXChsaW5rSWQ9JyguKiknXFwpXFwuYW5zd2VyXFwudmFsdWUoPzpcXCooXFxkKlxcLj9cXGQqKSk/JC87XG4gIHByaXZhdGUgVkFSSUFCTEVfRVhURU5TSU9OID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi92YXJpYWJsZSc7XG4gIHByaXZhdGUgU0NPUkVfVkFSSUFCTEVfRVhURU5TSU9OID0gJ2h0dHA6Ly9saGNmb3Jtcy5ubG0ubmloLmdvdi9maGlyL2V4dC9ydWxlLWVkaXRvci1zY29yZS12YXJpYWJsZSc7XG4gIHByaXZhdGUgU0NPUkVfRVhQUkVTU0lPTl9FWFRFTlNJT04gPSAnaHR0cDovL2xoY2Zvcm1zLm5sbS5uaWguZ292L2ZoaXIvZXh0L3J1bGUtZWRpdG9yLWV4cHJlc3Npb24nO1xuICBwcml2YXRlIFNJTVBMRV9TWU5UQVhfRVhURU5TSU9OID0gJ2h0dHA6Ly9saGNmb3Jtcy5ubG0ubmloLmdvdi9maGlyL2V4dC9zaW1wbGUtc3ludGF4JztcbiAgcHJpdmF0ZSBDQUxDVUxBVEVEX0VYUFJFU1NJT04gPSAnaHR0cDovL2hsNy5vcmcvZmhpci91di9zZGMvU3RydWN0dXJlRGVmaW5pdGlvbi9zZGMtcXVlc3Rpb25uYWlyZS1jYWxjdWxhdGVkRXhwcmVzc2lvbic7XG5cbiAgcHJpdmF0ZSBsaW5rSWRUb1F1ZXN0aW9uID0ge307XG4gIHByaXZhdGUgZmhpcjtcbiAgbWlnaHRCZVNjb3JlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52YXJpYWJsZXMgPSBbXTtcbiAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmFyaWFibGVcbiAgICovXG4gIGFkZFZhcmlhYmxlKCk6IHZvaWQge1xuICAgIC8vIEdldCBhbGwgdGhlIGV4aXN0aW5nIHZhcmlhYmxlIG5hbWVzXG4gICAgY29uc3QgZXhpc3RpbmdOYW1lcyA9IHRoaXMudmFyaWFibGVzLm1hcCgoZSkgPT4gZS5sYWJlbClcbiAgICAgIC5jb25jYXQodGhpcy51bmVkaXRhYmxlVmFyaWFibGVzLm1hcCgoZSkgPT4gZS5uYW1lKSk7XG5cbiAgICB0aGlzLnZhcmlhYmxlcy5wdXNoKHtcbiAgICAgIGxhYmVsOiB0aGlzLmdldE5ld0xhYmVsTmFtZShleGlzdGluZ05hbWVzKSxcbiAgICAgIHR5cGU6ICdxdWVzdGlvbicsXG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pO1xuICAgIHRoaXMudmFyaWFibGVzQ2hhbmdlLm5leHQodGhpcy52YXJpYWJsZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBpIC0gaW5kZXggb2YgdmFyaWFibGUgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmUoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YXJpYWJsZXMuc3BsaWNlKGksIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiB1bmVkaXRhYmxlIHZhcmlhYmxlcyBiYXNlZCBvbiB0aGUgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBmaGlyIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqL1xuICBnZXRVbmVkaXRhYmxlVmFyaWFibGVzKGZoaXIpOiBVbmVkaXRhYmxlVmFyaWFibGVbXSB7XG4gICAgY29uc3QgbGF1bmNoQ29udGV4dEV4dGVuc2lvblVybCA9ICdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vcXVlc3Rpb25uYWlyZS1sYXVuY2hDb250ZXh0JztcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGZoaXIuZXh0ZW5zaW9uKSkge1xuICAgICAgcmV0dXJuIGZoaXIuZXh0ZW5zaW9uLnJlZHVjZSgoYWNjdW11bGF0b3IsIGV4dGVuc2lvbikgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uLnVybCA9PT0gbGF1bmNoQ29udGV4dEV4dGVuc2lvblVybCAmJiBleHRlbnNpb24uZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgY29uc3QgdW5lZGl0YWJsZVZhcmlhYmxlID0ge1xuICAgICAgICAgICAgbmFtZTogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maW5kKChlKSA9PiBlLnVybCA9PT0gJ25hbWUnKS52YWx1ZUlkLFxuICAgICAgICAgICAgdHlwZTogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maWx0ZXIoKGUpID0+IGUudXJsID09PSAndHlwZScpPy5tYXAoKGUpID0+IGUudmFsdWVDb2RlKS5qb2luKCd8JyksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maW5kKChlKSA9PiBlLnVybCA9PT0gJ2Rlc2NyaXB0aW9uJyk/LnZhbHVlU3RyaW5nXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2godW5lZGl0YWJsZVZhcmlhYmxlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVtb3ZlIHRoZSB2YXJpYWJsZXMgZnJvbSB0aGUgRkhJUiBvYmplY3RcbiAgICogQHBhcmFtIGZoaXJcbiAgICovXG4gIGV4dHJhY3RWYXJpYWJsZXMoZmhpcik6IFZhcmlhYmxlW10ge1xuICAgIC8vIExvb2sgYXQgdGhlIHRvcCBsZXZlbCBmaGlycGF0aCByZWxhdGVkIGV4dGVuc2lvbnMgdG8gcG9wdWxhdGUgdGhlIGVkaXRhYmxlIHZhcmlhYmxlc1xuICAgIC8vIFRPRE8gbG9vayBhdCB0aGUgZm9jdXMgaXRlbSB2YXJpYWJsZXNcblxuICAgIGlmIChmaGlyLmV4dGVuc2lvbikge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gW107XG4gICAgICBjb25zdCBub25WYXJpYWJsZUV4dGVuc2lvbnMgPSBbXTtcblxuICAgICAgLy8gQWRkIGFuIGluZGV4IHRvIGVhY2ggZXh0ZW5zaW9uIHdoaWNoIHdlIHdpbGwgdGhlbiB1c2UgdG8gZ2V0IHRoZVxuICAgICAgLy8gdmFyaWFibGVzIGJhY2sgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIF9pbmRleCB3aWxsIGJlIHJlbW92ZWQgb24gc2F2ZVxuICAgICAgZmhpci5leHRlbnNpb24gPSBmaGlyLmV4dGVuc2lvbi5tYXAoKGUsIGkpID0+ICh7IC4uLmUsIF9pbmRleDogaSB9KSk7XG5cbiAgICAgIGZoaXIuZXh0ZW5zaW9uLmZvckVhY2goKGV4dGVuc2lvbikgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uLnVybCA9PT0gdGhpcy5WQVJJQUJMRV9FWFRFTlNJT04gJiZcbiAgICAgICAgICBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uICYmIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24ubGFuZ3VhZ2UgPT09IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgpIHtcbiAgICAgICAgICB2YXJpYWJsZXMucHVzaChcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1ZhcmlhYmxlKFxuICAgICAgICAgICAgICBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uLl9pbmRleCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vblZhcmlhYmxlRXh0ZW5zaW9ucy5wdXNoKGV4dGVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIHZhcmlhYmxlcyBzbyB0aGV5IGNhbiBiZSByZS1hZGRlZCBvbiBleHBvcnRcbiAgICAgIGZoaXIuZXh0ZW5zaW9uID0gbm9uVmFyaWFibGVFeHRlbnNpb25zO1xuXG4gICAgICByZXR1cm4gdmFyaWFibGVzO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY3VycmVudCBpdGVtIGhhcyBhbiBvcmRpbmFsVmFsdWUgZXh0ZW5zaW9uIG9uIHRoZSBhbnN3ZXJcbiAgICogQHBhcmFtIGl0ZW0gLSBRdWVzdGlvbiBpdGVtIG9yIGxpbmtJZFxuICAgKi9cbiAgaXRlbUhhc1Njb3JlKGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBpdGVtID0gdGhpcy5saW5rSWRUb1F1ZXN0aW9uW2l0ZW1dO1xuICAgIH1cblxuICAgIHJldHVybiAoaXRlbS5hbnN3ZXJPcHRpb24gfHwgW10pLnNvbWUoKGFuc3dlck9wdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIChhbnN3ZXJPcHRpb24uZXh0ZW5zaW9uIHx8IFtdKS5zb21lKChleHRlbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbi51cmwgPT09ICdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vb3JkaW5hbFZhbHVlJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIG9yZGluYWxWYWx1ZSBvbiB0aGUgYW5zd2VycyBvZiB0aGUgcXVlc3Rpb25zIG9uIHRoZVxuICAgKiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBmaGlyIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWRDb250ZXh0IC0gbGlua0lkIHRvIGV4Y2x1ZGUgZnJvbSBjYWxjdWxhdGlvblxuICAgKiBAcmV0dXJuIG51bWJlciBvZiBzY29yZSBxdWVzdGlvbnMgb24gdGhlIHF1ZXN0aW9ubmFpcmVcbiAgICovXG4gIGdldFNjb3JlUXVlc3Rpb25Db3VudChmaGlyLCBsaW5rSWRDb250ZXh0KTogbnVtYmVyIHtcbiAgICBsZXQgc2NvcmVRdWVzdGlvbnMgPSAwO1xuXG4gICAgZmhpci5pdGVtLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLml0ZW1IYXNTY29yZShpdGVtKSkge1xuICAgICAgICBzY29yZVF1ZXN0aW9ucysrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNjb3JlUXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIEZISVIgUXVlc3Rpb25uYWlyZSB0byBwb3B1bGF0ZSBxdWVzdGlvbnNcbiAgICogQHBhcmFtIGV4cHJlc3Npb25VcmkgLSBVUkkgb2YgZXhwcmVzc2lvbiBleHRlbnNpb24gb24gbGlua0lkQ29udGV4dCBxdWVzdGlvblxuICAgKiAgdG8gZXh0cmFjdCBhbmQgbW9kaWZ5XG4gICAqIEBwYXJhbSBmaGlyIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWRDb250ZXh0IC0gQ29udGV4dCB0byB1c2UgZm9yIGZpbmFsIGV4cHJlc3Npb25cbiAgICovXG4gIGltcG9ydChleHByZXNzaW9uVXJpOiBzdHJpbmcsIGZoaXIsIGxpbmtJZENvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSBsaW5rSWRDb250ZXh0OyAgLy8gVE9ETyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGZvciBsaW5rSWQ/XG4gICAgdGhpcy5maGlyID0gY29weShmaGlyKTtcblxuICAgIGlmICh0aGlzLmZoaXIucmVzb3VyY2VUeXBlID09PSAnUXVlc3Rpb25uYWlyZScgJiYgdGhpcy5maGlyLml0ZW0gJiYgdGhpcy5maGlyLml0ZW0ubGVuZ3RoKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgc2NvcmUgcXVlc3Rpb24gd2Ugd2lsbCBhc2sgdGhlIHVzZXIgaWYgdGhleVxuICAgICAgLy8gd2FudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXG4gICAgICBjb25zdCBTQ09SRV9NSU5fUVVFU1RJT05TID0gMTtcbiAgICAgIHRoaXMubWlnaHRCZVNjb3JlID0gdGhpcy5nZXRTY29yZVF1ZXN0aW9uQ291bnQodGhpcy5maGlyLCBsaW5rSWRDb250ZXh0KSA+IFNDT1JFX01JTl9RVUVTVElPTlM7XG4gICAgICB0aGlzLm1pZ2h0QmVTY29yZUNoYW5nZS5uZXh0KHRoaXMubWlnaHRCZVNjb3JlKTtcblxuICAgICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy5nZXRVbmVkaXRhYmxlVmFyaWFibGVzKHRoaXMuZmhpcik7XG4gICAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXNDaGFuZ2UubmV4dCh0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMpO1xuXG4gICAgICB0aGlzLmxpbmtJZFRvUXVlc3Rpb24gPSB7fTtcbiAgICAgIHRoaXMucHJvY2Vzc0l0ZW0odGhpcy5maGlyLml0ZW0pO1xuXG4gICAgICB0aGlzLnZhcmlhYmxlcyA9IHRoaXMuZXh0cmFjdFZhcmlhYmxlcyh0aGlzLmZoaXIpO1xuICAgICAgdGhpcy52YXJpYWJsZXNDaGFuZ2UubmV4dCh0aGlzLnZhcmlhYmxlcyk7XG5cbiAgICAgIHRoaXMucXVlc3Rpb25zID0gW107XG5cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5saW5rSWRUb1F1ZXN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5saW5rSWRUb1F1ZXN0aW9uLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZSA9IHRoaXMubGlua0lkVG9RdWVzdGlvbltrZXldO1xuICAgICAgICAvLyBUT0RPIGRlY2ltYWwgdnMgY2hvaWNlXG4gICAgICAgIGNvbnN0IE1BWF9RX0xFTiA9IDYwOyAgLy8gTWF4aW11bSBxdWVzdGlvbiBsZW5ndGggYmVmb3JlIHRydW5jYXRpbmcuXG5cbiAgICAgICAgY29uc3QgdGV4dCA9IGUudGV4dDtcblxuICAgICAgICB0aGlzLnF1ZXN0aW9ucy5wdXNoKHtcbiAgICAgICAgICBsaW5rSWQ6IGUubGlua0lkLFxuICAgICAgICAgIHRleHQ6IHRleHQubGVuZ3RoID4gTUFYX1FfTEVOID8gdGV4dC5zdWJzdHJpbmcoMCwgTUFYX1FfTEVOKSArICcuLi4nIDogdGV4dCxcbiAgICAgICAgICB1bml0OiB0aGlzLmdldFF1ZXN0aW9uVW5pdHMoZS5saW5rSWQpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5xdWVzdGlvbnNDaGFuZ2UubmV4dCh0aGlzLnF1ZXN0aW9ucyk7XG5cbiAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmV4dHJhY3RFeHByZXNzaW9uKGV4cHJlc3Npb25VcmksIHRoaXMuZmhpci5pdGVtLCBsaW5rSWRDb250ZXh0KTtcblxuICAgICAgaWYgKGV4cHJlc3Npb24gIT09IG51bGwpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmZpbmFsRXhwcmVzc2lvbiA9IGV4cHJlc3Npb24udmFsdWVFeHByZXNzaW9uLmV4cHJlc3Npb247XG4gICAgICAgIHRoaXMuZmluYWxFeHByZXNzaW9uQ2hhbmdlLm5leHQodGhpcy5maW5hbEV4cHJlc3Npb24pO1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVN5bnRheCA9IHRoaXMuZXh0cmFjdFNpbXBsZVN5bnRheChleHByZXNzaW9uKTtcblxuICAgICAgICBpZiAoc2ltcGxlU3ludGF4ID09PSBudWxsICYmIHRoaXMuZmluYWxFeHByZXNzaW9uICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3ludGF4VHlwZSA9ICdmaGlycGF0aCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zeW50YXhUeXBlID0gJ3NpbXBsZSc7XG4gICAgICAgICAgdGhpcy5zaW1wbGVFeHByZXNzaW9uID0gc2ltcGxlU3ludGF4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgbmVzdGVkIEZISVIgUXVlc3Rpb25uYWlyZSBpdGVtc1xuICAgKiBAcGFyYW0gaXRlbXMgLSBDdXJyZW50IGxldmVsIG9mIGl0ZW0gbmVzdGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzSXRlbShpdGVtcyk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goKGUpID0+IHtcbiAgICAgIHRoaXMubGlua0lkVG9RdWVzdGlvbltlLmxpbmtJZF0gPSBlO1xuICAgICAgaWYgKGUuaXRlbSkge1xuICAgICAgICB0aGlzLnByb2Nlc3NJdGVtKGUuaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuZCByZW1vdmUgdGhlIHNpbXBsZSBzeW50YXggaWYgYXZhaWxhYmxlLiBJZiBub3QgcmV0dXJuIG51bGxcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIGV4dHJhY3RTaW1wbGVTeW50YXgoZXhwcmVzc2lvbik6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAoZXhwcmVzc2lvbi5leHRlbnNpb24pIHtcbiAgICAgIGNvbnN0IGN1c3RvbUV4dGVuc2lvbiA9IGV4cHJlc3Npb24uZXh0ZW5zaW9uLmZpbmQoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUudXJsID09PSB0aGlzLlNJTVBMRV9TWU5UQVhfRVhURU5TSU9OO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChjdXN0b21FeHRlbnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY3VzdG9tRXh0ZW5zaW9uLnZhbHVlU3RyaW5nOyAgLy8gVE9ETyBtb3ZlIHRvIGNvZGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW5kIHJlbW92ZSB0aGUgZmluYWwgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gZXhwcmVzc2lvblVyaSAtIEV4cHJlc3Npb24gZXh0ZW5zaW9uIFVSTFxuICAgKiBAcGFyYW0gaXRlbXMgLSBGSElSIHF1ZXN0aW9ubmFpcmUgaXRlbSBhcnJheVxuICAgKiBAcGFyYW0gbGlua0lkIC0gbGlua0lkIG9mIHF1ZXN0aW9uIHdoZXJlIHRvIGV4dHJhY3QgZXhwcmVzc2lvblxuICAgKi9cbiAgZXh0cmFjdEV4cHJlc3Npb24oZXhwcmVzc2lvblVyaSwgaXRlbXMsIGxpbmtJZCk6IG9iamVjdHxudWxsIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChpdGVtLmV4dGVuc2lvbikge1xuICAgICAgICBjb25zdCBleHRlbnNpb25JbmRleCA9IGl0ZW0uZXh0ZW5zaW9uLmZpbmRJbmRleCgoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBlLnVybCA9PT0gZXhwcmVzc2lvblVyaSAmJiBlLnZhbHVlRXhwcmVzc2lvbi5sYW5ndWFnZSA9PT0gdGhpcy5MQU5HVUFHRV9GSElSUEFUSCAmJlxuICAgICAgICAgICAgZS52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbiA9IGl0ZW0uZXh0ZW5zaW9uW2V4dGVuc2lvbkluZGV4XTtcbiAgICAgICAgICBpdGVtLmV4dGVuc2lvbi5zcGxpY2UoZXh0ZW5zaW9uSW5kZXgsIDEpO1xuXG4gICAgICAgICAgcmV0dXJuIGZpbmFsRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEV4cHJlc3Npb24oZXhwcmVzc2lvblVyaSwgaXRlbS5pdGVtLCBsaW5rSWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYSBGSElSUGF0aCBleHByZXNzaW9uIGludG8gYSBtb3JlIHVzZXIgZnJpZW5kbHkgZm9ybWF0IGlmIHBvc3NpYmxlLlxuICAgKiBJZiB0aGUgZm9ybWF0IG9mIHRoZSBGSElSUGF0aCBtYXRjaGVzIGEgZm9ybWF0IHdlIGNhbiBkaXNwbGF5IHdpdGggYVxuICAgKiBxdWVzdGlvbiBkcm9wZG93biwgZXRjIHNob3cgdGhhdC4gSWYgbm90IHNob3cgdGhlIEZISVJQYXRoIGV4cHJlc3Npb24uXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSB0byBhc3NpZ24gdmFyaWFibGVcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gLSBFeHByZXNzaW9uIHRvIHByb2Nlc3NcbiAgICogQHBhcmFtIGluZGV4IC0gT3JpZ2luYWwgb3JkZXIgaW4gZXh0ZW5zaW9uIGxpc3RcbiAgICogQHJldHVybiBWYXJpYWJsZSB0eXBlIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHRoZSBSdWxlIEVkaXRvciB0byBzaG93IGFcbiAgICogcXVlc3Rpb24sIGV4cHJlc3Npb24gZXRjXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHByb2Nlc3NWYXJpYWJsZShuYW1lLCBleHByZXNzaW9uLCBpbmRleD86IG51bWJlcik6IFZhcmlhYmxlIHtcbiAgICBjb25zdCBtYXRjaGVzID0gZXhwcmVzc2lvbi5tYXRjaCh0aGlzLlFVRVNUSU9OX1JFR0VYKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBsaW5rSWQgPSBtYXRjaGVzWzFdO1xuICAgICAgY29uc3QgZmFjdG9yID0gbWF0Y2hlc1syXTtcblxuICAgICAgY29uc3QgdmFyaWFibGU6IFZhcmlhYmxlID0ge1xuICAgICAgICBfaW5kZXg6IGluZGV4LFxuICAgICAgICBsYWJlbDogbmFtZSxcbiAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcbiAgICAgICAgbGlua0lkLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9O1xuXG4gICAgICBpZiAoZmFjdG9yKSB7XG4gICAgICAgIC8vIFdlIG1pZ2h0IGJlIGFibGUgdG8gZG8gdW5pdCBjb252ZXJzaW9uXG4gICAgICAgIGNvbnN0IHNvdXJjZVVuaXRzID0gdGhpcy5nZXRRdWVzdGlvblVuaXRzKGxpbmtJZCk7XG5cbiAgICAgICAgaWYgKFVOSVRfQ09OVkVSU0lPTi5oYXNPd25Qcm9wZXJ0eShzb3VyY2VVbml0cykpIHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzaW9ucyA9IFVOSVRfQ09OVkVSU0lPTltzb3VyY2VVbml0c107XG4gICAgICAgICAgY29uc3QgY29udmVyc2lvbiA9IGNvbnZlcnNpb25zLmZpbmQoKGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlLmZhY3Rvci50b1N0cmluZygpID09PSBmYWN0b3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXJpYWJsZS51bml0ID0gY29udmVyc2lvbi51bml0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YXJpYWJsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgX2luZGV4OiBpbmRleCxcbiAgICAgICAgbGFiZWw6IG5hbWUsXG4gICAgICAgIHR5cGU6ICdleHByZXNzaW9uJyxcbiAgICAgICAgZXhwcmVzc2lvblxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIGNoZWNrIGJlaGF2aW9yIG9mIHJlcGVhdGluZyBsaW5rSWRcbiAgLyoqXG4gICAqIEdldCBxdWVzdGlvbiB1bml0cyBmb3IgdGhlIHF1ZXN0aW9uXG4gICAqIEBwYXJhbSBsaW5rSWQgLSBRdWVzdGlvbiBsaW5rSWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZ2V0UXVlc3Rpb25Vbml0cyhsaW5rSWQpOiBzdHJpbmcge1xuICAgIGNvbnN0IFFVRVNUSU9OTkFJUkVfVU5JVCA9ICdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vcXVlc3Rpb25uYWlyZS11bml0JztcbiAgICBjb25zdCBxdWVzdGlvbiA9IHRoaXMubGlua0lkVG9RdWVzdGlvbltsaW5rSWRdO1xuXG4gICAgaWYgKHF1ZXN0aW9uLmV4dGVuc2lvbikge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gcXVlc3Rpb24uZXh0ZW5zaW9uLmZpbmQoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUudXJsID09PSBRVUVTVElPTk5BSVJFX1VOSVQgJiZcbiAgICAgICAgICBlLnZhbHVlQ29kaW5nLnN5c3RlbSAmJiBlLnZhbHVlQ29kaW5nLnN5c3RlbSA9PT0gJ2h0dHA6Ly91bml0c29mbWVhc3VyZS5vcmcnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChleHRlbnNpb24gJiYgZXh0ZW5zaW9uLnZhbHVlQ29kaW5nLmNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbi52YWx1ZUNvZGluZy5jb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgbGFiZWwgbmFtZSBsaWtlIEEsIEIsIEMsIC4uLiBBQSwgQUIgd2hpY2ggaXMgbm90IGFscmVhZHkgdXNlZFxuICAgKiBAcGFyYW0gZXhpc3RpbmdOYW1lcyB7c3RyaW5nW119IC0gQXJyYXkgb2YgbmFtZXMgYWxyZWFkeSB1c2VkIGJ5IGV4aXN0aW5nIHZhcmlhYmxlc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXROZXdMYWJlbE5hbWUoZXhpc3RpbmdOYW1lczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgIC8vIEFsbCBsZXR0ZXJzIHdoaWNoIGNhbiBiZSB1c2VkIGZvciBhIHNpbXBsZSB2YXJpYWJsZSBuYW1lXG4gICAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCcnKTtcblxuICAgIC8vIEZpcnN0IHBhc3MgaXMgd2l0aCBhIHNpbmdsZSBjaGFyYWN0ZXIgdmFyaWFibGUgbmFtZS4gT3RoZXIgcGFzc2VzIGFyZSB3aXRoIHR3b1xuICAgIGNvbnN0IGZpcnN0TGV0dGVyQWxwaGFiZXQgPSBbJyddLmNvbmNhdChhbHBoYWJldCk7XG4gICAgZm9yIChjb25zdCBmaXJzdExldHRlciBvZiBmaXJzdExldHRlckFscGhhYmV0KSB7XG4gICAgICBmb3IgKGNvbnN0IHNlY29uZExldHRlciBvZiBhbHBoYWJldCkge1xuICAgICAgICBjb25zdCBwb3RlbnRpYWxOYW1lID0gZmlyc3RMZXR0ZXIgKyBzZWNvbmRMZXR0ZXI7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBleGlzdGluZ05hbWVzLmZpbHRlcigoZSkgPT4gZSA9PT0gcG90ZW50aWFsTmFtZSk7XG5cbiAgICAgICAgaWYgKGNvdW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBwb3RlbnRpYWxOYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgcmV0dXJuIGEgc3VnZ2VzdGVkIG5hbWUgaWYgd2UgZXhoYXVzdGVkIGFsbCBjb21iaW5hdGlvbnNcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBtaWdodEJlU2NvcmVcbiAgICovXG4gIHRvZ2dsZU1pZ2h0QmVTY29yZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1pZ2h0QmVTY29yZSA9ICF0aGlzLm1pZ2h0QmVTY29yZTtcbiAgICB0aGlzLm1pZ2h0QmVTY29yZUNoYW5nZS5uZXh0KHRoaXMubWlnaHRCZVNjb3JlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdmFyaWFibGVzIGFuZCBmaW5hbEV4cHJlc3Npb24gYW5kIHJldHVybiB0aGUgbmV3IEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKiBAcGFyYW0gdXJsIEV4dGVuc2lvbiBVUkwgdG8gdXNlIGZvciB0aGUgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gZmluYWxFeHByZXNzaW9uXG4gICAqL1xuICBleHBvcnQodXJsOiBzdHJpbmcsIGZpbmFsRXhwcmVzc2lvbjogc3RyaW5nKTogb2JqZWN0IHtcbiAgICAvLyBUT0RPIHN1cHBvcnQgZm9yIGRpZmZlcmVudCB2YXJpYWJsZSBzY29wZXNcbiAgICAvLyBDb3B5IHRoZSBmaGlyIG9iamVjdCBzbyB3ZSBjYW4gZXhwb3J0IG1vcmUgdGhhbiBvbmNlXG4gICAgLy8gKGlmIHdlIGFkZCBvdXIgZGF0YSB0aGUgc2Vjb25kIGV4cG9ydCB3aWxsIGhhdmUgZHVwbGljYXRlcylcbiAgICBjb25zdCBmaGlyID0gY29weSh0aGlzLmZoaXIpO1xuXG4gICAgY29uc3QgdmFyaWFibGVzVG9BZGQgPSB0aGlzLnZhcmlhYmxlcy5tYXAoKGUpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIF9pbmRleDogZS5faW5kZXgsXG4gICAgICAgIHVybDogdGhpcy5WQVJJQUJMRV9FWFRFTlNJT04sXG4gICAgICAgIHZhbHVlRXhwcmVzc2lvbjoge1xuICAgICAgICAgIG5hbWU6IGUubGFiZWwsXG4gICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgsXG4gICAgICAgICAgZXhwcmVzc2lvbjogZS5leHByZXNzaW9uXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBTcGxpdCB0aGUgdmFyaWFibGVzIGludG8gdHdvIGJ1Y2tldHM6IFZhcmlhYmxlcyBwcmVzZW50IHdoZW5cbiAgICAvLyBRdWVzdGlvbm5haXJlIHdhcyBpbXBvcnRlZCBhbmQgdmFyaWFibGVzIGFkZGVkIGJ5IHRoZSB1c2VyIHVzaW5nIHRoZSBSdWxlXG4gICAgLy8gRWRpdG9yLiBBZGQgdmFyaWFibGVzIHByZXNlbnQgaW5pdGlhbGx5IGFtb25nIHRoZSBleGlzdGluZyBleHRlbnNpb25zLlxuICAgIC8vIEFkZCB0aGUgcmVtYWluaW5nIHZhcmlhYmxlcyBhdCB0aGUgZW5kXG4gICAgY29uc3QgdmFyaWFibGVzUHJlc2VudEluaXRpYWxseSA9IFtdO1xuICAgIGNvbnN0IHZhcmlhYmxlc0FkZGVkID0gW107XG5cbiAgICB2YXJpYWJsZXNUb0FkZC5mb3JFYWNoKGUgPT4ge1xuICAgICAgaWYgKGUuX2luZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyaWFibGVzQWRkZWQucHVzaChlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhcmlhYmxlc1ByZXNlbnRJbml0aWFsbHkucHVzaChlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChmaGlyLmV4dGVuc2lvbikge1xuICAgICAgLy8gSW50cm9kdWNlIHZhcmlhYmxlcyBwcmVzZW50IGJlZm9yZVxuICAgICAgZmhpci5leHRlbnNpb24gPSBmaGlyLmV4dGVuc2lvbi5jb25jYXQodmFyaWFibGVzUHJlc2VudEluaXRpYWxseSk7XG4gICAgICAvLyBTb3J0IGJ5IGluZGV4XG4gICAgICBmaGlyLmV4dGVuc2lvbi5zb3J0KChhLCBiKSA9PiBhLl9pbmRleCAtIGIuX2luZGV4KTtcbiAgICAgIC8vIEFkZCB2YXJpYWJsZXMgYWRkZWQgYnkgdGhlIHVzZXJcbiAgICAgIGZoaXIuZXh0ZW5zaW9uID0gZmhpci5leHRlbnNpb24uY29uY2F0KHZhcmlhYmxlc0FkZGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmhpci5leHRlbnNpb24gPSB2YXJpYWJsZXNQcmVzZW50SW5pdGlhbGx5LmNvbmNhdCh2YXJpYWJsZXNBZGRlZCk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIF9pbmRleFxuICAgIGZoaXIuZXh0ZW5zaW9uID0gZmhpci5leHRlbnNpb24ubWFwKCh7X2luZGV4LCAuLi5vdGhlcn0pID0+IG90aGVyKTtcblxuICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbkV4dGVuc2lvbjogYW55ID0ge1xuICAgICAgdXJsLFxuICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgIGxhbmd1YWdlOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICBleHByZXNzaW9uOiBmaW5hbEV4cHJlc3Npb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVE9ETyBrZWVwIGV4aXN0aW5nIGV4dGVuc2lvbnNcbiAgICBpZiAodGhpcy5zeW50YXhUeXBlID09PSAnc2ltcGxlJykge1xuICAgICAgZmluYWxFeHByZXNzaW9uRXh0ZW5zaW9uLmV4dGVuc2lvbiA9IFt7XG4gICAgICAgIHVybDogdGhpcy5TSU1QTEVfU1lOVEFYX0VYVEVOU0lPTixcbiAgICAgICAgdmFsdWVTdHJpbmc6IHRoaXMuc2ltcGxlRXhwcmVzc2lvblxuICAgICAgfV07XG4gICAgfVxuXG4gICAgdGhpcy5pbnNlcnRFeHRlbnNpb25zKGZoaXIuaXRlbSwgdGhpcy5saW5rSWRDb250ZXh0LCBbZmluYWxFeHByZXNzaW9uRXh0ZW5zaW9uXSk7XG5cbiAgICByZXR1cm4gZmhpcjtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRha2VzIEZISVIgcXVlc3Rpb25uYWlyZSBkZWZpbml0aW9uIGFuZCBhIGxpbmtJZCBhbmQgcmV0dXJucyB0aGUgRkhJUlxuICAgKiBRdWVzdGlvbm5haXJlIHdpdGggYSBjYWxjdWxhdGVkIGV4cHJlc3Npb24gYXQgdGhlIGdpdmVuIGxpbmtJZCB3aGljaCBzdW1zIHVwXG4gICAqIGFsbCB0aGUgb3JkaW5hbCB2YWx1ZXMgaW4gdGhlIHF1ZXN0aW9ubmFpcmVcbiAgICovXG4gIGFkZFRvdGFsU2NvcmVSdWxlKGZoaXIsIGxpbmtJZCk6IG9iamVjdCB7XG4gICAgdGhpcy5maGlyID0gZmhpcjtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSBsaW5rSWQ7XG4gICAgcmV0dXJuIHRoaXMuYWRkU3VtT2ZTY29yZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiB0aGUgY3VycmVudCBGSElSIHF1ZXN0aW9ubmFpcmUgZGVmaW5pdGlvbiBhbmQgYSBsaW5rSWQgcmV0dXJuIGEgbmV3IEZISVJcbiAgICogUXVlc3Rpb25uYWlyZSB3aXRoIGEgY2FsY3VsYXRlZCBleHByZXNzaW9uIGF0IHRoZSBnaXZlbiBsaW5rSWQgd2hpY2ggc3VtcyB1cFxuICAgKiBhbGwgdGhlIG9yZGluYWwgdmFsdWVzIGluIHRoZSBxdWVzdGlvbm5haXJlXG4gICAqL1xuICBhZGRTdW1PZlNjb3JlcygpOiBvYmplY3Qge1xuICAgIGNvbnN0IGZoaXIgPSB0aGlzLmZoaXI7XG4gICAgY29uc3QgbGlua0lkQ29udGV4dCA9IHRoaXMubGlua0lkQ29udGV4dDtcblxuICAgIGNvbnN0IHZhcmlhYmxlTmFtZXMgPSBbXTtcbiAgICBjb25zdCBzY29yZVF1ZXN0aW9uTGlua0lkcyA9IFtdO1xuXG4gICAgLy8gR2V0IGFuIGFycmF5IG9mIGxpbmtJZHMgZm9yIHNjb3JlIHF1ZXN0aW9uc1xuICAgIGZoaXIuaXRlbS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5saW5rSWQgIT09IGxpbmtJZENvbnRleHQgJiYgdGhpcy5pdGVtSGFzU2NvcmUoaXRlbSkpIHtcbiAgICAgICAgc2NvcmVRdWVzdGlvbkxpbmtJZHMucHVzaChpdGVtLmxpbmtJZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBHZXQgYXMgbWFueSBzaG9ydCBzdWdnZXN0ZWQgdmFyaWFibGUgbmFtZXMgYXMgd2UgaGF2ZSBzY29yZSBxdWVzdGlvbnNcbiAgICBzY29yZVF1ZXN0aW9uTGlua0lkcy5mb3JFYWNoKCgpID0+IHtcbiAgICAgIHZhcmlhYmxlTmFtZXMucHVzaCh0aGlzLmdldE5ld0xhYmVsTmFtZSh2YXJpYWJsZU5hbWVzKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzY29yZVF1ZXN0aW9ucyA9IHNjb3JlUXVlc3Rpb25MaW5rSWRzLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiB0aGlzLlZBUklBQkxFX0VYVEVOU0lPTixcbiAgICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgICAgbmFtZTogdmFyaWFibGVOYW1lc1tpXSxcbiAgICAgICAgICBsYW5ndWFnZTogdGhpcy5MQU5HVUFHRV9GSElSUEFUSCxcbiAgICAgICAgICBleHByZXNzaW9uOiBgJXF1ZXN0aW9ubmFpcmUuaXRlbS53aGVyZShsaW5rSWQgPSAnJHtlfScpLmFuc3dlck9wdGlvbmAgK1xuICAgICAgICAgICAgYC53aGVyZSh2YWx1ZUNvZGluZy5jb2RlPSVyZXNvdXJjZS5pdGVtLndoZXJlKGxpbmtJZCA9ICcke2V9JykuYW5zd2VyLnZhbHVlQ29kaW5nLmNvZGUpLmV4dGVuc2lvbmAgK1xuICAgICAgICAgICAgYC53aGVyZSh1cmw9J2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9vcmRpbmFsVmFsdWUnKS52YWx1ZURlY2ltYWxgLFxuICAgICAgICAgIGV4dGVuc2lvbjogW3tcbiAgICAgICAgICAgIHVybDogdGhpcy5TQ09SRV9WQVJJQUJMRV9FWFRFTlNJT05cbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgYW55UXVlc3Rpb25BbnN3ZXJlZCA9IHtcbiAgICAgIHVybDogdGhpcy5WQVJJQUJMRV9FWFRFTlNJT04sXG4gICAgICB2YWx1ZUV4cHJlc3Npb246IHtcbiAgICAgICAgbmFtZTogJ2FueV9xdWVzdGlvbnNfYW5zd2VyZWQnLFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5MQU5HVUFHRV9GSElSUEFUSCxcbiAgICAgICAgZXhwcmVzc2lvbjogdmFyaWFibGVOYW1lcy5tYXAoKGUpID0+IGAlJHtlfS5leGlzdHMoKWApLmpvaW4oJyBvciAnKSxcbiAgICAgICAgZXh0ZW5zaW9uOiBbe1xuICAgICAgICAgIHVybDogdGhpcy5TQ09SRV9WQVJJQUJMRV9FWFRFTlNJT05cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc3VtU3RyaW5nID0gdmFyaWFibGVOYW1lcy5tYXAoKGUpID0+IGBpaWYoJSR7ZX0uZXhpc3RzKCksICUke2V9LCAwKWApLmpvaW4oJyArICcpO1xuXG4gICAgY29uc3QgdG90YWxDYWxjdWxhdGlvbiA9IHtcbiAgICAgIHVybDogdGhpcy5DQUxDVUxBVEVEX0VYUFJFU1NJT04sXG4gICAgICB2YWx1ZUV4cHJlc3Npb246IHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdUb3RhbCBzY29yZSBjYWxjdWxhdGlvbicsXG4gICAgICAgIGxhbmd1YWdlOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICBleHByZXNzaW9uOiBgaWlmKCVhbnlfcXVlc3Rpb25zX2Fuc3dlcmVkLCAke3N1bVN0cmluZ30sIHt9KWAsXG4gICAgICAgIGV4dGVuc2lvbjogW3tcbiAgICAgICAgICB1cmw6IHRoaXMuU0NPUkVfRVhQUkVTU0lPTl9FWFRFTlNJT05cbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2NvcmVRdWVzdGlvbnMucHVzaChhbnlRdWVzdGlvbkFuc3dlcmVkKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgc2NvcmVRdWVzdGlvbnMucHVzaCh0b3RhbENhbGN1bGF0aW9uKTtcblxuICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhmaGlyLml0ZW0sIGxpbmtJZENvbnRleHQsIHNjb3JlUXVlc3Rpb25zKTtcblxuICAgIHJldHVybiBmaGlyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW55IHNjb3JlIGNhbGN1bGF0aW9uIGFkZGVkIGJ5IHRoZSBydWxlIGVkaXRvclxuICAgKiBAcGFyYW0gcXVlc3Rpb25uYWlyZSAtIEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKiBAcmV0dXJuIFF1ZXN0aW9ubmFpcmUgd2l0aG91dCB0aGUgc2NvcmUgY2FsY3VsYXRpb24gdmFyaWFibGUgYW5kIGV4cHJlc3Npb25cbiAgICovXG4gIHJlbW92ZVN1bU9mU2NvcmVzKHF1ZXN0aW9ubmFpcmUpOiBvYmplY3Qge1xuICAgIC8vIERlZXAgY29weVxuICAgIGNvbnN0IHF1ZXN0aW9ubmFpcmVXaXRob3V0U2NvcmVzID0gY29weShxdWVzdGlvbm5haXJlKTtcblxuICAgIGNvbnN0IHJlbW92ZUl0ZW1TY29yZVZhcmlhYmxlcyA9IChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmV4dGVuc2lvbiA9IGl0ZW0uZXh0ZW5zaW9uLmZpbHRlcigoZXh0ZW5zaW9uKSA9PiAhdGhpcy5pc1Njb3JlRXh0ZW5zaW9uKGV4dGVuc2lvbikpO1xuICAgICAgaWYgKGl0ZW0uaXRlbSkge1xuICAgICAgICBpdGVtLml0ZW0uZm9yRWFjaCgoc3ViSXRlbSkgPT4gcmVtb3ZlSXRlbVNjb3JlVmFyaWFibGVzKHN1Ykl0ZW0pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcXVlc3Rpb25uYWlyZVdpdGhvdXRTY29yZXMuaXRlbS5mb3JFYWNoKHJlbW92ZUl0ZW1TY29yZVZhcmlhYmxlcyk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb25uYWlyZVdpdGhvdXRTY29yZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBleHRlbnNpb24gaGFzIGFuIGV4dGVuc2lvbiBmb3IgY2FsY3VsYXRpbmcgc2NvcmUgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqIEBwYXJhbSBleHRlbnNpb24gLSBGSElSIEV4dGVuc2lvbiBvYmplY3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgaXNTY29yZUV4dGVuc2lvbihleHRlbnNpb24pOiBib29sZWFuIHtcbiAgICBpZiAoZXh0ZW5zaW9uLnZhbHVlRXhwcmVzc2lvbiAmJiBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uLmV4dGVuc2lvbiAmJlxuICAgICAgZXh0ZW5zaW9uLnZhbHVlRXhwcmVzc2lvbi5leHRlbnNpb24ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gISFleHRlbnNpb24udmFsdWVFeHByZXNzaW9uLmV4dGVuc2lvbi5maW5kKGUgPT4gZSAmJlxuICAgICAgICAoZS51cmwgPT09IHRoaXMuU0NPUkVfVkFSSUFCTEVfRVhURU5TSU9OIHx8XG4gICAgICAgICAgZS51cmwgPT09IHRoaXMuU0NPUkVfRVhQUkVTU0lPTl9FWFRFTlNJT04pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0RXh0ZW5zaW9ucyhpdGVtcywgbGlua0lkLCBleHRlbnNpb25zKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoaXRlbS5saW5rSWQgPT09IGxpbmtJZCkge1xuICAgICAgICBpZiAoaXRlbS5leHRlbnNpb24pIHtcbiAgICAgICAgICBpdGVtLmV4dGVuc2lvbiA9IGl0ZW0uZXh0ZW5zaW9uLmNvbmNhdChleHRlbnNpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmV4dGVuc2lvbiA9IGV4dGVuc2lvbnM7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbSkge1xuICAgICAgICB0aGlzLmluc2VydEV4dGVuc2lvbnMoaXRlbS5pdGVtLCBsaW5rSWQsIGV4dGVuc2lvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cHJlc3Npb24gZm9yIGEgcXVlc3Rpb25cbiAgICogQHBhcmFtIGxpbmtJZCAtIFF1ZXN0aW9uIGxpbmtJZFxuICAgKiBAcGFyYW0gaXRlbUhhc1Njb3JlIC0gQW5zd2VyIGhhcyBhbiBvcmRpbmFsVmFsdWUgZXh0ZW5zaW9uXG4gICAqIEBwYXJhbSBjb252ZXJ0aWJsZSAtIFVuaXRzIGNhbiBiZSBjb252ZXJ0ZWRcbiAgICogQHBhcmFtIHVuaXQgLSBCYXNlIHVuaXRzXG4gICAqIEBwYXJhbSB0b1VuaXQgLSBEZXN0aW5hdGlvbiB1bml0c1xuICAgKi9cbiAgdmFsdWVPclNjb3JlRXhwcmVzc2lvbihsaW5rSWQ6IHN0cmluZywgaXRlbUhhc1Njb3JlOiBib29sZWFuLCBjb252ZXJ0aWJsZTogYm9vbGVhbiwgdW5pdDogc3RyaW5nLCB0b1VuaXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW1IYXNTY29yZSkge1xuICAgICAgcmV0dXJuIGAlcXVlc3Rpb25uYWlyZS5pdGVtLndoZXJlKGxpbmtJZCA9ICcke2xpbmtJZH0nKS5hbnN3ZXJPcHRpb25gICtcbiAgICAgICAgYC53aGVyZSh2YWx1ZUNvZGluZy5jb2RlPSVyZXNvdXJjZS5pdGVtLndoZXJlKGxpbmtJZCA9ICcke2xpbmtJZH0nKS5hbnN3ZXIudmFsdWVDb2RpbmcuY29kZSkuZXh0ZW5zaW9uYCArXG4gICAgICAgIGAud2hlcmUodXJsPSdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vb3JkaW5hbFZhbHVlJykudmFsdWVEZWNpbWFsYDtcbiAgICB9IGVsc2UgaWYgKGNvbnZlcnRpYmxlICYmIHVuaXQgJiYgdG9Vbml0KSB7XG4gICAgICBjb25zdCBmYWN0b3IgPSBVTklUX0NPTlZFUlNJT05bdW5pdF0uZmluZCgoZSkgPT4gZS51bml0ID09PSB0b1VuaXQpLmZhY3RvcjtcbiAgICAgIHJldHVybiBgJXJlc291cmNlLml0ZW0ud2hlcmUobGlua0lkPScke2xpbmtJZH0nKS5hbnN3ZXIudmFsdWUqJHtmYWN0b3J9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAlcmVzb3VyY2UuaXRlbS53aGVyZShsaW5rSWQ9JyR7bGlua0lkfScpLmFuc3dlci52YWx1ZWA7XG4gICAgfVxuICB9XG59XG4iXX0=
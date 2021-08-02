import { __rest } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, Pipe, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import * as mathToFhirpath from 'math-to-fhirpath';

// Supported unit conversions. Key is the "from" and value is the "to" array
const UNIT_CONVERSION = {
    kg: [{ unit: 'lbs', factor: 2.20462 }],
    lbs: [{ unit: 'kg', factor: 0.453592 }],
    '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
};

class RuleEditorService {
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

class RuleEditorComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.lhcStyle = {};
        this.save = new EventEmitter();
        this.datePipe = new DatePipe('en-US');
        this.suggestions = [];
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
    }
    /**
     * Angular lifecycle hook called on input changes
     */
    ngOnChanges(args) {
        this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */
    reload() {
        if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
            this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
        }
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.calculateSum = this.variableService.mightBeScore;
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
            this.calculateSum = mightBeScore;
        });
        this.finalExpression = this.variableService.finalExpression;
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
            this.finalExpression = finalExpression;
        });
        this.variables = this.variableService.variables.map(e => e.label);
        this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
            this.variables = variables.map(e => e.label);
        });
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export() {
        this.save.emit(this.variableService.export(this.expressionUri, this.finalExpression));
    }
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */
    addSumOfScores() {
        this.save.emit(this.variableService.addSumOfScores());
    }
    /**
     * Called when the syntax type is changed to clean up expressions if the data cannot be converted
     * @param $event - event from from the caller
     */
    onSyntaxChange($event) {
        const newSyntax = $event.value;
        // Clear the existing expression if switching away from fhirpath
        if (newSyntax === 'simple') {
            this.finalExpression = '';
        }
        this.variableService.syntaxType = newSyntax;
    }
    /**
     * Update the final expression
     */
    updateFinalExpression(expression) {
        this.finalExpression = expression;
    }
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<lhc-calculate-sum-prompt *ngIf=\"calculateSum\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Simple Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter [expression]=\"simpleExpression\" [variables]=\"variables\" *ngSwitchCase=\"'simple'\" (expressionChange)=\"updateFinalExpression($event)\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n    </div>\n    <div *ngIf=\"suggestions.length\">{{suggestions|json}}</div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 auto}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
            },] }
];
RuleEditorComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
RuleEditorComponent.propDecorators = {
    fhirQuestionnaire: [{ type: Input }],
    itemLinkId: [{ type: Input }],
    submitButtonName: [{ type: Input }],
    titleName: [{ type: Input }],
    expressionLabel: [{ type: Input }],
    expressionUri: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    save: [{ type: Output }]
};

var VariableType;
(function (VariableType) {
    VariableType["question"] = "Question";
    VariableType["expression"] = "FHIRPath Expression";
    VariableType["simple"] = "Simple Expression";
})(VariableType || (VariableType = {}));

class VariablesComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.variableType = VariableType;
        this.levels = [{
                level: 0,
                name: 'Top Level Scope'
            }
        ];
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.variables = this.ruleEditorService.variables;
        this.variableSubscription = this.ruleEditorService.variablesChange.subscribe((variables) => {
            this.variables = variables;
        });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.variableSubscription.unsubscribe();
    }
    /**
     * Called when adding a new variable
     */
    onAdd() {
        this.ruleEditorService.addVariable();
    }
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.ruleEditorService.remove(i);
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
    }
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    getAvailableVariables(index) {
        const uneditableVariables = this.ruleEditorService.uneditableVariables.map((e) => e.name);
        // Only return variables up to but not including index
        const editableVariables = this.variables.map((e) => e.label).slice(0, index);
        return uneditableVariables.concat(editableVariables);
    }
}
VariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-variables',
                template: "<h2 [style]=\"lhcStyle.h2\">Variables</h2>\n\n<div class=\"container\">\n  <div class=\"variable-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"variable-column-label\">Label</div>\n    <div class=\"variable-column-type\">Type</div>\n    <div class=\"variable-column-details\">Question/FHIRPath Expression</div>\n    <div class=\"variable-column-actions\">Actions</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"variable-column-label\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" [style]=\"lhcStyle.input\" class=\"label\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"variable-column-type\">\n        <select [id]=\"'variable-type-' + i\" [(ngModel)]=\"variable.type\" [style]=\"lhcStyle.select\" aria-label=\"Variable type\">\n          <option value=\"\" disabled hidden>Select...</option>\n          <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n        </select>\n      </div>\n      <div class=\"variable-column-details\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" *ngSwitchCase=\"'question'\" [lhcStyle]=\"lhcStyle\"></lhc-question>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.simple\" [style]=\"lhcStyle.input\"\n                 aria-label=\"Simple Expression\" />\n          <lhc-syntax-preview [syntax]=\"variable.simple | mathToFhirpath:getAvailableVariables(i)\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-preview>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\" aria-label=\"FHIRPath Expression\" />\n        </div>\n      </div>\n      <div class=\"variable-column-actions\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove Line\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"no-variables\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add variable</button>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-column-label>input,.variable-column-type select{width:100%;height:2rem;font-size:1rem}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.label{flex-grow:100}.variable-column-type{flex:0 0 13em}.variable-column-details{flex:1 0 25em;min-width:0}.variable-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:20 0 10em}.variable-column-actions{flex:auto}}.drag-variable{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.no-variables{padding:2rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            },] }
];
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    lhcStyle: [{ type: Input }]
};

class UneditableVariablesComponent {
    constructor(variableService) {
        this.variableService = variableService;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.uneditableVariables = this.variableService.uneditableVariables;
        this.uneditableVariablesSubscription =
            this.variableService.uneditableVariablesChange.subscribe((variables) => {
                this.uneditableVariables = variables;
            });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.uneditableVariablesSubscription.unsubscribe();
    }
}
UneditableVariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-uneditable-variables',
                template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Un-editable Variables</h2>\n\n  <div class=\"container mb-4\">\n    <div class=\"row font-weight-bold\" aria-hidden=\"true\">\n      <div class=\"col-2\">Label</div>\n      <div class=\"col-2\">Type</div>\n      <div class=\"col-8\">Description</div>\n    </div>\n    <hr>\n    <div class=\"row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.name}}</div>\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.type}}</div>\n      <div class=\"col-8\"><span class=\"sr-only\">Description</span>{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n"
            },] }
];
UneditableVariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];

class QuestionComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.lhcStyle = {};
        this.linkId = '';
        this.itemHasScore = false;
        this.isNonConvertibleUnit = false;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.linkId = this.variable.linkId ? this.variable.linkId : '';
        this.toUnit = this.variable.unit ? this.variable.unit : '';
        this.questions = this.variableService.questions;
        this.onChange(false);
        this.variableService.questionsChange.subscribe((questions) => {
            this.questions = questions;
        });
    }
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */
    getQuestion(linkId) {
        return this.questions.find((q) => {
            return q.linkId === linkId;
        });
    }
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */
    getConversionOptions(unit) {
        return UNIT_CONVERSION[unit];
    }
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */
    onChange(isQuestion) {
        if (isQuestion) {
            // Reset the conversion options when the question changes
            this.toUnit = '';
        }
        // If we already have a question selected (as opposed to the select... prompt)
        if (this.linkId) {
            const question = this.getQuestion(this.linkId);
            this.unit = question === null || question === void 0 ? void 0 : question.unit;
            this.conversionOptions = this.getConversionOptions(this.unit);
            this.isNonConvertibleUnit = this.unit && !this.conversionOptions;
            // Check if this is a score
            if (!this.conversionOptions && !this.isNonConvertibleUnit) {
                this.itemHasScore = this.variableService.itemHasScore(this.linkId);
            }
            else {
                this.itemHasScore = false;
            }
            this.variable.expression = this.variableService.valueOrScoreExpression(this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
        }
    }
}
QuestionComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-question',
                template: "<div class=\"form-inline question\">\n  <div class=\"question-select\">\n    <select [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" [style]=\"lhcStyle.select\" aria-label=\"Question\">\n      <option value=\"\" disabled hidden>Select...</option>\n      <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n        {{question.text + ' (' + question.linkId + ')'}}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"unit-select\">\n    <select *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\" [style]=\"lhcStyle.select\"\n            (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n      <option value=\"\">Keep form units ({{unit}})</option>\n      <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n    </select>\n\n    <div *ngIf=\"isNonConvertibleUnit\" class=\"detail\">{{unit}}</div>\n    <div *ngIf=\"itemHasScore\" class=\"detail\">Score</div>\n  </div>\n</div>\n\n<lhc-syntax-preview [syntax]=\"variable.expression\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-preview>\n",
                styles: [".question{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.question-select{flex:50%;padding-right:.5rem}.unit-select{flex:50%;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
QuestionComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
QuestionComponent.propDecorators = {
    variable: [{ type: Input }],
    lhcStyle: [{ type: Input }]
};

class CalculateSumPromptComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.export = new EventEmitter();
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() { }
    /**
     * Close the dialog by specifying this should not be a score calculation
     */
    onCloseClick() {
        this.ruleEditorService.toggleMightBeScore();
    }
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */
    onExportClick() {
        this.export.emit();
    }
}
CalculateSumPromptComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-calculate-sum-prompt',
                template: "<div class=\"score-modal\">\n  <p [style]=\"lhcStyle.description\">It looks like this might be a score calculation.</p>\n\n  <p [style]=\"lhcStyle.description\">Would you like to calculate the sum of scores?</p>\n\n  <button class=\"primary\" (click)=\"onExportClick()\" [style]=\"lhcStyle.buttonPrimary\" id=\"export-score\">Yes</button>\n  <button (click)=\"onCloseClick()\" [style]=\"lhcStyle.buttonSecondary\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: ["*{font-size:1rem}.score-modal{text-align:center}button{margin:0 .5em}"]
            },] }
];
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    export: [{ type: Output }]
};

class MathToFhirpathPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = mathToFhirpath.fhirconvert(value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    }
}
MathToFhirpathPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mathToFhirpath'
            },] }
];

class SyntaxConverterComponent {
    constructor() {
        this.lhcStyle = {};
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new MathToFhirpathPipe();
    }
    ngOnChanges() {
        if (this.expression !== '') {
            this.onExpressionChange(this.expression);
        }
    }
    onExpressionChange(value) {
        const fhirPath = this.jsToFhirPathPipe.transform(value, this.variables);
        this.fhirPathExpression = fhirPath;
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"expression\" (ngModelChange)=\"onExpressionChange($event)\" id=\"simple-expression\"\n       aria-label=\"Simple Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    expression: [{ type: Input }],
    variables: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    expressionChange: [{ type: Output }]
};

class SyntaxPreviewComponent {
    constructor() {
        this.showWhenEmpty = false;
    }
    ngOnInit() {
    }
}
SyntaxPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-preview',
                template: "<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  FHIRPath: <pre class=\"d-inline text-muted\" title=\"{{syntax}}\">{{syntax}}</pre>\n</div>\n",
                styles: [":host{overflow:hidden}.syntax-preview{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};

class RuleEditorModule {
}
RuleEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    RuleEditorComponent,
                    VariablesComponent,
                    UneditableVariablesComponent,
                    QuestionComponent,
                    CalculateSumPromptComponent,
                    MathToFhirpathPipe,
                    SyntaxConverterComponent,
                    SyntaxPreviewComponent
                ],
                imports: [
                    FormsModule,
                    BrowserAnimationsModule,
                    DragDropModule,
                    MatRadioModule
                ],
                exports: [
                    RuleEditorComponent
                ]
            },] }
];

/*
 * Public API Surface of ng-rule-editor
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RuleEditorComponent, RuleEditorModule, RuleEditorService, VariablesComponent as ɵa, UneditableVariablesComponent as ɵb, QuestionComponent as ɵc, CalculateSumPromptComponent as ɵd, MathToFhirpathPipe as ɵe, SyntaxConverterComponent as ɵf, SyntaxPreviewComponent as ɵg };
//# sourceMappingURL=ng-rule-editor.js.map

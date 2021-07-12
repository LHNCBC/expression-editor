import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, Pipe, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
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

class RuleEditorComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.save = new EventEmitter();
        this.advancedInterface = true;
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
    ngOnChanges() {
        this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */
    reload() {
        if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
            this.variableService.import(this.fhirQuestionnaire, this.itemLinkId);
        }
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
     * Import uploaded data as a FHIR Questionnaire
     * @param fileInput - Form file upload
     */
    import(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                if (typeof e.target.result === 'string') {
                    try {
                        const input = JSON.parse(e.target.result);
                        this.variableService.import(input, this.linkIdContext);
                    }
                    catch (e) {
                        console.error('Could not parse file', e);
                    }
                }
                else {
                    console.error('Could not read file');
                }
            };
            fileReader.readAsText(fileInput.target.files[0]);
        }
        fileInput.target.value = '';
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export() {
        this.save.emit(this.variableService.export(this.finalExpression));
    }
    /**
     * Export FHIR questionnaire file by summing all ordinal values
     */
    exportSumOfScores() {
        this.save.emit(this.variableService.exportSumOfScores());
    }
    /**
     * Download data as a file
     * @param data - Object which will this function will call JSON.stringify on
     * @param fileName - File name to download as
     * @private
     */
    downloadAsFile(data, fileName) {
        const blob = new Blob([
            JSON.stringify(data, null, 2)
        ]);
        const date = this.datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');
        fileName = fileName ? fileName : `fhirpath-${date}.json`;
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
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
     * @param expression
     */
    updateFinalExpression(expression) {
        this.finalExpression = expression;
    }
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<lhc-calculate-sum-prompt *ngIf=\"calculateSum\" (export)=\"exportSumOfScores()\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum\">\n  <h1>{{titleName}}</h1>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2>Final Expression</h2>\n\n<!--    <div *ngIf=\"advancedInterface\">-->\n<!--      <mat-radio-group [(ngModel)]=\"expressionSyntax\" (change)=\"onSyntaxChange($event)\" aria-label=\"Select an option\">-->\n<!--        <mat-radio-button value=\"simple\">Simple Expression Syntax</mat-radio-button>-->\n<!--        <mat-radio-button value=\"fhirpath\">FHIRPath Expression Syntax</mat-radio-button>-->\n<!--      </mat-radio-group>-->\n<!--    </div>-->\n\n    <div class=\"container\">\n      <div class=\"row form-group\">\n        <div class=\"col-md-3\">\n          <div class=\"form-inline\">\n            <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" aria-label=\"Expression syntax type\">\n              <option value=\"simple\">Simple Expression</option>\n              <option value=\"fhirpath\">FHIRPath Expression</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col-md-9\" [ngSwitch]=\"expressionSyntax\">\n          <lhc-syntax-converter [variables]=\"variables\" *ngSwitchCase=\"'simple'\" (expressionChange)=\"updateFinalExpression($event)\" class=\"form-inline\"></lhc-syntax-converter>\n          <input aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\">\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"suggestions.length\">{{suggestions|json}}</div>\n  </section>\n\n  <button class=\"btn btn-primary py-2 px-5\" (click)=\"export()\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}"]
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
                template: "<h2>Variables</h2>\n\n<div class=\"container\">\n  <div class=\"row font-weight-bold mb-2\" aria-hidden=\"true\">\n    <div class=\"col-md-2\">Label</div>\n    <div class=\"col-md-3\">Type</div>\n    <div class=\"col-md-7\">Question/FHIRPath Expression</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable row py-2\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"col-md-2 form-inline\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-grip-vertical mr-2 handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" class=\"form-control w-75\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"col-md-3\">\n        <div class=\"form-inline\">\n          <select [id]=\"'variable-type-' + i\" class=\"form-control\" [(ngModel)]=\"variable.type\" aria-label=\"Variable type\">\n            <option value=\"\" disabled hidden>Select...</option>\n            <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"col-md-6\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" [advancedInterface]=\"advancedInterface\" *ngSwitchCase=\"'question'\"></lhc-question>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.simple\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"Simple Expression\" />\n          <lhc-syntax-preview [syntax]=\"variable.simple | mathToFhirpath:getAvailableVariables(i)\"></lhc-syntax-preview>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"FHIRPath Expression\" />\n        </div>\n      </div>\n      <div class=\"col-md-1\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove Line\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"py-2\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\">Add variable</button>\n",
                styles: [".example-list{width:500px;max-width:100%;border:1px solid #ccc;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}.drag-variable{padding:20px 10px;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    advancedInterface: [{ type: Input }]
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
                template: "<div class=\"form-inline\">\n  <select class=\"question-select form-control mr-2 w-50\" [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" aria-label=\"Question\">\n    <option value=\"\" disabled hidden>Select...</option>\n    <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n      {{question.text}}{{advancedInterface ? ' (' + question.linkId + ')' : ''}}\n    </option>\n  </select>\n\n  <select class=\"unit-select form-control\" style=\"width: 40%\" *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\"\n          (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n    <option value=\"\">Keep form units ({{unit}})</option>\n    <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n  </select>\n  <span *ngIf=\"isNonConvertibleUnit\">{{unit}}</span>\n  <span *ngIf=\"itemHasScore\">Score</span>\n\n  <lhc-syntax-preview [syntax]=\"variable.expression\"></lhc-syntax-preview>\n</div>\n"
            },] }
];
QuestionComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
QuestionComponent.propDecorators = {
    variable: [{ type: Input }],
    advancedInterface: [{ type: Input }]
};

class CalculateSumPromptComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
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
                template: "<div class=\"score-modal\">\n  <p>It looks like this might be a score calculation.</p>\n\n  <p>Would you like to calculate the sum of scores?</p>\n\n  <button class=\"btn btn-primary py-2 px-5 mx-2\" (click)=\"onExportClick()\" id=\"export-score\">Yes</button>\n  <button class=\"btn btn-secondary py-2 px-5 mx-2\" (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: [".score-modal{text-align:center}"]
            },] }
];
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
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
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new MathToFhirpathPipe();
    }
    ngOnInit() { }
    onExpressionChange(value) {
        const fhirPath = this.jsToFhirPathPipe.transform(value, this.variables);
        this.fhirPathExpression = fhirPath;
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"expression\" (ngModelChange)=\"onExpressionChange($event)\"\n       class=\"form-control mr-2 w-100\" id=\"simple-expression\" aria-label=\"Simple Expression\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\" [showWhenEmpty]=\"true\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    value: [{ type: Input }],
    variables: [{ type: Input }],
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
                template: "<div class=\"mt-2 syntax-preview text-muted\" *ngIf=\"syntax || showWhenEmpty\">\n  FHIRPath: <pre class=\"d-inline text-muted\" title=\"{{syntax}}\">{{syntax}}</pre>\n</div>\n",
                styles: [":host{overflow:hidden}.syntax-preview{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
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

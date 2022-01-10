import { __rest } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, Pipe, ViewChild, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';
import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as easyPathExpressions from 'easy-path-expressions';
import Def from 'autocomplete-lhc';
import { HttpClient } from '@angular/common/http';

var AllVariableType;
(function (AllVariableType) {
    AllVariableType["question"] = "Question";
    AllVariableType["expression"] = "FHIRPath Expression";
    AllVariableType["simple"] = "Easy Path Expression";
    AllVariableType["query"] = "FHIR Query";
    AllVariableType["queryObservation"] = "FHIR Query (Observation)";
})(AllVariableType || (AllVariableType = {}));
var SimpleVariableType;
(function (SimpleVariableType) {
    SimpleVariableType["question"] = "Question";
    SimpleVariableType["simple"] = "Easy Path Expression";
    SimpleVariableType["queryObservation"] = "FHIR Query (Observation)";
})(SimpleVariableType || (SimpleVariableType = {}));
const CASE_REGEX = /^\s*iif\s*\((.*)\)\s*$/;

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
        this.disableAdvancedChange = new Subject();
        this.needsAdvancedInterface = false;
        this.LANGUAGE_FHIRPATH = 'text/fhirpath';
        this.LANGUAGE_FHIR_QUERY = 'application/x-fhir-query';
        this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
        this.QUERY_REGEX = /^Observation\?code=(.+)&date=gt{{today\(\)-(\d+) (.+)}}&patient={{%patient.id}}&_sort=-date&_count=1$/;
        this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
        this.SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
        this.SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression';
        this.SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';
        this.CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.LAUNCH_CONTEXT_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext';
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
     * Trigger an update (used when changing variable names to update the preview)
     */
    update() {
        this.variablesChange.next(this.variables);
    }
    /**
     * Checks the advanced interface status and allows toggle if no expressions or
     * queries are present
     * @param toggleOn - Set the advanced interface on (without having to run checks)
     */
    checkAdvancedInterface(toggleOn) {
        if (toggleOn) {
            this.needsAdvancedInterface = true;
        }
        else {
            let needsAdvanced = false;
            // Check variables
            if (this.variables.find((e) => e.type === 'expression' || e.type === 'query') !== undefined) {
                needsAdvanced = true;
            }
            // Check final expression
            if (this.syntaxType === 'fhirpath') {
                needsAdvanced = true;
            }
            this.needsAdvancedInterface = needsAdvanced;
        }
        this.disableAdvancedChange.next(this.needsAdvancedInterface);
    }
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire
     * @param questionnaire - FHIR Questionnaire
     */
    getUneditableVariables(questionnaire) {
        if (Array.isArray(questionnaire.extension)) {
            return questionnaire.extension.reduce((accumulator, extension) => {
                var _a, _b;
                if (extension.url === this.LAUNCH_CONTEXT_URI && extension.extension) {
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
     * @param questionnaire
     */
    extractVariables(questionnaire) {
        // Look at the top level fhirpath related extensions to populate the editable variables
        // TODO look at the focus item variables
        if (questionnaire.extension) {
            const variables = [];
            const nonVariableExtensions = [];
            // Add an index to each extension which we will then use to get the
            // variables back in the correct order. __$index will be removed on save
            questionnaire.extension = questionnaire.extension.map((e, i) => (Object.assign(Object.assign({}, e), { __$index: i })));
            questionnaire.extension.forEach((extension) => {
                if (extension.url === this.VARIABLE_EXTENSION && extension.valueExpression) {
                    switch (extension.valueExpression.language) {
                        case this.LANGUAGE_FHIRPATH:
                            const fhirPathVarToAdd = this.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index, extension.valueExpression.extension);
                            if (fhirPathVarToAdd.type === 'expression') {
                                this.needsAdvancedInterface = true;
                            }
                            variables.push(fhirPathVarToAdd);
                            break;
                        case this.LANGUAGE_FHIR_QUERY:
                            const queryVarToAdd = this.processQueryVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index);
                            if (queryVarToAdd.type === 'query') {
                                this.needsAdvancedInterface = true;
                            }
                            variables.push(queryVarToAdd);
                            break;
                    }
                }
                else {
                    nonVariableExtensions.push(extension);
                }
            });
            // Remove the variables so they can be re-added on export
            questionnaire.extension = nonVariableExtensions;
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
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire
     */
    getScoreQuestionCount(questionnaire, linkIdContext) {
        let scoreQuestions = 0;
        questionnaire.item.forEach((item) => {
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
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @return true if load was successful
     */
    import(expressionUri, questionnaire, linkIdContext) {
        this.linkIdContext = linkIdContext; // TODO change notification for linkId?
        this.fhir = copy(questionnaire);
        let loadSuccess = false;
        if (this.fhir.resourceType === 'Questionnaire' && this.fhir.item && this.fhir.item.length) {
            // If there is at least one score question we will ask the user if they
            // want to calculate the score
            const SCORE_MIN_QUESTIONS = 1;
            this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
            this.mightBeScoreChange.next(this.mightBeScore);
            this.uneditableVariables = this.getUneditableVariables(this.fhir);
            this.uneditableVariablesChange.next(this.uneditableVariables);
            this.linkIdToQuestion = {};
            this.needsAdvancedInterface = false;
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
                this.caseStatements = this.finalExpression.match(CASE_REGEX) !== null;
                const simpleSyntax = this.extractSimpleSyntax(expression);
                if (simpleSyntax === null && this.finalExpression !== '') {
                    this.syntaxType = 'fhirpath';
                    this.needsAdvancedInterface = true;
                }
                else {
                    this.syntaxType = 'simple';
                    this.simpleExpression = simpleSyntax;
                }
            }
            else {
                // Reset input to be a blank simple expression if there is nothing on
                // the form
                this.syntaxType = 'simple';
                this.simpleExpression = '';
                this.finalExpression = '';
            }
            this.finalExpressionChange.next(this.finalExpression);
            loadSuccess = true;
        }
        return loadSuccess;
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
        if (expression.valueExpression && expression.valueExpression.extension) {
            const customExtension = expression.valueExpression.extension.find((e) => {
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
            if (item.linkId === linkId && item.extension) {
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
     * @param extensions - Any additional extensions (for simple fhirpath etc)
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    processVariable(name, expression, index, extensions) {
        const matches = expression.match(this.QUESTION_REGEX);
        const simpleExtension = extensions && extensions.find(e => e.url === this.SIMPLE_SYNTAX_EXTENSION);
        if (matches !== null) {
            const linkId = matches[1];
            const factor = matches[2];
            const variable = {
                __$index: index,
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
        else if (simpleExtension !== undefined) {
            return {
                __$index: index,
                label: name,
                type: 'simple',
                expression,
                simple: simpleExtension.valueString
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'expression',
                expression
            };
        }
    }
    /**
     * Process a x-fhir-query expression into a more user friendly format if
     * possible. Show a code autocomplete field if possible if not show the
     * expression editing field.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    processQueryVariable(name, expression, index) {
        const matches = expression.match(this.QUERY_REGEX);
        if (matches !== null) {
            const codes = matches[1].split('%2C'); // URL encoded comma ','
            const timeInterval = parseInt(matches[2], 10);
            const timeIntervalUnits = matches[3];
            return {
                __$index: index,
                label: name,
                type: 'queryObservation',
                codes,
                timeInterval,
                timeIntervalUnit: timeIntervalUnits,
                expression
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'query',
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
            const variable = {
                __$index: e.__$index,
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: e.label,
                    language: e.type === 'query' ? this.LANGUAGE_FHIR_QUERY : this.LANGUAGE_FHIRPATH,
                    expression: e.expression
                }
            };
            if (e.type === 'simple') {
                // @ts-ignore
                variable.valueExpression.extension = [{
                        url: this.SIMPLE_SYNTAX_EXTENSION,
                        valueString: e.simple
                    }];
            }
            return variable;
        });
        // Split the variables into two buckets: Variables present when
        // Questionnaire was imported and variables added by the user using the Rule
        // Editor. Add variables present initially among the existing extensions.
        // Add the remaining variables at the end
        const variablesPresentInitially = [];
        const variablesAdded = [];
        variablesToAdd.forEach(e => {
            if (e.__$index === undefined) {
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
            fhir.extension.sort((a, b) => a.__$index - b.__$index);
            // Add variables added by the user
            fhir.extension = fhir.extension.concat(variablesAdded);
        }
        else {
            fhir.extension = variablesPresentInitially.concat(variablesAdded);
        }
        // Remove __$index
        fhir.extension = fhir.extension.map((_a) => {
            var { __$index } = _a, other = __rest(_a, ["__$index"]);
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
            finalExpressionExtension.valueExpression.extension = [{
                    url: this.SIMPLE_SYNTAX_EXTENSION,
                    valueString: this.simpleExpression
                }];
        }
        this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
        // If there are any query observation extensions check to make sure there is
        // a patient launch context. If there is not add one.
        const hasQueryObservations = this.variables.find((e) => {
            return e.type === 'queryObservation';
        });
        if (hasQueryObservations !== undefined) {
            const patientLaunchContext = fhir.extension.find((extension) => {
                if (extension.url === this.LAUNCH_CONTEXT_URI &&
                    Array.isArray(extension.extension)) {
                    const patientName = extension.extension.find((subExtension) => {
                        return subExtension.url === 'name' && subExtension.valueId === 'patient';
                    });
                    if (patientName !== undefined) {
                        return true;
                    }
                }
                return false;
            });
            if (patientLaunchContext === undefined) {
                // Add launchContext
                if (!Array.isArray(fhir.extension)) {
                    fhir.extension = [];
                }
                const name = 'patient';
                const type = 'Patient';
                const description = 'For filling in patient information as the subject for the form';
                fhir.extension.push({
                    url: this.LAUNCH_CONTEXT_URI,
                    extension: [
                        { url: 'name', valueId: name },
                        { url: 'type', valueCode: type },
                        { url: 'description', valueString: description }
                    ]
                });
                this.uneditableVariables.push({
                    name,
                    type,
                    description
                });
                this.uneditableVariablesChange.next(this.uneditableVariables);
            }
        }
        return fhir;
    }
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Question linkId
     */
    addTotalScoreRule(questionnaire, linkId) {
        this.fhir = questionnaire;
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
     * Checks if the referenced Questionnaire item is a score calculation added by
     * the Rule Editor
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to check
     * @return True if the question at linkId is a score calculation created by
     * the Rule Editor, false otherwise
     */
    isScoreCalculation(questionnaire, linkId) {
        const checkForScore = (item) => {
            if (linkId === item.linkId) {
                const isScore = item.extension.find((extension) => !!this.isScoreExtension(extension));
                if (isScore) {
                    return true;
                }
            }
            if (item.item) {
                const subItemHasScore = item.item.find((subItem) => checkForScore(subItem));
                if (subItemHasScore) {
                    return true;
                }
            }
            return false;
        };
        return !!questionnaire.item.find((item) => checkForScore(item));
    }
    /**
     * Updates a FHIR questionnaire score calculation on the item identified by
     * the linkId
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to update
     * @return Questionnaire with updated calculation
     */
    updateScoreCalculation(questionnaire, linkId) {
        this.removeSumOfScores(questionnaire, linkId);
        return this.addTotalScoreRule(questionnaire, linkId);
    }
    /**
     * Removes score calculations added by the rule editor on the entire
     * questionnaire or on a specific item
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID where to remove score. If empty
     * try to remove scores from all items.
     * @return Questionnaire without the score calculation variable and expression
     */
    removeSumOfScores(questionnaire, linkId) {
        this.fhir = questionnaire;
        const removeItemScoreVariables = (item) => {
            if (linkId === undefined || linkId === item.linkId) {
                item.extension = item.extension.filter((extension) => !this.isScoreExtension(extension));
            }
            if (item.item) {
                item.item.forEach((subItem) => removeItemScoreVariables(subItem));
            }
        };
        this.fhir.item.forEach(removeItemScoreVariables);
        return this.fhir;
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
    constructor(variableService, liveAnnouncer) {
        this.variableService = variableService;
        this.liveAnnouncer = liveAnnouncer;
        this.advancedInterface = false;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.lhcStyle = {};
        this.save = new EventEmitter();
        this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
        this.datePipe = new DatePipe('en-US');
        this.suggestions = [];
        this.disableInterfaceToggle = false;
        this.loadError = false;
    }
    ngOnInit() {
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
            this.calculateSum = mightBeScore;
        });
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
            this.finalExpression = finalExpression;
        });
        this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
            this.variables = variables.map(e => e.label);
        });
        this.disableAdvancedSubscription = this.variableService.disableAdvancedChange.subscribe((disable) => {
            this.disableInterfaceToggle = disable;
        });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
        this.disableAdvancedSubscription.unsubscribe();
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
            this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
            if (this.loadError) {
                this.liveAnnouncer.announce(this.errorLoading);
            }
            this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
            this.advancedInterface = this.variableService.needsAdvancedInterface;
        }
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.caseStatements = this.variableService.caseStatements;
        this.calculateSum = this.variableService.mightBeScore;
        this.finalExpression = this.variableService.finalExpression;
        this.variables = this.variableService.variables.map(e => e.label);
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
    /**
     * Update the simple final expression
     */
    updateSimpleExpression(simple) {
        this.simpleExpression = simple;
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'fhirpath') {
            this.variableService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.variableService.checkAdvancedInterface();
        }
        if (this.variableService.needsAdvancedInterface) {
            this.advancedInterface = true;
            this.disableInterfaceToggle = true;
        }
        else {
            this.disableInterfaceToggle = false;
        }
    }
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<div *ngIf=\"loadError\" class=\"error\">{{errorLoading}}</div>\n<lhc-calculate-sum-prompt *ngIf=\"calculateSum && !loadError\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum && !loadError\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <span class=\"checkbox\" matTooltip=\"When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.\">\n    <input type=\"checkbox\" id=\"advanced-interface\" [disabled]=\"disableInterfaceToggle\"\n           [(ngModel)]=\"advancedInterface\">\n    <label for=\"advanced-interface\">Advanced interface</label>\n  </span>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\" [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"checkbox\">\n      <input type=\"checkbox\" id=\"case-statements\" [(ngModel)]=\"caseStatements\">\n      <label for=\"case-statements\">Use case statements</label>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\" *ngIf=\"advancedInterface\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" (change)=\"onTypeChange($event)\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Easy Path Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div *ngIf=\"!caseStatements\" class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter\n          *ngSwitchCase=\"'simple'\"\n          [simple]=\"simpleExpression\"\n          [variables]=\"variables\"\n          (expressionChange)=\"updateFinalExpression($event)\"\n          (simpleChange)=\"updateSimpleExpression($event)\"\n          [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input type=\"text\" aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n      <lhc-case-statements\n        *ngIf=\"caseStatements\"\n        [syntax]=\"expressionSyntax\"\n        [simpleExpression]=\"simpleExpression\"\n        [expression]=\"finalExpression\"\n        [lhcStyle]=\"lhcStyle\"\n        (expressionChange)=\"updateFinalExpression($event)\"\n        (simpleChange)=\"updateSimpleExpression($event)\">\n      </lhc-case-statements>\n    </div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{display:flex;padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 30em;min-width:0}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}lhc-case-statements{flex:100%;padding:.5rem}.checkbox{padding:.5rem}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
            },] }
];
RuleEditorComponent.ctorParameters = () => [
    { type: RuleEditorService },
    { type: LiveAnnouncer }
];
RuleEditorComponent.propDecorators = {
    advancedInterface: [{ type: Input }],
    fhirQuestionnaire: [{ type: Input }],
    itemLinkId: [{ type: Input }],
    submitButtonName: [{ type: Input }],
    titleName: [{ type: Input }],
    expressionLabel: [{ type: Input }],
    expressionUri: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    save: [{ type: Output }]
};

class VariablesComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.variableType = SimpleVariableType;
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
     * Angular lifecycle hook called when bound property changes
     */
    ngOnChanges(changes) {
        if (changes.advancedInterface) {
            this.variableType = this.advancedInterface ? AllVariableType : SimpleVariableType;
            if (this.variables) {
                const previousValues = [];
                this.variables.forEach((variable, index) => {
                    previousValues[index] = variable.type;
                    variable.type = '';
                });
                // Not sure of a better way of setting the previous values than this
                setTimeout(() => {
                    previousValues.forEach((type, index) => {
                        this.variables[index].type = type;
                    });
                }, 10);
            }
        }
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
     * Update the preview when the variable name changes
     */
    onNameChange() {
        this.ruleEditorService.update();
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'query' || event.target.value === 'expression') {
            this.ruleEditorService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.ruleEditorService.checkAdvancedInterface();
        }
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
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */
    updateExpression(i, expression) {
        this.variables[i].expression = expression;
    }
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */
    updateSimpleExpression(i, easyPath) {
        this.variables[i].simple = easyPath;
    }
}
VariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-variables',
                template: "<h2 [style]=\"lhcStyle.h2\">Variables</h2>\n\n<div class=\"container\">\n  <div class=\"variable-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"variable-column-label\">Label</div>\n    <div class=\"variable-column-type\">Variable Type</div>\n    <div class=\"variable-column-details\">Question/FHIRPath Expression/FHIR Query</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"variable-column-label\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" (change)=\"onNameChange()\" [style]=\"lhcStyle.input\" class=\"label\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"variable-column-type\">\n        <select [id]=\"'variable-type-' + i\" [(ngModel)]=\"variable.type\" (change)=\"onTypeChange($event)\" [style]=\"lhcStyle.select\" aria-label=\"Variable type\">\n          <option value=\"\" disabled hidden>Select...</option>\n          <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n        </select>\n      </div>\n      <div class=\"variable-column-details\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" *ngSwitchCase=\"'question'\" [lhcStyle]=\"lhcStyle\"></lhc-question>\n        <lhc-query-observation [variable]=\"variable\" [index]=\"i\" *ngSwitchCase=\"'queryObservation'\" [lhcStyle]=\"lhcStyle\"></lhc-query-observation>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <lhc-syntax-converter\n            [id]=\"'variable-expression-' + i\"\n            [simple]=\"variable.simple\"\n            [variables]=\"getAvailableVariables(i)\"\n            [lhcStyle]=\"lhcStyle\"\n            (simpleChange)=\"updateSimpleExpression(i, $event)\"\n            (expressionChange)=\"updateExpression(i, $event)\">\n          </lhc-syntax-converter>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\" aria-label=\"FHIRPath Expression\" />\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'query'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\"\n                 aria-label=\"FHIR Query\" placeholder=\"x-fhir-query\" />\n        </div>\n      </div>\n      <div class=\"variable-column-actions\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove variable\" title=\"Remove variable\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"no-variables\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add variable</button>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header>.variable-column-label{padding-left:1.6em}.variable-column-label>input,.variable-column-type select{width:100%;height:2rem;font-size:1rem}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.label{flex-grow:100}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}.variable-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:20 0 10em}.variable-column-actions{flex:auto}}.drag-variable{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.no-variables{padding:2rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            },] }
];
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
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
                template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Variables in Scope for This Item</h2>\n\n  <div class=\"container\">\n    <div class=\"variable-header\">\n      <div class=\"variable-column-label\">Label</div>\n      <div class=\"variable-column-type\">Variable Type</div>\n      <div class=\"variable-column-details\">Description</div>\n    </div>\n    <div class=\"variable-row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"variable-column-label\">{{variable.name}}</div>\n      <div class=\"variable-column-type\">{{variable.type}}</div>\n      <div class=\"variable-column-details\">{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:auto}}"]
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
                template: "<div class=\"score-modal\">\n  <p [style]=\"lhcStyle.description\">It looks like this might be a score calculation.</p>\n\n  <p [style]=\"lhcStyle.description\">Would you like to calculate the sum of scores?</p>\n\n  <button class=\"primary\" (click)=\"onExportClick()\" [style]=\"lhcStyle.buttonPrimary\" id=\"export-score\">Yes</button>\n  <button (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: ["*{font-size:1rem}.score-modal{text-align:center}button{margin:0 .5em;height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            },] }
];
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    export: [{ type: Output }]
};

class EasyPathExpressionsPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = easyPathExpressions.fhirconvert(value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    }
}
EasyPathExpressionsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'easyPathExpressions'
            },] }
];

class SyntaxConverterComponent {
    constructor() {
        this.lhcStyle = {};
        this.simpleChange = new EventEmitter();
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new EasyPathExpressionsPipe();
    }
    ngOnChanges() {
        this.onExpressionChange(this.simple);
    }
    onExpressionChange(simple) {
        const fhirPath = this.jsToFhirPathPipe.transform(simple, this.variables);
        this.fhirPathExpression = fhirPath;
        this.simpleChange.emit(simple);
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"simple\" (ngModelChange)=\"onExpressionChange($event)\" class=\"simple-expression\"\n       aria-label=\"Easy Path Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    simple: [{ type: Input }],
    variables: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    simpleChange: [{ type: Output }],
    expressionChange: [{ type: Output }]
};

class SyntaxPreviewComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.showWhenEmpty = false;
    }
    ngOnInit() {
    }
    /**
     * Show an ephemeral notification that the value was copied.
     */
    copyNotification() {
        this.snackBar.open('Copied to clipboard', null, {
            duration: 2000
        });
    }
}
SyntaxPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-preview',
                template: "<div class=\"text-muted syntax-preview\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  <div class=\"fhirpath\">\n    FHIRPath:\n    <pre class=\"d-inline text-muted syntax\" matTooltip=\"{{syntax}}\">\n      {{syntax}}\n    </pre>\n  </div>\n  <button class=\"copy\" #toolTip=\"matTooltip\" matTooltip=\"Copy to clipboard\"\n          [cdkCopyToClipboard]=\"syntax\" (click)=\"copyNotification(toolTip)\" aria-label=\"Copy to clipboard\">\n    <!-- Copy icon https://fonts.google.com/icons?icon.query=copy -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\">\n      <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n      <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/>\n    </svg>\n  </button>\n</div>\n",
                styles: [".syntax,:host{overflow:hidden}.syntax{white-space:nowrap;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{display:flex;width:100%}.fhirpath{flex:1 0 10em;min-width:0;padding-right:1em}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [
    { type: MatSnackBar }
];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};

class QueryObservationComponent {
    constructor(http) {
        this.http = http;
        this.queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';
        this.lhcStyle = {};
    }
    ngOnInit() {
        if (this.variable !== undefined) {
            this.codes = (this.variable.codes !== undefined) ? this.variable.codes : [];
            this.timeInterval = this.variable.timeInterval || 1;
            this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
            this.expression = this.variable.expression;
        }
        else {
            this.codes = [];
        }
    }
    /**
     * After the autocomplete is ready to be interacted with fetch the name for
     * any codes already in the query search.
     */
    ngAfterViewInit() {
        this.autoComplete = new Def.Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
            tableFormat: true,
            valueCols: [0, 1],
            colHeaders: ['Text', 'LOINC Number'],
            maxSelect: '*'
        });
        this.codes.forEach((code) => {
            const matches = code.match(/http:\/\/loinc.org\|(.+)/);
            if (matches !== null) {
                const loincCode = matches[1];
                // LOINC Code
                this.http.get(`${this.queryUrl}&terms=${loincCode}`)
                    .subscribe((data) => {
                    const namePosition = 3;
                    const name = [data[namePosition][0][0], loincCode].join(' - ');
                    this.autoComplete.storeSelectedItem(name, loincCode);
                    this.autoComplete.addToSelectedArea(name);
                });
            }
            else {
                // Non-loinc code
                this.autoComplete.storeSelectedItem(code, undefined);
                this.autoComplete.addToSelectedArea(code);
            }
        });
        Def.Autocompleter.Event.observeListSelections(`autocomplete-${this.index}`, () => {
            const selectedItemData = this.autoComplete.getSelectedItemData();
            // If there is no code then this is not a loinc code and we need to get
            // the value from the array above
            this.codes = this.autoComplete.getSelectedCodes().map((code, index) => {
                return (code === undefined) ? selectedItemData[index].text : `http://loinc.org|${code}`;
            });
            this.onChange();
        });
    }
    /**
     * Angular lifecycle hook
     */
    ngOnDestroy() {
        if (this.autoComplete !== undefined) {
            this.autoComplete.destroy();
        }
    }
    /**
     * On changes update the expression and preview
     */
    onChange() {
        // Separate with URL encoded version of the comma: ','
        const codes = this.codes.join('%2C');
        this.variable.expression = this.expression =
            `Observation?code=${codes}&` +
                `date=gt{{today()-${this.timeInterval} ${this.timeIntervalUnit}}}&` +
                `patient={{%patient.id}}&_sort=-date&_count=1`;
    }
}
QueryObservationComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-query-observation',
                template: "<div class=\"form-inline query\">\n  <div class=\"query-select\">\n    <input [style]=\"lhcStyle.input\" placeholder=\"LOINC Name / LOINC Number / Other Code\"\n           class=\"query-autocomplete\" #autoComplete id=\"autocomplete-{{index}}\" />\n  </div>\n  <div class=\"time-input\">\n    <input [style]=\"lhcStyle.input\" [(ngModel)]=\"timeInterval\" (change)=\"onChange()\"\n           aria-label=\"Time interval\" type=\"number\" min=\"1\" />\n  </div>\n  <div class=\"time-select\">\n    <select [style]=\"lhcStyle.input\" [(ngModel)]=\"timeIntervalUnit\"\n            (change)=\"onChange()\" aria-label=\"Time interval units\">\n      <option value=\"days\">Day(s)</option>\n      <option value=\"weeks\">Week(s)</option>\n      <option value=\"months\">Month(s)</option>\n      <option value=\"years\">Year(s)</option>\n    </select>\n  </div>\n</div>\n<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"codes.length\">\n  x-fhir-query: <pre class=\"d-inline text-muted\" title=\"{{expression}}\">{{expression}}</pre>\n</div>\n",
                styles: [".query{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.query-select{flex:1 0 6em;padding-right:.5rem}.time-input,.time-select{flex:0 0 7em;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{margin-top:1em}.syntax-preview>pre{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
            },] }
];
QueryObservationComponent.ctorParameters = () => [
    { type: HttpClient }
];
QueryObservationComponent.propDecorators = {
    variable: [{ type: Input }],
    index: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    autoCompleteElement: [{ type: ViewChild, args: ['autoComplete',] }]
};

class CaseStatementsComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.expressionChange = new EventEmitter();
        this.simpleChange = new EventEmitter();
        this.STRING_REGEX = /^'(.*)'$/;
        this.pipe = new EasyPathExpressionsPipe();
        this.outputExpressions = true;
        this.cases = [{ condition: '', simpleCondition: '', output: '', simpleOutput: '' }];
        this.output = '';
    }
    /**
     * Angular lifecycle hook for initialization
     */
    ngOnInit() {
        if (this.syntax === 'fhirpath' && this.expression !== undefined) {
            this.parseIif(this.expression, 0);
        }
        else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
            this.parseSimpleCases();
        }
        this.output = this.getIif(0);
    }
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */
    parseSimpleCases() {
        this.parseIif(this.simpleExpression, 0);
        // If all output values are strings toggle off "use expressions"
        const outputString = this.cases.find(e => (!this.isString(e.simpleOutput)));
        const defaultIsString = this.isString(this.simpleDefaultCase);
        if (outputString === undefined && defaultIsString) {
            this.outputExpressions = false;
            // Remove quotes from output strings and default case
            this.cases.forEach(e => {
                e.simpleOutput = this.removeQuotes(e.simpleOutput);
            });
            this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
        }
    }
    /**
     * Checks if the expression is a string
     */
    isString(expression) {
        return this.STRING_REGEX.test(expression);
    }
    /**
     * Removes surrounding quotes
     */
    removeQuotes(expression) {
        return expression.match(this.STRING_REGEX)[1];
    }
    /**
     * Angular lifecycle hook for changes
     */
    ngOnChanges(changes) {
        if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
            this.parseSimpleCases();
            this.onChange();
        }
        else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
            this.outputExpressions = true;
            this.parseIif(this.expression, 0);
            this.onChange();
        }
    }
    /**
     * Called when adding a new case
     */
    onAdd() {
        this.cases.push({ condition: '', simpleCondition: '', output: '', simpleOutput: '' });
        this.onChange();
        // TODO select next input box that was added
    }
    /**
     * Remove the case at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.cases.splice(i, 1);
        this.onChange();
    }
    /**
     * Angular lifecycle hook for changes
     */
    onChange() {
        this.output = this.getIif(0);
        this.expressionChange.emit(this.output);
        this.simpleChange.emit(this.simpleExpression);
    }
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */
    parseIif(expression, level) {
        // If expressions don't start with iif( and end with ) they cannot be parsed
        const matches = expression.match(CASE_REGEX);
        if (matches !== null) {
            const iifContents = matches[1];
            let commaMatches = 0;
            let nestingLevel = 0;
            let comma1 = -1;
            let comma2 = -1;
            // Check where the ',' is relative to depth as indicated by parenthesis
            for (let i = 0; i < iifContents.length; i++) {
                switch (iifContents[i]) {
                    case '(':
                        nestingLevel++;
                        break;
                    case ')':
                        nestingLevel--;
                        break;
                    case ',':
                        if (nestingLevel === 0) {
                            commaMatches++;
                            if (comma1 === -1) {
                                comma1 = i;
                            }
                            else if (comma2 === -1) {
                                comma2 = i;
                            }
                        }
                        break;
                }
            }
            if (commaMatches === 2 && nestingLevel === 0) {
                // Clear out any existing cases if we have a match for iif
                if (level === 0) {
                    this.cases = [];
                }
                const condition = iifContents.substring(0, comma1).trim();
                const trueCase = iifContents.substring(comma1 + 1, comma2).trim();
                const falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();
                if (this.syntax === 'simple') {
                    const variableNames = this.ruleEditorService.variables.map(e => e.label);
                    this.cases.push({
                        simpleCondition: condition,
                        simpleOutput: trueCase,
                        condition: this.pipe.transform(condition, variableNames),
                        output: this.pipe.transform(trueCase, variableNames)
                    });
                }
                else {
                    this.cases.push({
                        condition,
                        output: trueCase
                    });
                }
                const parseResult = this.parseIif(falseCase, level + 1);
                if (parseResult === false && this.syntax !== 'simple') {
                    this.defaultCase = falseCase;
                }
                else if (parseResult === false && this.syntax === 'simple') {
                    this.simpleDefaultCase = falseCase;
                }
                return true;
            }
        }
        return false;
    }
    /**
     * Get an iif expression given a nesting level
     * @param level - nesting level
     */
    getIif(level) {
        const isSimple = this.syntax === 'simple';
        const output = this.transformIfSimple(isSimple ?
            this.cases[level].simpleOutput :
            this.cases[level].output, true);
        const condition = this.transformIfSimple(isSimple ?
            this.cases[level].simpleCondition :
            this.cases[level].condition, false);
        if (level === this.cases.length - 1) {
            const defaultCase = this.transformIfSimple(isSimple ?
                this.simpleDefaultCase : this.defaultCase, true);
            return `iif(${condition},${output},${defaultCase})`;
        }
        else {
            return `iif(${condition},${output},${this.getIif(level + 1)})`;
        }
    }
    /**
     * Transform the expression parameter if the syntax type is Easy Path,
     * otherwise return the expression. Additionally if this is an output column
     * and output expressions are off surround with quotes.
     * @param expression - Easy Path or FHIRPath expression
     * @param isOutput - True if processing an output or default value
     * @return FHIRPath Expression
     */
    transformIfSimple(expression, isOutput) {
        if (expression === undefined) {
            return '';
        }
        let processedExpression = expression;
        if (isOutput && !this.outputExpressions) {
            processedExpression = `'${processedExpression}'`; // TODO should we escape the expression?
        }
        // Convert when syntax is simple but not in the output column is outputExpressions is disabled
        if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
            return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(e => e.label));
        }
        else {
            return processedExpression;
        }
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
        this.onChange();
    }
}
CaseStatementsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-case-statements',
                template: "<div class=\"container\">\n  <div class=\"case-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"case-condition-column\">When expression is true</div>\n    <div class=\"case-output-column\">\n      Output\n      <input type=\"checkbox\" id=\"output-expressions\" [(ngModel)]=\"outputExpressions\" (change)=\"onChange()\">\n      <label for=\"output-expressions\">Use expressions (strings if unchecked)</label>\n    </div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"case-row drag-case\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let caseStatement of cases; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"case-condition-column\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.condition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.simpleCondition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <span class=\"arrow\">\u2192</span>\n      </div>\n      <div class=\"case-output-column\">\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.output\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.simpleOutput\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n      </div>\n      <div class=\"case-column-actions\" *ngIf=\"cases.length > 1\">\n        <button class=\"btn btn-danger remove-case\" aria-label=\"Remove case\" title=\"Remove case\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<button id=\"add-case\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add case</button>\n\n<div class=\"case-row\">\n  <div class=\"case-condition-column\"></div>\n  <div class=\"case-output-column\">\n    <label>\n      Default output value:\n      <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [(ngModel)]=\"defaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n      <input *ngIf=\"syntax === 'simple'\" type=\"text\" [(ngModel)]=\"simpleDefaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n    </label>\n  </div>\n</div>\n<lhc-syntax-preview [lhcStyle]=\"lhcStyle\" [syntax]=\"output\"></lhc-syntax-preview>\n",
                styles: ["*{box-sizing:border-box}.case-header,.case-row{display:flex;flex-direction:row;flex-wrap:wrap}.case-header>.case-column-label{padding-left:1.6em}.case-condition-column>input,.case-output-column select{width:100%;height:2rem;font-size:1rem}.case-condition-column,.case-output-column{padding:.5rem}.case-condition-column{display:flex;flex:0 0 50%}.condition,.output{flex-grow:100}.case-actions-column{flex:auto}.case-output-column{flex:1 0 40%;min-width:0}.case-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row{flex-direction:column}.case-condition-column{flex:100%}.case-output-column{flex:20 0 10em}.case-actions-column{flex:auto}}.drag-case{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions{margin-left:2em}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow{font-size:1.6em;padding-left:.5em}.default{margin-top:.5rem}.syntax{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            },] }
];
CaseStatementsComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CaseStatementsComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    syntax: [{ type: Input }],
    simpleExpression: [{ type: Input }],
    expression: [{ type: Input }],
    expressionChange: [{ type: Output }],
    simpleChange: [{ type: Output }]
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
                    EasyPathExpressionsPipe,
                    SyntaxConverterComponent,
                    SyntaxPreviewComponent,
                    QueryObservationComponent,
                    CaseStatementsComponent
                ],
                imports: [
                    FormsModule,
                    BrowserAnimationsModule,
                    DragDropModule,
                    MatRadioModule,
                    ClipboardModule,
                    MatTooltipModule,
                    MatSnackBarModule
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

export { RuleEditorComponent, RuleEditorModule, RuleEditorService, VariablesComponent as ɵa, UneditableVariablesComponent as ɵb, QuestionComponent as ɵc, CalculateSumPromptComponent as ɵd, EasyPathExpressionsPipe as ɵe, SyntaxConverterComponent as ɵf, SyntaxPreviewComponent as ɵg, QueryObservationComponent as ɵh, CaseStatementsComponent as ɵi };
//# sourceMappingURL=ng-rule-editor.js.map

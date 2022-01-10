import { __rest } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';
import { CASE_REGEX } from './variable';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvcnVsZS1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUU3QixPQUFPLEVBQW1CLFVBQVUsRUFBOEQsTUFBTSxZQUFZLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFtQjFDLE1BQU0sT0FBTyxpQkFBaUI7SUFpQzVCO1FBaENBLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFFdEIsOEJBQXlCLEdBQ3ZCLElBQUksT0FBTyxFQUF3QixDQUFDO1FBQ3RDLG9CQUFlLEdBQXdCLElBQUksT0FBTyxFQUFjLENBQUM7UUFDakUsb0JBQWUsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUNqRSx1QkFBa0IsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUM5RCwwQkFBcUIsR0FBb0IsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQU9qRSwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsZUFBZSxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLDBCQUEwQixDQUFDO1FBQ2pELG1CQUFjLEdBQUcsNEVBQTRFLENBQUM7UUFDOUYsZ0JBQVcsR0FBRyx1R0FBdUcsQ0FBQztRQUN0SCx1QkFBa0IsR0FBRyxrREFBa0QsQ0FBQztRQUN4RSw2QkFBd0IsR0FBRyxpRUFBaUUsQ0FBQztRQUM3RiwrQkFBMEIsR0FBRyw2REFBNkQsQ0FBQztRQUMzRiw0QkFBdUIs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QU0saUJBQWlCLENBQUM7U0FDaEU7SUFDSCxDQUFDOzs7O1lBdDFCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgY29weSBmcm9tICdmYXN0LWNvcHknO1xuXG5pbXBvcnQgeyBBbGxWYXJpYWJsZVR5cGUsIENBU0VfUkVHRVgsIFF1ZXN0aW9uLCBTaW1wbGVWYXJpYWJsZVR5cGUsIFVuZWRpdGFibGVWYXJpYWJsZSwgVmFyaWFibGUgfSBmcm9tICcuL3ZhcmlhYmxlJztcbmltcG9ydCB7IFVOSVRfQ09OVkVSU0lPTiB9IGZyb20gJy4vdW5pdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZVN0eWxlIHtcbiAgaDE/OiBvYmplY3Q7XG4gIGgyPzogb2JqZWN0O1xuICBwcmV2aWV3QXJlYT86IG9iamVjdDtcbiAgdmFyaWFibGVIZWFkZXI/OiBvYmplY3Q7XG4gIHZhcmlhYmxlUm93Pzogb2JqZWN0O1xuICBidXR0b25QcmltYXJ5Pzogb2JqZWN0O1xuICBidXR0b25TZWNvbmRhcnk/OiBvYmplY3Q7XG4gIGJ1dHRvbkRhbmdlcj86IG9iamVjdDtcbiAgaW5wdXQ/OiBvYmplY3Q7XG4gIHNlbGVjdD86IG9iamVjdDtcbiAgZGVzY3JpcHRpb24/OiBvYmplY3Q7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVFZGl0b3JTZXJ2aWNlIHtcbiAgc3ludGF4VHlwZSA9ICdzaW1wbGUnO1xuICBsaW5rSWRDb250ZXh0OiBzdHJpbmc7XG4gIHVuZWRpdGFibGVWYXJpYWJsZXNDaGFuZ2U6IFN1YmplY3Q8VW5lZGl0YWJsZVZhcmlhYmxlW10+ID1cbiAgICBuZXcgU3ViamVjdDxVbmVkaXRhYmxlVmFyaWFibGVbXT4oKTtcbiAgdmFyaWFibGVzQ2hhbmdlOiBTdWJqZWN0PFZhcmlhYmxlW10+ID0gbmV3IFN1YmplY3Q8VmFyaWFibGVbXT4oKTtcbiAgcXVlc3Rpb25zQ2hhbmdlOiBTdWJqZWN0PFF1ZXN0aW9uW10+ID0gbmV3IFN1YmplY3Q8UXVlc3Rpb25bXT4oKTtcbiAgbWlnaHRCZVNjb3JlQ2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgZmluYWxFeHByZXNzaW9uQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIGRpc2FibGVBZHZhbmNlZENoYW5nZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIHVuZWRpdGFibGVWYXJpYWJsZXM6IFVuZWRpdGFibGVWYXJpYWJsZVtdO1xuICB2YXJpYWJsZXM6IFZhcmlhYmxlW107XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgZmluYWxFeHByZXNzaW9uOiBzdHJpbmc7XG4gIHNpbXBsZUV4cHJlc3Npb246IHN0cmluZztcbiAgY2FzZVN0YXRlbWVudHM6IGJvb2xlYW47XG4gIG5lZWRzQWR2YW5jZWRJbnRlcmZhY2UgPSBmYWxzZTtcblxuICBwcml2YXRlIExBTkdVQUdFX0ZISVJQQVRIID0gJ3RleHQvZmhpcnBhdGgnO1xuICBwcml2YXRlIExBTkdVQUdFX0ZISVJfUVVFUlkgPSAnYXBwbGljYXRpb24veC1maGlyLXF1ZXJ5JztcbiAgcHJpdmF0ZSBRVUVTVElPTl9SRUdFWCA9IC9eJXJlc291cmNlXFwuaXRlbVxcLndoZXJlXFwobGlua0lkPScoLiopJ1xcKVxcLmFuc3dlclxcLnZhbHVlKD86XFwqKFxcZCpcXC4/XFxkKikpPyQvO1xuICBwcml2YXRlIFFVRVJZX1JFR0VYID0gL15PYnNlcnZhdGlvblxcP2NvZGU9KC4rKSZkYXRlPWd0e3t0b2RheVxcKFxcKS0oXFxkKykgKC4rKX19JnBhdGllbnQ9e3slcGF0aWVudC5pZH19Jl9zb3J0PS1kYXRlJl9jb3VudD0xJC87XG4gIHByaXZhdGUgVkFSSUFCTEVfRVhURU5TSU9OID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi92YXJpYWJsZSc7XG4gIHByaXZhdGUgU0NPUkVfVkFSSUFCTEVfRVhURU5TSU9OID0gJ2h0dHA6Ly9saGNmb3Jtcy5ubG0ubmloLmdvdi9maGlyL2V4dC9ydWxlLWVkaXRvci1zY29yZS12YXJpYWJsZSc7XG4gIHByaXZhdGUgU0NPUkVfRVhQUkVTU0lPTl9FWFRFTlNJT04gPSAnaHR0cDovL2xoY2Zvcm1zLm5sbS5uaWguZ292L2ZoaXIvZXh0L3J1bGUtZWRpdG9yLWV4cHJlc3Npb24nO1xuICBwcml2YXRlIFNJTVBMRV9TWU5UQVhfRVhURU5TSU9OID0gJ2h0dHA6Ly9saGNmb3Jtcy5ubG0ubmloLmdvdi9maGlyL2V4dC9zaW1wbGUtc3ludGF4JztcbiAgcHJpdmF0ZSBDQUxDVUxBVEVEX0VYUFJFU1NJT04gPSAnaHR0cDovL2hsNy5vcmcvZmhpci91di9zZGMvU3RydWN0dXJlRGVmaW5pdGlvbi9zZGMtcXVlc3Rpb25uYWlyZS1jYWxjdWxhdGVkRXhwcmVzc2lvbic7XG4gIHByaXZhdGUgTEFVTkNIX0NPTlRFWFRfVVJJID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvdXYvc2RjL1N0cnVjdHVyZURlZmluaXRpb24vc2RjLXF1ZXN0aW9ubmFpcmUtbGF1bmNoQ29udGV4dCc7XG5cbiAgcHJpdmF0ZSBsaW5rSWRUb1F1ZXN0aW9uID0ge307XG4gIHByaXZhdGUgZmhpcjtcbiAgbWlnaHRCZVNjb3JlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52YXJpYWJsZXMgPSBbXTtcbiAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmFyaWFibGVcbiAgICovXG4gIGFkZFZhcmlhYmxlKCk6IHZvaWQge1xuICAgIC8vIEdldCBhbGwgdGhlIGV4aXN0aW5nIHZhcmlhYmxlIG5hbWVzXG4gICAgY29uc3QgZXhpc3RpbmdOYW1lcyA9IHRoaXMudmFyaWFibGVzLm1hcCgoZSkgPT4gZS5sYWJlbClcbiAgICAgIC5jb25jYXQodGhpcy51bmVkaXRhYmxlVmFyaWFibGVzLm1hcCgoZSkgPT4gZS5uYW1lKSk7XG5cbiAgICB0aGlzLnZhcmlhYmxlcy5wdXNoKHtcbiAgICAgIGxhYmVsOiB0aGlzLmdldE5ld0xhYmVsTmFtZShleGlzdGluZ05hbWVzKSxcbiAgICAgIHR5cGU6ICdxdWVzdGlvbicsXG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pO1xuICAgIHRoaXMudmFyaWFibGVzQ2hhbmdlLm5leHQodGhpcy52YXJpYWJsZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBpIC0gaW5kZXggb2YgdmFyaWFibGUgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmUoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YXJpYWJsZXMuc3BsaWNlKGksIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYW4gdXBkYXRlICh1c2VkIHdoZW4gY2hhbmdpbmcgdmFyaWFibGUgbmFtZXMgdG8gdXBkYXRlIHRoZSBwcmV2aWV3KVxuICAgKi9cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudmFyaWFibGVzQ2hhbmdlLm5leHQodGhpcy52YXJpYWJsZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgYWR2YW5jZWQgaW50ZXJmYWNlIHN0YXR1cyBhbmQgYWxsb3dzIHRvZ2dsZSBpZiBubyBleHByZXNzaW9ucyBvclxuICAgKiBxdWVyaWVzIGFyZSBwcmVzZW50XG4gICAqIEBwYXJhbSB0b2dnbGVPbiAtIFNldCB0aGUgYWR2YW5jZWQgaW50ZXJmYWNlIG9uICh3aXRob3V0IGhhdmluZyB0byBydW4gY2hlY2tzKVxuICAgKi9cbiAgY2hlY2tBZHZhbmNlZEludGVyZmFjZSh0b2dnbGVPbj86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodG9nZ2xlT24pIHtcbiAgICAgIHRoaXMubmVlZHNBZHZhbmNlZEludGVyZmFjZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZWVkc0FkdmFuY2VkID0gZmFsc2U7XG4gICAgICAvLyBDaGVjayB2YXJpYWJsZXNcbiAgICAgIGlmICh0aGlzLnZhcmlhYmxlcy5maW5kKChlKSA9PiBlLnR5cGUgPT09ICdleHByZXNzaW9uJyB8fCBlLnR5cGUgPT09ICdxdWVyeScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmVlZHNBZHZhbmNlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGZpbmFsIGV4cHJlc3Npb25cbiAgICAgIGlmICh0aGlzLnN5bnRheFR5cGUgPT09ICdmaGlycGF0aCcpIHtcbiAgICAgICAgbmVlZHNBZHZhbmNlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubmVlZHNBZHZhbmNlZEludGVyZmFjZSA9IG5lZWRzQWR2YW5jZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5kaXNhYmxlQWR2YW5jZWRDaGFuZ2UubmV4dCh0aGlzLm5lZWRzQWR2YW5jZWRJbnRlcmZhY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiB1bmVkaXRhYmxlIHZhcmlhYmxlcyBiYXNlZCBvbiB0aGUgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqL1xuICBnZXRVbmVkaXRhYmxlVmFyaWFibGVzKHF1ZXN0aW9ubmFpcmUpOiBVbmVkaXRhYmxlVmFyaWFibGVbXSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocXVlc3Rpb25uYWlyZS5leHRlbnNpb24pKSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb25uYWlyZS5leHRlbnNpb24ucmVkdWNlKChhY2N1bXVsYXRvciwgZXh0ZW5zaW9uKSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb24udXJsID09PSB0aGlzLkxBVU5DSF9DT05URVhUX1VSSSAmJiBleHRlbnNpb24uZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgY29uc3QgdW5lZGl0YWJsZVZhcmlhYmxlID0ge1xuICAgICAgICAgICAgbmFtZTogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maW5kKChlKSA9PiBlLnVybCA9PT0gJ25hbWUnKS52YWx1ZUlkLFxuICAgICAgICAgICAgdHlwZTogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maWx0ZXIoKGUpID0+IGUudXJsID09PSAndHlwZScpPy5tYXAoKGUpID0+IGUudmFsdWVDb2RlKS5qb2luKCd8JyksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZXh0ZW5zaW9uLmV4dGVuc2lvbi5maW5kKChlKSA9PiBlLnVybCA9PT0gJ2Rlc2NyaXB0aW9uJyk/LnZhbHVlU3RyaW5nXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2godW5lZGl0YWJsZVZhcmlhYmxlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVtb3ZlIHRoZSB2YXJpYWJsZXMgZnJvbSB0aGUgRkhJUiBvYmplY3RcbiAgICogQHBhcmFtIHF1ZXN0aW9ubmFpcmVcbiAgICovXG4gIGV4dHJhY3RWYXJpYWJsZXMocXVlc3Rpb25uYWlyZSk6IFZhcmlhYmxlW10ge1xuICAgIC8vIExvb2sgYXQgdGhlIHRvcCBsZXZlbCBmaGlycGF0aCByZWxhdGVkIGV4dGVuc2lvbnMgdG8gcG9wdWxhdGUgdGhlIGVkaXRhYmxlIHZhcmlhYmxlc1xuICAgIC8vIFRPRE8gbG9vayBhdCB0aGUgZm9jdXMgaXRlbSB2YXJpYWJsZXNcblxuICAgIGlmIChxdWVzdGlvbm5haXJlLmV4dGVuc2lvbikge1xuICAgICAgY29uc3QgdmFyaWFibGVzID0gW107XG4gICAgICBjb25zdCBub25WYXJpYWJsZUV4dGVuc2lvbnMgPSBbXTtcblxuICAgICAgLy8gQWRkIGFuIGluZGV4IHRvIGVhY2ggZXh0ZW5zaW9uIHdoaWNoIHdlIHdpbGwgdGhlbiB1c2UgdG8gZ2V0IHRoZVxuICAgICAgLy8gdmFyaWFibGVzIGJhY2sgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIF9fJGluZGV4IHdpbGwgYmUgcmVtb3ZlZCBvbiBzYXZlXG4gICAgICBxdWVzdGlvbm5haXJlLmV4dGVuc2lvbiA9IHF1ZXN0aW9ubmFpcmUuZXh0ZW5zaW9uLm1hcCgoZSwgaSkgPT4gKHsgLi4uZSwgX18kaW5kZXg6IGkgfSkpO1xuXG4gICAgICBxdWVzdGlvbm5haXJlLmV4dGVuc2lvbi5mb3JFYWNoKChleHRlbnNpb24pID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbi51cmwgPT09IHRoaXMuVkFSSUFCTEVfRVhURU5TSU9OICYmIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24pIHtcbiAgICAgICAgICBzd2l0Y2ggKGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24ubGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5MQU5HVUFHRV9GSElSUEFUSDpcbiAgICAgICAgICAgICAgY29uc3QgZmhpclBhdGhWYXJUb0FkZCA9IHRoaXMucHJvY2Vzc1ZhcmlhYmxlKFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24ubmFtZSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uLmV4cHJlc3Npb24sXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLl9fJGluZGV4LFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24uZXh0ZW5zaW9uKTtcbiAgICAgICAgICAgICAgaWYgKGZoaXJQYXRoVmFyVG9BZGQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkc0FkdmFuY2VkSW50ZXJmYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaChmaGlyUGF0aFZhclRvQWRkKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMuTEFOR1VBR0VfRkhJUl9RVUVSWTpcbiAgICAgICAgICAgICAgY29uc3QgcXVlcnlWYXJUb0FkZCA9IHRoaXMucHJvY2Vzc1F1ZXJ5VmFyaWFibGUoXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLnZhbHVlRXhwcmVzc2lvbi5uYW1lLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICBleHRlbnNpb24uX18kaW5kZXgpO1xuICAgICAgICAgICAgICBpZiAocXVlcnlWYXJUb0FkZC50eXBlID09PSAncXVlcnknKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkc0FkdmFuY2VkSW50ZXJmYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaChxdWVyeVZhclRvQWRkKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vblZhcmlhYmxlRXh0ZW5zaW9ucy5wdXNoKGV4dGVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIHZhcmlhYmxlcyBzbyB0aGV5IGNhbiBiZSByZS1hZGRlZCBvbiBleHBvcnRcbiAgICAgIHF1ZXN0aW9ubmFpcmUuZXh0ZW5zaW9uID0gbm9uVmFyaWFibGVFeHRlbnNpb25zO1xuXG4gICAgICByZXR1cm4gdmFyaWFibGVzO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY3VycmVudCBpdGVtIGhhcyBhbiBvcmRpbmFsVmFsdWUgZXh0ZW5zaW9uIG9uIHRoZSBhbnN3ZXJcbiAgICogQHBhcmFtIGl0ZW0gLSBRdWVzdGlvbiBpdGVtIG9yIGxpbmtJZFxuICAgKi9cbiAgaXRlbUhhc1Njb3JlKGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBpdGVtID0gdGhpcy5saW5rSWRUb1F1ZXN0aW9uW2l0ZW1dO1xuICAgIH1cblxuICAgIHJldHVybiAoaXRlbS5hbnN3ZXJPcHRpb24gfHwgW10pLnNvbWUoKGFuc3dlck9wdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIChhbnN3ZXJPcHRpb24uZXh0ZW5zaW9uIHx8IFtdKS5zb21lKChleHRlbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbi51cmwgPT09ICdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vb3JkaW5hbFZhbHVlJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIG9yZGluYWxWYWx1ZSBvbiB0aGUgYW5zd2VycyBvZiB0aGUgcXVlc3Rpb25zIG9uIHRoZVxuICAgKiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWRDb250ZXh0IC0gbGlua0lkIHRvIGV4Y2x1ZGUgZnJvbSBjYWxjdWxhdGlvblxuICAgKiBAcmV0dXJuIG51bWJlciBvZiBzY29yZSBxdWVzdGlvbnMgb24gdGhlIHF1ZXN0aW9ubmFpcmVcbiAgICovXG4gIGdldFNjb3JlUXVlc3Rpb25Db3VudChxdWVzdGlvbm5haXJlLCBsaW5rSWRDb250ZXh0KTogbnVtYmVyIHtcbiAgICBsZXQgc2NvcmVRdWVzdGlvbnMgPSAwO1xuXG4gICAgcXVlc3Rpb25uYWlyZS5pdGVtLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmICh0aGlzLml0ZW1IYXNTY29yZShpdGVtKSkge1xuICAgICAgICBzY29yZVF1ZXN0aW9ucysrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNjb3JlUXVlc3Rpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIEZISVIgUXVlc3Rpb25uYWlyZSB0byBwb3B1bGF0ZSBxdWVzdGlvbnNcbiAgICogQHBhcmFtIGV4cHJlc3Npb25VcmkgLSBVUkkgb2YgZXhwcmVzc2lvbiBleHRlbnNpb24gb24gbGlua0lkQ29udGV4dCBxdWVzdGlvblxuICAgKiAgdG8gZXh0cmFjdCBhbmQgbW9kaWZ5XG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWRDb250ZXh0IC0gQ29udGV4dCB0byB1c2UgZm9yIGZpbmFsIGV4cHJlc3Npb25cbiAgICogQHJldHVybiB0cnVlIGlmIGxvYWQgd2FzIHN1Y2Nlc3NmdWxcbiAgICovXG4gIGltcG9ydChleHByZXNzaW9uVXJpOiBzdHJpbmcsIHF1ZXN0aW9ubmFpcmUsIGxpbmtJZENvbnRleHQpOiBib29sZWFuIHtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSBsaW5rSWRDb250ZXh0OyAgLy8gVE9ETyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGZvciBsaW5rSWQ/XG4gICAgdGhpcy5maGlyID0gY29weShxdWVzdGlvbm5haXJlKTtcbiAgICBsZXQgbG9hZFN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmZoaXIucmVzb3VyY2VUeXBlID09PSAnUXVlc3Rpb25uYWlyZScgJiYgdGhpcy5maGlyLml0ZW0gJiYgdGhpcy5maGlyLml0ZW0ubGVuZ3RoKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgc2NvcmUgcXVlc3Rpb24gd2Ugd2lsbCBhc2sgdGhlIHVzZXIgaWYgdGhleVxuICAgICAgLy8gd2FudCB0byBjYWxjdWxhdGUgdGhlIHNjb3JlXG4gICAgICBjb25zdCBTQ09SRV9NSU5fUVVFU1RJT05TID0gMTtcbiAgICAgIHRoaXMubWlnaHRCZVNjb3JlID0gdGhpcy5nZXRTY29yZVF1ZXN0aW9uQ291bnQodGhpcy5maGlyLCBsaW5rSWRDb250ZXh0KSA+IFNDT1JFX01JTl9RVUVTVElPTlM7XG4gICAgICB0aGlzLm1pZ2h0QmVTY29yZUNoYW5nZS5uZXh0KHRoaXMubWlnaHRCZVNjb3JlKTtcblxuICAgICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy5nZXRVbmVkaXRhYmxlVmFyaWFibGVzKHRoaXMuZmhpcik7XG4gICAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXNDaGFuZ2UubmV4dCh0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMpO1xuXG4gICAgICB0aGlzLmxpbmtJZFRvUXVlc3Rpb24gPSB7fTtcbiAgICAgIHRoaXMubmVlZHNBZHZhbmNlZEludGVyZmFjZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wcm9jZXNzSXRlbSh0aGlzLmZoaXIuaXRlbSk7XG5cbiAgICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy5leHRyYWN0VmFyaWFibGVzKHRoaXMuZmhpcik7XG4gICAgICB0aGlzLnZhcmlhYmxlc0NoYW5nZS5uZXh0KHRoaXMudmFyaWFibGVzKTtcblxuICAgICAgdGhpcy5xdWVzdGlvbnMgPSBbXTtcblxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmxpbmtJZFRvUXVlc3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpbmtJZFRvUXVlc3Rpb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlID0gdGhpcy5saW5rSWRUb1F1ZXN0aW9uW2tleV07XG4gICAgICAgIC8vIFRPRE8gZGVjaW1hbCB2cyBjaG9pY2VcbiAgICAgICAgY29uc3QgTUFYX1FfTEVOID0gNjA7ICAvLyBNYXhpbXVtIHF1ZXN0aW9uIGxlbmd0aCBiZWZvcmUgdHJ1bmNhdGluZy5cblxuICAgICAgICBjb25zdCB0ZXh0ID0gZS50ZXh0O1xuXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnB1c2goe1xuICAgICAgICAgIGxpbmtJZDogZS5saW5rSWQsXG4gICAgICAgICAgdGV4dDogdGV4dC5sZW5ndGggPiBNQVhfUV9MRU4gPyB0ZXh0LnN1YnN0cmluZygwLCBNQVhfUV9MRU4pICsgJy4uLicgOiB0ZXh0LFxuICAgICAgICAgIHVuaXQ6IHRoaXMuZ2V0UXVlc3Rpb25Vbml0cyhlLmxpbmtJZClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXN0aW9uc0NoYW5nZS5uZXh0KHRoaXMucXVlc3Rpb25zKTtcblxuICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZXh0cmFjdEV4cHJlc3Npb24oZXhwcmVzc2lvblVyaSwgdGhpcy5maGlyLml0ZW0sIGxpbmtJZENvbnRleHQpO1xuXG4gICAgICBpZiAoZXhwcmVzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuZmluYWxFeHByZXNzaW9uID0gZXhwcmVzc2lvbi52YWx1ZUV4cHJlc3Npb24uZXhwcmVzc2lvbjtcblxuICAgICAgICB0aGlzLmNhc2VTdGF0ZW1lbnRzID0gdGhpcy5maW5hbEV4cHJlc3Npb24ubWF0Y2goQ0FTRV9SRUdFWCkgIT09IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc2ltcGxlU3ludGF4ID0gdGhpcy5leHRyYWN0U2ltcGxlU3ludGF4KGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGlmIChzaW1wbGVTeW50YXggPT09IG51bGwgJiYgdGhpcy5maW5hbEV4cHJlc3Npb24gIT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zeW50YXhUeXBlID0gJ2ZoaXJwYXRoJztcbiAgICAgICAgICB0aGlzLm5lZWRzQWR2YW5jZWRJbnRlcmZhY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3ludGF4VHlwZSA9ICdzaW1wbGUnO1xuICAgICAgICAgIHRoaXMuc2ltcGxlRXhwcmVzc2lvbiA9IHNpbXBsZVN5bnRheDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgdG8gYmUgYSBibGFuayBzaW1wbGUgZXhwcmVzc2lvbiBpZiB0aGVyZSBpcyBub3RoaW5nIG9uXG4gICAgICAgIC8vIHRoZSBmb3JtXG4gICAgICAgIHRoaXMuc3ludGF4VHlwZSA9ICdzaW1wbGUnO1xuICAgICAgICB0aGlzLnNpbXBsZUV4cHJlc3Npb24gPSAnJztcbiAgICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSAnJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb25DaGFuZ2UubmV4dCh0aGlzLmZpbmFsRXhwcmVzc2lvbik7XG4gICAgICBsb2FkU3VjY2VzcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvYWRTdWNjZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgbmVzdGVkIEZISVIgUXVlc3Rpb25uYWlyZSBpdGVtc1xuICAgKiBAcGFyYW0gaXRlbXMgLSBDdXJyZW50IGxldmVsIG9mIGl0ZW0gbmVzdGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzSXRlbShpdGVtcyk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goKGUpID0+IHtcbiAgICAgIHRoaXMubGlua0lkVG9RdWVzdGlvbltlLmxpbmtJZF0gPSBlO1xuICAgICAgaWYgKGUuaXRlbSkge1xuICAgICAgICB0aGlzLnByb2Nlc3NJdGVtKGUuaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuZCByZW1vdmUgdGhlIHNpbXBsZSBzeW50YXggaWYgYXZhaWxhYmxlLiBJZiBub3QgcmV0dXJuIG51bGxcbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIGV4dHJhY3RTaW1wbGVTeW50YXgoZXhwcmVzc2lvbik6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAoZXhwcmVzc2lvbi52YWx1ZUV4cHJlc3Npb24gJiYgZXhwcmVzc2lvbi52YWx1ZUV4cHJlc3Npb24uZXh0ZW5zaW9uKSB7XG4gICAgICBjb25zdCBjdXN0b21FeHRlbnNpb24gPSBleHByZXNzaW9uLnZhbHVlRXhwcmVzc2lvbi5leHRlbnNpb24uZmluZCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS51cmwgPT09IHRoaXMuU0lNUExFX1NZTlRBWF9FWFRFTlNJT047XG4gICAgICB9KTtcblxuICAgICAgaWYgKGN1c3RvbUV4dGVuc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjdXN0b21FeHRlbnNpb24udmFsdWVTdHJpbmc7ICAvLyBUT0RPIG1vdmUgdG8gY29kZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgcmVtb3ZlIHRoZSBmaW5hbCBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBleHByZXNzaW9uVXJpIC0gRXhwcmVzc2lvbiBleHRlbnNpb24gVVJMXG4gICAqIEBwYXJhbSBpdGVtcyAtIEZISVIgcXVlc3Rpb25uYWlyZSBpdGVtIGFycmF5XG4gICAqIEBwYXJhbSBsaW5rSWQgLSBsaW5rSWQgb2YgcXVlc3Rpb24gd2hlcmUgdG8gZXh0cmFjdCBleHByZXNzaW9uXG4gICAqL1xuICBleHRyYWN0RXhwcmVzc2lvbihleHByZXNzaW9uVXJpLCBpdGVtcywgbGlua0lkKTogb2JqZWN0fG51bGwge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKGl0ZW0ubGlua0lkID09PSBsaW5rSWQgJiYgaXRlbS5leHRlbnNpb24pIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uSW5kZXggPSBpdGVtLmV4dGVuc2lvbi5maW5kSW5kZXgoKGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gZS51cmwgPT09IGV4cHJlc3Npb25VcmkgJiYgZS52YWx1ZUV4cHJlc3Npb24ubGFuZ3VhZ2UgPT09IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEggJiZcbiAgICAgICAgICAgIGUudmFsdWVFeHByZXNzaW9uLmV4cHJlc3Npb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleHRlbnNpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb25zdCBmaW5hbEV4cHJlc3Npb24gPSBpdGVtLmV4dGVuc2lvbltleHRlbnNpb25JbmRleF07XG4gICAgICAgICAgaXRlbS5leHRlbnNpb24uc3BsaWNlKGV4dGVuc2lvbkluZGV4LCAxKTtcblxuICAgICAgICAgIHJldHVybiBmaW5hbEV4cHJlc3Npb247XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RFeHByZXNzaW9uKGV4cHJlc3Npb25VcmksIGl0ZW0uaXRlbSwgbGlua0lkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGEgRkhJUlBhdGggZXhwcmVzc2lvbiBpbnRvIGEgbW9yZSB1c2VyIGZyaWVuZGx5IGZvcm1hdCBpZiBwb3NzaWJsZS5cbiAgICogSWYgdGhlIGZvcm1hdCBvZiB0aGUgRkhJUlBhdGggbWF0Y2hlcyBhIGZvcm1hdCB3ZSBjYW4gZGlzcGxheSB3aXRoIGFcbiAgICogcXVlc3Rpb24gZHJvcGRvd24sIGV0YyBzaG93IHRoYXQuIElmIG5vdCBzaG93IHRoZSBGSElSUGF0aCBleHByZXNzaW9uLlxuICAgKiBAcGFyYW0gbmFtZSAtIE5hbWUgdG8gYXNzaWduIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBleHByZXNzaW9uIC0gRXhwcmVzc2lvbiB0byBwcm9jZXNzXG4gICAqIEBwYXJhbSBpbmRleCAtIE9yaWdpbmFsIG9yZGVyIGluIGV4dGVuc2lvbiBsaXN0XG4gICAqIEBwYXJhbSBleHRlbnNpb25zIC0gQW55IGFkZGl0aW9uYWwgZXh0ZW5zaW9ucyAoZm9yIHNpbXBsZSBmaGlycGF0aCBldGMpXG4gICAqIEByZXR1cm4gVmFyaWFibGUgdHlwZSB3aGljaCBjYW4gYmUgdXNlZCBieSB0aGUgUnVsZSBFZGl0b3IgdG8gc2hvdyBhXG4gICAqIHF1ZXN0aW9uLCBleHByZXNzaW9uIGV0Y1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzVmFyaWFibGUobmFtZSwgZXhwcmVzc2lvbiwgaW5kZXg/OiBudW1iZXIsIGV4dGVuc2lvbnM/KTogVmFyaWFibGUge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBleHByZXNzaW9uLm1hdGNoKHRoaXMuUVVFU1RJT05fUkVHRVgpO1xuXG4gICAgY29uc3Qgc2ltcGxlRXh0ZW5zaW9uID0gZXh0ZW5zaW9ucyAmJiBleHRlbnNpb25zLmZpbmQoZSA9PiBlLnVybCA9PT0gdGhpcy5TSU1QTEVfU1lOVEFYX0VYVEVOU0lPTik7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbGlua0lkID0gbWF0Y2hlc1sxXTtcbiAgICAgIGNvbnN0IGZhY3RvciA9IG1hdGNoZXNbMl07XG5cbiAgICAgIGNvbnN0IHZhcmlhYmxlOiBWYXJpYWJsZSA9IHtcbiAgICAgICAgX18kaW5kZXg6IGluZGV4LFxuICAgICAgICBsYWJlbDogbmFtZSxcbiAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcbiAgICAgICAgbGlua0lkLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9O1xuXG4gICAgICBpZiAoZmFjdG9yKSB7XG4gICAgICAgIC8vIFdlIG1pZ2h0IGJlIGFibGUgdG8gZG8gdW5pdCBjb252ZXJzaW9uXG4gICAgICAgIGNvbnN0IHNvdXJjZVVuaXRzID0gdGhpcy5nZXRRdWVzdGlvblVuaXRzKGxpbmtJZCk7XG5cbiAgICAgICAgaWYgKFVOSVRfQ09OVkVSU0lPTi5oYXNPd25Qcm9wZXJ0eShzb3VyY2VVbml0cykpIHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzaW9ucyA9IFVOSVRfQ09OVkVSU0lPTltzb3VyY2VVbml0c107XG4gICAgICAgICAgY29uc3QgY29udmVyc2lvbiA9IGNvbnZlcnNpb25zLmZpbmQoKGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlLmZhY3Rvci50b1N0cmluZygpID09PSBmYWN0b3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXJpYWJsZS51bml0ID0gY29udmVyc2lvbi51bml0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YXJpYWJsZTtcbiAgICB9IGVsc2UgaWYgKHNpbXBsZUV4dGVuc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBfXyRpbmRleDogaW5kZXgsXG4gICAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgICB0eXBlOiAnc2ltcGxlJyxcbiAgICAgICAgZXhwcmVzc2lvbixcbiAgICAgICAgc2ltcGxlOiBzaW1wbGVFeHRlbnNpb24udmFsdWVTdHJpbmdcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIF9fJGluZGV4OiBpbmRleCxcbiAgICAgICAgbGFiZWw6IG5hbWUsXG4gICAgICAgIHR5cGU6ICdleHByZXNzaW9uJyxcbiAgICAgICAgZXhwcmVzc2lvblxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBhIHgtZmhpci1xdWVyeSBleHByZXNzaW9uIGludG8gYSBtb3JlIHVzZXIgZnJpZW5kbHkgZm9ybWF0IGlmXG4gICAqIHBvc3NpYmxlLiBTaG93IGEgY29kZSBhdXRvY29tcGxldGUgZmllbGQgaWYgcG9zc2libGUgaWYgbm90IHNob3cgdGhlXG4gICAqIGV4cHJlc3Npb24gZWRpdGluZyBmaWVsZC5cbiAgICogQHBhcmFtIG5hbWUgLSBOYW1lIHRvIGFzc2lnbiB2YXJpYWJsZVxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiAtIEV4cHJlc3Npb24gdG8gcHJvY2Vzc1xuICAgKiBAcGFyYW0gaW5kZXggLSBPcmlnaW5hbCBvcmRlciBpbiBleHRlbnNpb24gbGlzdFxuICAgKiBAcmV0dXJuIFZhcmlhYmxlIHR5cGUgd2hpY2ggY2FuIGJlIHVzZWQgYnkgdGhlIFJ1bGUgRWRpdG9yIHRvIHNob3cgYVxuICAgKiBxdWVzdGlvbiwgZXhwcmVzc2lvbiBldGNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc1F1ZXJ5VmFyaWFibGUobmFtZSwgZXhwcmVzc2lvbiwgaW5kZXg/OiBudW1iZXIpOiBWYXJpYWJsZSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGV4cHJlc3Npb24ubWF0Y2godGhpcy5RVUVSWV9SRUdFWCk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY29kZXMgPSBtYXRjaGVzWzFdLnNwbGl0KCclMkMnKTsgIC8vIFVSTCBlbmNvZGVkIGNvbW1hICcsJ1xuICAgICAgY29uc3QgdGltZUludGVydmFsID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApO1xuICAgICAgY29uc3QgdGltZUludGVydmFsVW5pdHMgPSBtYXRjaGVzWzNdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfXyRpbmRleDogaW5kZXgsXG4gICAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgICB0eXBlOiAncXVlcnlPYnNlcnZhdGlvbicsXG4gICAgICAgIGNvZGVzLFxuICAgICAgICB0aW1lSW50ZXJ2YWwsXG4gICAgICAgIHRpbWVJbnRlcnZhbFVuaXQ6IHRpbWVJbnRlcnZhbFVuaXRzLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBfXyRpbmRleDogaW5kZXgsXG4gICAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgICB0eXBlOiAncXVlcnknLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gY2hlY2sgYmVoYXZpb3Igb2YgcmVwZWF0aW5nIGxpbmtJZFxuICAvKipcbiAgICogR2V0IHF1ZXN0aW9uIHVuaXRzIGZvciB0aGUgcXVlc3Rpb25cbiAgICogQHBhcmFtIGxpbmtJZCAtIFF1ZXN0aW9uIGxpbmtJZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRRdWVzdGlvblVuaXRzKGxpbmtJZCk6IHN0cmluZyB7XG4gICAgY29uc3QgUVVFU1RJT05OQUlSRV9VTklUID0gJ2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9xdWVzdGlvbm5haXJlLXVuaXQnO1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5saW5rSWRUb1F1ZXN0aW9uW2xpbmtJZF07XG5cbiAgICBpZiAocXVlc3Rpb24uZXh0ZW5zaW9uKSB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSBxdWVzdGlvbi5leHRlbnNpb24uZmluZCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS51cmwgPT09IFFVRVNUSU9OTkFJUkVfVU5JVCAmJlxuICAgICAgICAgIGUudmFsdWVDb2Rpbmcuc3lzdGVtICYmIGUudmFsdWVDb2Rpbmcuc3lzdGVtID09PSAnaHR0cDovL3VuaXRzb2ZtZWFzdXJlLm9yZyc7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGV4dGVuc2lvbiAmJiBleHRlbnNpb24udmFsdWVDb2RpbmcuY29kZSkge1xuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uLnZhbHVlQ29kaW5nLmNvZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBsYWJlbCBuYW1lIGxpa2UgQSwgQiwgQywgLi4uIEFBLCBBQiB3aGljaCBpcyBub3QgYWxyZWFkeSB1c2VkXG4gICAqIEBwYXJhbSBleGlzdGluZ05hbWVzIHtzdHJpbmdbXX0gLSBBcnJheSBvZiBuYW1lcyBhbHJlYWR5IHVzZWQgYnkgZXhpc3RpbmcgdmFyaWFibGVzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGdldE5ld0xhYmVsTmFtZShleGlzdGluZ05hbWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgLy8gQWxsIGxldHRlcnMgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGEgc2ltcGxlIHZhcmlhYmxlIG5hbWVcbiAgICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpO1xuXG4gICAgLy8gRmlyc3QgcGFzcyBpcyB3aXRoIGEgc2luZ2xlIGNoYXJhY3RlciB2YXJpYWJsZSBuYW1lLiBPdGhlciBwYXNzZXMgYXJlIHdpdGggdHdvXG4gICAgY29uc3QgZmlyc3RMZXR0ZXJBbHBoYWJldCA9IFsnJ10uY29uY2F0KGFscGhhYmV0KTtcbiAgICBmb3IgKGNvbnN0IGZpcnN0TGV0dGVyIG9mIGZpcnN0TGV0dGVyQWxwaGFiZXQpIHtcbiAgICAgIGZvciAoY29uc3Qgc2Vjb25kTGV0dGVyIG9mIGFscGhhYmV0KSB7XG4gICAgICAgIGNvbnN0IHBvdGVudGlhbE5hbWUgPSBmaXJzdExldHRlciArIHNlY29uZExldHRlcjtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGV4aXN0aW5nTmFtZXMuZmlsdGVyKChlKSA9PiBlID09PSBwb3RlbnRpYWxOYW1lKTtcblxuICAgICAgICBpZiAoY291bnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHBvdGVudGlhbE5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEb24ndCByZXR1cm4gYSBzdWdnZXN0ZWQgbmFtZSBpZiB3ZSBleGhhdXN0ZWQgYWxsIGNvbWJpbmF0aW9uc1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIG1pZ2h0QmVTY29yZVxuICAgKi9cbiAgdG9nZ2xlTWlnaHRCZVNjb3JlKCk6IHZvaWQge1xuICAgIHRoaXMubWlnaHRCZVNjb3JlID0gIXRoaXMubWlnaHRCZVNjb3JlO1xuICAgIHRoaXMubWlnaHRCZVNjb3JlQ2hhbmdlLm5leHQodGhpcy5taWdodEJlU2NvcmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB2YXJpYWJsZXMgYW5kIGZpbmFsRXhwcmVzc2lvbiBhbmQgcmV0dXJuIHRoZSBuZXcgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSB1cmwgRXh0ZW5zaW9uIFVSTCB0byB1c2UgZm9yIHRoZSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBmaW5hbEV4cHJlc3Npb25cbiAgICovXG4gIGV4cG9ydCh1cmw6IHN0cmluZywgZmluYWxFeHByZXNzaW9uOiBzdHJpbmcpOiBvYmplY3Qge1xuICAgIC8vIFRPRE8gc3VwcG9ydCBmb3IgZGlmZmVyZW50IHZhcmlhYmxlIHNjb3Blc1xuICAgIC8vIENvcHkgdGhlIGZoaXIgb2JqZWN0IHNvIHdlIGNhbiBleHBvcnQgbW9yZSB0aGFuIG9uY2VcbiAgICAvLyAoaWYgd2UgYWRkIG91ciBkYXRhIHRoZSBzZWNvbmQgZXhwb3J0IHdpbGwgaGF2ZSBkdXBsaWNhdGVzKVxuICAgIGNvbnN0IGZoaXIgPSBjb3B5KHRoaXMuZmhpcik7XG5cbiAgICBjb25zdCB2YXJpYWJsZXNUb0FkZCA9IHRoaXMudmFyaWFibGVzLm1hcCgoZSkgPT4ge1xuICAgICAgY29uc3QgdmFyaWFibGUgPSB7XG4gICAgICAgIF9fJGluZGV4OiBlLl9fJGluZGV4LFxuICAgICAgICB1cmw6IHRoaXMuVkFSSUFCTEVfRVhURU5TSU9OLFxuICAgICAgICB2YWx1ZUV4cHJlc3Npb246IHtcbiAgICAgICAgICBuYW1lOiBlLmxhYmVsLFxuICAgICAgICAgIGxhbmd1YWdlOiBlLnR5cGUgPT09ICdxdWVyeScgPyB0aGlzLkxBTkdVQUdFX0ZISVJfUVVFUlkgOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICAgIGV4cHJlc3Npb246IGUuZXhwcmVzc2lvblxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoZS50eXBlID09PSAnc2ltcGxlJykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHZhcmlhYmxlLnZhbHVlRXhwcmVzc2lvbi5leHRlbnNpb24gPSBbe1xuICAgICAgICAgIHVybDogdGhpcy5TSU1QTEVfU1lOVEFYX0VYVEVOU0lPTixcbiAgICAgICAgICB2YWx1ZVN0cmluZzogZS5zaW1wbGVcbiAgICAgICAgfV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YXJpYWJsZTtcbiAgICB9KTtcblxuICAgIC8vIFNwbGl0IHRoZSB2YXJpYWJsZXMgaW50byB0d28gYnVja2V0czogVmFyaWFibGVzIHByZXNlbnQgd2hlblxuICAgIC8vIFF1ZXN0aW9ubmFpcmUgd2FzIGltcG9ydGVkIGFuZCB2YXJpYWJsZXMgYWRkZWQgYnkgdGhlIHVzZXIgdXNpbmcgdGhlIFJ1bGVcbiAgICAvLyBFZGl0b3IuIEFkZCB2YXJpYWJsZXMgcHJlc2VudCBpbml0aWFsbHkgYW1vbmcgdGhlIGV4aXN0aW5nIGV4dGVuc2lvbnMuXG4gICAgLy8gQWRkIHRoZSByZW1haW5pbmcgdmFyaWFibGVzIGF0IHRoZSBlbmRcbiAgICBjb25zdCB2YXJpYWJsZXNQcmVzZW50SW5pdGlhbGx5ID0gW107XG4gICAgY29uc3QgdmFyaWFibGVzQWRkZWQgPSBbXTtcblxuICAgIHZhcmlhYmxlc1RvQWRkLmZvckVhY2goZSA9PiB7XG4gICAgICBpZiAoZS5fXyRpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhcmlhYmxlc0FkZGVkLnB1c2goZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJpYWJsZXNQcmVzZW50SW5pdGlhbGx5LnB1c2goZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZmhpci5leHRlbnNpb24pIHtcbiAgICAgIC8vIEludHJvZHVjZSB2YXJpYWJsZXMgcHJlc2VudCBiZWZvcmVcbiAgICAgIGZoaXIuZXh0ZW5zaW9uID0gZmhpci5leHRlbnNpb24uY29uY2F0KHZhcmlhYmxlc1ByZXNlbnRJbml0aWFsbHkpO1xuICAgICAgLy8gU29ydCBieSBpbmRleFxuICAgICAgZmhpci5leHRlbnNpb24uc29ydCgoYSwgYikgPT4gYS5fXyRpbmRleCAtIGIuX18kaW5kZXgpO1xuICAgICAgLy8gQWRkIHZhcmlhYmxlcyBhZGRlZCBieSB0aGUgdXNlclxuICAgICAgZmhpci5leHRlbnNpb24gPSBmaGlyLmV4dGVuc2lvbi5jb25jYXQodmFyaWFibGVzQWRkZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaGlyLmV4dGVuc2lvbiA9IHZhcmlhYmxlc1ByZXNlbnRJbml0aWFsbHkuY29uY2F0KHZhcmlhYmxlc0FkZGVkKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgX18kaW5kZXhcbiAgICBmaGlyLmV4dGVuc2lvbiA9IGZoaXIuZXh0ZW5zaW9uLm1hcCgoe19fJGluZGV4LCAuLi5vdGhlcn0pID0+IG90aGVyKTtcblxuICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbkV4dGVuc2lvbjogYW55ID0ge1xuICAgICAgdXJsLFxuICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgIGxhbmd1YWdlOiB0aGlzLkxBTkdVQUdFX0ZISVJQQVRILFxuICAgICAgICBleHByZXNzaW9uOiBmaW5hbEV4cHJlc3Npb25cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVE9ETyBrZWVwIGV4aXN0aW5nIGV4dGVuc2lvbnNcbiAgICBpZiAodGhpcy5zeW50YXhUeXBlID09PSAnc2ltcGxlJykge1xuICAgICAgZmluYWxFeHByZXNzaW9uRXh0ZW5zaW9uLnZhbHVlRXhwcmVzc2lvbi5leHRlbnNpb24gPSBbe1xuICAgICAgICB1cmw6IHRoaXMuU0lNUExFX1NZTlRBWF9FWFRFTlNJT04sXG4gICAgICAgIHZhbHVlU3RyaW5nOiB0aGlzLnNpbXBsZUV4cHJlc3Npb25cbiAgICAgIH1dO1xuICAgIH1cblxuICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhmaGlyLml0ZW0sIHRoaXMubGlua0lkQ29udGV4dCwgW2ZpbmFsRXhwcmVzc2lvbkV4dGVuc2lvbl0pO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGFueSBxdWVyeSBvYnNlcnZhdGlvbiBleHRlbnNpb25zIGNoZWNrIHRvIG1ha2Ugc3VyZSB0aGVyZSBpc1xuICAgIC8vIGEgcGF0aWVudCBsYXVuY2ggY29udGV4dC4gSWYgdGhlcmUgaXMgbm90IGFkZCBvbmUuXG4gICAgY29uc3QgaGFzUXVlcnlPYnNlcnZhdGlvbnMgPSB0aGlzLnZhcmlhYmxlcy5maW5kKChlKSA9PiB7XG4gICAgICByZXR1cm4gZS50eXBlID09PSAncXVlcnlPYnNlcnZhdGlvbic7XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzUXVlcnlPYnNlcnZhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcGF0aWVudExhdW5jaENvbnRleHQgPSBmaGlyLmV4dGVuc2lvbi5maW5kKChleHRlbnNpb24pID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbi51cmwgPT09IHRoaXMuTEFVTkNIX0NPTlRFWFRfVVJJICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGV4dGVuc2lvbi5leHRlbnNpb24pKSB7XG4gICAgICAgICAgY29uc3QgcGF0aWVudE5hbWUgPSBleHRlbnNpb24uZXh0ZW5zaW9uLmZpbmQoKHN1YkV4dGVuc2lvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1YkV4dGVuc2lvbi51cmwgPT09ICduYW1lJyAmJiBzdWJFeHRlbnNpb24udmFsdWVJZCA9PT0gJ3BhdGllbnQnO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHBhdGllbnROYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGF0aWVudExhdW5jaENvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBBZGQgbGF1bmNoQ29udGV4dFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmhpci5leHRlbnNpb24pKSB7XG4gICAgICAgICAgZmhpci5leHRlbnNpb24gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWUgPSAncGF0aWVudCc7XG4gICAgICAgIGNvbnN0IHR5cGUgPSAnUGF0aWVudCc7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ0ZvciBmaWxsaW5nIGluIHBhdGllbnQgaW5mb3JtYXRpb24gYXMgdGhlIHN1YmplY3QgZm9yIHRoZSBmb3JtJztcblxuICAgICAgICBmaGlyLmV4dGVuc2lvbi5wdXNoKHtcbiAgICAgICAgICB1cmw6IHRoaXMuTEFVTkNIX0NPTlRFWFRfVVJJLFxuICAgICAgICAgIGV4dGVuc2lvbjogW1xuICAgICAgICAgICAgeyB1cmw6ICduYW1lJywgdmFsdWVJZDogbmFtZSB9LFxuICAgICAgICAgICAgeyB1cmw6ICd0eXBlJywgdmFsdWVDb2RlOiB0eXBlIH0sXG4gICAgICAgICAgICB7IHVybDogJ2Rlc2NyaXB0aW9uJywgdmFsdWVTdHJpbmc6IGRlc2NyaXB0aW9uIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlcy5wdXNoKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlc0NoYW5nZS5uZXh0KHRoaXMudW5lZGl0YWJsZVZhcmlhYmxlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZoaXI7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgRkhJUiBxdWVzdGlvbm5haXJlIGRlZmluaXRpb24gYW5kIGEgbGlua0lkIGFuZCByZXR1cm5zIHRoZSBGSElSXG4gICAqIFF1ZXN0aW9ubmFpcmUgd2l0aCBhIGNhbGN1bGF0ZWQgZXhwcmVzc2lvbiBhdCB0aGUgZ2l2ZW4gbGlua0lkIHdoaWNoIHN1bXMgdXBcbiAgICogYWxsIHRoZSBvcmRpbmFsIHZhbHVlcyBpbiB0aGUgcXVlc3Rpb25uYWlyZVxuICAgKiBAcGFyYW0gcXVlc3Rpb25uYWlyZSAtIEZISVIgUXVlc3Rpb25uYWlyZVxuICAgKiBAcGFyYW0gbGlua0lkIC0gUXVlc3Rpb24gbGlua0lkXG4gICAqL1xuICBhZGRUb3RhbFNjb3JlUnVsZShxdWVzdGlvbm5haXJlLCBsaW5rSWQpOiBvYmplY3Qge1xuICAgIHRoaXMuZmhpciA9IHF1ZXN0aW9ubmFpcmU7XG4gICAgdGhpcy5saW5rSWRDb250ZXh0ID0gbGlua0lkO1xuICAgIHJldHVybiB0aGlzLmFkZFN1bU9mU2NvcmVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gdGhlIGN1cnJlbnQgRkhJUiBxdWVzdGlvbm5haXJlIGRlZmluaXRpb24gYW5kIGEgbGlua0lkIHJldHVybiBhIG5ldyBGSElSXG4gICAqIFF1ZXN0aW9ubmFpcmUgd2l0aCBhIGNhbGN1bGF0ZWQgZXhwcmVzc2lvbiBhdCB0aGUgZ2l2ZW4gbGlua0lkIHdoaWNoIHN1bXMgdXBcbiAgICogYWxsIHRoZSBvcmRpbmFsIHZhbHVlcyBpbiB0aGUgcXVlc3Rpb25uYWlyZVxuICAgKi9cbiAgYWRkU3VtT2ZTY29yZXMoKTogb2JqZWN0IHtcbiAgICBjb25zdCBmaGlyID0gdGhpcy5maGlyO1xuICAgIGNvbnN0IGxpbmtJZENvbnRleHQgPSB0aGlzLmxpbmtJZENvbnRleHQ7XG5cbiAgICBjb25zdCB2YXJpYWJsZU5hbWVzID0gW107XG4gICAgY29uc3Qgc2NvcmVRdWVzdGlvbkxpbmtJZHMgPSBbXTtcblxuICAgIC8vIEdldCBhbiBhcnJheSBvZiBsaW5rSWRzIGZvciBzY29yZSBxdWVzdGlvbnNcbiAgICBmaGlyLml0ZW0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubGlua0lkICE9PSBsaW5rSWRDb250ZXh0ICYmIHRoaXMuaXRlbUhhc1Njb3JlKGl0ZW0pKSB7XG4gICAgICAgIHNjb3JlUXVlc3Rpb25MaW5rSWRzLnB1c2goaXRlbS5saW5rSWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR2V0IGFzIG1hbnkgc2hvcnQgc3VnZ2VzdGVkIHZhcmlhYmxlIG5hbWVzIGFzIHdlIGhhdmUgc2NvcmUgcXVlc3Rpb25zXG4gICAgc2NvcmVRdWVzdGlvbkxpbmtJZHMuZm9yRWFjaCgoKSA9PiB7XG4gICAgICB2YXJpYWJsZU5hbWVzLnB1c2godGhpcy5nZXROZXdMYWJlbE5hbWUodmFyaWFibGVOYW1lcykpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2NvcmVRdWVzdGlvbnMgPSBzY29yZVF1ZXN0aW9uTGlua0lkcy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDogdGhpcy5WQVJJQUJMRV9FWFRFTlNJT04sXG4gICAgICAgIHZhbHVlRXhwcmVzc2lvbjoge1xuICAgICAgICAgIG5hbWU6IHZhcmlhYmxlTmFtZXNbaV0sXG4gICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgsXG4gICAgICAgICAgZXhwcmVzc2lvbjogYCVxdWVzdGlvbm5haXJlLml0ZW0ud2hlcmUobGlua0lkID0gJyR7ZX0nKS5hbnN3ZXJPcHRpb25gICtcbiAgICAgICAgICAgIGAud2hlcmUodmFsdWVDb2RpbmcuY29kZT0lcmVzb3VyY2UuaXRlbS53aGVyZShsaW5rSWQgPSAnJHtlfScpLmFuc3dlci52YWx1ZUNvZGluZy5jb2RlKS5leHRlbnNpb25gICtcbiAgICAgICAgICAgIGAud2hlcmUodXJsPSdodHRwOi8vaGw3Lm9yZy9maGlyL1N0cnVjdHVyZURlZmluaXRpb24vb3JkaW5hbFZhbHVlJykudmFsdWVEZWNpbWFsYCxcbiAgICAgICAgICBleHRlbnNpb246IFt7XG4gICAgICAgICAgICB1cmw6IHRoaXMuU0NPUkVfVkFSSUFCTEVfRVhURU5TSU9OXG4gICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFueVF1ZXN0aW9uQW5zd2VyZWQgPSB7XG4gICAgICB1cmw6IHRoaXMuVkFSSUFCTEVfRVhURU5TSU9OLFxuICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgIG5hbWU6ICdhbnlfcXVlc3Rpb25zX2Fuc3dlcmVkJyxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuTEFOR1VBR0VfRkhJUlBBVEgsXG4gICAgICAgIGV4cHJlc3Npb246IHZhcmlhYmxlTmFtZXMubWFwKChlKSA9PiBgJSR7ZX0uZXhpc3RzKClgKS5qb2luKCcgb3IgJyksXG4gICAgICAgIGV4dGVuc2lvbjogW3tcbiAgICAgICAgICB1cmw6IHRoaXMuU0NPUkVfVkFSSUFCTEVfRVhURU5TSU9OXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHN1bVN0cmluZyA9IHZhcmlhYmxlTmFtZXMubWFwKChlKSA9PiBgaWlmKCUke2V9LmV4aXN0cygpLCAlJHtlfSwgMClgKS5qb2luKCcgKyAnKTtcblxuICAgIGNvbnN0IHRvdGFsQ2FsY3VsYXRpb24gPSB7XG4gICAgICB1cmw6IHRoaXMuQ0FMQ1VMQVRFRF9FWFBSRVNTSU9OLFxuICAgICAgdmFsdWVFeHByZXNzaW9uOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVG90YWwgc2NvcmUgY2FsY3VsYXRpb24nLFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5MQU5HVUFHRV9GSElSUEFUSCxcbiAgICAgICAgZXhwcmVzc2lvbjogYGlpZiglYW55X3F1ZXN0aW9uc19hbnN3ZXJlZCwgJHtzdW1TdHJpbmd9LCB7fSlgLFxuICAgICAgICBleHRlbnNpb246IFt7XG4gICAgICAgICAgdXJsOiB0aGlzLlNDT1JFX0VYUFJFU1NJT05fRVhURU5TSU9OXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNjb3JlUXVlc3Rpb25zLnB1c2goYW55UXVlc3Rpb25BbnN3ZXJlZCk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHNjb3JlUXVlc3Rpb25zLnB1c2godG90YWxDYWxjdWxhdGlvbik7XG5cbiAgICB0aGlzLmluc2VydEV4dGVuc2lvbnMoZmhpci5pdGVtLCBsaW5rSWRDb250ZXh0LCBzY29yZVF1ZXN0aW9ucyk7XG5cbiAgICByZXR1cm4gZmhpcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHJlZmVyZW5jZWQgUXVlc3Rpb25uYWlyZSBpdGVtIGlzIGEgc2NvcmUgY2FsY3VsYXRpb24gYWRkZWQgYnlcbiAgICogdGhlIFJ1bGUgRWRpdG9yXG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWQgLSBRdWVzdGlvbm5haXJlIGl0ZW0gTGluayBJRCB0byBjaGVja1xuICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIHF1ZXN0aW9uIGF0IGxpbmtJZCBpcyBhIHNjb3JlIGNhbGN1bGF0aW9uIGNyZWF0ZWQgYnlcbiAgICogdGhlIFJ1bGUgRWRpdG9yLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIGlzU2NvcmVDYWxjdWxhdGlvbihxdWVzdGlvbm5haXJlLCBsaW5rSWQpOiBib29sZWFuIHtcbiAgICBjb25zdCBjaGVja0ZvclNjb3JlID0gKGl0ZW0pID0+IHtcbiAgICAgIGlmIChsaW5rSWQgPT09IGl0ZW0ubGlua0lkKSB7XG4gICAgICAgIGNvbnN0IGlzU2NvcmUgPSBpdGVtLmV4dGVuc2lvbi5maW5kKChleHRlbnNpb24pID0+ICEhdGhpcy5pc1Njb3JlRXh0ZW5zaW9uKGV4dGVuc2lvbikpO1xuXG4gICAgICAgIGlmIChpc1Njb3JlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0uaXRlbSkge1xuICAgICAgICBjb25zdCBzdWJJdGVtSGFzU2NvcmUgPSBpdGVtLml0ZW0uZmluZCgoc3ViSXRlbSkgPT4gY2hlY2tGb3JTY29yZShzdWJJdGVtKSk7XG5cbiAgICAgICAgaWYgKHN1Ykl0ZW1IYXNTY29yZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuICEhcXVlc3Rpb25uYWlyZS5pdGVtLmZpbmQoKGl0ZW0pID0+IGNoZWNrRm9yU2NvcmUoaXRlbSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBGSElSIHF1ZXN0aW9ubmFpcmUgc2NvcmUgY2FsY3VsYXRpb24gb24gdGhlIGl0ZW0gaWRlbnRpZmllZCBieVxuICAgKiB0aGUgbGlua0lkXG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWQgLSBRdWVzdGlvbm5haXJlIGl0ZW0gTGluayBJRCB0byB1cGRhdGVcbiAgICogQHJldHVybiBRdWVzdGlvbm5haXJlIHdpdGggdXBkYXRlZCBjYWxjdWxhdGlvblxuICAgKi9cbiAgdXBkYXRlU2NvcmVDYWxjdWxhdGlvbihxdWVzdGlvbm5haXJlLCBsaW5rSWQpOiBvYmplY3Qge1xuICAgIHRoaXMucmVtb3ZlU3VtT2ZTY29yZXMocXVlc3Rpb25uYWlyZSwgbGlua0lkKTtcbiAgICByZXR1cm4gdGhpcy5hZGRUb3RhbFNjb3JlUnVsZShxdWVzdGlvbm5haXJlLCBsaW5rSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc2NvcmUgY2FsY3VsYXRpb25zIGFkZGVkIGJ5IHRoZSBydWxlIGVkaXRvciBvbiB0aGUgZW50aXJlXG4gICAqIHF1ZXN0aW9ubmFpcmUgb3Igb24gYSBzcGVjaWZpYyBpdGVtXG4gICAqIEBwYXJhbSBxdWVzdGlvbm5haXJlIC0gRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBsaW5rSWQgLSBRdWVzdGlvbm5haXJlIGl0ZW0gTGluayBJRCB3aGVyZSB0byByZW1vdmUgc2NvcmUuIElmIGVtcHR5XG4gICAqIHRyeSB0byByZW1vdmUgc2NvcmVzIGZyb20gYWxsIGl0ZW1zLlxuICAgKiBAcmV0dXJuIFF1ZXN0aW9ubmFpcmUgd2l0aG91dCB0aGUgc2NvcmUgY2FsY3VsYXRpb24gdmFyaWFibGUgYW5kIGV4cHJlc3Npb25cbiAgICovXG4gIHJlbW92ZVN1bU9mU2NvcmVzKHF1ZXN0aW9ubmFpcmUsIGxpbmtJZD8pOiBvYmplY3Qge1xuICAgIHRoaXMuZmhpciA9IHF1ZXN0aW9ubmFpcmU7XG5cbiAgICBjb25zdCByZW1vdmVJdGVtU2NvcmVWYXJpYWJsZXMgPSAoaXRlbSkgPT4ge1xuICAgICAgaWYgKGxpbmtJZCA9PT0gdW5kZWZpbmVkIHx8IGxpbmtJZCA9PT0gaXRlbS5saW5rSWQpIHtcbiAgICAgICAgaXRlbS5leHRlbnNpb24gPSBpdGVtLmV4dGVuc2lvbi5maWx0ZXIoKGV4dGVuc2lvbikgPT4gIXRoaXMuaXNTY29yZUV4dGVuc2lvbihleHRlbnNpb24pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0uaXRlbSkge1xuICAgICAgICBpdGVtLml0ZW0uZm9yRWFjaCgoc3ViSXRlbSkgPT4gcmVtb3ZlSXRlbVNjb3JlVmFyaWFibGVzKHN1Ykl0ZW0pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5maGlyLml0ZW0uZm9yRWFjaChyZW1vdmVJdGVtU2NvcmVWYXJpYWJsZXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZmhpcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGV4dGVuc2lvbiBoYXMgYW4gZXh0ZW5zaW9uIGZvciBjYWxjdWxhdGluZyBzY29yZSBmYWxzZSBvdGhlcndpc2VcbiAgICogQHBhcmFtIGV4dGVuc2lvbiAtIEZISVIgRXh0ZW5zaW9uIG9iamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBpc1Njb3JlRXh0ZW5zaW9uKGV4dGVuc2lvbik6IGJvb2xlYW4ge1xuICAgIGlmIChleHRlbnNpb24udmFsdWVFeHByZXNzaW9uICYmIGV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24uZXh0ZW5zaW9uICYmXG4gICAgICBleHRlbnNpb24udmFsdWVFeHByZXNzaW9uLmV4dGVuc2lvbi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAhIWV4dGVuc2lvbi52YWx1ZUV4cHJlc3Npb24uZXh0ZW5zaW9uLmZpbmQoZSA9PiBlICYmXG4gICAgICAgIChlLnVybCA9PT0gdGhpcy5TQ09SRV9WQVJJQUJMRV9FWFRFTlNJT04gfHxcbiAgICAgICAgICBlLnVybCA9PT0gdGhpcy5TQ09SRV9FWFBSRVNTSU9OX0VYVEVOU0lPTikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRFeHRlbnNpb25zKGl0ZW1zLCBsaW5rSWQsIGV4dGVuc2lvbnMpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChpdGVtLmxpbmtJZCA9PT0gbGlua0lkKSB7XG4gICAgICAgIGlmIChpdGVtLmV4dGVuc2lvbikge1xuICAgICAgICAgIGl0ZW0uZXh0ZW5zaW9uID0gaXRlbS5leHRlbnNpb24uY29uY2F0KGV4dGVuc2lvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZXh0ZW5zaW9uID0gZXh0ZW5zaW9ucztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0RXh0ZW5zaW9ucyhpdGVtLml0ZW0sIGxpbmtJZCwgZXh0ZW5zaW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwcmVzc2lvbiBmb3IgYSBxdWVzdGlvblxuICAgKiBAcGFyYW0gbGlua0lkIC0gUXVlc3Rpb24gbGlua0lkXG4gICAqIEBwYXJhbSBpdGVtSGFzU2NvcmUgLSBBbnN3ZXIgaGFzIGFuIG9yZGluYWxWYWx1ZSBleHRlbnNpb25cbiAgICogQHBhcmFtIGNvbnZlcnRpYmxlIC0gVW5pdHMgY2FuIGJlIGNvbnZlcnRlZFxuICAgKiBAcGFyYW0gdW5pdCAtIEJhc2UgdW5pdHNcbiAgICogQHBhcmFtIHRvVW5pdCAtIERlc3RpbmF0aW9uIHVuaXRzXG4gICAqL1xuICB2YWx1ZU9yU2NvcmVFeHByZXNzaW9uKGxpbmtJZDogc3RyaW5nLCBpdGVtSGFzU2NvcmU6IGJvb2xlYW4sIGNvbnZlcnRpYmxlOiBib29sZWFuLCB1bml0OiBzdHJpbmcsIHRvVW5pdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbUhhc1Njb3JlKSB7XG4gICAgICByZXR1cm4gYCVxdWVzdGlvbm5haXJlLml0ZW0ud2hlcmUobGlua0lkID0gJyR7bGlua0lkfScpLmFuc3dlck9wdGlvbmAgK1xuICAgICAgICBgLndoZXJlKHZhbHVlQ29kaW5nLmNvZGU9JXJlc291cmNlLml0ZW0ud2hlcmUobGlua0lkID0gJyR7bGlua0lkfScpLmFuc3dlci52YWx1ZUNvZGluZy5jb2RlKS5leHRlbnNpb25gICtcbiAgICAgICAgYC53aGVyZSh1cmw9J2h0dHA6Ly9obDcub3JnL2ZoaXIvU3RydWN0dXJlRGVmaW5pdGlvbi9vcmRpbmFsVmFsdWUnKS52YWx1ZURlY2ltYWxgO1xuICAgIH0gZWxzZSBpZiAoY29udmVydGlibGUgJiYgdW5pdCAmJiB0b1VuaXQpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IFVOSVRfQ09OVkVSU0lPTlt1bml0XS5maW5kKChlKSA9PiBlLnVuaXQgPT09IHRvVW5pdCkuZmFjdG9yO1xuICAgICAgcmV0dXJuIGAlcmVzb3VyY2UuaXRlbS53aGVyZShsaW5rSWQ9JyR7bGlua0lkfScpLmFuc3dlci52YWx1ZSoke2ZhY3Rvcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCVyZXNvdXJjZS5pdGVtLndoZXJlKGxpbmtJZD0nJHtsaW5rSWR9JykuYW5zd2VyLnZhbHVlYDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';

import { CASE_REGEX, Question, UneditableVariable, Variable } from './variable';
import { UNIT_CONVERSION } from './units';

export interface SimpleStyle {
  h1?: object;
  h2?: object;
  previewArea?: object;
  variableHeader?: object;
  variableRow?: object;
  buttonPrimary?: object;
  buttonSecondary?: object;
  buttonDanger?: object;
  input?: object;
  select?: object;
  description?: object;
}

@Injectable({
  providedIn: 'root'
})
export class RuleEditorService {
  static SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
  static SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-expression';
  static SCORE_EXPRESSION_EXTENSION_LINKIDS = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-expression-linkids';
  
  static SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';

  syntaxType = 'simple';
  linkIdContext: string;
  uneditableVariablesChange: Subject<UneditableVariable[]> =
    new Subject<UneditableVariable[]>();
  variablesChange: Subject<Variable[]> = new Subject<Variable[]>();
  questionsChange: Subject<Question[]> = new Subject<Question[]>();
  scoreCalculationChange: Subject<boolean> = new Subject<boolean>();
  finalExpressionChange: Subject<string> = new Subject<string>();
  disableAdvancedChange: Subject<boolean> = new Subject<boolean>();
  uneditableVariables: UneditableVariable[];
  variables: Variable[];
  questions: Question[];
  finalExpression: string;
  finalExpressionExtension;
  simpleExpression: string;
  caseStatements: boolean;
  needsAdvancedInterface = false;
  doNotAskToCalculateScore = false;

  itemLinkIdsForCalculation: string[];

  private LANGUAGE_FHIRPATH = 'text/fhirpath';
  private LANGUAGE_FHIR_QUERY = 'application/x-fhir-query';
  private QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
  private QUERY_REGEX = /^Observation\?code=(.+)&date=gt{{today\(\)-(\d+) (.+)}}&patient={{%patient.id}}&_sort=-date&_count=1$/;
  private VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
  private CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
  private LAUNCH_CONTEXT_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext';

  private linkIdToQuestion = {};
  private fhir;
  scoreCalculation = false;

  constructor() {
    this.variables = [];
    this.uneditableVariables = [];
  }

  /**
   * Create a new variable
   */
  addVariable(): void {
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
  remove(i: number): void {
    this.variables.splice(i, 1);
  }

  /**
   * Trigger an update (used when changing variable names to update the preview)
   */
  update(): void {
    this.variablesChange.next(this.variables);
  }

  /**
   * Checks the advanced interface status and allows toggle if no expressions or
   * queries are present
   * @param toggleOn - Set the advanced interface on (without having to run checks)
   */
  checkAdvancedInterface(toggleOn?: boolean): void {
    if (toggleOn) {
      this.needsAdvancedInterface = true;
    } else {
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
   * Get the list of uneditable variables based on the FHIR Questionnaire:
   * Launch context + variables outside not on the current item scope
   * @param questionnaire - FHIR Questionnaire
   * @param linkIdContext - Context to use for final expression
   * @param launchContextOnly - Only show the launch context related extensions (default: false)
   */
  getUneditableVariables(questionnaire, linkIdContext, launchContextOnly = false): UneditableVariable[] {
    const uneditableVariables = [];

    if (Array.isArray(questionnaire.extension)) {
      const variables = questionnaire.extension.reduce((accumulator, extension) => {
        if (extension.url === this.LAUNCH_CONTEXT_URI && extension.extension) {
          accumulator.push({
            name: extension.extension.find((e) => e.url === 'name').valueId,
            type: extension.extension.filter((e) => e.url === 'type')?.map((e) => e.valueCode).join('|'),
            description: extension.extension.find((e) => e.url === 'description')?.valueString
          });
        } else if (this.isVariable(extension) && !launchContextOnly) {
          accumulator.push({
            name: extension.valueExpression.name,
            type: 'Variable',
            description: extension.valueExpression.expression,  // Might want to show simplified form
          });
        }
        return accumulator;
      }, []);
      uneditableVariables.push(...variables);
    }

    // Get the variables on item ancestors where linkId matches
    if (questionnaire.item instanceof Array && !launchContextOnly) {
      const ancestors = this.getAncestors(questionnaire.item, linkIdContext, []);

      if (ancestors instanceof Array) {
        ancestors.forEach(currentItem => {
          if (currentItem.extension instanceof Array) {
            currentItem.extension.forEach((extension) => {
              if (this.isVariable(extension)) {
                uneditableVariables.push({
                  name: extension.valueExpression.name,
                  type: 'Item variable',
                  description: extension.valueExpression.expression,  // Might want to show simplified form
                });
              }
            });
          }
        });
      }
    }

    return uneditableVariables;
  }

  /**
   * Find the ancestors of an item given the linkId and return those items.
   * @param items - Items array
   * @param itemLinkId - The item for which to determine ancestors
   * @param ancestors - Array of ancestor items. Empty array for root level
   * @return
   */
  getAncestors(items, itemLinkId, ancestors): Array<any> {
    for (const currentItem of items) {
      if (currentItem.linkId === itemLinkId) {
        return ancestors;
      }

      if (currentItem.item instanceof Array) {
        const tmp = this.getAncestors(currentItem.item, itemLinkId, ancestors.concat(currentItem));

        if (tmp !== null) {
          return tmp;
        }
      }
    }

    return null;
  }

  /**
   * Returns true if extension is a variable with FHIRPath or FHIR Query as the
   * language
   * @param extension - FHIR extension
   * @return true if extension is a variable
   * @private
   */
  private isVariable(extension): boolean {
    return extension.url === this.VARIABLE_EXTENSION && extension.valueExpression &&
      (extension.valueExpression.language === this.LANGUAGE_FHIRPATH ||
        extension.valueExpression.language === this.LANGUAGE_FHIR_QUERY);
  }

  /**
   * Get and remove the variables from the FHIR object
   * @param items - Question array
   * @param linkIdContext - Context to use for extracting variables
   * @return Array of variables
   */
  extractVariablesFromItems(items, linkIdContext): Variable[] {
    // Look at the item fhirpath related extensions to populate the editable variables

    const item = items.find((e) => e.linkId === linkIdContext && e.extension);
    if (item) {
      return this.extractVariablesFromExtensions(item);
    } else {
      if (items.item && items.item.length) {
        for (const searchItem of items.item) {
          if (searchItem.item) {
            const ret = this.extractVariablesFromItems(searchItem.item, linkIdContext);
            if (ret.length) {
              return ret;
            }
          }
        }
      }

      return [];
    }
  }

  /**
   * Get and remove the variables from an item or FHIR questionnaire
   * @param item - FHIR Questionnaire or item
   * @return Array of variables
   * @private
   */
  private extractVariablesFromExtensions(item): Variable[] {
    const variables = [];
    const nonVariableExtensions = [];

    // Add an index to each extension which we will then use to get the
    // variables back in the correct order. __$index will be removed on save
    item.extension = item.extension.map((e, i) => ({...e, __$index: i}));

    item.extension.forEach((extension) => {
      if (extension.url === this.VARIABLE_EXTENSION && extension.valueExpression) {
        switch (extension.valueExpression.language) {
          case this.LANGUAGE_FHIRPATH:
            const fhirPathVarToAdd = this.processVariable(
              extension.valueExpression.name,
              extension.valueExpression.expression,
              extension.__$index,
              extension.valueExpression.extension);
            if (fhirPathVarToAdd.type === 'expression') {
              this.needsAdvancedInterface = true;
            }
            variables.push(fhirPathVarToAdd);
            break;
          case this.LANGUAGE_FHIR_QUERY:
            const queryVarToAdd = this.processQueryVariable(
              extension.valueExpression.name,
              extension.valueExpression.expression,
              extension.__$index);
            if (queryVarToAdd.type === 'query') {
              this.needsAdvancedInterface = true;
            }
            variables.push(queryVarToAdd);
            break;
        }
      } else {
        nonVariableExtensions.push(extension);
      }
    });

    // Remove the variables so they can be re-added on export
    item.extension = nonVariableExtensions;

    return variables;
  }

  /**
   * Get and remove the variables from the FHIR object
   * @param fhir - FHIR Questionnaire
   */
  extractTopLevelVariables(fhir): Variable[] {
    if (fhir.extension instanceof Array) {
      return this.extractVariablesFromExtensions(fhir);
    } else {
      return [];
    }
  }

  /**
   * Check if the current item has an ordinalValue extension on the answer
   * @param item - Question item or linkId
   */
  itemHasScore(item): boolean {
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
   * @param item - FHIR Questionnaire or item
   * @param linkIdContext - linkId to exclude from calculation
   * @return number of score questions on the questionnaire
   */
  getScoreQuestionCount(item, linkIdContext): number {
    let scoreQuestions = 0;

    if (item.item) {
      item.item.forEach((currentItem) => {
        if (!currentItem.repeats && this.itemHasScore(currentItem)) {
          scoreQuestions++;
        }

        if (currentItem.item instanceof Array) {
          const nestedScoreQuestionCount = this.getScoreQuestionCount(currentItem, linkIdContext);

          scoreQuestions += nestedScoreQuestionCount;
        }
      });
    }
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
  import(expressionUri: string, questionnaire, linkIdContext): boolean {
    this.linkIdContext = linkIdContext;
    this.fhir = copy(questionnaire);
    const loadSuccess = this.fhir.resourceType === 'Questionnaire';

    if (loadSuccess && this.fhir.item && this.fhir.item.length) {
      if (!this.doNotAskToCalculateScore) {
        // If there is at least one score question we will ask the user if they
        // want to calculate the score
        const scoreMinQuestions = 1;
        this.scoreCalculation = this.getScoreQuestionCount(this.fhir, linkIdContext) >= scoreMinQuestions;
        this.scoreCalculationChange.next(this.scoreCalculation);
      } else {
        this.scoreCalculation = false;
      }

      this.linkIdToQuestion = {};
      this.needsAdvancedInterface = false;
      this.caseStatements = false;
      this.processItem(this.fhir.item);

      if (linkIdContext !== undefined && linkIdContext !== '') {
        this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext);
        this.variables = this.extractVariablesFromItems(this.fhir.item, linkIdContext);
      } else {
        this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext, true);
        this.variables = this.extractTopLevelVariables(this.fhir);

        // Since we don't have a target item the output expression does not make sense so hide it.
        expressionUri = '';
      }

      this.uneditableVariablesChange.next(this.uneditableVariables);
      this.variablesChange.next(this.variables);

      this.questions = [];

      // tslint:disable-next-line:forin
      for (const key in this.linkIdToQuestion) {
        if (!this.linkIdToQuestion.hasOwnProperty(key)) {
          return;
        }
        const e = this.linkIdToQuestion[key];
        // TODO decimal vs choice
        const MAX_Q_LEN = 60;  // Maximum question length before truncating.

        const text = e.text;

        if (e.text) {
          this.questions.push({
            linkId: e.linkId,
            text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
            unit: this.getQuestionUnits(e.linkId)
          });
        }
      }
      this.questionsChange.next(this.questions);

      if (expressionUri) {
        const expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);

        if (expression !== null) {
          // @ts-ignore
          this.finalExpression = expression.valueExpression.expression;
          this.finalExpressionExtension = expression;

          this.caseStatements = this.finalExpression.match(CASE_REGEX) !== null;

          const simpleSyntax = this.extractSimpleSyntax(expression);

          if (simpleSyntax === null && this.finalExpression !== '') {
            this.syntaxType = 'fhirpath';
            this.needsAdvancedInterface = true;
          } else {
            this.syntaxType = 'simple';
            this.simpleExpression = simpleSyntax;
          }
        } else {
          // Reset input to be a blank simple expression if there is nothing on
          // the form
          this.syntaxType = 'simple';
          this.simpleExpression = '';
          this.finalExpression = '';
          this.finalExpressionExtension = {
            url: expressionUri,
            valueExpression: {
              language: 'text/fhirpath',
              expression: this.finalExpression
            }
          };
        }

        this.finalExpressionChange.next(this.finalExpression);
      }
    }

    return loadSuccess;
  }

  /**
   * Process nested FHIR Questionnaire items
   * @param items - Current level of item nesting
   * @private
   */
  private processItem(items): void {
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
  extractSimpleSyntax(expression): string|null {
    if (expression.valueExpression && expression.valueExpression.extension) {
      const customExtension = expression.valueExpression.extension.find((e) => {
        return e.url === RuleEditorService.SIMPLE_SYNTAX_EXTENSION;
      });

      if (customExtension !== undefined) {
        return customExtension.valueString;  // TODO move to code
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
  extractExpression(expressionUri, items, linkId): object|null {
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
      } else if (item.item) {
        const expression = this.extractExpression(expressionUri, item.item, linkId);
        if (expression !== null)
          return expression;
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
  private processVariable(name, expression, index?: number, extensions?): Variable {
    const matches = expression.match(this.QUESTION_REGEX);

    const simpleExtension = extensions && extensions.find(e => e.url === RuleEditorService.SIMPLE_SYNTAX_EXTENSION);

    if (matches !== null) {
      const linkId = matches[1];
      const factor = matches[2];

      const variable: Variable = {
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
    } else if (simpleExtension !== undefined) {
      return {
        __$index: index,
        label: name,
        type: 'simple',
        expression,
        simple: simpleExtension.valueString
      };
    } else {
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
  private processQueryVariable(name, expression, index?: number): Variable {
    const matches = expression.match(this.QUERY_REGEX);

    if (matches !== null) {
      const codes = matches[1].split('%2C');  // URL encoded comma ','
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
    } else {
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
  private getQuestionUnits(linkId): string {
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
  private getNewLabelName(existingNames: string[]): string {
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
   * Toggle the Score Calculation
   */
  toggleScoreCalculation(): void {
    this.scoreCalculation = !this.scoreCalculation;
    this.scoreCalculationChange.next(this.scoreCalculation);
  }

  /**
   * Add variables and finalExpression and return the new FHIR Questionnaire
   * @param url Extension URL to use for the expression
   * @param finalExpression
   */
  export(url: string, finalExpression): object {
    // Copy the fhir object, so we can export more than once
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
          url: RuleEditorService.SIMPLE_SYNTAX_EXTENSION,
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
      } else {
        variablesPresentInitially.push(e);
      }
    });

    if (this.syntaxType === 'simple') {
      this.findOrAddExtension(finalExpression.valueExpression.extension, RuleEditorService.SIMPLE_SYNTAX_EXTENSION, 'String', this.simpleExpression);
    }

    if (this.linkIdContext !== undefined && this.linkIdContext !== null && this.linkIdContext !== '') {
      // Treat the final expression as an added variable since it needs to go after the variables added
      this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded.concat(finalExpression));
    } else {
      this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded);
    }

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
   * Given an extension array, find an extension based on the URI and update the
   * value for the type. If one does not exist add it to the extension list
   * @param extension - Extension array
   * @param uri - URI to search for
   * @param type - Type of value
   * @param value - Value
   * @private
   */
  private findOrAddExtension(extension, uri, type, value): void {
    if (extension instanceof Array) {
      const index = extension.findIndex((e) =>  e.url === uri);
      const extensionToAdd = {
        url: uri,
        ['value' + type]: value
      };

      if (index === -1) {
        extension.push(extensionToAdd);
      } else {
        extension[index] = extensionToAdd;
      }
    }
  }

  /**
   * Takes FHIR questionnaire definition and a linkId and returns the FHIR
   * Questionnaire with a calculated expression at the given linkId which sums up
   * all the ordinal values in the questionnaire
   * @param questionnaire - FHIR Questionnaire
   * @param linkId - Question linkId
   */
  addTotalScoreRule(questionnaire, linkId): object {
    this.fhir = questionnaire;
    this.linkIdContext = linkId;
    return this.addSumOfScores();
  }

  /**
   * Get a list of item ids based on the logic for `addSumOfScores()`
   * @param items - Questionnaire items
   * @param linkId - link id of the total score item
   * @return Array of score item link ids
   */
  getScoreItemIds(items, linkId: string): Array<string> {
    let scoreItemIds = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Repeating items are currently not supported
      if (item.repeats) {
        continue;
      }

      if (item.linkId === linkId) {
        // Do not consider items at or below the linkId context required
        break;
      } else if (this.hasRuleEditorExtension(item)) {
        // If the current item is already a score calculation or this is
        // repeating we should not consider it or any items above
        scoreItemIds = [];
      } else if (this.itemHasScore(item)) {
        scoreItemIds.push(item.linkId);
      }

      // Work with nested items
      if (item.item) {
        scoreItemIds = scoreItemIds.concat(
          this.getScoreItemIds(item.item, linkId));
      }
    }
    return scoreItemIds;
  }

  /**
   * Build up the item where condition expressions to be used in the scoring expression. One noticable 
   * difference between items not in a group and items in a group is the generated expression.
   * In the case of items in a group, the where condition starts from the top node item and
   * works its way down the tree to the destination node.
   * An alternative approach is to use "repeat(item).where(linkId = 'xxx')" syntax. However, it may
   * lead to a potential performance impact when searching through a large number of items. 
   * @param items - Questionnaire items
   * @param linkId - link id of the total score item
   * @return Array of link ids where conditions
   */
  composeItemsWhereConditionExpressions(items, linkId: string): Array<string> {
    const expressions = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.linkId === linkId) {
        // Do not consider items at or below the linkId context required
        break;
      } else if (this.itemHasScore(item)) {
        if (this.itemLinkIdsForCalculation && this.itemLinkIdsForCalculation.length > 0 &&
            this.itemLinkIdsForCalculation.includes(item.linkId)) {
          expressions.push(".item.where(linkId = '" + item.linkId + "')");
        }
      }

      if (item.item) {
        const childExpressions = this.composeItemsWhereConditionExpressions(item.item, linkId);
        if (childExpressions.length > 0) {
          childExpressions.forEach((childExpression) => {
            expressions.push(".item.where(linkId = '" + item.linkId + "')" + childExpression);
          });
        }
      }
      // Repeating items are currently not supported
      if (item.repeats) {
        continue;
      }
    }
    return expressions;
  }

  /**
   * Construct scoring expressions for variables to be used in the scoring calculation. The
   * scoring expression is used to retrieve the "score" (valueDecimal) for the given item. 
   * @param items - Questionnaire items
   * @param linkId - link id of the total score item
   * @return Array of scoring expressions 
   */
  composeScoringItemsExpressions(items, linkId: string): Array<string> {
    // Retrieve itmes where expressions
    const itemExpressions = this.composeItemsWhereConditionExpressions(items, linkId);
    const scoreExpressions = itemExpressions.map((e, i) => {
      return `%questionnaire${e}.answerOption` +
        `.where(valueCoding.code=%resource${e}.answer.valueCoding.code).extension` +
        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`;
    });

    return scoreExpressions;
  }

  /**
   * Given the current FHIR questionnaire definition and a linkId return a new FHIR
   * Questionnaire with a calculated expression at the given linkId which sums up
   * all the ordinal values in the questionnaire:
   *  * Assume scored items are above (in question order) the total score item.
   *  * If a preceding item is also a total score item, don’t consider any earlier items.
   */
  addSumOfScores(): any {
    const fhir = this.fhir;
    const linkIdContext = this.linkIdContext;

    const variableNames = [];
    const scoreExpressions = this.composeScoringItemsExpressions(fhir.item, linkIdContext);

    // Get as many short suggested variable names as we have score questions
    scoreExpressions.forEach(() => {
      variableNames.push(this.getNewLabelName(variableNames));
    });

    const scoreQuestions = scoreExpressions.map((e, i) => {
      return {
        url: this.VARIABLE_EXTENSION,
        valueExpression: {
          name: variableNames[i],
          language: this.LANGUAGE_FHIRPATH,
          expression: e,
          extension: [{
            url: RuleEditorService.SCORE_VARIABLE_EXTENSION,
            valueBoolean: true
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
          url: RuleEditorService.SCORE_VARIABLE_EXTENSION,
          valueBoolean: true
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
          url: RuleEditorService.SCORE_EXPRESSION_EXTENSION_LINKIDS,
          valueString: JSON.stringify(this.itemLinkIdsForCalculation)
        }]
      }
    };

    scoreQuestions.push(anyQuestionAnswered);
    // @ts-ignore
    scoreQuestions.push(totalCalculation);

    this.insertExtensions(fhir, fhir.item, linkIdContext, [], scoreQuestions);

    return fhir;
  }

  /**
   * Returns extension that contain a score expression
   * @param extension - array of valueExpression extensions
   * @return score expression extension 
   */
  private getScoreExpressionExtension(extension): any {
    return extension.find((e) =>   
      e.url === RuleEditorService.SCORE_EXPRESSION_EXTENSION_LINKIDS);
  }

  /**
   * Get selected item link ids for scoring calculation
   * @param items - Questionnaire item array
   * @param linkId - link id of the total score item
   * @return Array of selected items link ids or empty array
   */
  private getSelectedLinkIdsForScoring(items, linkId): any {
    let resultLinkIds = [];
    if (linkId === undefined || linkId === null || linkId === '') {
      return resultLinkIds;
    } else {
      // loop through each items to look for matching linkId item.
      for (const item of items) {
        if (item.linkId === linkId) {
          if (item.extension) {
            for (const extension of item.extension) {
              if (extension.valueExpression && extension.valueExpression.extension &&
                extension.valueExpression.extension.length > 0) {
                const tmp = this.getScoreExpressionExtension(extension.valueExpression.extension);
                if (tmp && tmp !== undefined && tmp.hasOwnProperty('valueString')) {
                  resultLinkIds = JSON.parse(tmp.valueString);
                  break;
                }
              }
            };
          }
        // if item contains sub-items
        } else if (item.item) {
          const ext = this.getSelectedLinkIdsForScoring(item.item, linkId);
          if (Array.isArray(ext) && ext.length > 0) {
            resultLinkIds = ext;
            break;
          }
        }
      };

      return resultLinkIds;
    }
  }

  /**
   * Returns linkIds of selected items for scoring calculation
   * @param items - Questionnaire items
   * @param linkId - link id of the total score item
   * @return Array of selected items link ids or empty array
   */
  getSelectedScoringLinkIds(items, linkId: string = this.linkIdContext): any {
    return this.getSelectedLinkIdsForScoring(items, linkId);
  }

  /**
   * Checks if the referenced Questionnaire item is a score calculation added by
   * the Rule Editor
   * @param questionnaire - FHIR Questionnaire
   * @param linkId - Questionnaire item Link ID to check, if not provided check
   * all items on the questionnaire
   * @return True if the question at link id is a score calculation created by
   * the Rule Editor, false otherwise
   */
  isScoreCalculation(questionnaire, linkId?): boolean {
    const checkForScore = (item) => {
      if (linkId === undefined || linkId === item.linkId) {
        const isScore = this.hasRuleEditorExtension(item);
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
   * Validate if the current item has a custom Rule Editor score extension
   * (indicating it was previously modified by the Rule Editor)
   * @param item
   * @return Returns true if the current item has a custom Rule Editor score extension
   * @private
   */
  private hasRuleEditorExtension(item): boolean {
    if (item.extension) {
      return item.extension.find((extension) => !!this.isRuleEditorExtension(extension));
    } else {
      return false;
    }
  }

  /**
   * Updates a FHIR questionnaire score calculation on the item identified by
   * the link id
   * @param questionnaire - FHIR Questionnaire
   * @param linkId - Questionnaire item Link ID to update
   * @return Questionnaire with updated calculation
   */
  updateScoreCalculation(questionnaire, linkId): object {
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
  removeSumOfScores(questionnaire, linkId?): any {
    this.fhir = questionnaire;

    const removeItemScoreVariables = (item) => {
      if (linkId === undefined || linkId === item.linkId) {
        item.extension = item.extension.filter((extension) => !this.isRuleEditorExtension(extension));
      }

      if (item.item) {
        item.item.forEach((subItem) => removeItemScoreVariables(subItem));
      }
    };

    this.fhir.item.forEach(removeItemScoreVariables);

    return this.fhir;
  }

  /**
   * Validate if the extension has an extension for calculating score
   * @param extension - FHIR Extension object
   * @return True if the extension has an extension for calculating score false otherwise
   * @private
   */
  private isRuleEditorExtension(extension): boolean {
    if (extension.valueExpression && extension.valueExpression.extension &&
      extension.valueExpression.extension.length) {
      return !!extension.valueExpression.extension.find(e => e &&
        (e.url === RuleEditorService.SCORE_VARIABLE_EXTENSION ||
          e.url === RuleEditorService.SCORE_EXPRESSION_EXTENSION ||
          e.url === RuleEditorService.SCORE_EXPRESSION_EXTENSION_LINKIDS));
    } else {
      return false;
    }
  }

  private insertExtensions(fhir, items, linkId, variablesPresentInitially, variablesAdded): void {
    if (linkId === undefined || linkId === null || linkId === '') {
      addOrInsertExtensions(fhir);
    } else {
      for (const item of items) {
        if (item.linkId === linkId) {
          addOrInsertExtensions(item);

          break;
        } else if (item.item) {
          this.insertExtensions(fhir, item.item, linkId, variablesPresentInitially, variablesAdded);
        }
      }
    }

    function addOrInsertExtensions(item): void {
      if (item.extension) {
        // Introduce variables present before
        item.extension = item.extension.concat(variablesPresentInitially);
        // Sort by index
        item.extension.sort((a, b) => a.__$index - b.__$index);
        // Add variables added by the user
        item.extension = item.extension.concat(variablesAdded);
      } else {
        item.extension = variablesPresentInitially.concat(variablesAdded);
      }

      // Remove __$index
      item.extension = item.extension.map(({__$index, ...other}) => other);
    }
  }

  /**
   * Get the expression for a question
   * @param linkId - Question linkId
   * @param itemHasScore - Answer has an ordinalValue extension
   * @param convertible - Units can be converted
   * @param unit - Base units
   * @param toUnit - Destination units
   * @return expression
   */
  valueOrScoreExpression(linkId: string, itemHasScore: boolean, convertible: boolean, unit: string, toUnit: string): string {
    if (itemHasScore) {
      return `%questionnaire.item.where(linkId = '${linkId}').answerOption` +
        `.where(valueCoding.code=%resource.item.where(linkId = '${linkId}').answer.valueCoding.code).extension` +
        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`;
    } else if (convertible && unit && toUnit) {
      const factor = UNIT_CONVERSION[unit].find((e) => e.unit === toUnit).factor;
      return `%resource.item.where(linkId='${linkId}').answer.value*${factor}`;
    } else {
      return `%resource.item.where(linkId='${linkId}').answer.value`;
    }
  }

  /**
   * Obtain a list of items containing the ordinal value that can be used for
   * scoring calculation
   * @param items - Questionnaire item array
   * @param linkId - link id of the total score item
   * @return Array of scoring items
   */
  getScoreItems(items, linkId: string = this.linkIdContext ): Array<string> {
    const sItems = copy(items);
    let scoreItems = [];

    for (let i = 0; i < sItems.length; i++) {
      const item = sItems[i];
      // Repeating items are currently not supported
      if (item.repeats) {
        continue;
      }

      if (item.linkId === linkId) {
        // Do not consider items at or below the linkId context required
        break;
      } else if (this.hasRuleEditorExtension(item)) {
        // If the current item is already a score calculation or this is
        // repeating we should not consider it or any items above
        scoreItems = [];
      }

      // Work with nested items
      if (item.item) {
        const childScoreItems = this.getScoreItems(item.item, linkId);
        if (childScoreItems && childScoreItems.length > 0) {
          item.item = childScoreItems;
          const hasScore = this.itemHasScore(item);
          if (item.type === 'choice' ) {
            item['hasScore'] = hasScore;
          } 
          scoreItems.push(item);
        } else {
          item.item = [];
        }
      } else if (this.itemHasScore(item)) {
        item['hasScore'] = true;
        scoreItems.push(item);
      }
    }
    return scoreItems;
  }

  /**
   * Set selected item link ids for Scoring Calculation
   * @param linkIds - array of selected scoring item link ids
   */
  setItemLinkIdsForTotalCalculation(linkIds: string[]): void {
    this.itemLinkIdsForCalculation = linkIds;
  }

  /**
   * Determine whether the expression uri is a calculated expression
   * @param expressionUri - URI of expression extension on linkIdContext question
   *  to extract and modify
   * @return true if the expression is a calculated expression
   */
  isCalculatedExpression(expressionUri: string): boolean {
    return (expressionUri === this.CALCULATED_EXPRESSION);
  }

  /**
   * Determine if the given item has the old total scoring configuration
   * @param item - FHIR Item
   * @return true if the calculated expression is found and does not contain the new 
   * scoring extension
   */ 
  hasOldCalculatedExpressionForItem = (item) => {
    const scoreExtension = item.extension.find((extension) => extension.url === this.CALCULATED_EXPRESSION);
    if (scoreExtension && scoreExtension.valueExpression) {
      const newScoringExpression = (scoreExtension.valueExpression.extension &&
                  scoreExtension.valueExpression.extension.some((ext) => 
                    ext.url === RuleEditorService.SCORE_EXPRESSION_EXTENSION_LINKIDS
                  )
                );
      return !newScoringExpression;
    }

    return false;
  };

  /**
   * Determine if the selected question has predefined scoring items but without
   * new scoring extensions. Without the new scoring extensions, pre-select items
   * cannot be displayed on the tree view properly.  Scoring calculation will insert
   * rather than update.
   * @param questionnaire - FHIR Questionnaire
   * @param linkIdContext - link id of the selected item
   * @return true if the calculated expression does not contain the new scoring extension
   */
  hasOldCalculatedExpression(questionnaire, linkIdContext: string): boolean {
    const retrieveItem = (item) => {
      if (linkIdContext === undefined || linkIdContext === item.linkId) {
        return item;
      }
      if (item.item) {
        const subItem = item.item.find((subItem) => retrieveItem(subItem));
        if (subItem)
          return subItem;
      }
    }
    const item = questionnaire.item.find((item) => retrieveItem(item));

    return (item) ? this.hasOldCalculatedExpressionForItem(item) : false;  
  }

  /**
   * Determine if the selected item contains scoring items
   * @param items - Questionnaire item array
   * @param linkIdContext - link id of the selected item
   * @return true if has scoring items
   */
  hasCalculateScoringItems(items, linkIdContext: string): boolean {
    const scoreItems = this.getScoreItems(items, linkIdContext);
    return (scoreItems.length > 0);
  }

  /**
   * Determine whether the scoring calculation should be prompted/calculated for the selected item.
   * - The selected item expressionUri must be of type calculatedExpression.
   * - The selected item must have scoring items for the calculation. The scoring items are determined
   *   from items prior to the selected item.  So if the first question is selected, then it will not
   *   get a prompt for score calculation.
   * - The selected item must not contain the old implementation of the pre-selected scoring items
   *   (missing the new scoring extension). 
   * @param questionnaire - FHIR Questionnaire
   * @param linkIdContext - link id of the selected item
   * @param expressionUri - Expression to process
   * @return true if the scoring calculation prompt should not be displayed
   */
  shouldCalculateScoreForItem(questionnaire, linkIdContext:string, expressionUri: string): boolean {
    // Should only calculated if the Output Expression is calculatedExpression
    const hasCalculatedOutputExpression = this.isCalculatedExpression(expressionUri);

    let shouldCalculateScore = false;

    if (hasCalculatedOutputExpression)
      if(this.hasCalculateScoringItems(questionnaire.item, linkIdContext))
        if (!this.hasOldCalculatedExpression(questionnaire, linkIdContext))
          shouldCalculateScore = true;

    this.doNotAskToCalculateScore = !shouldCalculateScore;
    return shouldCalculateScore;
  }
}

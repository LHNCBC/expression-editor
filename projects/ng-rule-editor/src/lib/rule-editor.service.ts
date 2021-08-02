import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';

import { Question, UneditableVariable, Variable } from './variable';
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
  syntaxType = 'simple';
  linkIdContext: string;
  uneditableVariablesChange: Subject<UneditableVariable[]> =
    new Subject<UneditableVariable[]>();
  variablesChange: Subject<Variable[]> = new Subject<Variable[]>();
  questionsChange: Subject<Question[]> = new Subject<Question[]>();
  mightBeScoreChange: Subject<boolean> = new Subject<boolean>();
  finalExpressionChange: Subject<string> = new Subject<string>();
  uneditableVariables: UneditableVariable[];
  variables: Variable[];
  questions: Question[];
  finalExpression: string;
  simpleExpression: string;

  private LANGUAGE_FHIRPATH = 'text/fhirpath';
  private QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
  private VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
  private SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
  private SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression';
  private SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';
  private CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';

  private linkIdToQuestion = {};
  private fhir;
  mightBeScore = false;

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
   * Get the list of uneditable variables based on the FHIR Questionnaire
   * @param fhir - FHIR Questionnaire
   */
  getUneditableVariables(fhir): UneditableVariable[] {
    const launchContextExtensionUrl = 'http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext';

    if (Array.isArray(fhir.extension)) {
      return fhir.extension.reduce((accumulator, extension) => {
        if (extension.url === launchContextExtensionUrl && extension.extension) {
          const uneditableVariable = {
            name: extension.extension.find((e) => e.url === 'name').valueId,
            type: extension.extension.filter((e) => e.url === 'type')?.map((e) => e.valueCode).join('|'),
            description: extension.extension.find((e) => e.url === 'description')?.valueString
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
  extractVariables(fhir): Variable[] {
    // Look at the top level fhirpath related extensions to populate the editable variables
    // TODO look at the focus item variables

    if (fhir.extension) {
      const variables = [];
      const nonVariableExtensions = [];

      // Add an index to each extension which we will then use to get the
      // variables back in the correct order. _index will be removed on save
      fhir.extension = fhir.extension.map((e, i) => ({ ...e, _index: i }));

      fhir.extension.forEach((extension) => {
        if (extension.url === this.VARIABLE_EXTENSION &&
          extension.valueExpression && extension.valueExpression.language === this.LANGUAGE_FHIRPATH) {
          variables.push(
            this.processVariable(
              extension.valueExpression.name,
              extension.valueExpression.expression,
              extension._index));
        } else {
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
   * @param fhir - FHIR Questionnaire
   * @param linkIdContext - linkId to exclude from calculation
   * @return number of score questions on the questionnaire
   */
  getScoreQuestionCount(fhir, linkIdContext): number {
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
  import(expressionUri: string, fhir, linkIdContext): void {
    this.linkIdContext = linkIdContext;  // TODO change notification for linkId?
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
        const MAX_Q_LEN = 60;  // Maximum question length before truncating.

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
        } else {
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
    if (expression.extension) {
      const customExtension = expression.extension.find((e) => {
        return e.url === this.SIMPLE_SYNTAX_EXTENSION;
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
      } else if (item.item) {
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
  private processVariable(name, expression, index?: number): Variable {
    const matches = expression.match(this.QUESTION_REGEX);

    if (matches !== null) {
      const linkId = matches[1];
      const factor = matches[2];

      const variable: Variable = {
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
    } else {
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
   * Toggle the mightBeScore
   */
  toggleMightBeScore(): void {
    this.mightBeScore = !this.mightBeScore;
    this.mightBeScoreChange.next(this.mightBeScore);
  }

  /**
   * Add variables and finalExpression and return the new FHIR Questionnaire
   * @param url Extension URL to use for the expression
   * @param finalExpression
   */
  export(url: string, finalExpression: string): object {
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
      } else {
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
    } else {
      fhir.extension = variablesPresentInitially.concat(variablesAdded);
    }

    // Remove _index
    fhir.extension = fhir.extension.map(({_index, ...other}) => other);

    const finalExpressionExtension: any = {
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
  addTotalScoreRule(fhir, linkId): object {
    this.fhir = fhir;
    this.linkIdContext = linkId;
    return this.addSumOfScores();
  }

  /**
   * Given the current FHIR questionnaire definition and a linkId return a new FHIR
   * Questionnaire with a calculated expression at the given linkId which sums up
   * all the ordinal values in the questionnaire
   */
  addSumOfScores(): object {
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
  removeSumOfScores(questionnaire): object {
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
  private isScoreExtension(extension): boolean {
    if (extension.valueExpression && extension.valueExpression.extension &&
      extension.valueExpression.extension.length) {
      return !!extension.valueExpression.extension.find(e => e &&
        (e.url === this.SCORE_VARIABLE_EXTENSION ||
          e.url === this.SCORE_EXPRESSION_EXTENSION));
    } else {
      return false;
    }
  }

  private insertExtensions(items, linkId, extensions): void {
    for (const item of items) {
      if (item.linkId === linkId) {
        if (item.extension) {
          item.extension = item.extension.concat(extensions);
        } else {
          item.extension = extensions;
        }
        break;
      } else if (item.item) {
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
}

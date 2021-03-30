import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as jsToFhirpath from 'js-to-fhirpath';

import { Question, UneditableVariable, Variable } from './variable';
import { UNIT_CONVERSION } from './units';

const LANGUAGE_FHIRPATH = 'text/fhirpath';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
  VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
  CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';

  uneditableVariablesChange: Subject<UneditableVariable[]> =
    new Subject<UneditableVariable[]>();
  variablesChange: Subject<Variable[]> = new Subject<Variable[]>();
  questionsChange: Subject<Question[]> = new Subject<Question[]>();
  mightBeScoreChange: Subject<boolean> = new Subject<boolean>();
  finalExpressionChange: Subject<string> = new Subject<string>();

  syntaxType = 'fhirpath';
  linkIdContext: string;
  uneditableVariables: UneditableVariable[];
  variables: Variable[];
  finalExpression: string;
  questions: Question[];
  linkIdToQuestion = {};
  fhir;
  mightBeScore = false;

  constructor() {
    this.linkIdContext = '';
    this.variables = [];
    this.uneditableVariables = [];

    // Demo data
    // this.import(SAMPLE_Q, CONTEXT_LINKID);
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
   * Change the syntax of the form
   * @param newSyntax - either 'simple' or 'fhirpath'
   */
  setSyntax(newSyntax: string): void {
    this.syntaxType = newSyntax;
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

      fhir.extension.forEach((extension) => {
        if (extension.url === this.VARIABLE_EXTENSION &&
          extension.valueExpression && extension.valueExpression.language === LANGUAGE_FHIRPATH) {
          variables.push(
            this.processVariable(extension.valueExpression.name, extension.valueExpression.expression));
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

  // TODO check if this is already a score calculation
  /**
   * Look at the ordinalValue on the answers of all the questions and if over the threshold
   * percentage of the items have it return true
   * @param fhir - FHIR Questionnaire
   * @param linkIdContext - linkId to exclude from calculation
   */
  isProbablyScore(fhir, linkIdContext): boolean {
    const THRESHOLD = 0.6;  // Percent of questions (minus the one we're editing)
    // which need to be scores to determine we want to sum them up

    let totalQuestions = fhir.item.length;
    let scoreQuestions = 0;

    fhir.item.forEach((item) => {
      if (item.linkId === linkIdContext) {
        totalQuestions--;
      } else if (this.itemHasScore(item)) {
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
  import(fhir, linkIdContext?): void {
    this.linkIdContext = linkIdContext;  // TODO change notification for linkId?
    this.fhir = fhir;

    if (fhir.resourceType === 'Questionnaire' && fhir.item && fhir.item.length) {
      this.mightBeScore = this.isProbablyScore(fhir, linkIdContext);
      this.mightBeScoreChange.next(this.mightBeScore);

      this.uneditableVariables = this.getUneditableVariables(fhir);
      this.uneditableVariablesChange.next(this.uneditableVariables);

      this.variables = this.extractVariables(fhir);
      this.variablesChange.next(this.variables);

      this.linkIdToQuestion = {};
      const linkIdToQuestion = this.linkIdToQuestion;
      processItem(fhir.item, 0);

      function processItem(items, level): void {
        items.forEach((e) => {
          linkIdToQuestion[e.linkId] = e;
          linkIdToQuestion[e.linkId].level = level;
          if (e.item) {
            processItem(e.item, level + 1);
          }
        });
      }

      this.questions = [];

      // tslint:disable-next-line:forin
      for (const key in linkIdToQuestion) {
        if (!linkIdToQuestion.hasOwnProperty(key)) {
          return;
        }
        const e = linkIdToQuestion[key];
        // TODO decimal vs choice
        const MAX_Q_LEN = 60;  // Maximum question length before truncating.

        const text = '-'.repeat(e.level) + e.text;

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
   * Get and remove the final expression
   * @param items
   * @param linkId
   */
  extractFinalExpression(items, linkId): string {
    for (const item of items) {
      if (item.extension) {
        const extensionIndex = item.extension.findIndex((e) => {
          return e.url === this.CALCULATED_EXPRESSION && e.valueExpression.language === LANGUAGE_FHIRPATH &&
            e.valueExpression.expression;
        });

        if (extensionIndex !== -1) {
          const finalExpression = item.extension[extensionIndex].valueExpression.expression;
          item.extension.splice(extensionIndex, 1);

          return finalExpression;
        }
      } else if (item.item) {
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
  private processVariable(name, expression): Variable {
    const matches = expression.match(this.QUESTION_REGEX);

    if (matches !== null) {
      const linkId = matches[1];
      const factor = matches[2];

      const variable: Variable = {
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
   * Convert simple syntax to FHIRPath
   * @param input - Simple syntax
   * @param vars - Variables on the form (editable and uneditable)
   * @private
   */
  private convertExpression(input, vars): string {
    const functions = ['CEILING', 'FLOOR', 'ABS', 'LOG', 'TRUNCATE', 'EXP', 'SQRT', 'LN'];
    return jsToFhirpath.fhirconvert(input, vars, functions);
  }

  /**
   * Add variables and finalExpression and return the new FHIR Questionnaire
   * @param finalExpression
   */
  export(finalExpression: string): object {
    // TODO support for different variable scopes
    // Copy the fhir object so we can export more than once
    // (if we add our data the second export will have duplicates)
    const fhir = JSON.parse(JSON.stringify(this.fhir));

    const variablesToAdd = this.variables.map((e) => {
      return {
        url: this.VARIABLE_EXTENSION,
        valueExpression: {
          name: e.label,
          language: 'text/fhirpath',
          expression: e.expression
        }
      };
    });

    if (fhir.extension) {
      fhir.extension = fhir.extension.concat(variablesToAdd);
    } else {
      fhir.extension = variablesToAdd;
    }

    let finalExpressionData = finalExpression;

    if (this.syntaxType === 'simple') {
      finalExpressionData = this.convertExpression(finalExpression, this.variables.map(e => e.label));
    }

    const finalExpressionExtension = {
      url: this.CALCULATED_EXPRESSION,
      valueExpression: {
        language: 'text/fhirpath',
        expression: finalExpressionData
      }
    };

    this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);

    return fhir;
  }

  /**
   * Given the current FHIR questionnaire definition and a linkId return a new FHIR
   * Questionnaire with a calculated expression at the given linkId which sums up
   * all the ordinal values in the questionnaire
   */
  exportSumOfScores(): object {
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
          language: 'text/fhirpath',
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
        language: 'text/fhirpath',
        expression: variableNames.map((e) => `%${e}.exists()`).join(' or ')
      }
    };

    const sumString = variableNames.map((e) => `iif(%${e}.exists(), %${e}, 0)`).join(' + ');

    const totalCalculation = {
      url: this.CALCULATED_EXPRESSION,
      valueExpression: {
        description: 'Total score calculation',
        language: 'text/fhirpath',
        expression: `iif(%any_questions_answered, ${sumString}, {})`
      }
    };

    scoreQuestions.push(anyQuestionAnswered);
    // @ts-ignore
    scoreQuestions.push(totalCalculation);

    this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);

    return fhir;
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
   * @param isScore - Answer has an ordinalValue extension
   * @param convertible - Units can be converted
   * @param unit - Base units
   * @param toUnit - Destination units
   */
  valueOrScoreExpression(linkId: string, isScore: boolean, convertible: boolean, unit: string, toUnit: string): string {
    if (isScore) {
      return `%questionnaire.item.where(linkId = '${linkId}').answerOption` +
        `.where(valueCoding.code=%resource.item.where(linkId = '${linkId}').answer.valueCoding.code).extension` +
        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value`;
    } else if (convertible && unit && toUnit) {
      const factor = UNIT_CONVERSION[unit].find((e) => e.unit === toUnit).factor;
      return `%resource.item.where(linkId='${linkId}').answer.value*${factor}`;
    } else {
      return `%resource.item.where(linkId='${linkId}').answer.value`;
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Question, UneditableVariable, Variable } from './variable';
import { CONTEXT_LINKID, SAMPLE_Q } from './mock-data.js';
import { UNIT_CONVERSION } from './units';

const LANGUAGE_FHIRPATH = 'text/fhirpath';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  uneditableVariablesChange: Subject<UneditableVariable[]> =
    new Subject<UneditableVariable[]>();
  variablesChange: Subject<Variable[]> = new Subject<Variable[]>();
  questionsChange: Subject<Question[]> = new Subject<Question[]>();
  mightBeScoreChange: Subject<boolean> = new Subject<boolean>();
  finalExpressionChange: Subject<string> = new Subject<string>();

  linkIdContext: string;
  uneditableVariables: UneditableVariable[];
  variables: Variable[];
  finalExpression: string;
  questions: Question[];
  fhir;
  mightBeScore = false;

  constructor() {
    // TODO remove demo data
    this.import(SAMPLE_Q, CONTEXT_LINKID);
  }

  /**
   * Create a new variable
   */
  addVariable(): void {
    this.variables.push({
      label: this.getNewLabelName(),
      type: '',
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

  getUneditableVariables(fhir): UneditableVariable[] {
    if (fhir.extension) {
      return fhir.extension.reduce((accumulator, extension) => {
        if (extension.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext' && extension.extension) {
          const uneditableVariable = {
            name: extension.extension.find((e) => e.url === 'name').valueId,
            type: extension.extension.filter((e) => e.url === 'type').map((e) => e.valueCode).join('|'),
            description: extension.extension.find((e) => e.url === 'descripton').valueString
          };

          accumulator.push(uneditableVariable);
        }
        return accumulator;
      }, []);
    }

    return [];
  }

  getVariables(fhir): Variable[] {
    // Look at the top level fhirpath related extensions to populate the editable variables
    if (fhir.extension) {
      return fhir.extension.reduce((accumulator, extension) => {
        if (extension.url === 'http://hl7.org/fhir/StructureDefinition/variable' &&
          extension.valueExpression && extension.valueExpression.language === LANGUAGE_FHIRPATH) {
          accumulator.push(
            this.processVariable(fhir, extension.valueExpression.name, extension.valueExpression.expression));
        }
        return accumulator;
      }, []);
    }

    return [];
  }

  isItemScore(item): boolean {
    if (typeof item === 'string') {
      item = this.fhir.item.find((e) => e.linkId === item);
    }

    return (item.answerOption || []).some((answerOption) => {
      return (answerOption.extension || []).some((extension) => {
        return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
      });
    });
  }

  // TODO check if this is already a score calculation
  isProbablyScore(fhir, linkIdContext): boolean {
    const THRESHOLD = 0.6;  // Percent of questions (minus the one we're editing)
    // which need to be scores to determine we want to sum them up

    let totalQuestions = fhir.item.length;  // TODO check children too? Not sure how scores would work for that
    let scoreQuestions = 0;

    fhir.item.forEach((item) => {
      if (this.isItemScore(item)) {
        scoreQuestions++;
      }

      if (item.linkId === linkIdContext) {
        totalQuestions--;
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

      this.variables = this.getVariables(fhir);
      this.variablesChange.next(this.variables);

      this.questions = fhir.item.map((e) => {
        // TODO decimal vs choice
        const MAX_Q_LEN = 60;  // Maximum question length before truncating.
        const text = e.text;

        return {
          linkId: e.linkId,
          text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
          unit: this.getQuestionUnits(fhir, e.linkId)
        };
      });
      this.questionsChange.next(this.questions);

      this.finalExpression = this.getFinalExpression(fhir.item, linkIdContext);
      this.finalExpressionChange.next(this.finalExpression);
    }
  }

  // TODO multiple final expressions?
  getFinalExpression(items, linkId): string {
    const CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';

    for (const item of items) {
      if (item.linkId === linkId && item.extension) {
        const extension = item.extension.find((e) => {
          return e.url === CALCULATED_EXPRESSION && e.valueExpression.language === LANGUAGE_FHIRPATH &&
            e.valueExpression.expression;
        });

        return extension.valueExpression.expression;
      } else if (item.item) {
        return this.getFinalExpression(item.item, linkId);
      }
    }

    return '';
  }

  private processVariable(fhir, name, expression): Variable {
    const QUESTION_REGEX = /^%resource\.item\.where\(linkId=\'(.*)\'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;

    const matches = expression.match(QUESTION_REGEX);

    if (matches !== null) {
      // TODO see if we can use capturing groups, not supported in IE but might be transpiled
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
        const sourceUnits = this.getQuestionUnits(fhir, linkId);

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
  // TODO error handling
  private getQuestionUnits(fhir, linkId): string {
    const QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
    const question = fhir.item.find((q) => q.linkId === linkId);

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
   * @private
   */
  private getNewLabelName(): string {
    // Get all the variable names
    const variableNames = this.variables.map((e) => e.label)
      .concat(this.uneditableVariables.map((e) => e.name));

    // All letters which can be used for a simple variable name
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // First pass is with a single character variable name. Other passes are with two
    for (const firstLetter of [''].concat(alphabet)) {
      for (const secondLetter of alphabet) {
        const potentialName = firstLetter + secondLetter;

        const count = variableNames.filter((e) => e === potentialName);

        if (count.length === 0) {
          return potentialName;
        }
      }
    }

    // Don't return a suggested name if we exhausted all combinations
    return '';
  }

  toggleMightBeScore(): void {
    this.mightBeScore = !this.mightBeScore;
    this.mightBeScoreChange.next(this.mightBeScore);
  }
}

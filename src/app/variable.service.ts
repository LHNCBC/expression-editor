import { Injectable } from '@angular/core';
import { Question, Variable } from './variable';
import { UNEDITABLE_VARIABLES, VARIABLES, QUESTIONS } from './mock-data.js';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  uneditableVariables;
  variables: Variable[];
  questions: Question[];

  constructor() {
    this.uneditableVariables = UNEDITABLE_VARIABLES;
    this.variables = VARIABLES;
    this.questions = QUESTIONS;
  }

  /**
   * Get the list of predefined variables
   */
  getUneditableVariables() {
    return this.uneditableVariables;
  }

  /**
   * Get the list of editable variables
   */
  getVariables(): Variable[] {
    return this.variables;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  /**
   * Create a new variable
   */
  addVariable(): void {
    this.variables.push({
      label: this.getNewLabelName(),
      type: ''
    });
  }

  /**
   * Remove a variable
   * @param i - index of variable to remove
   */
  remove(i: number): void {
    this.variables.splice(i, 1);
  }

  /**
   * Generate a label name like A, B, C, ... AA, AB which is not already used
   * @private
   */
  private getNewLabelName(): string {
    // Get all the variable names
    const variableNames = VARIABLES.map((e) => e.label)
      .concat(UNEDITABLE_VARIABLES.map((e) => e.label));

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
}

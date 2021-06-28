import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../variable';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { Unit, UNIT_CONVERSION } from '../units';

@Component({
  selector: 'lhc-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() variable;
  @Input() style: SimpleStyle;
  linkId = '';
  questions: Question[];
  itemHasScore = false;
  isNonConvertibleUnit = false;
  toUnit: string;
  unit: string;
  conversionOptions: Unit[];

  constructor(private variableService: RuleEditorService) {}

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
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
  getQuestion(linkId): Question {
    return this.questions.find((q) => {
      return q.linkId === linkId;
    });
  }

  /**
   * Get the list of units we can convert to based on the starting unit
   * @param unit - Starting unit
   */
  getConversionOptions(unit: string): Unit[] {
    return UNIT_CONVERSION[unit];
  }

  /**
   * Called when the questionnaire question or unit is changed
   * @param isQuestion - The change was for a question
   */
  onChange(isQuestion): void {
    if (isQuestion) {
      // Reset the conversion options when the question changes
      this.toUnit = '';
    }

    // If we already have a question selected (as opposed to the select... prompt)
    if (this.linkId) {
      const question = this.getQuestion(this.linkId);
      this.unit = question?.unit;
      this.conversionOptions = this.getConversionOptions(this.unit);
      this.isNonConvertibleUnit = this.unit && !this.conversionOptions;

      // Check if this is a score
      if (!this.conversionOptions && !this.isNonConvertibleUnit) {
        this.itemHasScore = this.variableService.itemHasScore(this.linkId);
      } else {
        this.itemHasScore = false;
      }

      this.variable.expression = this.variableService.valueOrScoreExpression(
        this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
    }
  }
}

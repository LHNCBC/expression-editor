import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../variable';
import { VariableService } from '../variable.service';
import { Unit, UNIT_CONVERSION } from '../units';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  @Input() variable;
  @Input() advancedInterface;
  linkId = '';
  questions: Question[];
  isScore = false;
  isNonConvertibleUnit = false;
  toUnit: string;
  unit: string;
  conversionOptions: Unit[];

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.linkId = this.variable.linkId ? this.variable.linkId : '';
    this.toUnit = this.variable.unit ? this.variable.unit : '';
    this.questions = this.variableService.questions;

    this.onChange(false);

    this.variableService.questionsChange.subscribe((questions) => {
      this.questions = questions;
    });
  }

  getQuestion(linkId): Question {
    return this.questions.find((q) => {
      return q.linkId === linkId;
    });
  }

  getConversionOptions(units: string): Unit[] {
    return UNIT_CONVERSION[units];
  }

  onChange(isQuestion): void {
    if (isQuestion) {
      // Reset the conversion options when the question changes
      this.toUnit = '';
    }

    if (this.linkId) {
      const question = this.getQuestion(this.linkId);
      this.unit = question?.unit;
      this.conversionOptions = this.getConversionOptions(this.unit);
      this.isNonConvertibleUnit = this.unit && !this.conversionOptions;

      // Check if this is a score
      if (!this.conversionOptions && !this.isNonConvertibleUnit) {
        this.isScore = this.variableService.isItemScore(this.linkId);
      } else {
        this.isScore = false;
      }

      this.variable.expression = this.variableService.calculateExpression(
        this.linkId, this.isScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
    }
  }
}

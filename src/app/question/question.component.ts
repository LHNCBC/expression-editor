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

  // TODO check question group behavior
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

      this.variable.expression = this.calculateExpression(this.linkId, this.isScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
    }
  }

  // TODO move to service
  calculateExpression(linkId: string, isScore: boolean, convertible: boolean, unit: string, toUnit: string): string {
    if (isScore) {
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

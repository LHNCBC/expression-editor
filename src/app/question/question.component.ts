import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../variable';
import { VariableService } from '../variable.service';
import { Unit, UNIT_CONVERSION } from '../units';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() variable;
  @Output() expression = new EventEmitter<string>();
  linkId = '';  // TODO we can probably make this the initial value only and remove two way data binding
  questions: Question[];
  isScore = false;  // TODO
  isNonConvertibleUnit = false;
  toUnit: string;
  unit: string;
  conversionOptions: Unit[];

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.linkId = this.variable.linkId ? this.variable.linkId : '';
    this.toUnit = this.variable.unit ? this.variable.unit : '';
    this.questions = this.variableService.questions;

    this.onQuestionChange();
    this.variableService.questionsChange.subscribe((questions) => {
      this.questions = questions;
    });
  }

  // TODO check question group behavior
  getQuestionUnit(linkId): string {
    const currentQuestion = this.questions.find((q) => {
      return q.linkId === linkId;
    });

    if (currentQuestion) {
      return currentQuestion.unit;
    } else {
      return null;
    }
  }

  getConversionOptions(units: string): Unit[] {
    return UNIT_CONVERSION[units];
  }

  onQuestionChange(): void {
    this.unit = this.getQuestionUnit(this.linkId);
    this.conversionOptions = this.getConversionOptions(this.unit);
    this.isNonConvertibleUnit = this.unit && !this.conversionOptions;

    // Check if this is a score
    if (!this.conversionOptions && !this.isNonConvertibleUnit) {
      // TODO
    } else {
      this.isScore = false;
    }
  }
}

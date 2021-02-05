import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../variable';
import { VariableService } from '../variable.service';

// Conversion table for simple units
const UNIT_CONVERSION = {
  kg: [{ unit: 'lbs', factor: 2.20462 }],
  lbs: [{ unit: 'kg', factor: 0.453592 }],
  '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
};

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() questionId: string;
  questions: Question[];

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questions = this.variableService.getQuestions();
  }

  canConvertUnits(units: string): boolean {
    return UNIT_CONVERSION.hasOwnProperty(units);
  }
}

import { Component } from '@angular/core';
import { RuleEditorService } from 'ng-rule-editor';
import { context, fhir } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  finalExpression: string;
  questionnaire = '';

  constructor(private ruleEditorService: RuleEditorService) { }

  onChange(): void {
    if (this.questionnaire !== '') {
      this.ruleEditorService.import(fhir[this.questionnaire], context);
    }
  }

  getFinalExpression(): void {
    this.finalExpression = this.ruleEditorService.finalExpression;
  }
}

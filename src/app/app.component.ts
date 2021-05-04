import { Component } from '@angular/core';
import { RuleEditorService } from 'ng-rule-editor';
import { context, fhir } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fhirPreview: string;
  questionnaire = '';
  score = false;

  constructor(private ruleEditorService: RuleEditorService) { }

  onChange(): void {
    this.fhirPreview = '';

    if (this.questionnaire !== '') {
      this.ruleEditorService.import(fhir[this.questionnaire], context);

      this.score = this.ruleEditorService.mightBeScore;
    }
  }

  showFhir(): void {
    const fhirOutput = this.score ? this.ruleEditorService.exportSumOfScores() :
      this.ruleEditorService.export(this.ruleEditorService.finalExpression);

    this.fhirPreview = JSON.stringify(fhirOutput, null, 2);
  }
}

// TODO if no simple expression for final expression show fhirpath

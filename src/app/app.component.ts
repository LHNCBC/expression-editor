import { Component } from '@angular/core';
import { RuleEditorService } from 'ng-rule-editor';
import { phq9ScoreLinkId, fhir } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fhirPreview: string;
  questionnaire = '';
  fhir = fhir;
  phq9ScoreLinkId = phq9ScoreLinkId;

  constructor(private ruleEditorService: RuleEditorService) { }
s
  onChange(): void {
    this.fhirPreview = '';
  }

  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }

  addTotalScoreRule(): void {
    const result = this.ruleEditorService.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId);
  }
}

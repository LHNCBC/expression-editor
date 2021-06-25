import { Component } from '@angular/core';
import { RuleEditorService } from 'ng-rule-editor';
import { linkId, fhir } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fhirPreview: string;
  questionnaire = '';
  fhir = fhir;
  linkId = linkId;

  constructor(private ruleEditorService: RuleEditorService) { }

  onChange(): void {
    this.fhirPreview = '';
  }

  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }

  addTotalScoreRule(): void {
    const result = this.ruleEditorService.addTotalScoreRule(fhir.phq9, linkId);
  }
}

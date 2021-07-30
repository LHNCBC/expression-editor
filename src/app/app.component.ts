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
  questionnaire = 'bmi';
  fhir = fhir;
  linkId = phq9ScoreLinkId;
  phq9ScoreLinkId = phq9ScoreLinkId;

  constructor(private ruleEditorService: RuleEditorService) { }
  onChange(): void {
    this.fhirPreview = '';
  }

  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }
}

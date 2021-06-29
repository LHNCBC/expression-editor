import { Component } from '@angular/core';
import { context, fhir } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fhirPreview: string;
  questionnaire = 'bmisimple';
  fhir = fhir;
  linkId = context;

  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calculatedExpression = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
  originalLinkId = '/39156-5';

  fhirPreview: string;
  linkId = this.originalLinkId;
  expressionUri = this.calculatedExpression;
  fhir = null;
  formType = 'bmisimple';
  file = '';
  error = '';

  constructor(private http: HttpClient, private liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.onChange();
  }

  /**
   * Used when changing the questionnaire dropdown
   */
  onChange(): void {
    // Clear out preview when changing forms
    this.fhirPreview = '';
    this.error = '';

    if (this.formType === '' || this.formType === 'upload') {
      this.liveAnnouncer.announce('Additional settings must be entered below to load the rule editor.');
      this.fhir = null;
      this.file = '';
      this.linkId = '';
    } else {
      this.liveAnnouncer.announce('The rule editor for the selected form has appeared below the current field.');
      this.linkId = this.originalLinkId;
      this.expressionUri = this.calculatedExpression;

      this.http.get(`./${this.formType}.json`)
        .subscribe(data => {
          this.fhir = data;
        });
    }
  }

  /**
   * Show a preview of the output questionnaire under the rule editor
   */
  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }

  /**
   * Import a questionnaire from a file using the linkId and expression URI
   * @param fileInput - input file change event
   */
  import(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        if (typeof e.target.result === 'string') {
          try {
            this.fhir = JSON.parse(e.target.result);
            this.error = '';
          } catch (e) {
            this.error = `Could not parse file ${e}`;
          }
        } else {
          this.error = 'Could not read file';
        }
      };

      fileReader.readAsText(fileInput.target.files[0]);
    }
  }

  /**
   * Trigger a file download of the provided data.
   * @param data - Content of the file which will be downloaded
   * @param name - Name the user sees for the file
   */
  downloadJson(data: string, name?: string): void {
    const datePipe = new DatePipe('en-US');
    const blob = new Blob([data]);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');

    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = name ? `${name}.json` : `fhirpath-${date}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fhirPreview: string;
  linkId = '/39156-5';
  fhir = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onChange({target: {value: 'bmisimple'}});
  }

  onChange(event): void {
    // Clear out preview when changing forms
    this.fhirPreview = '';

    if (event.target.value === '') {
      this.fhir = null;
    } else {
      this.http.get(`/${event.target.value}.json`)
        .subscribe(data => {
          this.fhir = data;
        });
    }
  }

  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
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

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}

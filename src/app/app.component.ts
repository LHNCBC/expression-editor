import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';
import { VariableService } from './variable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FHIRPath Editor';
  environment = environment;
  showFhirPath = false;
  finalExpression: string;
  datePipe = new DatePipe('en-US');
  linkIdContext: string;
  private finalExpressionSubscription;
  private calculateSumSubscription;
  advancedInterface = false;
  calculateSum: boolean;

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.calculateSum = this.variableService.mightBeScore;
    this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
      this.calculateSum = mightBeScore;
    });
    this.linkIdContext = this.variableService.linkIdContext;
    this.finalExpression = this.variableService.finalExpression;
    this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
      this.finalExpression = finalExpression;
    });
  }

  ngDestroy(): void {
    this.finalExpressionSubscription.unsubscribe();
  }

  import(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        if (typeof e.target.result === 'string') {
          try {
            const input = JSON.parse(e.target.result);

            this.variableService.import(input, this.linkIdContext);
          } catch (e) {
            console.error('Could not parse file', e);
          }
        } else {
          console.error('Could not read file');
        }
      };

      fileReader.readAsText(fileInput.target.files[0]);
    }
    fileInput.target.value = '';
  }

  export(): void {
    const blob = new Blob([
      JSON.stringify(this.variableService.export(this.finalExpression), null, 2)
    ]);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = this.datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');

    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = `fhirpath-${date}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}


import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { RuleEditorService } from './rule-editor.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lhc-rule-editor',
  templateUrl: 'rule-editor.component.html',
  styleUrls: ['rule-editor.component.css']
})
export class RuleEditorComponent implements OnChanges {
  @Input() fhirQuestionnaire = null;
  @Input() itemLinkId = null;
  @Input() submitButtonName = 'Submit';
  @Input() titleName: string;
  @Output() save = new EventEmitter<object>();

  expressionSyntax: string;
  advancedInterface = true;
  finalExpression: string;
  finalExpressionFhirPath: string;
  linkIdContext: string;
  datePipe = new DatePipe('en-US');
  calculateSum: boolean;
  suggestions = [];
  variables: string[];

  private calculateSumSubscription;
  private finalExpressionSubscription;
  private variablesSubscription;

  constructor(private variableService: RuleEditorService) {}

  /**
   * Angular lifecycle hook called before the component is destroyed
   */
  ngDestroy(): void {
    this.calculateSumSubscription.unsubscribe();
    this.finalExpressionSubscription.unsubscribe();
    this.variablesSubscription.unsubscribe();
  }

  /**
   * Angular lifecycle hook called on input changes
   */
  ngOnChanges(): void {
    this.reload();
  }

  /**
   * Re-import fhir and context and show the form
   */
  reload(): void {
    if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
      this.variableService.import(this.fhirQuestionnaire, this.itemLinkId);
    }

    this.linkIdContext = this.variableService.linkIdContext;
    this.expressionSyntax = this.variableService.syntaxType;
    this.calculateSum = this.variableService.mightBeScore;
    this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
      this.calculateSum = mightBeScore;
    });
    this.finalExpression = this.variableService.finalExpression;
    this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
      this.finalExpression = finalExpression;
    });
    this.variables = this.variableService.variables.map(e => e.label);
    this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
      this.variables = variables.map(e => e.label);
    });
  }

  /**
   * Import uploaded data as a FHIR Questionnaire
   * @param fileInput - Form file upload
   */
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

  /**
   * Export FHIR Questionnaire and download as a file
   */
  export(): void {
    this.save.emit(this.variableService.export(this.finalExpression));
  }

  /**
   * Export FHIR questionnaire file by summing all ordinal values
   */
  exportSumOfScores(): void {
    this.save.emit(this.variableService.exportSumOfScores());
  }

  /**
   * Download data as a file
   * @param data - Object which will this function will call JSON.stringify on
   * @param fileName - File name to download as
   * @private
   */
  private downloadAsFile(data, fileName?): void {
    const blob = new Blob([
      JSON.stringify(data, null, 2)
    ]);

    const date = this.datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');

    fileName = fileName ? fileName : `fhirpath-${date}.json`;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  }

  /**
   * Called when the syntax type is changed to clean up expressions if the data cannot be converted
   * @param $event - event from from the caller
   */
  onSyntaxChange($event: MatRadioChange): void {
    const newSyntax = $event.value;

    // Clear the existing expression if switching away from fhirpath
    if (newSyntax === 'simple') {
      this.finalExpression = '';
    }

    this.variableService.syntaxType = newSyntax;
  }

  /**
   * Update the final expression
   * @param expression
   */
  updateFinalExpression(expression): void {
    this.finalExpression = expression;
  }
}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { RuleEditorService, SimpleStyle } from './rule-editor.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'lhc-rule-editor',
  templateUrl: 'rule-editor.component.html',
  styleUrls: ['rule-editor.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RuleEditorComponent implements OnChanges {
  @Input() fhirQuestionnaire = null;
  @Input() itemLinkId = null;
  @Input() submitButtonName = 'Submit';
  @Input() titleName = 'Rule Editor';
  @Input() expressionLabel = 'Final Expression';
  @Input() expressionUrl = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
  @Input() style: SimpleStyle = {};
  @Output() save = new EventEmitter<object>();

  expressionSyntax: string;
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
  ngOnChanges(args): void {
    this.reload();
  }

  /**
   * Re-import fhir and context and show the form
   */
  reload(): void {
    if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
      this.variableService.import(this.expressionUrl, this.fhirQuestionnaire, this.itemLinkId);
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
   * Export FHIR Questionnaire and download as a file
   */
  export(): void {
    this.save.emit(this.variableService.export(this.expressionUrl, this.finalExpression));
  }

  /**
   * Export FHIR questionnaire file by summing all ordinal values
   */
  exportSumOfScores(): void {
    this.save.emit(this.variableService.exportSumOfScores());
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

import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-syntax-converter',
  templateUrl: './syntax-converter.component.html',
  styleUrls: ['../rule-editor.component.css', './syntax-converter.component.css']
})
export class SyntaxConverterComponent implements OnChanges {
  @Input() simple: string;
  @Input() variables;
  @Input() index;
  @Input() lhcStyle: SimpleStyle = {};
  @Input() variableName: string;

  @Input() validateInput = false;

  @Output() simpleChange = new EventEmitter<string>();
  @Output() expressionChange = new EventEmitter<string>();
 
  @ViewChild('exp') exp;

  fhirPathExpression: string;
  jsToFhirPathPipe = new EasyPathExpressionsPipe();

  hasError = false;

  constructor(private ruleEditorService: RuleEditorService) {}

  ngOnChanges(changes): void {
    // This function is getting called repeatedly even if there is no changes. Adding the if block
    // to discard some of the events.
    // The changes.simple fires when there is a change to the Easy Path Expression expression.
    // The changes.variables fires when a variable is deleted. 
    if (changes.simple || (changes.variables &&
        JSON.stringify(changes.variables.previousValue) !== JSON.stringify(changes.variables.currentValue))) {
      this.onExpressionChange(this.simple);
    }
  }

  onExpressionChange(simple): void {
    const fhirPath: string = (simple) ? this.jsToFhirPathPipe.transform(simple, this.variables) : "";
    this.fhirPathExpression = fhirPath;

    this.hasError = false;
    if (fhirPath === 'Not valid')
      this.hasError = true;

    this.simpleChange.emit(simple);
    this.expressionChange.emit(fhirPath);

    const section = (this.variableName) ? RuleEditorService.ITEM_VARIABLES_SECTION : RuleEditorService.OUTPUT_EXPRESSION_SECTION;
    const errorFieldName = (this.variableName) ? this.variableName : "output expression";

    if (this.hasError) { 
      const param = {
        "section" : (this.index === 'final') ? RuleEditorService.OUTPUT_EXPRESSION_SECTION : RuleEditorService.ITEM_VARIABLES_SECTION,
        "field": "expression",
        "id" : "simple",
        "name" : this.variableName,
        "index" : this.index
      }
      const result = {
        "invalidExpressionError": true,
        "message": "Invalid expression",
        "ariaMessage": "The expression is not a valid expression"
      };

      setTimeout(() => {
        this.exp.control.setErrors(result);
        this.ruleEditorService.notifyValidationResult(param, result);
      }, 10);

    }
  }
}

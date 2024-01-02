import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
  @Output() simpleChange = new EventEmitter<string>();
  @Output() expressionChange = new EventEmitter<string>();
 
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
    if (fhirPath === 'Not valid' && !this.hasError)
      this.hasError = true;

    this.simpleChange.emit(simple);
    this.expressionChange.emit(fhirPath);

    this.ruleEditorService.notifyValidationResult((this.hasError) ? 'expression' : null );
  }
}

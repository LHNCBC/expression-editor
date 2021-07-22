import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';
import { SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-syntax-converter',
  templateUrl: './syntax-converter.component.html',
  styleUrls: ['./syntax-converter.component.css']
})
export class SyntaxConverterComponent implements OnChanges {
  @Input() expression: string;
  @Input() variables;
  @Input() lhcStyle: SimpleStyle = {};
  @Output() expressionChange = new EventEmitter<string>();

  fhirPathExpression: string;
  jsToFhirPathPipe = new MathToFhirpathPipe();

  constructor() { }

  ngOnChanges(): void {
    if (this.expression !== '') {
      this.onExpressionChange(this.expression);
    }
  }

  onExpressionChange(value): void {
    const fhirPath: string = this.jsToFhirPathPipe.transform(value, this.variables);
    this.fhirPathExpression = fhirPath;

    this.expressionChange.emit(fhirPath);
  }

}

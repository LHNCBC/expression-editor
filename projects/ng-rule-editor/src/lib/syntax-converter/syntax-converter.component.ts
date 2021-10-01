import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EasyPathExpressionsPipe } from '../math-to-fhirpath.pipe';
import { SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-syntax-converter',
  templateUrl: './syntax-converter.component.html',
  styleUrls: ['./syntax-converter.component.css']
})
export class SyntaxConverterComponent implements OnChanges {
  @Input() simple: string;
  @Input() variables;
  @Input() lhcStyle: SimpleStyle = {};
  @Output() simpleChange = new EventEmitter<string>();
  @Output() expressionChange = new EventEmitter<string>();

  fhirPathExpression: string;
  jsToFhirPathPipe = new EasyPathExpressionsPipe();

  constructor() { }

  ngOnChanges(): void {
    this.onExpressionChange(this.simple);
  }

  onExpressionChange(simple): void {
    const fhirPath: string = this.jsToFhirPathPipe.transform(simple, this.variables);
    this.fhirPathExpression = fhirPath;

    this.simpleChange.emit(simple);
    this.expressionChange.emit(fhirPath);
  }
}

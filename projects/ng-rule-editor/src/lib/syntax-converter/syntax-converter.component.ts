import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';
import { SimpleStyle } from '../rule-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-syntax-converter',
  templateUrl: './syntax-converter.component.html',
  styleUrls: ['./syntax-converter.component.css']
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

  constructor(private liveAnnouncer: LiveAnnouncer) {}
  
  showHelp = false;

  ngOnChanges(): void {
    this.onExpressionChange(this.simple);
  }

  onExpressionChange(simple): void {
    const fhirPath: string = this.jsToFhirPathPipe.transform(simple, this.variables);
    this.fhirPathExpression = fhirPath;

    this.simpleChange.emit(simple);
    this.expressionChange.emit(fhirPath);
  }

  openHelp(): void {
    this.liveAnnouncer.announce("Open Easy Path Expression help modal dialog. Easy Path Expression is a syntax parser that converts basic mathematical expressions into FHIRPath notation.  This dialog is divided into three sections: Available variables, Usable Operators, and Usable Functions.  Use tab to navigate between each sections."); 
    this.showHelp = true;
  }

  closeHelp(): void {
    this.showHelp = false;
  } 
}

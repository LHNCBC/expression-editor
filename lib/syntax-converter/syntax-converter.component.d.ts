import { EventEmitter, OnChanges } from '@angular/core';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';
import { SimpleStyle } from '../rule-editor.service';
export declare class SyntaxConverterComponent implements OnChanges {
    expression: string;
    variables: any;
    lhcStyle: SimpleStyle;
    expressionChange: EventEmitter<string>;
    fhirPathExpression: string;
    jsToFhirPathPipe: MathToFhirpathPipe;
    constructor();
    ngOnChanges(): void;
    onExpressionChange(value: any): void;
}

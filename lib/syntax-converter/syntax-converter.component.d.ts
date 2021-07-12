import { OnInit, EventEmitter } from '@angular/core';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';
export declare class SyntaxConverterComponent implements OnInit {
    value: any;
    variables: any;
    expressionChange: EventEmitter<string>;
    expression: string;
    fhirPathExpression: string;
    jsToFhirPathPipe: MathToFhirpathPipe;
    constructor();
    ngOnInit(): void;
    onExpressionChange(value: any): void;
}

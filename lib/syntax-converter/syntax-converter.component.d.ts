import { EventEmitter, OnChanges } from '@angular/core';
import { EasyPathExpressionsPipe } from '../math-to-fhirpath.pipe';
import { SimpleStyle } from '../rule-editor.service';
import * as ɵngcc0 from '@angular/core';
export declare class SyntaxConverterComponent implements OnChanges {
    simple: string;
    variables: any;
    lhcStyle: SimpleStyle;
    simpleChange: EventEmitter<string>;
    expressionChange: EventEmitter<string>;
    fhirPathExpression: string;
    jsToFhirPathPipe: EasyPathExpressionsPipe;
    constructor();
    ngOnChanges(): void;
    onExpressionChange(simple: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SyntaxConverterComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SyntaxConverterComponent, "lhc-syntax-converter", never, { "lhcStyle": "lhcStyle"; "simple": "simple"; "variables": "variables"; }, { "simpleChange": "simpleChange"; "expressionChange": "expressionChange"; }, never, never>;
}

//# sourceMappingURL=syntax-converter.component.d.ts.map
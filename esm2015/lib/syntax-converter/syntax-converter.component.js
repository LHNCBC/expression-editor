import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EasyPathExpressionsPipe } from '../math-to-fhirpath.pipe';
export class SyntaxConverterComponent {
    constructor() {
        this.lhcStyle = {};
        this.simpleChange = new EventEmitter();
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new EasyPathExpressionsPipe();
    }
    ngOnChanges() {
        this.onExpressionChange(this.simple);
    }
    onExpressionChange(simple) {
        const fhirPath = this.jsToFhirPathPipe.transform(simple, this.variables);
        this.fhirPathExpression = fhirPath;
        this.simpleChange.emit(simple);
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"simple\" (ngModelChange)=\"onExpressionChange($event)\" class=\"simple-expression\"\n       aria-label=\"Easy Path Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    simple: [{ type: Input }],
    variables: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    simpleChange: [{ type: Output }],
    expressionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ydWxlLWVkaXRvci9zcmMvbGliL3N5bnRheC1jb252ZXJ0ZXIvc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVFuRSxNQUFNLE9BQU8sd0JBQXdCO0lBVW5DO1FBUFMsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHeEQscUJBQWdCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0lBRWpDLENBQUM7SUFFakIsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQU07UUFDdkIsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFFbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLDJRQUFnRDs7YUFFakQ7Ozs7cUJBRUUsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsTUFBTTsrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUgfSBmcm9tICcuLi9tYXRoLXRvLWZoaXJwYXRoLnBpcGUnO1xuaW1wb3J0IHsgU2ltcGxlU3R5bGUgfSBmcm9tICcuLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLXN5bnRheC1jb252ZXJ0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N5bnRheC1jb252ZXJ0ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFN5bnRheENvbnZlcnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHNpbXBsZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YXJpYWJsZXM7XG4gIEBJbnB1dCgpIGxoY1N0eWxlOiBTaW1wbGVTdHlsZSA9IHt9O1xuICBAT3V0cHV0KCkgc2ltcGxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBleHByZXNzaW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZmhpclBhdGhFeHByZXNzaW9uOiBzdHJpbmc7XG4gIGpzVG9GaGlyUGF0aFBpcGUgPSBuZXcgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMub25FeHByZXNzaW9uQ2hhbmdlKHRoaXMuc2ltcGxlKTtcbiAgfVxuXG4gIG9uRXhwcmVzc2lvbkNoYW5nZShzaW1wbGUpOiB2b2lkIHtcbiAgICBjb25zdCBmaGlyUGF0aDogc3RyaW5nID0gdGhpcy5qc1RvRmhpclBhdGhQaXBlLnRyYW5zZm9ybShzaW1wbGUsIHRoaXMudmFyaWFibGVzKTtcbiAgICB0aGlzLmZoaXJQYXRoRXhwcmVzc2lvbiA9IGZoaXJQYXRoO1xuXG4gICAgdGhpcy5zaW1wbGVDaGFuZ2UuZW1pdChzaW1wbGUpO1xuICAgIHRoaXMuZXhwcmVzc2lvbkNoYW5nZS5lbWl0KGZoaXJQYXRoKTtcbiAgfVxufVxuIl19
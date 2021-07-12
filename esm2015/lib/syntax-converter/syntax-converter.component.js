import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';
export class SyntaxConverterComponent {
    constructor() {
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new MathToFhirpathPipe();
    }
    ngOnInit() { }
    onExpressionChange(value) {
        const fhirPath = this.jsToFhirPathPipe.transform(value, this.variables);
        this.fhirPathExpression = fhirPath;
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"expression\" (ngModelChange)=\"onExpressionChange($event)\"\n       class=\"form-control mr-2 w-100\" id=\"simple-expression\" aria-label=\"Simple Expression\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\" [showWhenEmpty]=\"true\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    value: [{ type: Input }],
    variables: [{ type: Input }],
    expressionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ydWxlLWVkaXRvci9zcmMvbGliL3N5bnRheC1jb252ZXJ0ZXIvc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU85RCxNQUFNLE9BQU8sd0JBQXdCO0lBU25DO1FBTlUscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUl4RCxxQkFBZ0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUVqQixRQUFRLEtBQVcsQ0FBQztJQUVwQixrQkFBa0IsQ0FBQyxLQUFLO1FBQ3RCLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1FBRW5DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyx5U0FBZ0Q7O2FBRWpEOzs7O29CQUVFLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0aFRvRmhpcnBhdGhQaXBlIH0gZnJvbSAnLi4vbWF0aC10by1maGlycGF0aC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLXN5bnRheC1jb252ZXJ0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N5bnRheC1jb252ZXJ0ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFN5bnRheENvbnZlcnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHZhbHVlO1xuICBASW5wdXQoKSB2YXJpYWJsZXM7XG4gIEBPdXRwdXQoKSBleHByZXNzaW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZXhwcmVzc2lvbjogc3RyaW5nO1xuICBmaGlyUGF0aEV4cHJlc3Npb246IHN0cmluZztcbiAganNUb0ZoaXJQYXRoUGlwZSA9IG5ldyBNYXRoVG9GaGlycGF0aFBpcGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQgeyB9XG5cbiAgb25FeHByZXNzaW9uQ2hhbmdlKHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgZmhpclBhdGg6IHN0cmluZyA9IHRoaXMuanNUb0ZoaXJQYXRoUGlwZS50cmFuc2Zvcm0odmFsdWUsIHRoaXMudmFyaWFibGVzKTtcbiAgICB0aGlzLmZoaXJQYXRoRXhwcmVzc2lvbiA9IGZoaXJQYXRoO1xuXG4gICAgdGhpcy5leHByZXNzaW9uQ2hhbmdlLmVtaXQoZmhpclBhdGgpO1xuICB9XG5cbn1cbiJdfQ==
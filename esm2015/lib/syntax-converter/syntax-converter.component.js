import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';
export class SyntaxConverterComponent {
    constructor() {
        this.lhcStyle = {};
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new MathToFhirpathPipe();
    }
    ngOnChanges() {
        if (this.expression !== '') {
            this.onExpressionChange(this.expression);
        }
    }
    onExpressionChange(value) {
        const fhirPath = this.jsToFhirPathPipe.transform(value, this.variables);
        this.fhirPathExpression = fhirPath;
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"expression\" (ngModelChange)=\"onExpressionChange($event)\" id=\"simple-expression\"\n       aria-label=\"Simple Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    expression: [{ type: Input }],
    variables: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    expressionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ydWxlLWVkaXRvci9zcmMvbGliL3N5bnRheC1jb252ZXJ0ZXIvc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVE5RCxNQUFNLE9BQU8sd0JBQXdCO0lBU25DO1FBTlMsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUd4RCxxQkFBZ0IsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFFNUIsQ0FBQztJQUVqQixXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQUs7UUFDdEIsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFFbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLHlRQUFnRDs7YUFFakQ7Ozs7eUJBRUUsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGhUb0ZoaXJwYXRoUGlwZSB9IGZyb20gJy4uL21hdGgtdG8tZmhpcnBhdGgucGlwZSc7XG5pbXBvcnQgeyBTaW1wbGVTdHlsZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtc3ludGF4LWNvbnZlcnRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zeW50YXgtY29udmVydGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3ludGF4Q29udmVydGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwcmVzc2lvbjogc3RyaW5nO1xuICBASW5wdXQoKSB2YXJpYWJsZXM7XG4gIEBJbnB1dCgpIGxoY1N0eWxlOiBTaW1wbGVTdHlsZSA9IHt9O1xuICBAT3V0cHV0KCkgZXhwcmVzc2lvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGZoaXJQYXRoRXhwcmVzc2lvbjogc3RyaW5nO1xuICBqc1RvRmhpclBhdGhQaXBlID0gbmV3IE1hdGhUb0ZoaXJwYXRoUGlwZSgpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbiAhPT0gJycpIHtcbiAgICAgIHRoaXMub25FeHByZXNzaW9uQ2hhbmdlKHRoaXMuZXhwcmVzc2lvbik7XG4gICAgfVxuICB9XG5cbiAgb25FeHByZXNzaW9uQ2hhbmdlKHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgZmhpclBhdGg6IHN0cmluZyA9IHRoaXMuanNUb0ZoaXJQYXRoUGlwZS50cmFuc2Zvcm0odmFsdWUsIHRoaXMudmFyaWFibGVzKTtcbiAgICB0aGlzLmZoaXJQYXRoRXhwcmVzc2lvbiA9IGZoaXJQYXRoO1xuXG4gICAgdGhpcy5leHByZXNzaW9uQ2hhbmdlLmVtaXQoZmhpclBhdGgpO1xuICB9XG5cbn1cbiJdfQ==
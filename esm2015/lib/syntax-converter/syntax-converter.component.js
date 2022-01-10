import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ydWxlLWVkaXRvci9zcmMvbGliL3N5bnRheC1jb252ZXJ0ZXIvc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQVF4RSxNQUFNLE9BQU8sd0JBQXdCO0lBVW5DO1FBUFMsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHeEQscUJBQWdCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0lBRWpDLENBQUM7SUFFakIsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQU07UUFDdkIsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFFbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLDJRQUFnRDs7YUFFakQ7Ozs7cUJBRUUsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsTUFBTTsrQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUgfSBmcm9tICcuLi9lYXN5LXBhdGgtZXhwcmVzc2lvbnMucGlwZSc7XG5pbXBvcnQgeyBTaW1wbGVTdHlsZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtc3ludGF4LWNvbnZlcnRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zeW50YXgtY29udmVydGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3ludGF4LWNvbnZlcnRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3ludGF4Q29udmVydGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgc2ltcGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhcmlhYmxlcztcbiAgQElucHV0KCkgbGhjU3R5bGU6IFNpbXBsZVN0eWxlID0ge307XG4gIEBPdXRwdXQoKSBzaW1wbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGV4cHJlc3Npb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBmaGlyUGF0aEV4cHJlc3Npb246IHN0cmluZztcbiAganNUb0ZoaXJQYXRoUGlwZSA9IG5ldyBFYXN5UGF0aEV4cHJlc3Npb25zUGlwZSgpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5vbkV4cHJlc3Npb25DaGFuZ2UodGhpcy5zaW1wbGUpO1xuICB9XG5cbiAgb25FeHByZXNzaW9uQ2hhbmdlKHNpbXBsZSk6IHZvaWQge1xuICAgIGNvbnN0IGZoaXJQYXRoOiBzdHJpbmcgPSB0aGlzLmpzVG9GaGlyUGF0aFBpcGUudHJhbnNmb3JtKHNpbXBsZSwgdGhpcy52YXJpYWJsZXMpO1xuICAgIHRoaXMuZmhpclBhdGhFeHByZXNzaW9uID0gZmhpclBhdGg7XG5cbiAgICB0aGlzLnNpbXBsZUNoYW5nZS5lbWl0KHNpbXBsZSk7XG4gICAgdGhpcy5leHByZXNzaW9uQ2hhbmdlLmVtaXQoZmhpclBhdGgpO1xuICB9XG59XG4iXX0=
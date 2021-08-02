import { Component, Input } from '@angular/core';
export class SyntaxPreviewComponent {
    constructor() {
        this.showWhenEmpty = false;
    }
    ngOnInit() {
    }
}
SyntaxPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-preview',
                template: "<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  FHIRPath: <pre class=\"d-inline text-muted\" title=\"{{syntax}}\">{{syntax}}</pre>\n</div>\n",
                styles: [":host{overflow:hidden}.syntax-preview{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9zeW50YXgtcHJldmlldy9zeW50YXgtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFRekQsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQztRQUZTLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0lBRWYsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDhNQUE4Qzs7YUFFL0M7Ozs7cUJBRUUsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpbXBsZVN0eWxlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1zeW50YXgtcHJldmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zeW50YXgtcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N5bnRheC1wcmV2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTeW50YXhQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3ludGF4O1xuICBASW5wdXQoKSBsaGNTdHlsZTogU2ltcGxlU3R5bGU7XG4gIEBJbnB1dCgpIHNob3dXaGVuRW1wdHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbn1cbiJdfQ==
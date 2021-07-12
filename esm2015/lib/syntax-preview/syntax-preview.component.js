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
                template: "<div class=\"mt-2 syntax-preview text-muted\" *ngIf=\"syntax || showWhenEmpty\">\n  FHIRPath: <pre class=\"d-inline text-muted\" title=\"{{syntax}}\">{{syntax}}</pre>\n</div>\n",
                styles: [":host{overflow:hidden}.syntax-preview{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9zeW50YXgtcHJldmlldy9zeW50YXgtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFPekQsTUFBTSxPQUFPLHNCQUFzQjtJQUlqQztRQUZTLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0lBRWYsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDRMQUE4Qzs7YUFFL0M7Ozs7cUJBRUUsS0FBSzs0QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1zeW50YXgtcHJldmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zeW50YXgtcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N5bnRheC1wcmV2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTeW50YXhQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3ludGF4O1xuICBASW5wdXQoKSBzaG93V2hlbkVtcHR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=
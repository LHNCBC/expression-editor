import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export class SyntaxPreviewComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.showWhenEmpty = false;
    }
    ngOnInit() {
    }
    /**
     * Show an ephemeral notification that the value was copied.
     */
    copyNotification() {
        this.snackBar.open('Copied to clipboard', null, {
            duration: 2000
        });
    }
}
SyntaxPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-syntax-preview',
                template: "<div class=\"text-muted syntax-preview\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  <div class=\"fhirpath\">\n    FHIRPath:\n    <pre class=\"d-inline text-muted syntax\" matTooltip=\"{{syntax}}\">\n      {{syntax}}\n    </pre>\n  </div>\n  <button class=\"copy\" #toolTip=\"matTooltip\" matTooltip=\"Copy to clipboard\"\n          [cdkCopyToClipboard]=\"syntax\" (click)=\"copyNotification(toolTip)\" aria-label=\"Copy to clipboard\">\n    <!-- Copy icon https://fonts.google.com/icons?icon.query=copy -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\">\n      <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n      <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/>\n    </svg>\n  </button>\n</div>\n",
                styles: [".syntax,:host{overflow:hidden}.syntax{white-space:nowrap;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{display:flex;width:100%}.fhirpath{flex:1 0 10em;min-width:0;padding-right:1em}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            },] }
];
SyntaxPreviewComponent.ctorParameters = () => [
    { type: MatSnackBar }
];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9zeW50YXgtcHJldmlldy9zeW50YXgtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTzFELE1BQU0sT0FBTyxzQkFBc0I7SUFLakMsWUFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUZoQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztJQUVjLENBQUM7SUFFOUMsUUFBUTtJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRTtZQUM5QyxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIseTNCQUE4Qzs7YUFFL0M7OztZQU5RLFdBQVc7OztxQkFRakIsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpbXBsZVN0eWxlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1zeW50YXgtcHJldmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zeW50YXgtcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N5bnRheC1wcmV2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTeW50YXhQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3ludGF4O1xuICBASW5wdXQoKSBsaGNTdHlsZTogU2ltcGxlU3R5bGU7XG4gIEBJbnB1dCgpIHNob3dXaGVuRW1wdHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0JhcikgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhbiBlcGhlbWVyYWwgbm90aWZpY2F0aW9uIHRoYXQgdGhlIHZhbHVlIHdhcyBjb3BpZWQuXG4gICAqL1xuICBjb3B5Tm90aWZpY2F0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc25hY2tCYXIub3BlbignQ29waWVkIHRvIGNsaXBib2FyZCcsIG51bGwsIHtcbiAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
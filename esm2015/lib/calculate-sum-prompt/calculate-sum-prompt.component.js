import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
export class CalculateSumPromptComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.export = new EventEmitter();
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() { }
    /**
     * Close the dialog by specifying this should not be a score calculation
     */
    onCloseClick() {
        this.ruleEditorService.toggleMightBeScore();
    }
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */
    onExportClick() {
        this.export.emit();
    }
}
CalculateSumPromptComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-calculate-sum-prompt',
                template: "<div class=\"score-modal\">\n  <p [style]=\"lhcStyle.description\">It looks like this might be a score calculation.</p>\n\n  <p [style]=\"lhcStyle.description\">Would you like to calculate the sum of scores?</p>\n\n  <button class=\"primary\" (click)=\"onExportClick()\" [style]=\"lhcStyle.buttonPrimary\" id=\"export-score\">Yes</button>\n  <button (click)=\"onCloseClick()\" [style]=\"lhcStyle.buttonSecondary\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: ["*{font-size:1rem}.score-modal{text-align:center}button{margin:0 .5em}"]
            },] }
];
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    export: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLXN1bS1wcm9tcHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9jYWxjdWxhdGUtc3VtLXByb21wdC9jYWxjdWxhdGUtc3VtLXByb21wdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQU94RSxNQUFNLE9BQU8sMkJBQTJCO0lBSXRDLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBSC9DLGFBQVEsR0FBZ0IsRUFBRSxDQUFDO1FBQzFCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVGLENBQUM7SUFFN0Q7O09BRUc7SUFDSCxRQUFRLEtBQVUsQ0FBQztJQUVuQjs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLHdkQUFvRDs7YUFFckQ7OztZQU5RLGlCQUFpQjs7O3VCQVF2QixLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSwgU2ltcGxlU3R5bGUgfSBmcm9tICcuLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLWNhbGN1bGF0ZS1zdW0tcHJvbXB0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGN1bGF0ZS1zdW0tcHJvbXB0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsY3VsYXRlLXN1bS1wcm9tcHQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGN1bGF0ZVN1bVByb21wdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGxoY1N0eWxlOiBTaW1wbGVTdHlsZSA9IHt9O1xuICBAT3V0cHV0KCkgZXhwb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcnVsZUVkaXRvclNlcnZpY2U6IFJ1bGVFZGl0b3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSBkaWFsb2cgYnkgc3BlY2lmeWluZyB0aGlzIHNob3VsZCBub3QgYmUgYSBzY29yZSBjYWxjdWxhdGlvblxuICAgKi9cbiAgb25DbG9zZUNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UudG9nZ2xlTWlnaHRCZVNjb3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHRoZSBzdW0gb2Ygc2NvcmVzIGFzIGEgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqL1xuICBvbkV4cG9ydENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwb3J0LmVtaXQoKTtcbiAgfVxufVxuIl19
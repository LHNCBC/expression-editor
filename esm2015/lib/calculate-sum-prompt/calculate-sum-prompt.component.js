import { Component, EventEmitter, Output } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
export class CalculateSumPromptComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
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
                template: "<div class=\"score-modal\">\n  <p>It looks like this might be a score calculation.</p>\n\n  <p>Would you like to calculate the sum of scores?</p>\n\n  <button class=\"btn btn-primary py-2 px-5 mx-2\" (click)=\"onExportClick()\" id=\"export-score\">Yes</button>\n  <button class=\"btn btn-secondary py-2 px-5 mx-2\" (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: [".score-modal{text-align:center}"]
            },] }
];
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
    export: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLXN1bS1wcm9tcHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9jYWxjdWxhdGUtc3VtLXByb21wdC9jYWxjdWxhdGUtc3VtLXByb21wdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTzNELE1BQU0sT0FBTywyQkFBMkI7SUFHdEMsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGOUMsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRUYsQ0FBQztJQUU3RDs7T0FFRztJQUNILFFBQVEsS0FBVSxDQUFDO0lBRW5COztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsZ1pBQW9EOzthQUVyRDs7O1lBTlEsaUJBQWlCOzs7cUJBUXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJ1bGVFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1jYWxjdWxhdGUtc3VtLXByb21wdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxjdWxhdGUtc3VtLXByb21wdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGN1bGF0ZS1zdW0tcHJvbXB0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGVTdW1Qcm9tcHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgZXhwb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcnVsZUVkaXRvclNlcnZpY2U6IFJ1bGVFZGl0b3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSBkaWFsb2cgYnkgc3BlY2lmeWluZyB0aGlzIHNob3VsZCBub3QgYmUgYSBzY29yZSBjYWxjdWxhdGlvblxuICAgKi9cbiAgb25DbG9zZUNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UudG9nZ2xlTWlnaHRCZVNjb3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHRoZSBzdW0gb2Ygc2NvcmVzIGFzIGEgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqL1xuICBvbkV4cG9ydENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwb3J0LmVtaXQoKTtcbiAgfVxufVxuIl19
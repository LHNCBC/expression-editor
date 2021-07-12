import { Component } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
export class UneditableVariablesComponent {
    constructor(variableService) {
        this.variableService = variableService;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.uneditableVariables = this.variableService.uneditableVariables;
        this.uneditableVariablesSubscription =
            this.variableService.uneditableVariablesChange.subscribe((variables) => {
                this.uneditableVariables = variables;
            });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.uneditableVariablesSubscription.unsubscribe();
    }
}
UneditableVariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-uneditable-variables',
                template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Un-editable Variables</h2>\n\n  <div class=\"container mb-4\">\n    <div class=\"row font-weight-bold\" aria-hidden=\"true\">\n      <div class=\"col-2\">Label</div>\n      <div class=\"col-2\">Type</div>\n      <div class=\"col-8\">Description</div>\n    </div>\n    <hr>\n    <div class=\"row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.name}}</div>\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.type}}</div>\n      <div class=\"col-8\"><span class=\"sr-only\">Description</span>{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n"
            },] }
];
UneditableVariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5lZGl0YWJsZS12YXJpYWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi91bmVkaXRhYmxlLXZhcmlhYmxlcy91bmVkaXRhYmxlLXZhcmlhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU8zRCxNQUFNLE9BQU8sNEJBQTRCO0lBSXZDLFlBQW9CLGVBQWtDO1FBQWxDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtJQUFHLENBQUM7SUFFMUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFDcEUsSUFBSSxDQUFDLCtCQUErQjtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN6RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzs7WUExQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLDJzQkFBb0Q7YUFDckQ7OztZQU5RLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5lZGl0YWJsZVZhcmlhYmxlIH0gZnJvbSAnLi4vdmFyaWFibGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtdW5lZGl0YWJsZS12YXJpYWJsZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5lZGl0YWJsZS12YXJpYWJsZXMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFVuZWRpdGFibGVWYXJpYWJsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB1bmVkaXRhYmxlVmFyaWFibGVzOiBVbmVkaXRhYmxlVmFyaWFibGVbXTtcbiAgdW5lZGl0YWJsZVZhcmlhYmxlc1N1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhcmlhYmxlU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy52YXJpYWJsZVNlcnZpY2UudW5lZGl0YWJsZVZhcmlhYmxlcztcbiAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXNTdWJzY3JpcHRpb24gPVxuICAgICAgICB0aGlzLnZhcmlhYmxlU2VydmljZS51bmVkaXRhYmxlVmFyaWFibGVzQ2hhbmdlLnN1YnNjcmliZSgodmFyaWFibGVzKSA9PiB7XG4gICAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAqL1xuICBuZ0Rlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
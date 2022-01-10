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
                template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Variables in Scope for This Item</h2>\n\n  <div class=\"container\">\n    <div class=\"variable-header\">\n      <div class=\"variable-column-label\">Label</div>\n      <div class=\"variable-column-type\">Variable Type</div>\n      <div class=\"variable-column-details\">Description</div>\n    </div>\n    <div class=\"variable-row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"variable-column-label\">{{variable.name}}</div>\n      <div class=\"variable-column-type\">{{variable.type}}</div>\n      <div class=\"variable-column-details\">{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:auto}}"]
            },] }
];
UneditableVariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5lZGl0YWJsZS12YXJpYWJsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi91bmVkaXRhYmxlLXZhcmlhYmxlcy91bmVkaXRhYmxlLXZhcmlhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVEzRCxNQUFNLE9BQU8sNEJBQTRCO0lBSXZDLFlBQW9CLGVBQWtDO1FBQWxDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtJQUFHLENBQUM7SUFFMUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFDcEUsSUFBSSxDQUFDLCtCQUErQjtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN6RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLCtxQkFBb0Q7O2FBRXJEOzs7WUFQUSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUnVsZUVkaXRvclNlcnZpY2UgfSBmcm9tICcuLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFVuZWRpdGFibGVWYXJpYWJsZSB9IGZyb20gJy4uL3ZhcmlhYmxlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLXVuZWRpdGFibGUtdmFyaWFibGVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VuZWRpdGFibGUtdmFyaWFibGVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdW5lZGl0YWJsZS12YXJpYWJsZXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFVuZWRpdGFibGVWYXJpYWJsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB1bmVkaXRhYmxlVmFyaWFibGVzOiBVbmVkaXRhYmxlVmFyaWFibGVbXTtcbiAgdW5lZGl0YWJsZVZhcmlhYmxlc1N1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhcmlhYmxlU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy52YXJpYWJsZVNlcnZpY2UudW5lZGl0YWJsZVZhcmlhYmxlcztcbiAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXNTdWJzY3JpcHRpb24gPVxuICAgICAgICB0aGlzLnZhcmlhYmxlU2VydmljZS51bmVkaXRhYmxlVmFyaWFibGVzQ2hhbmdlLnN1YnNjcmliZSgodmFyaWFibGVzKSA9PiB7XG4gICAgICB0aGlzLnVuZWRpdGFibGVWYXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAqL1xuICBuZ0Rlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bmVkaXRhYmxlVmFyaWFibGVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==
import { Component, Input } from '@angular/core';
import { VariableType } from '../variable';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleEditorService } from '../rule-editor.service';
export class VariablesComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.variableType = VariableType;
        this.levels = [{
                level: 0,
                name: 'Top Level Scope'
            }
        ];
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.variables = this.ruleEditorService.variables;
        this.variableSubscription = this.ruleEditorService.variablesChange.subscribe((variables) => {
            this.variables = variables;
        });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.variableSubscription.unsubscribe();
    }
    /**
     * Called when adding a new variable
     */
    onAdd() {
        this.ruleEditorService.addVariable();
    }
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.ruleEditorService.remove(i);
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
    }
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    getAvailableVariables(index) {
        const uneditableVariables = this.ruleEditorService.uneditableVariables.map((e) => e.name);
        // Only return variables up to but not including index
        const editableVariables = this.variables.map((e) => e.label).slice(0, index);
        return uneditableVariables.concat(editableVariables);
    }
}
VariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-variables',
                template: "<h2>Variables</h2>\n\n<div class=\"container\">\n  <div class=\"row font-weight-bold mb-2\" aria-hidden=\"true\">\n    <div class=\"col-md-2\">Label</div>\n    <div class=\"col-md-3\">Type</div>\n    <div class=\"col-md-7\">Question/FHIRPath Expression</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable row py-2\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"col-md-2 form-inline\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-grip-vertical mr-2 handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" class=\"form-control w-75\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"col-md-3\">\n        <div class=\"form-inline\">\n          <select [id]=\"'variable-type-' + i\" class=\"form-control\" [(ngModel)]=\"variable.type\" aria-label=\"Variable type\">\n            <option value=\"\" disabled hidden>Select...</option>\n            <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"col-md-6\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" [advancedInterface]=\"advancedInterface\" *ngSwitchCase=\"'question'\"></lhc-question>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.simple\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"Simple Expression\" />\n          <lhc-syntax-preview [syntax]=\"variable.simple | mathToFhirpath:getAvailableVariables(i)\"></lhc-syntax-preview>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"FHIRPath Expression\" />\n        </div>\n      </div>\n      <div class=\"col-md-1\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove Line\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"py-2\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\">Add variable</button>\n",
                styles: [".example-list{width:500px;max-width:100%;border:1px solid #ccc;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}.drag-variable{padding:20px 10px;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    advancedInterface: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFibGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvdmFyaWFibGVzL3ZhcmlhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFZLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyRCxPQUFPLEVBQWUsZUFBZSxFQUFxQixNQUFNLHdCQUF3QixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTzNELE1BQU0sT0FBTyxrQkFBa0I7SUFXN0IsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFUeEQsaUJBQVksR0FBRyxZQUFZLENBQUM7UUFHNUIsV0FBTSxHQUFHLENBQUM7Z0JBQ04sS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLGlCQUFpQjthQUN4QjtTQUNGLENBQUM7SUFFeUQsQ0FBQztJQUU1RDs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDbEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDekYsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxDQUFTO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksQ0FBQyxLQUE4QjtRQUNqQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsS0FBYTtRQUNqQyxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRixzREFBc0Q7UUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFN0UsT0FBTyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUFwRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6Qix5N0ZBQXlDOzthQUUxQzs7O1lBTlEsaUJBQWlCOzs7Z0NBUXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmFyaWFibGUsIFZhcmlhYmxlVHlwZSB9IGZyb20gJy4uL3ZhcmlhYmxlJztcbmltcG9ydCB7IENka0RyYWdEcm9wLCBtb3ZlSXRlbUluQXJyYXksIHRyYW5zZmVyQXJyYXlJdGVtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtdmFyaWFibGVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZhcmlhYmxlcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZhcmlhYmxlcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVmFyaWFibGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWR2YW5jZWRJbnRlcmZhY2U7XG4gIHZhcmlhYmxlVHlwZSA9IFZhcmlhYmxlVHlwZTtcbiAgdmFyaWFibGVTdWJzY3JpcHRpb247XG4gIHZhcmlhYmxlczogVmFyaWFibGVbXTtcbiAgbGV2ZWxzID0gW3tcbiAgICAgIGxldmVsOiAwLFxuICAgICAgbmFtZTogJ1RvcCBMZXZlbCBTY29wZSdcbiAgICB9XG4gIF07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBydWxlRWRpdG9yU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnJ1bGVFZGl0b3JTZXJ2aWNlLnZhcmlhYmxlcztcbiAgICB0aGlzLnZhcmlhYmxlU3Vic2NyaXB0aW9uID0gdGhpcy5ydWxlRWRpdG9yU2VydmljZS52YXJpYWJsZXNDaGFuZ2Uuc3Vic2NyaWJlKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgbmdEZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudmFyaWFibGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhZGRpbmcgYSBuZXcgdmFyaWFibGVcbiAgICovXG4gIG9uQWRkKCk6IHZvaWQge1xuICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UuYWRkVmFyaWFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSB2YXJpYWJsZSBhdCBhbiBpbmRleFxuICAgKiBAcGFyYW0gaSAtIGluZGV4IHRvIHJlbW92ZVxuICAgKi9cbiAgb25SZW1vdmUoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ydWxlRWRpdG9yU2VydmljZS5yZW1vdmUoaSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhZyBhbmQgZHJvcCByZWFycmFuZ2Ugb2YgdmFyaWFibGUgb3JkZXJcbiAgICogQHBhcmFtIGV2ZW50IC0gZHJhZyBhbmQgZHJvcCBldmVudFxuICAgKi9cbiAgZHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8VmFyaWFibGVbXT4pOiB2b2lkIHtcbiAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy52YXJpYWJsZXMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsYWJlbHMgb2YgYXZhaWxhYmxlIHZhcmlhYmxlcyBhdCB0aGUgY3VycmVudCBpbmRleFxuICAgKiBAcGFyYW0gaW5kZXggLSBJbmRleCBvZiB2YXJpYWJsZSB3ZSdyZSBlZGl0aW5nXG4gICAqL1xuICBnZXRBdmFpbGFibGVWYXJpYWJsZXMoaW5kZXg6IG51bWJlcik6IEFycmF5PHN0cmluZz4ge1xuICAgIGNvbnN0IHVuZWRpdGFibGVWYXJpYWJsZXMgPSB0aGlzLnJ1bGVFZGl0b3JTZXJ2aWNlLnVuZWRpdGFibGVWYXJpYWJsZXMubWFwKChlKSA9PiBlLm5hbWUpO1xuICAgIC8vIE9ubHkgcmV0dXJuIHZhcmlhYmxlcyB1cCB0byBidXQgbm90IGluY2x1ZGluZyBpbmRleFxuICAgIGNvbnN0IGVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy52YXJpYWJsZXMubWFwKChlKSA9PiBlLmxhYmVsKS5zbGljZSgwLCBpbmRleCk7XG5cbiAgICByZXR1cm4gdW5lZGl0YWJsZVZhcmlhYmxlcy5jb25jYXQoZWRpdGFibGVWYXJpYWJsZXMpO1xuICB9XG59XG4iXX0=
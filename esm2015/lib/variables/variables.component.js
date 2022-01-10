import { Component, Input } from '@angular/core';
import { AllVariableType, SimpleVariableType } from '../variable';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleEditorService } from '../rule-editor.service';
export class VariablesComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.variableType = SimpleVariableType;
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
     * Angular lifecycle hook called when bound property changes
     */
    ngOnChanges(changes) {
        if (changes.advancedInterface) {
            this.variableType = this.advancedInterface ? AllVariableType : SimpleVariableType;
            if (this.variables) {
                const previousValues = [];
                this.variables.forEach((variable, index) => {
                    previousValues[index] = variable.type;
                    variable.type = '';
                });
                // Not sure of a better way of setting the previous values than this
                setTimeout(() => {
                    previousValues.forEach((type, index) => {
                        this.variables[index].type = type;
                    });
                }, 10);
            }
        }
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
     * Update the preview when the variable name changes
     */
    onNameChange() {
        this.ruleEditorService.update();
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'query' || event.target.value === 'expression') {
            this.ruleEditorService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.ruleEditorService.checkAdvancedInterface();
        }
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
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */
    updateExpression(i, expression) {
        this.variables[i].expression = expression;
    }
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */
    updateSimpleExpression(i, easyPath) {
        this.variables[i].simple = easyPath;
    }
}
VariablesComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-variables',
                template: "<h2 [style]=\"lhcStyle.h2\">Variables</h2>\n\n<div class=\"container\">\n  <div class=\"variable-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"variable-column-label\">Label</div>\n    <div class=\"variable-column-type\">Variable Type</div>\n    <div class=\"variable-column-details\">Question/FHIRPath Expression/FHIR Query</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"variable-column-label\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" (change)=\"onNameChange()\" [style]=\"lhcStyle.input\" class=\"label\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"variable-column-type\">\n        <select [id]=\"'variable-type-' + i\" [(ngModel)]=\"variable.type\" (change)=\"onTypeChange($event)\" [style]=\"lhcStyle.select\" aria-label=\"Variable type\">\n          <option value=\"\" disabled hidden>Select...</option>\n          <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n        </select>\n      </div>\n      <div class=\"variable-column-details\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" *ngSwitchCase=\"'question'\" [lhcStyle]=\"lhcStyle\"></lhc-question>\n        <lhc-query-observation [variable]=\"variable\" [index]=\"i\" *ngSwitchCase=\"'queryObservation'\" [lhcStyle]=\"lhcStyle\"></lhc-query-observation>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <lhc-syntax-converter\n            [id]=\"'variable-expression-' + i\"\n            [simple]=\"variable.simple\"\n            [variables]=\"getAvailableVariables(i)\"\n            [lhcStyle]=\"lhcStyle\"\n            (simpleChange)=\"updateSimpleExpression(i, $event)\"\n            (expressionChange)=\"updateExpression(i, $event)\">\n          </lhc-syntax-converter>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\" aria-label=\"FHIRPath Expression\" />\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'query'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\"\n                 aria-label=\"FHIR Query\" placeholder=\"x-fhir-query\" />\n        </div>\n      </div>\n      <div class=\"variable-column-actions\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove variable\" title=\"Remove variable\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"no-variables\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add variable</button>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header>.variable-column-label{padding-left:1.6em}.variable-column-label>input,.variable-column-type select{width:100%;height:2rem;font-size:1rem}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.label{flex-grow:100}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}.variable-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:20 0 10em}.variable-column-actions{flex:auto}}.drag-variable{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.no-variables{padding:2rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            },] }
];
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    advancedInterface: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFibGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvdmFyaWFibGVzL3ZhcmlhYmxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBWSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUUsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBT3hFLE1BQU0sT0FBTyxrQkFBa0I7SUFhN0IsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFaL0MsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFHcEMsaUJBQVksR0FBUSxrQkFBa0IsQ0FBQztRQUd2QyxXQUFNLEdBQUcsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsaUJBQWlCO2FBQ3hCO1NBQ0YsQ0FBQztJQUV5RCxDQUFDO0lBRTVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUNsRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN6RixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxPQUFPO1FBQ2pCLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBQzdCLElB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QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDdEMsQ0FBQzs7O1lBcElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIseXFIQUF5Qzs7YUFFMUM7OztZQU5RLGlCQUFpQjs7O3VCQVF2QixLQUFLO2dDQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWYXJpYWJsZSwgQWxsVmFyaWFibGVUeXBlLCBTaW1wbGVWYXJpYWJsZVR5cGUgfSBmcm9tICcuLi92YXJpYWJsZSc7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSwgU2ltcGxlU3R5bGUgfSBmcm9tICcuLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLXZhcmlhYmxlcycsXG4gIHRlbXBsYXRlVXJsOiAnLi92YXJpYWJsZXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92YXJpYWJsZXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbGhjU3R5bGU6IFNpbXBsZVN0eWxlID0ge307XG4gIEBJbnB1dCgpIGFkdmFuY2VkSW50ZXJmYWNlOiBib29sZWFuO1xuXG4gIHZhcmlhYmxlVHlwZTogYW55ID0gU2ltcGxlVmFyaWFibGVUeXBlO1xuICB2YXJpYWJsZVN1YnNjcmlwdGlvbjtcbiAgdmFyaWFibGVzOiBWYXJpYWJsZVtdO1xuICBsZXZlbHMgPSBbe1xuICAgICAgbGV2ZWw6IDAsXG4gICAgICBuYW1lOiAnVG9wIExldmVsIFNjb3BlJ1xuICAgIH1cbiAgXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJ1bGVFZGl0b3JTZXJ2aWNlOiBSdWxlRWRpdG9yU2VydmljZSkge31cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHRoaXMucnVsZUVkaXRvclNlcnZpY2UudmFyaWFibGVzO1xuICAgIHRoaXMudmFyaWFibGVTdWJzY3JpcHRpb24gPSB0aGlzLnJ1bGVFZGl0b3JTZXJ2aWNlLnZhcmlhYmxlc0NoYW5nZS5zdWJzY3JpYmUoKHZhcmlhYmxlcykgPT4ge1xuICAgICAgdGhpcy52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgd2hlbiBib3VuZCBwcm9wZXJ0eSBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuYWR2YW5jZWRJbnRlcmZhY2UpIHtcbiAgICAgIHRoaXMudmFyaWFibGVUeXBlID0gdGhpcy5hZHZhbmNlZEludGVyZmFjZSA/IEFsbFZhcmlhYmxlVHlwZSA6IFNpbXBsZVZhcmlhYmxlVHlwZTtcbiAgICAgIGlmICh0aGlzLnZhcmlhYmxlcykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMudmFyaWFibGVzLmZvckVhY2goKHZhcmlhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgIHByZXZpb3VzVmFsdWVzW2luZGV4XSA9IHZhcmlhYmxlLnR5cGU7XG4gICAgICAgICAgdmFyaWFibGUudHlwZSA9ICcnO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBOb3Qgc3VyZSBvZiBhIGJldHRlciB3YXkgb2Ygc2V0dGluZyB0aGUgcHJldmlvdXMgdmFsdWVzIHRoYW4gdGhpc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlcy5mb3JFYWNoKCh0eXBlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZXNbaW5kZXhdLnR5cGUgPSB0eXBlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgbmdEZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudmFyaWFibGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhZGRpbmcgYSBuZXcgdmFyaWFibGVcbiAgICovXG4gIG9uQWRkKCk6IHZvaWQge1xuICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UuYWRkVmFyaWFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSB2YXJpYWJsZSBhdCBhbiBpbmRleFxuICAgKiBAcGFyYW0gaSAtIGluZGV4IHRvIHJlbW92ZVxuICAgKi9cbiAgb25SZW1vdmUoaTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ydWxlRWRpdG9yU2VydmljZS5yZW1vdmUoaSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhZyBhbmQgZHJvcCByZWFycmFuZ2Ugb2YgdmFyaWFibGUgb3JkZXJcbiAgICogQHBhcmFtIGV2ZW50IC0gZHJhZyBhbmQgZHJvcCBldmVudFxuICAgKi9cbiAgZHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8VmFyaWFibGVbXT4pOiB2b2lkIHtcbiAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy52YXJpYWJsZXMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBwcmV2aWV3IHdoZW4gdGhlIHZhcmlhYmxlIG5hbWUgY2hhbmdlc1xuICAgKi9cbiAgb25OYW1lQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBhZHZhbmNlZCBpbnRlcmZhY2UgYmFzZWQgb24gdGhlIHR5cGVcbiAgICovXG4gIG9uVHlwZUNoYW5nZShldmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT09ICdxdWVyeScgfHwgZXZlbnQudGFyZ2V0LnZhbHVlID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgIHRoaXMucnVsZUVkaXRvclNlcnZpY2UuY2hlY2tBZHZhbmNlZEludGVyZmFjZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTmVlZCB0byBjaGVjayBhbGwgb3RoZXIgdmFyaWFibGVzIGFuZCB0aGUgZmluYWwgZXhwcmVzc2lvbiBiZWZvcmUgd2VcbiAgICAgIC8vIGFsbG93IHRoZSBhZHZhbmNlZCBpbnRlcmZhY2UgdG8gYmUgcmVtb3ZlZFxuICAgICAgdGhpcy5ydWxlRWRpdG9yU2VydmljZS5jaGVja0FkdmFuY2VkSW50ZXJmYWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGFiZWxzIG9mIGF2YWlsYWJsZSB2YXJpYWJsZXMgYXQgdGhlIGN1cnJlbnQgaW5kZXhcbiAgICogQHBhcmFtIGluZGV4IC0gSW5kZXggb2YgdmFyaWFibGUgd2UncmUgZWRpdGluZ1xuICAgKi9cbiAgZ2V0QXZhaWxhYmxlVmFyaWFibGVzKGluZGV4OiBudW1iZXIpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBjb25zdCB1bmVkaXRhYmxlVmFyaWFibGVzID0gdGhpcy5ydWxlRWRpdG9yU2VydmljZS51bmVkaXRhYmxlVmFyaWFibGVzLm1hcCgoZSkgPT4gZS5uYW1lKTtcbiAgICAvLyBPbmx5IHJldHVybiB2YXJpYWJsZXMgdXAgdG8gYnV0IG5vdCBpbmNsdWRpbmcgaW5kZXhcbiAgICBjb25zdCBlZGl0YWJsZVZhcmlhYmxlcyA9IHRoaXMudmFyaWFibGVzLm1hcCgoZSkgPT4gZS5sYWJlbCkuc2xpY2UoMCwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHVuZWRpdGFibGVWYXJpYWJsZXMuY29uY2F0KGVkaXRhYmxlVmFyaWFibGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGV4cHJlc3Npb24gZm9yIHZhcmlhYmxlIGF0IHRoZSBnaXZlbiBpbmRleC5cbiAgICogQHBhcmFtIGkgLSBpbmRleFxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiAtIG5ldyBleHByZXNzaW9uIHRvIHVzZVxuICAgKi9cbiAgdXBkYXRlRXhwcmVzc2lvbihpOiBudW1iZXIsIGV4cHJlc3Npb24pOiB2b2lkIHtcbiAgICB0aGlzLnZhcmlhYmxlc1tpXS5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIEVhc3kgUGF0aCBmb3IgdmFyaWFibGUgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgKiBAcGFyYW0gaSAtIGluZGV4XG4gICAqIEBwYXJhbSBlYXN5UGF0aCAtIG5ldyBleHByZXNzaW9uIHRvIHVzZVxuICAgKi9cbiAgdXBkYXRlU2ltcGxlRXhwcmVzc2lvbihpOiBudW1iZXIsIGVhc3lQYXRoKTogdm9pZCB7XG4gICAgdGhpcy52YXJpYWJsZXNbaV0uc2ltcGxlID0gZWFzeVBhdGg7XG4gIH1cbn1cbiJdfQ==
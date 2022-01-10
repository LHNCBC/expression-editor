import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from './rule-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
export class RuleEditorComponent {
    constructor(variableService, liveAnnouncer) {
        this.variableService = variableService;
        this.liveAnnouncer = liveAnnouncer;
        this.advancedInterface = false;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.lhcStyle = {};
        this.save = new EventEmitter();
        this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
        this.datePipe = new DatePipe('en-US');
        this.suggestions = [];
        this.disableInterfaceToggle = false;
        this.loadError = false;
    }
    ngOnInit() {
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
            this.calculateSum = mightBeScore;
        });
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
            this.finalExpression = finalExpression;
        });
        this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
            this.variables = variables.map(e => e.label);
        });
        this.disableAdvancedSubscription = this.variableService.disableAdvancedChange.subscribe((disable) => {
            this.disableInterfaceToggle = disable;
        });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
        this.disableAdvancedSubscription.unsubscribe();
    }
    /**
     * Angular lifecycle hook called on input changes
     */
    ngOnChanges(args) {
        this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */
    reload() {
        if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
            this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
            if (this.loadError) {
                this.liveAnnouncer.announce(this.errorLoading);
            }
            this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
            this.advancedInterface = this.variableService.needsAdvancedInterface;
        }
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.caseStatements = this.variableService.caseStatements;
        this.calculateSum = this.variableService.mightBeScore;
        this.finalExpression = this.variableService.finalExpression;
        this.variables = this.variableService.variables.map(e => e.label);
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export() {
        this.save.emit(this.variableService.export(this.expressionUri, this.finalExpression));
    }
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */
    addSumOfScores() {
        this.save.emit(this.variableService.addSumOfScores());
    }
    /**
     * Called when the syntax type is changed to clean up expressions if the data cannot be converted
     * @param $event - event from from the caller
     */
    onSyntaxChange($event) {
        const newSyntax = $event.value;
        // Clear the existing expression if switching away from fhirpath
        if (newSyntax === 'simple') {
            this.finalExpression = '';
        }
        this.variableService.syntaxType = newSyntax;
    }
    /**
     * Update the final expression
     */
    updateFinalExpression(expression) {
        this.finalExpression = expression;
    }
    /**
     * Update the simple final expression
     */
    updateSimpleExpression(simple) {
        this.simpleExpression = simple;
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'fhirpath') {
            this.variableService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.variableService.checkAdvancedInterface();
        }
        if (this.variableService.needsAdvancedInterface) {
            this.advancedInterface = true;
            this.disableInterfaceToggle = true;
        }
        else {
            this.disableInterfaceToggle = false;
        }
    }
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<div *ngIf=\"loadError\" class=\"error\">{{errorLoading}}</div>\n<lhc-calculate-sum-prompt *ngIf=\"calculateSum && !loadError\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum && !loadError\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <span class=\"checkbox\" matTooltip=\"When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.\">\n    <input type=\"checkbox\" id=\"advanced-interface\" [disabled]=\"disableInterfaceToggle\"\n           [(ngModel)]=\"advancedInterface\">\n    <label for=\"advanced-interface\">Advanced interface</label>\n  </span>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\" [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"checkbox\">\n      <input type=\"checkbox\" id=\"case-statements\" [(ngModel)]=\"caseStatements\">\n      <label for=\"case-statements\">Use case statements</label>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\" *ngIf=\"advancedInterface\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" (change)=\"onTypeChange($event)\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Easy Path Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div *ngIf=\"!caseStatements\" class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter\n          *ngSwitchCase=\"'simple'\"\n          [simple]=\"simpleExpression\"\n          [variables]=\"variables\"\n          (expressionChange)=\"updateFinalExpression($event)\"\n          (simpleChange)=\"updateSimpleExpression($event)\"\n          [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input type=\"text\" aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n      <lhc-case-statements\n        *ngIf=\"caseStatements\"\n        [syntax]=\"expressionSyntax\"\n        [simpleExpression]=\"simpleExpression\"\n        [expression]=\"finalExpression\"\n        [lhcStyle]=\"lhcStyle\"\n        (expressionChange)=\"updateFinalExpression($event)\"\n        (simpleChange)=\"updateSimpleExpression($event)\">\n      </lhc-case-statements>\n    </div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{display:flex;padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 30em;min-width:0}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}lhc-case-statements{flex:100%;padding:.5rem}.checkbox{padding:.5rem}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
            },] }
];
RuleEditorComponent.ctorParameters = () => [
    { type: RuleEditorService },
    { type: LiveAnnouncer }
];
RuleEditorComponent.propDecorators = {
    advancedInterface: [{ type: Input }],
    fhirQuestionnaire: [{ type: Input }],
    itemLinkId: [{ type: Input }],
    submitButtonName: [{ type: Input }],
    titleName: [{ type: Input }],
    expressionLabel: [{ type: Input }],
    expressionUri: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    save: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9ydWxlLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFGLE9BQU8sRUFBRSxpQkFBaUIsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVFsRCxNQUFNLE9BQU8sbUJBQW1CO0lBOEI5QixZQUFvQixlQUFrQyxFQUFVLGFBQTRCO1FBQXhFLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBN0JuRixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsUUFBUSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxhQUFhLENBQUM7UUFDMUIsb0JBQWUsR0FBRyxrQkFBa0IsQ0FBQztRQUNyQyxrQkFBYSxHQUFHLHVGQUF1RixDQUFDO1FBQ3hHLGFBQVEsR0FBZ0IsRUFBRSxDQUFDO1FBQzFCLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTVDLGlCQUFZLEdBQUcscUVBQXFFLENBQUM7UUFNckYsYUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBTzZFLENB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QUVELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7WUExSkYsU0FBUyxTQUFDO2dCQUNULDhDQUE4QztnQkFDOUMsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsNjVGQUF5Qzs7YUFFMUM7OztZQVJRLGlCQUFpQjtZQUNqQixhQUFhOzs7Z0NBU25CLEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUNMLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRSYWRpb0NoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuaW1wb3J0IHsgUnVsZUVkaXRvclNlcnZpY2UsIFNpbXBsZVN0eWxlIH0gZnJvbSAnLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbGhjLXJ1bGUtZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdydWxlLWVkaXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydydWxlLWVkaXRvci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUnVsZUVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYWR2YW5jZWRJbnRlcmZhY2UgPSBmYWxzZTtcbiAgQElucHV0KCkgZmhpclF1ZXN0aW9ubmFpcmUgPSBudWxsO1xuICBASW5wdXQoKSBpdGVtTGlua0lkID0gbnVsbDtcbiAgQElucHV0KCkgc3VibWl0QnV0dG9uTmFtZSA9ICdTdWJtaXQnO1xuICBASW5wdXQoKSB0aXRsZU5hbWUgPSAnUnVsZSBFZGl0b3InO1xuICBASW5wdXQoKSBleHByZXNzaW9uTGFiZWwgPSAnRmluYWwgRXhwcmVzc2lvbic7XG4gIEBJbnB1dCgpIGV4cHJlc3Npb25VcmkgPSAnaHR0cDovL2hsNy5vcmcvZmhpci91di9zZGMvU3RydWN0dXJlRGVmaW5pdGlvbi9zZGMtcXVlc3Rpb25uYWlyZS1jYWxjdWxhdGVkRXhwcmVzc2lvbic7XG4gIEBJbnB1dCgpIGxoY1N0eWxlOiBTaW1wbGVTdHlsZSA9IHt9O1xuICBAT3V0cHV0KCkgc2F2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIGVycm9yTG9hZGluZyA9ICdDb3VsZCBub3QgZGV0ZWN0IGEgRkhJUiBRdWVzdGlvbm5haXJlOyBwbGVhc2UgdHJ5IGEgZGlmZmVyZW50IGZpbGUuJztcbiAgZXhwcmVzc2lvblN5bnRheDogc3RyaW5nO1xuICBzaW1wbGVFeHByZXNzaW9uOiBzdHJpbmc7XG4gIGZpbmFsRXhwcmVzc2lvbjogc3RyaW5nO1xuICBmaW5hbEV4cHJlc3Npb25GaGlyUGF0aDogc3RyaW5nO1xuICBsaW5rSWRDb250ZXh0OiBzdHJpbmc7XG4gIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpO1xuICBjYWxjdWxhdGVTdW06IGJvb2xlYW47XG4gIHN1Z2dlc3Rpb25zID0gW107XG4gIHZhcmlhYmxlczogc3RyaW5nW107XG4gIGNhc2VTdGF0ZW1lbnRzOiBib29sZWFuO1xuICBkaXNhYmxlSW50ZXJmYWNlVG9nZ2xlID0gZmFsc2U7XG4gIGxvYWRFcnJvciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY2FsY3VsYXRlU3VtU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGZpbmFsRXhwcmVzc2lvblN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSB2YXJpYWJsZXNTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZGlzYWJsZUFkdmFuY2VkU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFyaWFibGVTZXJ2aWNlOiBSdWxlRWRpdG9yU2VydmljZSwgcHJpdmF0ZSBsaXZlQW5ub3VuY2VyOiBMaXZlQW5ub3VuY2VyKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtU3Vic2NyaXB0aW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlQ2hhbmdlLnN1YnNjcmliZSgobWlnaHRCZVNjb3JlKSA9PiB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVN1bSA9IG1pZ2h0QmVTY29yZTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvblN1YnNjcmlwdGlvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmZpbmFsRXhwcmVzc2lvbkNoYW5nZS5zdWJzY3JpYmUoKGZpbmFsRXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSBmaW5hbEV4cHJlc3Npb247XG4gICAgfSk7XG4gICAgdGhpcy52YXJpYWJsZXNTdWJzY3JpcHRpb24gPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YXJpYWJsZXNDaGFuZ2Uuc3Vic2NyaWJlKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlzYWJsZUFkdmFuY2VkU3Vic2NyaXB0aW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UuZGlzYWJsZUFkdmFuY2VkQ2hhbmdlLnN1YnNjcmliZSgoZGlzYWJsZSkgPT4ge1xuICAgICAgdGhpcy5kaXNhYmxlSW50ZXJmYWNlVG9nZ2xlID0gZGlzYWJsZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rIGNhbGxlZCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgICovXG4gIG5nRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGN1bGF0ZVN1bVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZmluYWxFeHByZXNzaW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy52YXJpYWJsZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmRpc2FibGVBZHZhbmNlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIG9uIGlucHV0IGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKGFyZ3MpOiB2b2lkIHtcbiAgICB0aGlzLnJlbG9hZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlLWltcG9ydCBmaGlyIGFuZCBjb250ZXh0IGFuZCBzaG93IHRoZSBmb3JtXG4gICAqL1xuICByZWxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmhpclF1ZXN0aW9ubmFpcmUgIT09IG51bGwgJiYgdGhpcy5pdGVtTGlua0lkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmxvYWRFcnJvciA9ICF0aGlzLnZhcmlhYmxlU2VydmljZS5pbXBvcnQodGhpcy5leHByZXNzaW9uVXJpLCB0aGlzLmZoaXJRdWVzdGlvbm5haXJlLCB0aGlzLml0ZW1MaW5rSWQpO1xuICAgICAgaWYgKHRoaXMubG9hZEVycm9yKSB7XG4gICAgICAgIHRoaXMubGl2ZUFubm91bmNlci5hbm5vdW5jZSh0aGlzLmVycm9yTG9hZGluZyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc2FibGVJbnRlcmZhY2VUb2dnbGUgPSB0aGlzLnZhcmlhYmxlU2VydmljZS5uZWVkc0FkdmFuY2VkSW50ZXJmYWNlO1xuICAgICAgdGhpcy5hZHZhbmNlZEludGVyZmFjZSA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLm5lZWRzQWR2YW5jZWRJbnRlcmZhY2U7XG4gICAgfVxuXG4gICAgdGhpcy5zaW1wbGVFeHByZXNzaW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2Uuc2ltcGxlRXhwcmVzc2lvbjtcbiAgICB0aGlzLmxpbmtJZENvbnRleHQgPSB0aGlzLnZhcmlhYmxlU2VydmljZS5saW5rSWRDb250ZXh0O1xuICAgIHRoaXMuZXhwcmVzc2lvblN5bnRheCA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLnN5bnRheFR5cGU7XG4gICAgdGhpcy5jYXNlU3RhdGVtZW50cyA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmNhc2VTdGF0ZW1lbnRzO1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlO1xuICAgIHRoaXMuZmluYWxFeHByZXNzaW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UuZmluYWxFeHByZXNzaW9uO1xuICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy52YXJpYWJsZVNlcnZpY2UudmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCBGSElSIFF1ZXN0aW9ubmFpcmUgYW5kIGRvd25sb2FkIGFzIGEgZmlsZVxuICAgKi9cbiAgZXhwb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMudmFyaWFibGVTZXJ2aWNlLmV4cG9ydCh0aGlzLmV4cHJlc3Npb25VcmksIHRoaXMuZmluYWxFeHByZXNzaW9uKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgRkhJUiBxdWVzdGlvbm5haXJlIGZpbGUgYnkgc3VtbWluZyBhbGwgb3JkaW5hbFxuICAgKiB2YWx1ZXNcbiAgICovXG4gIGFkZFN1bU9mU2NvcmVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMudmFyaWFibGVTZXJ2aWNlLmFkZFN1bU9mU2NvcmVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBzeW50YXggdHlwZSBpcyBjaGFuZ2VkIHRvIGNsZWFuIHVwIGV4cHJlc3Npb25zIGlmIHRoZSBkYXRhIGNhbm5vdCBiZSBjb252ZXJ0ZWRcbiAgICogQHBhcmFtICRldmVudCAtIGV2ZW50IGZyb20gZnJvbSB0aGUgY2FsbGVyXG4gICAqL1xuICBvblN5bnRheENoYW5nZSgkZXZlbnQ6IE1hdFJhZGlvQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3U3ludGF4ID0gJGV2ZW50LnZhbHVlO1xuXG4gICAgLy8gQ2xlYXIgdGhlIGV4aXN0aW5nIGV4cHJlc3Npb24gaWYgc3dpdGNoaW5nIGF3YXkgZnJvbSBmaGlycGF0aFxuICAgIGlmIChuZXdTeW50YXggPT09ICdzaW1wbGUnKSB7XG4gICAgICB0aGlzLmZpbmFsRXhwcmVzc2lvbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMudmFyaWFibGVTZXJ2aWNlLnN5bnRheFR5cGUgPSBuZXdTeW50YXg7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBmaW5hbCBleHByZXNzaW9uXG4gICAqL1xuICB1cGRhdGVGaW5hbEV4cHJlc3Npb24oZXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuZmluYWxFeHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNpbXBsZSBmaW5hbCBleHByZXNzaW9uXG4gICAqL1xuICB1cGRhdGVTaW1wbGVFeHByZXNzaW9uKHNpbXBsZSk6IHZvaWQge1xuICAgIHRoaXMuc2ltcGxlRXhwcmVzc2lvbiA9IHNpbXBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIGFkdmFuY2VkIGludGVyZmFjZSBiYXNlZCBvbiB0aGUgdHlwZVxuICAgKi9cbiAgb25UeXBlQ2hhbmdlKGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gJ2ZoaXJwYXRoJykge1xuICAgICAgdGhpcy52YXJpYWJsZVNlcnZpY2UuY2hlY2tBZHZhbmNlZEludGVyZmFjZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTmVlZCB0byBjaGVjayBhbGwgb3RoZXIgdmFyaWFibGVzIGFuZCB0aGUgZmluYWwgZXhwcmVzc2lvbiBiZWZvcmUgd2VcbiAgICAgIC8vIGFsbG93IHRoZSBhZHZhbmNlZCBpbnRlcmZhY2UgdG8gYmUgcmVtb3ZlZFxuICAgICAgdGhpcy52YXJpYWJsZVNlcnZpY2UuY2hlY2tBZHZhbmNlZEludGVyZmFjZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhcmlhYmxlU2VydmljZS5uZWVkc0FkdmFuY2VkSW50ZXJmYWNlKSB7XG4gICAgICB0aGlzLmFkdmFuY2VkSW50ZXJmYWNlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZGlzYWJsZUludGVyZmFjZVRvZ2dsZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZUludGVyZmFjZVRvZ2dsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19
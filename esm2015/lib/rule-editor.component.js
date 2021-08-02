import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from './rule-editor.service';
export class RuleEditorComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.lhcStyle = {};
        this.save = new EventEmitter();
        this.datePipe = new DatePipe('en-US');
        this.suggestions = [];
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
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
            this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
        }
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.calculateSum = this.variableService.mightBeScore;
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
            this.calculateSum = mightBeScore;
        });
        this.finalExpression = this.variableService.finalExpression;
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
            this.finalExpression = finalExpression;
        });
        this.variables = this.variableService.variables.map(e => e.label);
        this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
            this.variables = variables.map(e => e.label);
        });
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
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<lhc-calculate-sum-prompt *ngIf=\"calculateSum\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Simple Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter [expression]=\"simpleExpression\" [variables]=\"variables\" *ngSwitchCase=\"'simple'\" (expressionChange)=\"updateFinalExpression($event)\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n    </div>\n    <div *ngIf=\"suggestions.length\">{{suggestions|json}}</div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 auto}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
            },] }
];
RuleEditorComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
RuleEditorComponent.propDecorators = {
    fhirQuestionnaire: [{ type: Input }],
    itemLinkId: [{ type: Input }],
    submitButtonName: [{ type: Input }],
    titleName: [{ type: Input }],
    expressionLabel: [{ type: Input }],
    expressionUri: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    save: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9ydWxlLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFRdkUsTUFBTSxPQUFPLG1CQUFtQjtJQXdCOUIsWUFBb0IsZUFBa0M7UUFBbEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBdkI3QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxRQUFRLENBQUM7UUFDNUIsY0FBUyxHQUFHLGFBQWEsQ0FBQztRQUMxQixvQkFBZSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsdUZBQXVGLENBQUM7UUFDeEcsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDMUIsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFPNUMsYUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWpDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBT3dDLENBQUM7SUFFMUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLElB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eUJBQ0wsS0FBSzsrQkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7bUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFJhZGlvQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuXG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSwgU2ltcGxlU3R5bGUgfSBmcm9tICcuL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xoYy1ydWxlLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAncnVsZS1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncnVsZS1lZGl0b3IuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGVFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBmaGlyUXVlc3Rpb25uYWlyZSA9IG51bGw7XG4gIEBJbnB1dCgpIGl0ZW1MaW5rSWQgPSBudWxsO1xuICBASW5wdXQoKSBzdWJtaXRCdXR0b25OYW1lID0gJ1N1Ym1pdCc7XG4gIEBJbnB1dCgpIHRpdGxlTmFtZSA9ICdSdWxlIEVkaXRvcic7XG4gIEBJbnB1dCgpIGV4cHJlc3Npb25MYWJlbCA9ICdGaW5hbCBFeHByZXNzaW9uJztcbiAgQElucHV0KCkgZXhwcmVzc2lvblVyaSA9ICdodHRwOi8vaGw3Lm9yZy9maGlyL3V2L3NkYy9TdHJ1Y3R1cmVEZWZpbml0aW9uL3NkYy1xdWVzdGlvbm5haXJlLWNhbGN1bGF0ZWRFeHByZXNzaW9uJztcbiAgQElucHV0KCkgbGhjU3R5bGU6IFNpbXBsZVN0eWxlID0ge307XG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgZXhwcmVzc2lvblN5bnRheDogc3RyaW5nO1xuICBzaW1wbGVFeHByZXNzaW9uOiBzdHJpbmc7XG4gIGZpbmFsRXhwcmVzc2lvbjogc3RyaW5nO1xuICBmaW5hbEV4cHJlc3Npb25GaGlyUGF0aDogc3RyaW5nO1xuICBsaW5rSWRDb250ZXh0OiBzdHJpbmc7XG4gIGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpO1xuICBjYWxjdWxhdGVTdW06IGJvb2xlYW47XG4gIHN1Z2dlc3Rpb25zID0gW107XG4gIHZhcmlhYmxlczogc3RyaW5nW107XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVTdW1TdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZmluYWxFeHByZXNzaW9uU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHZhcmlhYmxlc1N1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhcmlhYmxlU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgbmdEZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5maW5hbEV4cHJlc3Npb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnZhcmlhYmxlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIG9uIGlucHV0IGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKGFyZ3MpOiB2b2lkIHtcbiAgICB0aGlzLnJlbG9hZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlLWltcG9ydCBmaGlyIGFuZCBjb250ZXh0IGFuZCBzaG93IHRoZSBmb3JtXG4gICAqL1xuICByZWxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmhpclF1ZXN0aW9ubmFpcmUgIT09IG51bGwgJiYgdGhpcy5pdGVtTGlua0lkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnZhcmlhYmxlU2VydmljZS5pbXBvcnQodGhpcy5leHByZXNzaW9uVXJpLCB0aGlzLmZoaXJRdWVzdGlvbm5haXJlLCB0aGlzLml0ZW1MaW5rSWQpO1xuICAgIH1cblxuICAgIHRoaXMuc2ltcGxlRXhwcmVzc2lvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLnNpbXBsZUV4cHJlc3Npb247XG4gICAgdGhpcy5saW5rSWRDb250ZXh0ID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubGlua0lkQ29udGV4dDtcbiAgICB0aGlzLmV4cHJlc3Npb25TeW50YXggPSB0aGlzLnZhcmlhYmxlU2VydmljZS5zeW50YXhUeXBlO1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlO1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtU3Vic2NyaXB0aW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlQ2hhbmdlLnN1YnNjcmliZSgobWlnaHRCZVNjb3JlKSA9PiB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVN1bSA9IG1pZ2h0QmVTY29yZTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmZpbmFsRXhwcmVzc2lvbjtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvblN1YnNjcmlwdGlvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmZpbmFsRXhwcmVzc2lvbkNoYW5nZS5zdWJzY3JpYmUoKGZpbmFsRXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSBmaW5hbEV4cHJlc3Npb247XG4gICAgfSk7XG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YXJpYWJsZXMubWFwKGUgPT4gZS5sYWJlbCk7XG4gICAgdGhpcy52YXJpYWJsZXNTdWJzY3JpcHRpb24gPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YXJpYWJsZXNDaGFuZ2Uuc3Vic2NyaWJlKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCBGSElSIFF1ZXN0aW9ubmFpcmUgYW5kIGRvd25sb2FkIGFzIGEgZmlsZVxuICAgKi9cbiAgZXhwb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMudmFyaWFibGVTZXJ2aWNlLmV4cG9ydCh0aGlzLmV4cHJlc3Npb25VcmksIHRoaXMuZmluYWxFeHByZXNzaW9uKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgRkhJUiBxdWVzdGlvbm5haXJlIGZpbGUgYnkgc3VtbWluZyBhbGwgb3JkaW5hbFxuICAgKiB2YWx1ZXNcbiAgICovXG4gIGFkZFN1bU9mU2NvcmVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMudmFyaWFibGVTZXJ2aWNlLmFkZFN1bU9mU2NvcmVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBzeW50YXggdHlwZSBpcyBjaGFuZ2VkIHRvIGNsZWFuIHVwIGV4cHJlc3Npb25zIGlmIHRoZSBkYXRhIGNhbm5vdCBiZSBjb252ZXJ0ZWRcbiAgICogQHBhcmFtICRldmVudCAtIGV2ZW50IGZyb20gZnJvbSB0aGUgY2FsbGVyXG4gICAqL1xuICBvblN5bnRheENoYW5nZSgkZXZlbnQ6IE1hdFJhZGlvQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3U3ludGF4ID0gJGV2ZW50LnZhbHVlO1xuXG4gICAgLy8gQ2xlYXIgdGhlIGV4aXN0aW5nIGV4cHJlc3Npb24gaWYgc3dpdGNoaW5nIGF3YXkgZnJvbSBmaGlycGF0aFxuICAgIGlmIChuZXdTeW50YXggPT09ICdzaW1wbGUnKSB7XG4gICAgICB0aGlzLmZpbmFsRXhwcmVzc2lvbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMudmFyaWFibGVTZXJ2aWNlLnN5bnRheFR5cGUgPSBuZXdTeW50YXg7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBmaW5hbCBleHByZXNzaW9uXG4gICAqL1xuICB1cGRhdGVGaW5hbEV4cHJlc3Npb24oZXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuZmluYWxFeHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbiAgfVxufVxuIl19
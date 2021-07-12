import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from './rule-editor.service';
export class RuleEditorComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.save = new EventEmitter();
        this.advancedInterface = true;
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
    ngOnChanges() {
        this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */
    reload() {
        if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
            this.variableService.import(this.fhirQuestionnaire, this.itemLinkId);
        }
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
     * Import uploaded data as a FHIR Questionnaire
     * @param fileInput - Form file upload
     */
    import(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                if (typeof e.target.result === 'string') {
                    try {
                        const input = JSON.parse(e.target.result);
                        this.variableService.import(input, this.linkIdContext);
                    }
                    catch (e) {
                        console.error('Could not parse file', e);
                    }
                }
                else {
                    console.error('Could not read file');
                }
            };
            fileReader.readAsText(fileInput.target.files[0]);
        }
        fileInput.target.value = '';
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export() {
        this.save.emit(this.variableService.export(this.finalExpression));
    }
    /**
     * Export FHIR questionnaire file by summing all ordinal values
     */
    exportSumOfScores() {
        this.save.emit(this.variableService.exportSumOfScores());
    }
    /**
     * Download data as a file
     * @param data - Object which will this function will call JSON.stringify on
     * @param fileName - File name to download as
     * @private
     */
    downloadAsFile(data, fileName) {
        const blob = new Blob([
            JSON.stringify(data, null, 2)
        ]);
        const date = this.datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');
        fileName = fileName ? fileName : `fhirpath-${date}.json`;
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
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
     * @param expression
     */
    updateFinalExpression(expression) {
        this.finalExpression = expression;
    }
}
RuleEditorComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<lhc-calculate-sum-prompt *ngIf=\"calculateSum\" (export)=\"exportSumOfScores()\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum\">\n  <h1>{{titleName}}</h1>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2>Final Expression</h2>\n\n<!--    <div *ngIf=\"advancedInterface\">-->\n<!--      <mat-radio-group [(ngModel)]=\"expressionSyntax\" (change)=\"onSyntaxChange($event)\" aria-label=\"Select an option\">-->\n<!--        <mat-radio-button value=\"simple\">Simple Expression Syntax</mat-radio-button>-->\n<!--        <mat-radio-button value=\"fhirpath\">FHIRPath Expression Syntax</mat-radio-button>-->\n<!--      </mat-radio-group>-->\n<!--    </div>-->\n\n    <div class=\"container\">\n      <div class=\"row form-group\">\n        <div class=\"col-md-3\">\n          <div class=\"form-inline\">\n            <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" aria-label=\"Expression syntax type\">\n              <option value=\"simple\">Simple Expression</option>\n              <option value=\"fhirpath\">FHIRPath Expression</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col-md-9\" [ngSwitch]=\"expressionSyntax\">\n          <lhc-syntax-converter [variables]=\"variables\" *ngSwitchCase=\"'simple'\" (expressionChange)=\"updateFinalExpression($event)\" class=\"form-inline\"></lhc-syntax-converter>\n          <input aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\">\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"suggestions.length\">{{suggestions|json}}</div>\n  </section>\n\n  <button class=\"btn btn-primary py-2 px-5\" (click)=\"export()\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}"]
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
    save: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZS1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9ydWxlLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFRMUQsTUFBTSxPQUFPLG1CQUFtQjtJQXFCOUIsWUFBb0IsZUFBa0M7UUFBbEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBcEI3QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxRQUFRLENBQUM7UUFFM0IsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHNUMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBSXpCLGFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQU93QyxDQUFDO0lBRTFEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGlCQUFpQixL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QUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxNQUFzQjtRQUNuQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRS9CLGdFQUFnRTtRQUNoRSxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFxQixDQUFDLFVBQVU7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQzs7O1lBaktGLFNBQVMsU0FBQztnQkFDVCw4Q0FBOEM7Z0JBQzlDLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHdpRUFBeUM7O2FBRTFDOzs7WUFQUSxpQkFBaUI7OztnQ0FTdkIsS0FBSzt5QkFDTCxLQUFLOytCQUNMLEtBQUs7d0JBQ0wsS0FBSzttQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UmFkaW9DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5cbmltcG9ydCB7IFJ1bGVFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi9ydWxlLWVkaXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdsaGMtcnVsZS1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ3J1bGUtZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3J1bGUtZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSdWxlRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZmhpclF1ZXN0aW9ubmFpcmUgPSBudWxsO1xuICBASW5wdXQoKSBpdGVtTGlua0lkID0gbnVsbDtcbiAgQElucHV0KCkgc3VibWl0QnV0dG9uTmFtZSA9ICdTdWJtaXQnO1xuICBASW5wdXQoKSB0aXRsZU5hbWU6IHN0cmluZztcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBleHByZXNzaW9uU3ludGF4OiBzdHJpbmc7XG4gIGFkdmFuY2VkSW50ZXJmYWNlID0gdHJ1ZTtcbiAgZmluYWxFeHByZXNzaW9uOiBzdHJpbmc7XG4gIGZpbmFsRXhwcmVzc2lvbkZoaXJQYXRoOiBzdHJpbmc7XG4gIGxpbmtJZENvbnRleHQ6IHN0cmluZztcbiAgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUoJ2VuLVVTJyk7XG4gIGNhbGN1bGF0ZVN1bTogYm9vbGVhbjtcbiAgc3VnZ2VzdGlvbnMgPSBbXTtcbiAgdmFyaWFibGVzOiBzdHJpbmdbXTtcblxuICBwcml2YXRlIGNhbGN1bGF0ZVN1bVN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBmaW5hbEV4cHJlc3Npb25TdWJzY3JpcHRpb247XG4gIHByaXZhdGUgdmFyaWFibGVzU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFyaWFibGVTZXJ2aWNlOiBSdWxlRWRpdG9yU2VydmljZSkge31cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAqL1xuICBuZ0Rlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjdWxhdGVTdW1TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudmFyaWFibGVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBjYWxsZWQgb24gaW5wdXQgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5yZWxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZS1pbXBvcnQgZmhpciBhbmQgY29udGV4dCBhbmQgc2hvdyB0aGUgZm9ybVxuICAgKi9cbiAgcmVsb2FkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZoaXJRdWVzdGlvbm5haXJlICE9PSBudWxsICYmIHRoaXMuaXRlbUxpbmtJZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy52YXJpYWJsZVNlcnZpY2UuaW1wb3J0KHRoaXMuZmhpclF1ZXN0aW9ubmFpcmUsIHRoaXMuaXRlbUxpbmtJZCk7XG4gICAgfVxuXG4gICAgdGhpcy5saW5rSWRDb250ZXh0ID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubGlua0lkQ29udGV4dDtcbiAgICB0aGlzLmV4cHJlc3Npb25TeW50YXggPSB0aGlzLnZhcmlhYmxlU2VydmljZS5zeW50YXhUeXBlO1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlO1xuICAgIHRoaXMuY2FsY3VsYXRlU3VtU3Vic2NyaXB0aW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UubWlnaHRCZVNjb3JlQ2hhbmdlLnN1YnNjcmliZSgobWlnaHRCZVNjb3JlKSA9PiB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVN1bSA9IG1pZ2h0QmVTY29yZTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmZpbmFsRXhwcmVzc2lvbjtcbiAgICB0aGlzLmZpbmFsRXhwcmVzc2lvblN1YnNjcmlwdGlvbiA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLmZpbmFsRXhwcmVzc2lvbkNoYW5nZS5zdWJzY3JpYmUoKGZpbmFsRXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSBmaW5hbEV4cHJlc3Npb247XG4gICAgfSk7XG4gICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YXJpYWJsZXMubWFwKGUgPT4gZS5sYWJlbCk7XG4gICAgdGhpcy52YXJpYWJsZXNTdWJzY3JpcHRpb24gPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YXJpYWJsZXNDaGFuZ2Uuc3Vic2NyaWJlKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgIHRoaXMudmFyaWFibGVzID0gdmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCB1cGxvYWRlZCBkYXRhIGFzIGEgRkhJUiBRdWVzdGlvbm5haXJlXG4gICAqIEBwYXJhbSBmaWxlSW5wdXQgLSBGb3JtIGZpbGUgdXBsb2FkXG4gICAqL1xuICBpbXBvcnQoZmlsZUlucHV0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVJbnB1dC50YXJnZXQuZmlsZXMgJiYgZmlsZUlucHV0LnRhcmdldC5maWxlc1swXSkge1xuICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBlLnRhcmdldC5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuXG4gICAgICAgICAgICB0aGlzLnZhcmlhYmxlU2VydmljZS5pbXBvcnQoaW5wdXQsIHRoaXMubGlua0lkQ29udGV4dCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IHBhcnNlIGZpbGUnLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IHJlYWQgZmlsZScpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZUlucHV0LnRhcmdldC5maWxlc1swXSk7XG4gICAgfVxuICAgIGZpbGVJbnB1dC50YXJnZXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgRkhJUiBRdWVzdGlvbm5haXJlIGFuZCBkb3dubG9hZCBhcyBhIGZpbGVcbiAgICovXG4gIGV4cG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLnNhdmUuZW1pdCh0aGlzLnZhcmlhYmxlU2VydmljZS5leHBvcnQodGhpcy5maW5hbEV4cHJlc3Npb24pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgRkhJUiBxdWVzdGlvbm5haXJlIGZpbGUgYnkgc3VtbWluZyBhbGwgb3JkaW5hbCB2YWx1ZXNcbiAgICovXG4gIGV4cG9ydFN1bU9mU2NvcmVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2F2ZS5lbWl0KHRoaXMudmFyaWFibGVTZXJ2aWNlLmV4cG9ydFN1bU9mU2NvcmVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvd25sb2FkIGRhdGEgYXMgYSBmaWxlXG4gICAqIEBwYXJhbSBkYXRhIC0gT2JqZWN0IHdoaWNoIHdpbGwgdGhpcyBmdW5jdGlvbiB3aWxsIGNhbGwgSlNPTi5zdHJpbmdpZnkgb25cbiAgICogQHBhcmFtIGZpbGVOYW1lIC0gRmlsZSBuYW1lIHRvIGRvd25sb2FkIGFzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGRvd25sb2FkQXNGaWxlKGRhdGEsIGZpbGVOYW1lPyk6IHZvaWQge1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXG4gICAgICBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKVxuICAgIF0pO1xuXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKERhdGUubm93KCksICd5eXl5TU1kZC1oaG1tc3MnKTtcblxuICAgIGZpbGVOYW1lID0gZmlsZU5hbWUgPyBmaWxlTmFtZSA6IGBmaGlycGF0aC0ke2RhdGV9Lmpzb25gO1xuXG4gICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgZmlsZU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIGEuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lJyk7XG4gICAgICBhLmhyZWYgPSB1cmw7XG4gICAgICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gICAgICBhLmNsaWNrKCk7XG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgYS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHN5bnRheCB0eXBlIGlzIGNoYW5nZWQgdG8gY2xlYW4gdXAgZXhwcmVzc2lvbnMgaWYgdGhlIGRhdGEgY2Fubm90IGJlIGNvbnZlcnRlZFxuICAgKiBAcGFyYW0gJGV2ZW50IC0gZXZlbnQgZnJvbSBmcm9tIHRoZSBjYWxsZXJcbiAgICovXG4gIG9uU3ludGF4Q2hhbmdlKCRldmVudDogTWF0UmFkaW9DaGFuZ2UpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdTeW50YXggPSAkZXZlbnQudmFsdWU7XG5cbiAgICAvLyBDbGVhciB0aGUgZXhpc3RpbmcgZXhwcmVzc2lvbiBpZiBzd2l0Y2hpbmcgYXdheSBmcm9tIGZoaXJwYXRoXG4gICAgaWYgKG5ld1N5bnRheCA9PT0gJ3NpbXBsZScpIHtcbiAgICAgIHRoaXMuZmluYWxFeHByZXNzaW9uID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy52YXJpYWJsZVNlcnZpY2Uuc3ludGF4VHlwZSA9IG5ld1N5bnRheDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGZpbmFsIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIGV4cHJlc3Npb25cbiAgICovXG4gIHVwZGF0ZUZpbmFsRXhwcmVzc2lvbihleHByZXNzaW9uKTogdm9pZCB7XG4gICAgdGhpcy5maW5hbEV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB9XG59XG4iXX0=
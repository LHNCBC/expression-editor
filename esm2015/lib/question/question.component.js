import { Component, Input } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { UNIT_CONVERSION } from '../units';
export class QuestionComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.linkId = '';
        this.itemHasScore = false;
        this.isNonConvertibleUnit = false;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.linkId = this.variable.linkId ? this.variable.linkId : '';
        this.toUnit = this.variable.unit ? this.variable.unit : '';
        this.questions = this.variableService.questions;
        this.onChange(false);
        this.variableService.questionsChange.subscribe((questions) => {
            this.questions = questions;
        });
    }
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */
    getQuestion(linkId) {
        return this.questions.find((q) => {
            return q.linkId === linkId;
        });
    }
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */
    getConversionOptions(unit) {
        return UNIT_CONVERSION[unit];
    }
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */
    onChange(isQuestion) {
        if (isQuestion) {
            // Reset the conversion options when the question changes
            this.toUnit = '';
        }
        // If we already have a question selected (as opposed to the select... prompt)
        if (this.linkId) {
            const question = this.getQuestion(this.linkId);
            this.unit = question === null || question === void 0 ? void 0 : question.unit;
            this.conversionOptions = this.getConversionOptions(this.unit);
            this.isNonConvertibleUnit = this.unit && !this.conversionOptions;
            // Check if this is a score
            if (!this.conversionOptions && !this.isNonConvertibleUnit) {
                this.itemHasScore = this.variableService.itemHasScore(this.linkId);
            }
            else {
                this.itemHasScore = false;
            }
            this.variable.expression = this.variableService.valueOrScoreExpression(this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
        }
    }
}
QuestionComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-question',
                template: "<div class=\"form-inline\">\n  <select class=\"question-select form-control mr-2 w-50\" [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" aria-label=\"Question\">\n    <option value=\"\" disabled hidden>Select...</option>\n    <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n      {{question.text}}{{advancedInterface ? ' (' + question.linkId + ')' : ''}}\n    </option>\n  </select>\n\n  <select class=\"unit-select form-control\" style=\"width: 40%\" *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\"\n          (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n    <option value=\"\">Keep form units ({{unit}})</option>\n    <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n  </select>\n  <span *ngIf=\"isNonConvertibleUnit\">{{unit}}</span>\n  <span *ngIf=\"itemHasScore\">Score</span>\n\n  <lhc-syntax-preview [syntax]=\"variable.expression\"></lhc-syntax-preview>\n</div>\n"
            },] }
];
QuestionComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
QuestionComponent.propDecorators = {
    variable: [{ type: Input }],
    advancedInterface: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9xdWVzdGlvbi9xdWVzdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsS0FBSyxFQUFrQixNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQVEsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBTWpELE1BQU0sT0FBTyxpQkFBaUI7SUFXNUIsWUFBb0IsZUFBa0M7UUFBbEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBUnRELFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7SUFLNEIsQ0FBQztJQUUxRDs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVcsQ0FBQyxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQixPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLElBQVk7UUFDL0IsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxVQUFVO1FBQ2pCLElBQUksVUFBVSxFQUFFO1lBQ2QseURBQXlEO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBRUQsOEVBQThFO1FBQzlFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUVqRSwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUNwRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkY7SUFDSCxDQUFDOzs7WUE3RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixzOUJBQXdDO2FBQ3pDOzs7WUFOUSxpQkFBaUI7Ozt1QkFRdkIsS0FBSztnQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi92YXJpYWJsZSc7XG5pbXBvcnQgeyBSdWxlRWRpdG9yU2VydmljZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdCwgVU5JVF9DT05WRVJTSU9OIH0gZnJvbSAnLi4vdW5pdHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtcXVlc3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcXVlc3Rpb24uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdmFyaWFibGU7XG4gIEBJbnB1dCgpIGFkdmFuY2VkSW50ZXJmYWNlO1xuICBsaW5rSWQgPSAnJztcbiAgcXVlc3Rpb25zOiBRdWVzdGlvbltdO1xuICBpdGVtSGFzU2NvcmUgPSBmYWxzZTtcbiAgaXNOb25Db252ZXJ0aWJsZVVuaXQgPSBmYWxzZTtcbiAgdG9Vbml0OiBzdHJpbmc7XG4gIHVuaXQ6IHN0cmluZztcbiAgY29udmVyc2lvbk9wdGlvbnM6IFVuaXRbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhcmlhYmxlU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2sgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rSWQgPSB0aGlzLnZhcmlhYmxlLmxpbmtJZCA/IHRoaXMudmFyaWFibGUubGlua0lkIDogJyc7XG4gICAgdGhpcy50b1VuaXQgPSB0aGlzLnZhcmlhYmxlLnVuaXQgPyB0aGlzLnZhcmlhYmxlLnVuaXQgOiAnJztcbiAgICB0aGlzLnF1ZXN0aW9ucyA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLnF1ZXN0aW9ucztcblxuICAgIHRoaXMub25DaGFuZ2UoZmFsc2UpO1xuXG4gICAgdGhpcy52YXJpYWJsZVNlcnZpY2UucXVlc3Rpb25zQ2hhbmdlLnN1YnNjcmliZSgocXVlc3Rpb25zKSA9PiB7XG4gICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHF1ZXN0aW9uIGJhc2VkIG9uIGxpbmtJZFxuICAgKiBAcGFyYW0gbGlua0lkIC0gRkhJUiBsaW5rSWRcbiAgICovXG4gIGdldFF1ZXN0aW9uKGxpbmtJZCk6IFF1ZXN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnMuZmluZCgocSkgPT4ge1xuICAgICAgcmV0dXJuIHEubGlua0lkID09PSBsaW5rSWQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsaXN0IG9mIHVuaXRzIHdlIGNhbiBjb252ZXJ0IHRvIGJhc2VkIG9uIHRoZSBzdGFydGluZyB1bml0XG4gICAqIEBwYXJhbSB1bml0IC0gU3RhcnRpbmcgdW5pdFxuICAgKi9cbiAgZ2V0Q29udmVyc2lvbk9wdGlvbnModW5pdDogc3RyaW5nKTogVW5pdFtdIHtcbiAgICByZXR1cm4gVU5JVF9DT05WRVJTSU9OW3VuaXRdO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBxdWVzdGlvbm5haXJlIHF1ZXN0aW9uIG9yIHVuaXQgaXMgY2hhbmdlZFxuICAgKiBAcGFyYW0gaXNRdWVzdGlvbiAtIFRoZSBjaGFuZ2Ugd2FzIGZvciBhIHF1ZXN0aW9uXG4gICAqL1xuICBvbkNoYW5nZShpc1F1ZXN0aW9uKTogdm9pZCB7XG4gICAgaWYgKGlzUXVlc3Rpb24pIHtcbiAgICAgIC8vIFJlc2V0IHRoZSBjb252ZXJzaW9uIG9wdGlvbnMgd2hlbiB0aGUgcXVlc3Rpb24gY2hhbmdlc1xuICAgICAgdGhpcy50b1VuaXQgPSAnJztcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgYSBxdWVzdGlvbiBzZWxlY3RlZCAoYXMgb3Bwb3NlZCB0byB0aGUgc2VsZWN0Li4uIHByb21wdClcbiAgICBpZiAodGhpcy5saW5rSWQpIHtcbiAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbih0aGlzLmxpbmtJZCk7XG4gICAgICB0aGlzLnVuaXQgPSBxdWVzdGlvbj8udW5pdDtcbiAgICAgIHRoaXMuY29udmVyc2lvbk9wdGlvbnMgPSB0aGlzLmdldENvbnZlcnNpb25PcHRpb25zKHRoaXMudW5pdCk7XG4gICAgICB0aGlzLmlzTm9uQ29udmVydGlibGVVbml0ID0gdGhpcy51bml0ICYmICF0aGlzLmNvbnZlcnNpb25PcHRpb25zO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgc2NvcmVcbiAgICAgIGlmICghdGhpcy5jb252ZXJzaW9uT3B0aW9ucyAmJiAhdGhpcy5pc05vbkNvbnZlcnRpYmxlVW5pdCkge1xuICAgICAgICB0aGlzLml0ZW1IYXNTY29yZSA9IHRoaXMudmFyaWFibGVTZXJ2aWNlLml0ZW1IYXNTY29yZSh0aGlzLmxpbmtJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLml0ZW1IYXNTY29yZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnZhcmlhYmxlLmV4cHJlc3Npb24gPSB0aGlzLnZhcmlhYmxlU2VydmljZS52YWx1ZU9yU2NvcmVFeHByZXNzaW9uKFxuICAgICAgICB0aGlzLmxpbmtJZCwgdGhpcy5pdGVtSGFzU2NvcmUsICF0aGlzLmlzTm9uQ29udmVydGlibGVVbml0LCB0aGlzLnVuaXQsIHRoaXMudG9Vbml0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
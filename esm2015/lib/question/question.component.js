import { Component, Input } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { UNIT_CONVERSION } from '../units';
export class QuestionComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.lhcStyle = {};
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
                template: "<div class=\"form-inline question\">\n  <div class=\"question-select\">\n    <select [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" [style]=\"lhcStyle.select\" aria-label=\"Question\">\n      <option value=\"\" disabled hidden>Select...</option>\n      <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n        {{question.text + ' (' + question.linkId + ')'}}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"unit-select\">\n    <select *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\" [style]=\"lhcStyle.select\"\n            (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n      <option value=\"\">Keep form units ({{unit}})</option>\n      <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n    </select>\n\n    <div *ngIf=\"isNonConvertibleUnit\" class=\"detail\">{{unit}}</div>\n    <div *ngIf=\"itemHasScore\" class=\"detail\">Score</div>\n  </div>\n</div>\n\n<lhc-syntax-preview [syntax]=\"variable.expression\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-preview>\n",
                styles: [".question{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.question-select{flex:50%;padding-right:.5rem}.unit-select{flex:50%;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            },] }
];
QuestionComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
QuestionComponent.propDecorators = {
    variable: [{ type: Input }],
    lhcStyle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9xdWVzdGlvbi9xdWVzdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsS0FBSyxFQUFrQixNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQVEsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBT2pELE1BQU0sT0FBTyxpQkFBaUI7SUFXNUIsWUFBb0IsZUFBa0M7UUFBbEMsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBVDdDLGFBQVEsR0FBZ0IsRUFBRSxDQUFDO1FBQ3BDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7SUFLNEIsQ0FBQztJQUUxRDs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVcsQ0FBQyxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQixPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLElBQVk7UUFDL0IsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxVQUFVO1FBQ2pCLElBQUksVUFBVSxFQUFFO1lBQ2QseURBQXlEO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBRUQsOEVBQThFO1FBQzlFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUVqRSwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUNwRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkY7SUFDSCxDQUFDOzs7WUE5RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QiwwakNBQXdDOzthQUV6Qzs7O1lBUFEsaUJBQWlCOzs7dUJBU3ZCLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vdmFyaWFibGUnO1xuaW1wb3J0IHsgUnVsZUVkaXRvclNlcnZpY2UsIFNpbXBsZVN0eWxlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBVbml0LCBVTklUX0NPTlZFUlNJT04gfSBmcm9tICcuLi91bml0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1xdWVzdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9xdWVzdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3F1ZXN0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHZhcmlhYmxlO1xuICBASW5wdXQoKSBsaGNTdHlsZTogU2ltcGxlU3R5bGUgPSB7fTtcbiAgbGlua0lkID0gJyc7XG4gIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgaXRlbUhhc1Njb3JlID0gZmFsc2U7XG4gIGlzTm9uQ29udmVydGlibGVVbml0ID0gZmFsc2U7XG4gIHRvVW5pdDogc3RyaW5nO1xuICB1bml0OiBzdHJpbmc7XG4gIGNvbnZlcnNpb25PcHRpb25zOiBVbml0W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YXJpYWJsZVNlcnZpY2U6IFJ1bGVFZGl0b3JTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWRcbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGlua0lkID0gdGhpcy52YXJpYWJsZS5saW5rSWQgPyB0aGlzLnZhcmlhYmxlLmxpbmtJZCA6ICcnO1xuICAgIHRoaXMudG9Vbml0ID0gdGhpcy52YXJpYWJsZS51bml0ID8gdGhpcy52YXJpYWJsZS51bml0IDogJyc7XG4gICAgdGhpcy5xdWVzdGlvbnMgPSB0aGlzLnZhcmlhYmxlU2VydmljZS5xdWVzdGlvbnM7XG5cbiAgICB0aGlzLm9uQ2hhbmdlKGZhbHNlKTtcblxuICAgIHRoaXMudmFyaWFibGVTZXJ2aWNlLnF1ZXN0aW9uc0NoYW5nZS5zdWJzY3JpYmUoKHF1ZXN0aW9ucykgPT4ge1xuICAgICAgdGhpcy5xdWVzdGlvbnMgPSBxdWVzdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBxdWVzdGlvbiBiYXNlZCBvbiBsaW5rSWRcbiAgICogQHBhcmFtIGxpbmtJZCAtIEZISVIgbGlua0lkXG4gICAqL1xuICBnZXRRdWVzdGlvbihsaW5rSWQpOiBRdWVzdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMucXVlc3Rpb25zLmZpbmQoKHEpID0+IHtcbiAgICAgIHJldHVybiBxLmxpbmtJZCA9PT0gbGlua0lkO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiB1bml0cyB3ZSBjYW4gY29udmVydCB0byBiYXNlZCBvbiB0aGUgc3RhcnRpbmcgdW5pdFxuICAgKiBAcGFyYW0gdW5pdCAtIFN0YXJ0aW5nIHVuaXRcbiAgICovXG4gIGdldENvbnZlcnNpb25PcHRpb25zKHVuaXQ6IHN0cmluZyk6IFVuaXRbXSB7XG4gICAgcmV0dXJuIFVOSVRfQ09OVkVSU0lPTlt1bml0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgcXVlc3Rpb25uYWlyZSBxdWVzdGlvbiBvciB1bml0IGlzIGNoYW5nZWRcbiAgICogQHBhcmFtIGlzUXVlc3Rpb24gLSBUaGUgY2hhbmdlIHdhcyBmb3IgYSBxdWVzdGlvblxuICAgKi9cbiAgb25DaGFuZ2UoaXNRdWVzdGlvbik6IHZvaWQge1xuICAgIGlmIChpc1F1ZXN0aW9uKSB7XG4gICAgICAvLyBSZXNldCB0aGUgY29udmVyc2lvbiBvcHRpb25zIHdoZW4gdGhlIHF1ZXN0aW9uIGNoYW5nZXNcbiAgICAgIHRoaXMudG9Vbml0ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIGEgcXVlc3Rpb24gc2VsZWN0ZWQgKGFzIG9wcG9zZWQgdG8gdGhlIHNlbGVjdC4uLiBwcm9tcHQpXG4gICAgaWYgKHRoaXMubGlua0lkKSB7XG4gICAgICBjb25zdCBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb24odGhpcy5saW5rSWQpO1xuICAgICAgdGhpcy51bml0ID0gcXVlc3Rpb24/LnVuaXQ7XG4gICAgICB0aGlzLmNvbnZlcnNpb25PcHRpb25zID0gdGhpcy5nZXRDb252ZXJzaW9uT3B0aW9ucyh0aGlzLnVuaXQpO1xuICAgICAgdGhpcy5pc05vbkNvbnZlcnRpYmxlVW5pdCA9IHRoaXMudW5pdCAmJiAhdGhpcy5jb252ZXJzaW9uT3B0aW9ucztcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIHNjb3JlXG4gICAgICBpZiAoIXRoaXMuY29udmVyc2lvbk9wdGlvbnMgJiYgIXRoaXMuaXNOb25Db252ZXJ0aWJsZVVuaXQpIHtcbiAgICAgICAgdGhpcy5pdGVtSGFzU2NvcmUgPSB0aGlzLnZhcmlhYmxlU2VydmljZS5pdGVtSGFzU2NvcmUodGhpcy5saW5rSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVtSGFzU2NvcmUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy52YXJpYWJsZS5leHByZXNzaW9uID0gdGhpcy52YXJpYWJsZVNlcnZpY2UudmFsdWVPclNjb3JlRXhwcmVzc2lvbihcbiAgICAgICAgdGhpcy5saW5rSWQsIHRoaXMuaXRlbUhhc1Njb3JlLCAhdGhpcy5pc05vbkNvbnZlcnRpYmxlVW5pdCwgdGhpcy51bml0LCB0aGlzLnRvVW5pdCk7XG4gICAgfVxuICB9XG59XG4iXX0=
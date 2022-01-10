import { Component, Input, ViewChild } from '@angular/core';
import Def from 'autocomplete-lhc';
import { HttpClient } from '@angular/common/http';
export class QueryObservationComponent {
    constructor(http) {
        this.http = http;
        this.queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';
        this.lhcStyle = {};
    }
    ngOnInit() {
        if (this.variable !== undefined) {
            this.codes = (this.variable.codes !== undefined) ? this.variable.codes : [];
            this.timeInterval = this.variable.timeInterval || 1;
            this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
            this.expression = this.variable.expression;
        }
        else {
            this.codes = [];
        }
    }
    /**
     * After the autocomplete is ready to be interacted with fetch the name for
     * any codes already in the query search.
     */
    ngAfterViewInit() {
        this.autoComplete = new Def.Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
            tableFormat: true,
            valueCols: [0, 1],
            colHeaders: ['Text', 'LOINC Number'],
            maxSelect: '*'
        });
        this.codes.forEach((code) => {
            const matches = code.match(/http:\/\/loinc.org\|(.+)/);
            if (matches !== null) {
                const loincCode = matches[1];
                // LOINC Code
                this.http.get(`${this.queryUrl}&terms=${loincCode}`)
                    .subscribe((data) => {
                    const namePosition = 3;
                    const name = [data[namePosition][0][0], loincCode].join(' - ');
                    this.autoComplete.storeSelectedItem(name, loincCode);
                    this.autoComplete.addToSelectedArea(name);
                });
            }
            else {
                // Non-loinc code
                this.autoComplete.storeSelectedItem(code, undefined);
                this.autoComplete.addToSelectedArea(code);
            }
        });
        Def.Autocompleter.Event.observeListSelections(`autocomplete-${this.index}`, () => {
            const selectedItemData = this.autoComplete.getSelectedItemData();
            // If there is no code then this is not a loinc code and we need to get
            // the value from the array above
            this.codes = this.autoComplete.getSelectedCodes().map((code, index) => {
                return (code === undefined) ? selectedItemData[index].text : `http://loinc.org|${code}`;
            });
            this.onChange();
        });
    }
    /**
     * Angular lifecycle hook
     */
    ngOnDestroy() {
        if (this.autoComplete !== undefined) {
            this.autoComplete.destroy();
        }
    }
    /**
     * On changes update the expression and preview
     */
    onChange() {
        // Separate with URL encoded version of the comma: ','
        const codes = this.codes.join('%2C');
        this.variable.expression = this.expression =
            `Observation?code=${codes}&` +
                `date=gt{{today()-${this.timeInterval} ${this.timeIntervalUnit}}}&` +
                `patient={{%patient.id}}&_sort=-date&_count=1`;
    }
}
QueryObservationComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-query-observation',
                template: "<div class=\"form-inline query\">\n  <div class=\"query-select\">\n    <input [style]=\"lhcStyle.input\" placeholder=\"LOINC Name / LOINC Number / Other Code\"\n           class=\"query-autocomplete\" #autoComplete id=\"autocomplete-{{index}}\" />\n  </div>\n  <div class=\"time-input\">\n    <input [style]=\"lhcStyle.input\" [(ngModel)]=\"timeInterval\" (change)=\"onChange()\"\n           aria-label=\"Time interval\" type=\"number\" min=\"1\" />\n  </div>\n  <div class=\"time-select\">\n    <select [style]=\"lhcStyle.input\" [(ngModel)]=\"timeIntervalUnit\"\n            (change)=\"onChange()\" aria-label=\"Time interval units\">\n      <option value=\"days\">Day(s)</option>\n      <option value=\"weeks\">Week(s)</option>\n      <option value=\"months\">Month(s)</option>\n      <option value=\"years\">Year(s)</option>\n    </select>\n  </div>\n</div>\n<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"codes.length\">\n  x-fhir-query: <pre class=\"d-inline text-muted\" title=\"{{expression}}\">{{expression}}</pre>\n</div>\n",
                styles: [".query{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.query-select{flex:1 0 6em;padding-right:.5rem}.time-input,.time-select{flex:0 0 7em;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{margin-top:1em}.syntax-preview>pre{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
            },] }
];
QueryObservationComponent.ctorParameters = () => [
    { type: HttpClient }
];
QueryObservationComponent.propDecorators = {
    variable: [{ type: Input }],
    index: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    autoCompleteElement: [{ type: ViewChild, args: ['autoComplete',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktb2JzZXJ2YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcnVsZS1lZGl0b3Ivc3JjL2xpYi9xdWVyeS1vYnNlcnZhdGlvbi9xdWVyeS1vYnNlcnZhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUYsT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7QUFDbkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT2xELE1BQU0sT0FBTyx5QkFBeUI7SUFhcEMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVpwQyxhQUFRLEdBQUcsZ0ZBQWdGLENBQUM7UUFJbkYsYUFBUSxHQUFnQixFQUFFLENBQUM7SUFRRyxDQUFDO0lBRXhDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxRQUFRLENBQUM7WUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FD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QUFJLENBQUMsVUFBVTtZQUN4QyxvQkFBb0IsS0FBSyxHQUFHO2dCQUM1QixvQkFBb0IsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUs7Z0JBQ25FLDhDQUE4QyxDQUFDO0lBQ25ELENBQUM7OztZQWxHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsOGlDQUFpRDs7YUFFbEQ7OztZQU5RLFVBQVU7Ozt1QkFVaEIsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7a0NBQ0wsU0FBUyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaW1wbGVTdHlsZSB9IGZyb20gJy4uL3J1bGUtZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IERlZiBmcm9tICdhdXRvY29tcGxldGUtbGhjJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xoYy1xdWVyeS1vYnNlcnZhdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9xdWVyeS1vYnNlcnZhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3F1ZXJ5LW9ic2VydmF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBRdWVyeU9ic2VydmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBxdWVyeVVybCA9ICdodHRwczovL2NsaW5pY2FsdGFibGVzLm5sbS5uaWguZ292L2FwaS9sb2luY19pdGVtcy92My9zZWFyY2g/ZGY9dGV4dCxMT0lOQ19OVU0nO1xuXG4gIEBJbnB1dCgpIHZhcmlhYmxlO1xuICBASW5wdXQoKSBpbmRleDtcbiAgQElucHV0KCkgbGhjU3R5bGU6IFNpbXBsZVN0eWxlID0ge307XG4gIEBWaWV3Q2hpbGQoJ2F1dG9Db21wbGV0ZScpIGF1dG9Db21wbGV0ZUVsZW1lbnQ7XG4gIGF1dG9Db21wbGV0ZTtcbiAgY29kZXM6IEFycmF5PHN0cmluZz47XG4gIHRpbWVJbnRlcnZhbDogbnVtYmVyO1xuICB0aW1lSW50ZXJ2YWxVbml0OiBzdHJpbmc7XG4gIGV4cHJlc3Npb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFyaWFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb2RlcyA9ICh0aGlzLnZhcmlhYmxlLmNvZGVzICE9PSB1bmRlZmluZWQpID8gdGhpcy52YXJpYWJsZS5jb2RlcyA6IFtdO1xuICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSB0aGlzLnZhcmlhYmxlLnRpbWVJbnRlcnZhbCB8fCAxO1xuICAgICAgdGhpcy50aW1lSW50ZXJ2YWxVbml0ID0gdGhpcy52YXJpYWJsZS50aW1lSW50ZXJ2YWxVbml0IHx8ICdtb250aHMnO1xuICAgICAgdGhpcy5leHByZXNzaW9uID0gdGhpcy52YXJpYWJsZS5leHByZXNzaW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvZGVzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHRoZSBhdXRvY29tcGxldGUgaXMgcmVhZHkgdG8gYmUgaW50ZXJhY3RlZCB3aXRoIGZldGNoIHRoZSBuYW1lIGZvclxuICAgKiBhbnkgY29kZXMgYWxyZWFkeSBpbiB0aGUgcXVlcnkgc2VhcmNoLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0b0NvbXBsZXRlID0gbmV3IERlZi5BdXRvY29tcGxldGVyLlNlYXJjaChcbiAgICAgIHRoaXMuYXV0b0NvbXBsZXRlRWxlbWVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnF1ZXJ5VXJsLFxuICAgICAge1xuICAgICAgICB0YWJsZUZvcm1hdDogdHJ1ZSxcbiAgICAgICAgdmFsdWVDb2xzOiBbMCwgMV0sXG4gICAgICAgIGNvbEhlYWRlcnM6IFsnVGV4dCcsICdMT0lOQyBOdW1iZXInXSxcbiAgICAgICAgbWF4U2VsZWN0OiAnKidcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5jb2Rlcy5mb3JFYWNoKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtYXRjaGVzID0gY29kZS5tYXRjaCgvaHR0cDpcXC9cXC9sb2luYy5vcmdcXHwoLispLyk7XG5cbiAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGxvaW5jQ29kZSA9IG1hdGNoZXNbMV07XG4gICAgICAgIC8vIExPSU5DIENvZGVcbiAgICAgICAgdGhpcy5odHRwLmdldChgJHt0aGlzLnF1ZXJ5VXJsfSZ0ZXJtcz0ke2xvaW5jQ29kZX1gKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVQb3NpdGlvbiA9IDM7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gW2RhdGFbbmFtZVBvc2l0aW9uXVswXVswXSwgbG9pbmNDb2RlXS5qb2luKCcgLSAnKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlLnN0b3JlU2VsZWN0ZWRJdGVtKG5hbWUsIGxvaW5jQ29kZSk7XG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZS5hZGRUb1NlbGVjdGVkQXJlYShuYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vbi1sb2luYyBjb2RlXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlLnN0b3JlU2VsZWN0ZWRJdGVtKGNvZGUsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlLmFkZFRvU2VsZWN0ZWRBcmVhKGNvZGUpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBEZWYuQXV0b2NvbXBsZXRlci5FdmVudC5vYnNlcnZlTGlzdFNlbGVjdGlvbnMoYGF1dG9jb21wbGV0ZS0ke3RoaXMuaW5kZXh9YCwgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtRGF0YSA9IHRoaXMuYXV0b0NvbXBsZXRlLmdldFNlbGVjdGVkSXRlbURhdGEoKTtcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY29kZSB0aGVuIHRoaXMgaXMgbm90IGEgbG9pbmMgY29kZSBhbmQgd2UgbmVlZCB0byBnZXRcbiAgICAgIC8vIHRoZSB2YWx1ZSBmcm9tIHRoZSBhcnJheSBhYm92ZVxuICAgICAgdGhpcy5jb2RlcyA9IHRoaXMuYXV0b0NvbXBsZXRlLmdldFNlbGVjdGVkQ29kZXMoKS5tYXAoKGNvZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiAoY29kZSA9PT0gdW5kZWZpbmVkKSA/IHNlbGVjdGVkSXRlbURhdGFbaW5kZXhdLnRleHQgOiBgaHR0cDovL2xvaW5jLm9yZ3wke2NvZGV9YDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgbGlmZWN5Y2xlIGhvb2tcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9Db21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmF1dG9Db21wbGV0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9uIGNoYW5nZXMgdXBkYXRlIHRoZSBleHByZXNzaW9uIGFuZCBwcmV2aWV3XG4gICAqL1xuICBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAvLyBTZXBhcmF0ZSB3aXRoIFVSTCBlbmNvZGVkIHZlcnNpb24gb2YgdGhlIGNvbW1hOiAnLCdcbiAgICBjb25zdCBjb2RlcyA9IHRoaXMuY29kZXMuam9pbignJTJDJyk7XG5cbiAgICB0aGlzLnZhcmlhYmxlLmV4cHJlc3Npb24gPSB0aGlzLmV4cHJlc3Npb24gPVxuICAgICAgYE9ic2VydmF0aW9uP2NvZGU9JHtjb2Rlc30mYCArXG4gICAgICBgZGF0ZT1ndHt7dG9kYXkoKS0ke3RoaXMudGltZUludGVydmFsfSAke3RoaXMudGltZUludGVydmFsVW5pdH19fSZgICtcbiAgICAgIGBwYXRpZW50PXt7JXBhdGllbnQuaWR9fSZfc29ydD0tZGF0ZSZfY291bnQ9MWA7XG4gIH1cbn1cbiJdfQ==
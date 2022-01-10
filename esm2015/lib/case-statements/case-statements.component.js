import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CASE_REGEX } from '../variable';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';
export class CaseStatementsComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.expressionChange = new EventEmitter();
        this.simpleChange = new EventEmitter();
        this.STRING_REGEX = /^'(.*)'$/;
        this.pipe = new EasyPathExpressionsPipe();
        this.outputExpressions = true;
        this.cases = [{ condition: '', simpleCondition: '', output: '', simpleOutput: '' }];
        this.output = '';
    }
    /**
     * Angular lifecycle hook for initialization
     */
    ngOnInit() {
        if (this.syntax === 'fhirpath' && this.expression !== undefined) {
            this.parseIif(this.expression, 0);
        }
        else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
            this.parseSimpleCases();
        }
        this.output = this.getIif(0);
    }
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */
    parseSimpleCases() {
        this.parseIif(this.simpleExpression, 0);
        // If all output values are strings toggle off "use expressions"
        const outputString = this.cases.find(e => (!this.isString(e.simpleOutput)));
        const defaultIsString = this.isString(this.simpleDefaultCase);
        if (outputString === undefined && defaultIsString) {
            this.outputExpressions = false;
            // Remove quotes from output strings and default case
            this.cases.forEach(e => {
                e.simpleOutput = this.removeQuotes(e.simpleOutput);
            });
            this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
        }
    }
    /**
     * Checks if the expression is a string
     */
    isString(expression) {
        return this.STRING_REGEX.test(expression);
    }
    /**
     * Removes surrounding quotes
     */
    removeQuotes(expression) {
        return expression.match(this.STRING_REGEX)[1];
    }
    /**
     * Angular lifecycle hook for changes
     */
    ngOnChanges(changes) {
        if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
            this.parseSimpleCases();
            this.onChange();
        }
        else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
            this.outputExpressions = true;
            this.parseIif(this.expression, 0);
            this.onChange();
        }
    }
    /**
     * Called when adding a new case
     */
    onAdd() {
        this.cases.push({ condition: '', simpleCondition: '', output: '', simpleOutput: '' });
        this.onChange();
        // TODO select next input box that was added
    }
    /**
     * Remove the case at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.cases.splice(i, 1);
        this.onChange();
    }
    /**
     * Angular lifecycle hook for changes
     */
    onChange() {
        this.output = this.getIif(0);
        this.expressionChange.emit(this.output);
        this.simpleChange.emit(this.simpleExpression);
    }
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */
    parseIif(expression, level) {
        // If expressions don't start with iif( and end with ) they cannot be parsed
        const matches = expression.match(CASE_REGEX);
        if (matches !== null) {
            const iifContents = matches[1];
            let commaMatches = 0;
            let nestingLevel = 0;
            let comma1 = -1;
            let comma2 = -1;
            // Check where the ',' is relative to depth as indicated by parenthesis
            for (let i = 0; i < iifContents.length; i++) {
                switch (iifContents[i]) {
                    case '(':
                        nestingLevel++;
                        break;
                    case ')':
                        nestingLevel--;
                        break;
                    case ',':
                        if (nestingLevel === 0) {
                            commaMatches++;
                            if (comma1 === -1) {
                                comma1 = i;
                            }
                            else if (comma2 === -1) {
                                comma2 = i;
                            }
                        }
                        break;
                }
            }
            if (commaMatches === 2 && nestingLevel === 0) {
                // Clear out any existing cases if we have a match for iif
                if (level === 0) {
                    this.cases = [];
                }
                const condition = iifContents.substring(0, comma1).trim();
                const trueCase = iifContents.substring(comma1 + 1, comma2).trim();
                const falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();
                if (this.syntax === 'simple') {
                    const variableNames = this.ruleEditorService.variables.map(e => e.label);
                    this.cases.push({
                        simpleCondition: condition,
                        simpleOutput: trueCase,
                        condition: this.pipe.transform(condition, variableNames),
                        output: this.pipe.transform(trueCase, variableNames)
                    });
                }
                else {
                    this.cases.push({
                        condition,
                        output: trueCase
                    });
                }
                const parseResult = this.parseIif(falseCase, level + 1);
                if (parseResult === false && this.syntax !== 'simple') {
                    this.defaultCase = falseCase;
                }
                else if (parseResult === false && this.syntax === 'simple') {
                    this.simpleDefaultCase = falseCase;
                }
                return true;
            }
        }
        return false;
    }
    /**
     * Get an iif expression given a nesting level
     * @param level - nesting level
     */
    getIif(level) {
        const isSimple = this.syntax === 'simple';
        const output = this.transformIfSimple(isSimple ?
            this.cases[level].simpleOutput :
            this.cases[level].output, true);
        const condition = this.transformIfSimple(isSimple ?
            this.cases[level].simpleCondition :
            this.cases[level].condition, false);
        if (level === this.cases.length - 1) {
            const defaultCase = this.transformIfSimple(isSimple ?
                this.simpleDefaultCase : this.defaultCase, true);
            return `iif(${condition},${output},${defaultCase})`;
        }
        else {
            return `iif(${condition},${output},${this.getIif(level + 1)})`;
        }
    }
    /**
     * Transform the expression parameter if the syntax type is Easy Path,
     * otherwise return the expression. Additionally if this is an output column
     * and output expressions are off surround with quotes.
     * @param expression - Easy Path or FHIRPath expression
     * @param isOutput - True if processing an output or default value
     * @return FHIRPath Expression
     */
    transformIfSimple(expression, isOutput) {
        if (expression === undefined) {
            return '';
        }
        let processedExpression = expression;
        if (isOutput && !this.outputExpressions) {
            processedExpression = `'${processedExpression}'`; // TODO should we escape the expression?
        }
        // Convert when syntax is simple but not in the output column is outputExpressions is disabled
        if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
            return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(e => e.label));
        }
        else {
            return processedExpression;
        }
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
        this.onChange();
    }
}
CaseStatementsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lhc-case-statements',
                template: "<div class=\"container\">\n  <div class=\"case-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"case-condition-column\">When expression is true</div>\n    <div class=\"case-output-column\">\n      Output\n      <input type=\"checkbox\" id=\"output-expressions\" [(ngModel)]=\"outputExpressions\" (change)=\"onChange()\">\n      <label for=\"output-expressions\">Use expressions (strings if unchecked)</label>\n    </div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"case-row drag-case\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let caseStatement of cases; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"case-condition-column\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.condition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.simpleCondition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <span class=\"arrow\">\u2192</span>\n      </div>\n      <div class=\"case-output-column\">\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.output\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.simpleOutput\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n      </div>\n      <div class=\"case-column-actions\" *ngIf=\"cases.length > 1\">\n        <button class=\"btn btn-danger remove-case\" aria-label=\"Remove case\" title=\"Remove case\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<button id=\"add-case\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add case</button>\n\n<div class=\"case-row\">\n  <div class=\"case-condition-column\"></div>\n  <div class=\"case-output-column\">\n    <label>\n      Default output value:\n      <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [(ngModel)]=\"defaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n      <input *ngIf=\"syntax === 'simple'\" type=\"text\" [(ngModel)]=\"simpleDefaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n    </label>\n  </div>\n</div>\n<lhc-syntax-preview [lhcStyle]=\"lhcStyle\" [syntax]=\"output\"></lhc-syntax-preview>\n",
                styles: ["*{box-sizing:border-box}.case-header,.case-row{display:flex;flex-direction:row;flex-wrap:wrap}.case-header>.case-column-label{padding-left:1.6em}.case-condition-column>input,.case-output-column select{width:100%;height:2rem;font-size:1rem}.case-condition-column,.case-output-column{padding:.5rem}.case-condition-column{display:flex;flex:0 0 50%}.condition,.output{flex-grow:100}.case-actions-column{flex:auto}.case-output-column{flex:1 0 40%;min-width:0}.case-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row{flex-direction:column}.case-condition-column{flex:100%}.case-output-column{flex:20 0 10em}.case-actions-column{flex:auto}}.drag-case{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions{margin-left:2em}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow{font-size:1.6em;padding-left:.5em}.default{margin-top:.5rem}.syntax{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            },] }
];
CaseStatementsComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CaseStatementsComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    syntax: [{ type: Input }],
    simpleExpression: [{ type: Input }],
    expression: [{ type: Input }],
    expressionChange: [{ type: Output }],
    simpleChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1zdGF0ZW1lbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvY2FzZS1zdGF0ZW1lbnRzL2Nhc2Utc3RhdGVtZW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQTJCLE1BQU0sYUFBYSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBT3hFLE1BQU0sT0FBTyx1QkFBdUI7SUFpQmxDLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBaEIvQyxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUsxQixxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVwRCxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixTQUFJLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQ3JDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUd6QixVQUFLLEdBQXlCLENBQUMsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNuRyxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWdELENBQUM7SUFFN0Q7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJ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QUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRzthQUFNO1lBQ0wsT0FBTyxtQkFBbUIsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQUMsS0FBOEI7UUFDakMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQXRQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscTJHQUErQzs7YUFFaEQ7OztZQVRRLGlCQUFpQjs7O3VCQVd2QixLQUFLO3FCQUNMLEtBQUs7K0JBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUVMLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUnVsZUVkaXRvclNlcnZpY2UsIFNpbXBsZVN0eWxlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDQVNFX1JFR0VYLCBDYXNlU3RhdGVtZW50LCBWYXJpYWJsZSB9IGZyb20gJy4uL3ZhcmlhYmxlJztcbmltcG9ydCB7IEVhc3lQYXRoRXhwcmVzc2lvbnNQaXBlIH0gZnJvbSAnLi4vZWFzeS1wYXRoLWV4cHJlc3Npb25zLnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaGMtY2FzZS1zdGF0ZW1lbnRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2Utc3RhdGVtZW50cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhc2Utc3RhdGVtZW50cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZVN0YXRlbWVudHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxoY1N0eWxlOiBTaW1wbGVTdHlsZSA9IHt9O1xuICBASW5wdXQoKSBzeW50YXg6IHN0cmluZztcbiAgQElucHV0KCkgc2ltcGxlRXhwcmVzc2lvbjogc3RyaW5nO1xuICBASW5wdXQoKSBleHByZXNzaW9uOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGV4cHJlc3Npb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHNpbXBsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIFNUUklOR19SRUdFWCA9IC9eJyguKiknJC87XG4gIHBpcGUgPSBuZXcgRWFzeVBhdGhFeHByZXNzaW9uc1BpcGUoKTtcbiAgb3V0cHV0RXhwcmVzc2lvbnMgPSB0cnVlO1xuICBkZWZhdWx0Q2FzZTogc3RyaW5nO1xuICBzaW1wbGVEZWZhdWx0Q2FzZTogc3RyaW5nO1xuICBjYXNlczogQXJyYXk8Q2FzZVN0YXRlbWVudD4gPSBbe2NvbmRpdGlvbjogJycsIHNpbXBsZUNvbmRpdGlvbjogJycsIG91dHB1dDogJycsIHNpbXBsZU91dHB1dDogJyd9XTtcbiAgb3V0cHV0ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBydWxlRWRpdG9yU2VydmljZTogUnVsZUVkaXRvclNlcnZpY2UpIHsgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rIGZvciBpbml0aWFsaXphdGlvblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ludGF4ID09PSAnZmhpcnBhdGgnICYmIHRoaXMuZXhwcmVzc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnBhcnNlSWlmKHRoaXMuZXhwcmVzc2lvbiwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bnRheCA9PT0gJ3NpbXBsZScgJiYgdGhpcy5zaW1wbGVFeHByZXNzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucGFyc2VTaW1wbGVDYXNlcygpO1xuICAgIH1cblxuICAgIHRoaXMub3V0cHV0ID0gdGhpcy5nZXRJaWYoMCk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBFYXN5IFBhdGggZXhwcmVzc2lvbiBhbmQgcG9wdWxhdGVzIHRoZSBjYXNlIGVkaXRvci4gVG9nZ2xlcyBcInVzZVxuICAgKiBleHByZXNzaW9uc1wiIG9mZiBpZiBvdXRwdXQgaXMgb25seSBzdHJpbmdzLlxuICAgKi9cbiAgcGFyc2VTaW1wbGVDYXNlcygpOiB2b2lkIHtcbiAgICB0aGlzLnBhcnNlSWlmKHRoaXMuc2ltcGxlRXhwcmVzc2lvbiwgMCk7XG5cbiAgICAvLyBJZiBhbGwgb3V0cHV0IHZhbHVlcyBhcmUgc3RyaW5ncyB0b2dnbGUgb2ZmIFwidXNlIGV4cHJlc3Npb25zXCJcbiAgICBjb25zdCBvdXRwdXRTdHJpbmcgPSB0aGlzLmNhc2VzLmZpbmQoZSA9PiAoIXRoaXMuaXNTdHJpbmcoZS5zaW1wbGVPdXRwdXQpKSk7XG4gICAgY29uc3QgZGVmYXVsdElzU3RyaW5nID0gdGhpcy5pc1N0cmluZyh0aGlzLnNpbXBsZURlZmF1bHRDYXNlKTtcblxuICAgIGlmIChvdXRwdXRTdHJpbmcgPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0SXNTdHJpbmcpIHtcbiAgICAgIHRoaXMub3V0cHV0RXhwcmVzc2lvbnMgPSBmYWxzZTtcbiAgICAgIC8vIFJlbW92ZSBxdW90ZXMgZnJvbSBvdXRwdXQgc3RyaW5ncyBhbmQgZGVmYXVsdCBjYXNlXG4gICAgICB0aGlzLmNhc2VzLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGUuc2ltcGxlT3V0cHV0ID0gdGhpcy5yZW1vdmVRdW90ZXMoZS5zaW1wbGVPdXRwdXQpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNpbXBsZURlZmF1bHRDYXNlID0gdGhpcy5yZW1vdmVRdW90ZXModGhpcy5zaW1wbGVEZWZhdWx0Q2FzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZXhwcmVzc2lvbiBpcyBhIHN0cmluZ1xuICAgKi9cbiAgaXNTdHJpbmcoZXhwcmVzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuU1RSSU5HX1JFR0VYLnRlc3QoZXhwcmVzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBzdXJyb3VuZGluZyBxdW90ZXNcbiAgICovXG4gIHJlbW92ZVF1b3RlcyhleHByZXNzaW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBleHByZXNzaW9uLm1hdGNoKHRoaXMuU1RSSU5HX1JFR0VYKVsxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rIGZvciBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuc3ludGF4ICYmIHRoaXMuc3ludGF4ID09PSAnc2ltcGxlJyAmJiBjaGFuZ2VzLnN5bnRheC5maXJzdENoYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucGFyc2VTaW1wbGVDYXNlcygpO1xuICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlcy5zeW50YXggJiYgdGhpcy5zeW50YXggPT09ICdmaGlycGF0aCcgJiYgY2hhbmdlcy5zeW50YXguZmlyc3RDaGFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLm91dHB1dEV4cHJlc3Npb25zID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyc2VJaWYodGhpcy5leHByZXNzaW9uLCAwKTtcbiAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYWRkaW5nIGEgbmV3IGNhc2VcbiAgICovXG4gIG9uQWRkKCk6IHZvaWQge1xuICAgIHRoaXMuY2FzZXMucHVzaCh7Y29uZGl0aW9uOiAnJywgc2ltcGxlQ29uZGl0aW9uOiAnJywgb3V0cHV0OiAnJywgc2ltcGxlT3V0cHV0OiAnJ30pO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICAvLyBUT0RPIHNlbGVjdCBuZXh0IGlucHV0IGJveCB0aGF0IHdhcyBhZGRlZFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgY2FzZSBhdCBhbiBpbmRleFxuICAgKiBAcGFyYW0gaSAtIGluZGV4IHRvIHJlbW92ZVxuICAgKi9cbiAgb25SZW1vdmUoaSk6IHZvaWQge1xuICAgIHRoaXMuY2FzZXMuc3BsaWNlKGksIDEpO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIGxpZmVjeWNsZSBob29rIGZvciBjaGFuZ2VzXG4gICAqL1xuICBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLm91dHB1dCA9IHRoaXMuZ2V0SWlmKDApO1xuICAgIHRoaXMuZXhwcmVzc2lvbkNoYW5nZS5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICB0aGlzLnNpbXBsZUNoYW5nZS5lbWl0KHRoaXMuc2ltcGxlRXhwcmVzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgaWlmIGV4cHJlc3Npb24gYXQgc3BlY2lmaWVkIGxldmVsLiBUb3AgbGV2ZWwgaXMgMFxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiAtIGV4cHJlc3Npb24gdG8gcGFyc2VcbiAgICogQHBhcmFtIGxldmVsIC0gZGVwdGggb3IgbGV2ZWwgb2YgZXhwcmVzc2lvbiBuZXN0aW5nXG4gICAqL1xuICBwYXJzZUlpZihleHByZXNzaW9uOiBzdHJpbmcsIGxldmVsOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvLyBJZiBleHByZXNzaW9ucyBkb24ndCBzdGFydCB3aXRoIGlpZiggYW5kIGVuZCB3aXRoICkgdGhleSBjYW5ub3QgYmUgcGFyc2VkXG4gICAgY29uc3QgbWF0Y2hlcyA9IGV4cHJlc3Npb24ubWF0Y2goQ0FTRV9SRUdFWCk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaWlmQ29udGVudHMgPSBtYXRjaGVzWzFdO1xuICAgICAgbGV0IGNvbW1hTWF0Y2hlcyA9IDA7XG4gICAgICBsZXQgbmVzdGluZ0xldmVsID0gMDtcbiAgICAgIGxldCBjb21tYTEgPSAtMTtcbiAgICAgIGxldCBjb21tYTIgPSAtMTtcblxuICAgICAgLy8gQ2hlY2sgd2hlcmUgdGhlICcsJyBpcyByZWxhdGl2ZSB0byBkZXB0aCBhcyBpbmRpY2F0ZWQgYnkgcGFyZW50aGVzaXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWlmQ29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3dpdGNoIChpaWZDb250ZW50c1tpXSkge1xuICAgICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgICAgbmVzdGluZ0xldmVsKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICAgIG5lc3RpbmdMZXZlbC0tO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICBpZiAobmVzdGluZ0xldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgIGNvbW1hTWF0Y2hlcysrO1xuICAgICAgICAgICAgICBpZiAoY29tbWExID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbW1hMSA9IGk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWEyID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbW1hMiA9IGk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21tYU1hdGNoZXMgPT09IDIgJiYgbmVzdGluZ0xldmVsID09PSAwKSB7XG4gICAgICAgIC8vIENsZWFyIG91dCBhbnkgZXhpc3RpbmcgY2FzZXMgaWYgd2UgaGF2ZSBhIG1hdGNoIGZvciBpaWZcbiAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jYXNlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGlpZkNvbnRlbnRzLnN1YnN0cmluZygwLCBjb21tYTEpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgdHJ1ZUNhc2UgPSBpaWZDb250ZW50cy5zdWJzdHJpbmcoY29tbWExICsgMSwgY29tbWEyKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGZhbHNlQ2FzZSA9IGlpZkNvbnRlbnRzLnN1YnN0cmluZyhjb21tYTIgKyAxLCBpaWZDb250ZW50cy5sZW5ndGgpLnRyaW0oKTtcblxuICAgICAgICBpZiAodGhpcy5zeW50YXggPT09ICdzaW1wbGUnKSB7XG4gICAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lcyA9IHRoaXMucnVsZUVkaXRvclNlcnZpY2UudmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpO1xuXG4gICAgICAgICAgdGhpcy5jYXNlcy5wdXNoKHtcbiAgICAgICAgICAgIHNpbXBsZUNvbmRpdGlvbjogY29uZGl0aW9uLFxuICAgICAgICAgICAgc2ltcGxlT3V0cHV0OiB0cnVlQ2FzZSxcbiAgICAgICAgICAgIGNvbmRpdGlvbjogdGhpcy5waXBlLnRyYW5zZm9ybShjb25kaXRpb24sIHZhcmlhYmxlTmFtZXMpLFxuICAgICAgICAgICAgb3V0cHV0OiB0aGlzLnBpcGUudHJhbnNmb3JtKHRydWVDYXNlLCB2YXJpYWJsZU5hbWVzKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2FzZXMucHVzaCh7XG4gICAgICAgICAgICBjb25kaXRpb24sXG4gICAgICAgICAgICBvdXRwdXQ6IHRydWVDYXNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2VJaWYoZmFsc2VDYXNlLCBsZXZlbCArIDEpO1xuICAgICAgICBpZiAocGFyc2VSZXN1bHQgPT09IGZhbHNlICYmIHRoaXMuc3ludGF4ICE9PSAnc2ltcGxlJykge1xuICAgICAgICAgIHRoaXMuZGVmYXVsdENhc2UgPSBmYWxzZUNhc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyc2VSZXN1bHQgPT09IGZhbHNlICYmIHRoaXMuc3ludGF4ID09PSAnc2ltcGxlJykge1xuICAgICAgICAgIHRoaXMuc2ltcGxlRGVmYXVsdENhc2UgPSBmYWxzZUNhc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGlpZiBleHByZXNzaW9uIGdpdmVuIGEgbmVzdGluZyBsZXZlbFxuICAgKiBAcGFyYW0gbGV2ZWwgLSBuZXN0aW5nIGxldmVsXG4gICAqL1xuICBnZXRJaWYobGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgaXNTaW1wbGUgPSB0aGlzLnN5bnRheCA9PT0gJ3NpbXBsZSc7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy50cmFuc2Zvcm1JZlNpbXBsZShpc1NpbXBsZSA/XG4gICAgICB0aGlzLmNhc2VzW2xldmVsXS5zaW1wbGVPdXRwdXQgOlxuICAgICAgdGhpcy5jYXNlc1tsZXZlbF0ub3V0cHV0LCB0cnVlKTtcbiAgICBjb25zdCBjb25kaXRpb24gPSB0aGlzLnRyYW5zZm9ybUlmU2ltcGxlKGlzU2ltcGxlID9cbiAgICAgIHRoaXMuY2FzZXNbbGV2ZWxdLnNpbXBsZUNvbmRpdGlvbiA6XG4gICAgICB0aGlzLmNhc2VzW2xldmVsXS5jb25kaXRpb24sIGZhbHNlKTtcblxuICAgIGlmIChsZXZlbCA9PT0gdGhpcy5jYXNlcy5sZW5ndGggLSAxKSB7XG4gICAgICBjb25zdCBkZWZhdWx0Q2FzZSA9IHRoaXMudHJhbnNmb3JtSWZTaW1wbGUoaXNTaW1wbGUgP1xuICAgICAgICB0aGlzLnNpbXBsZURlZmF1bHRDYXNlIDogdGhpcy5kZWZhdWx0Q2FzZSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gYGlpZigke2NvbmRpdGlvbn0sJHtvdXRwdXR9LCR7ZGVmYXVsdENhc2V9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgaWlmKCR7Y29uZGl0aW9ufSwke291dHB1dH0sJHt0aGlzLmdldElpZihsZXZlbCArIDEpfSlgO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhlIGV4cHJlc3Npb24gcGFyYW1ldGVyIGlmIHRoZSBzeW50YXggdHlwZSBpcyBFYXN5IFBhdGgsXG4gICAqIG90aGVyd2lzZSByZXR1cm4gdGhlIGV4cHJlc3Npb24uIEFkZGl0aW9uYWxseSBpZiB0aGlzIGlzIGFuIG91dHB1dCBjb2x1bW5cbiAgICogYW5kIG91dHB1dCBleHByZXNzaW9ucyBhcmUgb2ZmIHN1cnJvdW5kIHdpdGggcXVvdGVzLlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiAtIEVhc3kgUGF0aCBvciBGSElSUGF0aCBleHByZXNzaW9uXG4gICAqIEBwYXJhbSBpc091dHB1dCAtIFRydWUgaWYgcHJvY2Vzc2luZyBhbiBvdXRwdXQgb3IgZGVmYXVsdCB2YWx1ZVxuICAgKiBAcmV0dXJuIEZISVJQYXRoIEV4cHJlc3Npb25cbiAgICovXG4gIHRyYW5zZm9ybUlmU2ltcGxlKGV4cHJlc3Npb246IHN0cmluZywgaXNPdXRwdXQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmIChleHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBsZXQgcHJvY2Vzc2VkRXhwcmVzc2lvbiA9IGV4cHJlc3Npb247XG5cbiAgICBpZiAoaXNPdXRwdXQgJiYgIXRoaXMub3V0cHV0RXhwcmVzc2lvbnMpIHtcbiAgICAgIHByb2Nlc3NlZEV4cHJlc3Npb24gPSBgJyR7cHJvY2Vzc2VkRXhwcmVzc2lvbn0nYDsgIC8vIFRPRE8gc2hvdWxkIHdlIGVzY2FwZSB0aGUgZXhwcmVzc2lvbj9cbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHdoZW4gc3ludGF4IGlzIHNpbXBsZSBidXQgbm90IGluIHRoZSBvdXRwdXQgY29sdW1uIGlzIG91dHB1dEV4cHJlc3Npb25zIGlzIGRpc2FibGVkXG4gICAgaWYgKHRoaXMuc3ludGF4ID09PSAnc2ltcGxlJyAmJiAhKGlzT3V0cHV0ICYmICF0aGlzLm91dHB1dEV4cHJlc3Npb25zKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZS50cmFuc2Zvcm0ocHJvY2Vzc2VkRXhwcmVzc2lvbiwgdGhpcy5ydWxlRWRpdG9yU2VydmljZS52YXJpYWJsZXMubWFwKGUgPT4gZS5sYWJlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc2VkRXhwcmVzc2lvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhZyBhbmQgZHJvcCByZWFycmFuZ2Ugb2YgdmFyaWFibGUgb3JkZXJcbiAgICogQHBhcmFtIGV2ZW50IC0gZHJhZyBhbmQgZHJvcCBldmVudFxuICAgKi9cbiAgZHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8VmFyaWFibGVbXT4pOiB2b2lkIHtcbiAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy5jYXNlcywgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gIH1cbn1cbiJdfQ==
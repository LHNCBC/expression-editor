import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CASE_REGEX } from '../variable';
import { EasyPathExpressionsPipe } from '../math-to-fhirpath.pipe';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1zdGF0ZW1lbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXJ1bGUtZWRpdG9yL3NyYy9saWIvY2FzZS1zdGF0ZW1lbnRzL2Nhc2Utc3RhdGVtZW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQTJCLE1BQU0sYUFBYSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBT25FLE1BQU0sT0FBTyx1QkFBdUI7SUFpQmxDLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBaEIvQyxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUsxQixxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVwRCxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixTQUFJLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQ3JDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUd6QixVQUFLLEdBQXlCLENBQUMsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNuRyxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWdELENBQUM7SUFFN0Q7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7WUFDMUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLGdFQUFnRTtRQUNoRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5RCxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksZUFBZSxFQUFFO1lBQ2pELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IscURBQXFEO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRLENBQUMsVUFBa0I7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsVUFBa0I7UUFDN0IsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQ3RGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjthQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDL0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLDRDQUE0QztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsVUFBa0IsRUFBRSxLQUFhO1FBQ3hDLDRFQUE0RTtRQUM1RSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTdDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNwQixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVoQix1RUFBdUU7WUFDdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLFFBQVEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN0QixLQUFLLEdBQUc7d0JBQ04sWUFBWSxFQUFFLENBQUM7d0JBQ2YsTUFBTTtvQkFDUixLQUFLLEdBQUc7d0JBQ04sWUFBWSxFQUFFLENBQUM7d0JBQ2YsTUFBTTtvQkFDUixLQUFLLEdBQUc7d0JBQ04sSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFOzRCQUN0QixZQUFZLEVBQUUsQ0FBQzs0QkFDZixJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FDakIsTUFBTSxHQUFHLENBQUMsQ0FBQzs2QkFDWjtpQ0FBTSxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FDeEIsTUFBTSxHQUFHLENBQUMsQ0FBQzs2QkFDWjt5QkFDRjt3QkFDRCxNQUFNO2lCQUNUO2FBQ0Y7WUFFRCxJQUFJLFlBQVksS0FBSyxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtnQkFDNUMsMERBQTBEO2dCQUMxRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ2pCO2dCQUNELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xFLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRS9FLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQzVCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUV6RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDZCxlQUFlLEVBQUUsU0FBUzt3QkFDMUIsWUFBWSxFQUFFLFFBQVE7d0JBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDO3dCQUN4RCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQztxQkFDckQsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNkLFNBQVM7d0JBQ1QsTUFBTSxFQUFFLFFBQVE7cUJBQ2pCLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELElBQUksV0FBVyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7aUJBQzlCO3FCQUFNLElBQUksV0FBVyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztpQkFDcEM7Z0JBRUQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEtBQWE7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUM7UUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sT0FBTyxTQUFTLElBQUksTUFBTSxJQUFJLFdBQVcsR0FBRyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxPQUFPLE9BQU8sU0FBUyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxpQkFBaUIsQ0FBQyxVQUFrQixFQUFFLFFBQWlCO1FBQ3JELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7UUFFckMsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdkMsbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUUsd0NBQXdDO1NBQzVGO1FBRUQsOEZBQThGO1FBQzlGLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3RFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRzthQUFNO1lBQ0wsT0FBTyxtQkFBbUIsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQUMsS0FBOEI7UUFDakMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQXRQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscTJHQUErQzs7YUFFaEQ7OztZQVRRLGlCQUFpQjs7O3VCQVd2QixLQUFLO3FCQUNMLEtBQUs7K0JBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUVMLE1BQU07MkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUnVsZUVkaXRvclNlcnZpY2UsIFNpbXBsZVN0eWxlIH0gZnJvbSAnLi4vcnVsZS1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDQVNFX1JFR0VYLCBDYXNlU3RhdGVtZW50LCBWYXJpYWJsZSB9IGZyb20gJy4uL3ZhcmlhYmxlJztcbmltcG9ydCB7IEVhc3lQYXRoRXhwcmVzc2lvbnNQaXBlIH0gZnJvbSAnLi4vbWF0aC10by1maGlycGF0aC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGhjLWNhc2Utc3RhdGVtZW50cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLXN0YXRlbWVudHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLXN0YXRlbWVudHMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VTdGF0ZW1lbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsaGNTdHlsZTogU2ltcGxlU3R5bGUgPSB7fTtcbiAgQElucHV0KCkgc3ludGF4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNpbXBsZUV4cHJlc3Npb246IHN0cmluZztcbiAgQElucHV0KCkgZXhwcmVzc2lvbjogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBleHByZXNzaW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBzaW1wbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBTVFJJTkdfUkVHRVggPSAvXicoLiopJyQvO1xuICBwaXBlID0gbmV3IEVhc3lQYXRoRXhwcmVzc2lvbnNQaXBlKCk7XG4gIG91dHB1dEV4cHJlc3Npb25zID0gdHJ1ZTtcbiAgZGVmYXVsdENhc2U6IHN0cmluZztcbiAgc2ltcGxlRGVmYXVsdENhc2U6IHN0cmluZztcbiAgY2FzZXM6IEFycmF5PENhc2VTdGF0ZW1lbnQ+ID0gW3tjb25kaXRpb246ICcnLCBzaW1wbGVDb25kaXRpb246ICcnLCBvdXRwdXQ6ICcnLCBzaW1wbGVPdXRwdXQ6ICcnfV07XG4gIG91dHB1dCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcnVsZUVkaXRvclNlcnZpY2U6IFJ1bGVFZGl0b3JTZXJ2aWNlKSB7IH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN5bnRheCA9PT0gJ2ZoaXJwYXRoJyAmJiB0aGlzLmV4cHJlc3Npb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5wYXJzZUlpZih0aGlzLmV4cHJlc3Npb24sIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zeW50YXggPT09ICdzaW1wbGUnICYmIHRoaXMuc2ltcGxlRXhwcmVzc2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnBhcnNlU2ltcGxlQ2FzZXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLm91dHB1dCA9IHRoaXMuZ2V0SWlmKDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgRWFzeSBQYXRoIGV4cHJlc3Npb24gYW5kIHBvcHVsYXRlcyB0aGUgY2FzZSBlZGl0b3IuIFRvZ2dsZXMgXCJ1c2VcbiAgICogZXhwcmVzc2lvbnNcIiBvZmYgaWYgb3V0cHV0IGlzIG9ubHkgc3RyaW5ncy5cbiAgICovXG4gIHBhcnNlU2ltcGxlQ2FzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJzZUlpZih0aGlzLnNpbXBsZUV4cHJlc3Npb24sIDApO1xuXG4gICAgLy8gSWYgYWxsIG91dHB1dCB2YWx1ZXMgYXJlIHN0cmluZ3MgdG9nZ2xlIG9mZiBcInVzZSBleHByZXNzaW9uc1wiXG4gICAgY29uc3Qgb3V0cHV0U3RyaW5nID0gdGhpcy5jYXNlcy5maW5kKGUgPT4gKCF0aGlzLmlzU3RyaW5nKGUuc2ltcGxlT3V0cHV0KSkpO1xuICAgIGNvbnN0IGRlZmF1bHRJc1N0cmluZyA9IHRoaXMuaXNTdHJpbmcodGhpcy5zaW1wbGVEZWZhdWx0Q2FzZSk7XG5cbiAgICBpZiAob3V0cHV0U3RyaW5nID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdElzU3RyaW5nKSB7XG4gICAgICB0aGlzLm91dHB1dEV4cHJlc3Npb25zID0gZmFsc2U7XG4gICAgICAvLyBSZW1vdmUgcXVvdGVzIGZyb20gb3V0cHV0IHN0cmluZ3MgYW5kIGRlZmF1bHQgY2FzZVxuICAgICAgdGhpcy5jYXNlcy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBlLnNpbXBsZU91dHB1dCA9IHRoaXMucmVtb3ZlUXVvdGVzKGUuc2ltcGxlT3V0cHV0KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zaW1wbGVEZWZhdWx0Q2FzZSA9IHRoaXMucmVtb3ZlUXVvdGVzKHRoaXMuc2ltcGxlRGVmYXVsdENhc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGV4cHJlc3Npb24gaXMgYSBzdHJpbmdcbiAgICovXG4gIGlzU3RyaW5nKGV4cHJlc3Npb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLlNUUklOR19SRUdFWC50ZXN0KGV4cHJlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3Vycm91bmRpbmcgcXVvdGVzXG4gICAqL1xuICByZW1vdmVRdW90ZXMoZXhwcmVzc2lvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbi5tYXRjaCh0aGlzLlNUUklOR19SRUdFWClbMV07XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBmb3IgY2hhbmdlc1xuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnN5bnRheCAmJiB0aGlzLnN5bnRheCA9PT0gJ3NpbXBsZScgJiYgY2hhbmdlcy5zeW50YXguZmlyc3RDaGFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnBhcnNlU2ltcGxlQ2FzZXMoKTtcbiAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXMuc3ludGF4ICYmIHRoaXMuc3ludGF4ID09PSAnZmhpcnBhdGgnICYmIGNoYW5nZXMuc3ludGF4LmZpcnN0Q2hhbmdlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5vdXRwdXRFeHByZXNzaW9ucyA9IHRydWU7XG4gICAgICB0aGlzLnBhcnNlSWlmKHRoaXMuZXhwcmVzc2lvbiwgMCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFkZGluZyBhIG5ldyBjYXNlXG4gICAqL1xuICBvbkFkZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VzLnB1c2goe2NvbmRpdGlvbjogJycsIHNpbXBsZUNvbmRpdGlvbjogJycsIG91dHB1dDogJycsIHNpbXBsZU91dHB1dDogJyd9KTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgLy8gVE9ETyBzZWxlY3QgbmV4dCBpbnB1dCBib3ggdGhhdCB3YXMgYWRkZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGNhc2UgYXQgYW4gaW5kZXhcbiAgICogQHBhcmFtIGkgLSBpbmRleCB0byByZW1vdmVcbiAgICovXG4gIG9uUmVtb3ZlKGkpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VzLnNwbGljZShpLCAxKTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBsaWZlY3ljbGUgaG9vayBmb3IgY2hhbmdlc1xuICAgKi9cbiAgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5vdXRwdXQgPSB0aGlzLmdldElpZigwKTtcbiAgICB0aGlzLmV4cHJlc3Npb25DaGFuZ2UuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgdGhpcy5zaW1wbGVDaGFuZ2UuZW1pdCh0aGlzLnNpbXBsZUV4cHJlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGlpZiBleHByZXNzaW9uIGF0IHNwZWNpZmllZCBsZXZlbC4gVG9wIGxldmVsIGlzIDBcbiAgICogQHBhcmFtIGV4cHJlc3Npb24gLSBleHByZXNzaW9uIHRvIHBhcnNlXG4gICAqIEBwYXJhbSBsZXZlbCAtIGRlcHRoIG9yIGxldmVsIG9mIGV4cHJlc3Npb24gbmVzdGluZ1xuICAgKi9cbiAgcGFyc2VJaWYoZXhwcmVzc2lvbjogc3RyaW5nLCBsZXZlbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgZXhwcmVzc2lvbnMgZG9uJ3Qgc3RhcnQgd2l0aCBpaWYoIGFuZCBlbmQgd2l0aCApIHRoZXkgY2Fubm90IGJlIHBhcnNlZFxuICAgIGNvbnN0IG1hdGNoZXMgPSBleHByZXNzaW9uLm1hdGNoKENBU0VfUkVHRVgpO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGlpZkNvbnRlbnRzID0gbWF0Y2hlc1sxXTtcbiAgICAgIGxldCBjb21tYU1hdGNoZXMgPSAwO1xuICAgICAgbGV0IG5lc3RpbmdMZXZlbCA9IDA7XG4gICAgICBsZXQgY29tbWExID0gLTE7XG4gICAgICBsZXQgY29tbWEyID0gLTE7XG5cbiAgICAgIC8vIENoZWNrIHdoZXJlIHRoZSAnLCcgaXMgcmVsYXRpdmUgdG8gZGVwdGggYXMgaW5kaWNhdGVkIGJ5IHBhcmVudGhlc2lzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlpZkNvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN3aXRjaCAoaWlmQ29udGVudHNbaV0pIHtcbiAgICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgIG5lc3RpbmdMZXZlbCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgICBuZXN0aW5nTGV2ZWwtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJywnOlxuICAgICAgICAgICAgaWYgKG5lc3RpbmdMZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICBjb21tYU1hdGNoZXMrKztcbiAgICAgICAgICAgICAgaWYgKGNvbW1hMSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb21tYTEgPSBpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hMiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb21tYTIgPSBpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY29tbWFNYXRjaGVzID09PSAyICYmIG5lc3RpbmdMZXZlbCA9PT0gMCkge1xuICAgICAgICAvLyBDbGVhciBvdXQgYW55IGV4aXN0aW5nIGNhc2VzIGlmIHdlIGhhdmUgYSBtYXRjaCBmb3IgaWlmXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY2FzZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25kaXRpb24gPSBpaWZDb250ZW50cy5zdWJzdHJpbmcoMCwgY29tbWExKS50cmltKCk7XG4gICAgICAgIGNvbnN0IHRydWVDYXNlID0gaWlmQ29udGVudHMuc3Vic3RyaW5nKGNvbW1hMSArIDEsIGNvbW1hMikudHJpbSgpO1xuICAgICAgICBjb25zdCBmYWxzZUNhc2UgPSBpaWZDb250ZW50cy5zdWJzdHJpbmcoY29tbWEyICsgMSwgaWlmQ29udGVudHMubGVuZ3RoKS50cmltKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3ludGF4ID09PSAnc2ltcGxlJykge1xuICAgICAgICAgIGNvbnN0IHZhcmlhYmxlTmFtZXMgPSB0aGlzLnJ1bGVFZGl0b3JTZXJ2aWNlLnZhcmlhYmxlcy5tYXAoZSA9PiBlLmxhYmVsKTtcblxuICAgICAgICAgIHRoaXMuY2FzZXMucHVzaCh7XG4gICAgICAgICAgICBzaW1wbGVDb25kaXRpb246IGNvbmRpdGlvbixcbiAgICAgICAgICAgIHNpbXBsZU91dHB1dDogdHJ1ZUNhc2UsXG4gICAgICAgICAgICBjb25kaXRpb246IHRoaXMucGlwZS50cmFuc2Zvcm0oY29uZGl0aW9uLCB2YXJpYWJsZU5hbWVzKSxcbiAgICAgICAgICAgIG91dHB1dDogdGhpcy5waXBlLnRyYW5zZm9ybSh0cnVlQ2FzZSwgdmFyaWFibGVOYW1lcylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhc2VzLnB1c2goe1xuICAgICAgICAgICAgY29uZGl0aW9uLFxuICAgICAgICAgICAgb3V0cHV0OiB0cnVlQ2FzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlSWlmKGZhbHNlQ2FzZSwgbGV2ZWwgKyAxKTtcbiAgICAgICAgaWYgKHBhcnNlUmVzdWx0ID09PSBmYWxzZSAmJiB0aGlzLnN5bnRheCAhPT0gJ3NpbXBsZScpIHtcbiAgICAgICAgICB0aGlzLmRlZmF1bHRDYXNlID0gZmFsc2VDYXNlO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnNlUmVzdWx0ID09PSBmYWxzZSAmJiB0aGlzLnN5bnRheCA9PT0gJ3NpbXBsZScpIHtcbiAgICAgICAgICB0aGlzLnNpbXBsZURlZmF1bHRDYXNlID0gZmFsc2VDYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpaWYgZXhwcmVzc2lvbiBnaXZlbiBhIG5lc3RpbmcgbGV2ZWxcbiAgICogQHBhcmFtIGxldmVsIC0gbmVzdGluZyBsZXZlbFxuICAgKi9cbiAgZ2V0SWlmKGxldmVsOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGlzU2ltcGxlID0gdGhpcy5zeW50YXggPT09ICdzaW1wbGUnO1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMudHJhbnNmb3JtSWZTaW1wbGUoaXNTaW1wbGUgP1xuICAgICAgdGhpcy5jYXNlc1tsZXZlbF0uc2ltcGxlT3V0cHV0IDpcbiAgICAgIHRoaXMuY2FzZXNbbGV2ZWxdLm91dHB1dCwgdHJ1ZSk7XG4gICAgY29uc3QgY29uZGl0aW9uID0gdGhpcy50cmFuc2Zvcm1JZlNpbXBsZShpc1NpbXBsZSA/XG4gICAgICB0aGlzLmNhc2VzW2xldmVsXS5zaW1wbGVDb25kaXRpb24gOlxuICAgICAgdGhpcy5jYXNlc1tsZXZlbF0uY29uZGl0aW9uLCBmYWxzZSk7XG5cbiAgICBpZiAobGV2ZWwgPT09IHRoaXMuY2FzZXMubGVuZ3RoIC0gMSkge1xuICAgICAgY29uc3QgZGVmYXVsdENhc2UgPSB0aGlzLnRyYW5zZm9ybUlmU2ltcGxlKGlzU2ltcGxlID9cbiAgICAgICAgdGhpcy5zaW1wbGVEZWZhdWx0Q2FzZSA6IHRoaXMuZGVmYXVsdENhc2UsIHRydWUpO1xuICAgICAgcmV0dXJuIGBpaWYoJHtjb25kaXRpb259LCR7b3V0cHV0fSwke2RlZmF1bHRDYXNlfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYGlpZigke2NvbmRpdGlvbn0sJHtvdXRwdXR9LCR7dGhpcy5nZXRJaWYobGV2ZWwgKyAxKX0pYDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBleHByZXNzaW9uIHBhcmFtZXRlciBpZiB0aGUgc3ludGF4IHR5cGUgaXMgRWFzeSBQYXRoLFxuICAgKiBvdGhlcndpc2UgcmV0dXJuIHRoZSBleHByZXNzaW9uLiBBZGRpdGlvbmFsbHkgaWYgdGhpcyBpcyBhbiBvdXRwdXQgY29sdW1uXG4gICAqIGFuZCBvdXRwdXQgZXhwcmVzc2lvbnMgYXJlIG9mZiBzdXJyb3VuZCB3aXRoIHF1b3Rlcy5cbiAgICogQHBhcmFtIGV4cHJlc3Npb24gLSBFYXN5IFBhdGggb3IgRkhJUlBhdGggZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gaXNPdXRwdXQgLSBUcnVlIGlmIHByb2Nlc3NpbmcgYW4gb3V0cHV0IG9yIGRlZmF1bHQgdmFsdWVcbiAgICogQHJldHVybiBGSElSUGF0aCBFeHByZXNzaW9uXG4gICAqL1xuICB0cmFuc2Zvcm1JZlNpbXBsZShleHByZXNzaW9uOiBzdHJpbmcsIGlzT3V0cHV0OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoZXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgbGV0IHByb2Nlc3NlZEV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXG4gICAgaWYgKGlzT3V0cHV0ICYmICF0aGlzLm91dHB1dEV4cHJlc3Npb25zKSB7XG4gICAgICBwcm9jZXNzZWRFeHByZXNzaW9uID0gYCcke3Byb2Nlc3NlZEV4cHJlc3Npb259J2A7ICAvLyBUT0RPIHNob3VsZCB3ZSBlc2NhcGUgdGhlIGV4cHJlc3Npb24/XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB3aGVuIHN5bnRheCBpcyBzaW1wbGUgYnV0IG5vdCBpbiB0aGUgb3V0cHV0IGNvbHVtbiBpcyBvdXRwdXRFeHByZXNzaW9ucyBpcyBkaXNhYmxlZFxuICAgIGlmICh0aGlzLnN5bnRheCA9PT0gJ3NpbXBsZScgJiYgIShpc091dHB1dCAmJiAhdGhpcy5vdXRwdXRFeHByZXNzaW9ucykpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGUudHJhbnNmb3JtKHByb2Nlc3NlZEV4cHJlc3Npb24sIHRoaXMucnVsZUVkaXRvclNlcnZpY2UudmFyaWFibGVzLm1hcChlID0+IGUubGFiZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByb2Nlc3NlZEV4cHJlc3Npb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYWcgYW5kIGRyb3AgcmVhcnJhbmdlIG9mIHZhcmlhYmxlIG9yZGVyXG4gICAqIEBwYXJhbSBldmVudCAtIGRyYWcgYW5kIGRyb3AgZXZlbnRcbiAgICovXG4gIGRyb3AoZXZlbnQ6IENka0RyYWdEcm9wPFZhcmlhYmxlW10+KTogdm9pZCB7XG4gICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMuY2FzZXMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgdGhpcy5vbkNoYW5nZSgpO1xuICB9XG59XG4iXX0=
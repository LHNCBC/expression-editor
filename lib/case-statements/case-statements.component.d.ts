import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CaseStatement, Variable } from '../variable';
import { EasyPathExpressionsPipe } from '../math-to-fhirpath.pipe';
import * as ɵngcc0 from '@angular/core';
export declare class CaseStatementsComponent implements OnInit, OnChanges {
    private ruleEditorService;
    lhcStyle: SimpleStyle;
    syntax: string;
    simpleExpression: string;
    expression: string;
    expressionChange: EventEmitter<string>;
    simpleChange: EventEmitter<string>;
    STRING_REGEX: RegExp;
    pipe: EasyPathExpressionsPipe;
    outputExpressions: boolean;
    defaultCase: string;
    simpleDefaultCase: string;
    cases: Array<CaseStatement>;
    output: string;
    constructor(ruleEditorService: RuleEditorService);
    /**
     * Angular lifecycle hook for initialization
     */
    ngOnInit(): void;
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */
    parseSimpleCases(): void;
    /**
     * Checks if the expression is a string
     */
    isString(expression: string): boolean;
    /**
     * Removes surrounding quotes
     */
    removeQuotes(expression: string): string;
    /**
     * Angular lifecycle hook for changes
     */
    ngOnChanges(changes: any): void;
    /**
     * Called when adding a new case
     */
    onAdd(): void;
    /**
     * Remove the case at an index
     * @param i - index to remove
     */
    onRemove(i: any): void;
    /**
     * Angular lifecycle hook for changes
     */
    onChange(): void;
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */
    parseIif(expression: string, level: number): boolean;
    /**
     * Get an iif expression given a nesting level
     * @param level - nesting level
     */
    getIif(level: number): string;
    /**
     * Transform the expression parameter if the syntax type is Easy Path,
     * otherwise return the expression. Additionally if this is an output column
     * and output expressions are off surround with quotes.
     * @param expression - Easy Path or FHIRPath expression
     * @param isOutput - True if processing an output or default value
     * @return FHIRPath Expression
     */
    transformIfSimple(expression: string, isOutput: boolean): string;
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event: CdkDragDrop<Variable[]>): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CaseStatementsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CaseStatementsComponent, "lhc-case-statements", never, { "lhcStyle": "lhcStyle"; "syntax": "syntax"; "simpleExpression": "simpleExpression"; "expression": "expression"; }, { "expressionChange": "expressionChange"; "simpleChange": "simpleChange"; }, never, never>;
}

//# sourceMappingURL=case-statements.component.d.ts.map
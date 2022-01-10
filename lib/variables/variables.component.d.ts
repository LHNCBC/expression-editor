import { OnChanges, OnInit } from '@angular/core';
import { Variable } from '../variable';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import * as ɵngcc0 from '@angular/core';
export declare class VariablesComponent implements OnInit, OnChanges {
    private ruleEditorService;
    lhcStyle: SimpleStyle;
    advancedInterface: boolean;
    variableType: any;
    variableSubscription: any;
    variables: Variable[];
    levels: {
        level: number;
        name: string;
    }[];
    constructor(ruleEditorService: RuleEditorService);
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit(): void;
    /**
     * Angular lifecycle hook called when bound property changes
     */
    ngOnChanges(changes: any): void;
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy(): void;
    /**
     * Called when adding a new variable
     */
    onAdd(): void;
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */
    onRemove(i: number): void;
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event: CdkDragDrop<Variable[]>): void;
    /**
     * Update the preview when the variable name changes
     */
    onNameChange(): void;
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event: any): void;
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    getAvailableVariables(index: number): Array<string>;
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */
    updateExpression(i: number, expression: any): void;
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */
    updateSimpleExpression(i: number, easyPath: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<VariablesComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<VariablesComponent, "lhc-variables", never, { "lhcStyle": "lhcStyle"; "advancedInterface": "advancedInterface"; }, {}, never, never>;
}

//# sourceMappingURL=variables.component.d.ts.map
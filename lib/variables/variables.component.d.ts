import { OnInit } from '@angular/core';
import { Variable, VariableType } from '../variable';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
export declare class VariablesComponent implements OnInit {
    private ruleEditorService;
    lhcStyle: SimpleStyle;
    variableType: typeof VariableType;
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
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    getAvailableVariables(index: number): Array<string>;
}

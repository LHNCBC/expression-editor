import { Component, Input, OnInit } from '@angular/core';

import { Variable, VariableType } from '../variable';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {
  @Input() style: SimpleStyle = {};

  variableType = VariableType;
  variableSubscription;
  variables: Variable[];
  levels = [{
      level: 0,
      name: 'Top Level Scope'
    }
  ];

  constructor(private ruleEditorService: RuleEditorService) {}

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.variables = this.ruleEditorService.variables;
    this.variableSubscription = this.ruleEditorService.variablesChange.subscribe((variables) => {
      this.variables = variables;
    });
  }

  /**
   * Angular lifecycle hook called before the component is destroyed
   */
  ngDestroy(): void {
    this.variableSubscription.unsubscribe();
  }

  /**
   * Called when adding a new variable
   */
  onAdd(): void {
    this.ruleEditorService.addVariable();
  }

  /**
   * Remove a variable at an index
   * @param i - index to remove
   */
  onRemove(i: number): void {
    this.ruleEditorService.remove(i);
  }

  /**
   * Drag and drop rearrange of variable order
   * @param event - drag and drop event
   */
  drop(event: CdkDragDrop<Variable[]>): void {
    moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
  }

  /**
   * Get the labels of available variables at the current index
   * @param index - Index of variable we're editing
   */
  getAvailableVariables(index: number): Array<string> {
    const uneditableVariables = this.ruleEditorService.uneditableVariables.map((e) => e.name);
    // Only return variables up to but not including index
    const editableVariables = this.variables.map((e) => e.label).slice(0, index);

    return uneditableVariables.concat(editableVariables);
  }
}

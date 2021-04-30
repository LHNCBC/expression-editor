import { Component, OnInit } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { UneditableVariable } from '../variable';

@Component({
  selector: 'lib-uneditable-variables',
  templateUrl: './uneditable-variables.component.html'
})
export class UneditableVariablesComponent implements OnInit {
  uneditableVariables: UneditableVariable[];
  uneditableVariablesSubscription;

  constructor(private variableService: RuleEditorService) {}

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.uneditableVariables = this.variableService.uneditableVariables;
    this.uneditableVariablesSubscription =
        this.variableService.uneditableVariablesChange.subscribe((variables) => {
      this.uneditableVariables = variables;
    });
  }

  /**
   * Angular lifecycle hook called before the component is destroyed
   */
  ngDestroy(): void {
    this.uneditableVariablesSubscription.unsubscribe();
  }
}

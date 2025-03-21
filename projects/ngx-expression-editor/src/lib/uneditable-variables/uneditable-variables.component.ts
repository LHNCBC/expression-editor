import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpressionEditorService } from '../expression-editor.service';
import { UneditableVariable } from '../variable';

@Component({
  selector: 'lhc-uneditable-variables',
  templateUrl: './uneditable-variables.component.html',
  styleUrls: ['./uneditable-variables.component.css'],
  standalone: false
})
export class UneditableVariablesComponent implements OnInit, OnDestroy {
  uneditableVariables: UneditableVariable[];
  uneditableVariablesSubscription;

  constructor(private variableService: ExpressionEditorService) {}

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
  ngOnDestroy(): void {
    this.uneditableVariablesSubscription.unsubscribe();
  }
}

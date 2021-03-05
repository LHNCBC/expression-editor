import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
import { UneditableVariable } from '../variable';

@Component({
  selector: 'app-uneditable-variables',
  templateUrl: './uneditable-variables.component.html'
})
export class UneditableVariablesComponent implements OnInit {
  uneditableVariables: UneditableVariable[];
  uneditableVariablesSubscription;

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.uneditableVariables = this.variableService.uneditableVariables;
    this.uneditableVariablesSubscription =
        this.variableService.uneditableVariablesChange.subscribe((variables) => {
      this.uneditableVariables = variables;
    });
  }

  ngDestroy(): void {
    this.uneditableVariablesSubscription.unsubscribe();
  }
}

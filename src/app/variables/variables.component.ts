import { Component, Input, OnInit } from '@angular/core';

import { Variable, VariableType } from '../variable';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {
  @Input() showFhirPath;
  @Input() advancedInterface;
  variableType = VariableType;
  variableSubscription;
  variables: Variable[];
  levels = [{
      level: 0,
      name: 'Top Level Scope'
    }
  ];

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.variables = this.variableService.variables;
    this.variableSubscription = this.variableService.variablesChange.subscribe((variables) => {
      this.variables = variables;
    });
  }

  ngDestroy(): void {
    this.variableSubscription.unsubscribe();
  }

  onAdd(): void {
    this.variableService.addVariable();
  }

  onRemove(i: number): void {
    this.variableService.remove(i);
  }

  drop(event: CdkDragDrop<Variable[]>): void {
    moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
  }
}

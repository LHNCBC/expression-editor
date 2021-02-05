import { Component, OnInit } from '@angular/core';

import { Variable, VariableType } from '../variable';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { VariableService } from '../variable.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {
  variableType = VariableType;
  variables: Variable[];
  environment = environment;

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
    this.getVariables();
  }

  getVariables(): void {
    this.variables = this.variableService.getVariables();
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

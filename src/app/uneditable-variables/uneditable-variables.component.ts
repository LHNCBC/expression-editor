import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-uneditable-variables',
  templateUrl: './uneditable-variables.component.html',
  styleUrls: ['./uneditable-variables.component.css']
})
export class UneditableVariablesComponent implements OnInit {
  uneditableVariables;

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
    this.getUneditableVariables();
  }

  getUneditableVariables(): void {
    this.uneditableVariables = this.variableService.getUneditableVariables();
  }
}

import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['./calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent implements OnInit {

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
  }

  toggleSumPrompt(): void {
    this.variableService.toggleMightBeScore();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['./calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent implements OnInit {
  @Output() export: EventEmitter<any> = new EventEmitter<any>();

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.variableService.toggleMightBeScore();
  }

  onExportClick(): void {
    this.export.emit();
  }
}

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

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {}

  /**
   * Close the dialog by specifying this should not be a score calculation
   */
  onCloseClick(): void {
    this.variableService.toggleMightBeScore();
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onExportClick(): void {
    this.export.emit();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['./calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent implements OnInit {
  @Input() style: SimpleStyle;
  @Output() export: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ruleEditorService: RuleEditorService) { }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {}

  /**
   * Close the dialog by specifying this should not be a score calculation
   */
  onCloseClick(): void {
    this.ruleEditorService.toggleMightBeScore();
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onExportClick(): void {
    this.export.emit();
  }
}

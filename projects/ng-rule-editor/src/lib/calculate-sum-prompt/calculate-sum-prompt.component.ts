import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['../rule-editor.component.css', './calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent implements OnInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Output() selectItems: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ruleEditorService: RuleEditorService) { }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {}

  /**
   * Close the dialog by specifying this should not calculate the score
   */
  onCloseClick(): void {
    this.ruleEditorService.toggleScoreCalculation();
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onSelectItemsClick(): void {
    this.selectItems.emit();
  }
}

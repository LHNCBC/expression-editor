import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['../rule-editor.component.css', './calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent {
  @Input() lhcStyle: SimpleStyle = {};
  @Output() selectItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() no: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ruleEditorService: RuleEditorService, private liveAnnouncer: LiveAnnouncer) { }

  /**
   * Close the dialog by specifying this should not calculate the score
   */
  onCloseClick(): void {
    this.liveAnnouncer.announce("Cancelled calculate sum of scores.");
    setTimeout(() => {
      this.ruleEditorService.toggleScoreCalculation();
      this.no.emit();
    }, 100);
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onSelectItemsClick(): void {
    this.selectItems.emit();
  }
}

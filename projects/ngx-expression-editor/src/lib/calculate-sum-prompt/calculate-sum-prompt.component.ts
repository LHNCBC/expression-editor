import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ExpressionEditorService, SimpleStyle } from '../expression-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-calculate-sum-prompt',
  templateUrl: './calculate-sum-prompt.component.html',
  styleUrls: ['../expression-editor.component.css', './calculate-sum-prompt.component.css']
})
export class CalculateSumPromptComponent implements OnInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Output() selectItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() no: EventEmitter<any> = new EventEmitter<any>();
  @Output() dialogClose: EventEmitter<any> = new EventEmitter<any>();

  selectItemsAriaDescription="Click the 'Yes' button to select items for the scoring calculation.";
  skipSelectItemsAriaDescription="Click the 'No' button to skip item selection and go to the Expression Editor.";

  constructor(private expressionEditorService: ExpressionEditorService, private liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {}

  /**
   * Close the dialog by specifying this should not calculate the score
   */
  onDialogCloseClick(): void {
    this.liveAnnouncer.announce("Cancelled calculate sum of scores.");

    setTimeout(() => {
      this.dialogClose.emit();
      this.expressionEditorService.toggleScoreCalculation();
    }, 0);
  }

  /**
   * Close the dialog by specifying this should not calculate the score
   */
  onCloseClick(): void {
    this.liveAnnouncer.announce("Cancelled calculate sum of scores.");
    this.expressionEditorService.dialogStack.pop();

    setTimeout(() => {
      this.expressionEditorService.toggleScoreCalculation();
    }, 0);
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onSelectItemsClick(): void {
    this.expressionEditorService.dialogStack.pop();
  
    this.selectItems.emit();
  }
}

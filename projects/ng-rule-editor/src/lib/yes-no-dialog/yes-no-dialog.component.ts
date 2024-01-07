import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() title: string;
  @Input() prompt1: string;
  @Input() prompt2: string;
  @Input() textAlign = "left";
  @Output() yes: EventEmitter<any> = new EventEmitter<any>();
  @Output() no: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Close the dialog, cancelling the change from FHIRPath Expression to Easy Path Expression
   */
  onYes(): void {
    this.yes.emit();
  }

  /**
   * Proceed with changing from FHIRPath Expression to Easy Path Expression
   */
  onNo(): void {
    this.no.emit();
  }
}

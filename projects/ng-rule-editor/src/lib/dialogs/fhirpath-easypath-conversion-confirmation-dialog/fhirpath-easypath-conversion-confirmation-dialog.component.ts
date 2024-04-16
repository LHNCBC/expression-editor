import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { SimpleStyle, DialogStyle } from '../../rule-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-fhirpath-easypath-conversion-confirmation-dialog',
  templateUrl: './fhirpath-easypath-conversion-confirmation-dialog.component.html',
  styleUrls: ['./fhirpath-easypath-conversion-confirmation-dialog.component.css']
})
export class FhirpathEasypathConversionConfirmationDialogComponent extends BaseDialogComponent {

  @Input() lhcStyle: SimpleStyle = {};
  @Output() confirmationYes: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmationNo: EventEmitter<any> = new EventEmitter<any>();
  dialogTitle = "Converting FHIRPath Expression to Easy Path Expression";
  confirmationPrompt1 = "The Rule Editor does not support conversion from FHIRPath Expression " +
                  "to Easy Path Expression. Switching to the Easy Path Expression for the " +
                  "output expression would result in the expression becoming blank.";
  confirmationPrompt2 = "Proceed?";

  customDialogStyle: DialogStyle = {
    dialogBodyDiv: {
      'text-align': 'left'
    }
  };
  
  constructor(protected liveAnnouncer: LiveAnnouncer) { 
    super(liveAnnouncer);
  }

  /**
   * Emits the 'confirmationYes' event
   */
  onYes(): void {
    this.liveAnnouncer.announce("Yes is selected.");
    setTimeout(() => {
      this.confirmationYes.emit();
    }, 50);
  };

  /**
   * Emits the 'confirmationNo' event
   */
  onNo(): void {
    this.liveAnnouncer.announce("No is selected.");
    setTimeout(() => {
      this.confirmationNo.emit();
    }, 50);
  };
}

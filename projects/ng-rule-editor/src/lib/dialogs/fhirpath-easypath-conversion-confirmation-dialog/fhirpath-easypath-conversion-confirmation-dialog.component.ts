import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { SimpleStyle, DialogStyle } from '../../rule-editor.service';

@Component({
  selector: 'lhc-fhirpath-easypath-conversion-confirmation-dialog',
  templateUrl: './fhirpath-easypath-conversion-confirmation-dialog.component.html',
  styleUrls: ['./fhirpath-easypath-conversion-confirmation-dialog.component.css']
})
export class FhirpathEasypathConversionConfirmationDialogComponent extends BaseDialogComponent implements OnInit {

  @Input() lhcStyle: SimpleStyle = {};
  @Output() confirmationYes: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmationNo: EventEmitter<any> = new EventEmitter<any>();
  dialogTitle = "Converting FHIRPath Expression to Easy Path Expression";
  confirmationPrompt1 = "The Rule Editor does not support conversion from FHIRPath Expression " +
                  "to Easy Path Expression. Switching to the Easy Path Expression for the " +
                  "output expression would result in the expression becoming blank.";
  confirmationPrompt2 = "Proceed?";

  dialogStyle: DialogStyle = {
    dialogContentDiv: {
      'padding': '30px 0px 20px 0px',
      'width': '50%',
      'border-radius': '10px'
    },
    dialogTitleBar: {
      'padding': '10px 20px 10px 20px',
      'height': '20px',
      'background-color': '#3166e3',
      'color': 'white',
      'vertical-align': 'middle'
    },
    dialogHeaderDiv: {
      'margin': '0px',
      'text-align': 'left'
    },
    dialogBodyDiv: {
      'margin': '20px',
      'text-align': 'left'
    },
    dialogFooterDiv: {
      'margin': '0px 10px',
      'text-align': 'center'
    },
    buttonPrimary: this.lhcStyle.buttonPrimary,
    buttonSecondary: this.lhcStyle.buttonSecondary
  };

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.dialogStyle['buttonPrimary'] = this.lhcStyle.buttonPrimary;
    this.dialogStyle['buttonSecondary'] = this.lhcStyle.buttonSecondary;
    
  };
  
  /**
   * Emits the 'confirmationYes' event
   */
  onYes(): void {
    this.confirmationYes.emit();
  };

  /**
   * Emits the 'confirmationNo' event
   */
  onNo(): void {
    this.confirmationNo.emit();
  };
}

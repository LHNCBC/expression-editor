import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { SimpleStyle, DialogStyle } from '../../rule-editor.service';

@Component({
  selector: 'lhc-cancel-changes-confirmation-dialog',
  templateUrl: './cancel-changes-confirmation-dialog.component.html',
  styleUrls: ['./cancel-changes-confirmation-dialog.component.css']
})
export class CancelChangesConfirmationDialogComponent extends BaseDialogComponent implements OnInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Output() confirmationYes: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmationNo: EventEmitter<any> = new EventEmitter<any>();

  dialogStyle: DialogStyle = {
    dialogContentDiv: {
      'padding': '0px 0px 20px 0px',
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
      'margin': '30px 20px 0px 20px',
      'text-align': 'center'
    },
    dialogBodyDiv: {
      'margin': '20px',
      'text-align': 'center'
    },
    dialogFooterDiv: {
      'margin': '0px 10px',
      'text-align': 'center'
    }
  }

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

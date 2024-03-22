import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { SimpleStyle, DialogStyle } from '../../rule-editor.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-fhirpath-expression-help-dialog',
  templateUrl: './fhirpath-expression-help-dialog.component.html',
  styleUrls: ['./fhirpath-expression-help-dialog.component.css']
})

export class FhirpathExpressionHelpDialogComponent extends BaseDialogComponent {
  @Output() onCloseHelp: EventEmitter<any> = new EventEmitter<any>();

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
      'text-align': 'left'
    },
    dialogBodyDiv: {
      'margin': '20px',
      'text-align': 'left'
    }
  };

  constructor(private liveAnnouncer: LiveAnnouncer) { 
    super();
  }

  /**
   * Emits the 'onCloseHelp' event
   */
  onNo(): void {
    this.onCloseHelp.emit();
  };
}


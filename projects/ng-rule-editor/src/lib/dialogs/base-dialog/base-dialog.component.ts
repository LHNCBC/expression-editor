import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { DialogStyle } from '../../rule-editor.service';

@Component({
  selector: 'lhc-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css']
})
export class BaseDialogComponent {
  @Input() dialogStyle: DialogStyle = {
    'dialogTitleBar': {},
    'dialogContentDiv': {},
    'dialogHeaderDiv': {},
    'dialogBodyDiv': {},
    'dialogFooterDiv': {},
    'buttonPrimary': {},
    'buttonSecondary': {}
  };
  @Input() displayTitleBar: boolean = true;
  @Input() titleBarLabel: string = '';
  @Input() headerLabel: string = '';
  @Input() yesButtonLabel: string = '';
  @Input() noButtonLabel: string = '';

  @Output() yes: EventEmitter<any> = new EventEmitter<any>();
  @Output() no: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ElementRef;

  /**
   * Emits the 'yes' event
   */
  onYes(): void {
    this.yes.emit();
  }

  /**
   * Emits the 'no' event
   */
  onNo(): void {
    this.no.emit();
  }

  /**
   * Close Modal from the Overlay - allowed the modal to be closed
   * if clicking outside of the modal
   */
  overlayClose(event) {
    if (event.path) {
      if (event.path.indexOf(this.modal.nativeElement) === -1) {
        this.onNo();
      }
    } else if (event.target) {
      if (event.target instanceof HTMLDivElement) {
        this.onNo();
      }
    }
  }
}

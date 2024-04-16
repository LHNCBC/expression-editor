import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-fhirpath-expression-help-dialog',
  templateUrl: './fhirpath-expression-help-dialog.component.html',
  styleUrls: ['./fhirpath-expression-help-dialog.component.css']
})

export class FhirpathExpressionHelpDialogComponent extends BaseDialogComponent {
  @Output() onCloseHelp: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected liveAnnouncer: LiveAnnouncer) { 
    super(liveAnnouncer);
  }

  /**
   * Emits the 'onCloseHelp' event
   */
  onNo(): void {
    this.liveAnnouncer.announce("Help dialog close.");
    setTimeout(() => {
      this.onCloseHelp.emit();
    }, 50);
  };
}


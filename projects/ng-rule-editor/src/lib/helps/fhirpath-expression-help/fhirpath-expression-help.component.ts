import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-fhirpath-expression-help',
  templateUrl: './fhirpath-expression-help.component.html',
  styleUrls: ['./fhirpath-expression-help.component.css']
})
export class FhirpathExpressionHelpComponent {
  @Input() display = false;
  @Input() variables;
  @Output() onCloseModal = new EventEmitter();
  @ViewChild('modal') modal: ElementRef;

  constructor(private liveAnnouncer: LiveAnnouncer) {}

  /**
   * Close Help Modal from the Overlay - allowed the modal to be closed
   * if clicking outside of the modal
   */
  overlayCloseHelp(event) {
    if (event.path) {
      if (event.path.indexOf(this.modal.nativeElement) === -1) {
        this.closeHelp();
      }
    } else if (event.target) {
      if (event.target instanceof HTMLDivElement) {
        this.closeHelp();
      }
    }
  }
  
  /**
   * Close Help Modal
   */
  closeHelp() {
    this.onCloseModal.emit();
  }

}

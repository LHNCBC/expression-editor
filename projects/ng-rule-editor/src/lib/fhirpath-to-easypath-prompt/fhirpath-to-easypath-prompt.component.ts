import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-fhirpath-to-easypath-prompt',
  templateUrl: './fhirpath-to-easypath-prompt.component.html',
  styleUrls: ['./fhirpath-to-easypath-prompt.component.css']
})
export class FhirpathToEasypathPromptComponent {
  @Input() lhcStyle: SimpleStyle = {};
  @Output() convert: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Close the dialog, cancelling the change from FHIRPath Expression to Easy Path Expression
   */
  onCloseClick(): void {
    this.onCloseModal.emit();
  }

  /**
   * Proceed with changing from FHIRPath Expression to Easy Path Expression
   */
  onConvertClick(): void {
    this.convert.emit();
  }
}

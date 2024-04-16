import { Component, EventEmitter, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { DialogStyle, DialogTypes, DialogSize } from '../../rule-editor.service';
import copy from 'fast-copy';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const confirmationDialogStyle = {
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
  },
  buttonPrimary: { 
    'background-color': 'navy',
    'color': 'white' 
  }
};

const helpDialogStyle = {
  dialogContentDiv: {
    'padding': '0px 0px 20px 0px',
    'width': '70%',
    'border-radius': '10px',
    'max-height': '90%'
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
    'text-align': 'left',
    'max-height': '60vh',
    'overflow-y': 'auto'
  }
};

const ruleEditorDialogStyle = {
  dialogContentDiv: { 
    'width': '90%',
    'border-radius': '10px',
    'max-height': '85vh',
    'overflow': 'hidden'
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
    'font-size': '24px',
    'text-align': 'left'},
  dialogBodyDiv: {
    'text-align': 'left',
    'max-height': '75vh',
    'overflow-y': 'auto'
  }
};

@Component({
  selector: 'lhc-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css']
})
export class BaseDialogComponent implements OnInit {
  @Input() customDialogStyle: DialogStyle = {};
  @Input() dialogType: DialogTypes;
  @Input() displayTitleBar: boolean = true;
  @Input() titleBarLabel: string = '';
  @Input() headerLabel: string = '';
  @Input() yesButtonLabel: string = 'Yes';
  @Input() noButtonLabel: string = 'No';
  @Input() yesButtonId: string = 'yes-button';
  @Input() noButtonId: string = 'no-button';
  @Input() enableOverlayClick: boolean = true;
  @Input() name: string = '';

  @Output() yes: EventEmitter<any> = new EventEmitter<any>();
  @Output() no: EventEmitter<any> = new EventEmitter<any>();
  @Output() dialogClose: EventEmitter<any> = new EventEmitter<any>();
  
  @ViewChild('modal') modal: ElementRef;

  dialogStyle = {
    'dialogTitleBar': {},
    'dialogContentDiv': {},
    'dialogHeaderDiv': {},
    'dialogBodyDiv': {},
    'dialogFooterDiv': {},
    'buttonPrimary': {},
    'buttonSecondary': {}
  };

  constructor(protected liveAnnouncer: LiveAnnouncer) {};

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    let tmpDialogStyle;
    if (this.dialogType === DialogTypes.Confirmation) {
      tmpDialogStyle = copy(confirmationDialogStyle);
    } else if (this.dialogType === DialogTypes.Help) {
      tmpDialogStyle = copy(helpDialogStyle);
    } else {
      tmpDialogStyle = copy(ruleEditorDialogStyle);
    }

    this.dialogStyle = this.applyCustomDialogStyle(tmpDialogStyle, this.customDialogStyle);

    if (!this.name)
      this.name = (this.dialogType) ? this.dialogType : "rule-editor";
  }

  /**
   * If provide, apply custom css styles to the default css styles
   * @param sourceDialogStyle - default css styles for the selected type
   * @param customDialogStyle - custom css to override the default style
   * @returns updated css styles
   */
  applyCustomDialogStyle(sourceDialogStyle, customDialogStyle) {
    Object.keys(customDialogStyle).forEach((key) => {
      const val = customDialogStyle[key];
      Object.keys(val).forEach((propKey) => {
        const propVal = val[propKey];
        const dashedPropKey = propKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        if (key in sourceDialogStyle)
        sourceDialogStyle[key][dashedPropKey] = propVal;
      });
    });

    return sourceDialogStyle;
  };


  /**
   * Emits the 'yes' event
   */
  onYes(): void {
    this.liveAnnouncer.announce("Yes is selected.");
    setTimeout(() => {
      this.yes.emit();
    }, 50);
  }

  /**
   * Emits the 'no' event
   */
  onNo(): void {
    this.liveAnnouncer.announce("No is selected.");
    setTimeout(() => {
      this.no.emit();
    }, 50);
  }

  /**
   * Emits the 'dialogClose' event
   */
  onDialogClose(): void {
    this.liveAnnouncer.announce("Dialog close." + this.dialogType);
    setTimeout(() => {
      this.dialogClose.emit();
    }, 50);
  }

  /**
   * Close Modal from the Overlay - allowed the modal to be closed
   * if clicking outside of the modal
   * @param event - mouse click event
   */
  overlayClose(event) {
    if (this.enableOverlayClick) {
      if (event.path) {
        if (event.path.indexOf(this.modal.nativeElement) === -1) {
          this.onDialogClose();
        }
      } else if (event.target) {
        if (event.target instanceof HTMLDivElement && ('__zone_symbol__clickfalse' in event.target)) {
          this.onDialogClose();
          event.stopPropagation();
        }
      }
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { SimpleStyle } from '../expression-editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lhc-syntax-preview',
  templateUrl: './syntax-preview.component.html',
  styleUrls: ['../expression-editor.component.css', './syntax-preview.component.css'],
  standalone: false
})
export class SyntaxPreviewComponent implements OnInit {
  @Input() syntax;
  @Input() lhcStyle: SimpleStyle;
  @Input() showWhenEmpty = false;
  @Input() hasError = false;
  
  constructor(private snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
  }

  /**
   * Show an ephemeral notification that the value was copied.
   */
  copyNotification(): void {
    this.snackBar.open('Copied to clipboard', null, {
      duration: 2000
    });
  }
}

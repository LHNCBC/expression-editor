import { Component, Input, OnInit } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lhc-syntax-preview',
  templateUrl: './syntax-preview.component.html',
  styleUrls: ['./syntax-preview.component.css']
})
export class SyntaxPreviewComponent implements OnInit {
  @Input() syntax;
  @Input() lhcStyle: SimpleStyle;
  @Input() showWhenEmpty = false;

  constructor(private snackBar: MatSnackBar) { }

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

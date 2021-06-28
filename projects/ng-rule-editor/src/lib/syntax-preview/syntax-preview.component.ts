import { Component, Input, OnInit } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-syntax-preview',
  templateUrl: './syntax-preview.component.html',
  styleUrls: ['./syntax-preview.component.css']
})
export class SyntaxPreviewComponent implements OnInit {
  @Input() syntax;
  @Input() style: SimpleStyle;
  @Input() showWhenEmpty = false;

  constructor() { }

  ngOnInit(): void {
  }

}

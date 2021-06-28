import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lhc-syntax-preview',
  templateUrl: './syntax-preview.component.html',
  styleUrls: ['./syntax-preview.component.css']
})
export class SyntaxPreviewComponent implements OnInit {
  @Input() syntax;
  @Input() showWhenEmpty = false;

  constructor() { }

  ngOnInit(): void {
  }

}

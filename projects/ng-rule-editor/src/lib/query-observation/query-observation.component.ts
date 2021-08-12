import { Component, Input, OnInit } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';

@Component({
  selector: 'lhc-query-observation',
  templateUrl: './query-observation.component.html',
  styleUrls: ['./query-observation.component.css']
})
export class QueryObservationComponent implements OnInit {
  @Input() variable;
  @Input() lhcStyle: SimpleStyle = {};

  constructor(private variableService: RuleEditorService) {}

  ngOnInit(): void {
  }
}

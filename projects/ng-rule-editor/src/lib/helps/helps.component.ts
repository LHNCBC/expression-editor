import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-helps',
  templateUrl: './helps.component.html',
  styleUrls: ['./helps.component.css']
})
export class HelpsComponent implements OnInit {

  @Input() type: string;
  @Input() index;

  showHelp = false;
  matToolTip = "Easy Path Expression Help";

  constructor(private liveAnnouncer: LiveAnnouncer) {}

  /**
   * Angular lifecycle hook for initialization
   */
  ngOnInit(): void {
    if (this.type === 'expression')
      this.matToolTip = "FHIRPath Expression Help";
  }

  openHelp(): void {
    this.showHelp = true;
  }

  closeHelp(): void {
    this.liveAnnouncer.announce('Help dialog closed');
    this.showHelp = false;
  }
}

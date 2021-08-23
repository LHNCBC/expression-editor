import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SimpleStyle } from '../rule-editor.service';
import Def from 'autocomplete-lhc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lhc-query-observation',
  templateUrl: './query-observation.component.html',
  styleUrls: ['./query-observation.component.css']
})
export class QueryObservationComponent implements OnInit, AfterViewInit, OnDestroy {
  queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';

  @Input() variable;
  @Input() index;
  @Input() lhcStyle: SimpleStyle = {};
  @ViewChild('autoComplete') autoCompleteElement;
  autoComplete;
  codes: Array<string>;
  timeInterval: number;
  timeIntervalUnit: string;
  expression: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.variable !== undefined) {
      this.codes = (this.variable.codes !== undefined) ? this.variable.codes.split(',') : [];
      this.timeInterval = this.variable.timeInterval || 1;
      this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
      this.expression = this.variable.expression;
    } else {
      this.codes = [];
    }
  }

  /**
   * After the autocomplete is ready to be interacted with fetch the name for
   * any codes already in the query search.
   */
  ngAfterViewInit(): void {
    this.autoComplete = new Def.Autocompleter.Search(
      this.autoCompleteElement.nativeElement, this.queryUrl,
      {
        tableFormat: true,
        valueCols: [0, 1],
        colHeaders: ['Text', 'LOINC Number'],
        maxSelect: '*',
        matchListValue: true
      });

    this.codes.forEach((code) => {
      this.http.get(`${this.queryUrl}&terms=${code}`)
        .subscribe((data) => {
          const namePosition = 3;
          const name = [data[namePosition][0][0], code].join(' - ');
          this.autoComplete.storeSelectedItem(name, code);
          this.autoComplete.addToSelectedArea(name);
        });
    });

    Def.Autocompleter.Event.observeListSelections(`autocomplete-${this.index}`, () => {
      this.codes = this.autoComplete.getSelectedCodes();
      this.onChange();
    });
  }

  /**
   * Angular lifecycle hook
   */
  ngOnDestroy(): void {
    if (this.autoComplete !== undefined) {
      this.autoComplete.destroy();
    }
  }

  /**
   * On changes update the expression and preview
   */
  onChange(): void {
    // Separate with URL encoded version of the comma: ','
    const codes = this.codes.map((e) => `http://loinc.org|${e}`).join('%2C');

    this.variable.expression = this.expression =
      `Observation?code=${codes}&` +
      `date=gt{{today()-${this.timeInterval} ${this.timeIntervalUnit}}}&patient={{%patient.id}}`;
  }
}

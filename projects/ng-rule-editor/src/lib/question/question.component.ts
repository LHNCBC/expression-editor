import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Question, Variable } from '../variable';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { Unit, UNIT_CONVERSION } from '../units';
import Def from 'autocomplete-lhc';

@Component({
  selector: 'lhc-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() variable: Variable;
  @Input() lhcStyle: SimpleStyle = {};
  @Input() index: number;
  @ViewChild('autoComplete') autoCompleteElement;
  autoComplete;
  linkId = '';
  questions: Question[] = [];
  itemHasScore = false;
  isNonConvertibleUnit = false;
  toUnit: string;
  unit: string;
  conversionOptions: Unit[];

  constructor(private variableService: RuleEditorService) {}

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.linkId = this.variable.linkId ? this.variable.linkId : '';
    this.toUnit = this.variable.unit ? this.variable.unit : '';
    if (this.variableService.questions)
      this.questions = this.variableService.questions;

    this.onChange(false);

    this.variableService.questionsChange.subscribe((questions) => {
      this.questions = questions;
    });
  }

  /**
   * Get the Question Field Item
   * @param itemText - Question Text  
   * @param itemCode - Question Code 
   */
  getQuestionFieldItem(itemText, itemCode): string {
    return itemText + ' (' + itemCode + ')'; 
  }

  /**
   * After the autocompleter is ready to be interacted with fetch the name for
   * any codes already in the query search.
   */
  ngAfterViewInit(): void {
    const keys = this.questions.map(e => this.getQuestionFieldItem(e.text, e.linkId));
    const vals = this.questions.map(v => v.linkId);

    let question;
    if (this.linkId)
      question = this.getQuestion(this.linkId);

    let opts = {
      tableFormat: false,
      codes: vals
    }

    this.autoComplete = new Def.Autocompleter.Prefetch(
      this.autoCompleteElement.nativeElement, keys, opts);

    if (question && this.linkId)
      this.autoComplete.setFieldToListValue(this.getQuestionFieldItem(question.text, this.linkId));

    Def.Autocompleter.Event.observeListSelections(`question-${this.index}`, (res) => {
      if (res.val_typed_in !== res.final_val && res.hasOwnProperty('item_code') && res.item_code) {
        // only update if link id changes
        if (res.item_code !== this.linkId) {
          this.linkId = res.item_code;
          this.onChange(true);
        }
      }
    });
  }

  /**
   * Angular lifecycle hook
   */
  ngOnDestroy(): void {
    if (this.autoComplete !== undefined) {
      // This is required to clear all the tracking observers
      this.autoComplete.clearStoredSelection();
      this.autoComplete.destroy();
    }
  }

  /**
   * Get the question based on linkId
   * @param linkId - FHIR linkId
   */
  getQuestion(linkId): Question {
    return this.questions.find((q) => {
      return q.linkId === linkId;
    });
  }

  /**
   * Get the list of units we can convert to based on the starting unit
   * @param unit - Starting unit
   */
  getConversionOptions(unit: string): Unit[] {
    return UNIT_CONVERSION[unit];
  }

  /**
   * Called when the questionnaire question or unit is changed
   * @param isQuestion - The change was for a question
   */
  onChange(isQuestion): void {
    if (isQuestion) {
      // Reset the conversion options when the question changes
      this.toUnit = '';
    }

    // If we already have a question selected (as opposed to the select... prompt)
    if (this.linkId) {
      const question = this.getQuestion(this.linkId);
      this.unit = question?.unit;
      this.conversionOptions = this.getConversionOptions(this.unit);
      this.isNonConvertibleUnit = this.unit && !this.conversionOptions;

      // Check if this is a score
      if (!this.conversionOptions && !this.isNonConvertibleUnit) {
        this.itemHasScore = this.variableService.itemHasScore(this.linkId);
      } else {
        this.itemHasScore = false;
      }

      this.variable.expression = this.variableService.valueOrScoreExpression(
        this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);

      if (this.variable.linkId !== this.linkId)
        this.variable.linkId = this.linkId;
      this.variable.unit = this.toUnit;
    }
  }
}

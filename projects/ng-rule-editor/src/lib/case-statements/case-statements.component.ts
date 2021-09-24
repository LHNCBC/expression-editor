import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CASE_REGEX, CaseStatement, Variable } from '../variable';
import { MathToFhirpathPipe } from '../math-to-fhirpath.pipe';

@Component({
  selector: 'lhc-case-statements',
  templateUrl: './case-statements.component.html',
  styleUrls: ['./case-statements.component.css']
})
export class CaseStatementsComponent implements OnInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() syntax: string;
  @Input() simpleExpression: string;
  @Input() expression: string;

  @Output() expressionChange = new EventEmitter<string>();

  defaultCase: string;
  simpleDefaultCase: string;
  cases: Array<CaseStatement> = [{condition: '', simpleCondition: '', output: '', simpleOutput: ''}];
  output = '';

  constructor(private ruleEditorService: RuleEditorService) { }

  /**
   * Angular lifecycle hook for initialization
   */
  ngOnInit(): void {
    if (this.syntax === 'fhirpath' && this.expression !== undefined) {
      this.parseIif(this.expression, 0);
    } else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
      this.parseIif(this.simpleExpression, 0);
    }
    this.output = this.getIif(0);
    this.expressionChange.emit(this.output);
  }

  /**
   * Called when adding a new case
   */
  onAdd(): void {
    this.cases.push({condition: '', simpleCondition: '', output: '', simpleOutput: ''});
    this.onChange();
    // TODO select next input box that was added
  }

  /**
   * Remove the case at an index
   * @param i - index to remove
   */
  onRemove(i): void {
    this.cases.splice(i, 1);
    this.onChange();
  }

  /**
   * Angular lifecycle hook for changes
   */
  onChange(): void {
    this.output = this.getIif(0);
    this.expressionChange.emit(this.output);
  }

  /**
   * Parse iif expression at specified level. Top level is 0
   * @param expression - expression to parse
   * @param level - depth or level of expression nesting
   * @param simple - true if parsing a simple expression
   */
  parseIif(expression: string, level: number, simple?: boolean): boolean {
    // If expressions don't start with iif( and end with ) they cannot be parsed
    const matches = expression.match(CASE_REGEX);

    if (matches !== null) {
      const iifContents = matches[1];
      let commaMatches = 0;
      let nestingLevel = 0;
      let comma1 = 0;
      let comma2 = 0;

      for (let i = 0; i < iifContents.length; i++) {
        switch (iifContents[i]) {
          case '(':
            nestingLevel++;
            break;
          case ')':
            nestingLevel--;
            break;
          case ',':
            if (nestingLevel === 0) {
              commaMatches++;
              if (comma1 === 0) {
                comma1 = i;
              } else if (comma2 === 0) {
                comma2 = i;
              }
            }
            break;
        }
      }

      if (commaMatches === 2 && nestingLevel === 0) {
        // Clear out any existing cases if we have a match for iif
        if (level === 0) {
          this.cases = [];
        }
        const condition = iifContents.substring(0, comma1).trim();
        const trueCase = iifContents.substring(comma1 + 1, comma2).trim();
        const falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();

        if (simple) {
          const pipe = new MathToFhirpathPipe();
          const variableNames = this.ruleEditorService.variables.map(e => e.label);

          this.cases.push({
            simpleCondition: condition,
            simpleOutput: trueCase,
            condition: pipe.transform(condition, this.ruleEditorService.variables.map(e => e.label)),
            output: pipe.transform(trueCase, variableNames)
          });
        } else {
          this.cases.push({
            condition,
            output: trueCase
          });
        }

        const parseResult = this.parseIif(falseCase, level + 1);
        if (parseResult === false && !simple) {
          this.defaultCase = falseCase;
        } else if (parseResult === false && simple) {
          this.simpleDefaultCase = falseCase;
        }

        return true;
      }
    }

    return false;
  }

  /**
   * Get an iif expression given a nesting level
   * @param level - nesting level
   */
  getIif(level): string {
    const levels = this.cases.length;

    if (level === levels - 1) {
      return `iif(${this.cases[level].condition},${this.cases[level].output},${this.defaultCase})`;
    } else {
      return `iif(${this.cases[level].condition},${this.cases[level].output},${this.getIif(level + 1)})`;
    }
  }

  /**
   * Drag and drop rearrange of variable order
   * @param event - drag and drop event
   */
  drop(event: CdkDragDrop<Variable[]>): void {
    moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
    this.output = this.getIif(0);
    this.expressionChange.emit(this.output);
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CASE_REGEX, CaseStatement, Variable } from '../variable';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';

@Component({
  selector: 'lhc-case-statements',
  templateUrl: './case-statements.component.html',
  styleUrls: ['./case-statements.component.css']
})
export class CaseStatementsComponent implements OnInit, OnChanges {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() syntax: string;
  @Input() simpleExpression: string;
  @Input() expression: string;

  @Output() expressionChange = new EventEmitter<string>();
  @Output() simpleChange = new EventEmitter<string>();

  STRING_REGEX = /^'(.*)'$/;
  pipe = new EasyPathExpressionsPipe();
  outputExpressions = true;
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
      this.parseSimpleCases();
    }

    this.output = this.getIif(0);
  }

  /**
   * Parses the Easy Path expression and populates the case editor. Toggles "use
   * expressions" off if output is only strings.
   */
  parseSimpleCases(): void {
    this.parseIif(this.simpleExpression, 0);

    // If all output values are strings toggle off "use expressions"
    const outputString = this.cases.find(e => (!this.isString(e.simpleOutput)));
    const defaultIsString = this.isString(this.simpleDefaultCase);

    if (outputString === undefined && defaultIsString) {
      this.outputExpressions = false;
      // Remove quotes from output strings and default case
      this.cases.forEach(e => {
        e.simpleOutput = this.removeQuotes(e.simpleOutput);
      });
      this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
    }
  }

  /**
   * Checks if the expression is a string
   */
  isString(expression: string): boolean {
    return this.STRING_REGEX.test(expression);
  }

  /**
   * Removes surrounding quotes
   */
  removeQuotes(expression: string): string {
    return expression.match(this.STRING_REGEX)[1];
  }

  /**
   * Angular lifecycle hook for changes
   */
  ngOnChanges(changes): void {
    if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
      this.parseSimpleCases();
      this.onChange();
    } else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
      this.outputExpressions = true;
      this.parseIif(this.expression, 0);
      this.onChange();
    }
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
    this.simpleChange.emit(this.simpleExpression);
  }

  /**
   * Parse iif expression at specified level. Top level is 0
   * @param expression - expression to parse
   * @param level - depth or level of expression nesting
   */
  parseIif(expression: string, level: number): boolean {
    // If expressions don't start with iif( and end with ) they cannot be parsed
    const matches = expression.match(CASE_REGEX);

    if (matches !== null) {
      const iifContents = matches[1];
      let commaMatches = 0;
      let nestingLevel = 0;
      let comma1 = -1;
      let comma2 = -1;

      // Check where the ',' is relative to depth as indicated by parenthesis
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
              if (comma1 === -1) {
                comma1 = i;
              } else if (comma2 === -1) {
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

        if (this.syntax === 'simple') {
          const variableNames = this.ruleEditorService.variables.map(e => e.label);

          this.cases.push({
            simpleCondition: condition,
            simpleOutput: trueCase,
            condition: this.pipe.transform(condition, variableNames),
            output: this.pipe.transform(trueCase, variableNames)
          });
        } else {
          this.cases.push({
            condition,
            output: trueCase
          });
        }

        const parseResult = this.parseIif(falseCase, level + 1);
        if (parseResult === false && this.syntax !== 'simple') {
          this.defaultCase = falseCase;
        } else if (parseResult === false && this.syntax === 'simple') {
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
  getIif(level: number): string {
    const isSimple = this.syntax === 'simple';
    const output = this.transformIfSimple(isSimple ?
      this.cases[level].simpleOutput :
      this.cases[level].output, true);
    const condition = this.transformIfSimple(isSimple ?
      this.cases[level].simpleCondition :
      this.cases[level].condition, false);

    if (level === this.cases.length - 1) {
      const defaultCase = this.transformIfSimple(isSimple ?
        this.simpleDefaultCase : this.defaultCase, true);
      return `iif(${condition},${output},${defaultCase})`;
    } else {
      return `iif(${condition},${output},${this.getIif(level + 1)})`;
    }
  }

  /**
   * Transform the expression parameter if the syntax type is Easy Path,
   * otherwise return the expression. Additionally if this is an output column
   * and output expressions are off surround with quotes.
   * @param expression - Easy Path or FHIRPath expression
   * @param isOutput - True if processing an output or default value
   * @return FHIRPath Expression
   */
  transformIfSimple(expression: string, isOutput: boolean): string {
    if (expression === undefined) {
      return '';
    }

    let processedExpression = expression;

    if (isOutput && !this.outputExpressions) {
      processedExpression = `'${processedExpression}'`;  // TODO should we escape the expression?
    }

    // Convert when syntax is simple but not in the output column is outputExpressions is disabled
    if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
      return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(e => e.label));
    } else {
      return processedExpression;
    }
  }

  /**
   * Drag and drop rearrange of variable order
   * @param event - drag and drop event
   */
  drop(event: CdkDragDrop<Variable[]>): void {
    moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
    this.onChange();
  }
}

import { ChangeDetectorRef,  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,
         ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CASE_REGEX, CaseStatement, ValidationError, Variable, FieldTypes, SectionTypes } from '../variable';
import { EasyPathExpressionsPipe } from '../easy-path-expressions.pipe';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgModel } from '@angular/forms';
import * as fhirpath from 'fhirpath';

@Component({
  selector: 'lhc-case-statements',
  templateUrl: './case-statements.component.html',
  styleUrls: ['../rule-editor.component.css', './case-statements.component.css']
})
export class CaseStatementsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() syntax: string;
  @Input() simpleExpression: string;
  @Input() expression: string;

  @Output() expressionChange = new EventEmitter<string>();
  @Output() simpleChange = new EventEmitter<string>();

  @ViewChildren('caseConditionRef') caseConditionRefs: QueryList<NgModel>;
  @ViewChildren('caseOutputRef') caseOutputRefs: QueryList<NgModel>;
  @ViewChild('caseDefaultRef') caseDefaultRef:NgModel;
 
  STRING_REGEX = /^'(.*)'$/;
  pipe = new EasyPathExpressionsPipe();
  outputExpressions = true;
  defaultCase: string;
  simpleDefaultCase: string;
  cases: Array<CaseStatement> = [{condition: '', simpleCondition: '', output: '', simpleOutput: ''}];

  output = '';
  hidePreview = false;

  hasError = false;
  defaultCaseError = '';
  performValidationSubscription;

  constructor(private ruleEditorService: RuleEditorService,
              private liveAnnouncer: LiveAnnouncer,
              private changeDetectorRef: ChangeDetectorRef) {}

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

    // performValidationSubscription is triggered when the 'Save' button is clicked, allowing each
    // subscribed component to validate the expression data.
    this.performValidationSubscription = this.ruleEditorService.performValidationChange.subscribe((validation) => {
      this.caseConditionRefs.forEach((cc, index) => {
        if (!cc.control.value || cc.control.value === "") {
          cc.control.markAsTouched();
          cc.control.markAsDirty();
        }
      });
      this.caseOutputRefs.forEach((co, index) => {
        if (!co.control.value || co.control.value === "") {
          co.control.markAsTouched();
          co.control.markAsDirty();
        }
      });

      if (!this.caseDefaultRef.control.value || this.caseDefaultRef.control.value === "") {
        this.caseDefaultRef.control.markAsTouched();
        this.caseDefaultRef.control.markAsDirty();
      }
      this.onChange();
    });
  }

  /**
   * Angular lifecycle hook called before the component is destroyed
   */
  ngOnDestroy(): void {
    this.performValidationSubscription.unsubscribe();
  }

  /**
   * Perform check on any Case statement errors 
   */
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    this.updateCaseStatementsErrors();
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

    this.changeDetectorRef.detectChanges();
    this.updateCaseStatementsErrors();
  }

  /**
   * Compose the error result object based on the results: 'Not Valid', 'Required' or null
   * @param key - Section of the case statement: 'condition' or 'output'
   * @param result - 'Not Valid' or 'Required'
   * @return ValidationError object or null if there is no error
   */
  composeErrorResultObject(key: string, result: string): ValidationError {
    let errorObj = null;
    if (result === 'Not valid') {
      errorObj = {
        "invalidCaseStatementError": true,
        "message": "The " + key + " is invalid.",
        "ariaMessage": "The " + key + " is invalid."
      };
    } else if (result ===  'Required') {
      errorObj = {
        "invalidCaseStatementError": true,
        "message": "The " + key + " is required.",
        "ariaMessage": "The " + key + " is required."
      };
    }
    return errorObj;
  };

  /**
   * Set error or null (no error) for the given element.  
   * @param element - the case element
   * @param index - case statement index
   * @param type - case element type: 'condition' or 'output'
   * @return true if element contains error, false otherwise
   */
  setElementError(element:any, index:number, type: string): boolean {
    let hasError = false;
    let result = null;
    if (type in this.cases[index].error) {
      hasError = true;
      result = this.composeErrorResultObject('case ' + type, this.cases[index].error[type]);
    }
    setTimeout(()=> {
      element.control.setErrors(result);
    }, 0);
    return hasError;
  }

  /**
   * Loop through case statement elements of the given type and check for validation errors.
   * @param caseElements - QueryList of elements to check for validation errors
   * @param type - case element type: 'condition' or 'output'
   * @return true if the selected 'type' contains error.
   */
  checkAndUpdateCaseErrors(caseElements: any, type: string): boolean {
    let hasError = false;
    caseElements.forEach((c, index) => {
      if ((c.dirty && c.control.value === "") || (c.control.value)) {
        const errorFound = this.setElementError(c, index, type);
        if (errorFound)
          hasError = true;
      }
    });

    return hasError;
  };

  /**
   * Check for validation errors on the default case
   * @return true if the default case contains error.
   */
  checkAndUpdateDefaultCaseError(): boolean {
    let result = null;
    if ((this.caseDefaultRef.dirty ) || (this.caseDefaultRef.control.value)) {
      result = this.composeErrorResultObject('default case', this.defaultCaseError);
    }

    setTimeout(()=> {
      this.caseDefaultRef.control.setErrors(result);
    }, 0);
    return (result !== null);
  };

  /**
   * Based on the validation result on the Case Statements, updates error status
   * for each of the elements in the Case Statements (case conditions, case outputs,
   * and default case) and notify the Rule Editor component on the status.
   */
  updateCaseStatementsErrors(): void {
    const param = {
      "section" : SectionTypes.OutputExpression,
      "field": FieldTypes.Case
    };

    const hasConditionErrors = this.checkAndUpdateCaseErrors(this.caseConditionRefs, 'condition');
    const hasOutputErrors = this.checkAndUpdateCaseErrors(this.caseOutputRefs, 'output');
    const hasDefaultCaseError = this.checkAndUpdateDefaultCaseError();

    let result = null;
    if (hasConditionErrors || hasOutputErrors || hasDefaultCaseError) {
      this.hasError = true;
      result = {
        "CaseStatementError": true,
        "message": "Case Statement error",
        "ariaMessage": "Case Statement error"
      }
    } else 
      this.hasError = false;
    this.ruleEditorService.notifyValidationResult(param, result);

  };

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
   * Check results from calling transformIfSimple() on case statement condition, output, and default case
   * and set the error if any. If the result from the transformation is blank, then the error is now set 
   * to 'Required'.
   * @param level - case statement index row
   * @param condition - transformation result for the case statement condition 
   * @param output - transformation result for the case statement output
   * @param defaultCase - transformation result for the case statement default case
   */
  setCaseStatementsErrors(level: number, condition: string, output: string, defaultCase: string): void {
    this.cases[level].error = {};

    if (condition === 'Not valid')
      this.cases[level].error['condition'] = condition;
    else if (condition === '')
      this.cases[level].error['condition'] = 'Required';

    if (output === 'Not valid')
      this.cases[level].error['output'] = output;
    else if (output === '' || output === "''")
      this.cases[level].error['output'] = 'Required';

    if (defaultCase === 'Not valid')
      this.defaultCaseError = defaultCase;
    else if (defaultCase === '')
      this.defaultCaseError = 'Required';
    else
      this.defaultCaseError = '';
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

    const defaultCase = this.transformIfSimple(isSimple ?
      this.simpleDefaultCase : this.defaultCase, true);

    this.setCaseStatementsErrors(level, condition, output, defaultCase);

    if (level === 0) {
      const previousValue = this.hidePreview;
      this.hidePreview = condition === '' || output === '' || defaultCase === '';

      if (!this.hidePreview && previousValue !== this.hidePreview) {
        this.liveAnnouncer.announce('A FHIRPath conversion preview has appeared below.');
      }
    }

    if (level === this.cases.length - 1) {
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
   * @param isOutput - True if processing the Case output or default case.
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

    if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
      return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(e => e.label));
    } else {
      // Calling fhirpath.evaluate only on Case condition.
      if (!isOutput) {
        try {
          const variableNames = this.ruleEditorService.getContextVariableNamesForExpressionValidation();
          const result = fhirpath.evaluate({}, processedExpression, variableNames);
          return processedExpression;
        } catch(e) {
          return 'Not valid';
        }
      } else
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

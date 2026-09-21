import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaseStatementsComponent } from './case-statements.component';
import { ExpressionEditorService } from '../expression-editor.service';

describe('CaseStatementsComponent', () => {
  let component: CaseStatementsComponent;
  let fixture: ComponentFixture<CaseStatementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CaseStatementsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse simple iif', () => {
    const expectedCases = [{condition: 'true', output: '1'}];
    const expectedDefaultOutput = '0';

    expect(component.parseIif('iif(true, 1, 0)', 0)).toBeTrue();
    expect(component.cases).toEqual(expectedCases);
    expect(component.defaultCase).toEqual(expectedDefaultOutput);
    expect(component.parseIif('iif(true,1,0)', 0)).toBeTrue();
    expect(component.cases).toEqual(expectedCases);
    expect(component.defaultCase).toEqual(expectedDefaultOutput);
  });

  it('should parse multiple level iif', () => {
    const expectedCases = [
      {condition: 'true', output: '1'},
      {condition: 'false', output: '2'}
    ];
    const expectedDefaultOutput = '3';

    expect(component.parseIif('iif(true, 1, iif(false, 2, 3))', 0)).toBeTrue();
    expect(component.cases).toEqual(expectedCases);
    expect(component.defaultCase).toEqual(expectedDefaultOutput);
    expect(component.parseIif('iif(true,1,iif(false,2,3))', 0)).toBeTrue();
    expect(component.cases).toEqual(expectedCases);
    expect(component.defaultCase).toEqual(expectedDefaultOutput);
  });

  it('should parse complex multiple level iif', () => {
    const expectedCases = [
      {condition: 'iif(true, 1, 0)', output: 'iif(true, 2, 3)'},
      {condition: 'false', output: '2'}
    ];
    const expectedDefaultOutput = '3';

    expect(component.parseIif('iif(iif(true, 1, 0), iif(true, 2, 3), iif(false, 2, 3))', 0)).toBeTrue();
    expect(component.cases).toEqual(expectedCases);
    expect(component.defaultCase).toEqual(expectedDefaultOutput);
  });

  it('should not parse non-iif expressions', () => {
    expect(component.parseIif('%bmi', 0)).toBeFalse();
    expect(component.parseIif('%bmi * iif(true, 1, 0)', 0)).toBeFalse();
  });

  it('should reject launch context fallback when validating extraction cases', () => {
    const service = TestBed.inject(ExpressionEditorService);
    spyOn(service, 'isExtractionExpression').and.returnValue(true);
    component.syntax = 'fhirpath';
    component.outputExpressions = true;

    const result = component.transformIfSimple('condition', '%patient.id', false, false, null);

    expect(result).toBe(
      '%patient is not available in an extraction expression. ' +
      'Use an allocated ID or an extraction-context variable instead.'
    );
    expect(component.composeErrorResultObject('condition', result)).toEqual({
      invalidCaseStatementError: true,
      message: result,
      ariaMessage: result
    });
  });

  [
    "iif(%context.answer.exists(), %patient.id, 'no-answer')",
    '%context.answer.select(%patient.id)'
  ].forEach(expression => {
    it(`should reject conditional launch context references in extraction cases: ${expression}`, () => {
      const service = TestBed.inject(ExpressionEditorService);
      spyOn(service, 'isExtractionExpression').and.returnValue(true);
      spyOn(service, 'getContextVariableNamesForExpressionValidation').and.returnValue({
        context: { answer: [] }
      });
      component.syntax = 'fhirpath';
      component.outputExpressions = true;

      const result = component.transformIfSimple('condition', expression, false, false, null);

      expect(result).toBe(
        '%patient is not available in an extraction expression. ' +
        'Use an allocated ID or an extraction-context variable instead.'
      );
    });
  });

  [
    '%patient.id.exists()',
    'iif(%context.answer.exists(), %patient.id.exists(), false)'
  ].forEach(condition => {
    it(`should block extraction cases with string outputs and a forbidden condition: ${condition}`, () => {
      const service = TestBed.inject(ExpressionEditorService);
      spyOn(service, 'isExtractionExpression').and.returnValue(true);
      spyOn(service, 'getContextVariableNamesForExpressionValidation').and.returnValue({
        context: { answer: [] }
      });
      component.syntax = 'fhirpath';
      component.outputExpressions = false;
      component.cases = [{ condition, output: 'yes' }];
      component.defaultCase = 'no';
      fixture.detectChanges();

      component.onChange();

      expect(component.cases[0].error.condition).toBe(
        '%patient is not available in an extraction expression. ' +
        'Use an allocated ID or an extraction-context variable instead.'
      );
      expect(component.hasError).toBeTrue();
      expect(service.getValidationResult().errorInOutputCaseStatement).toBeTrue();
    });
  });

  it('should treat output and default values as strings when output expressions are disabled', () => {
    const service = TestBed.inject(ExpressionEditorService);
    spyOn(service, 'isExtractionExpression').and.returnValue(true);
    component.syntax = 'fhirpath';
    component.outputExpressions = false;

    expect(component.transformIfSimple('condition', 'true', false, false, null)).toBe('true');
    expect(component.transformIfSimple('output', '%patient.id', true, false, null))
      .toBe("'%patient.id'");
    expect(component.transformIfSimple('default', '%encounter.id', true, false, null))
      .toBe("'%encounter.id'");
  });

  [true, false].forEach(outputExpressions => {
    it(`should allow %ucum in extraction case conditions when outputExpressions is ${outputExpressions}`, () => {
      const service = TestBed.inject(ExpressionEditorService);
      spyOn(service, 'isExtractionExpression').and.returnValue(true);
      spyOn(service, 'getContextVariableNamesForExpressionValidation').and.returnValue({
        context: {
          answer: [{
            valueQuantity: { system: 'http://unitsofmeasure.org' }
          }]
        }
      });
      component.syntax = 'fhirpath';
      component.outputExpressions = outputExpressions;
      const expression = "iif(%context.answer.valueQuantity.system = %ucum, 'ucum', 'other')";

      expect(component.transformIfSimple('condition', expression, false, false, null))
        .toBe(expression);
    });
  });

  it('should preserve launch context warnings for ordinary cases', () => {
    const service = TestBed.inject(ExpressionEditorService);
    spyOn(service, 'isExtractionExpression').and.returnValue(false);
    component.syntax = 'fhirpath';
    component.outputExpressions = true;

    expect(component.transformIfSimple('condition', '%patient.id', false, false, null))
      .toBe(ExpressionEditorService.EXP_LAUNCH_CONTEXT_ERR_MSG);
  });
});

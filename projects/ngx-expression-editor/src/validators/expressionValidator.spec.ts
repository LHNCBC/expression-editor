import { FormControl } from '@angular/forms';
import { FieldTypes, SectionTypes, ValidationParam } from '../lib/variable';
import { expressionValidator } from './expressionValidator';

describe('expressionValidator', () => {
  const validationParam: ValidationParam = {
    section: SectionTypes.OutputExpression,
    field: FieldTypes.Expression,
    type: 'fhirpath',
    variableNames: '{}',
    launchContext: JSON.stringify({ patient: 1, encounter: 1 })
  };

  ['patient', 'encounter'].forEach(launchContextVariable => {
    it(`should reject %${launchContextVariable} when launch context fallback is disabled`, () => {
      const control = new FormControl(`%${launchContextVariable}.id`);

      const result = expressionValidator(
        validationParam,
        false,
        ['patient', 'encounter']
      )(control);

      expect(result?.invalidExpressionError).toBeTrue();
      expect(result?.invalidExpressionWarning).toBeUndefined();
      expect(result?.message).toBe(
        `%${launchContextVariable} is not available in an extraction expression. ` +
        'Use an allocated ID or an extraction-context variable instead.'
      );
    });
  });

  it('should keep the generic error while a launch context variable name is incomplete', () => {
    const control = new FormControl('%pat');

    const result = expressionValidator(validationParam, false, ['patient', 'encounter'])(control);

    expect(result?.invalidExpressionError).toBeTrue();
    expect(result?.message).toBe('Invalid expression.');
  });

  it('should preserve launch context warnings when fallback is enabled', () => {
    const control = new FormControl('%patient.id');

    const result = expressionValidator(validationParam)(control);

    expect(result?.invalidExpressionWarning).toBeTrue();
    expect(result?.invalidExpressionError).toBeUndefined();
  });

  [
    "iif(%context.answer.exists(), %patient.id, 'no-answer')",
    '%context.answer.select(%patient.id)'
  ].forEach(expression => {
    it(`should reject a conditional extraction reference in ${expression}`, () => {
      const control = new FormControl(expression);
      const extractionValidationParam = {
        ...validationParam,
        variableNames: JSON.stringify({ context: { answer: [] } })
      };

      const result = expressionValidator(
        extractionValidationParam,
        false,
        ['patient', 'encounter']
      )(control);

      expect(result?.invalidExpressionError).toBeTrue();
      expect(result?.message).toBe(
        '%patient is not available in an extraction expression. ' +
        'Use an allocated ID or an extraction-context variable instead.'
      );
    });
  });

  it('should reject an unavailable non-launch variable in an unexecuted branch', () => {
    const control = new FormControl("iif(%context.answer.exists(), %bmi, 'no-answer')");
    const extractionValidationParam = {
      ...validationParam,
      variableNames: JSON.stringify({ context: { answer: [] } })
    };

    const result = expressionValidator(extractionValidationParam, false, ['patient'])(control);

    expect(result?.invalidExpressionError).toBeTrue();
    expect(result?.message).toBe('Invalid expression.');
  });

  it('should ignore variable-like text in string literals', () => {
    const control = new FormControl("'%patient.id'");

    const result = expressionValidator(validationParam, false, ['patient'])(control);

    expect(result).toBeNull();
  });

  it('should allow variables introduced by defineVariable', () => {
    const control = new FormControl(
      "%context.answer.defineVariable('localAnswer').select(%localAnswer.valueString)"
    );
    const extractionValidationParam = {
      ...validationParam,
      variableNames: JSON.stringify({ context: { answer: [] } })
    };

    const result = expressionValidator(extractionValidationParam, false, ['patient'])(control);

    expect(result).toBeNull();
  });

  it('should not treat a conditional defineVariable as available in another branch', () => {
    const control = new FormControl(
      "iif(%context.answer.exists(), %patient.id, %context.defineVariable('patient'))"
    );
    const extractionValidationParam = {
      ...validationParam,
      variableNames: JSON.stringify({ context: { answer: [] } })
    };

    const result = expressionValidator(extractionValidationParam, false, ['patient'])(control);

    expect(result?.invalidExpressionError).toBeTrue();
    expect(result?.message).toBe(
      '%patient is not available in an extraction expression. ' +
      'Use an allocated ID or an extraction-context variable instead.'
    );
  });
});

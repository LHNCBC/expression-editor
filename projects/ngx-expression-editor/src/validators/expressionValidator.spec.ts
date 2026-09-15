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
});

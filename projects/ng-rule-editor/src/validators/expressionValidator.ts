import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError, ValidationParam, FieldTypes } from '../lib/variable';
import * as fhirpath from 'fhirpath';
import { EasyPathExpressionsPipe } from '../lib/easy-path-expressions.pipe';

/**
 * Validates the expression for empty or invalid expression.
 * @param param - ValidationParam object that contains must contain at least the section and field
 *                information.
 * @return error object if validation failed, otherwise returns null
 */
export function expressionValidator(param: ValidationParam): ValidatorFn {
  return (control:AbstractControl) : ValidationError | null => { //{[key: string]: any} | null => {
    if (!control.value && control.dirty) {
      if (param.type === "queryObservation" && param.field === FieldTypes.TimeInterval) {
        return { 
          'timeIntervalRequiredError': true,
          'message': 'Time interval is required.',
          'ariaMessage': 'Time interval is required.'
        };

      } else {
        return { 
          'expressionRequiredError': true,
          'message': 'Expression is required.',
          'ariaMessage': 'Expression is required.'
        };
      }
    } else if ((control.value && control.dirty) || (control.value && !control.dirty)) {
      if (param.type === "fhirpath") {
        try {
          // Use fhirpath.js to evaluate the expression.  If exception is thrown, then returns
          // the invalidExpressionError
          const result = fhirpath.evaluate({}, control.value, JSON.parse(param.variableNames));
        } catch(e) {
          return { 
            'invalidExpressionError': true,
            'message': 'Invalid expression.',
            'ariaMessage': 'Invalid expression.'
          };
        }
      } else if (param.type === "simple") {
        // Converts the array into string array
        const varStringArr = [];
        for (const v of param.variables) {
          varStringArr.push(v.toString());
        }

        // Perform the conversion from Easy Path Expression to FHIRPath Expression.
        // If the result is 'Not valid' or empty, then return an error.
        const jsToFhirPathPipe = new EasyPathExpressionsPipe();
        const fhirPath: string = jsToFhirPathPipe.transform(control.value, varStringArr);

        if (fhirPath === 'Not valid') {
          return { 
            'invalidExpressionError': true,
            'message': 'Invalid expression.',
            'ariaMessage': 'Invalid expression.'
          };
        } else if (fhirPath === '') {
          return { 
            'expressionRequiredError': true,
            'message': 'Expression is required.',
            'ariaMessage': 'Expression is required.'
          };
        }
      }
    }

    return null;
  }
}
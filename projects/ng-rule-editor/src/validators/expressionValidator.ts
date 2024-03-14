import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError, ValidationParam, FieldTypes } from '../lib/variable';
import * as fhirpath from 'fhirpath';
import { EasyPathExpressionsPipe } from '../lib/easy-path-expressions.pipe';
import * as constants from "../lib/validation";

/**
 * Get the error message for the given type and field.
 * @param type - variable type (fhirpath, query, queryObservation, question, simple)
 * @param field - field type (expression or timeInterval)
 * @return required error message for the given type and field
 */
function getRequiredErrorMessage(type, field): string {
  if (type === "question")
    return constants.QUESTION_REQUIRED;
  else if (type === "query")
    return constants.FHIR_QUERY_REQUIRED;
  else if (type === "queryObservation") {
    if (field !== FieldTypes.TimeInterval)
      return constants.FHIR_QUERY_OBSERVATION_REQUIRED;
    else
      return constants.TIME_INTERVAL_REQUIRED;
  }
  else
    return constants.EXPRESSION_REQUIRED;
}

/**
 * Compose the Required error 
 * @param type - variable type (fhirpath, query, queryObservation, question, simple)
 * @param field - field type (expression or timeInterval)
 * @returns Required error object
 */
function getRequiredErrorObject(type, field): ValidationError {
  const msg = getRequiredErrorMessage(type, field);
  if (type === "queryObservation" && field === FieldTypes.TimeInterval) {
    return {
      'timeIntervalRequiredError': true,
      'message': msg,
      'ariaMessage': msg
    }
  }

  return {
    'expressionRequiredError': true,
    'message': msg,
    'ariaMessage': msg
  }
}

/**
 * Compose the Invalid Expression error
 * @returns Invalid expression error object
 */
function getInvalidExpressionErrorObject(): ValidationError {
  return {
    'invalidExpressionError': true,
    'message': constants.INVALID_EXPRESSION,
    'ariaMessage': constants.INVALID_EXPRESSION
  }
}

/**
 * Validates the expression for empty or invalid expression.
 * @param param - ValidationParam object that contains must contain at least the section and field
 *                information.
 * @return A validation function that returns an error object if the validation fails, or null otherwise.
 */
export function expressionValidator(param: ValidationParam): ValidatorFn {
  return (control:AbstractControl) : ValidationError | null => {
    if (!control.value && control.dirty) {
      return getRequiredErrorObject(param.type, param.field);
    } else if ((control.value && control.dirty) || (control.value && !control.dirty)) {
      if (param.type === "fhirpath") {
        try {
          // Use fhirpath.js to evaluate the expression.  If exception is thrown, then returns
          // the invalidExpressionError
          const result = fhirpath.evaluate({}, control.value, JSON.parse(param.variableNames));
        } catch(e) {
          return getInvalidExpressionErrorObject();
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
          return getInvalidExpressionErrorObject();
        } else if (fhirPath === '') {
          return getRequiredErrorObject(param.type, param.field);
        }
      }
    }

    return null;
  }
}
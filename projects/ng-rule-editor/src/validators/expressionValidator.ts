import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError, ValidationParam } from '../lib/variable';

/**
 * 
 * @param param 
 * @return error object if validation failed, otherwise returns null
 */
export function expressionValidator(param: ValidationParam): ValidatorFn {
  return (control:AbstractControl) : ValidationError | null => { //{[key: string]: any} | null => {
    if (!control.value) {
      return { 
                'requiredError': true,
                'message': 'Expression is required.',
                'ariaMessage': 'Expression is required.'
              };
    } else
      return null;
  }
}
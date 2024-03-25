import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RuleEditorService } from '../lib/rule-editor.service';
import { ReservedWords, StartsWithReservedWords } from '../lib/reserved-variable-names';
import * as constants from "../lib/validation";

export function variableNameValidator(ruleEditorService: RuleEditorService, param: any): ValidatorFn {
  
  return (control:AbstractControl) : {[key: string]: any} | null => {
    if (control.pristine)
      return null;

    const launchContextVariableNames = ruleEditorService.getCurrentContextUneditableVariableNames();
    const contextVariableNames = ruleEditorService.getCurrentContextVariableNames();

    contextVariableNames.splice(param.index, 1);

    const startWithReservedWordsPattern = new RegExp(StartsWithReservedWords.join("|"), "i");
    const reservedWordsPattern = new RegExp(ReservedWords.join("|"), "i");

    if (!control.value) {
      return { 
        'variableNameRequiredError': true,
        'message': constants.VARIABLE_NAME_REQUIRED,
        'ariaMessage': constants.VARIABLE_NAME_REQUIRED
      };
    } else if (contextVariableNames.includes(control.value)) {
      return { 
        'duplicateVariableNameError': true,
        'message': constants.VARIABLE_NAME_EXISTS_IN_ITEM,
        'ariaMessage': constants.VARIABLE_NAME_EXISTS_IN_ITEM
      };
    } else if (startWithReservedWordsPattern.test(control.value)) {
      const msg = constants.getStartWithsErrorMessage(control.value);
      return { 
        'reservedWordsNameError': true,
        'message': msg,
        'ariaMessage': msg
      };  
    } else if (reservedWordsPattern.test(control.value)) {
      return { 
        'reservedWordsNameError': true,
        'message': constants.VARIABLE_NAME_MATCHES_RESERVED_WORD,
        'ariaMessage': constants.VARIABLE_NAME_MATCHES_RESERVED_WORD
      };  
    } else if (launchContextVariableNames.includes(control.value)) {
      return { 
        'launchContextNameError': true,
        'message': constants.VARIABLE_NAME_EXISTS_IN_ITEM,
        'ariaMessage': constants.VARIABLE_NAME_EXISTS_IN_ITEM
      };
    } else
      return null;

  }
}
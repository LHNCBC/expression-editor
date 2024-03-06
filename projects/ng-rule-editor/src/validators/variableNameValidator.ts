import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RuleEditorService } from '../lib/rule-editor.service';
import { FhirPathContexts, EnvironmentVariables } from '../lib/reserved-variable-names';
import * as constants from "../lib/validation";

export function variableNameValidator(ruleEditorService: RuleEditorService, param: any): ValidatorFn {
  
  return (control:AbstractControl) : {[key: string]: any} | null => {
    if (control.pristine)
      return null;

    const launchContextVariableNames = ruleEditorService.getCurrentContextUneditableVariableNames();
    const contextVariableNames = ruleEditorService.getCurrentContextVariableNames();

    contextVariableNames.splice(param.index, 1);
    const regexPattern = new RegExp(EnvironmentVariables.join("|"), "i");

    if (!control.value) {
      return { 
        'variableNameRequiredError': true,
        'message': constants.VARIABLE_NAME_REQUIRED,
        'ariaMessage': constants.VARIABLE_NAME_REQUIRED
      };
    } else if (contextVariableNames.includes(control.value)) {
      return { 
        'duplicateVariableNameError': true,
        'message': constants.VARIABLE_NAME_EXISTS,
        'ariaMessage': constants.VARIABLE_NAME_EXISTS
      };
    } else if (FhirPathContexts.includes(control.value)) {
      return { 
        'fhirPathContextNameError': true,
        'message': constants.VARIABLE_NAME_MATCHES_FHIRPATH_CONTEXT,
        'ariaMessage': constants.VARIABLE_NAME_MATCHES_FHIRPATH_CONTEXT
      };    
    } else if (regexPattern.test(control.value)) {
      return { 
        'environmentVariableNameError': true,
        'message': constants.VARIABLE_NAME_MATCHES_ENVIRONMENT_VARIABLES,
        'ariaMessage': constants.VARIABLE_NAME_MATCHES_ENVIRONMENT_VARIABLES
      };
    } else if (launchContextVariableNames.includes(control.value)) {
      return { 
        'launchContextNameError': true,
        'message': constants.VARIABLE_NAME_MATCHES_LAUNCH_CONTEXT,
        'ariaMessage': constants.VARIABLE_NAME_MATCHES_LAUNCH_CONTEXT
      };
    } else
      return null;

  }
}
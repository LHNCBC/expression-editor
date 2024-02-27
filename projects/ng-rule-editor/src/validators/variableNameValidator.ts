import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RuleEditorService } from '../lib/rule-editor.service';
import { FhirPathContexts, EnvironmentVariables } from '../lib/reserved-variable-names';

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
        'message': 'Variable name is required.',
        'ariaMessage': 'Variable name is required.'
      };
    } else if (contextVariableNames.includes(control.value)) {
      return { 
        'duplicateVariableNameError': true,
        'message': 'Variable name already exists in the context.',
        'ariaMessage': 'Variable name already exists in the context.'
      };
    } else if (FhirPathContexts.includes(control.value)) {
      return { 
        'fhirPathContextNameError': true,
        'message': 'Variable name matches the FHIRPath Context.',
        'ariaMessage': 'Variable name matches the FHIRPath Context.'
      };    
    } else if (regexPattern.test(control.value)) {
      return { 
        'environmentVariableNameError': true,
        'message': 'Variable name matches the Environment variables.',
        'ariaMessage': 'Variable name matches Environment variables.'
      };
    } else if (launchContextVariableNames.includes(control.value)) {
      return { 
        'launchContextNameError': true,
        'message': 'Variable name matches the Launch Context.',
        'ariaMessage': 'Variable name matches the Launch Context.'
      };
    } else
      return null;

  }
}
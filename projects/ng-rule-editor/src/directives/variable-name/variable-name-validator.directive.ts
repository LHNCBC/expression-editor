import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { RuleEditorService } from '../../lib/rule-editor.service';
import { variableNameValidator } from '../../validators/variableNameValidator';
import { ValidationParam } from '../../lib/variable';

@Directive({
  selector: '[lhcVariableNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: VariableNameValidatorDirective,
    multi: true
  }]
})
export class VariableNameValidatorDirective implements Validator {
  @Input('lhcVariableNameValidatorParams') param: ValidationParam;

  constructor(private ruleEditorService: RuleEditorService) {}

  validate(control: AbstractControl) : {[key: string]: any} | null {
    const result = variableNameValidator(this.ruleEditorService, this.param)(control);

    this.ruleEditorService.notifyValidationResult(this.param, result);
    return result;
  }

}

import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { ExpressionEditorService } from '../../lib/expression-editor.service';
import { variableNameValidator } from '../../validators/variableNameValidator';
import { ValidationParam } from '../../lib/variable';

@Directive({
  selector: '[lhcVariableNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: VariableNameValidatorDirective,
    multi: true
  }],
  standalone: false
})
export class VariableNameValidatorDirective implements Validator {
  @Input('lhcVariableNameValidatorParams') param: ValidationParam;

  constructor(private expressionEditorService: ExpressionEditorService) {}

  validate(control: AbstractControl) : {[key: string]: any} | null {
    const result = variableNameValidator(this.expressionEditorService, this.param)(control);

    this.expressionEditorService.notifyValidationResult(this.param, result);
    return result;
  }

}

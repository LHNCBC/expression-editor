import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { RuleEditorService } from '../../lib/rule-editor.service';
import { expressionValidator } from '../../validators/expressionValidator';
import { ValidationError, ValidationParam } from '../../lib/variable';
@Directive({
  selector: '[lhcExpressionValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ExpressionValidatorDirective,
    multi: true
  }]
})
export class ExpressionValidatorDirective {
  @Input('lhcExpressionValidatorParams') param: ValidationParam;
  @Input('lhcExpressionValidateInput') validateInput: boolean;

  constructor(private ruleEditorService: RuleEditorService) { }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (!this.validateInput) {
      return null;
    }

    // the result is either null or error object
    const result = expressionValidator(this.param)(control);

    this.ruleEditorService.notifyValidationResult(this.param, result);
    return result;
  }
}

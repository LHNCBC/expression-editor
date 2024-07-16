import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ExpressionEditorService } from '../../lib/expression-editor.service';
import { expressionValidator } from '../../validators/expressionValidator';
import { ValidationParam } from '../../lib/variable';
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

  constructor(private expressionEditorService: ExpressionEditorService) { }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (!this.validateInput) {
      return null;
    }

    if (this.param.type === 'fhirpath' ) {
      const variableNames = this.expressionEditorService.getContextVariableNamesForExpressionValidation();
      this.param['variableNames'] = JSON.stringify(variableNames);
    }

    // the result is either null or error object
    const result = expressionValidator(this.param)(control);

    this.expressionEditorService.notifyValidationResult(this.param, result);
    return result;
  }
}

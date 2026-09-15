import { Directive, inject, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
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
export class ExpressionValidatorDirective implements Validator {
  @Input() lhcExpressionValidatorParams!: ValidationParam;
  @Input() lhcExpressionValidateInput!: boolean;

  private expressionEditorService = inject(ExpressionEditorService);

  validate(control: AbstractControl) : ValidationErrors | null {
    if (!this.lhcExpressionValidateInput) {
      return null;
    }

    const allowLaunchContextFallback = !this.expressionEditorService.isExtractionExpression();
    if (this.lhcExpressionValidatorParams.type === 'fhirpath' ) {
      const variableNames = this.expressionEditorService.getContextVariableNamesForExpressionValidation();
      this.lhcExpressionValidatorParams['variableNames'] = JSON.stringify(variableNames);

      const launchContext = allowLaunchContextFallback ?
        this.expressionEditorService.getCommonLaunchContext() : {};
      this.lhcExpressionValidatorParams['launchContext'] = JSON.stringify(launchContext);
    }

    // the result is either null or error object
    const result = expressionValidator(
      this.lhcExpressionValidatorParams,
      allowLaunchContextFallback,
      ExpressionEditorService.COMMON_LAUNCH_CONTEXT_VARIABLES
    )(control);

    this.expressionEditorService.notifyValidationResult(this.lhcExpressionValidatorParams, result);

    return result;
  }
}

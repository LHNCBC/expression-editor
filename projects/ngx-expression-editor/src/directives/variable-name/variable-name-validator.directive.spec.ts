import { VariableNameValidatorDirective } from './variable-name-validator.directive';
import { ExpressionEditorService } from '../../lib/expression-editor.service';

describe('VariableNameValidatorDirective', () => {
  let expressionEditorService: ExpressionEditorService;
  it('should create an instance', () => {
    const directive = new VariableNameValidatorDirective(expressionEditorService);
    expect(directive).toBeTruthy();
  });
});
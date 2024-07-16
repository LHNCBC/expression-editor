import { ExpressionValidatorDirective } from './expression-validator.directive';
import { ExpressionEditorService } from '../../lib/expression-editor.service';

describe('ExpressionValidatorDirective', () => {
  let expressionEditorService: ExpressionEditorService;
  it('should create an instance', () => {
    const directive = new ExpressionValidatorDirective(expressionEditorService);
    expect(directive).toBeTruthy();
  });
});

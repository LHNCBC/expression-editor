import { ExpressionValidatorDirective } from './expression-validator.directive';
import { RuleEditorService } from '../../lib/rule-editor.service';

describe('ExpressionValidatorDirective', () => {
  let ruleEditorService: RuleEditorService;
  it('should create an instance', () => {
    const directive = new ExpressionValidatorDirective(ruleEditorService);
    expect(directive).toBeTruthy();
  });
});

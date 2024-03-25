import { VariableNameValidatorDirective } from './variable-name-validator.directive';
import { RuleEditorService } from '../../lib/rule-editor.service';

describe('VariableNameValidatorDirective', () => {
  let ruleEditorService: RuleEditorService;
  it('should create an instance', () => {
    const directive = new VariableNameValidatorDirective(ruleEditorService);
    expect(directive).toBeTruthy();
  });
});
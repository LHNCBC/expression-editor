import { TestBed } from '@angular/core/testing';

import { QuestionnaireRuleEditorService } from './questionnaire-rule-editor.service';

describe('QuestionnaireRuleEditorService', () => {
  let service: QuestionnaireRuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireRuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

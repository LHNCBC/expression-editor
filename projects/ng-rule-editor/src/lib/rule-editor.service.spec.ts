import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

describe('RuleEditorService', () => {
  let service: RuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

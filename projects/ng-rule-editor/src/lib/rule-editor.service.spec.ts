import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import { linkId, fhir, fhir2 } from '../../../../src/app/mock-data';

describe('RuleEditorService', () => {
  let service: RuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return scored questionnaire", () => {
    expect(service.addTotalScoreRule(fhir, linkId)).to.equal(fhir2);
  });
});
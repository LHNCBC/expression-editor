import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import {phq9ScoreLinkId, fhir, phq9array, phq9Val, phq9Score} from '../../../../src/app/mock-data';

describe('RuleEditorService', () => {
  let service: RuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  for (let i = 0; i < 9; i++) {
    it("should return scored questionnaire with var", () => {
      expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).toContain(phq9array[i]);
    });
  }

  it("should return scored questionnaire with var10", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).toContain(phq9Val);
  });

  it("should return scored questionnaire with var11", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).toContain(phq9Score);
  });
});
import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import {phq9ScoreLinkId, fhir, phq9Vars, varTemp, phq9Val, phq9Score} from '../../../../src/app/mock-data';

function insert(values) {
  return JSON.parse(JSON.stringify(varTemp).replace(/name_value/, values[0]).replace(/linkId_value/, values[1]));
}

describe('RuleEditorService', () => {
  let service: RuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return scored questionnaire with var1", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[0]));
  });

  it("should return scored questionnaire with var2", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[1]));
  });

  it("should return scored questionnaire with var3", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[2]));
  });

  it("should return scored questionnaire with var4", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[3]));
  });

  it("should return scored questionnaire with var5", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[4]));
  });

  it("should return scored questionnaire with var6", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[5]));
  });

  it("should return scored questionnaire with var7", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[6]));
  });

  it("should return scored questionnaire with var8", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[7]));
  });

  it("should return scored questionnaire with var9", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(insert(phq9Vars[8]));
  });

  it("should return scored questionnaire with var10", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(phq9Val);
  });

  it("should return scored questionnaire with var11", () => {
    expect(service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId)).to.include(phq9Score);
  });
});
import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import * as mockdata from '../../../../src/app/mock-data';

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
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var1);
  });

  it("should return scored questionnaire with var2", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var2);
  });

  it("should return scored questionnaire with var3", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var3);
  });

  it("should return scored questionnaire with var4", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var4);
  });

  it("should return scored questionnaire with var5", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var5);
  });

  it("should return scored questionnaire with var6", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var6);
  });

  it("should return scored questionnaire with var7", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var7);
  });

  it("should return scored questionnaire with var8", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var8);
  });

  it("should return scored questionnaire with var9", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var9);
  });

  it("should return scored questionnaire with var10", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var10);
  });

  it("should return scored questionnaire with var11", () => {
    expect(service.addTotalScoreRule(mockdata.fhir, mockdata.linkId)).to.include(mockdata.var111);
  });
});
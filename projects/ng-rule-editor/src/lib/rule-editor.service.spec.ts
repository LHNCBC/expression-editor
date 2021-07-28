import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import {phq9ScoreLinkId, fhir } from '../../../../src/app/mock-data';

const outputTotalScore = {
  "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
  "valueExpression": {
    "description": "Total score calculation",
    "language": "text/fhirpath",
    "expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"
  }
};

const outputItem = {
  "url": "http://hl7.org/fhir/StructureDefinition/variable",
  "valueExpression": {
    "name": "i",
    "language": "text/fhirpath",
    "expression": "%questionnaire.item.where(linkId = '/44260-8').answerOption.where(valueCoding.code=%resource.item.where(linkId = '/44260-8').answer.valueCoding.code).extension.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value"
  }
};

// @ts-ignore
import * as fs from "fs";
// const fs = require("fs");

describe('RuleEditorService', () => {
  let service: RuleEditorService;
  let output;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
    output = service.addTotalScoreRule(fhir.phq9, phq9ScoreLinkId);;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return scored questionnaire with total score", () => {
    // @ts-ignore
    expect(output.item[9].extension[14]).toEqual(outputTotalScore);

  });

  it("should return scored questionnaire with var10", () => {

    // @ts-ignore
    expect(output.item[9].extension[12]).toEqual(outputItem);
  });
});
import { from } from 'rxjs';

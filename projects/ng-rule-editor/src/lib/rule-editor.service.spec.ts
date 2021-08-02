import { TestBed } from '@angular/core/testing';
import copy from 'fast-copy';

import { RuleEditorService } from './rule-editor.service';
import bmi from '../../../../src/assets/bmi.json';
import phq9 from '../../../../src/assets/phq9.json';

const outputTotalScore = {
  url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
  valueExpression: {
    description: 'Total score calculation',
    language: 'text/fhirpath',
    expression: 'iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})',
    extension: [{url: 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression'}]
  }
};

const outputItem = {
  url: 'http://hl7.org/fhir/StructureDefinition/variable',
  valueExpression: {
    name: 'i',
    language: 'text/fhirpath',
    expression: '%questionnaire.item.where(linkId = \'/44260-8\').answerOption.where(valueCoding.code=%resource.item.where(linkId = \'/44260-8\').answer.valueCoding.code).extension.where(url=\'http://hl7.org/fhir/StructureDefinition/ordinalValue\').valueDecimal',
    extension: [{url: 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable'}]
  }
};

describe('RuleEditorService', () => {
  const linkId = '/39156-5';
  let service: RuleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should keep extension order on save with no modifications', () => {
    const EXPRESSION_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
    const TEST_EXTENSION = { url: 'http://example.com/test' };

    // @ts-ignore
    bmi.extension.push(TEST_EXTENSION);
    service.import(EXPRESSION_URI, bmi, linkId);
    const saved = service.export(EXPRESSION_URI, '');

    // Make sure the test extension is still at the end

    // @ts-ignore
    expect(saved.extension[saved.extension.length - 1]).toEqual(TEST_EXTENSION);
  });

  it('should keep extension order on save when adding a variable', () => {
    const EXPRESSION_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
    const TEST_EXTENSION = { url: 'http://example.com/test' };

    // @ts-ignore
    bmi.extension.push(TEST_EXTENSION);
    service.import(EXPRESSION_URI, bmi, linkId);

    service.addVariable();
    const saved = service.export(EXPRESSION_URI, '');

    // Make sure the test extension is second from last
    // @ts-ignore
    expect(saved.extension[saved.extension.length - 2]).toEqual(TEST_EXTENSION);
  });

  it('should be able to add and remove scores', () => {

    service.import('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      phq9, linkId);
    const original = phq9;

    // Check to make sure we start with the expected number of extensions on the target item
    const INITIAL_EXTENSION_COUNT = 4;
    const CONTEXT_INDEX = 9;
    expect(original.item[CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT);

    const withScores = service.addSumOfScores();

    expect(withScores['item'][CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT + 11);

    const removedScores = service.removeSumOfScores(withScores);

    expect(removedScores['item'][CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT);
    expect(removedScores).toEqual(phq9);
  });

  it('should return scored questionnaire with total score', () => {
    const output = service.addTotalScoreRule(copy(phq9), linkId);
    // @ts-ignore
    expect(output.item[9].extension[14]).toEqual(outputTotalScore);
  });

  it('should return scored questionnaire with var10', () => {
    const output = service.addTotalScoreRule(copy(phq9), linkId);
    // @ts-ignore
    expect(output.item[9].extension[12]).toEqual(outputItem);
  });
});

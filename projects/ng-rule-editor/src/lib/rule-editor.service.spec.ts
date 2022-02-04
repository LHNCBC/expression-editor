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
  const LINK_ID = '/39156-5';
  const BMI_INDEX = 3;
  const EXPRESSION_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';

  let service: RuleEditorService;
  const emptyCalculatedExpression = {
    url: EXPRESSION_URI,
    valueExpression: {
      language: 'text/fhirpath',
      expression: ''
    }
  };
  const TEST_EXTENSION = {url: 'http://example.com/test'};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should keep extension order on save with no modifications', () => {
    // @ts-ignore
    bmi.item[BMI_INDEX].extension.push(TEST_EXTENSION);
    service.import(EXPRESSION_URI, bmi, LINK_ID);
    const saved = service.export(EXPRESSION_URI, emptyCalculatedExpression);

    // Make sure the test extension is still at the end

    // @ts-ignore
    expect(saved.item[BMI_INDEX].extension[saved.item[BMI_INDEX].extension.length - 2]).toEqual(TEST_EXTENSION);
  });

  it('should keep extension order on save when adding a variable', () => {
    // @ts-ignore
    bmi.item[BMI_INDEX].extension.push(TEST_EXTENSION);
    service.import(EXPRESSION_URI, bmi, LINK_ID);

    service.addVariable();
    const saved = service.export(EXPRESSION_URI, emptyCalculatedExpression);

    // Make sure the test extension is second from last
    // @ts-ignore
    expect(saved.item[BMI_INDEX].extension[saved.item[BMI_INDEX].extension.length - 3]).toEqual(TEST_EXTENSION);
  });

  it('should be able to add and remove scores', () => {

    service.import('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      phq9, LINK_ID);
    const original = phq9;

    // Check to make sure we start with the expected number of extensions on the target item
    const INITIAL_EXTENSION_COUNT = 4;
    const CONTEXT_INDEX = 9;
    expect(original.item[CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT);

    expect(service.isScoreCalculation(original, LINK_ID)).toBeFalse();

    const withScores = service.addSumOfScores();
    const withScoresCopy = copy(withScores);

    expect(service.isScoreCalculation(withScores, LINK_ID)).toBeTrue();

    expect(withScores.item[CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT + 11);

    expect(service.updateScoreCalculation(withScores, LINK_ID)).toEqual(withScoresCopy);

    const removedScores = service.removeSumOfScores(withScores);

    expect(removedScores.item[CONTEXT_INDEX].extension.length).toEqual(INITIAL_EXTENSION_COUNT);
    expect(removedScores).toEqual(phq9);
  });

  it('should return scored questionnaire with total score', () => {
    const output = service.addTotalScoreRule(copy(phq9), LINK_ID);
    // @ts-ignore
    expect(output.item[9].extension[14]).toEqual(outputTotalScore);
  });

  it('should return scored questionnaire with var10', () => {
    const output = service.addTotalScoreRule(copy(phq9), LINK_ID);
    // @ts-ignore
    expect(output.item[9].extension[12]).toEqual(outputItem);
  });

  describe('score calculation getScoreItemIds', () => {
    function score(name): any {
      return {
        linkId: name, answerOption: [{
          extension: [{
            url: 'http://hl7.org/fhir/StructureDefinition/ordinalValue'
          }]
        }]
      };
    }
    const totalScore = {
      linkId: '',
      extension: [{
        url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
        valueExpression: {
          extension:
            [{url: 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression'}]
        }
      }]
    };

    it('should not include items below total score', () => {
      const nonScore = {};
      const total = {linkId: 'test'};

      const testItems = [nonScore, {
        item:
          [score('a'), score('b')]
      }, score('c'), total, score('d')];
      const itemIds = service.getScoreItemIds(testItems, 'test');

      expect(itemIds).toEqual(['a', 'b', 'c']);
    });

    it('should not include items above another total score', () => {
      const nonScore = {};
      const total = {linkId: 'test'};

      const testItems = [nonScore, {item: [score('a'), score('b')]},
        totalScore, score('c'), total, score('d')];
      const itemIds = service.getScoreItemIds(testItems, 'test');

      expect(itemIds).toEqual(['c']);
    });

    it('should not include items below another total score', () => {
      const total = {linkId: 'test'};

      const testItems = [score('a'), totalScore, score('b'), total, score('c')];
      const itemIds = service.getScoreItemIds(testItems, 'test');

      expect(itemIds).toEqual(['b']);
    });
  });

  it('should get item ancestors correctly', () => {
    // In the test data below, the linkIds repeat, but that should not affect
    // getAncestors
    const item = { linkId: 'notTarget' };
    const nested = { linkId: 'notTarget', item: [item, item]};
    const items = [
      nested,
      nested,
      {
        linkId: 'root',
        item: [item, { linkId: 'nested', item: [{linkId: 'target'}]}, item]
      },
      nested
    ];
    const output = service.getAncestors(items, 'target', []);

    expect(output.length).toEqual(2);
    expect(output[0].linkId).toEqual('root');
    expect(output[1].linkId).toEqual('nested');
  });
});

import { TestBed } from '@angular/core/testing';
import copy from 'fast-copy';

import { RuleEditorService } from './rule-editor.service';
import bmi from '../../../../src/assets/bmi.json';
import phq9 from '../../../../src/assets/phq9.json';
import phq9_group from '../../../../src/assets/phq9_group.json';
import phq9_preselected from '../../../../src/assets/phq9_preselected.json';

// This file is not used in the demo. It is solely utilized for testing the 
// getSelectedLinkIdsForScoring() function, specifically to validate the scenario where the 
// Total Scoring calculation item is located at the child item level.
import phq9_preselected_child_total from '../../../../src/test/data/phq9_preselected_child_total.json';

import phq9_preselected_without_scoring_ext from '../../../../src/test/data/phq9_preselected_without_scoring_ext.json';

const outputTotalScore = {
  url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
  valueExpression: {
    description: 'Total score calculation',
    language: 'text/fhirpath',
    expression: 'iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
      'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + ' +
      'iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + ' +
      'iif(%i.exists(), %i, 0), {})',
    extension: [{
      url: RuleEditorService.SCORE_EXPRESSION_EXTENSION_LINKIDS,
      valueString: "[\"/44250-9\",\"/44255-8\",\"/44259-0\",\"/44254-1\",\"/44251-7\"," + 
        "\"/44258-2\",\"/44252-5\",\"/44253-3\",\"/44260-8\"]"
    }]
  }
};

const outputItem = {
  url: 'http://hl7.org/fhir/StructureDefinition/variable',
  valueExpression: {
    name: 'i',
    language: 'text/fhirpath',
    expression: '%questionnaire.item.where(linkId = \'/44260-8\').answerOption' +
      '.where(valueCoding.code=%resource.item.where(linkId = \'/44260-8\').answer.valueCoding.code)' +
      '.extension.where(url=\'http://hl7.org/fhir/StructureDefinition/ordinalValue\').valueDecimal',
    extension: [{
      url: 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable',
      valueBoolean: true
    }]
  }
};

const outputItemWhereExpression = ".item.where(linkId = '/44254-1')";

const outputItemExpression = "%questionnaire.item.where(linkId = \'/44254-1\').answerOption" +
  ".where(valueCoding.code=%resource.item.where(linkId = \'/44254-1\').answer.valueCoding.code)" +
  ".extension.where(url=\'http://hl7.org/fhir/StructureDefinition/ordinalValue\').valueDecimal"


const phq9_scoringItemLinkIds = [
  "/44250-9", "/44255-8", "/44259-0", "/44254-1", "/44251-7",
  "/44258-2", "/44252-5", "/44253-3", "/44260-8"
];

const phq9_partialScoringItemLinkIds = [
  "/44250-9", "/44254-1", "/44260-8"
];

const outputGroupItemWhereExpression = ".item.where(linkId = '/45900-0').item.where(linkId = '/45900-0/44254-1')";

const outputGroupItemExpression = "%questionnaire.item.where(linkId = '/45900-0').item" +
  ".where(linkId = \'/45900-0/44254-1\').answerOption.where(valueCoding.code=%resource.item" + 
  ".where(linkId = '/45900-0').item.where(linkId = \'/45900-0/44254-1\').answer.valueCoding.code)" +
  ".extension.where(url=\'http://hl7.org/fhir/StructureDefinition/ordinalValue\').valueDecimal"

const phq9_group_scoringItemLinkIds = [
  "/45900-0/44250-9", "/45900-0/44255-8", "/45900-0/44259-0", "/45900-0/44254-1", "/44251-7",
  "/44258-2", "/44252-5", "/44253-3", "/44260-8"
];

const phq9_group_partialScoringItemLinkIds = [
  "/45900-0/44250-9", "/45900-0/44254-1", "/44260-8"
];

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

    service.setItemLinkIdsForTotalCalculation(phq9_scoringItemLinkIds);
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
    service.setItemLinkIdsForTotalCalculation(phq9_scoringItemLinkIds);
    const output = service.addTotalScoreRule(copy(phq9), LINK_ID);
    // @ts-ignore
    expect(output.item[9].extension[14]).toEqual(outputTotalScore);
  });

  it('should return scored questionnaire with var10', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_scoringItemLinkIds);
    const output = service.addTotalScoreRule(copy(phq9), LINK_ID);
    // @ts-ignore
    expect(output.item[9].extension[12]).toEqual(outputItem);
  });

  it('should return item scoring expression with var "i"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_scoringItemLinkIds);
    const output = service.composeItemsWhereConditionExpressions(copy(phq9.item), LINK_ID);

    // there should be 9 item selections
    expect(output.length).toEqual(9);

    expect(output[3]).toEqual(outputItemWhereExpression);
  });

  it('should return partial selection item scoring expression with var "c"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_partialScoringItemLinkIds);
    const output = service.composeItemsWhereConditionExpressions(copy(phq9.item), LINK_ID);

    // there should be only 3 item selections
    expect(output.length).toEqual(3);

    expect(output[1]).toEqual(outputItemWhereExpression);
  });

  it('should return scoring expression with var "d"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_scoringItemLinkIds);
    const output = service.composeScoringItemsExpressions(copy(phq9.item), LINK_ID);

    // there should be 9 item selections
    expect(output.length).toEqual(9);

    expect(output[3]).toEqual(outputItemExpression);
  });

  it('should return partial selection scoring expression with var "c"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_partialScoringItemLinkIds);
    const output = service.composeScoringItemsExpressions(copy(phq9.item), LINK_ID);

    // there should be only 3 item selections
    expect(output.length).toEqual(3);

    expect(output[1]).toEqual(outputItemExpression);
  });


  // PHQ9_GROUP
  it('should return item scoring expression with var "d"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_group_scoringItemLinkIds);
    const output = service.composeItemsWhereConditionExpressions(copy(phq9_group.item), LINK_ID);

    // there should be 9 item selections
    expect(output.length).toEqual(9);

    expect(output[3]).toEqual(outputGroupItemWhereExpression);
  });

  it('should return partial selection item scoring expression with var "c"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_group_partialScoringItemLinkIds);
    const output = service.composeItemsWhereConditionExpressions(copy(phq9_group.item), LINK_ID);

    // there should be only 3 item selections
    expect(output.length).toEqual(3);

    expect(output[1]).toEqual(outputGroupItemWhereExpression);
  });

  it('should return scoring expression with var "d"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_group_scoringItemLinkIds);
    const output = service.composeScoringItemsExpressions(copy(phq9_group.item), LINK_ID);


    // there should be 9 item selections
    expect(output.length).toEqual(9);

    expect(output[3]).toEqual(outputGroupItemExpression);
  });

  it('should return partial selection scoring expression with var "c"', () => {
    service.setItemLinkIdsForTotalCalculation(phq9_group_partialScoringItemLinkIds);
    const output = service.composeScoringItemsExpressions(copy(phq9_group.item), LINK_ID);

    // there should be only 3 item selections
    expect(output.length).toEqual(3);

    expect(output[1]).toEqual(outputGroupItemExpression);
  });

  it('should return pre-selected link ids if available', () => {
    const preselectedLinkIds = service.getSelectedScoringLinkIds(copy(phq9_preselected.item), LINK_ID);

    // there should be 6 items selected
    expect(preselectedLinkIds.length).toEqual(6);

    expect(preselectedLinkIds[0]).toEqual("/45900-0/44255-8");
    expect(preselectedLinkIds[1]).toEqual("/44251-7");
    expect(preselectedLinkIds[2]).toEqual("/44252-5");
    expect(preselectedLinkIds[3]).toEqual("/44252-5/44255-8");
    expect(preselectedLinkIds[4]).toEqual("/44260-8");
    expect(preselectedLinkIds[5]).toEqual("/44260-8/45907-0/44259-0");
  });

  it('should return number of scoring items based on the selected item', () => {
    const firstItem = service.getScoreItems(copy(phq9.item), "/44250-9");
    expect(firstItem.length).toEqual(0);

    const secondItem = service.getScoreItems(copy(phq9.item), "/44255-8");
    expect(secondItem.length).toEqual(1);
    
    const totalItem = service.getScoreItems(copy(phq9.item), "/39156-5");
    expect(totalItem.length).toEqual(9);
  });

  it('should return whether the selected item has scoring items', () => {
    const firstItem = service.hasCalculateScoringItems(copy(phq9.item), "/44250-9");
    expect(firstItem).toBeFalse();

    const secondItem = service.hasCalculateScoringItems(copy(phq9.item), "/44255-8");
    expect(secondItem).toBeTrue();
    
    const totalItem = service.hasCalculateScoringItems(copy(phq9.item), "/39156-5");
    expect(totalItem).toBeTrue();
  });

  it('should determine if item contains old calculated expression', () => {
    const scoringItem = copy(phq9_preselected_without_scoring_ext.item[0]);
    const totalScoringOldCalculatedExpressionItem = copy(phq9_preselected_without_scoring_ext.item[9]);
    const totalScoringNewCalculatedExpressionItem = copy(phq9_preselected.item[6]);

    const result = service.hasOldCalculatedExpressionForItem(scoringItem);
    expect(result).toBeFalse();

    const result2 =
      service.hasOldCalculatedExpressionForItem(totalScoringOldCalculatedExpressionItem);
    expect(result2).toBeTrue();

    const result3 =
      service.hasOldCalculatedExpressionForItem(totalScoringNewCalculatedExpressionItem);
    expect(result3).toBeFalse();
  });


  it('should determine if item contains old calculated expression based on linkId', () => {
    // Empty linkId
    const emptyLinkId =
      service.hasOldCalculatedExpression(copy(phq9_preselected_without_scoring_ext), "");
    expect(emptyLinkId).toBeFalse();

    // Null linkId
    const nullLinkId =
      service.hasOldCalculatedExpression(copy(phq9_preselected_without_scoring_ext), null);
    expect(nullLinkId).toBeFalse();

    // Undefined linkId
    const undefinedLinkId =
      service.hasOldCalculatedExpression(copy(phq9_preselected_without_scoring_ext), undefined);
    expect(undefinedLinkId).toBeFalse();

    // Scoring item - does not contain calculated expression
    const scoringItem =
      service.hasOldCalculatedExpression(copy(phq9_preselected_without_scoring_ext), "/44251-7");
    expect(scoringItem).toBeFalse();

    // Predefined total scoring calculation with old calculated expression
    const totalScoringOldCalculatedExpression =
      service.hasOldCalculatedExpression(copy(phq9_preselected_without_scoring_ext), "/44261-6");
    expect(totalScoringOldCalculatedExpression).toBeTrue();

    // Item that can be used as for total scoring calculation - does not contain calculated expression
    const canBeTotalScoring = service.hasOldCalculatedExpression(copy(phq9), "/39156-5");
    expect(canBeTotalScoring).toBeFalse();

    // Predefined total scoring calculation with new calculated expression
    const totalScoringNewCalculatedExpression =
      service.hasOldCalculatedExpression(copy(phq9_preselected), "/39156-5");
    expect(totalScoringNewCalculatedExpression).toBeFalse();
  });

  it('should determine if the scoring calculation prompt will be displayed', () => {
    const answerExpressionUri = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression";
    const calculatedExpressionUri = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression";
    const enableWhenExpressionUri = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression";
    const initialExpressionUri = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression";

    // Output Expression - None
    const emptyOutputExpressionPrompt = service.shouldCalculateScoreForItem(copy(phq9), "/39156-5", "");
    expect(emptyOutputExpressionPrompt).toBeFalse();

    // Output Expression = Answer Expression
    const answerExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9), "/39156-5", answerExpressionUri);
    expect(answerExpressionPrompt).toBeFalse();

    // Output Expression = Calculated Expression
    const calculatedExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9_preselected), "/39156-5", calculatedExpressionUri);
    expect(calculatedExpressionPrompt).toBeTrue();

    // Output Expression = Calculated/Initial Expression (user editable)
    const calculatedInitExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9_preselected), "/39156-5", calculatedExpressionUri);
    expect(calculatedInitExpressionPrompt).toBeTrue();

    // Output Expression = Enable When Expression
    const enableWhenExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9), "/39156-5", enableWhenExpressionUri);
    expect(enableWhenExpressionPrompt).toBeFalse();

    // Output Expression = Initial Expression
    const initialExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9), "/39156-5", initialExpressionUri);
    expect(initialExpressionPrompt).toBeFalse();

    // First item in the list - no scoring items to be calculated
    const firstItemPrompt =
      service.shouldCalculateScoreForItem(copy(phq9), "/44250-9", calculatedExpressionUri);
    expect(firstItemPrompt).toBeFalse();

    // Second item in the list - should have one scoring item to be calculated
    const secondItemPrompt =
      service.shouldCalculateScoreForItem(copy(phq9), "/44255-8", calculatedExpressionUri);
    expect(secondItemPrompt).toBeTrue();

    // Predefined total scoring calculation with old calculated expression
    const scoringOldCalculatedExpressionPrompt =
      service.shouldCalculateScoreForItem(copy(phq9_preselected_without_scoring_ext), "/44261-6", calculatedExpressionUri);
    expect(scoringOldCalculatedExpressionPrompt).toBeFalse();

    // Predefined total scoring calculation with new calculated expression
    const scoringNewCalculatedExpressionPrompt =
    service.shouldCalculateScoreForItem(copy(phq9_preselected), "/39156-5", calculatedExpressionUri);
    expect(scoringNewCalculatedExpressionPrompt).toBeTrue();
  });

  it('should return pre-selected link ids from the child item', () => {
    const preselectedLinkIds = service.getSelectedScoringLinkIds(copy(phq9_preselected_child_total.item), LINK_ID);

    // There should be 2 items selected
    expect(preselectedLinkIds.length).toEqual(2);

    expect(preselectedLinkIds[0]).toEqual("/44251-7");
    expect(preselectedLinkIds[1]).toEqual("/44258-2");
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
            [{url: RuleEditorService.SCORE_EXPRESSION_EXTENSION}]
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
      const existingTotalScore = {
        linkId: '',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
          valueExpression: {
            extension:
              [{url: RuleEditorService.SCORE_EXPRESSION_EXTENSION}]
          }
        }]
      };

      const testItems = [score('a'), existingTotalScore, score('b'), total, score('c')];
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

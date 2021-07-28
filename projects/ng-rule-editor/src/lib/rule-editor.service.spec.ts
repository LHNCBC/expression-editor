import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

import bmi from '../../../../src/assets/bmi.json';
import phq9 from '../../../../src/assets/phq9.json';

describe('RuleEditorService', () => {
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
    service.import(EXPRESSION_URI, bmi, '/39156-5');
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
    service.import(EXPRESSION_URI, bmi, '/39156-5');

    service.addVariable();
    const saved = service.export(EXPRESSION_URI, '');

    // Make sure the test extension is second from last
    // @ts-ignore
    expect(saved.extension[saved.extension.length - 2]).toEqual(TEST_EXTENSION);
  });

  it('should be able to add and remove scores', () => {

    service.import('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      phq9, '/39156-5');
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
});

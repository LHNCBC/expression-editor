import { TestBed } from '@angular/core/testing';

import { RuleEditorService } from './rule-editor.service';

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

  it('should be able to add and remove scores', () => {

    service.import('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      phq9, '/39156-5');
    const original = phq9;
    const withScores = service.exportSumOfScores();

    // TODO assert

    const removedScores = service.removeSumOfScores(withScores);

    expect(removedScores).toEqual(phq9);
  });
});

import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpressionEditorComponent } from './expression-editor.component';
import { ValidationResult } from './variable';
import { ENVIRONMENT_TOKEN } from './environment-token';
import allocateIdQuestionnaire from '../../../../src/assets/allocate-id.json';
import bmi from '../../../../src/assets/bmi.json';

describe('ExpressionEditorComponent', () => {
  let component: ExpressionEditorComponent;
  let fixture: ComponentFixture<ExpressionEditorComponent>;
  const env = {
    production: true,
    appName: "Expression Editor",
    appTitle: "Expression Editor"
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExpressionEditorComponent],
      providers: [
        { provide: ENVIRONMENT_TOKEN, useValue: env }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept and return a valueString expression with scoped allocateId variables', async () => {
    fixture.componentRef.setInput('fhirQuestionnaire', allocateIdQuestionnaire);
    fixture.componentRef.setInput('itemLinkId', '/39156-5');
    fixture.componentRef.setInput(
      'expressionUri',
      'fullUrl'
    );
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.expRef.control.value).toContain('%newQuestionnaireUuid');
    expect(component.expRef.control.errors).toBeNull();
    const allocatedIdHeading = fixture.nativeElement.shadowRoot.querySelector(
      '#uneditable-variables-section h2'
    );
    const allocatedIdLabels = [...fixture.nativeElement.shadowRoot.querySelectorAll(
      '#uneditable-variables-section .variable-column-label'
    )].map((label: HTMLElement) => label.textContent.trim());
    expect(allocatedIdHeading.textContent).toContain('Allocated ID Variables (3)');
    expect(allocatedIdLabels).toContain('newQuestionnaireUuid');
    expect(allocatedIdLabels).toContain('newPatientUuid');
    expect(allocatedIdLabels).toContain('newObservationUuid');

    let savedQuestionnaire;
    component.save.subscribe(questionnaire => savedQuestionnaire = questionnaire);
    component.finalExpression = '%newPatientUuid';
    component.export();
    await new Promise(resolve => setTimeout(resolve, 150));

    const templateExtract = savedQuestionnaire.item[0].item[0].extension.find(extension =>
      extension.url === 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
    );
    const savedExpression = templateExtract.extension.find(extension => extension.url === 'fullUrl');
    expect(savedExpression).toEqual({
      url: 'fullUrl',
      valueString: '%newPatientUuid'
    });
    expect(savedQuestionnaire.item[0].item[0].extension.some(extension =>
      extension.url === 'fullUrl'
    )).toBeFalse();
    expect(component.resolvedExpressionContext).toBe('extraction');
  });

  it('should display a Questionnaire-level allocated ID for Form Builder inputs', async () => {
    const questionnaire = {
      resourceType: 'Questionnaire',
      extension: [{
        url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-extractAllocateId',
        valueString: 'NewPatientId123'
      }],
      item: [{
        linkId: 'patient',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract',
          extension: [{
            url: 'template',
            valueReference: { reference: '#patTemplate' }
          }, {
            url: 'fullUrl',
            valueString: '%NewPatientId'
          }]
        }]
      }]
    };
    fixture.componentRef.setInput('fhirQuestionnaire', questionnaire);
    fixture.componentRef.setInput('itemLinkId', 'patient');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.componentRef.setInput('itemVariablesReadOnly', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const editor = fixture.nativeElement.shadowRoot;
    expect(editor.querySelector('#uneditable-variables-section h2').textContent)
      .toContain('Allocated ID Variables (1)');
    expect(editor.querySelector('.variable-row .variable-column-label').textContent.trim())
      .toBe('NewPatientId123');
    expect(component.resolvedExpressionContext).toBe('extraction');
  });

  it('should export the expression URL selected in the editor', async () => {
    const calculatedExpressionUri =
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
    const initialExpressionUri =
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression';
    fixture.componentRef.setInput('fhirQuestionnaire', bmi);
    fixture.componentRef.setInput('itemLinkId', '/39156-5');
    fixture.componentRef.setInput('expressionUri', calculatedExpressionUri);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    component.finalExpressionExtension.url = initialExpressionUri;
    let savedQuestionnaire;
    component.save.subscribe(questionnaire => savedQuestionnaire = questionnaire);
    component.export();
    await new Promise(resolve => setTimeout(resolve, 150));

    const savedExpression = savedQuestionnaire.item[3].extension.find(extension =>
      extension.url === initialExpressionUri
    );
    expect(savedExpression).toBeDefined();
  });

  it('should return empty aria message if there is no error in the validation result', () => {
    const validationResult: ValidationResult = {
      hasError: false,
      errorInItemVariables: false,
      errorInOutputExpression: false,
      errorInOutputCaseStatement: false,
      hasWarning: false,
      warningInItemVariables: false,
      warningInOutputExpression: false,
      warningInOutputCaseStatement: false
    }

    expect(component.composeAriaValidationErrorMessage(validationResult)).toEqual("");
  });

  it('should return an aria message if there is an error in the Item Variable section', () => {
    const validationResult: ValidationResult = {
      hasError: true,
      errorInItemVariables: true,
      errorInOutputExpression: false,
      errorInOutputCaseStatement: false,
      hasWarning: false,
      warningInItemVariables: false,
      warningInOutputExpression: false,
      warningInOutputCaseStatement: false
    }

    expect(component.composeAriaValidationErrorMessage(validationResult))
           .toEqual("The 'save' button is disabled due to one or more errors in the Item Variable section.");
  });

  it('should return an aria message if there is an error with the expression in the Output Expression section', () => {
    const validationResult: ValidationResult = {
      hasError: true,
      errorInItemVariables: false,
      errorInOutputExpression: true,
      errorInOutputCaseStatement: false,
      hasWarning: false,
      warningInItemVariables: false,
      warningInOutputExpression: false,
      warningInOutputCaseStatement: false
    }

    expect(component.composeAriaValidationErrorMessage(validationResult))
           .toEqual("The 'save' button is disabled due to one or more errors with the expression in the" +
           " Output Expression section.");
  });

  it('should return an aria message if there is one or more errors with the case statement in the Output Expression section', () => {
    const validationResult: ValidationResult = {
      hasError: true,
      errorInItemVariables: false,
      errorInOutputExpression: false,
      errorInOutputCaseStatement: true,
      hasWarning: false,
      warningInItemVariables: false,
      warningInOutputExpression: false,
      warningInOutputCaseStatement: false
    }

    expect(component.composeAriaValidationErrorMessage(validationResult))
           .toEqual("The 'save' button is disabled due to one or more errors with the case statement in the" +
           " Output Expression section.");
  });

  it('should return an aria message if there are errors in Item Variables and the Output Expression sections', () => {
    const validationResult: ValidationResult = {
      hasError: true,
      errorInItemVariables: true,
      errorInOutputExpression: true,
      errorInOutputCaseStatement: false,
      hasWarning: false,
      warningInItemVariables: false,
      warningInOutputExpression: false,
      warningInOutputCaseStatement: false
    }

    expect(component.composeAriaValidationErrorMessage(validationResult))
           .toEqual("The 'save' button is disabled due to errors in the Item Variable section, and" +
           " with the expression in the Output Expression section.");
  });
});

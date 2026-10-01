import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpressionEditorComponent } from './expression-editor.component';
import { ValidationResult } from './variable';
import { ENVIRONMENT_TOKEN } from './environment-token';
import allocateIdQuestionnaire from '../testing/fixtures/allocate-id.json';
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

    expect(component.expRef.control.value).toBe('%newPatientUuid');
    expect(component.expRef.control.errors).toBeNull();
    const variableHeadings = [...fixture.nativeElement.shadowRoot.querySelectorAll(
      '#uneditable-variables-section h2'
    )];
    const extractionContextHeading = variableHeadings.find((heading: HTMLElement) =>
      heading.textContent.includes('Extraction Context Variables')
    );
    const allocatedIdHeading = variableHeadings.find((heading: HTMLElement) =>
      heading.textContent.includes('Allocated ID Variables')
    );
    const allocatedIdLabels = [...fixture.nativeElement.shadowRoot.querySelectorAll(
      '#uneditable-variables-section .variable-column-label'
    )].map((label: HTMLElement) => label.textContent.trim());
    expect(extractionContextHeading.textContent).toContain('Extraction Context Variables (4)');
    expect(extractionContextHeading.getAttribute('aria-expanded')).toBe('false');
    expect(allocatedIdHeading.textContent).toContain('Allocated ID Variables (3)');
    expect(allocatedIdHeading.getAttribute('aria-expanded')).toBe('true');
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
    expect(component.isExtractionExpression).toBeTrue();
  });

  [
    { variable: 'patient', expression: '%patient.id' },
    { variable: 'encounter', expression: '%encounter.id' },
    {
      variable: 'patient',
      expression: "iif(%context.answer.exists(), %patient.id, 'no-answer')"
    },
    { variable: 'patient', expression: '%context.answer.select(%patient.id)' }
  ].forEach(({ variable, expression }) => {
    it(`should reject ${expression} during extraction and block saving`, async () => {
      fixture.componentRef.setInput('fhirQuestionnaire', allocateIdQuestionnaire);
      fixture.componentRef.setInput('itemLinkId', '/39156-5');
      fixture.componentRef.setInput('expressionUri', 'fullUrl');
      fixture.componentRef.setInput('expressionValueType', 'valueString');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const expressionInput = fixture.nativeElement.shadowRoot.querySelector('#final-expression');
      expressionInput.value = expression;
      expressionInput.dispatchEvent(new Event('input'));
      expressionInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise(resolve => setTimeout(resolve, 150));

      expect(component.expRef.control.errors?.invalidExpressionError).toBeTrue();
      expect(component.expRef.control.errors?.invalidExpressionWarning).toBeUndefined();
      expect(component.expRef.control.errors?.message).toBe(
        `%${variable} is not available in an extraction expression. ` +
        'Use an allocated ID or an extraction-context variable instead.'
      );

      let savedQuestionnaire;
      component.save.subscribe(questionnaire => savedQuestionnaire = questionnaire);
      component.preExport();
      await new Promise(resolve => setTimeout(resolve, 250));

      expect(component.validationError).toBeTrue();
      expect(savedQuestionnaire).toBeUndefined();
    });
  });

  it('should coerce an expressionParentIndex attribute and edit the selected templateExtract', async () => {
    const templateExtractUrl =
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract';
    const questionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'patient',
        extension: ['patient', 'observation'].map((name, index) => ({
          url: templateExtractUrl,
          extension: [{
            url: 'template',
            valueReference: { reference: `#${name}Template` }
          }, {
            url: 'fullUrl',
            valueString: index === 0 ? '%resource.id' : '%context.linkId'
          }]
        }))
      }]
    };
    fixture.componentRef.setInput('fhirQuestionnaire', questionnaire);
    fixture.componentRef.setInput('itemLinkId', 'patient');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.componentRef.setInput('expressionParentIndex', '1');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.expressionParentIndex).toBe(1);
    expect(component.finalExpression).toBe('%context.linkId');

    let savedQuestionnaire;
    component.save.subscribe(questionnaireResult => savedQuestionnaire = questionnaireResult);
    component.finalExpression = '%questionnaire.id';
    component.export();
    await new Promise(resolve => setTimeout(resolve, 150));

    const templates = savedQuestionnaire.item[0].extension;
    expect(templates[0].extension.find(extension => extension.url === 'fullUrl').valueString)
      .toBe('%resource.id');
    expect(templates[1].extension.find(extension => extension.url === 'fullUrl').valueString)
      .toBe('%questionnaire.id');
  });

  it('should report an expression target error for an invalid expressionParentIndex', async () => {
    fixture.componentRef.setInput('fhirQuestionnaire', allocateIdQuestionnaire);
    fixture.componentRef.setInput('itemLinkId', '/39156-5');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.componentRef.setInput('expressionParentIndex', 99);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.loadError).toBeTrue();
    expect(component.errorLoading).toBe(
      'Could not determine which expression to edit; the expression target is invalid, missing, or ambiguous.'
    );
  });

  it('should report an expression target error for a duplicate field in the selected parent', async () => {
    const templateExtractUrl =
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract';
    fixture.componentRef.setInput('fhirQuestionnaire', {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'patient',
        extension: [{
          url: templateExtractUrl,
          extension: [{
            url: 'template',
            valueReference: { reference: '#patientTemplate' }
          }, {
            url: 'fullUrl',
            valueString: '%first'
          }, {
            url: 'fullUrl',
            valueString: '%second'
          }]
        }]
      }]
    });
    fixture.componentRef.setInput('itemLinkId', 'patient');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.componentRef.setInput('expressionParentIndex', 0);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.loadError).toBeTrue();
    expect(component.errorLoading).toContain('Could not determine which expression to edit');
  });

  it('should prioritize the Questionnaire load error over a bundle-field target error', async () => {
    fixture.componentRef.setInput('fhirQuestionnaire', { resourceType: 'Patient' });
    fixture.componentRef.setInput('itemLinkId', 'patient');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.loadError).toBeTrue();
    expect(component.errorLoading).toBe(
      'Could not detect a FHIR Questionnaire; please try a different file.'
    );
    const errorState = fixture.nativeElement.shadowRoot.querySelector('.expression-editor.load-error-state');
    expect(errorState).not.toBeNull();
    const visibleError = errorState.querySelector('.load-error-message');
    expect(visibleError).not.toBeNull();
    expect(visibleError.textContent.trim()).toBe(component.errorLoading);
    expect(errorState.querySelector('.load-error-actions')).not.toBeNull();
    const baseDialog = fixture.nativeElement.shadowRoot.querySelector('lhc-base-dialog');
    expect(baseDialog).not.toBeNull();
    expect(baseDialog.style.getPropertyValue('--expression-editor-dialog-width')).toBe('min(36rem, 90%)');
    expect(baseDialog.querySelector('#expression-editor-base-dialog')).not.toBeNull();
    const closeButton = fixture.nativeElement.shadowRoot.querySelector('#close-load-error');
    expect(closeButton).not.toBeNull();
    expect(closeButton.textContent.trim()).toBe('Close');

    let cancelEmitted = false;
    component.cancel.subscribe(() => cancelEmitted = true);
    closeButton.click();

    expect(cancelEmitted).toBeTrue();
    expect(component.hideExpressionEditor).toBeTrue();
    expect(component.showCancelConfirmationDialog).toBeFalse();
  });

  it('should display a load error for a calculated expression on a non-Questionnaire resource', async () => {
    fixture.componentRef.setInput('fhirQuestionnaire', { resourceType: 'Patient' });
    fixture.componentRef.setInput('itemLinkId', 'patient');
    fixture.componentRef.setInput(
      'expressionUri',
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression'
    );

    expect(() => fixture.detectChanges()).not.toThrow();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.loadError).toBeTrue();
    expect(component.errorLoading).toBe(
      'Could not detect a FHIR Questionnaire; please try a different file.'
    );
    const visibleError = fixture.nativeElement.shadowRoot.querySelector('.load-error-message');
    expect(visibleError).not.toBeNull();
    expect(visibleError.textContent.trim()).toBe(component.errorLoading);
  });

  it('should close a load error from the title bar without requesting confirmation', () => {
    component.loadError = true;
    component.hideExpressionEditor = false;
    component.showCancelConfirmationDialog = false;
    let cancelEmitted = false;
    component.cancel.subscribe(() => cancelEmitted = true);

    component.closeDialog();

    expect(cancelEmitted).toBeTrue();
    expect(component.hideExpressionEditor).toBeTrue();
    expect(component.showCancelConfirmationDialog).toBeFalse();
  });

  it('should treat a null expressionParentIndex as omitted for an ordinary expression', async () => {
    fixture.componentRef.setInput('fhirQuestionnaire', bmi);
    fixture.componentRef.setInput('itemLinkId', '/39156-5');
    fixture.componentRef.setInput(
      'expressionUri',
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression'
    );
    fixture.componentRef.setInput('expressionParentIndex', null);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.expressionParentIndex).toBeNull();
    expect(component.loadError).toBeFalse();
    expect(fixture.nativeElement.shadowRoot.querySelector('#expression-editor-base-dialog'))
      .not.toBeNull();
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
            valueString: ''
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
    const allocatedIdSection = [...editor.querySelectorAll('#uneditable-variables-section h2')]
      .find((heading: HTMLElement) => heading.textContent.includes('Allocated ID Variables'))
      .parentElement;
    expect(allocatedIdSection.querySelector('h2').textContent)
      .toContain('Allocated ID Variables (1)');
    expect(allocatedIdSection.querySelector('.variable-row .variable-column-label').textContent.trim())
      .toBe('NewPatientId123');
    expect(component.expressionSyntax).toBe('fhirpath');
    expect(editor.querySelector('#output-expression-type').value).toBe('fhirpath');
    expect(component.isExtractionExpression).toBeTrue();
  });

  it('should edit a missing Questionnaire-level templateExtract field in extraction mode', async () => {
    const variableUrl = 'http://hl7.org/fhir/StructureDefinition/variable';
    const questionnaire = {
      resourceType: 'Questionnaire',
      extension: [
        ...['givenName', 'familyName', 'birthDate'].map(name => ({
          url: variableUrl,
          valueExpression: {
            name,
            language: 'text/fhirpath',
            expression: `'${name}'`
          }
        })),
        {
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract',
          extension: [{
            url: 'template',
            valueReference: { reference: '#patientTemplate' }
          }]
        }
      ],
      item: [{ linkId: 'given', type: 'string' }]
    };
    fixture.componentRef.setInput('fhirQuestionnaire', questionnaire);
    fixture.componentRef.setInput('itemLinkId', '');
    fixture.componentRef.setInput('expressionUri', 'fullUrl');
    fixture.componentRef.setInput('expressionValueType', 'valueString');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const editor = fixture.nativeElement.shadowRoot;
    expect(component.isExtractionExpression).toBeTrue();
    expect(editor.querySelector('#final-expression-section')).not.toBeNull();
    expect(component.variables).toEqual([]);
    const variableLabels = [...editor.querySelectorAll(
      '#uneditable-variables-section .variable-column-label'
    )].map((label: HTMLElement) => label.textContent.trim());
    expect(variableLabels).not.toContain('givenName');
    expect(variableLabels).not.toContain('familyName');
    expect(variableLabels).not.toContain('birthDate');

    const expressionInput = editor.querySelector('#final-expression');
    expressionInput.value = '%resource.id';
    expressionInput.dispatchEvent(new Event('input'));
    expressionInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    let savedQuestionnaire;
    component.save.subscribe(questionnaireResult => savedQuestionnaire = questionnaireResult);
    component.preExport();
    await new Promise(resolve => setTimeout(resolve, 250));

    const templateExtract = savedQuestionnaire.extension.find(extension =>
      extension.url ===
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
    );
    expect(templateExtract.extension.find(extension => extension.url === 'fullUrl')).toEqual({
      url: 'fullUrl',
      valueString: '%resource.id'
    });
    expect(savedQuestionnaire.extension.some(extension => extension.url === 'fullUrl')).toBeFalse();
  });

  [
    {
      name: 'a missing templateExtract field',
      questionnaire: {
        resourceType: 'Questionnaire',
        item: [{
          linkId: 'patient',
          type: 'group',
          extension: [{
            url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract',
            extension: [{
              url: 'template',
              valueReference: { reference: '#patientTemplate' }
            }]
          }]
        }]
      },
      expressionUri: 'resourceId',
      expressionValueType: 'valueString' as const
    },
    {
      name: 'a missing initial expression',
      questionnaire: {
        resourceType: 'Questionnaire',
        item: [{
          linkId: 'patient',
          type: 'group'
        }]
      },
      expressionUri:
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression',
      expressionValueType: 'valueExpression' as const
    }
  ].forEach(testCase => {
    it(`should validate ${testCase.name} before saving when no variables exist`, async () => {
      fixture.componentRef.setInput('fhirQuestionnaire', testCase.questionnaire);
      fixture.componentRef.setInput('itemLinkId', 'patient');
      fixture.componentRef.setInput('expressionUri', testCase.expressionUri);
      fixture.componentRef.setInput('expressionValueType', testCase.expressionValueType);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(component.variables).toEqual([]);
      expect(component.finalExpression).toBe('');
      expect(component.expRef.control.dirty).toBeFalse();

      let savedQuestionnaire;
      component.save.subscribe(questionnaire => savedQuestionnaire = questionnaire);
      const saveButton = fixture.nativeElement.shadowRoot.querySelector('#export');
      saveButton.click();
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      expect(savedQuestionnaire).toBeUndefined();
      expect(component.validationError).toBeTrue();
      expect(component.expRef.control.errors?.expressionRequiredError).toBeTrue();
    });
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

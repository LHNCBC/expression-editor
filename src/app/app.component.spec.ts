import 'zone.js/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { ExpressionEditorComponent } from 'ngx-expression-editor';
import Def from 'autocomplete-lhc';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppComponent,
        ExpressionEditorComponent,
        FormsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render basic selection form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(`${environment.appName} Demo`);
  });

  it('should reset extraction settings when switching to questionnaire upload', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.questionnaire = 'upload';
    app.expressionUri = 'fullUrl';
    app.expressionValueType = 'valueString';
    app.itemVariablesReadOnly = true;

    app.onChange();

    expect(app.expressionUri).toBe(app.calculatedExpression);
    expect(app.expressionValueType).toBe('valueExpression');
    expect(app.itemVariablesReadOnly).toBeFalse();
  });

  it('should configure the template extraction demo like an uploaded questionnaire', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.questionnaire = 'template-extraction';

    app.onChange();

    expect(app.rootLevel).toBeTrue();
    expect(app.linkId).toBe('');
    expect(app.expressionUri).toBe(app.calculatedExpression);
    expect(app.expressionValueType).toBe('valueExpression');
    expect(app.itemVariablesReadOnly).toBeFalse();
  });

  it('should offer template extraction fields only for an item with templateExtract', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.fhirQuestionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'template-item',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract',
          extension: [{
            url: 'template',
            valueReference: { reference: '#patient-template' }
          }]
        }]
      }, {
        linkId: 'ordinary-item'
      }]
    };

    app.linkId = 'ordinary-item';
    expect(app.expressionTypes.some(option => option.name.startsWith('Template Extraction'))).toBeFalse();

    app.linkId = 'template-item';
    const templateExtractionOptions = app.expressionTypes.filter(option =>
      option.name.startsWith('Template Extraction')
    );
    expect(templateExtractionOptions.map(option => option.uri)).toEqual([
      'fullUrl',
      'resourceId',
      'ifNoneMatch',
      'ifModifiedSince',
      'ifMatch',
      'ifNoneExist'
    ]);
    expect(templateExtractionOptions.every(option =>
      option.expressionValueType === 'valueString' && option.itemVariablesReadOnly &&
      option.expressionParentIndex === 0
    )).toBeTrue();
  });

  it('should identify the parent for fields from multiple templateExtract extensions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const templateExtractUrl =
      'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract';
    app.fhirQuestionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'template-item',
        extension: [{
          url: 'https://example.org/unrelated'
        }, {
          url: templateExtractUrl,
          extension: [{
            url: 'template',
            valueReference: { reference: '#patient-template' }
          }]
        }, {
          url: templateExtractUrl,
          extension: [{
            url: 'template',
            valueReference: { reference: '#observation-template' }
          }]
        }]
      }]
    };
    app.linkId = 'template-item';

    const templateOptions = app.expressionTypes.filter(option =>
      option.name.startsWith('Template Extraction')
    );
    expect(templateOptions.length).toBe(12);
    expect(templateOptions.filter(option => option.expressionParentIndex === 1).length).toBe(6);
    expect(templateOptions.filter(option => option.expressionParentIndex === 2).length).toBe(6);
    expect(templateOptions.map(option => option.name)).toContain(
      'Template Extraction fullUrl — #patient-template'
    );
    expect(templateOptions.map(option => option.name)).toContain(
      'Template Extraction fullUrl — #observation-template'
    );

    const secondResourceIdIndex = app.expressionTypes.findIndex(option =>
      option.uri === 'resourceId' && option.expressionParentIndex === 2
    );
    app.expressionChange({ target: { value: `${secondResourceIdIndex}` } });

    expect(app.expressionUri).toBe('resourceId');
    expect(app.expressionParentIndex).toBe(2);
  });

  it('should show the output selector after a template demo question is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.questionnaire = 'template-extraction';
    app.fhirQuestionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'template-item',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
        }]
      }, {
        linkId: 'ordinary-item'
      }]
    };

    app.linkId = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#expression-entry')).toBeNull();

    app.linkId = 'template-item';
    fixture.detectChanges();
    let outputExpressionOptions = [...fixture.nativeElement.querySelectorAll(
      '#expression-entry option'
    )].map((option: HTMLOptionElement) => option.textContent.trim());
    expect(outputExpressionOptions).toContain('Template Extraction fullUrl');

    app.linkId = 'ordinary-item';
    fixture.detectChanges();
    outputExpressionOptions = [...fixture.nativeElement.querySelectorAll(
      '#expression-entry option'
    )].map((option: HTMLOptionElement) => option.textContent.trim());
    expect(outputExpressionOptions.length).toBeGreaterThan(0);
    expect(outputExpressionOptions.some(option => option.startsWith('Template Extraction'))).toBeFalse();
  });

  it('should configure a contextual template extraction selection as valueString', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.fhirQuestionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'template-item',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
        }]
      }]
    };
    app.linkId = 'template-item';
    const resourceIdIndex = app.expressionTypes.findIndex(option => option.uri === 'resourceId');

    app.expressionChange({ target: { value: `${resourceIdIndex}` } });

    expect(app.expressionUri).toBe('resourceId');
    expect(app.expressionValueType).toBe('valueString');
    expect(app.itemVariablesReadOnly).toBeTrue();
  });

  describe('template extraction selection reset', () => {
    const templateQuestionnaire = {
      resourceType: 'Questionnaire',
      item: [{
        linkId: 'template-item',
        extension: [{
          url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
        }]
      }, {
        linkId: 'ordinary-item'
      }]
    };

    function selectFullUrl(app: AppComponent): void {
      app.fhirQuestionnaire = templateQuestionnaire;
      app.linkId = 'template-item';
      const fullUrlIndex = app.expressionTypes.findIndex(option => option.uri === 'fullUrl');
      app.expressionChange({ target: { value: `${fullUrlIndex}` } });
      expect(app.expressionUri).toBe('fullUrl');
      expect(app.expressionParentIndex).toBe(0);
    }

    function expectDefaultSelection(app: AppComponent): void {
      expect(app.expressionUri).toBe(app.calculatedExpression);
      expect(app.expressionValueType).toBe('valueExpression');
      expect(app.expressionParentIndex).toBeNull();
      expect(app.itemVariablesReadOnly).toBeFalse();
    }

    it('should reset a template extraction selection when switching to an item without templateExtract', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
      app.linkIds = [
        { linkId: 'template-item', text: 'Template item' },
        { linkId: 'ordinary-item', text: 'Ordinary item' }
      ];
      let onQuestionSelected;
      spyOn(Def.Autocompleter, 'Prefetch').and.returnValue({ destroy: () => undefined });
      spyOn(Def.Autocompleter.Event, 'observeListSelections').and.callFake((field, callback) => {
        onQuestionSelected = callback;
        return () => undefined;
      });
      app.composeAutocomplete();
      selectFullUrl(app);

      onQuestionSelected({
        input_method: 'clicked',
        val_typed_in: '',
        final_val: 'Ordinary item',
        item_code: 'ordinary-item'
      });

      expect(app.linkId).toBe('ordinary-item');
      expect(app.rootLevel).toBeFalse();
      expectDefaultSelection(app);
    });

    it('should reset a template extraction selection when switching to root level', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.autoComplete = jasmine.createSpyObj('autoComplete', ['setFieldToListValue', 'destroy']);
      selectFullUrl(app);

      app.rootLevel = true;
      app.toggleRootLevel();

      expect(app.linkId).toBe('');
      expectDefaultSelection(app);
    });
  });

  it('should replace the autocomplete and selection observer when recomposed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.linkIds = [{ linkId: 'patient', text: 'Patient Information' }];
    const destroyFirstAutocomplete = jasmine.createSpy('destroyFirstAutocomplete');
    const destroySecondAutocomplete = jasmine.createSpy('destroySecondAutocomplete');
    const removeFirstObserver = jasmine.createSpy('removeFirstObserver');
    const removeSecondObserver = jasmine.createSpy('removeSecondObserver');
    spyOn(Def.Autocompleter, 'Prefetch').and.returnValues(
      { destroy: destroyFirstAutocomplete },
      { destroy: destroySecondAutocomplete }
    );
    spyOn(Def.Autocompleter.Event, 'observeListSelections').and.returnValues(
      removeFirstObserver,
      removeSecondObserver
    );

    app.composeAutocomplete();
    app.composeAutocomplete();

    expect(removeFirstObserver).toHaveBeenCalledTimes(1);
    expect(destroyFirstAutocomplete).toHaveBeenCalledTimes(1);
    expect(removeSecondObserver).not.toHaveBeenCalled();
    expect(destroySecondAutocomplete).not.toHaveBeenCalled();
  });
});

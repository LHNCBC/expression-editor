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
    app.expressionUri = app.extractionExpression;
    app.expressionValueType = 'valueString';
    app.itemVariablesReadOnly = true;

    app.onChange();

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
      option.expressionValueType === 'valueString' && option.itemVariablesReadOnly
    )).toBeTrue();
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

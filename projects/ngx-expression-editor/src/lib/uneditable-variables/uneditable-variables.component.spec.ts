import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UneditableVariablesComponent } from './uneditable-variables.component';

describe('UneditableVariablesComponent', () => {
  let component: UneditableVariablesComponent;
  let fixture: ComponentFixture<UneditableVariablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ UneditableVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UneditableVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the item scope title for an ordinary expression', () => {
    component.uneditableVariables = [{
      name: 'patient',
      type: 'Patient',
      description: 'Patient launch context'
    }];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent)
      .toContain('Variables in Scope for This Item (1)');
  });

  it('should use the expression context title for an extraction expression', () => {
    component.isExtractionExpression = true;
    component.uneditableVariables = [{
      name: 'resource',
      type: 'Extraction context',
      description: 'Root QuestionnaireResponse'
    }];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent)
      .toContain('Expression Context Variables (1)');
  });
});

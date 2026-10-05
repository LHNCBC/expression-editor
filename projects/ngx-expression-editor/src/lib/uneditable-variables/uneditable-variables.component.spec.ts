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

  it('should display extraction context variables and only allocated IDs for an extraction expression', () => {
    component.isExtractionExpression = true;
    component.hasItemContext = true;
    component.uneditableVariables = [
      {
        name: 'newPatientUuid',
        type: 'Allocated ID',
        description: 'UUID allocated during extraction'
      },
      {
        name: 'a',
        type: 'Item variable',
        description: '1'
      }
    ];
    fixture.detectChanges();

    const headings = [...fixture.nativeElement.querySelectorAll('h2')]
      .map((heading: HTMLElement) => heading.textContent);
    let labels = [...fixture.nativeElement.querySelectorAll('.variable-column-label')]
      .map((label: HTMLElement) => label.textContent.trim());
    expect(headings.length).toBe(2);
    expect(headings[0]).toContain('Extraction Context Variables (4)');
    expect(headings[1]).toContain('Allocated ID Variables (1)');
    expect(labels).not.toContain('resource');
    expect(labels).toContain('newPatientUuid');
    expect(labels).not.toContain('a');

    fixture.nativeElement.querySelectorAll('h2')[0].click();
    fixture.detectChanges();
    labels = [...fixture.nativeElement.querySelectorAll('.variable-column-label')]
      .map((label: HTMLElement) => label.textContent.trim());
    expect(labels).toContain('resource');
    expect(labels).toContain('context');
    expect(labels).toContain('questionnaire');
    expect(labels).toContain('qitem');
  });

  it('should omit qitem when an extraction expression is at the Questionnaire root', () => {
    component.isExtractionExpression = true;
    component.hasItemContext = false;
    component.uneditableVariables = [];
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h2');
    heading.click();
    fixture.detectChanges();
    const labels = [...fixture.nativeElement.querySelectorAll('.variable-column-label')]
      .map((label: HTMLElement) => label.textContent.trim());
    expect(heading.textContent).toContain('Extraction Context Variables (3)');
    expect(labels).not.toContain('qitem');
  });

  it('should expand and collapse extraction sections independently', () => {
    component.isExtractionExpression = true;
    component.hasItemContext = true;
    component.uneditableVariables = [{
      name: 'newPatientUuid',
      type: 'Allocated ID',
      description: 'UUID allocated during extraction'
    }];
    fixture.detectChanges();

    const headings = fixture.nativeElement.querySelectorAll('h2');
    headings[0].click();
    fixture.detectChanges();

    expect(headings[0].getAttribute('aria-expanded')).toBe('true');
    expect(headings[1].getAttribute('aria-expanded')).toBe('true');
  });
});

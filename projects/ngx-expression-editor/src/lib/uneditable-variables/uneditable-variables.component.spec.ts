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

  it('should separate allocated IDs and ordinary variables for an extraction expression', () => {
    component.isExtractionExpression = true;
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
    expect(headings.length).toBe(2);
    expect(headings[0]).toContain('Allocated ID Variables (1)');
    expect(headings[1]).toContain('Variables in Scope (1)');
  });
});

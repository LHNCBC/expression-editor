import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirpathExpressionHelpComponent } from './fhirpath-expression-help.component';

describe('FhirpathExpressionHelpComponent', () => {
  let component: FhirpathExpressionHelpComponent;
  let fixture: ComponentFixture<FhirpathExpressionHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirpathExpressionHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathExpressionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

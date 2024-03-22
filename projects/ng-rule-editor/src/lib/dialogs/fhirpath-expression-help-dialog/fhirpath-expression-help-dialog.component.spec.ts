import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirpathExpressionHelpDialogComponent } from './fhirpath-expression-help-dialog.component';

describe('FhirpathExpressionHelpDialogComponent', () => {
  let component: FhirpathExpressionHelpDialogComponent;
  let fixture: ComponentFixture<FhirpathExpressionHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirpathExpressionHelpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathExpressionHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

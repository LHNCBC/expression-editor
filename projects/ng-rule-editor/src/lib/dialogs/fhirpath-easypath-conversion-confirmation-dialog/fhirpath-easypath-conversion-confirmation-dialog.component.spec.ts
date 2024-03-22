import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirpathEasypathConversionConfirmationDialogComponent } from './fhirpath-easypath-conversion-confirmation-dialog.component';

describe('FhirpathEasypathConversionConfirmationDialogComponent', () => {
  let component: FhirpathEasypathConversionConfirmationDialogComponent;
  let fixture: ComponentFixture<FhirpathEasypathConversionConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirpathEasypathConversionConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathEasypathConversionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

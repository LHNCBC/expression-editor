import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FhirpathEasypathConversionConfirmationDialogComponent } from './fhirpath-easypath-conversion-confirmation-dialog.component';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

describe('FhirpathEasypathConversionConfirmationDialogComponent', () => {
  let component: FhirpathEasypathConversionConfirmationDialogComponent;
  let fixture: ComponentFixture<FhirpathEasypathConversionConfirmationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FhirpathEasypathConversionConfirmationDialogComponent,
        BaseDialogComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathEasypathConversionConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

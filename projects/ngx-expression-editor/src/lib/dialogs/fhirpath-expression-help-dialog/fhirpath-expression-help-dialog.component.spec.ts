import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FhirpathExpressionHelpDialogComponent } from './fhirpath-expression-help-dialog.component';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

describe('FhirpathExpressionHelpDialogComponent', () => {
  let component: FhirpathExpressionHelpDialogComponent;
  let fixture: ComponentFixture<FhirpathExpressionHelpDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FhirpathExpressionHelpDialogComponent,
        BaseDialogComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathExpressionHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

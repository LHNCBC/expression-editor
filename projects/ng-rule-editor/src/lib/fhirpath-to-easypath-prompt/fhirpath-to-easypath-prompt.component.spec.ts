import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirpathToEasypathPromptComponent } from './fhirpath-to-easypath-prompt.component';

describe('FhirpathToEasypathPromptComponent', () => {
  let component: FhirpathToEasypathPromptComponent;
  let fixture: ComponentFixture<FhirpathToEasypathPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhirpathToEasypathPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FhirpathToEasypathPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

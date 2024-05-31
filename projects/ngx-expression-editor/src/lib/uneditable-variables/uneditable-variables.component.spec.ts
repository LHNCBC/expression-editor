import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UneditableVariablesComponent } from './uneditable-variables.component';

describe('UneditableVariablesComponent', () => {
  let component: UneditableVariablesComponent;
  let fixture: ComponentFixture<UneditableVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UneditableVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UneditableVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesComponent } from './variables.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

describe('VariablesComponent', () => {
  let component: VariablesComponent;
  let fixture: ComponentFixture<VariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ VariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-question',
  template: ''
})
class MockQuestionComponent {
}

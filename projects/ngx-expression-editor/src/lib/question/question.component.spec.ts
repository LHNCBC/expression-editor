import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { QuestionComponent } from './question.component';
import { SyntaxPreviewComponent } from '../syntax-preview/syntax-preview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpressionValidatorDirective } from '../../directives/expression/expression-validator.directive';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent, SyntaxPreviewComponent, ExpressionValidatorDirective ],
      imports: [ FormsModule, MatSnackBarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.variable = {label: '', type: '', expression: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

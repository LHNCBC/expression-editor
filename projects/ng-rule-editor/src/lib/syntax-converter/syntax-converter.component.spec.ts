import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SyntaxConverterComponent } from './syntax-converter.component';
import { SyntaxPreviewComponent } from '../syntax-preview/syntax-preview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EasyPathExpressionHelpDialogComponent } from '../dialogs/easy-path-expression-help-dialog/easy-path-expression-help-dialog.component';
import { HelpsComponent } from '../helps/helps.component';
import { ExpressionValidatorDirective } from '../../directives/expression/expression-validator.directive';

describe('SyntaxConverterComponent', () => {
  let component: SyntaxConverterComponent;
  let fixture: ComponentFixture<SyntaxConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntaxConverterComponent, SyntaxPreviewComponent, HelpsComponent, EasyPathExpressionHelpDialogComponent, ExpressionValidatorDirective ],
      imports: [ FormsModule, MatSnackBarModule, MatTooltipModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntaxConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEditorComponent } from './rule-editor.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { VariablesComponent } from './variables/variables.component';
import { FormsModule } from '@angular/forms';
import { CaseStatementsComponent } from './case-statements/case-statements.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SyntaxPreviewComponent } from './syntax-preview/syntax-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('RuleEditorComponent', () => {
  let component: RuleEditorComponent;
  let fixture: ComponentFixture<RuleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RuleEditorComponent,
        UneditableVariablesComponent,
        VariablesComponent,
        CaseStatementsComponent,
        SyntaxPreviewComponent
      ],
      imports: [ FormsModule, MatSnackBarModule, MatTooltipModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

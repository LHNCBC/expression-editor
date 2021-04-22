import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireRuleEditorComponent } from './questionnaire-rule-editor.component';

describe('QuestionnaireRuleEditorComponent', () => {
  let component: QuestionnaireRuleEditorComponent;
  let fixture: ComponentFixture<QuestionnaireRuleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireRuleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireRuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEditorComponent } from './rule-editor.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { VariablesComponent } from './variables/variables.component';
import { FormsModule } from '@angular/forms';

describe('RuleEditorComponent', () => {
  let component: RuleEditorComponent;
  let fixture: ComponentFixture<RuleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleEditorComponent, UneditableVariablesComponent, VariablesComponent ],
      imports: [ FormsModule ]
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

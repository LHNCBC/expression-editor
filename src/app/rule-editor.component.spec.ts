import { TestBed } from '@angular/core/testing';
import { RuleEditorComponent } from './rule-editor.component';

describe('RuleEditorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RuleEditorComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RuleEditorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

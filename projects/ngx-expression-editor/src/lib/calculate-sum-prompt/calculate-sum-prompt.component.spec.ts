import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalculateSumPromptComponent } from './calculate-sum-prompt.component';
import { BaseDialogComponent } from '../dialogs/base-dialog/base-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('CalculateSumPromptComponent', () => {
  let component: CalculateSumPromptComponent;
  let fixture: ComponentFixture<CalculateSumPromptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculateSumPromptComponent,
        BaseDialogComponent
      ],
      imports: [ MatTooltipModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateSumPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

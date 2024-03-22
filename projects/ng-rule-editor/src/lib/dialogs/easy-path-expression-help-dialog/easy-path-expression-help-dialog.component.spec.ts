import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyPathExpressionHelpDialogComponent } from './easy-path-expression-help-dialog.component';

describe('EasyPathExpressionHelpDialogComponent', () => {
  let component: EasyPathExpressionHelpDialogComponent;
  let fixture: ComponentFixture<EasyPathExpressionHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyPathExpressionHelpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyPathExpressionHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

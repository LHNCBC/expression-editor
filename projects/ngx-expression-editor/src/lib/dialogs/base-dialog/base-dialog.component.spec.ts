import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseDialogComponent } from './base-dialog.component';
import { A11yModule } from '@angular/cdk/a11y';

describe('BaseDialogComponent', () => {
  let component: BaseDialogComponent;
  let fixture: ComponentFixture<BaseDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDialogComponent ],
      imports: [ A11yModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

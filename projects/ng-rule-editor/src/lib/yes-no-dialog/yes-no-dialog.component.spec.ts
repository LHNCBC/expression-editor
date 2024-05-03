import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoDialogComponent } from './yes-no-dialog.component';
import { A11yModule } from '@angular/cdk/a11y';

describe('YesNoDialogComponent', () => {
  let component: YesNoDialogComponent;
  let fixture: ComponentFixture<YesNoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoDialogComponent ],
      imports: [ A11yModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

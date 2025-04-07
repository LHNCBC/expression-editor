import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyntaxPreviewComponent } from './syntax-preview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SyntaxPreviewComponent', () => {
  let component: SyntaxPreviewComponent;
  let fixture: ComponentFixture<SyntaxPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntaxPreviewComponent ],
      imports: [ MatSnackBarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntaxPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

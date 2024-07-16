import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntaxPreviewComponent } from './syntax-preview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SyntaxPreviewComponent', () => {
  let component: SyntaxPreviewComponent;
  let fixture: ComponentFixture<SyntaxPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntaxPreviewComponent ],
      imports: [ MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntaxPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

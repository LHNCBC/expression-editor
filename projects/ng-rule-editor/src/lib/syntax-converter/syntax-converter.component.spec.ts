import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SyntaxConverterComponent } from './syntax-converter.component';
import { SyntaxPreviewComponent } from '../syntax-preview/syntax-preview.component';

describe('SyntaxConverterComponent', () => {
  let component: SyntaxConverterComponent;
  let fixture: ComponentFixture<SyntaxConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntaxConverterComponent, SyntaxPreviewComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntaxConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

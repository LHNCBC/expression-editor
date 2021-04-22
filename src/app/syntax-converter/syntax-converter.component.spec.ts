import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntaxConverterComponent } from './syntax-converter.component';

describe('SyntaxConverterComponent', () => {
  let component: SyntaxConverterComponent;
  let fixture: ComponentFixture<SyntaxConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntaxConverterComponent ]
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

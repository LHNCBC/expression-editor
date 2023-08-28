import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyPathExpressionHelpComponent } from './easy-path-expression-help.component';

describe('EasyPathExpressionHelpComponent', () => {
  let component: EasyPathExpressionHelpComponent;
  let fixture: ComponentFixture<EasyPathExpressionHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyPathExpressionHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyPathExpressionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

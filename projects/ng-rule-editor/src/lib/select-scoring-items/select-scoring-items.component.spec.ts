import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScoringItemsComponent } from './select-scoring-items.component';

describe('SelectScoringItemsComponent', () => {
  let component: SelectScoringItemsComponent;
  let fixture: ComponentFixture<SelectScoringItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectScoringItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectScoringItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

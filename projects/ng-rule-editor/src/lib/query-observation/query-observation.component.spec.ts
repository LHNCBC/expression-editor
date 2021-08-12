import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryObservationComponent } from './query-observation.component';

describe('QueryObservationComponent', () => {
  let component: QueryObservationComponent;
  let fixture: ComponentFixture<QueryObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

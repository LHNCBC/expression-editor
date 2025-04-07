import 'zone.js/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpsComponent } from './helps.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('HelpsComponent', () => {
  let component: HelpsComponent;
  let fixture: ComponentFixture<HelpsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpsComponent ],
      imports: [ MatTooltipModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});

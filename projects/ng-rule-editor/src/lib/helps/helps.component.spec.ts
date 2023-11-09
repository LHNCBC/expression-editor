import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpsComponent } from './helps.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('HelpsComponent', () => {
  let component: HelpsComponent;
  let fixture: ComponentFixture<HelpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpsComponent ],
      imports: [ MatTooltipModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedAirportComponent } from './detailed-airport.component';

describe('DetailedAirportComponent', () => {
  let component: DetailedAirportComponent;
  let fixture: ComponentFixture<DetailedAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

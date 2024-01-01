import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchStationComponent } from './input-search-station.component';

describe('InputSearchStationComponent', () => {
  let component: InputSearchStationComponent;
  let fixture: ComponentFixture<InputSearchStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

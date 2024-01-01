import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePassengersComponent } from './choose-passengers.component';

describe('ChoosePassengersComponent', () => {
  let component: ChoosePassengersComponent;
  let fixture: ComponentFixture<ChoosePassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePassengersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

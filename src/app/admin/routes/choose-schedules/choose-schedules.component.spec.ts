import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSchedulesComponent } from './choose-schedules.component';

describe('ChooseSchedulesComponent', () => {
  let component: ChooseSchedulesComponent;
  let fixture: ComponentFixture<ChooseSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

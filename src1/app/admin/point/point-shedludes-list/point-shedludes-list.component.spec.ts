import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointShedludesListComponent } from './point-shedludes-list.component';

describe('PointShedludesListComponent', () => {
  let component: PointShedludesListComponent;
  let fixture: ComponentFixture<PointShedludesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointShedludesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointShedludesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

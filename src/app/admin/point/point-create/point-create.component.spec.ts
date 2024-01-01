import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCreateComponent } from './point-create.component';

describe('PointCreateComponent', () => {
  let component: PointCreateComponent;
  let fixture: ComponentFixture<PointCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

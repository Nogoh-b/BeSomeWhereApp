import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePointComponent } from './choose-point.component';

describe('ChoosePointComponent', () => {
  let component: ChoosePointComponent;
  let fixture: ComponentFixture<ChoosePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

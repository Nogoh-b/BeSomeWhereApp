import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChecklistComponent } from './home-checklist.component';

describe('HomeChecklistComponent', () => {
  let component: HomeChecklistComponent;
  let fixture: ComponentFixture<HomeChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

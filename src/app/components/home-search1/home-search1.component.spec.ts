import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearch1Component } from './home-search1.component';

describe('HomeSearch1Component', () => {
  let component: HomeSearch1Component;
  let fixture: ComponentFixture<HomeSearch1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSearch1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearch1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

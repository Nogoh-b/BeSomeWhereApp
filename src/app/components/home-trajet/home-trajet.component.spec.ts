import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrajetComponent } from './home-trajet.component';

describe('HomeTrajetComponent', () => {
  let component: HomeTrajetComponent;
  let fixture: ComponentFixture<HomeTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTrajetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

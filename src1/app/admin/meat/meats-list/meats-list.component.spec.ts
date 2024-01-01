import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatsListComponent } from './meats-list.component';

describe('MeatsListComponent', () => {
  let component: MeatsListComponent;
  let fixture: ComponentFixture<MeatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

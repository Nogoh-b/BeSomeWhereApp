import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatsCreateModalComponent } from './meats-create-modal.component';

describe('MeatsCreateModalComponent', () => {
  let component: MeatsCreateModalComponent;
  let fixture: ComponentFixture<MeatsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeatsCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

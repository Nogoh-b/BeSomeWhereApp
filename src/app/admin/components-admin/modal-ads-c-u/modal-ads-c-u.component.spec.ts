import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdsCUComponent } from './modal-ads-c-u.component';

describe('ModalAdsCUComponent', () => {
  let component: ModalAdsCUComponent;
  let fixture: ComponentFixture<ModalAdsCUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdsCUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdsCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

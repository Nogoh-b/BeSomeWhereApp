import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPlaceTrajetComponent } from './modal-edit-place-trajet.component';

describe('ModalEditPlaceTrajetComponent', () => {
  let component: ModalEditPlaceTrajetComponent;
  let fixture: ComponentFixture<ModalEditPlaceTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditPlaceTrajetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditPlaceTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

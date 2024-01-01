import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteAdminComponent } from './modal-delete-admin.component';

describe('ModalDeleteAdminComponent', () => {
  let component: ModalDeleteAdminComponent;
  let fixture: ComponentFixture<ModalDeleteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

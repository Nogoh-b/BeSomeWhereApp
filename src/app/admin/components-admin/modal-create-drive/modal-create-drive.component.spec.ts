import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateDriveComponent } from './modal-create-drive.component';

describe('ModalCreateDriveComponent', () => {
  let component: ModalCreateDriveComponent;
  let fixture: ComponentFixture<ModalCreateDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

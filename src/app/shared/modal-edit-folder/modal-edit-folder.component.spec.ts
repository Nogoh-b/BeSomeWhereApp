import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFolderComponent } from './modal-edit-folder.component';

describe('ModalEditFolderComponent', () => {
  let component: ModalEditFolderComponent;
  let fixture: ComponentFixture<ModalEditFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

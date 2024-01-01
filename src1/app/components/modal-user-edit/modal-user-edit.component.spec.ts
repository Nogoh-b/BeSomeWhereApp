import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserEditComponent } from './modal-user-edit.component';

describe('ModalUserEditComponent', () => {
  let component: ModalUserEditComponent;
  let fixture: ComponentFixture<ModalUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserDetailsComponent } from './modal-user-details.component';

describe('ModalUserDetailsComponent', () => {
  let component: ModalUserDetailsComponent;
  let fixture: ComponentFixture<ModalUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

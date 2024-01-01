import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProposedChecklistComponent } from './modal-add-proposed-checklist.component';

describe('ModalAddProposedChecklistComponent', () => {
  let component: ModalAddProposedChecklistComponent;
  let fixture: ComponentFixture<ModalAddProposedChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddProposedChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddProposedChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

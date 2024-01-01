import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddItemProposedCategoryComponent } from './modal-add-item-proposed-category.component';

describe('ModalAddItemProposedCategoryComponent', () => {
  let component: ModalAddItemProposedCategoryComponent;
  let fixture: ComponentFixture<ModalAddItemProposedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddItemProposedCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddItemProposedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

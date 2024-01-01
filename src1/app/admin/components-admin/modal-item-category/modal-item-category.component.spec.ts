import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemCategoryComponent } from './modal-item-category.component';

describe('ModalItemCategoryComponent', () => {
  let component: ModalItemCategoryComponent;
  let fixture: ComponentFixture<ModalItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

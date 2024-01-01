import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsChecklistListComponent } from './items-checklist-list.component';

describe('ItemsChecklistListComponent', () => {
  let component: ItemsChecklistListComponent;
  let fixture: ComponentFixture<ItemsChecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsChecklistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

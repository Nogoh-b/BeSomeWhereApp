import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsChecklistDetailsComponent } from './items-checklist-details.component';

describe('ItemsChecklistDetailsComponent', () => {
  let component: ItemsChecklistDetailsComponent;
  let fixture: ComponentFixture<ItemsChecklistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsChecklistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsChecklistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

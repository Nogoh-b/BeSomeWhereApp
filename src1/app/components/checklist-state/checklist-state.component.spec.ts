import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistStateComponent } from './checklist-state.component';

describe('ChecklistStateComponent', () => {
  let component: ChecklistStateComponent;
  let fixture: ComponentFixture<ChecklistStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

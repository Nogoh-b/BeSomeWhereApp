import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedChecklistComponent } from './proposed-checklist.component';

describe('ProposedChecklistComponent', () => {
  let component: ProposedChecklistComponent;
  let fixture: ComponentFixture<ProposedChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposedChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

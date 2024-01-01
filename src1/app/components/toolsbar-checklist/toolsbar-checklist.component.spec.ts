import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsbarChecklistComponent } from './toolsbar-checklist.component';

describe('ToolsbarChecklistComponent', () => {
  let component: ToolsbarChecklistComponent;
  let fixture: ComponentFixture<ToolsbarChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsbarChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsbarChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

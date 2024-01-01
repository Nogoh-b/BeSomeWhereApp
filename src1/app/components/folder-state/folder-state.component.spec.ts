import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderStateComponent } from './folder-state.component';

describe('FolderStateComponent', () => {
  let component: FolderStateComponent;
  let fixture: ComponentFixture<FolderStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

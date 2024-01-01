import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChelcklistListComponent } from './chelcklist-list.component';

describe('ChelcklistListComponent', () => {
  let component: ChelcklistListComponent;
  let fixture: ComponentFixture<ChelcklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChelcklistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChelcklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

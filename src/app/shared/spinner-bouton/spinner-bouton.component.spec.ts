import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBoutonComponent } from './spinner-bouton.component';

describe('SpinnerBoutonComponent', () => {
  let component: SpinnerBoutonComponent;
  let fixture: ComponentFixture<SpinnerBoutonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerBoutonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

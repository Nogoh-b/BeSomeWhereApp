import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCovidPageComponent } from './security-covid-page.component';

describe('SecurityCovidPageComponent', () => {
  let component: SecurityCovidPageComponent;
  let fixture: ComponentFixture<SecurityCovidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityCovidPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityCovidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

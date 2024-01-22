import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripCardComponent } from './strip-card.component';

describe('StripCardComponent', () => {
  let component: StripCardComponent;
  let fixture: ComponentFixture<StripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StripCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

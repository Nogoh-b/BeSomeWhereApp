import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseServicesComponent } from './choose-services.component';

describe('ChooseServicesComponent', () => {
  let component: ChooseServicesComponent;
  let fixture: ComponentFixture<ChooseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

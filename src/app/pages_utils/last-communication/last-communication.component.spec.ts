import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCommunicationComponent } from './last-communication.component';

describe('LastCommunicationComponent', () => {
  let component: LastCommunicationComponent;
  let fixture: ComponentFixture<LastCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCommunicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityNetworkComponent } from './security-network.component';

describe('SecurityNetworkComponent', () => {
  let component: SecurityNetworkComponent;
  let fixture: ComponentFixture<SecurityNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

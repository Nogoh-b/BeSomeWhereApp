import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchAdressComponent } from './input-search-adress.component';

describe('InputSearchAdressComponent', () => {
  let component: InputSearchAdressComponent;
  let fixture: ComponentFixture<InputSearchAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

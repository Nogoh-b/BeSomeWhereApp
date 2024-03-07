import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfUseAndPrivacypolicyComponent } from './terms-of-use-and-privacypolicy.component';

describe('TermsOfUseAndPrivacypolicyComponent', () => {
  let component: TermsOfUseAndPrivacypolicyComponent;
  let fixture: ComponentFixture<TermsOfUseAndPrivacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsOfUseAndPrivacypolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsOfUseAndPrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardBlogComponent } from './home-card-blog.component';

describe('HomeCardBlogComponent', () => {
  let component: HomeCardBlogComponent;
  let fixture: ComponentFixture<HomeCardBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCardBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

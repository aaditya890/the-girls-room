import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTestimonialComponent } from './review-testimonial.component';

describe('ReviewTestimonialComponent', () => {
  let component: ReviewTestimonialComponent;
  let fixture: ComponentFixture<ReviewTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

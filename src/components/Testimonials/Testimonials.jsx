import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import testimonialsData from '@/data/testimonials.json';
import './Testimonials.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-advance testimonials
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]); // Removed testimonialsData.length as it's not needed

  // Animation on scroll
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const sliderElement = sliderRef.current;

    // Reset initial state
    gsap.set([sectionElement, sliderElement], { opacity: 0, y: 30 });

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate section
    tl.to(sectionElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animate slider
    tl.to(
      sliderElement,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // Clean up ScrollTrigger instances
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Restart auto-play after a delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Wait longer before resuming auto-play
  };

  // Handle previous/next navigation
  const navigate = (direction) => {
    setIsAutoPlaying(false);
    
    if (direction === 'prev') {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
      );
    } else {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }
    
    // Restart auto-play after a delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Wait longer before resuming auto-play
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Client Testimonials</h2>
        <p className="section-subtitle">What my clients say about my work</p>

        <div className="testimonials-container" ref={sliderRef}>
          <div className="testimonial-slider">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${
                  index === activeIndex ? 'active' : ''
                }`}
                aria-hidden={index !== activeIndex}
              >
                <div className="testimonial-content">
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="testimonial-text">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="testimonial-meta">
                    <div className="testimonial-avatar">
                      {testimonial.image ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${testimonial.image}`}
                          alt={testimonial.name}
                          loading="lazy"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      )}
                    </div>
                    <div className="testimonial-author">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                      <p className="testimonial-date">
                        {formatDate(testimonial.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="slider-nav prev"
            onClick={() => navigate('prev')}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="slider-nav next"
            onClick={() => navigate('next')}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="slider-dots">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

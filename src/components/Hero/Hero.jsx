import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Link } from 'react-router-dom';
import heroData from '@/data/hero.json';
import './Hero.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const slidesRef = useRef([]);
  const intervalRef = useRef(null);

  // Add slide to ref array
  const addToRefs = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };

  // Handle slide change
  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setCurrentSlide(index);
    startAutoSlide();
  };

  // Auto slide functionality
  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length);
    }, 6000);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    startAutoSlide();
  };

  // Initialize animations and auto-slide
  useEffect(() => {
    // Initial animation
    gsap.from(heroRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    // Start auto-slide
    startAutoSlide();

    // Clean up interval on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  // Animate slide change
  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (index === currentSlide) {
        gsap.to(slide, {
          opacity: 1,
          scale: 1.05,
          duration: 2,
          ease: 'power2.inOut',
        });
      } else {
        gsap.to(slide, {
          opacity: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.inOut',
        });
      }
    });
  }, [currentSlide]);

  // Handle scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: 80 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slideshow */}
      <div className="slideshow">
        {heroData.slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={addToRefs}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}${slide.image})`,
            }}
            aria-hidden={index !== currentSlide}
          >
            <div className="overlay" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">ASAVELA MAVANDA</h1>
            <div className="typewriter">
              <p className="hero-subtitle">
                {heroData.subtitles[currentSlide % heroData.subtitles.length]}
              </p>
            </div>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Book a Shoot
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollToSection('about')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {heroData.slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Action Button */}
      <a
        href={heroData.bookingLink}
        className="floating-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a shoot"
      >
        <span className="btn-icon">📸</span>
        <span className="btn-text">Book Now</span>
      </a>
    </section>
  );
};

export default Hero;

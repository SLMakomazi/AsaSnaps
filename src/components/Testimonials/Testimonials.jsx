import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, Creative Agency',
    content: 'Working with Asavela was an absolute pleasure. Their attention to detail and creative eye brought our brand vision to life in ways we never imagined.',
    rating: 5,
    image: '/images/testimonials/person1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    content: 'The quality of the photos exceeded our expectations. Asavela captured the essence of our products perfectly, and the results have significantly boosted our marketing efforts.',
    rating: 5,
    image: '/images/testimonials/person2.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Bride',
    content: 'Our wedding photos are absolutely stunning! Asavela made us feel so comfortable and captured every special moment beautifully. These memories will last a lifetime.',
    rating: 5,
    image: '/images/testimonials/person3.jpg'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  // Render star rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${styles.star} ${i < rating ? styles.filled : ''}`} 
      />
    ));
  };

  // Animation variants for the carousel
  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }
    })
  };

  return (
    <section className={styles.testimonials}>
      <div className={`container ${styles.testimonialContainer}`}>
        <div className={styles.sectionHeader}>
          <h2>What Clients Say</h2>
          <p>Don't just take our word for it. Here's what our clients have to say about working with us.</p>
        </div>

        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <div className={styles.carouselTrack}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <Motion.div
                key={currentIndex}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.testimonialCard}
              >
                <div className={styles.quoteIcon}>
                  <FaQuoteLeft />
                </div>
                <p className={styles.testimonialContent}>{testimonials[currentIndex].content}</p>
                <div className={styles.rating}>
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <div className={styles.clientInfo}>
                  <div className={styles.clientImage}>
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className={styles.clientName}>{testimonials[currentIndex].name}</h4>
                    <p className={styles.clientRole}>{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

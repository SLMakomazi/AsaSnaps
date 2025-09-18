import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRefs = useRef([]);

  // Add image to refs array
  const addToImageRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Hero content animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate title and subtitle
    tl.fromTo(
      [titleRef.current, subtitleRef.current],
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
    
    // Animate CTA button
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );

    // Animate images with staggered delay
    imageRefs.current.forEach((img, index) => {
      tl.fromTo(
        img,
        { scale: 0.8, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'back.out(1.7)',
          delay: index * 0.1
        },
        '-=0.5'
      );
    });

    // Parallax effect on scroll
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Add parallax effect to images
    imageRefs.current.forEach((img, index) => {
      const yOffset = (index + 1) * 30; // Staggered vertical movement
      parallaxTl.to(
        img,
        { y: yOffset, ease: 'none' },
        0
      );
    });

    // Clean up animations on unmount
    return () => {
      tl.kill();
      parallaxTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title} ref={titleRef}>
            Capturing Life's <span className={styles.highlight}>Precious</span> Moments
          </h1>
          <p className={styles.subtitle} ref={subtitleRef}>
            Professional photography services by Asavela Mavanda. Specializing in weddings, 
            portraits, events, and commercial photography.
          </p>
          <div className={styles.ctaContainer} ref={ctaRef}>
            <Link to="/contact" className={styles.ctaPrimary}>
              Book a Session
            </Link>
            <Link to="/gallery" className={styles.ctaSecondary}>
              View Portfolio
            </Link>
          </div>
        </div>

        <div className={styles.imageGrid}>
          {/* Main featured image */}
          <div 
            ref={addToImageRefs} 
            className={`${styles.imageWrapper} ${styles.featuredImage}`}
          >
            <img 
              src="/images/hero/hero-1.jpg" 
              alt="Featured photography work" 
              className={styles.image}
            />
          </div>
          
          {/* Secondary images */}
          <div className={styles.secondaryImages}>
            <div 
              ref={addToImageRefs} 
              className={`${styles.imageWrapper} ${styles.secondaryImage} ${styles.image1}`}
            >
              <img 
                src="/images/hero/hero-2.jpg" 
                alt="Portrait photography" 
                className={styles.image}
              />
            </div>
            
            <div 
              ref={addToImageRefs} 
              className={`${styles.imageWrapper} ${styles.secondaryImage} ${styles.image2}`}
            >
              <img 
                src="/images/hero/hero-3.jpg" 
                alt="Event photography" 
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className={styles.decorativeElement1}></div>
      <div className={styles.decorativeElement2}></div>
    </section>
  );
};

export default Hero;

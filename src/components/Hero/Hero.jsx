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

    // Clean up animations on unmount
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.videoContainer}>
        <video 
          className={styles.video} 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/hero/WhatsApp Video 2025-09-18 at 09.07.17_8f21a2e7.mp4" type="video/mp4" />
        </video>
        <video 
          className={styles.video} 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/hero/WhatsApp Video 2025-09-18 at 09.52.39_2e377330.mp4" type="video/mp4" />
        </video>
        <video 
          className={styles.video} 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/hero/WhatsApp Video 2025-09-18 at 09.52.49_6cc371b3.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.overlay}></div>
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
      </div>
    </section>
  );
};

export default Hero;

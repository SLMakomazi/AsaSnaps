import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero/Hero';
import AboutPreview from '../components/About/AboutPreview';
import PortfolioPreview from '../components/Portfolio/PortfolioPreview';
import Testimonials from '../components/Testimonials/Testimonials';
import Partnerships from '../components/Partnerships/Partnerships';
import ContactCTA from '../components/Contact/ContactCTA';
import Header from '../components/Header/Header';
import styles from './Home.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRefs = useRef([]);
  
  // Add section to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Set up animations on component mount
  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <Hero />
      <main>
        {/* About Preview Section */}
        <section ref={addToRefs} className={`${styles.section} ${styles.aboutSection}`}>
          <AboutPreview />
        </section>

        {/* Portfolio Preview Section */}
        <section ref={addToRefs} className={`${styles.section} ${styles.portfolioSection}`}>
          <PortfolioPreview />
        </section>

        {/* Testimonials Section */}
        <section ref={addToRefs} className={`${styles.section} ${styles.testimonialsSection}`}>
          <Testimonials />
        </section>

        {/* Partnerships Section */}
        <section ref={addToRefs} className={`${styles.section} ${styles.partnershipsSection}`}>
          <Partnerships />
        </section>

        {/* Contact CTA Section - No background, uses its own styling */}
        <section ref={addToRefs} className={styles.contactSection}>
          <ContactCTA />
        </section>
      </main>
    </div>
  );
};

export default Home;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout/Layout';
import styles from './Page.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <section ref={addToRefs} className={`${styles.section} ${styles.aboutPage}`}>
        <div className={styles.container}>
          <h1>About Me</h1>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <p>Hi, I'm Asavela Mavanda, a passionate photographer with a keen eye for capturing life's most precious moments. With over 5 years of experience, I specialize in portrait, event, and commercial photography.</p>
              <p>My journey in photography began when I received my first camera as a gift, and since then, I've been on a mission to tell stories through my lens. I believe in creating authentic, timeless images that evoke emotion and preserve memories.</p>
              <p>When I'm not behind the camera, you can find me exploring new places, experimenting with lighting techniques, or teaching photography workshops to aspiring photographers.</p>
            </div>
            <div className={styles.imageContainer}>
              <img 
                src="/images/about-hero.jpg" 
                alt="Asavela Mavanda - Photographer" 
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

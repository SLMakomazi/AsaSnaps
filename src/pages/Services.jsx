import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout/Layout';
import styles from './Page.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Portrait Photography',
    description: 'Professional portrait sessions that capture your unique personality and style. Perfect for individuals, couples, and families.',
    price: 'Starting at $250',
    includes: [
      '1-2 hour photo session',
      'Professional editing',
      'Online gallery',
      'High-resolution digital images'
    ]
  },
  {
    id: 2,
    title: 'Event Photography',
    description: 'Comprehensive coverage for your special events, from weddings to corporate gatherings.',
    price: 'Starting at $500',
    includes: [
      '4+ hours of coverage',
      'Professional editing',
      'Online gallery',
      'High-resolution digital images'
    ]
  },
  {
    id: 3,
    title: 'Commercial Photography',
    description: 'High-quality images for businesses, products, and marketing materials.',
    price: 'Custom pricing',
    includes: [
      'Creative direction',
      'Professional lighting setup',
      'High-resolution images',
      'Commercial usage rights'
    ]
  },
  {
    id: 4,
    title: 'Creative Projects',
    description: 'Custom photography projects and artistic collaborations.',
    price: 'Contact for quote',
    includes: [
      'Concept development',
      'Location scouting',
      'Professional editing',
      'High-resolution images'
    ]
  }
];

const Services = () => {
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
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
      <section className={`${styles.section} ${styles.servicesPage}`}>
        <div className={styles.container}>
          <div className={styles.pageHeader} ref={addToRefs}>
            <h1>My Services</h1>
            <p className={styles.pageSubtitle}>Professional photography services tailored to your needs</p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={service.id} className={styles.serviceCard} ref={addToRefs}>
                <h2>{service.title}</h2>
                <p className={styles.serviceDescription}>{service.description}</p>
                <p className={styles.servicePrice}>{service.price}</p>
                <div className={styles.serviceIncludes}>
                  <h4>Includes:</h4>
                  <ul>
                    {service.includes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <button className={styles.ctaButton}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

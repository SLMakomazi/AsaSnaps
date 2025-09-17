import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import servicesData from '../../data/services.json';
import './Services.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Add card to refs array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Animation on scroll
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const cardElements = cardsRef.current;

    // Reset initial state
    gsap.set(cardElements, { opacity: 0, y: 50 });

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Stagger the card animations
    tl.to(cardElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // Clean up ScrollTrigger instances
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">My Services</h2>
        <p className="section-subtitle">Professional photography services tailored to your needs</p>
        
        <div className="services-grid">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="service-card"
              ref={addToRefs}
            >
              <div className="service-icon">
                <span role="img" aria-label={service.title}>
                  {service.icon}
                </span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <div className="service-features">
                <h4>What's Included:</h4>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feature-icon"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="service-cta"
                onClick={() => {
                  // Scroll to packages section
                  const element = document.getElementById('packages');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Packages
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cta-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

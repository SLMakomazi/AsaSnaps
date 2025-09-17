import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutData from '@/data/about.json';
import './About.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Animation on scroll
  useEffect(() => {
    const aboutElement = aboutRef.current;
    const imageElement = imageRef.current;
    const contentElement = contentRef.current;
    const statsElement = statsRef.current;

    // Reset initial state
    gsap.set([imageElement, contentElement, statsElement], { opacity: 0, y: 30 });

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(imageElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        contentElement,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        statsElement,
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

  // Animate stats counting
  useEffect(() => {
    if (!statsRef.current) return;

    const statNumbers = statsRef.current.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat) => {
      const endValue = parseInt(stat.getAttribute('data-value'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let startValue = 0;
      const duration = 2000; // 2 seconds
      const increment = endValue / (duration / 16); // 60fps
      
      // Only animate if the stat is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setInterval(() => {
              startValue += increment;
              if (startValue >= endValue) {
                clearInterval(timer);
                stat.textContent = endValue + suffix;
              } else {
                stat.textContent = Math.floor(startValue) + suffix;
              }
            }, 16);
            
            // Unobserve after starting animation
            observer.unobserve(stat);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(stat);
      
      return () => observer.disconnect();
    });
  }, []);

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-image" ref={imageRef}>
            <img
              src={`${import.meta.env.BASE_URL}${aboutData.image}`}
              alt="Asavela Mavanda"
              loading="lazy"
            />
          </div>
          
          <div className="about-text" ref={contentRef}>
            <h3>{aboutData.title}</h3>
            <div className={`about-description ${isExpanded ? 'expanded' : ''}`}>
              <p>{aboutData.short}</p>
              {isExpanded && <p>{aboutData.long}</p>}
            </div>
            <button
              className="read-more-btn"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
              aria-controls="about-description"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            
            <a
              href={aboutData.cta.link}
              className="portfolio-link"
              aria-label="View portfolio"
            >
              {aboutData.cta.text}
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="stats-container" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-number" data-value={aboutData.stats.yearsActive}>
              0
            </span>
            <span className="stat-label">Years Experience</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-number" data-value={aboutData.stats.shoots}>
              0
            </span>
            <span className="stat-label">Shoots Completed</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-number" data-value={aboutData.stats.clients}>
              0
            </span>
            <span className="stat-label">Satisfied Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

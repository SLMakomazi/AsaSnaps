import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import packagesData from '../../data/packages.json';
import './Packages.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Packages = () => {
  const [expandedPackage, setExpandedPackage] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Add card to refs array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Toggle package expansion
  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  // Animation on scroll
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const titleElement = titleRef.current;
    const cardElements = cardsRef.current;

    // Reset initial state
    gsap.set([titleElement, ...cardElements], { opacity: 0, y: 30 });

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate title
    tl.to(titleElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Stagger the card animations
    tl.to(
      cardElements,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
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

  // Format price with thousands separator
  const formatPrice = (price) => {
    if (price === 0) return 'Custom';
    return `R ${price.toLocaleString()}`;
  };

  return (
    <section id="packages" className="packages-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Photography Packages
        </h2>
        <p className="section-subtitle">
          Choose the perfect package for your photography needs
        </p>

        <div className="packages-grid">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.popular ? 'popular' : ''} ${
                expandedPackage === pkg.id ? 'expanded' : ''
              }`}
              ref={addToRefs}
            >
              {pkg.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              
              <div 
                className="package-header"
                onClick={() => togglePackage(pkg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePackage(pkg.id);
                  }
                }}
              >
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-price">
                  {pkg.price > 0 ? (
                    <>
                      <span className="price-amount">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="price-duration">/ session</span>
                    </>
                  ) : (
                    <span className="price-amount">Custom Quote</span>
                  )}
                </div>
                <p className="package-duration">{pkg.duration}</p>
                <p className="package-description">{pkg.description}</p>
                <div className="expand-toggle">
                  {expandedPackage === pkg.id ? 'Show Less' : 'View Details'}
                  <svg
                    className={`toggle-icon ${
                      expandedPackage === pkg.id ? 'expanded' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="package-features">
                <ul>
                  {pkg.features.map((feature, index) => (
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

              <div className="package-footer">
                <a
                  href="#contact"
                  className="package-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    // You can add additional logic here for package selection
                  }}
                >
                  {pkg.ctaText}
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
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="package-note">
          <p>
            <strong>Note:</strong> All packages can be customized to fit your
            specific needs. Contact us for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Packages;

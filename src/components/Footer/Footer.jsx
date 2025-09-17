import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Footer.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();
  
  // Animation on scroll
  useEffect(() => {
    const footerElement = footerRef.current;
    
    // Reset initial state
    gsap.set(footerElement, { opacity: 0, y: 30 });
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerElement,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
    
    // Animate footer
    tl.to(footerElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    
    // Clean up ScrollTrigger instances
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* About Column */}
            <div className="footer-col about-col">
              <h3 className="footer-heading">Asavela Mavanda</h3>
              <p className="footer-about">
                Capturing life's most precious moments with creativity and passion. 
                Specializing in wedding, portrait, and event photography.
              </p>
              <div className="footer-social">
                <a 
                  href="https://instagram.com/asavelaphoto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/asavelaphoto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/asavelaphoto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/asavelaphoto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/#home" className="footer-link">Home</Link></li>
                <li><Link to="/#about" className="footer-link">About</Link></li>
                <li><Link to="/#services" className="footer-link">Services</Link></li>
                <li><Link to="/#gallery" className="footer-link">Gallery</Link></li>
                <li><Link to="/#testimonials" className="footer-link">Testimonials</Link></li>
                <li><Link to="/#contact" className="footer-link">Contact</Link></li>
              </ul>
            </div>
            
            {/* Services */}
            <div className="footer-col">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Wedding Photography</a></li>
                <li><a href="#" className="footer-link">Portrait Sessions</a></li>
                <li><a href="#" className="footer-link">Event Coverage</a></li>
                <li><a href="#" className="footer-link">Family Portraits</a></li>
                <li><a href="#" className="footer-link">Commercial Photography</a></li>
                <li><a href="#" className="footer-link">Photo Editing</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="footer-col">
              <h3 className="footer-heading">Contact Info</h3>
              <ul className="footer-contact">
                <li className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Cape Town, South Africa</span>
                </li>
                <li className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:hello@asavela.com">hello@asavela.com</a>
                </li>
                <li className="footer-contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:+27123456789">+27 12 345 6789</a>
                </li>
              </ul>
              
              <div className="footer-newsletter">
                <h4 className="newsletter-title">Newsletter</h4>
                <p className="newsletter-desc">Subscribe for updates and special offers</p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="newsletter-input"
                    aria-label="Email address for newsletter subscription"
                    required
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {year} Asavela Mavanda Photography. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#" className="legal-link">Privacy Policy</a>
              <span className="divider">|</span>
              <a href="#" className="legal-link">Terms of Service</a>
              <span className="divider">|</span>
              <a href="#" className="legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="back-to-top" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;

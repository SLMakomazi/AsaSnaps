import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contactData from '@/data/contact.json';
import './Contact.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const sectionElement = sectionRef.current;
    const formElement = formRef.current;
    const infoElement = infoRef.current;
    
    // Reset initial state
    gsap.set([sectionElement, formElement, infoElement], { opacity: 0, y: 30 });
    
    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    
    // Animate section
    tl.to(sectionElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    
    // Animate form and info with stagger
    tl.to(
      [formElement, infoElement],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
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
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear any previous errors when user types
    if (formStatus.error) {
      setFormStatus((prev) => ({ ...prev, error: null }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Please fill in all required fields.',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Please enter a valid email address.',
      });
      return;
    }
    
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // In a real app, you would send this to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setFormStatus({ submitting: false, submitted: true, error: null });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => (prev.submitted ? { ...prev, submitted: false } : prev));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'An error occurred while sending your message. Please try again later.',
      });
    }
  };
  
  // Render icon based on name
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'map-pin':
        return (
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
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'mail':
        return (
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
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case 'phone':
        return (
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      case 'clock':
        return (
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
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Render social media icon
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'facebook':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case 'twitter':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        );
      case 'linkedin':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">{contactData.title}</h2>
        <p className="section-subtitle">{contactData.subtitle}</p>
        
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-container" ref={formRef}>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  aria-required="true"
                  className={formStatus.error && !formData.name.trim() ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  aria-required="true"
                  className={formStatus.error && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can I help you?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or inquiry..."
                  required
                  aria-required="true"
                  className={formStatus.error && !formData.message.trim() ? 'error' : ''}
                ></textarea>
              </div>
              
              {formStatus.error && (
                <div className="form-error" role="alert">
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
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {formStatus.error}
                </div>
              )}
              
              {formStatus.submitted && (
                <div className="form-success" role="alert">
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
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Thank you for your message! I'll get back to you as soon as possible.
                </div>
              )}
              
              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.submitting || formStatus.submitted}
                aria-busy={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : formStatus.submitted ? (
                  'Message Sent!'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="contact-info" ref={infoRef}>
            <div className="info-cards">
              {contactData.info.map((item, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{renderIcon(item.icon)}</div>
                  <div className="info-content">
                    <h3>{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.content.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </a>
                    ) : (
                      item.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="social-links">
              <h3>Follow Me</h3>
              <div className="social-icons">
                {contactData.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {renderSocialIcon(social.icon)}
                    <span className="social-username">{social.username}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

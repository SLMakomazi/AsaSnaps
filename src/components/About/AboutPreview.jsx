import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import styles from './AboutPreview.module.css';

const AboutPreview = () => {
  return (
    <div className={styles.aboutPreview}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={styles.textContent}
          >
            <h2 className={styles.title}>
              Capturing Life's <span className={styles.highlight}>Moments</span> with Passion
            </h2>
            <p className={styles.description}>
              With over 5 years of experience in professional photography, I specialize in capturing the essence of every moment. 
              My approach combines technical expertise with a creative eye to deliver stunning images that tell your unique story.
            </p>
            <p className={styles.description}>
              Based in [Your Location], I serve clients locally and am available for travel worldwide. Let's create something beautiful together.
            </p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Sessions</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Awards</span>
              </div>
            </div>
            <Link to="/about" className={styles.learnMore}>
              Learn More About Me
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </Motion.div>
          
          <Motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.imageWrapper}>
              <img 
                src="/about/WhatsApp Image 2025-09-18 at 12.55.21_692344ea.jpg" 
                alt="Asavela Mavanda - Professional Photographer" 
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.experienceBadge}>
              <span className={styles.years}>5+</span>
              <span className={styles.text}>Years Experience</span>
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPreview;

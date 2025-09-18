import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ContactCTA.module.css';

const ContactCTA = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Motion.div 
          className={styles.ctaContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Motion.div className={styles.content} variants={itemVariants}>
            <h2>Ready to capture your special moments?</h2>
            <p>Let's create something amazing together. Get in touch to discuss your photography needs and how we can bring your vision to life.</p>
          </Motion.div>
          <Motion.div className={styles.buttons} variants={itemVariants}>
            <Link to="/contact" className={styles.primaryBtn}>
              Get in Touch
            </Link>
            <Link to="/gallery" className={styles.secondaryBtn}>
              View Portfolio
            </Link>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;

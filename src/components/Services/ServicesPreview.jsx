import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FaCamera, FaVideo, FaImage, FaPalette } from 'react-icons/fa';
import styles from './ServicesPreview.module.css';

const services = [
  {
    id: 1,
    icon: <FaCamera className={styles.serviceIcon} />,
    title: 'Portrait Photography',
    description: 'Capturing the essence and personality of individuals through professional portrait sessions.',
    link: '/services#portrait'
  },
  {
    id: 2,
    icon: <FaVideo className={styles.serviceIcon} />,
    title: 'Event Coverage',
    description: 'Documenting your special events with a storytelling approach to preserve every important moment.',
    link: '/services#events'
  },
  {
    id: 3,
    icon: <FaImage className={styles.serviceIcon} />,
    title: 'Commercial Photography',
    description: 'High-quality images for businesses, products, and marketing materials.',
    link: '/services#commercial'
  },
  {
    id: 4,
    icon: <FaPalette className={styles.serviceIcon} />,
    title: 'Creative Projects',
    description: 'Artistic and conceptual photography for creative collaborations and personal projects.',
    link: '/services#creative'
  }
];

const ServicesPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.servicesPreview}>
      <div className={styles.container}>
        <Motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>What I Offer</span>
          <h2 className={styles.title}>My <span className={styles.highlight}>Services</span></h2>
          <p className={styles.description}>
            Professional photography services tailored to your needs. Each session is a unique experience 
            designed to capture your story in the most beautiful way possible.
          </p>
        </Motion.div>

        <Motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <Motion.div 
              key={service.id} 
              className={styles.serviceCard}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.iconContainer}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <Link to={service.link} className={styles.learnMore}>
                Learn More
                <svg 
                  width="16" 
                  height="16" 
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
          ))}
        </Motion.div>

        <Motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={styles.ctaText}>Have a custom project in mind?</p>
          <Link to="/contact" className={styles.ctaButton}>
            Get in Touch
          </Link>
        </Motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;

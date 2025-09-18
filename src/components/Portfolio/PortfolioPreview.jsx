import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import styles from './PortfolioPreview.module.css';

const PortfolioPreview = () => {
  const projects = [
    {
      id: 1,
      title: 'Portrait Series',
      category: 'Portrait',
      image: '/images/portfolio/portrait-1.jpg',
      slug: 'portrait-series'
    },
    {
      id: 2,
      title: 'Wedding Moments',
      category: 'Wedding',
      image: '/images/portfolio/wedding-1.jpg',
      slug: 'wedding-moments'
    },
    {
      id: 3,
      title: 'Commercial Work',
      category: 'Commercial',
      image: '/images/portfolio/commercial-1.jpg',
      slug: 'commercial-work'
    },
    {
      id: 4,
      title: 'Creative Shots',
      category: 'Creative',
      image: '/images/portfolio/creative-1.jpg',
      slug: 'creative-shots'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className={styles.portfolioPreview}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Featured Work</h2>
          <p>A selection of my latest photography projects</p>
        </div>
        
        <Motion.div 
          className={styles.portfolioGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <Motion.div 
              key={project.id} 
              className={styles.portfolioItem}
              variants={itemVariants}
            >
              <Link to={`/gallery#${project.slug}`} className={styles.portfolioLink}>
                <div className={styles.imageContainer}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={styles.portfolioImage}
                    loading="lazy"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                      <h3>{project.title}</h3>
                      <span className={styles.category}>{project.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Motion.div>
          ))}
        </Motion.div>
        
        <div className={styles.ctaContainer}>
          <Link to="/gallery" className={styles.viewMoreBtn}>
            View Full Portfolio
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;

import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import styles from './PortfolioPreview.module.css';

const PortfolioPreview = () => {
  const projects = [
    {
      id: 1,
      title: 'Graduation Memories',
      category: 'Graduations',
      image: '/images/portfolio/graduation-1.jpg',
      slug: 'graduation-memories'
    },
    {
      id: 2,
      title: 'Matric & Prom',
      category: 'Matric/Prom',
      image: '/images/portfolio/matric-1.jpg',
      slug: 'matric-prom'
    },
    {
      id: 3,
      title: 'Wedding Gallery',
      category: 'Wedding',
      image: '/images/portfolio/wedding-1.jpg',
      slug: 'wedding-gallery'
    },
    {
      id: 4,
      title: 'Baby Showers',
      category: 'Baby Showers',
      image: '/images/portfolio/baby-shower-1.jpg',
      slug: 'baby-showers'
    },
    {
      id: 5,
      title: 'Birthday Celebrations',
      category: 'Birthdays',
      image: '/images/portfolio/birthday-1.jpg',
      slug: 'birthday-celebrations'
    },
    {
      id: 6,
      title: 'Family Portraits',
      category: 'Family',
      image: '/images/portfolio/family-1.jpg',
      slug: 'family-portraits'
    },
    {
      id: 7,
      title: 'Lifestyle Shoots',
      category: 'Lifestyle',
      image: '/images/portfolio/lifestyle-1.jpg',
      slug: 'lifestyle-shoots'
    },
    {
      id: 8,
      title: 'Marketing Campaigns',
      category: 'Marketing',
      image: '/images/portfolio/marketing-1.jpg',
      slug: 'marketing-campaigns'
    },
    {
      id: 9,
      title: 'Traditional Ceremonies',
      category: 'Traditional',
      image: '/images/portfolio/traditional-1.jpg',
      slug: 'traditional-ceremonies'
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

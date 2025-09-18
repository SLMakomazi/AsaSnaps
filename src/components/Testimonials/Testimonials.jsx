import { motion as Motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, Creative Agency',
      content: 'Working with Asavela was an absolute pleasure. Their attention to detail and creative eye brought our brand vision to life in ways we never imagined.',
      rating: 5,
      image: '/images/testimonials/person1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director',
      content: 'The quality of the photos exceeded our expectations. Asavela captured the essence of our products perfectly, and the results have significantly boosted our marketing efforts.',
      rating: 5,
      image: '/images/testimonials/person2.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Bride',
      content: 'Our wedding photos are absolutely stunning! Asavela made us feel so comfortable and captured every special moment beautifully. These memories will last a lifetime.',
      rating: 5,
      image: '/images/testimonials/person3.jpg'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // Render star rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${styles.star} ${i < rating ? styles.filled : ''}`} 
      />
    ));
  };

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>What Clients Say</h2>
          <p>Don't just take our word for it. Here's what our clients have to say about working with us.</p>
        </div>

        <Motion.div 
          className={styles.testimonialGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <Motion.div 
              key={testimonial.id} 
              className={styles.testimonialCard}
              variants={itemVariants}
            >
              <div className={styles.quoteIcon}>
                <FaQuoteLeft />
              </div>
              <p className={styles.testimonialContent}>{testimonial.content}</p>
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>
              <div className={styles.clientInfo}>
                <div className={styles.clientImage}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className={styles.clientName}>{testimonial.name}</h4>
                  <p className={styles.clientRole}>{testimonial.role}</p>
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

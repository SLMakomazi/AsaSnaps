import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout/Layout';
import styles from './Page.module.css';

// Sample gallery images (replace with your actual images)
const galleryImages = [
  { id: 1, src: '/images/gallery/portrait-1.jpg', category: 'portrait' },
  { id: 2, src: '/images/gallery/portrait-2.jpg', category: 'portrait' },
  { id: 3, src: '/images/gallery/event-1.jpg', category: 'event' },
  { id: 4, src: '/images/gallery/event-2.jpg', category: 'event' },
  { id: 5, src: '/images/gallery/commercial-1.jpg', category: 'commercial' },
  { id: 6, src: '/images/gallery/creative-1.jpg', category: 'creative' },
  { id: 7, src: '/images/gallery/portrait-3.jpg', category: 'portrait' },
  { id: 8, src: '/images/gallery/event-3.jpg', category: 'event' },
];

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRefs = useRef([]);
  const modalRef = useRef(null);

  // Add section to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Close modal when clicking outside the image
  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set up animations on component mount
  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <section className={`${styles.section} ${styles.galleryPage}`}>
        <div className={styles.container}>
          <div className={styles.pageHeader} ref={addToRefs}>
            <h1>Gallery</h1>
            <p className={styles.pageSubtitle}>A collection of my favorite works</p>
            
            <div className={styles.categoryFilters}>
              <button 
                className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              <button 
                className={`${styles.filterButton} ${selectedCategory === 'portrait' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('portrait')}
              >
                Portraits
              </button>
              <button 
                className={`${styles.filterButton} ${selectedCategory === 'event' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('event')}
              >
                Events
              </button>
              <button 
                className={`${styles.filterButton} ${selectedCategory === 'commercial' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('commercial')}
              >
                Commercial
              </button>
              <button 
                className={`${styles.filterButton} ${selectedCategory === 'creative' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('creative')}
              >
                Creative
              </button>
            </div>
          </div>
          
          <div className={styles.galleryGrid} ref={addToRefs}>
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className={styles.galleryItem}
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.src} 
                  alt={`Gallery image ${image.id}`} 
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageCategory}>{image.category}</span>
                  <span className={styles.viewImage}>View</span>
                </div>
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className={styles.noResults} ref={addToRefs}>
              <p>No images found in this category. Please try another filter.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className={styles.imageModal} 
          ref={modalRef}
          onClick={handleModalClick}
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img 
              src={selectedImage.src} 
              alt={`Gallery image ${selectedImage.id}`} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;

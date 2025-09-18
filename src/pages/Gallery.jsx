import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Gallery.module.css';

// Sample gallery images with random placeholder images from Picsum Photos
const galleryImages = [
  // Graduations
  { 
    id: 1, 
    src: 'https://picsum.photos/seed/graduation1/800/1000', 
    category: 'graduations',
    title: 'Graduation Memories',
    description: 'Capturing your academic achievements'
  },
  
  // Matric/Prom
  { 
    id: 2, 
    src: 'https://picsum.photos/seed/matric1/800/800', 
    category: 'matric/prom',
    title: 'Matric & Prom',
    description: 'Elegant moments from your special night'
  },
  
  // Wedding
  { 
    id: 3, 
    src: 'https://picsum.photos/seed/wedding1/800/1000', 
    category: 'wedding',
    title: 'Wedding Gallery',
    description: 'Your beautiful love story captured'
  },
  
  // Baby Showers
  { 
    id: 4, 
    src: 'https://picsum.photos/seed/baby1/800/800', 
    category: 'baby-showers',
    title: 'Baby Shower Moments',
    description: 'Celebrating new beginnings'
  },
  
  // Birthdays
  { 
    id: 5, 
    src: 'https://picsum.photos/seed/birthday1/800/900', 
    category: 'birthdays',
    title: 'Birthday Celebrations',
    description: 'Your special day, perfectly captured'
  },
  
  // Family
  { 
    id: 6, 
    src: 'https://picsum.photos/seed/family1/800/1000', 
    category: 'family',
    title: 'Family Portraits',
    description: 'Timeless memories with your loved ones'
  },
  
  // Lifestyle
  { 
    id: 7, 
    src: 'https://picsum.photos/seed/lifestyle1/800/1000', 
    category: 'lifestyle',
    title: 'Lifestyle Shoots',
    description: 'Authentic moments, beautifully captured'
  },
  
  // Marketing
  { 
    id: 8, 
    src: 'https://picsum.photos/seed/marketing1/800/800', 
    category: 'marketing',
    title: 'Marketing Campaigns',
    description: 'Professional imagery for your brand'
  },
  
  // Traditional
  { 
    id: 9, 
    src: 'https://picsum.photos/seed/traditional1/800/1000', 
    category: 'traditional',
    title: 'Traditional Ceremonies',
    description: 'Celebrating cultural heritage'
  },
  
  // Additional images for each category
  { 
    id: 10, 
    src: 'https://picsum.photos/seed/graduation2/800/1000', 
    category: 'graduations',
    title: 'Graduation Day',
    description: 'Proud moments with family'
  },
  { 
    id: 11, 
    src: 'https://picsum.photos/seed/matric2/800/800', 
    category: 'matric/prom',
    title: 'Prom Night',
    description: 'Elegant evening memories'
  },
  { 
    id: 12, 
    src: 'https://picsum.photos/seed/wedding2/800/1000', 
    category: 'wedding',
    title: 'Wedding Portraits',
    description: 'Timeless wedding memories'
  },
  {
    id: 13,
    src: 'https://picsum.photos/seed/baby2/800/900',
    category: 'baby-showers',
    title: 'New Arrivals',
    description: 'Cherishing the first moments'
  },
  {
    id: 14,
    src: 'https://picsum.photos/seed/birthday2/800/800',
    category: 'birthdays',
    title: 'Birthday Bash',
    description: 'Celebrating in style'
  },
  {
    id: 15,
    src: 'https://picsum.photos/seed/family2/800/1000',
    category: 'family',
    title: 'Generations',
    description: 'Family bonds that last'
  }
];

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    'All',
    'Graduations',
    'Matric/Prom',
    'Wedding',
    'Baby Showers',
    'Birthdays',
    'Family',
    'Lifestyle',
    'Marketing',
    'Traditional'
  ];
  const [selectedImage, setSelectedImage] = useState(null);
  const [_currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRefs = useRef([]);
  const modalRef = useRef(null);
  const imageRefs = useRef([]);

  const addToRefs = useCallback((el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }, []);
  
  const getImageRef = useCallback((index) => (el) => {
    if (el) {
      imageRefs.current[index] = el;
    }
  }, []);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory.toLowerCase().replace(/\s+/g, '-'));

  const handleImageClick = (image) => {
    const index = galleryImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const navigateImage = useCallback((direction) => {
    setCurrentImageIndex(prevIndex => {
      let newIndex;
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryImages.length;
      } else {
        newIndex = (prevIndex - 1 + galleryImages.length) % galleryImages.length;
      }
      setSelectedImage(galleryImages[newIndex]);
      return newIndex;
    });
  }, []);

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (!selectedImage) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedImage, navigateImage]);

  useEffect(() => {
    // First, make sure the grid is visible immediately
    gsap.set('.galleryGrid', { opacity: 1, y: 0 });
    
    if (!sectionRefs.current.length || !imageRefs.current.length) return;
    const animations = [];

    // Animate grid items with a staggered effect
    const gridItems = document.querySelectorAll('.galleryItem');
    if (gridItems.length > 0) {
      gsap.fromTo(gridItems, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.galleryGrid',
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animate other sections if needed
    sectionRefs.current.forEach((section, index) => {
      if (!section || section.classList.contains('galleryGrid')) return;
      
      const tl = gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      animations.push(tl);
    });

    const validImageRefs = imageRefs.current.filter(Boolean);
    
    if (validImageRefs.length > 0) {
      const imageAnimation = gsap.to(validImageRefs, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          imageRefs.current = [];
        }
      });
      animations.push(imageAnimation);
    }

    return () => {
      animations.forEach(anim => anim?.kill?.());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredImages]);

  return (
    <>
      <section className={`${styles.section} ${styles.galleryPage}`}>
        <div className={styles.container}>
          <div className={styles.pageHeader} ref={addToRefs}>
            <h1>Gallery</h1>
            <p className={styles.pageSubtitle}>A collection of my favorite works</p>
            
            <div className={styles.categoryFilters}>
              {categories.map(category => {
                const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
                const isActive = selectedCategory === categoryKey || (category === 'All' && selectedCategory === 'all');
                
                return (
                  <button
                    key={categoryKey}
                    className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category === 'All' ? 'all' : categoryKey)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className={styles.galleryGrid}>
            {filteredImages.map((image, index) => (
              <motion.div 
                key={image.id}
                ref={getImageRef(index)}
                className={styles.galleryItem}
                onClick={() => handleImageClick(image)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.imageContainer}>
                  <img 
                    src={image.src} 
                    alt={image.title || `Gallery image ${image.id}`}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.imageCategory}>
                      {image.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <div className={styles.zoomIconContainer}>
                      <FaSearchPlus />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className={styles.noResults} ref={addToRefs}>
              <p>No images found in this category. Please try another filter.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={`${styles.imageModal} ${styles.visible}`}
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalContent}>
              <button 
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close"
              >
                <FaTimes />
              </button>
              
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => navigateImage('prev')}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              
              <div className={styles.modalImageContainer}>
                <motion.img 
                  key={selectedImage.id}
                  src={selectedImage.src} 
                  alt={selectedImage.title || `Gallery image ${selectedImage.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={() => navigateImage('next')}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              
              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
                <p className={styles.modalDescription}>{selectedImage.description}</p>
                <span className={styles.imageCategory}>{selectedImage.category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;

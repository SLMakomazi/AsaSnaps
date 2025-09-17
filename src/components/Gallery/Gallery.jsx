import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageViewer from 'react-simple-image-viewer';
import galleryData from '@/data/gallery.json';
import './Gallery.module.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);

  // Filter images based on active category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryData.images);
    } else {
      const filtered = galleryData.images.filter(
        (image) => image.category === activeCategory
      );
      setFilteredImages(filtered);
    }
    setIsLoading(false);
  }, [activeCategory]);

  // Animation on scroll
  useEffect(() => {
    const galleryElement = galleryRef.current;
    const itemElements = itemsRef.current;

    // Reset initial state
    gsap.set([galleryElement, ...itemElements], { opacity: 0, y: 30 });

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Animate gallery items with stagger
    tl.to(
      itemElements,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // Clean up ScrollTrigger instances
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeCategory]);

  // Handle image click to open viewer
  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when viewer is open
  };

  // Close image viewer
  const closeImageViewer = () => {
    setCurrentImageIndex(0);
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Get category count
  const getCategoryCount = (category) => {
    return galleryData.images.filter((img) =>
      category === 'all' || img.category === category
    ).length;
  };

  // Add item to refs array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">A glimpse of my photography work</p>

        {/* Category Filters */}
        <div className="gallery-filters">
          <div className="filters-container">
            {galleryData.categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
                disabled={getCategoryCount(category.id) === 0}
                aria-label={`Filter by ${category.name}`}
                aria-pressed={activeCategory === category.id}
              >
                <span className="filter-name">{category.name}</span>
                <span className="filter-count">{getCategoryCount(category.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="loading-state">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="empty-state">
            <p>No images found in this category.</p>
          </div>
        ) : (
          <div className="gallery-grid" ref={galleryRef}>
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className={`gallery-item ${
                  image.orientation === 'portrait' ? 'portrait' : ''
                }`}
                ref={addToRefs}
                onClick={() =>
                  openImageViewer(
                    galleryData.images.findIndex((img) => img.id === image.id)
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openImageViewer(
                      galleryData.images.findIndex((img) => img.id === image.id)
                    );
                  }
                }}
                aria-label={`View ${image.title || 'image'} in full screen`}
              >
                <div className="image-container">
                  <img
                    src={`${import.meta.env.BASE_URL}${image.src}`}
                    alt={image.alt}
                    loading="lazy"
                    className="gallery-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="image-title">{image.title}</h3>
                      <p className="image-category">
                        {galleryData.categories.find(
                          (cat) => cat.id === image.category
                        )?.name || ''}
                      </p>
                      <button
                        className="view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageViewer(
                            galleryData.images.findIndex(
                              (img) => img.id === image.id
                            )
                          );
                        }}
                        aria-label={`View ${image.title || 'image'}`}
                      >
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
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Viewer */}
        {isViewerOpen && (
          <div className="image-viewer-container">
            <button
              className="close-viewer"
              onClick={closeImageViewer}
              aria-label="Close image viewer"
            >
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="viewer-content">
              <button
                className="nav-btn prev-btn"
                onClick={() =>
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? galleryData.images.length - 1 : prevIndex - 1
                  )
                }
                aria-label="Previous image"
              >
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
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="image-container">
                <img
                  src={`${import.meta.env.BASE_URL}${galleryData.images[currentImageIndex].src}`}
                  alt={galleryData.images[currentImageIndex].alt}
                  className="viewer-image"
                />
                <div className="image-caption">
                  <h3>{galleryData.images[currentImageIndex].title}</h3>
                  <p>{galleryData.images[currentImageIndex].description}</p>
                  <span className="image-counter">
                    {currentImageIndex + 1} / {galleryData.images.length}
                  </span>
                </div>
              </div>

              <button
                className="nav-btn next-btn"
                onClick={() =>
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === galleryData.images.length - 1 ? 0 : prevIndex + 1
                  )
                }
                aria-label="Next image"
              >
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

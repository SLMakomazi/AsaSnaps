import React, { useEffect, useRef } from 'react';
import styles from './Partnerships.module.css';

const Partnerships = () => {
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  const animationFrameId = useRef(null);
  const scrollPositions = useRef({ firstRow: 0, secondRow: 0 });
  const lastTimestamp = useRef(0);
  const speed = 0.5; // Adjust speed as needed

  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      const deltaTime = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      // Update scroll positions
      scrollPositions.current.firstRow += speed * deltaTime / 16; // Normalize to 60fps
      scrollPositions.current.secondRow -= speed * deltaTime / 16; // Opposite direction

      // Apply transforms
      if (firstRowRef.current) {
        firstRowRef.current.style.transform = `translateX(-${scrollPositions.current.firstRow}px)`;
      }
      if (secondRowRef.current) {
        secondRowRef.current.style.transform = `translateX(${scrollPositions.current.secondRow}px)`;
      }

      // Reset positions when scrolled far enough (adjust based on content width)
      if (scrollPositions.current.firstRow > 1200) scrollPositions.current.firstRow = 0;
      if (scrollPositions.current.secondRow > 1200) scrollPositions.current.secondRow = 0;
      if (scrollPositions.current.firstRow < -1200) scrollPositions.current.firstRow = 0;
      if (scrollPositions.current.secondRow < -1200) scrollPositions.current.secondRow = 0;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Function to create a logo item with alternating vertical offset
  const LogoItem = ({ src, alt, width, index }) => (
    <div 
      className={styles.logoItem} 
      style={{ 
        transform: `translateY(${index % 2 === 0 ? '-15px' : '15px'})`,
        transition: 'transform 0.3s ease'
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className={styles.logo} 
        style={{ width: `${width}px`, height: 'auto' }} 
      />
    </div>
  );

  // Logos data
  const firstRowLogos = [
    { src: 'https://via.placeholder.com/100?text=DJI', alt: 'DJI', width: 80 },
    { src: 'https://via.placeholder.com/100?text=GoPro', alt: 'GoPro', width: 100 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png', alt: 'Samsung', width: 150 },
    { src: 'https://via.placeholder.com/100?text=Leica', alt: 'Leica', width: 100 },
    { src: 'https://via.placeholder.com/100?text=Fujifilm', alt: 'Fujifilm', width: 160 },
    { src: 'https://via.placeholder.com/100?text=Blackmagic', alt: 'Blackmagic', width: 150 },
    { src: 'https://via.placeholder.com/100?text=Panasonic', alt: 'Panasonic', width: 120 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/320px-Adobe_Corporate_Logo.png', alt: 'Adobe', width: 100 },
  ];

  const secondRowLogos = [
    { src: 'https://via.placeholder.com/100?text=Hasselblad', alt: 'Hasselblad', width: 140 },
    { src: 'https://via.placeholder.com/100?text=Canon', alt: 'Canon', width: 120 },
    { src: 'https://via.placeholder.com/100?text=Nikon', alt: 'Nikon', width: 100 },
    { src: 'https://via.placeholder.com/100?text=Phase+One', alt: 'Phase One', width: 130 },
    { src: 'https://via.placeholder.com/100?text=Sony', alt: 'Sony', width: 140 },
    { src: 'https://via.placeholder.com/100?text=Olympus', alt: 'Olympus', width: 100 },
    { src: 'https://via.placeholder.com/100?text=Sigma', alt: 'Sigma', width: 90 },
    { src: 'https://via.placeholder.com/100?text=Tamron', alt: 'Tamron', width: 120 },
  ];

  // Duplicate logos for seamless looping
  const firstRowLogosDuplicated = [...firstRowLogos, ...firstRowLogos];
  const secondRowLogosDuplicated = [...secondRowLogos, ...secondRowLogos];

  return (
    <div className={styles.partnersContainer}>
      <h2 className={styles.title}>Our Partners</h2>
      <div className={styles.scrollContainer}>
        <div className={`${styles.logoRow} ${styles.firstRow}`} ref={firstRowRef}>
          {firstRowLogosDuplicated.map((logo, index) => (
            <LogoItem key={`first-${index}`} index={index} {...logo} />
          ))}
        </div>

        <div className={`${styles.logoRow} ${styles.secondRow}`} ref={secondRowRef}>
          {secondRowLogosDuplicated.map((logo, index) => (
            <LogoItem key={`second-${index}`} index={index} {...logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partnerships;

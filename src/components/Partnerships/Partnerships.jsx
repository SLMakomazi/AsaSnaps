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
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/DJI_logo.png/320px-DJI_logo.png', alt: 'DJI', width: 80 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/GoPro_Logo.svg/320px-GoPro_Logo.svg.png', alt: 'GoPro', width: 120 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png', alt: 'Samsung', width: 150 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Leica_Camera_logo.svg/320px-Leica_Camera_logo.svg.png', alt: 'Leica', width: 100 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Fujifilm_logo.svg/320px-Fujifilm_logo.svg.png', alt: 'Fujifilm', width: 140 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Blackmagic_Design_logo.svg/320px-Blackmagic_Design_logo.svg.png', alt: 'Blackmagic', width: 150 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Panasonic_logo_%28Blue%29.svg/320px-Panasonic_logo_%28Blue%29.svg.png', alt: 'Panasonic', width: 140 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/320px-Adobe_Corporate_Logo.png', alt: 'Adobe', width: 100 },
  ];

  const secondRowLogos = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hasselblad_logo.svg/320px-Hasselblad_logo.svg.png', alt: 'Hasselblad', width: 160 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Canon_logo_2016.svg/320px-Canon_logo_2016.svg.png', alt: 'Canon', width: 140 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Nikon_logo.svg/320px-Nikon_logo.svg.png', alt: 'Nikon', width: 120 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phase_One_logo.svg/320px-Phase_One_logo.svg.png', alt: 'Phase One', width: 160 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sony_Logo_2019.svg/320px-Sony_Logo_2019.svg.png', alt: 'Sony', width: 140 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Olympus_Logo.svg/320px-Olympus_Logo.svg.png', alt: 'Olympus', width: 140 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sigma_logo.svg/320px-Sigma_logo.svg.png', alt: 'Sigma', width: 120 },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tamron_logo_2018.svg/320px-Tamron_logo_2018.svg.png', alt: 'Tamron', width: 140 },
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

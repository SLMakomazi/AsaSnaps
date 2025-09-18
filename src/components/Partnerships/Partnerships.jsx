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
  const LogoItem = ({ svg, alt, width, index }) => (
    <div 
      className={styles.logoItem} 
      style={{ 
        transform: `translateY(${index % 2 === 0 ? '-15px' : '15px'})`,
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label={alt}
    >
      <div 
        className={styles.logo} 
        style={{ width: `${width}px` }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );

  // Logos data with inline SVGs
  const firstRowLogos = [
    { 
      svg: `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M160 0C71.6 0 0 71.6 0 160s71.6 160 160 160 160-71.6 160-160S248.4 0 160 0zm0 290.9c-72.2 0-130.9-58.7-130.9-130.9S87.8 29.1 160 29.1 290.9 87.8 290.9 160 232.2 290.9 160 290.9z" fill="#000"/>
        <path d="M160 58.2c-56.2 0-101.8 45.6-101.8 101.8S103.8 261.8 160 261.8 261.8 216.2 261.8 160 216.2 58.2 160 58.2zm0 174.5c-40.1 0-72.7-32.6-72.7-72.7s32.6-72.7 72.7-72.7 72.7 32.6 72.7 72.7-32.6 72.7-72.7 72.7z" fill="#000"/>
        <path d="M160 87.3c-40.1 0-72.7 32.6-72.7 72.7s32.6 72.7 72.7 72.7 72.7-32.6 72.7-72.7-32.6-72.7-72.7-72.7z" fill="#000"/>
      </svg>`, 
      alt: 'DJI', 
      width: 80 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 0h40v100H60z" fill="#00aef0"/>
        <path d="M100 0h40v100h-40z" fill="#fff"/>
        <path d="M140 0h40v100h-40z" fill="#00aef0"/>
        <path d="M180 0h40v100h-40z" fill="#fff"/>
        <path d="M220 0h40v100h-40z" fill="#00aef0"/>
      </svg>`, 
      alt: 'GoPro', 
      width: 120 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#1428a0"/>
        <path d="M60 20h200v60H60z" fill="#fff"/>
        <ellipse cx="160" cy="50" rx="40" ry="30" fill="#1428a0"/>
      </svg>`, 
      alt: 'Samsung', 
      width: 150 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#000"/>
        <path d="M80 20h160v60H80z" fill="#fff"/>
        <path d="M100 30h120v40H100z" fill="#000"/>
      </svg>`, 
      alt: 'Leica', 
      width: 100 
    },
  ];

  const secondRowLogos = [
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#ed1c24"/>
        <path d="M80 20h160v60H80z" fill="#fff"/>
        <path d="M100 30h120v40H100z" fill="#ed1c24"/>
      </svg>`, 
      alt: 'Canon', 
      width: 140 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#ffd700"/>
        <path d="M80 20h160v60H80z" fill="#000"/>
        <path d="M100 30h120v40H100z" fill="#ffd700"/>
      </svg>`, 
      alt: 'Nikon', 
      width: 120 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#000"/>
        <path d="M80 20h160v60H80z" fill="#fff"/>
        <path d="M100 30h120v40H100z" fill="#000"/>
      </svg>`, 
      alt: 'Sony', 
      width: 140 
    },
    { 
      svg: `<svg viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 0h240v100H40z" fill="#0000ff"/>
        <path d="M80 20h160v60H80z" fill="#fff"/>
        <path d="M100 30h120v40H100z" fill="#0000ff"/>
      </svg>`, 
      alt: 'Olympus', 
      width: 140 
    },
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

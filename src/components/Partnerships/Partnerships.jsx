import { useEffect, useRef, useState } from 'react';
import styles from './Partnerships.module.css';

const Partnerships = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef();
  const scrollPositions = useRef([]);
  const speed = 1.5; // Adjust speed as needed

  const [partners] = useState([
    { 
      name: 'Canon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Canon_logo_1976_to_1991.svg/320px-Canon_logo_1976_to_1991.svg.png',
      size: 120
    },
    { 
      name: 'Nikon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Nikon_logo.svg/320px-Nikon_logo.svg.png',
      size: 100
    },
    { 
      name: 'Sony', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Sony_logo.svg/320px-Sony_logo.svg.png',
      size: 140
    },
    { 
      name: 'Fujifilm', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Fujifilm_logo.svg/320px-Fujifilm_logo.svg.png',
      size: 160
    },
    { 
      name: 'DJI', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/DJI_Logo_Black.svg/320px-DJI_Logo_Black.svg.png',
      size: 80
    },
    { 
      name: 'Adobe', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/320px-Adobe_Corporate_Logo.png',
      size: 100
    },
    { 
      name: 'Samsung', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png',
      size: 150
    },
    { 
      name: 'GoPro', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/GoPro_Logo.svg/320px-GoPro_Logo.svg.png',
      size: 100
    }
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container
    container.innerHTML = '';
    scrollPositions.current = [];

    // Create two rows with different positions
    const rows = 2;
    const itemsPerRow = 8;
    
    for (let row = 0; row < rows; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = styles.logoRow;
      
      // Randomize the order of partners for each row
      const shuffledPartners = [...partners].sort(() => Math.random() - 0.5);
      
      // Initialize scroll position for this row
      scrollPositions.current[row] = 0;
      
      // Add more items for continuous scrolling
      for (let i = 0; i < itemsPerRow; i++) {
        const partner = shuffledPartners[i % shuffledPartners.length];
        const logoEl = document.createElement('div');
        logoEl.className = styles.logoItem;
        
        // Random vertical offset for each logo
        const verticalOffset = `${Math.random() * 40 - 20}px`;
        logoEl.style.setProperty('--offset', verticalOffset);
        
        logoEl.innerHTML = `
          <img 
            src="${partner.logo}" 
            alt="${partner.name}" 
            class="${styles.logo}"
            style="width: ${partner.size}px; height: auto;"
            onerror="this.onerror=null;this.src='https://via.placeholder.com/100?text=LOGO'"
          />
        `;
        
        rowEl.appendChild(logoEl);
      }
      
      container.appendChild(rowEl);
    }

    const animate = () => {
      const rows = container.querySelectorAll(`.${styles.logoRow}`);
      rows.forEach((row, index) => {
        scrollPositions.current[index] += speed * (index % 2 === 0 ? 1 : -1);
        row.style.transform = `translateX(${-scrollPositions.current[index]}px)`;
        
        // Reset position when scrolled the width of one set of partners
        if (Math.abs(scrollPositions.current[index]) > row.scrollWidth / 3) {
          scrollPositions.current[index] = 0;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Pause on hover
    const handleMouseEnter = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    
    const handleMouseLeave = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [partners]);

  return (
    <section className={styles.partnerships}>
      <div className={styles.container}>
        <h2 className={styles.title}>Trusted By Industry Leaders</h2>
        <div className={styles.partnersContainer} ref={containerRef}>
          {/* Logos will be added dynamically */}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;

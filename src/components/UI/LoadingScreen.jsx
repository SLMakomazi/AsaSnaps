import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;
    let width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        // Animate out before unmounting
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // This will be handled by the parent component
          },
        });
      } else {
        width += Math.random() * 30;
        width = Math.min(width, 100);
        progress.style.width = `${width}%`;
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen" ref={loaderRef}>
      <div className="loading-content">
        <h1 className="loading-title">ASAVELA MAVANDA</h1>
        <div className="loading-progress">
          <div className="loading-progress-bar" ref={progressRef}></div>
        </div>
        <p className="loading-text">Loading Portfolio</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

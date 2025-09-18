import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    updateProgress();
    
    return () => {
      setProgress(100);
    };
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.textContent}>
          <div className={styles.welcomeText}>Welcome to</div>
          <h1 className={styles.nameText}>Asavela Mavanda</h1>
          <div className={styles.subtitleText}>photography portfolio</div>
        </div>
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

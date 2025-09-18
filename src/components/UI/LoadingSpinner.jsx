import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 40, color = 'var(--primary)' }) => {
  return (
    <div 
      className={styles.spinner} 
      style={{
        '--spinner-size': `${size}px`,
        '--spinner-color': color,
      }}
      aria-busy="true"
      aria-label="Loading..."
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;

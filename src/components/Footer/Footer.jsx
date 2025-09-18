import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.about}>
            <h3 className={styles.footerTitle}>AsaSnaps</h3>
            <p className={styles.aboutText}>
              Capturing life's precious moments with creativity and passion. 
              Based in [Your Location], serving clients worldwide.
            </p>
            <div className={styles.socialLinks}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <FaTwitter />
              </a>
              <a 
                href="mailto:contact@asasnaps.com" 
                aria-label="Email"
                className={styles.socialLink}
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerSubtitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li><Link to="/gallery" className={styles.footerLink}>Gallery</Link></li>
              <li><Link to="/services" className={styles.footerLink}>Services</Link></li>
              <li><Link to="/about" className={styles.footerLink}>About</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>

          <div className={styles.contactInfo}>
            <h4 className={styles.footerSubtitle}>Contact Us</h4>
            <address className={styles.address}>
              <p>123 Photography Street</p>
              <p>City, State 12345</p>
              <p>Country</p>
              <p>
                <a href="mailto:contact@asasnaps.com" className={styles.contactLink}>
                  contact@asasnaps.com
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className={styles.contactLink}>
                  +1 (234) 567-890
                </a>
              </p>
            </address>
          </div>

          <div className={styles.newsletter}>
            <h4 className={styles.footerSubtitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Subscribe to get updates on special offers and photography tips.
            </p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className={styles.newsletterInput}
                aria-label="Email address for newsletter subscription"
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.bottomColumn}>
            <p className={styles.copyright}>
              &copy; {currentYear} AsaSnaps. All rights reserved.
            </p>
          </div>
          <div className={styles.bottomColumn}>
            <div className={styles.legalLinks}>
              <Link to="/privacy-policy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <span className={styles.divider}>|</span>
              <Link to="/terms" className={styles.legalLink}>
                Terms of Service
              </Link>
            </div>
          </div>
          <div className={styles.bottomColumn}>
            <div className={styles.credit}>
              Created by {'  '}
              <a 
                href="https://calvin-tech-solutions.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#FF6B6B', textDecoration: 'none' }}
                className={styles.creditLink}
              >
                 Calvin Tech Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

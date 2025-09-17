import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './styles/global.css';

// Components
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Packages from './components/Packages/Packages';
import Gallery from './components/Gallery/Gallery';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminEditor from './pages/AdminEditor/AdminEditor';
import ScrollToTop from './components/UI/ScrollToTop';
import LoadingScreen from './components/UI/LoadingScreen';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Component to handle scroll to top on route change
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isDev = import.meta.env.MODE === 'development';
  const appRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Initialize animations after content is loaded
      gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }, 1500);

    // Set up scroll to top button visibility
    const handleScroll = () => {
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app" ref={appRef}>
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main className="main-content">
                  <About id="about" className="animate-on-scroll" />
                  <Services id="services" className="animate-on-scroll" />
                  <Packages id="packages" className="animate-on-scroll" />
                  <Gallery id="gallery" className="animate-on-scroll" />
                  <Testimonials id="testimonials" className="animate-on-scroll" />
                  <Contact id="contact" className="animate-on-scroll" />
                </main>
                <Footer className="animate-on-scroll" />
              </>
            }
          />
          {isDev && (
            <Route path="/admin" element={
              <div className="admin-route">
                <AdminEditor />
              </div>
            } />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

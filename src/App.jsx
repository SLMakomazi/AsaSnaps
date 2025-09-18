import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import LoadingScreen from './components/UI/LoadingScreen';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Hide loading screen after 4 seconds or when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Asavela Mavanda Photography</title>
        <meta name="description" content="Professional photography services by Asavela Mavanda. Capturing your precious moments with creativity and passion." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1A1A2E" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asasnaps.com/" />
        <meta property="og:title" content="Asavela Mavanda Photography" />
        <meta property="og:description" content="Professional photography services by Asavela Mavanda. Capturing your precious moments with creativity and passion." />
        <meta property="og:image" content="/images/social-preview.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://asasnaps.com/" />
        <meta property="twitter:title" content="Asavela Mavanda Photography" />
        <meta property="twitter:description" content="Professional photography services by Asavela Mavanda. Capturing your precious moments with creativity and passion." />
        <meta property="twitter:image" content="/images/social-preview.jpg" />
      </Helmet>

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

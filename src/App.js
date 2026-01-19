import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import CursorEffect from './components/CursorEffect';
import ScrollToTop from './components/ScrollToTop'; // استيراد مكون السكرول

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ContentWritingPage from './pages/ContentWritingPage';
import MarketingPage from './pages/MarketingPage';
import MontagePage from './pages/MontagePage';
import MotionGraphicsPage from './pages/MotionGraphicsPage';
import PhotographyPage from './pages/PhotographyPage';
import StudioRentalPage from './pages/StudioRentalPage';
import WebDesignPage from './pages/WebDesignPage';
import DesignPage from './pages/DesignPage';


function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* وضع مكون السكرول هنا ليعمل مع كل تغيير في المسار */}
        <ScrollToTop /> 

        <div className="relative min-h-screen">
          {/* المكونات العائمة (فوق كل الصفحات) */}
          <CursorEffect /> 
          <BackgroundEffects />
          
          <Navbar />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/content-writing" element={<ContentWritingPage />} />
              <Route path="/services/marketing" element={<MarketingPage />} />
              <Route path="/services/montage" element={<MontagePage />} />
              <Route path="/services/motion-graphics" element={<MotionGraphicsPage />} />
              <Route path="/services/photography" element={<PhotographyPage />} />
              <Route path="/services/studio-rental" element={<StudioRentalPage />} />
              <Route path="/services/web-design" element={<WebDesignPage />} />
              <Route path="/services/design" element={<DesignPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isCracked, setIsCracked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const triggerCrack = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2215/2215-preview.mp3');
      audio.volume = 0.4;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // يتم تجاهل الخطأ في حالة منع المتصفح للتشغيل التلقائي
      });
    } catch (e) {
      console.warn("Audio playback not supported or blocked", e);
    }

    setIsCracked(true);
    setTimeout(() => setIsCracked(false), 800);
    setIsMenuOpen(false);
  };

  const discoverServices = [
    { name: t('service.motion'), path: '/services/motion-graphics' },
    { name: t('service.montage'), path: '/services/montage' },
    { name: t('service.photography'), path: '/services/photography' },
    { name: t('service.design'), path: '/services/design' },
    { name: t('service.studio'), path: '/services/studio-rental' },
    { name: t('service.web'), path: '/services/web-design' },
    { name: t('service.content'), path: '/services/content-writing' },
    { name: t('service.marketing'), path: '/services/marketing' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-4 md:py-7 flex items-center justify-between pointer-events-none">
      
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-shake {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        .crack-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-crack 0.4s forwards ease-out;
        }
        @keyframes draw-crack {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Logo Section */}
      <div className="flex items-center md:ms-12 pointer-events-auto">
        <Link to="/" className="relative z-50">
          <img 
            src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686064/Asset_3_ypwlqu.png" 
            alt="Aqrablik Media Logo" 
            className="h-10 md:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
          />
        </Link>
      </div>

      {/* Navigation Links Desktop */}
      <nav 
        className={`hidden lg:flex items-center glass-nav px-8 py-3 rounded-full gap-8 transition-all relative pointer-events-auto ${isCracked ? 'animate-shake' : ''}`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0">
          {isCracked && (
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
              <g stroke="rgba(255,255,255,0.9)" strokeWidth="0.5" fill="none">
                <path className="crack-line" d="M200 30 L180 15 L140 10 L80 0" />
                <path className="crack-line" d="M200 30 L220 45 L260 55 L350 60" />
                <path className="crack-line" d="M200 30 L160 40 L120 50 L40 55" />
                <path className="crack-line" d="M200 30 L240 20 L300 10 L380 5" />
                <circle cx="200" cy="30" r="1.5" fill="white" />
              </g>
            </svg>
          )}
        </div>

        <Link 
          to="/" 
          onClick={() => { triggerCrack(); setIsDiscoverOpen(false); }}
          className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/' ? 'text-blue-400' : 'text-white'}`}
        >
          {t('nav.home')}
        </Link>

        <Link 
          to="/services" 
          onClick={() => { triggerCrack(); setIsDiscoverOpen(false); }}
          className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/services' ? 'text-blue-400' : 'text-white'}`}
        >
          {t('nav.services')}
        </Link>
          
        <div className="relative z-10">
          <div 
            onClick={() => setIsDiscoverOpen(!isDiscoverOpen)}
            className={`text-base font-medium hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer select-none ${isDiscoverOpen ? 'text-blue-400' : 'text-white'}`}
          >
            {t('nav.discover')}
            <svg className={`w-4 h-4 transition-transform duration-300 ${isDiscoverOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className={`absolute top-full start-0 mt-4 w-64 bg-[#080911]/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${isDiscoverOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
            <div className="flex flex-col py-2">
              {discoverServices.map((service, index) => (
                <Link 
                  key={index} 
                  to={service.path} 
                  onClick={() => {
                    triggerCrack();
                    setIsDiscoverOpen(false);
                  }} 
                  className="px-6 py-3 text-sm text-white/80 hover:text-blue-400 hover:bg-white/5 transition-all text-start border-b border-white/5 last:border-0"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link to="/about" onClick={() => { triggerCrack(); setIsDiscoverOpen(false); }} className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/about' ? 'text-blue-400' : 'text-white'}`}>{t('nav.about')}</Link>
        <Link to="/contact" onClick={() => { triggerCrack(); setIsDiscoverOpen(false); }} className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/contact' ? 'text-blue-400' : 'text-white'}`}>{t('nav.contact')}</Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-6 md:me-12 pointer-events-auto">
        <div 
          onClick={toggleLanguage}
          className="w-12 h-6 md:w-16 md:h-8 bg-white/5 border border-white/10 rounded-full p-1 flex items-center cursor-pointer relative hover:bg-white/10 transition-all group"
        >
          <div className={`w-4 h-4 md:w-6 md:h-6 bg-gray-400 rounded-full transition-all flex items-center justify-center text-[8px] md:text-[10px] text-black font-bold absolute top-1 shadow-md z-10 ${language === 'ar' ? 'start-1' : 'start-7 md:start-9'}`}>
            {language.toUpperCase()}
          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className={`lg:hidden w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className="hidden md:flex w-12 h-12 bg-white/5 border border-white/10 rounded-full items-center justify-center cursor-pointer hover:bg-white/20 transition shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#080911] z-[110] lg:hidden flex flex-col items-center overflow-y-auto py-20 px-10 transition-transform duration-500 pointer-events-auto ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-6 right-6 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer z-[120]"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center justify-center gap-6 w-full relative z-10">
          <Link to="/" onClick={() => triggerCrack()} className="text-3xl font-bold text-white hover:text-blue-400 transition-colors">{t('nav.home')}</Link>
          <Link to="/services" onClick={() => triggerCrack()} className="text-3xl font-bold text-white hover:text-blue-400 transition-colors">{t('nav.services')}</Link>
          
          <div className="flex flex-col items-center gap-5 w-full py-4 border-y border-white/5">
            {discoverServices.map((service, index) => (
              <Link key={index} to={service.path} onClick={() => triggerCrack()} className="text-xl text-white/70 hover:text-blue-400 transition-all font-medium">{service.name}</Link>
            ))}
          </div>

          <Link to="/about" onClick={() => triggerCrack()} className="text-3xl font-bold text-white hover:text-blue-400 transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" onClick={() => triggerCrack()} className="text-3xl font-bold text-white hover:text-blue-400 transition-colors">{t('nav.contact')}</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
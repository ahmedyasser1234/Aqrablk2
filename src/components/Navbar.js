import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isCracked, setIsCracked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const isAr = language === 'ar';

  const triggerCrack = () => {
    try {
      const audio = new Audio('/audio/glass-break.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {}
    setIsCracked(true);
    setTimeout(() => setIsCracked(false), 1000);
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

  const GlassCrackSVG = () => (
    <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible crack-animation">
      <g stroke="white" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.8">
        <circle cx="200" cy="50" r="1.5" fill="white" />
        <path d="M200,50 L150,20 L100,5" /><path d="M200,50 L140,80 L80,95" />
        <path d="M200,50 L250,10 L320,0" /><path d="M200,50 L270,75 L350,90" />
        <path d="M120,15 L110,25" /><path d="M280,85 L290,75" />
      </g>
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 lg:px-10 py-3 lg:py-6">
      
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center z-[120]">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686064/Asset_3_ypwlqu.png" 
              alt="Logo" 
              className="h-8 md:h-12 lg:h-16 w-auto object-contain transition-opacity" 
            />
          </Link>
        </div>

        {/* Navigation Links Desktop */}
        <nav className={`hidden lg:flex items-center glass-nav px-8 py-3 rounded-full gap-8 transition-all relative ${isCracked ? 'animate-shake' : ''}`}>
          {isCracked && <GlassCrackSVG />}
          <Link to="/" className={`text-sm font-medium hover:text-blue-400 transition-colors ${location.pathname === '/' ? 'text-blue-400' : 'text-white'}`}>{t('nav.home')}</Link>
          <Link to="/services" className={`text-sm font-medium hover:text-blue-400 transition-colors ${location.pathname === '/services' ? 'text-blue-400' : 'text-white'}`}>{t('nav.services')}</Link>
          
          <div className="relative group">
            <div onClick={() => setIsDiscoverOpen(!isDiscoverOpen)} className={`text-sm font-medium flex items-center gap-1 cursor-pointer select-none ${isDiscoverOpen ? 'text-blue-400' : 'text-white'}`}>
              {t('nav.discover')}
              <svg className={`w-3 h-3 transition-transform ${isDiscoverOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            
            {/* Discover Dropdown Desktop */}
            <div className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-4 w-56 bg-[#080911]/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all ${isDiscoverOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
              <div className="flex flex-col py-1">
                {discoverServices.map((service, i) => (
                  <Link key={i} to={service.path} onClick={() => { triggerCrack(); setIsDiscoverOpen(false); }} className="px-5 py-2.5 text-xs text-white/80 hover:text-blue-400 hover:bg-white/5 transition-all text-start border-b border-white/5 last:border-0">{service.name}</Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">{t('nav.contact')}</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-6 z-[120]">
          {/* Language Toggle */}
          <div 
            onClick={toggleLanguage}
            className="w-12 h-6 md:w-14 md:h-7 bg-white/5 border border-white/10 rounded-full p-1 flex items-center cursor-pointer relative transition-all"
          >
            <div className={`w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full transition-all flex items-center justify-center text-[8px] md:text-[10px] text-white font-bold shadow-lg ${isAr ? 'translate-x-0' : 'translate-x-6 md:translate-x-7'}`}>
              {language.toUpperCase()}
            </div>
          </div>

          {/* User Icon Desktop */}
          <div className="hidden md:flex w-10 h-10 bg-white/5 border border-white/10 rounded-full items-center justify-center cursor-pointer hover:bg-white/20 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>

          {/* Hamburger Menu Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#080911] z-[110] lg:hidden flex flex-col transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-start gap-6 w-full h-full overflow-y-auto pt-24 pb-10 px-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white transition-colors">{t('nav.home')}</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white transition-colors">{t('nav.services')}</Link>
          
          <div className="flex flex-col items-center gap-4 w-full py-6 border-y border-white/5">
            <span className="text-blue-400 text-sm mb-2 opacity-50 uppercase tracking-widest">{t('nav.discover')}</span>
            {discoverServices.map((service, index) => (
              <Link key={index} to={service.path} onClick={() => setIsMenuOpen(false)} className="text-lg text-white/70 hover:text-blue-400 transition-all font-medium text-center">{service.name}</Link>
            ))}
          </div>

          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white transition-colors">{t('nav.contact')}</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

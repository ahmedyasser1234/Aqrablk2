import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; 
import ScrollReveal from '../components/ScrollReveal';

const youtubeVideos = ["0NgXkHQTt4U", "k9M60YJJ3iE", "m2mdBK91kQY"];
const montageVideos = ["m2mdBK91kQY", "0NgXkHQTt4U", "k9M60YJJ3iE"];
const webProjects = [
  { image: "https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686440/arct_o02dz4.png", url: "https://architectegypt.com" },
  { image: "https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686454/glax_asgtg5.png", url: "https://galaxyrepairuae.com" },
  { image: "https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686455/sharik_mwmenl.png", url: "https://sharke1.netlify.app" },
  { image: "https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686457/shelter_i6bufo.png", url: "https://shelterhouseofcheese.com" }
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeMontage, setActiveMontage] = useState(0);
  const [activeWeb, setActiveWeb] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [playingMontage, setPlayingMontage] = useState(null);
  
  const videoTimerRef = useRef(null);
  const montageTimerRef = useRef(null);
  const webTimerRef = useRef(null);

  const clearAllTimers = useCallback(() => {
    if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    if (montageTimerRef.current) clearInterval(montageTimerRef.current);
    if (webTimerRef.current) clearInterval(webTimerRef.current);
    videoTimerRef.current = null;
    montageTimerRef.current = null;
    webTimerRef.current = null;
  }, []);

  const nextVideo = useCallback(() => {
    if (!playingVideo) setActiveVideo((prev) => (prev + 1) % youtubeVideos.length);
  }, [playingVideo]);

  const nextMontage = useCallback(() => {
    if (!playingMontage) setActiveMontage((prev) => (prev + 1) % montageVideos.length);
  }, [playingMontage]);

  const nextWeb = useCallback(() => {
    setActiveWeb((prev) => (prev + 1) % webProjects.length);
  }, []);

  const startAllTimers = useCallback(() => {
    clearAllTimers();
    videoTimerRef.current = setInterval(nextVideo, 5000);
    montageTimerRef.current = setInterval(nextMontage, 5000);
    webTimerRef.current = setInterval(nextWeb, 5000);
  }, [clearAllTimers, nextVideo, nextMontage, nextWeb]);

  useEffect(() => {
    startAllTimers();
    return () => clearAllTimers();
  }, [startAllTimers, clearAllTimers]);

  useEffect(() => {
    if (!playingVideo && !playingMontage) startAllTimers();
  }, [playingVideo, playingMontage, startAllTimers]);

  // Helper for responsive carousel classes
  const getCarouselClass = (index, activeIdx, total) => {
    const isActive = index === activeIdx;
    const isPrev = index === (activeIdx - 1 + total) % total;
    const isNext = index === (activeIdx + 1) % total;
    
    if (isActive) return "z-30 scale-100 opacity-100 shadow-2xl blur-0";
    if (isPrev) return `-translate-x-[35%] lg:-translate-x-[45%] z-10 scale-[0.65] opacity-30 blur-[4px]`;
    if (isNext) return `translate-x-[35%] lg:translate-x-[45%] z-10 scale-[0.65] opacity-30 blur-[4px]`;
    return "opacity-0 scale-50 blur-xl";
  };

  return (
    <div className="relative pt-10 overflow-x-hidden">
      {/* Header Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center text-center px-6 md:px-10 pb-10 md:pb-20">
        <ScrollReveal className="absolute top-[25%] md:top-[33%] left-1/2 -translate-x-1/2 mt-5 md:mt-0 w-24 h-24 md:w-[12rem] md:h-[12rem] pointer-events-none z-20">
          <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768684802/Asset_1_fwpljm.png" alt="Asteroid" className="w-full h-full object-contain brightness-90 animate-float" />
        </ScrollReveal>
        <div className="flex flex-col items-center relative z-30">
          <ScrollReveal direction="down">
            <h2 className="text-3xl md:text-5xl lg:text-[6.5rem] glow-text leading-tight md:leading-[0.8] mb-2 md:mb-[-1.5rem]">{t('services.discover_title')}</h2>
          </ScrollReveal>
          <div className="relative">
            <ScrollReveal delay={0.2}>
              <h2 className="text-4xl md:text-6xl lg:text-[6.5rem] glow-text leading-tight md:leading-[0.8] mt-4 md:mt-32 font-black">{t('services.main_title')}</h2>
            </ScrollReveal>
            <ScrollReveal className={`absolute ${isAr ? '-right-10' : '-left-10'} top-[60%] w-10 h-10 md:w-20 md:h-20 animate-float pointer-events-none`} delay={0.4}>
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768684802/Asset_1_fwpljm.png" alt="Small Rock" className="w-full h-full object-contain brightness-75 rotate-45" />
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[130px] pointer-events-none"></div>
      </section>

      {/* Motion Graphics Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:-mt-80 z-50 order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'} className="relative w-48 h-48 md:w-[28rem] md:h-[28rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686487/Asset_2_2x_qaiojz.png" alt="Motion" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-start order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-mr-40' : 'lg:-ml-40'}`}>{t('service.motion')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'left' : 'right'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-mr-[100px]' : 'lg:-ml-[100px]'}`}>{t('service.motion.desc')}</p>
            </ScrollReveal>
            <div className="w-full relative h-[220px] md:h-[350px] flex items-center justify-center [perspective:1200px]">
              {youtubeVideos.map((id, index) => (
                <div key={index} onClick={() => handleVideoClick(index)} className={`absolute transition-all duration-[800ms] w-[280px] md:w-[450px] aspect-video rounded-3xl overflow-hidden cursor-pointer ${getCarouselClass(index, activeVideo, youtubeVideos.length)}`}>
                  <iframe className="w-full h-full pointer-events-none" src={`https://www.youtube.com/embed/${id}?controls=0&modestbranding=1&rel=0${activeVideo === index && playingVideo === id ? '&autoplay=1' : ''}`} frameBorder="0"></iframe>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/services/motion-graphics')} className="mt-8 px-12 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xl font-bold hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Montage Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:-mt-[140px] z-50 order-1 lg:order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'} className="relative w-48 h-48 md:w-[32rem] md:h-[32rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686469/xxx_yv639q.png" alt="Montage" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-end text-center lg:text-end order-2 lg:order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-translate-x-[220px]' : 'lg:translate-x-[220px]'}`}>{t('service.montage')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'right' : 'left'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-translate-x-[80px]' : 'lg:translate-x-[80px]'}`}>{t('service.montage.desc')}</p>
            </ScrollReveal>
            <div className="w-full relative h-[220px] md:h-[350px] flex items-center justify-center [perspective:1200px]">
              {montageVideos.map((id, index) => (
                <div key={index} onClick={() => handleMontageClick(index)} className={`absolute transition-all duration-[800ms] w-[280px] md:w-[450px] aspect-video rounded-3xl overflow-hidden cursor-pointer ${getCarouselClass(index, activeMontage, montageVideos.length)}`}>
                  <iframe className="w-full h-full pointer-events-none" src={`https://www.youtube.com/embed/${id}?controls=0&modestbranding=1&rel=0${activeMontage === index && playingMontage === id ? '&autoplay=1' : ''}`} frameBorder="0"></iframe>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/services/montage')} className="mt-8 px-12 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-400 font-bold text-xl hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:-mt-20 z-50 order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'} className="relative w-48 h-48 md:w-[28rem] md:h-[28rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686527/Asset_3_2x_wt6qwj.png" alt="Photography" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-start order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-mr-40' : 'lg:-ml-40'}`}>{t('service.photography')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'left' : 'right'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-mr-[100px]' : 'lg:-ml-[100px]'}`}>{t('service.photography.desc')}</p>
            </ScrollReveal>
            <button onClick={() => navigate('/services/photography')} className="px-12 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xl font-bold hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10 z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:mt-[-60px] z-10 order-1 lg:order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'} className="relative w-40 h-40 md:w-[28rem] md:h-[28rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768844028/designer_flip_xbi533.png" alt="Design" className={`w-full h-auto ${isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-end text-center lg:text-end order-2 lg:order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-translate-x-[150px]' : 'lg:translate-x-[260px]'}`}>{t('service.design')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'right' : 'left'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-[360px] leading-loose mb-12 relative ${isAr ? 'lg:-translate-x-[100px]' : 'lg:translate-x-[5px]'}`}>{t('service.design.desc')}</p>
            </ScrollReveal>
            <button onClick={() => navigate('/services/design')} className="px-12 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-400 font-bold text-xl hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Studio Rental Section */}
      <section className="relative min-h-[50vh] md:min-h-[100vh] flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="absolute inset-0 z-0">
          <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686452/bbb_k3mvpy.png" alt="Studio" className={`w-full h-full object-cover ${!isAr ? 'scale-x-[-1]' : ''}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080911]/80 via-transparent to-[#080911]/80"></div>
        </div>
        <div className="relative z-10">
          <ScrollReveal direction="down">
            <h2 className="text-3xl md:text-[5rem] text-white glow-text mb-8 font-black lg:whitespace-nowrap">{t('service.studio')}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-200 text-base md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">{t('service.studio.desc')}</p>
          </ScrollReveal>
          <button onClick={() => navigate('/services/studio-rental')} className="px-12 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xl font-bold hover:bg-white/10 transition-all">{t('services.more')}</button>
        </div>
      </section>

      {/* Web Design Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:-mt-[300px] z-50 order-1 lg:order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'} className="relative w-48 h-48 md:w-[32rem] md:h-[32rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686522/Asset_4_2x_vu9c2h.png" alt="Web" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-end text-center lg:text-end order-2 lg:order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-translate-x-[220px]' : 'lg:translate-x-[220px]'}`}>{t('service.web')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'right' : 'left'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-translate-x-[80px]' : 'lg:translate-x-[80px]'}`}>{t('service.web.desc')}</p>
            </ScrollReveal>
            <div className="w-full relative h-[220px] md:h-[350px] flex items-center justify-center [perspective:1200px]">
              {webProjects.map((project, index) => (
                <div key={index} onClick={() => ! (index === activeWeb) && setActiveWeb(index)} className={`absolute transition-all duration-[800ms] w-[280px] md:w-[450px] aspect-video rounded-3xl overflow-hidden cursor-pointer ${getCarouselClass(index, activeWeb, webProjects.length)}`}>
                  <a href={index === activeWeb ? project.url : '#'} target="_blank" rel="noopener noreferrer" className={`w-full h-full block ${index !== activeWeb ? 'pointer-events-none' : ''}`}>
                    <img src={project.image} className="w-full h-full object-cover" alt="Web Project" />
                  </a>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/services/web-design')} className="mt-8 px-12 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-400 font-bold text-xl hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Content Writing Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:-mt-20 z-50 order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'} className="relative w-48 h-48 md:w-[28rem] md:h-[28rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686499/Asset_5_2x_vcffi4.png" alt="Content" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-start order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-mr-40' : 'lg:-ml-40'}`}>{t('service.content')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'left' : 'right'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-mr-[100px]' : 'lg:-ml-[100px]'}`}>{t('service.content.desc')}</p>
            </ScrollReveal>
            <button onClick={() => navigate('/services/content-writing')} className="px-12 py-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xl font-bold hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="relative py-10 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-2/5 flex justify-center relative lg:mt-[200px] z-50 order-1 lg:order-2">
            <ScrollReveal direction={isAr ? 'left' : 'right'} className="relative w-48 h-48 md:w-[32rem] md:h-[32rem] animate-float">
              <img src="https://res.cloudinary.com/dk3wwuy5d/image/upload/v1768686481/Asset_6_2x_wo2ndl.png" alt="Marketing" className={`w-full h-auto ${!isAr ? 'scale-x-[-1]' : ''}`} />
            </ScrollReveal>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-end text-center lg:text-end order-2 lg:order-1">
            <ScrollReveal direction={isAr ? 'right' : 'left'}>
              <h2 className={`text-3xl md:text-7xl text-white glow-text mb-6 font-black lg:whitespace-nowrap relative ${isAr ? 'lg:-translate-x-[220px]' : 'lg:translate-x-[220px]'}`}>{t('service.marketing')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction={isAr ? 'right' : 'left'}>
              <p className={`text-gray-300 text-base md:text-xl max-w-xl leading-loose mb-12 relative ${isAr ? 'lg:-translate-x-[80px]' : 'lg:translate-x-[80px]'}`}>{t('service.marketing.desc')}</p>
            </ScrollReveal>
            <button onClick={() => navigate('/services/marketing')} className="mt-8 px-12 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-400 font-bold text-xl hover:bg-white/10 transition-all">{t('services.more')}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

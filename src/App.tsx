import { useEffect } from 'react';
import { useReveal } from './hooks/useReveal';
import { useCursor } from './hooks/useCursor';

// Direct Imports
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { VideoPortfolio } from './components/VideoPortfolio';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { LanguagesSection } from './components/LanguagesSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useReveal();
  const { dotRef, ringRef } = useCursor();

  useEffect(() => {
    // Re-trigger reveal animations once everything is mounted
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="noise-overlay">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div className="scanline" />

      <Hero />
      <Marquee />
      <About />
      <Services />
      <VideoPortfolio />
      <Portfolio />
      <Experience />
      <Skills />
      <Education />
      <LanguagesSection />
      <Contact />
      <Footer />
    </div>
  );
}
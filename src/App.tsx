import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useReveal } from './hooks/useReveal';
import { useCursor } from './hooks/useCursor';

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
import { Gallery } from './components/Gallery';

function Home() {
  useReveal();
  const { dotRef, ringRef } = useCursor();

  useEffect(() => {
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
      <Portfolio />
      <VideoPortfolio />
      <Experience />
      <Skills />
      <Education />
      <LanguagesSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<Home />} />

        {/* Gallery Page */}
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}
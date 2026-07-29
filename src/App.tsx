import { lazy, Suspense, useEffect } from 'react';
import { useReveal } from './hooks/useReveal';
import { useCursor } from './hooks/useCursor';

// Lazy Loaded Components
const Hero = lazy(() =>
  import('./components/Hero').then((module) => ({
    default: module.Hero,
  }))
);

const Marquee = lazy(() =>
  import('./components/Marquee').then((module) => ({
    default: module.Marquee,
  }))
);

const About = lazy(() =>
  import('./components/About').then((module) => ({
    default: module.About,
  }))
);

const Services = lazy(() =>
  import('./components/Services').then((module) => ({
    default: module.Services,
  }))
);

const VideoPortfolio = lazy(() =>
  import('./components/VideoPortfolio').then((module) => ({
    default: module.VideoPortfolio,
  }))
);

const Portfolio = lazy(() =>
  import('./components/Portfolio').then((module) => ({
    default: module.Portfolio,
  }))
);

const Experience = lazy(() =>
  import('./components/Experience').then((module) => ({
    default: module.Experience,
  }))
);

const Skills = lazy(() =>
  import('./components/Skills').then((module) => ({
    default: module.Skills,
  }))
);

const Education = lazy(() =>
  import('./components/Education').then((module) => ({
    default: module.Education,
  }))
);

const LanguagesSection = lazy(() =>
  import('./components/LanguagesSection').then((module) => ({
    default: module.LanguagesSection,
  }))
);

const Contact = lazy(() =>
  import('./components/Contact').then((module) => ({
    default: module.Contact,
  }))
);

const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({
    default: module.Footer,
  }))
);

export default function App() {
  useReveal();
  const { dotRef, ringRef } = useCursor();

  useEffect(() => {
    // Re-run reveal observer after components mount
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('DOMContentLoaded'));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="noise-overlay">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div className="scanline" />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#111111]">
            <div className="w-12 h-12 border-4 border-[#4af600] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}
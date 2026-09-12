import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useReveal } from "./hooks/useReveal";
import { useCursor } from "./hooks/useCursor";

import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { VideoPortfolio } from "./components/VideoPortfolio";
import { Portfolio } from "./components/Portfolio";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { LanguagesSection } from "./components/LanguagesSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";

// Admin Gallery Page
import { AdminGallery } from "./pages/AdminGallery";

// Protected Route
import { ProtectedRoute } from "./components/ProtectedRoute";

function Home() {
  useReveal();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
    </>
  );
}

/* Global cursor + global visual effects */
function AppLayout() {
  const { dotRef, ringRef } = useCursor();

  return (
    <div className="noise-overlay">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div className="scanline" />

      <Routes>
        {/* Main Website */}
        <Route path="/" element={<Home />} />

        {/* Gallery Page */}
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin Gallery Page */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

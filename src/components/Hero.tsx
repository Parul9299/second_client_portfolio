import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import kabirImage from '../assets/kabir-image.png';
import kabirImage2 from '../assets/kabir-image-2.png';

const slides = [
  {
    desc: 'I transform ideas into premium visual experiences that build trust, strengthen brands, and inspire action. Every design blends creativity, strategy, and precision to deliver lasting impact.',
    image: kabirImage,
  },
  {
    desc: 'From brand identities to packaging and digital media — I craft visual stories that resonate with audiences and leave a lasting impression across every platform.',
    image: kabirImage2,
  },
];

const navLinks = [
  { label: 'HOME',      href: '#home' },
  { label: 'ABOUT ME',  href: '#about' },
  { label: 'PORTFOLIO', href: '#work' },
  { label: 'SERVICES',  href: '#services' },
  { label: 'SKILLS',    href: '#skills' },
  { label: 'CONTACT',   href: '#contact' },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#111111] flex flex-col"
    >
      {/* ── Background: faint large "Creative Art" ghost text ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-condensed font-black uppercase text-[#1a1a1a] leading-none"
          style={{ fontSize: 'clamp(160px, 28vw, 380px)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}
        >
          Creative Art
        </span>
      </div>

      {/* ── Right: Full-height photo ── */}
      <div
        className="absolute top-0 right-0 h-full pointer-events-none"
        style={{ width: '48%', zIndex: 1 }}
      >
        <div
          className="w-full h-full transition-opacity duration-500"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <img
            src={slide.image}
            alt="Kabir Khan"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'grayscale(20%) contrast(1.05)' }}
          />
          {/* gradient blending left edge into background */}
          <div
            className="absolute inset-y-0 left-0 w-48 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #111111 0%, transparent 100%)' }}
          />
          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #111111 0%, transparent 100%)' }}
          />
          {/* Model label */}
          <div className="absolute bottom-8 left-10">
            <span className="text-white font-bold text-xl">Model</span>
            <span className="text-[#aaa] text-sm ml-2 font-light">Kabir Khan</span>
          </div>
        </div>
      </div>

      {/* ── Nav (fixed, always visible) ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-14 pt-7 pb-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(17,17,17,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #222' : '1px solid transparent',
        }}
      >
        <div className="flex items-center gap-5">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="2" fill="white"/>
              <rect y="7" width="14" height="2" fill="white"/>
              <rect y="14" width="22" height="2" fill="white"/>
            </svg>
          </button>
          <a href="#home" className="font-condensed text-white text-xl font-bold tracking-wide ml-2">Kabir Khan</a>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-condensed text-sm font-semibold tracking-widest transition-colors duration-200"
              style={{ color: activeSection === item.href.replace('#', '') ? '#fff' : '#888' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button className="text-[#888] hover:text-white transition-colors">
          <Search size={20} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#111111] border-b border-[#222] px-8 py-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-condensed text-sm font-semibold tracking-widest text-[#888]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-8 lg:px-14 pb-10">

        {/* Year + tagline row */}
        <div className="flex items-start gap-6 mt-2">
          <span className="font-condensed text-[#666] text-sm tracking-widest font-bold">2026</span>
          <div className="flex items-center gap-3">
            <div className="w-px h-5 bg-[#555]" />
            <span className="font-condensed text-[#888] text-sm tracking-[0.18em] uppercase">
              Think&nbsp;·&nbsp;Design&nbsp;·&nbsp;Display
            </span>
          </div>
        </div>

        {/* Giant typography */}
        <div className="relative mt-auto" style={{ lineHeight: 0.82 }}>
          {/* Circle dot on left */}
          <div
            className="absolute"
            style={{ left: '-10px', top: '28px', width: 28, height: 28, borderRadius: '50%', border: '2.5px solid #fff', zIndex: 10 }}
          />

          {/* Row 1: .Creat ive */}
          <div
            className="font-condensed font-black uppercase leading-none select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <span
                className="font-condensed font-black uppercase"
                style={{
                  fontSize: 'clamp(80px, 14vw, 200px)',
                  color: '#4af600',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.85,
                }}
              >
                .Creat
              </span>
              <span
                className="font-condensed font-black uppercase"
                style={{
                  fontSize: 'clamp(80px, 14vw, 200px)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.85,
                }}
              >
                ive
              </span>
              {/* "Ar" overlapping towards photo */}
              <span
                className="font-condensed font-black uppercase"
                style={{
                  fontSize: 'clamp(60px, 10vw, 150px)',
                  color: '#4af600',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.85,
                  opacity: 0.85,
                  marginLeft: '1vw',
                }}
              >
                Ar
              </span>
            </div>
          </div>

          {/* Short white rule */}
          <div className="mt-5 mb-5 w-10 h-0.5 bg-white" />

          {/* Description */}
          <p
            className="text-[#bbb] leading-relaxed max-w-sm"
            style={{
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              transition: 'opacity 0.5s',
              opacity: animating ? 0 : 1,
            }}
          >
            {slide.desc}
          </p>
        </div>
      </div>

      {/* ── Slide counter (vertical, right-center) ── */}
      <div
        className="absolute hidden lg:flex flex-col items-center gap-3"
        style={{ right: '48%', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
      >
        <span
          className="font-condensed text-[#888] text-sm font-bold"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}
        >
          0{(current + 1) % slides.length + 1 || slides.length}
        </span>
        <div className="w-px h-16 bg-[#444]" />
        <span
          className="font-condensed text-white text-lg font-black"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.05em' }}
        >
          0{current + 1}
        </span>
      </div>

      {/* ── Social icons (far right) ── */}
      <div
        className="absolute hidden lg:flex flex-col items-center gap-5"
        style={{ right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 30 }}
      >
        {[
          { Icon: FaLinkedin, href: '#' },
          { Icon: FaFacebook, href: '#' },
          { Icon: FaInstagram, href: '#' },
        ].map(({ Icon, href }) => (
          <a
            key={href + Icon.name}
            href={href}
            className="text-[#888] hover:text-[#4af600] transition-colors duration-200"
          >
            <Icon size={17} />
          </a>
        ))}
      </div>

      {/* ── Slide dots (bottom left) ── */}
      <div className="absolute bottom-6 left-14 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 300); }}
            className="transition-all duration-400 rounded-full"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? '#4af600' : '#444',
              borderRadius: 4,
            }}
          />
        ))}
      </div>
    </section>
  );
}

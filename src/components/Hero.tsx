import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import kabirImage from '../assets/kabir-image.png'

const navLinks = [
  { label: 'HOME',      href: '#home' },
  { label: 'ABOUT ME',  href: '#about' },
  { label: 'PORTFOLIO', href: '#work' },
  { label: 'SERVICES',  href: '#services' },
  { label: 'SKILLS',    href: '#skills' },
  { label: 'CONTACT',   href: '#contact' },
];

export function Hero() {
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

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col bg-[#111111] overflow-hidden"
    >
      <h1 className="sr-only">
        Kabir Khan — Creative Art Director &amp; Graphic Designer specializing in Brand Identity, Logo Design, Print &amp; Packaging, Social Media Graphics, and Web &amp; UI Design
      </h1>

      {/* Background ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span
          className="font-condensed font-black uppercase text-[#1a1a1a] leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(90px, 30vw, 380px)',
            letterSpacing: '-0.03em',
            animation: 'fadeIn 1.2s ease both',
          }}
        >
          Creative Art
        </span>
      </div>

      {/* Right photo — scales from 240px to desktop */}
      <div
        className="absolute top-0 right-0 h-full pointer-events-none"
        style={{ width: 'clamp(34%, 48%, 50%)', zIndex: 1 }}
      >
        <div
          className="w-full h-full"
          style={{ animation: 'fadeRight 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}
        >
          <img
            src={kabirImage}
            alt="Kabir Khan"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'grayscale(20%) contrast(1.05)' }}
          />
          <div
            className="absolute inset-y-0 left-0 w-24 sm:w-48 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #111111 0%, transparent 100%)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 sm:h-48 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #111111 0%, transparent 100%)' }}
          />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10">
            <span className="text-white font-bold text-base sm:text-xl">Model</span>
            <span className="text-[#aaa] text-xs sm:text-sm ml-2 font-light">Kabir Khan</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 xs:px-5 sm:px-8 lg:px-14 pt-5 sm:pt-7 pb-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(17,17,17,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #222' : '1px solid transparent',
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <button className="text-white flex-shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="20" height="15" viewBox="0 0 22 16" fill="none" className="sm:w-[22px] sm:h-4">
              <rect width="22" height="2" fill="white" />
              <rect y="7" width="14" height="2" fill="white" />
              <rect y="14" width="22" height="2" fill="white" />
            </svg>
          </button>
          <a href="#home" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
            <img src="/logo.svg" alt="Kabir Khan logo" className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-condensed text-white text-base sm:text-xl font-bold tracking-wide truncate">Kabir Khan</span>
          </a>
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

        <button className="text-[#888] hover:text-white transition-colors flex-shrink-0" aria-label="Search">
          <Search size={18} className="sm:hidden" />
          <Search size={20} className="hidden sm:block" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[60px] sm:top-16 left-0 right-0 z-40 bg-[#111111] border-b border-[#222] px-5 py-6 flex flex-col gap-4 md:hidden">
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

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-4 xs:px-5 sm:px-8 lg:px-14 pb-8 sm:pb-10 pt-20 sm:pt-24 max-w-[88%] xs:max-w-[85%] sm:max-w-[60%] lg:max-w-[62%]">
        {/* Year + tagline */}
        <div
          className="flex items-center gap-3 sm:gap-6 mt-1"
          style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
        >
          <span className="font-condensed text-[#666] text-xs sm:text-sm tracking-widest font-bold flex-shrink-0">2026</span>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-px h-4 sm:h-5 bg-[#555] flex-shrink-0" />
            <span className="font-condensed text-[#888] text-[10px] xs:text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase truncate">
              Think · Design · Display
            </span>
          </div>
        </div>

        {/* Giant typography */}
        <div className="relative mt-auto" style={{ lineHeight: 0.82 }}>
          <div
            className="absolute"
            style={{
              left: '-6px', top: 'clamp(14px,3vw,28px)',
              width: 'clamp(14px,3vw,28px)', height: 'clamp(14px,3vw,28px)',
              borderRadius: '50%', border: '2px solid #fff', zIndex: 10,
              animation: 'scaleUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s both',
            }}
          />

          <div className="font-condensed font-black uppercase leading-none select-none overflow-hidden">
            <div
              className="flex items-end flex-wrap"
              style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}
            >
              <span
                className="font-condensed font-black uppercase text-[#4af600]"
                style={{ fontSize: 'clamp(54px, 16vw, 200px)', letterSpacing: '-0.02em', lineHeight: 0.85 }}
              >
                .Creat
              </span>
              <span
                className="font-condensed font-black uppercase text-white"
                style={{ fontSize: 'clamp(54px, 16vw, 200px)', letterSpacing: '-0.02em', lineHeight: 0.85 }}
              >
                ive
              </span>
              <span
                className="font-condensed font-black uppercase text-[#4af600] hidden xs:inline"
                style={{ fontSize: 'clamp(40px, 11vw, 150px)', letterSpacing: '-0.02em', lineHeight: 0.85, opacity: 0.85, marginLeft: '1vw' }}
              >
                Ar
              </span>
            </div>
          </div>

          <div
            className="mt-4 sm:mt-5 mb-4 sm:mb-5 w-8 sm:w-10 h-0.5 bg-white"
            style={{ animation: 'lineExpand 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both' }}
          />

          <p
            className="text-[#bbb] leading-relaxed max-w-[90%] xs:max-w-xs sm:max-w-sm"
            style={{
              fontSize: 'clamp(11px, 3vw, 15px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both',
            }}
          >
            I transform ideas into premium visual experiences that build trust, strengthen brands, and inspire action. Every design blends creativity, strategy, and precision to deliver lasting impact.
          </p>
        </div>
      </div>

      {/* Social icons — vertical, hidden on small screens */}
      <div
        className="absolute hidden lg:flex flex-col items-center gap-5"
        style={{ right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 30, animation: 'fadeLeft 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}
      >
        {[
          { Icon: FaTwitter, href: '#' },
          { Icon: FaFacebook, href: '#' },
          { Icon: FaInstagram, href: '#' },
        ].map(({ Icon, href }) => (
          <a key={href + Icon.name} href={href} className="text-[#888] hover:text-[#4af600] transition-colors duration-200">
            <Icon size={17} />
          </a>
        ))}
      </div>
    </section>
  );
}

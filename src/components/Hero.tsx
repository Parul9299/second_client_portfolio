import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import kabirImage from '../assets/kabir-transparent-image.png'

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
        if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(sec.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden" style={{ background: '#111111' }}>
      <h1 className="sr-only">Kabir Khan — Creative Art Director &amp; Graphic Designer</h1>

      {/* ════ GHOST SILHOUETTE behind left text ════ */}
      {/* Large "face/bust" silhouette: dark shape that bleeds behind the typography */}
      <div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          left: 'clamp(40px, 6vw, 120px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(280px, 42vw, 600px)',
          height: 'clamp(380px, 72vh, 800px)',
          zIndex: 1,
        }}
      >
        {/* Ghost image — same photo, very dark + desaturated */}
        <img
          src={kabirImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
          style={{
            filter: 'brightness(0.09) contrast(1.4) grayscale(1)',
            borderRadius: '0',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%)',
          }}
        />
      </div>

      {/* ════ PHOTO — right half, full height ════ */}
      <div
        className="absolute top-0 right-0 h-full hidden md:block"
        style={{ width: '50%', zIndex: 2 }}
      >
        <div
          className="relative w-full h-full"
          style={{ animation: 'fadeRight 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}
        >
          <img
            src={kabirImage}
            alt="Kabir Khan"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'contrast(1.06) brightness(0.9)' }}
          />
          {/* left blend */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: '55%',
              background: 'linear-gradient(to right, #111111 0%, rgba(17,17,17,0.6) 60%, transparent 100%)',
              zIndex: 3,
            }}
          />
          {/* bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '28%', background: 'linear-gradient(to top, #111111 0%, transparent 100%)', zIndex: 3 }}
          />
          {/* top fade */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: '18%', background: 'linear-gradient(to bottom, #111111 0%, transparent 100%)', zIndex: 3 }}
          />
          {/* Model credit */}
          <div className="absolute bottom-6 right-7 text-right" style={{ zIndex: 5 }}>
            <span className="text-white font-bold text-sm">Model</span>
            <span className="text-[#999] text-xs ml-2 font-light">Kabir Khan</span>
          </div>
        </div>
      </div>

      {/* ════ NAV ════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-14 pt-5 sm:pt-6 pb-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(17,17,17,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            className="text-white flex-shrink-0 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="2" fill="white" />
              <rect y="7" width="14" height="2" fill="white" />
              <rect y="14" width="22" height="2" fill="white" />
            </svg>
          </button>
          <a href="#home" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="Kabir Khan logo" className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-condensed text-white text-base sm:text-xl font-bold tracking-wide">Kabir Khan</span>
          </a>
        </div>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-condensed text-xs font-semibold tracking-[0.18em] transition-colors duration-200 hover:text-white"
              style={{ color: activeSection === item.href.replace('#', '') ? '#ffffff' : '#777' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: search */}
        <button className="text-[#777] hover:text-white transition-colors flex-shrink-0" aria-label="Search">
          <Search size={20} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed left-0 right-0 z-40 bg-[#111111] border-b border-[#222] px-5 py-6 flex flex-col gap-4 md:hidden" style={{ top: 61 }}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-condensed text-xs font-semibold tracking-widest text-[#888] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ════ DESKTOP content — left panel ════ */}
      <div
        className="hidden md:flex absolute inset-y-0 left-0 flex-col"
        style={{
          width: '58%',
          zIndex: 10,
          paddingLeft: 'clamp(32px,6vw,96px)',
          paddingRight: '2vw',
          paddingTop: 'clamp(72px,8vh,96px)',
          paddingBottom: 'clamp(28px,4vh,48px)',
        }}
      >
        {/* ── Top row: year + divider + tagline ── */}
        <div
          className="flex items-center gap-3"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both', marginBottom: 'clamp(16px,3vh,28px)' }}
        >
          <span className="font-condensed text-[#666] text-xs font-bold tracking-widest">2026</span>
          <div style={{ width: 1, height: 28, background: '#444' }} />
          <span className="font-condensed text-[#888] text-xs tracking-[0.2em] uppercase">Think · Design · Display</span>
        </div>

        {/* ── Giant text block ── */}
        <div className="relative flex-1 flex flex-col justify-center">
          {/* white circle dot */}
          <div
            style={{
              width: 'clamp(14px,1.8vw,22px)',
              height: 'clamp(14px,1.8vw,22px)',
              borderRadius: '50%',
              border: '2.5px solid #ffffff',
              marginBottom: 'clamp(6px,0.8vh,10px)',
              animation: 'scaleUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.6s both',
            }}
          />

          {/* LINE 1: .Creat (green) + ... the "t" bleeds big */}
          <div style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both' }}>
            <div
              className="flex items-end leading-none"
              style={{ marginBottom: '-0.04em' }}
            >
              <span
                className="font-condensed font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(60px, 12.5vw, 176px)',
                  letterSpacing: '-0.025em',
                  color: '#4af600',
                  display: 'block',
                }}
              >
                .Creat
              </span>
            </div>

            {/* LINE 2: ive (white) + Ar (green, smaller, bottom-aligned) */}
            <div className="flex items-end leading-none">
              <span
                className="font-condensed font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(60px, 12.5vw, 176px)',
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                }}
              >
                ive
              </span>
              {/* "Ar" smaller, sits at baseline of "ive" */}
              <span
                className="font-condensed font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(36px, 7.5vw, 108px)',
                  letterSpacing: '-0.02em',
                  color: '#4af600',
                  marginLeft: 'clamp(6px,1.2vw,18px)',
                  paddingBottom: 'clamp(2px,0.4vw,6px)',
                  opacity: 0.9,
                }}
              >
                Ar
              </span>
            </div>
          </div>

          {/* short white divider */}
          <div
            style={{
              width: 40,
              height: 2,
              background: '#fff',
              margin: 'clamp(14px,2.2vh,22px) 0 clamp(10px,1.8vh,18px)',
              animation: 'lineExpand 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both',
            }}
          />

          {/* Bio paragraph */}
          <p
            className="text-[#aaa] leading-relaxed"
            style={{
              fontSize: 'clamp(11px, 1.05vw, 14px)',
              maxWidth: 'clamp(240px, 34vw, 420px)',
              animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both',
            }}
          >
            I transform ideas into premium visual experiences that build trust,
            strengthen brands, and inspire action. Every design blends creativity,
            strategy, and precision to deliver lasting impact.
          </p>
        </div>

        {/* ── Bottom row: slide counter ── */}
        <div
          className="flex items-center gap-2"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}
        >
          {/* Numbers read bottom-to-top like reference */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-condensed font-black leading-none"
              style={{
                fontSize: 'clamp(18px,2.2vw,30px)',
                color: '#555',
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                letterSpacing: '0.05em',
              }}
            >
              02
            </span>
            <div style={{ width: 1, height: 'clamp(28px,4vh,44px)', background: '#444' }} />
            <span
              className="font-condensed font-black leading-none"
              style={{
                fontSize: 'clamp(20px,2.6vw,36px)',
                color: '#4af600',
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                letterSpacing: '0.05em',
              }}
            >
              01
            </span>
          </div>
        </div>
      </div>

      {/* ════ SOCIAL icons — pinned right edge (desktop) ════ */}
      <div
        className="absolute hidden lg:flex flex-col items-center gap-5"
        style={{
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 30,
          animation: 'fadeIn 0.8s ease 1s both',
        }}
      >
        {[FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
          <a key={i} href="#" className="text-[#888] hover:text-[#4af600] transition-colors duration-200">
            <Icon size={15} />
          </a>
        ))}
      </div>

      {/* ════ MOBILE layout ════ */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Photo — top portion */}
        <div
          className="relative w-full flex-shrink-0"
          style={{ height: '58vw', minHeight: '240px', maxHeight: '380px', marginTop: 0 }}
        >
          {/* Ghost backdrop behind the mobile photo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
            <span
              className="font-condensed font-black uppercase absolute"
              style={{
                fontSize: 'clamp(80px,30vw,180px)',
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(74,246,0,0.13)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                whiteSpace: 'nowrap',
              }}
            >
              Creative
            </span>
          </div>

          <img
            src={kabirImage}
            alt="Kabir Khan"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: 'contrast(1.06) brightness(0.88)', zIndex: 2 }}
          />
          {/* fades */}
          <div className="absolute inset-x-0 top-0 h-20" style={{ background: 'linear-gradient(to bottom,#111111,transparent)', zIndex: 3 }} />
          <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top,#111111,transparent)', zIndex: 3 }} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-5 pt-3 pb-12 relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-condensed text-[#666] text-[10px] font-bold tracking-widest">2026</span>
            <div style={{ width: 1, height: 20, background: '#444' }} />
            <span className="font-condensed text-[#777] text-[9px] tracking-[0.18em] uppercase">Think · Design · Display</span>
          </div>

          <div style={{ width: 13, height: 13, borderRadius: '50%', border: '2px solid #fff', marginBottom: 6 }} />

          <div>
            <div className="leading-none">
              <span
                className="font-condensed font-black uppercase leading-none block"
                style={{ fontSize: 'clamp(54px,16vw,88px)', letterSpacing: '-0.025em', color: '#4af600' }}
              >
                .Creat
              </span>
            </div>
            <div className="flex items-end leading-none">
              <span
                className="font-condensed font-black uppercase leading-none"
                style={{ fontSize: 'clamp(54px,16vw,88px)', letterSpacing: '-0.025em', color: '#ffffff' }}
              >
                ive
              </span>
              <span
                className="font-condensed font-black uppercase leading-none"
                style={{ fontSize: 'clamp(34px,10vw,56px)', letterSpacing: '-0.02em', color: '#4af600', marginLeft: '2vw', paddingBottom: 3, opacity: 0.9 }}
              >
                Ar
              </span>
            </div>
          </div>

          <div style={{ width: 32, height: 2, background: '#fff', margin: '14px 0 12px' }} />

          <p className="text-[#aaa] text-[13px] leading-relaxed" style={{ maxWidth: 300 }}>
            I transform ideas into premium visual experiences that build trust,
            strengthen brands, and inspire action.
          </p>

          <div className="flex items-center gap-5 mt-7">
            {[FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="text-[#666] hover:text-[#4af600] transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

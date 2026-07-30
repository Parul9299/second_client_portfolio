import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import kabirImage from '../assets/kabir-transparent-image.png';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'PORTFOLIO', href: '#work' },
  { label: 'SERVICES', href: '#services' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
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
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#111111]">
      <h1 className="sr-only">Kabir Khan — Creative Art Director &amp; Graphic Designer</h1>

      {/* ════ PHOTO (Desktop Layout - Right Side) ════ */}
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
          {/* Gradients */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: '55%',
              background: 'linear-gradient(to right, #111111 0%, rgba(17,17,17,0.6) 60%, transparent 100%)',
              zIndex: 3,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '28%', background: 'linear-gradient(to top, #111111 0%, transparent 100%)', zIndex: 3 }}
          />
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: '18%', background: 'linear-gradient(to bottom, #111111 0%, transparent 100%)', zIndex: 3 }}
          />
          <div className="absolute bottom-6 right-7 text-right" style={{ zIndex: 5 }}>
            <span className="text-white font-bold text-sm">Model</span>
            <span className="text-[#999] text-xs ml-2 font-light">Kabir Khan</span>
          </div>
        </div>
      </div>

      {/* ════ PHOTO (Mobile Layered Background - Behind Text) ════ */}
      <div className="absolute inset-0 md:hidden z-[1] overflow-hidden pointer-events-none">
        <img
          src={kabirImage}
          alt="Kabir Khan"
          className="w-full h-full object-cover object-top opacity-55"
          style={{ filter: 'contrast(1.1) brightness(0.75)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/0 to-[#111111]/40" />
      </div>

      {/* ════ NAVIGATION ════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-14 pt-5 sm:pt-6 pb-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(17,17,17,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
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

        {/* Desktop Links */}
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

        <button className="text-[#777] hover:text-white transition-colors flex-shrink-0" aria-label="Search">
          <Search size={20} />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="fixed left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b border-[#222] px-5 py-6 flex flex-col gap-4 md:hidden" style={{ top: 52 }}>
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

      {/* ════ DESKTOP CONTENT ════ */}
      <div
        className="hidden md:flex absolute inset-y-0 left-0 flex-col justify-between"
        style={{
          width: '58%',
          zIndex: 10,
          paddingLeft: 'clamp(32px, 6vw, 96px)',
          paddingRight: '2vw',
          paddingTop: 'clamp(80px, 10vh, 120px)',
          paddingBottom: 'clamp(28px, 4vh, 48px)',
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
        >
          <span className="font-condensed text-[#666] text-xs font-bold tracking-widest">2026</span>
          <div style={{ width: 1, height: 28, background: '#444' }} />
          <span className="font-condensed text-[#888] text-xs tracking-[0.2em] uppercase">Think · Design · Display</span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center my-auto">
          <div
            style={{
              width: 'clamp(14px, 1.5vw, 22px)',
              height: 'clamp(14px, 1.5vw, 22px)',
              borderRadius: '50%',
              border: '2.5px solid #ffffff',
              marginBottom: 'clamp(8px, 1.2vh, 16px)',
              animation: 'scaleUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.6s both',
            }}
          />

          {/* ── RESPONSIVE TYPOGRAPHY CONTAINER ── */}
          <div
            className="flex flex-col select-none"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both' }}
          >
            {/* Top Word: Creat */}
            <div className="flex items-end leading-[0.8]">
              <span
                className="font-condensed font-black block max-[902px]:pl-[38px] max-[992px]:pl-[49px] max-[1024px]:pl-[60px]
                 text-[199px] max-[1245px]:text-[165px] max-[1024px]:text-[140px] max-[992px]:text-[120px] max-[902px]:text-[91px]
                 pl-[clamp(75px,4vw,62px)] max-[670px]:pl-[clamp(20px,4.5vw,36px)]
                 mb-[-35px] max-[902px]:mb-[-9px] max-[992px]:mb-[-20px] max-[1024px]:mb-[-23px]"
                style={{
                  letterSpacing: '-0.025em',
                  color: '#4af600',
                }}
              >
                Creat
              </span>
            </div>

            {/* Bottom Row: ive + Ar */}
            <div className="flex items-baseline leading-[0.8] mt-[-20px] min-[670px]:mt-[-5px] min-[768px]:mt-[-14px]">
              <span
                className="font-condensed font-black 
                 text-[330px] max-[1245px]:text-[285px] max-[1024px]:text-[236px] max-[992px]:text-[203px] max-[902px]:text-[150px]"
                style={{
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                }}
              >
                ive
              </span>
              <span
                className="font-condensed font-black inline-block origin-bottom-left whitespace-nowrap
                 text-[185px] max-[1245px]:text-[146px] max-[1024px]:text-[128px] max-[992px]:text-[105px] max-[902px]:text-[83px]"
                style={{
                  letterSpacing: '-0.02em',
                  color: '#4af600',
                  opacity: 0.9,
                  transform: 'rotate(-90deg) translateY(100%)',
                  marginLeft: 'clamp(8px, -0.5vw, 18px)',
                }}
              >
                Ar
              </span>
            </div>
          </div>

          <div
            style={{
              width: 40,
              height: 2,
              background: '#fff',
              margin: 'clamp(14px,2.2vh,22px) 0 clamp(10px,1.8vh,18px)',
              animation: 'lineExpand 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both',
            }}
          />

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

        <div
          className="flex items-center gap-2"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}
        >
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

      {/* ════ SOCIAL ICONS (Desktop Right Pinned) ════ */}
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

      {/* ════ MOBILE & TABLET CONTENT OVERLAY ════ */}
      <div className="md:hidden relative z-10 flex flex-col justify-end min-h-screen px-6 pt-28 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-condensed text-[#888] text-[11px] font-bold tracking-widest">2026</span>
          <div style={{ width: 1, height: 18, background: '#555' }} />
          <span className="font-condensed text-[#aaa] text-[10px] tracking-[0.18em] uppercase">Think · Design · Display</span>
        </div>

        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #fff', marginBottom: 8 }} />

        {/* ── MOBILE RESPONSIVE TYPOGRAPHY CONTAINER ── */}
        <div
          className="flex flex-col select-none"
          style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both' }}
        >
          {/* Top Word: Creat */}
          <div className="flex items-end leading-[0.8]">
            <span
              className="font-condensed font-black block drop-shadow-lg
                 text-[62px] max-[425px]:text-[48px] max-[375px]:text-[41px]
                 pl-[23px] max-[425px]:pl-[25px] max-[375px]:pl-[18px]
                 mb-[-18px] max-[425px]:mb-[-14px] max-[375px]:mb-[-10px]"
              style={{
                letterSpacing: '-0.025em',
                color: '#4af600',
              }}
            >
              Creat
            </span>
          </div>

          {/* Bottom Row: ive + Ar */}
          <div className="flex items-baseline leading-[0.8] mt-[-0.05em]">
            <span
              className="font-condensed font-black drop-shadow-lg
                 text-[100px] max-[425px]:text-[82px] max-[375px]:text-[68px]"
              style={{
                letterSpacing: '-0.025em',
                color: '#ffffff',
              }}
            >
              ive
            </span>
            <span
              className="font-condensed font-black drop-shadow-lg inline-block origin-bottom-left whitespace-nowrap
                 text-[52px] max-[425px]:text-[42px] max-[375px]:text-[34px]"
              style={{
                letterSpacing: '-0.02em',
                color: '#4af600',
                opacity: 0.9,
                transform: 'rotate(-90deg) translateY(100%)',
                marginLeft: '8px',
              }}
            >
              Ar
            </span>
          </div>
        </div>

        <div style={{ width: 36, height: 2, background: '#fff', margin: '16px 0 14px' }} />

        <p className="text-[#ddd] text-[13px] leading-relaxed drop-shadow" style={{ maxWidth: 320 }}>
          I transform ideas into premium visual experiences that build trust,
          strengthen brands, and inspire action.
        </p>

        <div className="flex items-center gap-5 mt-6">
          {[FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
            <a key={i} href="#" className="text-[#aaa] hover:text-[#4af600] transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
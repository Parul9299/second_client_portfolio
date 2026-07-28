import { FaInstagram, FaTelegram, FaFacebook, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* Left - Links */}
          <div>
            <h4 className="font-condensed text-sm font-bold text-[#666] uppercase tracking-widest mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'About me', href: '#about' },
                { label: 'Portfolio', href: '#work' },
                { label: 'Skills', href: '#skills' },
                { label: 'Blog', href: '#' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white font-condensed text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Center - Contact Info */}
          <div>
            <h4 className="font-condensed text-sm font-bold text-[#666] uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white font-condensed text-lg font-bold mb-1">Available for Work / IND</p>
                <a href="mailto:kabirkhana6@gmail.com" className="text-[#4af600] font-condensed text-base hover:underline">
                  kabirkhana6@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[#888] text-xs font-condensed tracking-widest uppercase mb-2">Address</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Mathura - Vrindavan, Uttar<br />
                  Pradesh - 281006, India
                </p>
              </div>
            </div>
          </div>

          {/* Right - Social Icons */}
          <div>
            <h4 className="font-condensed text-sm font-bold text-[#666] uppercase tracking-widest mb-6">Follow</h4>
            <div className="flex gap-6">
              {[
                { Icon: FaInstagram, href: '#', label: 'Instagram' },
                { Icon: FaTelegram, href: '#', label: 'Telegram' },
                { Icon: FaFacebook, href: '#', label: 'Facebook' },
                { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-full border border-[#4af600]/30 flex items-center justify-center text-[#4af600] hover:bg-[#4af600] hover:text-black transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#4af600]/20 to-transparent mb-8 sm:mb-12" />

        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Name */}
          <div className="reveal">
            <p className="text-center lg:text-left">
              <span className="font-condensed text-4xl sm:text-5xl font-black text-white">
                Kabir Khan
              </span>
            </p>
            <p className="text-center lg:text-left text-[#666] text-xs font-condensed uppercase tracking-widest mt-2">
              Sr. Graphic Designer | Creative Director
            </p>
          </div>

          {/* Social and description */}
          <div className="text-center lg:text-center">
            <p className="text-[#999] text-sm font-condensed mb-4 w-100 lg:max-w-sm">
              Transforming ideas into premium visual experiences that build trust, strengthen brands, and inspire action.
            </p>
            <p className="text-[#666] text-xs font-condensed uppercase tracking-widest">
              © 2026 Kabir Khan. All rights reserved.
            </p>
          </div>
        </div>

        {/* Social handle at bottom */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-[#4af600] font-condensed text-sm font-bold tracking-widest">@graphixkabira</p>
        </div>
      </div>
    </footer>
  );
}

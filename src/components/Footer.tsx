export function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-[#222] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-condensed text-2xl font-black text-white">KABIR<span className="text-accent">.</span></span>
            <span className="text-[#444] text-sm">|</span>
            <span className="text-[#666] text-sm font-condensed uppercase tracking-widest">Sr. Graphic Designer</span>
          </div>

          <div className="flex items-center gap-6">
            {['Home', 'About', 'Work', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-link"
              >
                {link}
              </a>
            ))}
          </div>

          <p className="text-[#666] text-xs font-condensed uppercase tracking-widest">
            &copy; 2024 Kabir Khan. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

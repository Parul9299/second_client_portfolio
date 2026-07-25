export function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-[#222] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-condensed text-xl sm:text-2xl font-black text-white">KABIR<span className="text-accent">.</span></span>
            <span className="text-[#444] text-xs sm:text-sm hidden xs:inline">|</span>
            <span className="text-[#666] text-xs sm:text-sm font-condensed uppercase tracking-widest hidden xs:inline">Sr. Graphic Designer</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {['Home', 'About', 'Work', 'Contact'].map((link) => {
              const href = link === 'Home' ? '#home' : link === 'About' ? '#about' : link === 'Work' ? '#work' : '#contact';
              return (
                <a key={link} href={href} className="nav-link">
                  {link}
                </a>
              );
            })}
          </div>

          <p className="text-[#666] text-xs font-condensed uppercase tracking-widest">
            &copy; 2024 Kabir Khan. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

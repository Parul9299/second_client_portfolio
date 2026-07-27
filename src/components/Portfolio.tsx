import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioItems } from '../data';

export function Portfolio() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Pure scroll section boundary mapping
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - windowHeight;
      const p = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const total = portfolioItems.length;
  // Scroll height calculated per item to give enough track length
  const scrollHeight = Math.max(total * 120, 300);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] text-white"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden">
        
        {/* Exact Aspect-Ratio Card Stack Frame */}
        <div className="relative w-full max-w-6xl h-[75vh] max-h-[700px] min-h-[420px] flex items-center justify-center">
          {portfolioItems.map((item, idx) => {
            // Step index progression: 0 to (total - 1)
            const cardStep = progress * (total - 1);
            
            // Distance of current card from scroll focal point
            const diff = idx - cardStep;

            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (diff > 0) {
              // Card is coming from bottom: Starts completely off-screen (+100%) and covers fully
              translateY = Math.min(diff * 100, 100);
              scale = 1;
              opacity = 1;
            } else {
              // Card is active or behind: Stays anchored at top/center, subtly shrinks back
              translateY = 0;
              scale = 1 + diff * 0.04; // Gentle depth scale-down
              opacity = 1 + diff * 0.2; // Subtle fade for older cards
            }

            return (
              <div
                key={item.title || idx}
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl origin-bottom"
                style={{
                  transform: `translate3d(0, ${translateY}%, 0) scale(${Math.max(scale, 0.88)})`,
                  opacity: Math.max(opacity, 0),
                  zIndex: idx + 1, // Higher index renders directly over previous card
                  willChange: 'transform, opacity',
                }}
              >
                {/* Image background */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Vignette Overlay for Title Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10">
                  {/* Header Badge & Action Button */}
                  <div className="flex justify-between items-start">
                    <span className="px-4 py-1.5 rounded-full bg-[#a3e635] text-black font-bold text-xs sm:text-sm uppercase tracking-wider">
                      {item.category}
                    </span>

                    <button className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#a3e635] text-black flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Centered Title & Description */}
                  <div className="text-center max-w-3xl mx-auto my-auto pt-6">
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-md">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl mx-auto">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
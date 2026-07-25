import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { portfolioItems } from '../data';

export function Portfolio() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, portfolioItems.length - itemsPerView);

  const next = () => setIndex((p) => Math.min(p + 1, maxIndex));
  const prev = () => setIndex((p) => Math.max(p - 1, 0));

  return (
    <section id="work" className="py-16 xs:py-20 sm:py-24 lg:py-32 bg-[#141414] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#4af600]/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 xs:mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="green-line" />
              <span className="section-label">Portfolio</span>
            </div>
            <h2 className="section-heading text-white text-4xl xs:text-5xl lg:text-6xl">
              Featured<br />Work<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed hidden lg:block">
              A selection of design projects spanning branding, print, packaging, and digital media.
            </p>
            <div className="flex gap-3">
              <button onClick={prev} disabled={index === 0} className="carousel-arrow w-10 h-10 xs:w-12 xs:h-12 sm:w-[52px] sm:h-[52px] disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft size={18} />
              </button>
              <button onClick={next} disabled={index >= maxIndex} className="carousel-arrow w-10 h-10 xs:w-12 xs:h-12 sm:w-[52px] sm:h-[52px] disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="reveal overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-3 xs:gap-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(calc(-${index} * (33.333% + 13px)))` }}
          >
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="portfolio-card flex-shrink-0 w-full xs:w-[calc(50%-6px)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] aspect-[4/5] border border-[#222] group"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="overlay" />
                <div className="info">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#4af600] text-xs font-condensed uppercase tracking-widest">{item.category}</span>
                    <span className="text-[#666] text-xs">/ {item.year}</span>
                  </div>
                  <h3 className="font-condensed text-xl xs:text-2xl font-bold text-white uppercase tracking-wide mb-2 xs:mb-3">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[#4af600] text-xs font-condensed uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus size={14} /> View Project
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-0 h-px bg-[#4af600] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#222] relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#4af600] transition-all duration-700"
              style={{ width: `${((index + 1) / (maxIndex + 1)) * 100}%` }}
            />
          </div>
          <span className="font-condensed text-sm text-[#666]">
            <span className="text-[#4af600] font-bold">0{index + 1}</span> / 0{maxIndex + 1}
          </span>
        </div>
      </div>
    </section>
  );
}

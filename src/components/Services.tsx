import { Palette, Layout, Package, Share2, Layers, Film, type LucideIcon } from 'lucide-react';
import { services } from '../data';

const icons: Record<string, LucideIcon> = {
  Palette, Layout, Package, Share2, Layers, Film,
};

export function Services() {
  return (
    <section id="services" className="py-16 xs:py-20 sm:py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#4af600]/3 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 xs:mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="green-line" />
              <span className="section-label">What I Do</span>
            </div>
            <h2 className="section-heading text-white text-4xl xs:text-5xl lg:text-6xl">
              Services<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-base leading-relaxed">
            Comprehensive design services tailored to elevate your brand across every touchpoint — from concept to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <div
                key={service.title}
                className="card p-5 xs:p-6 sm:p-8 reveal group"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="service-icon">
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="font-condensed text-xl xs:text-2xl font-bold text-white uppercase tracking-wide mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#4af600] text-xs font-condensed uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-px bg-[#4af600]" />
                  Learn More
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

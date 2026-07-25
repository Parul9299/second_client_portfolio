import { BookOpen, Award, MapPin } from 'lucide-react';
import { education } from '../data';

export function Education() {
  return (
    <section className="py-16 xs:py-20 sm:py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#4af600]/3 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="reveal text-center mb-10 xs:mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="green-line" />
            <span className="section-label">Background</span>
            <span className="green-line" />
          </div>
          <h2 className="section-heading text-white text-4xl xs:text-5xl lg:text-6xl">
            Education & <span className="text-accent">Training</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-5">
          {education.map((edu, i) => (
            <div
              key={i}
              className="card p-5 xs:p-6 sm:p-7 reveal relative overflow-hidden group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#4af600] group-hover:w-full transition-all duration-500" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border border-[#4af600]/20 flex items-center justify-center text-[#4af600] group-hover:bg-[#4af600] group-hover:text-black transition-all">
                  <BookOpen size={18} />
                </div>
                <span className="font-condensed text-sm text-[#4af600] font-bold">{edu.year}</span>
              </div>
              <h3 className="font-condensed text-xl font-bold text-white uppercase tracking-wide mb-1">{edu.degree}</h3>
              <p className="text-[#4af600] text-sm font-medium mb-4">{edu.field}</p>
              <div className="border-t border-[#222] pt-4">
                <p className="text-gray-400 text-sm">{edu.institution}</p>
                <p className="text-[#666] text-xs flex items-center gap-1 mt-1">
                  <MapPin size={11} /> {edu.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Award */}
        <div className="reveal mt-8">
          <div className="card p-5 xs:p-6 sm:p-8 border-[#4af600]/25 bg-gradient-to-r from-[#4af600]/8 to-transparent relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#4af600]/10 blur-3xl" />
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 xs:gap-6 relative z-10">
              <div className="w-14 h-14 xs:w-16 xs:h-16 border-2 border-[#4af600]/30 flex items-center justify-center text-[#4af600] flex-shrink-0 animate-[pulseGreen_2.5s_ease-in-out_infinite]">
                <Award size={26} className="xs:hidden" />
                <Award size={30} className="hidden xs:block" />
              </div>
              <div>
                <p className="section-label mb-2">Award & Recognition</p>
                <h3 className="font-condensed text-xl xs:text-2xl font-bold text-white uppercase tracking-wide">Employee of the Year — 2024</h3>
                <p className="text-gray-400 text-sm mt-1">Recognized for exceptional design output and leadership at Acculizein Tech Pvt. Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

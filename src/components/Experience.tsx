import { Briefcase, MapPin } from 'lucide-react';
import { experiences } from '../data';

export function Experience() {
  return (
    <section className="py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#4af600]/3 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="green-line" />
            <span className="section-label">Career</span>
            <span className="green-line" />
          </div>
          <h2 className="section-heading text-white text-5xl lg:text-6xl">
            Work <span className="text-accent">Experience</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="reveal exp-line pl-10 pb-12 last:pb-0"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#4af600] border-4 border-[#0d0d0d]">
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-[#4af600] animate-ping opacity-50" />
                )}
              </div>

              {/* Period */}
              <div className="mb-3">
                <span className={`inline-flex items-center gap-2 font-condensed text-xs uppercase tracking-widest px-3 py-1.5 border ${
                  exp.current
                    ? 'bg-[#4af600]/10 text-[#4af600] border-[#4af600]/30'
                    : 'text-gray-500 border-[#333]'
                }`}>
                  {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-[#4af600] animate-pulse" />}
                  {exp.period}
                </span>
              </div>

              {/* Card */}
              <div className="card p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-condensed text-2xl font-bold text-white uppercase tracking-wide">{exp.role}</h3>
                    <p className="text-[#4af600] font-medium text-sm mt-1">{exp.company}</p>
                    <p className="text-[#666] text-xs mt-1 flex items-center gap-1">
                      <MapPin size={11} /> {exp.location}
                    </p>
                  </div>
                  <div className="w-12 h-12 border border-[#4af600]/20 flex items-center justify-center text-[#4af600] flex-shrink-0">
                    <Briefcase size={22} />
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4af600] flex-shrink-0 mt-1.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

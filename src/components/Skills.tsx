import { useRef, useState, useEffect } from 'react';
import { Code2, Star } from 'lucide-react';
import { skills, skillTags } from '../data';

export function Skills() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#4af600]/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="green-line" />
            <span className="section-label">Expertise</span>
            <span className="green-line" />
          </div>
          <h2 className="section-heading text-white text-5xl lg:text-6xl">
            Skills & <span className="text-accent">Proficiency</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill bars */}
          <div className="reveal-left">
            <h3 className="flex items-center gap-2 text-white font-condensed text-xl font-bold uppercase tracking-wide mb-8">
              <Code2 size={18} className="text-[#4af600]" />
              Core Competencies
            </h3>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                    <span className="font-condensed text-sm text-[#4af600] font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#4af600] to-[#4af600]/60 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: animated ? `${skill.level}%` : '0%',
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags + tools */}
          <div className="reveal-right">
            <h3 className="flex items-center gap-2 text-white font-condensed text-xl font-bold uppercase tracking-wide mb-8">
              <Star size={18} className="text-[#4af600]" />
              All Skills
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 font-condensed text-sm font-medium text-gray-300 border border-[#2a2a2a] hover:border-[#4af600]/50 hover:text-white hover:bg-[#4af600]/8 transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Adobe tools */}
            <h3 className="text-white font-condensed text-xl font-bold uppercase tracking-wide mb-6">Primary Tools</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Photoshop', short: 'Ps', color: '#31A8FF' },
                { label: 'Illustrator', short: 'Ai', color: '#FF9A00' },
                { label: 'InDesign', short: 'Id', color: '#FF3366' },
                { label: 'Premiere', short: 'Pr', color: '#9999FF' },
                { label: 'After FX', short: 'Ae', color: '#9999FF' },
                { label: 'Acrobat', short: 'Ac', color: '#FF0000' },
              ].map((tool) => (
                <div key={tool.label} className="card p-4 flex items-center gap-3 group">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-black text-sm font-black flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tool.color }}
                  >
                    {tool.short}
                  </div>
                  <span className="text-gray-300 text-xs font-medium">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

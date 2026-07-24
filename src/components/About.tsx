import { MapPin, Mail, Phone, Languages, Award, Briefcase } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#4af600]/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left — heading */}
          <div className="lg:col-span-4 reveal-left">
            <div className="flex items-center gap-4 mb-6">
              <span className="green-line" />
              <span className="section-label">About Me</span>
            </div>
            <h2 className="section-heading text-white text-5xl lg:text-6xl mb-8">
              The<br />Designer<br /><span className="text-accent">Behind</span><br />The Work
            </h2>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={16} />, label: 'Location', value: 'Mathura, India — 281006' },
                { icon: <Mail size={16} />, label: 'Email', value: 'kabirkhanat8@gmail.com' },
                { icon: <Phone size={16} />, label: 'Phone', value: '+91 8885857725' },
                { icon: <Languages size={16} />, label: 'Languages', value: 'Hindi (C2) · English (B1)' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[#4af600] mt-0.5 group-hover:border-[#4af600] group-hover:bg-[#4af600]/10 transition-all">{item.icon}</div>
                  <div>
                    <p className="text-[#666] text-xs font-condensed uppercase tracking-widest">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <div className="lg:col-span-8 reveal-right">
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Kabir Khan</span>, a Senior Graphic Designer based in Mathura, India, with a passion for translating complex ideas into compelling visual stories. With experience spanning <span className="text-[#4af600]">branding, print, and digital media</span>, I bring both technical precision and creative vision to every project.
              </p>
              <p>
                Currently leading design initiatives at <span className="text-white font-semibold">Acculizein Tech Pvt. Ltd.</span>, I've honed my ability to manage end-to-end design workflows — from concept ideation and client presentations to final delivery — while mentoring a new generation of design talent.
              </p>
              <p>
                My approach combines strategic thinking with hands-on craftsmanship. Whether it's a complete brand identity system, a packaging design that stands out on shelves, or a social media campaign that drives engagement, I deliver work that's both beautiful and effective.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: <Briefcase size={20} />, title: '3+ Years', sub: 'Professional Experience' },
                { icon: <Award size={20} />, title: 'Award Winner', sub: 'Employee of the Year 2024' },
                { icon: <Languages size={20} />, title: 'Bilingual', sub: 'Hindi & English Proficiency' },
              ].map((card) => (
                <div key={card.title} className="card p-5">
                  <div className="text-[#4af600] mb-3">{card.icon}</div>
                  <p className="font-condensed text-xl font-bold text-white">{card.title}</p>
                  <p className="text-[#666] text-xs mt-1">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

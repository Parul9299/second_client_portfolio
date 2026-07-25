export function LanguagesSection() {
  return (
    <section className="py-14 xs:py-16 sm:py-20 bg-[#141414] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 xs:px-5 sm:px-6">
        <div className="reveal text-center mb-8 xs:mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="green-line" />
            <span className="section-label">Communication</span>
            <span className="green-line" />
          </div>
          <h2 className="section-heading text-white text-3xl xs:text-4xl lg:text-5xl">
            Language <span className="text-accent">Proficiency</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6">
          {[
            { lang: 'Hindi', level: 'Proficient (C2)', pct: 98, flag: '🇮🇳' },
            { lang: 'English', level: 'Intermediate (B1)', pct: 60, flag: '🇬🇧' },
          ].map((l, i) => (
            <div
              key={l.lang}
              className="card p-5 xs:p-6 sm:p-7 reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl xs:text-3xl">{l.flag}</span>
                  <div>
                    <h3 className="font-condensed text-xl font-bold text-white uppercase tracking-wide">{l.lang}</h3>
                    <p className="text-[#4af600] text-xs font-medium">{l.level}</p>
                  </div>
                </div>
                <span className="font-condensed text-2xl xs:text-3xl font-black text-[#4af600]">{l.pct}%</span>
              </div>
              <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4af600] to-[#4af600]/60"
                  style={{ width: `${l.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

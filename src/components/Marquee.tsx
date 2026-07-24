import { Plus } from 'lucide-react';

export function Marquee() {
  const items = ['Branding', 'Logo Design', 'Print Media', 'Packaging', 'Social Media', 'Mockups', 'Illustration', 'Video Editing'];
  return (
    <div className="bg-[#0d0d0d] border-y border-[#222] py-5 overflow-hidden">
      <div className="marquee-track marquee-left">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-8">
            <span className="font-condensed text-2xl font-bold text-white uppercase tracking-wider">{item}</span>
            <Plus size={16} className="text-[#4af600]" />
          </span>
        ))}
      </div>
    </div>
  );
}

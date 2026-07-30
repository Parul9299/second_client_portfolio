import { Plus } from "lucide-react";

const row1 = [
  "Brand Identity Design",
  "Creative Direction",
  "Logo Design",
  "Brand Guidelines",
  "Medical Branding",
  "Packaging Design",
];

const row2 = [
  "Print Media Design",
  "Typography",
  "Brand Strategy",
  "Mentoring",
  "Banner Design",
  "Illustration",
];

const row3 = [
  "Marketing Creatives",
  "Social Media",
  "Mockups",
  "Video Editing",
  "Discipline",
  "Creative Design",
];

const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) => (
  <div className="overflow-hidden ma whitespace-nowrap py-3">
    <div
      className={`flex w-max items-center gap-10 ${
        reverse ? "marquee-right" : "marquee-left"
      }`}
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 shrink-0"
        >
          <span className="font-condensed font-bold text-[34px] text-[#444] uppercase">
            {item}
          </span>

          <Plus
            size={18}
            className="text-[#4af600] opacity-70"
          />
        </div>
      ))}
    </div>
  </div>
);

export function Marquee() {
  return (
    <section className="py-20">
      <MarqueeRow items={row1} />

      <MarqueeRow
        items={row2}
        reverse
      />

      <MarqueeRow items={row3} />
    </section>
  );
}
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Play, X } from "lucide-react";
import { portfolioItems } from "../data";
import { Link } from "react-router-dom";

const categories = [
  "All",
  ...Array.from(new Set(portfolioItems.map((item) => item.category))),
];

const videos = [
  {
    title: "Brand Stories in Motion",
    category: "Motion Design",
    duration: "01:24",
    previewVideo: "https://www.pexels.com/download/video/16727459/",
    videoUrl: "https://www.pexels.com/download/video/16727459/",
  },
  {
    title: "Visual Identity Reel",
    category: "Showreel",
    duration: "00:48",
    previewVideo: "https://www.pexels.com/download/video/15863504/",
    videoUrl: "https://www.pexels.com/download/video/15863504/",
  },
  {
    title: "The Making of a Brand",
    category: "Process Film",
    duration: "02:16",
    previewVideo: "https://www.pexels.com/download/video/29064708/",
    videoUrl: "https://www.pexels.com/download/video/29064708/",
  },
];

type PortfolioItem = (typeof portfolioItems)[number];
type VideoItem = (typeof videos)[number];

type GalleryCardProps = {
  item: PortfolioItem;
  index: number;
  onOpen: (item: PortfolioItem) => void;
};

function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`gallery-card group relative block w-full overflow-hidden text-left ${
        index % 5 === 0 ? "md:row-span-2" : ""
      }`}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full min-h-[260px] w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <span className="border border-white/25 bg-black/20 px-3 py-1 font-condensed text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          0{index + 1}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 translate-y-2 transition duration-300 group-hover:translate-y-0">
        <div className="mb-2 flex items-center gap-2 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4af600]">
          <span>{item.category}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/55">{item.year}</span>
        </div>
        <h3 className="font-condensed text-2xl font-bold uppercase leading-none tracking-wide text-white">
          {item.title}
        </h3>
        <span className="mt-3 block font-condensed text-[10px] uppercase tracking-[0.2em] text-white/60 opacity-0 transition duration-300 group-hover:opacity-100">
          View project
        </span>
      </div>
    </button>
  );
}

function VideoCard({
  video,
  onOpenVideo,
}: {
  video: VideoItem;
  onOpenVideo: (video: VideoItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenVideo(video)}
      className="gallery-video group relative min-h-[300px] w-full overflow-hidden text-left"
      aria-label={`Play ${video.title}`}
    >
      <video
        src={video.previewVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/45 transition duration-500 group-hover:bg-black/25" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-[#4af600] text-black transition duration-300 group-hover:scale-110 group-hover:bg-white">
          <Play size={21} fill="currentColor" />
        </span>
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-2 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4af600]">
          {video.category}{" "}
          <span className="text-white/50">/ {video.duration}</span>
        </div>
        <h3 className="font-condensed text-2xl font-bold uppercase leading-none text-white">
          {video.title}
        </h3>
      </div>
    </button>
  );
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Kabir Khan logo" className="h-8 w-8" />
            <span className="font-condensed text-xl font-bold tracking-wide">
              Kabir Khan
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="gallery-nav-link">
              Go to Home
            </Link>
          </nav>
          <button
            type="button"
            className="flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[#aaa] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu{" "}
            <ChevronDown
              size={15}
              className={menuOpen ? "rotate-180 transition" : "transition"}
            />
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-4 md:hidden">
            <Link
              to="/"
              className="block py-2 font-condensed text-xs uppercase tracking-[0.2em] text-[#aaa]"
            >
              Go to Home
            </Link>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28 lg:py-36">
        <div className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#4af600]/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-4">
            <span className="green-line" />
            <span className="section-label">Selected work · 2022—2026</span>
          </div>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h1 className="font-condensed text-[clamp(76px,14vw,190px)] font-black uppercase leading-[0.78] tracking-[-0.05em]">
              The
              <br />
              <span className="text-[#4af600]">
                Gallery<span className="text-white">.</span>
              </span>
            </h1>
            <div className="max-w-sm pb-2 lg:mr-20">
              <p className="text-sm leading-7 text-[#999]">
                A visual archive of identities, campaigns, packaging, and
                digital experiences crafted with clarity, character, and intent.
              </p>
              <div className="mt-6 flex items-center gap-3 font-condensed text-xs uppercase tracking-[0.2em] text-[#4af600]">
                <span className="h-px w-10 bg-[#4af600]" /> Senior Graphic
                Designer
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="section-label mb-3">01 / Selected projects</div>
            <h2 className="font-condensed text-4xl font-bold uppercase sm:text-5xl">
              Portfolio<span className="text-[#4af600]">.</span>
            </h2>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryDropdownOpen((open) => !open)}
              className="flex min-w-44 items-center justify-between border-b border-white/30 pb-3 font-condensed text-xs uppercase tracking-[0.2em] text-[#aaa] sm:hidden"
            >
              {activeCategory}
              <ChevronDown size={15} />
            </button>
            <div
              className={`${
                categoryDropdownOpen ? "flex" : "hidden"
              } absolute right-0 top-10 z-20 w-44 flex-col border border-white/10 bg-[#1a1a1a] p-2 sm:hidden`}
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCategoryDropdownOpen(false);
                  }}
                  className="px-3 py-2 text-left font-condensed text-xs uppercase tracking-widest text-[#aaa] hover:text-[#4af600]"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="hidden gap-5 sm:flex">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`font-condensed text-xs uppercase tracking-[0.18em] transition ${
                    activeCategory === category
                      ? "text-[#4af600]"
                      : "text-[#666] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.title}
              item={item}
              index={index}
              onOpen={setSelectedItem}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="section-label mb-3">02 / Moving image</div>
              <h2 className="font-condensed text-4xl font-bold uppercase sm:text-5xl">
                Films<span className="text-[#4af600]">.</span>
              </h2>
            </div>
            <span className="hidden font-condensed text-xs uppercase tracking-[0.18em] text-[#555] sm:block">
              Motion · Process · Story
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {videos.map((video) => (
              <VideoCard
                key={video.title}
                video={video}
                onOpenVideo={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
          <div>
            <div className="section-label mb-3">Have a project in mind?</div>
            <h2 className="max-w-xl font-condensed text-5xl font-bold uppercase leading-none sm:text-7xl">
              Let&apos;s make
              <br />
              <span className="text-[#4af600]">something.</span>
            </h2>
          </div>
          <Link to="/" className="btn-primary self-start sm:self-end">
            Back to Home <ArrowUpRight size={16} className="ml-2 inline" />
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto bg-[#1a1a1a] md:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[#4af600] hover:text-black"
              aria-label="Close project"
            >
              <X size={17} />
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="h-full min-h-[300px] w-full object-cover"
            />
            <div className="flex flex-col justify-end p-7 sm:p-10">
              <div className="section-label mb-4">
                {selectedItem.category} / {selectedItem.year}
              </div>
              <h2 className="font-condensed text-4xl font-bold uppercase leading-none sm:text-6xl">
                {selectedItem.title}
              </h2>
              <p className="mt-6 text-sm leading-7 text-[#999]">
                A considered visual direction built to give the brand a distinct
                point of view and a lasting presence.
              </p>
              <div className="mt-8 h-px w-12 bg-[#4af600]" />
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title}
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-[#1a1a1a]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-[#4af600] hover:text-black"
              aria-label="Close video"
            >
              <X size={17} />
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-5 sm:p-6">
              <div className="mb-2 font-condensed text-xs uppercase tracking-[0.2em] text-[#4af600]">
                {selectedVideo.category} / {selectedVideo.duration}
              </div>
              <h3 className="font-condensed text-2xl font-bold uppercase text-white sm:text-3xl">
                {selectedVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

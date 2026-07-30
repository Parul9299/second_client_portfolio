import { useState } from "react";
import { Play, X } from "lucide-react";

interface VideoProject {
  id: string;
  title: string;
  author: string;
  avatar: string;
  previewVideo: string;
  fullVideo: string;
}

// Exactly 3 unique videos
const projects: VideoProject[] = [
  {
    id: "1",
    title: "Visual Identity & Motion",
    author: "Cameron Williamson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    previewVideo: "https://www.pexels.com/download/video/16727459/",
    fullVideo: "https://www.pexels.com/download/video/16727459/",
  },
  {
    id: "2",
    title: "Abstract 3D Art",
    author: "Robert Fox",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    previewVideo: "https://www.pexels.com/download/video/15863504/",
    fullVideo: "https://www.pexels.com/download/video/15863504/",
  },
  {
    id: "3",
    title: "Nature Cinematics",
    author: "John Jacob",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    previewVideo: "https://www.pexels.com/download/video/29064708/",
    fullVideo: "https://www.pexels.com/download/video/29064708/",
  },
];

// Exact 2x duplication for 50% transform infinite loop
const carouselItems = [...projects, ...projects];

export function VideoPortfolio() {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
      <section className="py-20 text-white overflow-hidden relative">
        {/* Continuous Seamless CSS Animation */}
        <style>{`
          @keyframes infiniteMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .animate-marquee-smooth {
            display: flex;
            width: max-content;
            animation: infiniteMarquee 25s linear infinite;
            will-change: transform;
          }
          .animate-marquee-smooth:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#4af600] font-mono text-xs font-bold tracking-widest uppercase">
              Featured Design Portfolio
            </span>

            <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight mt-1">
              CREATIVE DESIGN SHOWCASE
            </h2>
          </div>

          <p className="text-gray-400 text-sm max-w-md">
            Explore a curated collection of branding, logo design, packaging, print,
            social media creatives, and visual identity projects crafted to build
            impactful and memorable brands.
          </p>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Gradient Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="animate-marquee-smooth flex gap-5 pr-5">
            {carouselItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => setActiveVideo(item)}
                className="group relative flex-shrink-0 w-[240px] sm:w-[280px] md:w-[550px] h-[380px] sm:h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#1a1a1a] transition-all duration-500 hover:scale-[1.02] hover:border-[#4af600]/50 hover:shadow-[0_0_30px_rgba(74,246,0,0.15)]"
              >
                {/* Background Video Preview */}
                <video
                  src={item.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-60" />

                {/* Play Icon Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-[#4af600] group-hover:text-black transition-all duration-300">
                  <Play size={18} className="ml-0.5 fill-current" />
                </div>

                {/* Card Footer Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div className="truncate">
                    <h4 className="text-white text-sm font-semibold truncate group-hover:text-[#4af600] transition-colors">
                      {item.author}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ VIDEO POPUP MODAL ════ */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn">
            <div
              className="absolute inset-0"
              onClick={() => setActiveVideo(null)}
            />

            <div className="relative z-10 w-full max-w-4xl bg-[#181818] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#4af600] hover:text-black transition-all duration-300"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <video
                  src={activeVideo.fullVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 flex items-center justify-between border-t border-white/10 bg-[#141414]">
                <div className="flex items-center gap-3">
                  <img
                    src={activeVideo.avatar}
                    alt={activeVideo.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#4af600]"
                  />
                  <div>
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      {activeVideo.author}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {activeVideo.title}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#4af600] bg-[#4af600]/10 border border-[#4af600]/30 px-3 py-1 rounded-full">
                  Sr. Graphic Design
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
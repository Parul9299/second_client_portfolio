import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoProject {
  id: string;
  title: string;
  author: string;
  avatar: string;
  previewVideo: string;
  fullVideo: string;
}

const projects: VideoProject[] = [
  {
    id: '1',
    title: 'Visual Identity & Motion',
    author: 'Cameron Williamson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-rose-blooming-in-a-close-up-shot-41618-large.mp4',
    fullVideo: 'https://assets.mixkit.co/videos/preview/mixkit-rose-blooming-in-a-close-up-shot-41618-large.mp4',
  },
  {
    id: '2',
    title: 'Abstract 3D Art',
    author: 'Robert Fox',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43093-large.mp4',
    fullVideo: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43093-large.mp4',
  },
  {
    id: '3',
    title: 'Nature Cinematics',
    author: 'John Jacob',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-hand-touching-the-wheat-in-a-field-41551-large.mp4',
    fullVideo: 'https://assets.mixkit.co/videos/preview/mixkit-hand-touching-the-wheat-in-a-field-41551-large.mp4',
  },
  {
    id: '4',
    title: 'Golden Sands Motion',
    author: 'Esther Howard',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    previewVideo: 'https://assets.mixkit.co/videos/preview/mixkit-sand-falling-on-a-dune-42861-large.mp4',
    fullVideo: 'https://assets.mixkit.co/videos/preview/mixkit-sand-falling-on-a-dune-42861-large.mp4',
  },
];

// Double array for infinite continuous loop
const carouselItems = [...projects, ...projects];

export function VideoPortfolio() {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  return (
    <section className="py-20 bg-[#111111] text-white overflow-hidden relative">
      {/* CSS Animation for Seamless Carousel */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[#4af600] font-mono text-xs font-bold tracking-widest uppercase">
            Motion & Video Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-condensed tracking-tight mt-1">
            CREATIVE WORKSHOWCASE
          </h2>
        </div>
        <p className="text-gray-400 text-sm max-w-md">
          A showcase of high-end motion graphics, branding visualizers, and digital design loops. Click any card to view full video.
        </p>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Edge Masks for Smooth Blend */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Cards */}
        <div className="animate-marquee gap-5 px-4">
          {carouselItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setActiveVideo(item)}
              className="group relative flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[380px] sm:h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#1a1a1a] transition-all duration-500 hover:scale-[1.02] hover:border-[#4af600]/50 hover:shadow-[0_0_30px_rgba(74,246,0,0.15)]"
            >
              {/* Background Video Preview (Auto-Play Muted Loop - GIF Style) */}
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
                  <p className="text-gray-400 text-xs truncate">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ VIDEO POPUP MODAL ════ */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveVideo(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-4xl bg-[#181818] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#4af600] hover:text-black transition-all duration-300"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Main HD Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.fullVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Info Footer */}
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
  );
}
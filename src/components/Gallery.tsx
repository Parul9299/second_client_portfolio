import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Play,
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react";
import { portfolioItems } from "../data";
import { Link, useNavigate } from "react-router-dom";
import { useGalleryStorage } from "../hooks/useGalleryStorage";
import { supabase } from "../lib/supabase";

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

type PortfolioItem = {
  title: string;
  category: string;
  year: string | number;
  image: string;
};

type VideoItem = {
  title: string;
  category: string;
  duration: string;
  previewVideo: string;
  videoUrl: string;
};

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
          {String(index + 1).padStart(2, "0")}
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
          {video.category}
          <span className="text-white/50"> / {video.duration}</span>
        </div>

        <h3 className="font-condensed text-2xl font-bold uppercase leading-none text-white">
          {video.title}
        </h3>
      </div>
    </button>
  );
}

export function Gallery() {
  const navigate = useNavigate();

  // State Management
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Auth States for Admin Access
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { items: adminItems, categories: adminCategories } =
    useGalleryStorage();

  /* ---------------------------------------------------------------------- */
  /* ADMIN IMAGES                                                           */
  /* ---------------------------------------------------------------------- */

  const adminPortfolioItems = useMemo<PortfolioItem[]>(
    () =>
      adminItems
        .filter((item) => item.type === "image")
        .map((item) => ({
          title: item.title,
          category: item.category,
          year: item.year,
          image: item.url,
        })),
    [adminItems],
  );

  const allPortfolioItems = useMemo<PortfolioItem[]>(
    () => [...(portfolioItems as PortfolioItem[]), ...adminPortfolioItems],
    [adminPortfolioItems],
  );

  /* ---------------------------------------------------------------------- */
  /* CATEGORIES                                                             */
  /* ---------------------------------------------------------------------- */

  const categories = useMemo(() => {
    const existingCategories = allPortfolioItems.map((item) => item.category);
    return [
      "All",
      ...Array.from(new Set([...existingCategories, ...adminCategories])),
    ];
  }, [allPortfolioItems, adminCategories]);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? allPortfolioItems
        : allPortfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory, allPortfolioItems],
  );

  /* ---------------------------------------------------------------------- */
  /* ADMIN VIDEOS                                                           */
  /* ---------------------------------------------------------------------- */

  const adminVideoItems = useMemo<VideoItem[]>(
    () =>
      adminItems
        .filter((item) => item.type === "video")
        .map((item) => ({
          title: item.title,
          category: item.category,
          duration: "NEW",
          previewVideo: item.url,
          videoUrl: item.url,
        })),
    [adminItems],
  );

  const allVideos = useMemo(
    () => [...videos, ...adminVideoItems],
    [adminVideoItems],
  );

  /* ---------------------------------------------------------------------- */
  /* AUTH HANDLER                                                           */
  /* ---------------------------------------------------------------------- */

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error("Admin login error:", error);
      setLoginError("Invalid email address or password.");
      return;
    }

    setShowLoginModal(false);
    setEmail("");
    setPassword("");

    sessionStorage.setItem("adminUnlocked", "true");

    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

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

            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="font-condensed text-xs pt-0 uppercase tracking-[0.2em] text-[#4af600] transition hover:text-white"
            >
              Admin Access
            </button>
          </nav>

          <button
            type="button"
            className="flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[#aaa] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
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

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setShowLoginModal(true);
              }}
              className="block w-full text-left py-2 font-condensed text-xs uppercase tracking-[0.2em] text-[#4af600]"
            >
              Admin Access
            </button>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28 lg:py-36">
        <div className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#4af600]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-5 flex items-center gap-4">
            <span className="green-line" />
            <span className="section-label">Selected work · 2022—2026</span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h1 className="font-condensed text-[clamp(76px,14vw,190px)] font-black uppercase leading-[0.78] tracking-[-0.05em]">
              The <br />
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
                <span className="h-px w-10 bg-[#4af600]" />
                Senior Graphic Designer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PORTFOLIO & CATEGORY DROPDOWN                                      */}
      {/* ------------------------------------------------------------------ */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="section-label mb-3">01 / Selected projects</div>
            <h2 className="font-condensed text-4xl font-bold uppercase sm:text-5xl">
              Portfolio<span className="text-[#4af600]">.</span>
            </h2>
          </div>

          {/* UNIFIED CLEAN CATEGORY DROPDOWN */}
          <div className="relative w-full sm:w-64">
            <button
              type="button"
              onClick={() => setCategoryDropdownOpen((open) => !open)}
              className="flex w-full items-center justify-between border border-white/20 bg-[#1a1a1a] px-4 py-3 font-condensed text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#4af600]"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[#4af600]" />
                <span>{activeCategory}</span>
              </div>
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  categoryDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute right-0 top-full z-30 mt-1 max-h-60 w-full overflow-y-auto border border-white/10 bg-[#1a1a1a] p-1 shadow-2xl backdrop-blur-md">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left font-condensed text-xs uppercase tracking-widest transition ${
                      activeCategory === category
                        ? "bg-[#4af600] text-black font-bold"
                        : "text-[#aaa] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                onOpen={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center border border-dashed border-white/10">
            <span className="font-condensed text-xs uppercase tracking-[0.2em] text-[#555]">
              No projects in this category
            </span>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VIDEOS                                                             */}
      {/* ------------------------------------------------------------------ */}

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

          {allVideos.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {allVideos.map((video) => (
                <VideoCard
                  key={`${video.title}-${video.videoUrl}`}
                  video={video}
                  onOpenVideo={setSelectedVideo}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
          <div>
            <div className="section-label mb-3">Have a project in mind?</div>

            <h2 className="max-w-xl font-condensed text-5xl font-bold uppercase leading-none sm:text-7xl">
              Let&apos;s make <br />
              <span className="text-[#4af600]">something.</span>
            </h2>
          </div>

          <Link to="/" className="btn-primary self-start sm:self-end">
            Back to Home <ArrowUpRight size={16} className="ml-2 inline" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* IMAGE MODAL                                                        */}
      {/* ------------------------------------------------------------------ */}

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

      {/* ------------------------------------------------------------------ */}
      {/* VIDEO MODAL                                                        */}
      {/* ------------------------------------------------------------------ */}

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

      {/* ------------------------------------------------------------------ */}
      {/* ADMIN AUTH LOGIN MODAL                                             */}
      {/* ------------------------------------------------------------------ */}

      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden border border-white/10 bg-[#161616] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-[#4af600] hover:text-black"
            >
              <X size={16} />
            </button>

            <div className="mb-6">
              <span className="font-condensed text-xs uppercase tracking-[0.2em] text-[#4af600]">
                Restricted Access
              </span>
              <h3 className="mt-1 font-condensed text-3xl font-bold uppercase text-white">
                Admin Login
              </h3>
            </div>

            {loginError && (
              <div className="mb-4 border border-red-500/40 bg-red-500/10 p-3 font-condensed text-xs text-red-400">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="mb-1 block font-condensed text-xs uppercase tracking-widest text-white/60">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kabirkhan.com"
                    className="w-full border border-white/15 bg-black/40 py-2.5 pl-10 pr-4 font-sans text-sm text-white focus:border-[#4af600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-condensed text-xs uppercase tracking-widest text-white/60">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-white/15 bg-black/40 py-2.5 pl-10 pr-10 font-sans text-sm text-white focus:border-[#4af600] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full border border-[#4af600] bg-[#4af600] py-3 font-condensed text-xs uppercase tracking-[0.2em] font-bold text-black transition hover:bg-transparent hover:text-[#4af600]"
              >
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

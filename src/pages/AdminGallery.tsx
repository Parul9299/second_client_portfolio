import {
  Check,
  Edit3,
  ImagePlus,
  LayoutDashboard,
  Pencil,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import { Link } from "react-router-dom";
import { useGalleryStorage } from "../hooks/useGalleryStorage";

export function AdminGallery() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    items,
    categories,
    loading,
    addItem,
    editItem,
    removeItem,
    createCategory,
    editCategory: renameGalleryCategory,
    removeCategory,
  } = useGalleryStorage();

  const [dragging, setDragging] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "image" | "video"
  >("all");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState(
    categories[0] || "Uncategorised",
  );

  const [uploading, setUploading] = useState(false);

  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [editTitle, setEditTitle] = useState("");

  const [editCategory, setEditCategory] =
    useState("");

  const [newCategory, setNewCategory] =
    useState("");

  const [categoryManagerOpen, setCategoryManagerOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<string | null>(null);

  const [editingCategoryName, setEditingCategoryName] =
    useState("");

  const filteredItems = items.filter((item) => {
    const matchesType =
      filter === "all" || item.type === filter;

    const query = search.toLowerCase().trim();

    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });

  const selectedItem = items.find(
    (item) => item.id === selectedId,
  );

  const startEdit = (
    id: string,
    currentTitle: string,
    currentCategory: string,
  ) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditCategory(currentCategory);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCategory("");
  };

  const saveEdit = async () => {
    if (!editingId) return;

    await editItem(editingId, {
      title: editTitle,
      category: editCategory,
    });

    cancelEdit();
  };

  const handleFiles = async (
    files: FileList | File[],
  ) => {
    const validFiles = Array.from(files).filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/"),
    );

    if (!validFiles.length) {
      window.alert(
        "Please select an image or video file.",
      );
      return;
    }

    setUploading(true);

    try {
      for (const file of validFiles) {
        await addItem(
          file,
          title || undefined,
          category || "Uncategorised",
        );
      }

      setTitle("");
    } catch (error) {
      console.error("Upload failed:", error);

      window.alert(
        "Something went wrong while adding the media.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      handleFiles(event.target.files);

      event.target.value = "";
    }
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setDragging(false);

    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleCreateCategory = async () => {
    const cleanName = newCategory.trim();

    if (!cleanName) return;

    try {
      await createCategory(cleanName);

      setNewCategory("");
      setCategory(cleanName);
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not create category.",
      );
    }
  };

  const handleRenameCategory = async (
    oldName: string,
  ) => {
    const cleanName = editingCategoryName.trim();

    if (!cleanName) return;

    try {
      await renameGalleryCategory(oldName, cleanName);

      setEditingCategory(null);
      setEditingCategoryName("");

      if (category === oldName) {
        setCategory(cleanName);
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not rename category.",
      );
    }
  };

  const handleDeleteCategory = async (
    categoryName: string,
  ) => {
    const confirmed = window.confirm(
      `Delete "${categoryName}"?\n\nMedia using this category will be moved to "Uncategorised".`,
    );

    if (!confirmed) return;

    try {
      await removeCategory(categoryName);

      if (category === categoryName) {
        setCategory("Uncategorised");
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not delete category.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP SIDEBAR                                                    */}
      {/* ------------------------------------------------------------------ */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] border-r border-white/10 bg-[#111111] lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-7 py-7">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.svg"
              alt="Kabir Khan"
              className="h-8 w-8"
            />

            <div>
              <div className="font-condensed text-lg font-bold uppercase">
                Kabir Khan
              </div>

              <div className="font-condensed text-[9px] uppercase tracking-[0.25em] text-[#4af600]">
                Admin Studio
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-5">
          <div className="mb-3 px-3 font-condensed text-[9px] uppercase tracking-[0.25em] text-[#555]">
            Workspace
          </div>

          <Link
            to="/"
            className="mb-1 flex items-center gap-3 px-3 py-3 font-condensed text-xs uppercase tracking-[0.15em] text-[#777] transition hover:text-white"
          >
            <LayoutDashboard size={16} />
            Website
          </Link>

          <div className="flex items-center gap-3 border-l-2 border-[#4af600] bg-[#4af600]/5 px-3 py-3 font-condensed text-xs uppercase tracking-[0.15em] text-[#4af600]">
            <ImagePlus size={16} />
            Gallery
          </div>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-left font-condensed text-xs uppercase tracking-[0.15em] text-[#777] transition hover:text-white"
          >
            <Settings size={16} />
            Settings
          </button>
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            to="/gallery"
            className="flex items-center gap-3 px-3 py-3 font-condensed text-xs uppercase tracking-[0.15em] text-[#777] transition hover:text-[#4af600]"
          >
            View Gallery
          </Link>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE HEADER                                                       */}
      {/* ------------------------------------------------------------------ */}

      <header className="flex items-center justify-between border-b border-white/10 bg-[#111111] px-5 py-5 lg:hidden">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt="Kabir Khan"
            className="h-8 w-8"
          />

          <span className="font-condensed text-lg font-bold uppercase">
            Kabir Khan
          </span>
        </Link>

        <Link
          to="/gallery"
          className="font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4af600]"
        >
          View Gallery
        </Link>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section className="lg:ml-[250px]">
        {/* HEADER */}
        <div className="border-b border-white/10 px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#4af600]" />

              <span className="font-condensed text-[10px] uppercase tracking-[0.25em] text-[#4af600]">
                Admin / Gallery
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-condensed text-5xl font-black uppercase leading-none sm:text-7xl">
                  Media
                  <span className="text-[#4af600]">
                    .
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#777]">
                  Manage your portfolio imagery and
                  films locally. No backend required.
                </p>
              </div>

              <div className="flex gap-6">
                <div>
                  <div className="font-condensed text-2xl font-bold">
                    {items.length}
                  </div>

                  <div className="font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                    Total
                  </div>
                </div>

                <div>
                  <div className="font-condensed text-2xl font-bold text-[#4af600]">
                    {
                      items.filter(
                        (item) =>
                          item.type === "image",
                      ).length
                    }
                  </div>

                  <div className="font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                    Photos
                  </div>
                </div>

                <div>
                  <div className="font-condensed text-2xl font-bold">
                    {
                      items.filter(
                        (item) =>
                          item.type === "video",
                      ).length
                    }
                  </div>

                  <div className="font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                    Videos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12">
          {/* ---------------------------------------------------------------- */}
          {/* UPLOAD                                                           */}
          {/* ---------------------------------------------------------------- */}

          <div
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragOver={(event) =>
              event.preventDefault()
            }
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`relative mb-10 overflow-hidden border transition ${
              dragging
                ? "border-[#4af600] bg-[#4af600]/5"
                : "border-white/10 bg-[#111111]"
            }`}
          >
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#4af600]/10 blur-[100px]" />

            <div className="relative grid lg:grid-cols-[1fr_340px]">
              <div className="p-8 sm:p-12">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#4af600]/40 bg-[#4af600]/5 text-[#4af600]">
                  <Upload size={22} />
                </div>

                <h2 className="font-condensed text-3xl font-bold uppercase">
                  Add Media
                  <span className="text-[#4af600]">
                    .
                  </span>
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#666]">
                  Drag photos or videos here, or choose
                  files from your device. Multiple files
                  are supported.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    inputRef.current?.click()
                  }
                  disabled={uploading}
                  className="mt-7 inline-flex items-center gap-3 bg-[#4af600] px-6 py-3 font-condensed text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-white disabled:opacity-50"
                >
                  <ImagePlus size={16} />

                  {uploading
                    ? "Adding..."
                    : "Choose Files"}
                </button>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>

              <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0">
                <label className="mb-2 block font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                  Default Title
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Project title"
                  className="mb-5 w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-[#444] focus:border-[#4af600]"
                />

                <label className="mb-2 block font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                  Category
                </label>

                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    className="w-full border-b border-white/20 bg-[#111111] px-0 py-3 text-sm text-white outline-none focus:border-[#4af600]"
                  >
                    <option value="Uncategorised">
                      Uncategorised
                    </option>

                    {categories.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      setCategoryManagerOpen(true)
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-[#777] transition hover:border-[#4af600] hover:text-[#4af600]"
                    title="Manage categories"
                  >
                    <Settings size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCategoryManagerOpen(true)
                  }
                  className="mt-4 flex items-center gap-2 font-condensed text-[9px] uppercase tracking-[0.18em] text-[#4af600]"
                >
                  <Plus size={13} />
                  Manage Categories
                </button>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* TOOLBAR                                                          */}
          {/* ---------------------------------------------------------------- */}

          <div className="mb-6 flex flex-col justify-between gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
            <div className="flex gap-5">
              {(
                ["all", "image", "video"] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilter(type)}
                  className={`font-condensed text-[10px] uppercase tracking-[0.2em] transition ${
                    filter === type
                      ? "text-[#4af600]"
                      : "text-[#555] hover:text-white"
                  }`}
                >
                  {type === "all"
                    ? "All Media"
                    : type === "image"
                      ? "Photos"
                      : "Videos"}
                </button>
              ))}
            </div>

            <div className="flex items-center border-b border-white/20">
              <Search
                size={15}
                className="text-[#555]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search media..."
                className="w-full bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-[#444] sm:w-56"
              />
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* MEDIA GRID                                                       */}
          {/* ---------------------------------------------------------------- */}

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="font-condensed text-xs uppercase tracking-[0.2em] text-[#555]">
                Loading media...
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-white/10">
              <ImagePlus
                size={30}
                className="mb-4 text-[#444]"
              />

              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[#555]">
                No media found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => {
                const isEditing =
                  editingId === item.id;

                return (
                  <article
                    key={item.id}
                    className="group overflow-hidden border border-white/10 bg-[#111111]"
                  >
                    {/* MEDIA */}
                    <div
                      className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-black"
                      onClick={() =>
                        !isEditing &&
                        setSelectedId(item.id)
                      }
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={item.url}
                          muted
                          playsInline
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      )}

                      <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center bg-black/75 text-[#4af600]">
                        {item.type === "image" ? (
                          <ImagePlus size={14} />
                        ) : (
                          <Play
                            size={14}
                            fill="currentColor"
                          />
                        )}
                      </div>

                      <span className="absolute right-4 top-4 bg-black/70 px-2 py-1 font-condensed text-[8px] uppercase tracking-[0.15em] text-white/70">
                        {item.type}
                      </span>
                    </div>

                    {/* INFO / EDIT */}
                    <div className="p-5">
                      {isEditing ? (
                        <div>
                          <label className="mb-2 block font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                            Title
                          </label>

                          <input
                            value={editTitle}
                            onChange={(event) =>
                              setEditTitle(
                                event.target.value,
                              )
                            }
                            placeholder="Untitled Project"
                            className="mb-4 w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-[#4af600]"
                          />

                          <label className="mb-2 block font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                            Category
                          </label>

                          <select
                            value={editCategory}
                            onChange={(event) =>
                              setEditCategory(
                                event.target.value,
                              )
                            }
                            className="mb-5 w-full border-b border-white/20 bg-[#111111] py-2 text-sm text-white outline-none focus:border-[#4af600]"
                          >
                            <option value="Uncategorised">
                              Uncategorised
                            </option>

                            {categories.map(
                              (itemCategory) => (
                                <option
                                  key={itemCategory}
                                  value={itemCategory}
                                >
                                  {itemCategory}
                                </option>
                              ),
                            )}
                          </select>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={saveEdit}
                              className="flex flex-1 items-center justify-center gap-2 bg-[#4af600] px-4 py-2 font-condensed text-[10px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-white"
                            >
                              <Check size={14} />
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="flex h-9 w-9 items-center justify-center border border-white/10 text-[#777] hover:text-white"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="font-condensed text-[9px] uppercase tracking-[0.2em] text-[#4af600]">
                              {item.category}
                            </span>

                            <span className="font-condensed text-[9px] uppercase tracking-[0.2em] text-[#444]">
                              {item.year}
                            </span>
                          </div>

                          <h3 className="font-condensed text-xl font-bold uppercase leading-tight">
                            {item.title}
                          </h3>

                          <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
                            <button
                              type="button"
                              onClick={() =>
                                startEdit(
                                  item.id,
                                  item.title,
                                  item.category,
                                )
                              }
                              className="flex flex-1 items-center justify-center gap-2 border border-white/10 px-3 py-2 font-condensed text-[9px] uppercase tracking-[0.15em] text-[#888] transition hover:border-[#4af600] hover:text-[#4af600]"
                            >
                              <Edit3 size={13} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={async () => {
                                const confirmed =
                                  window.confirm(
                                    `Delete "${item.title}"?`,
                                  );

                                if (confirmed) {
                                  await removeItem(
                                    item.id,
                                  );
                                }
                              }}
                              className="flex h-9 w-10 items-center justify-center border border-white/10 text-[#777] transition hover:border-red-500 hover:text-red-500"
                              title="Delete media"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MEDIA PREVIEW                                                       */}
      {/* ------------------------------------------------------------------ */}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden bg-[#111111]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-black/70 text-white transition hover:bg-[#4af600] hover:text-black"
            >
              <X size={17} />
            </button>

            <div className="max-h-[75vh] bg-black">
              {selectedItem.type === "image" ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="mx-auto max-h-[75vh] w-auto object-contain"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="mx-auto max-h-[75vh] w-full object-contain"
                />
              )}
            </div>

            <div className="p-6">
              <div className="mb-2 font-condensed text-[10px] uppercase tracking-[0.2em] text-[#4af600]">
                {selectedItem.category} /{" "}
                {selectedItem.year}
              </div>

              <h2 className="font-condensed text-3xl font-bold uppercase">
                {selectedItem.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CATEGORY MANAGER                                                    */}
      {/* ------------------------------------------------------------------ */}

      {categoryManagerOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          onClick={() =>
            setCategoryManagerOpen(false)
          }
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#111111]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <div className="mb-1 font-condensed text-[9px] uppercase tracking-[0.25em] text-[#4af600]">
                  Gallery Settings
                </div>

                <h2 className="font-condensed text-3xl font-bold uppercase">
                  Categories
                  <span className="text-[#4af600]">
                    .
                  </span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCategoryManagerOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-[#777] hover:border-[#4af600] hover:text-[#4af600]"
              >
                <X size={16} />
              </button>
            </div>

            {/* ADD CATEGORY */}
            <div className="border-b border-white/10 p-6">
              <div className="mb-3 font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                Add new category
              </div>

              <div className="flex gap-2">
                <input
                  value={newCategory}
                  onChange={(event) =>
                    setNewCategory(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCreateCategory();
                    }
                  }}
                  placeholder="e.g. Editorial Design"
                  className="min-w-0 flex-1 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-[#444] focus:border-[#4af600]"
                />

                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#4af600] text-black transition hover:bg-white"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* CATEGORY LIST */}
            <div className="p-6">
              <div className="mb-3 font-condensed text-[9px] uppercase tracking-[0.2em] text-[#555]">
                Existing categories
              </div>

              <div className="space-y-1">
                {categories.map(
                  (categoryName) => {
                    const isEditing =
                      editingCategory ===
                      categoryName;

                    return (
                      <div
                        key={categoryName}
                        className="group flex items-center gap-3 border-b border-white/5 py-3"
                      >
                        {isEditing ? (
                          <>
                            <input
                              autoFocus
                              value={
                                editingCategoryName
                              }
                              onChange={(event) =>
                                setEditingCategoryName(
                                  event.target.value,
                                )
                              }
                              onKeyDown={(event) => {
                                if (
                                  event.key ===
                                  "Enter"
                                ) {
                                  handleRenameCategory(
                                    categoryName,
                                  );
                                }
                              }}
                              className="min-w-0 flex-1 border-b border-[#4af600] bg-transparent py-1 text-sm text-white outline-none"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleRenameCategory(
                                  categoryName,
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#4af600]"
                            >
                              <Check size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingCategory(
                                  null,
                                );
                                setEditingCategoryName(
                                  "",
                                );
                              }}
                              className="flex h-8 w-8 items-center justify-center text-[#666]"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="min-w-0 flex-1 truncate font-condensed text-sm uppercase tracking-wide text-[#aaa]">
                              {categoryName}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingCategory(
                                  categoryName,
                                );
                                setEditingCategoryName(
                                  categoryName,
                                );
                              }}
                              className="flex h-8 w-8 items-center justify-center text-[#555] opacity-0 transition hover:text-[#4af600] group-hover:opacity-100"
                              title="Rename category"
                            >
                              <Pencil size={13} />
                            </button>

                            {categoryName !==
                              "Uncategorised" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteCategory(
                                    categoryName,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-[#555] opacity-0 transition hover:text-red-500 group-hover:opacity-100"
                                title="Delete category"
                              >
                                <Trash2
                                  size={13}
                                />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
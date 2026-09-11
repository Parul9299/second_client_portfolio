import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  addCategory,
  addGalleryItem,
  deleteCategory,
  deleteGalleryItem,
  getCategories,
  getGalleryItems,
  renameCategory,
  updateGalleryItem,
  type StoredGalleryItem,
} from "../utils/galleryDB";

export type GalleryMedia = StoredGalleryItem & {
  url: string;
};

export function useGalleryStorage() {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const objectUrls = useRef<string[]>([]);

  const revokeObjectUrls = () => {
    objectUrls.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    objectUrls.current = [];
  };

  const loadItems = useCallback(async () => {
    try {
      const storedItems = await getGalleryItems();

      revokeObjectUrls();

      const media = storedItems.map((item) => {
        const url = URL.createObjectURL(item.blob);

        objectUrls.current.push(url);

        return {
          ...item,
          url,
        };
      });

      setItems(media);
    } catch (error) {
      console.error(
        "Failed to load gallery media:",
        error,
      );
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const storedCategories = await getCategories();

      setCategories(storedCategories);
    } catch (error) {
      console.error(
        "Failed to load categories:",
        error,
      );
    }
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);

    await Promise.all([
      loadItems(),
      loadCategories(),
    ]);

    setLoading(false);
  }, [loadItems, loadCategories]);

  useEffect(() => {
    reload();

    return () => {
      revokeObjectUrls();
    };
  }, [reload]);

  /* ------------------------------------------------------------------------ */
  /* MEDIA                                                                    */
  /* ------------------------------------------------------------------------ */

  const addItem = async (
    file: File,
    title?: string,
    category = "Uncategorised",
  ) => {
    const filename = file.name.replace(/\.[^/.]+$/, "");

    const item: StoredGalleryItem = {
      id: crypto.randomUUID(),
      title: title?.trim() || filename,
      category: category || "Uncategorised",
      year: String(new Date().getFullYear()),
      type: file.type.startsWith("video/")
        ? "video"
        : "image",
      blob: file,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addGalleryItem(item);
    await loadItems();
  };

  const editItem = async (
    id: string,
    data: {
      title?: string;
      category?: string;
      year?: string;
    },
  ) => {
    await updateGalleryItem(id, {
      title:
        data.title?.trim() || "Untitled Project",
      category:
        data.category?.trim() || "Uncategorised",
      year:
        data.year?.trim() ||
        String(new Date().getFullYear()),
    });

    await loadItems();
  };

  const removeItem = async (id: string) => {
    await deleteGalleryItem(id);
    await loadItems();
  };

  /* ------------------------------------------------------------------------ */
  /* CATEGORIES                                                               */
  /* ------------------------------------------------------------------------ */

  const createCategory = async (name: string) => {
    await addCategory(name);
    await loadCategories();
  };

  const editCategory = async (
    oldName: string,
    newName: string,
  ) => {
    await renameCategory(oldName, newName);

    await Promise.all([
      loadCategories(),
      loadItems(),
    ]);
  };

  const removeCategory = async (name: string) => {
    await deleteCategory(name);

    await Promise.all([
      loadCategories(),
      loadItems(),
    ]);
  };

  return {
    items,
    categories,
    loading,

    addItem,
    editItem,
    removeItem,

    createCategory,
    editCategory,
    removeCategory,

    reload,
  };
}
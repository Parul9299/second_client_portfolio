export type StoredGalleryItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  type: "image" | "video";
  blob: Blob;
  createdAt: number;
  updatedAt: number;
};

const DB_NAME = "kabir-khan-gallery";
const DB_VERSION = 2;

const MEDIA_STORE = "media";
const CATEGORY_STORE = "categories";

export const DEFAULT_CATEGORIES = [
  "Brand Identity",
  "Art Direction",
  "Packaging",
  "Digital Design",
  "Campaign",
  "Photography",
  "Film",
  "Other",
];

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(MEDIA_STORE)) {
        db.createObjectStore(MEDIA_STORE, {
          keyPath: "id",
        });
      }

      if (!db.objectStoreNames.contains(CATEGORY_STORE)) {
        const categoryStore = db.createObjectStore(CATEGORY_STORE, {
          keyPath: "name",
        });

        DEFAULT_CATEGORIES.forEach((name) => {
          categoryStore.put({
            name,
            createdAt: Date.now(),
          });
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/* -------------------------------------------------------------------------- */
/* MEDIA                                                                      */
/* -------------------------------------------------------------------------- */

export async function getGalleryItems(): Promise<StoredGalleryItem[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readonly");
    const store = transaction.objectStore(MEDIA_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = (request.result as StoredGalleryItem[]).sort(
        (a, b) => b.createdAt - a.createdAt,
      );

      resolve(items);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addGalleryItem(
  item: StoredGalleryItem,
): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readwrite");
    const store = transaction.objectStore(MEDIA_STORE);

    store.put(item);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function updateGalleryItem(
  id: string,
  updates: Partial<
    Pick<StoredGalleryItem, "title" | "category" | "year">
  >,
): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readwrite");
    const store = transaction.objectStore(MEDIA_STORE);

    const request = store.get(id);

    request.onsuccess = () => {
      const existing = request.result as StoredGalleryItem | undefined;

      if (!existing) {
        reject(new Error("Gallery item not found"));
        return;
      }

      store.put({
        ...existing,
        ...updates,
        updatedAt: Date.now(),
      });
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function deleteGalleryItem(
  id: string,
): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readwrite");
    const store = transaction.objectStore(MEDIA_STORE);

    store.delete(id);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                 */
/* -------------------------------------------------------------------------- */

export type StoredCategory = {
  name: string;
  createdAt: number;
};

export async function getCategories(): Promise<string[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      CATEGORY_STORE,
      "readonly",
    );

    const store = transaction.objectStore(CATEGORY_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const categories = (request.result as StoredCategory[])
        .map((category) => category.name)
        .sort((a, b) => a.localeCompare(b));

      resolve(categories);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addCategory(
  name: string,
): Promise<void> {
  const cleanName = name.trim();

  if (!cleanName) {
    throw new Error("Category name cannot be empty.");
  }

  const existing = await getCategories();

  const duplicate = existing.some(
    (category) =>
      category.toLowerCase() === cleanName.toLowerCase(),
  );

  if (duplicate) {
    throw new Error("This category already exists.");
  }

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      CATEGORY_STORE,
      "readwrite",
    );

    const store = transaction.objectStore(CATEGORY_STORE);

    store.put({
      name: cleanName,
      createdAt: Date.now(),
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function renameCategory(
  oldName: string,
  newName: string,
): Promise<void> {
  const cleanName = newName.trim();

  if (!cleanName) {
    throw new Error("Category name cannot be empty.");
  }

  if (
    oldName.toLowerCase() === cleanName.toLowerCase()
  ) {
    return;
  }

  const categories = await getCategories();

  const duplicate = categories.some(
    (category) =>
      category.toLowerCase() === cleanName.toLowerCase(),
  );

  if (duplicate) {
    throw new Error("This category already exists.");
  }

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [CATEGORY_STORE, MEDIA_STORE],
      "readwrite",
    );

    const categoryStore =
      transaction.objectStore(CATEGORY_STORE);

    const mediaStore =
      transaction.objectStore(MEDIA_STORE);

    categoryStore.delete(oldName);

    categoryStore.put({
      name: cleanName,
      createdAt: Date.now(),
    });

    const mediaRequest = mediaStore.getAll();

    mediaRequest.onsuccess = () => {
      const items = mediaRequest.result as StoredGalleryItem[];

      items.forEach((item) => {
        if (item.category === oldName) {
          mediaStore.put({
            ...item,
            category: cleanName,
            updatedAt: Date.now(),
          });
        }
      });
    };

    mediaRequest.onerror = () => {
      reject(mediaRequest.error);
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function deleteCategory(
  name: string,
): Promise<void> {
  if (name === "Uncategorised") {
    throw new Error(
      "Uncategorised cannot be deleted.",
    );
  }

  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [CATEGORY_STORE, MEDIA_STORE],
      "readwrite",
    );

    const categoryStore =
      transaction.objectStore(CATEGORY_STORE);

    const mediaStore =
      transaction.objectStore(MEDIA_STORE);

    categoryStore.delete(name);

    const mediaRequest = mediaStore.getAll();

    mediaRequest.onsuccess = () => {
      const items = mediaRequest.result as StoredGalleryItem[];

      items.forEach((item) => {
        if (item.category === name) {
          mediaStore.put({
            ...item,
            category: "Uncategorised",
            updatedAt: Date.now(),
          });
        }
      });
    };

    mediaRequest.onerror = () => {
      reject(mediaRequest.error);
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
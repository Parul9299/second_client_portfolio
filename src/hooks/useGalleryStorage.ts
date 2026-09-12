import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface GalleryMedia {
  id: string;
  title: string;
  category: string;
  year: string;
  type: 'image' | 'video';
  url: string;
  storage_path: string;
  created_at: string;
  updated_at: string;
}

const DEFAULT_CATEGORY = 'Uncategorised';

export function useGalleryStorage() {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_categories')
      .select('name')
      .order('name');

    if (error) {
      console.error('Error loading categories:', error);
      return;
    }

    const names = data?.map((item) => item.name) ?? [];

    if (!names.includes(DEFAULT_CATEGORY)) {
      names.push(DEFAULT_CATEGORY);
    }

    setCategories(names);
  }, []);

  const loadItems = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading gallery items:', error);
      return;
    }

    const galleryItems: GalleryMedia[] = (data ?? []).map((item) => {
      const { data: publicUrlData } = supabase.storage
        .from('gallery-media')
        .getPublicUrl(item.storage_path);

      return {
        ...item,
        url: publicUrlData.publicUrl,
      };
    });

    setItems(galleryItems);
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
  }, [reload]);

  const addItem = async (
    file: File,
    title?: string,
    category = DEFAULT_CATEGORY
  ) => {
    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'file';

      const safeName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();

      const fileName = `${crypto.randomUUID()}-${safeName}.${extension}`;

      const storagePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-media')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const type = file.type.startsWith('video/')
        ? 'video'
        : 'image';

      const { error: databaseError } = await supabase
        .from('gallery_items')
        .insert({
          title: title?.trim() || 'Untitled Project',
          category: category || DEFAULT_CATEGORY,
          year: String(new Date().getFullYear()),
          type,
          storage_path: storagePath,
        });

      if (databaseError) {
        console.error('Database insert error:', databaseError);

        // Remove uploaded file if database insert fails
        await supabase.storage
          .from('gallery-media')
          .remove([storagePath]);

        throw databaseError;
      }

      await reload();
    } catch (error) {
      console.error('Failed to add gallery item:', error);
      throw error;
    }
  };

  const editItem = async (
    id: string,
    title: string,
    category: string
  ) => {
    const { error } = await supabase
      .from('gallery_items')
      .update({
        title: title.trim() || 'Untitled Project',
        category: category || DEFAULT_CATEGORY,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error editing gallery item:', error);
      throw error;
    }

    await reload();
  };

  const removeItem = async (id: string) => {
    try {
      const item = items.find((galleryItem) => galleryItem.id === id);

      if (!item) {
        throw new Error('Gallery item not found');
      }

      const { error: storageError } = await supabase.storage
        .from('gallery-media')
        .remove([item.storage_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }

      const { error: databaseError } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (databaseError) {
        console.error('Database delete error:', databaseError);
        throw databaseError;
      }

      await reload();
    } catch (error) {
      console.error('Failed to remove gallery item:', error);
      throw error;
    }
  };

  const createCategory = async (name: string) => {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    const { error } = await supabase
      .from('gallery_categories')
      .insert({
        name: cleanName,
      });

    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }

    await reload();
  };

  const editCategory = async (
    oldName: string,
    newName: string
  ) => {
    const cleanNewName = newName.trim();

    if (!cleanNewName || oldName === DEFAULT_CATEGORY) {
      return;
    }

    const { error: categoryError } = await supabase
      .from('gallery_categories')
      .update({
        name: cleanNewName,
      })
      .eq('name', oldName);

    if (categoryError) {
      console.error('Error renaming category:', categoryError);
      throw categoryError;
    }

    const { error: itemsError } = await supabase
      .from('gallery_items')
      .update({
        category: cleanNewName,
        updated_at: new Date().toISOString(),
      })
      .eq('category', oldName);

    if (itemsError) {
      console.error('Error updating category items:', itemsError);
      throw itemsError;
    }

    await reload();
  };

  const removeCategory = async (name: string) => {
    if (name === DEFAULT_CATEGORY) {
      return;
    }

    // Move existing gallery items into Uncategorised
    const { error: itemsError } = await supabase
      .from('gallery_items')
      .update({
        category: DEFAULT_CATEGORY,
        updated_at: new Date().toISOString(),
      })
      .eq('category', name);

    if (itemsError) {
      console.error('Error moving category items:', itemsError);
      throw itemsError;
    }

    const { error: categoryError } = await supabase
      .from('gallery_categories')
      .delete()
      .eq('name', name);

    if (categoryError) {
      console.error('Error deleting category:', categoryError);
      throw categoryError;
    }

    await reload();
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
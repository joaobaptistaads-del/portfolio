import { supabase } from './supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
}

/**
 * Upload image to Supabase Storage
 * @param file - File object to upload
 * @param bucket - Storage bucket name (default: 'images')
 * @param folder - Optional folder path within bucket
 * @returns Image URL and path
 */
export async function uploadImage(
  file: File,
  bucket: string = 'images',
  folder?: string
): Promise<ImageUploadResult> {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 5MB');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete image from Supabase Storage
 * @param path - File path in storage
 * @param bucket - Storage bucket name (default: 'images')
 */
export async function deleteImage(
  path: string,
  bucket: string = 'images'
): Promise<void> {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Convert file to base64 (fallback if Supabase Storage not configured)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

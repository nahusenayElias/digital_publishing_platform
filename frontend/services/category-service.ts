// services/category-service.ts
import { apiFetch } from './api';

export const CategoryService = {
  async getAll() {
    try {
      const res = await apiFetch('/api/categories');
      console.log('Categories API response:', res);
      
      // Handle different response structures
      if (Array.isArray(res)) {
        return res;
      } else if (res && res.data && Array.isArray(res.data)) {
        return res.data;
      } else if (res && res.categories && Array.isArray(res.categories)) {
        return res.categories;
      } else {
        console.warn('Unexpected categories response format:', res);
        return [];
      }
    } catch (error) {
      console.error('Error in CategoryService.getAll:', error);
      throw error;
    }
  },

  async getBySlug(slug: string) {
    const res = await apiFetch(`/api/categories/${slug}`);
    return res.data || res;
  },
};
import { apiFetch } from '@/lib/api';

export class CategoryService {
  static async getAll() {
    const res = await apiFetch('/api/categories');
    // Laravel may wrap data in `data` property
    return Array.isArray(res) ? res : res.data ?? [];
  }
}
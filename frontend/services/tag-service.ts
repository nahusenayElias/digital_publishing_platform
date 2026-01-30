import { apiFetch } from '@/lib/api';

export class TagService {
  static async getAll() {
    const res = await apiFetch('/api/tags');
    return Array.isArray(res) ? res : res.data ?? [];
  }
}
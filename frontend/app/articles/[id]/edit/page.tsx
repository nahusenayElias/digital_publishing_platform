'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

function EditArticleContent() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category_id: 0,
    status: 'draft'
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

  useEffect(() => {
    fetchArticle();
    fetchCategories();
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/articles/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!res.ok) throw new Error('Failed to fetch article');
      
      const data = await res.json();
      const article = data.data || data;
      
      setForm({
        title: article.title,
        content: article.content,
        category_id: article.category_id,
        status: article.status
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/api/articles/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to update article');

      alert('Article updated successfully!');
      router.push(`/articles/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          >
            <option value={0}>Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
            required
            disabled={submitting}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditArticlePage() {
  return (
    <AuthGuard>
      <EditArticleContent />
    </AuthGuard>
  );
}
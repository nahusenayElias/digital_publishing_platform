'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleService } from '@/services/article-service';
import { CategoryService } from '@/services/category-service';
import AuthGuard from '@/components/AuthGuard';

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface Article {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  category_id: number;
  created_at: string;
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category_id: 0,
    status: 'draft',
  });

  useEffect(() => {
    // Get user info
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use Promise.allSettled instead of Promise.all to handle individual failures
      const [articlesResult, categoriesResult] = await Promise.allSettled([
        ArticleService.myArticles(),
        CategoryService.getAll() // Make sure this matches your service method name
      ]);
      
      if (articlesResult.status === 'fulfilled') {
        setArticles(articlesResult.value || []);
      } else {
        console.error('Failed to fetch articles:', articlesResult.reason);
      }
      
      if (categoriesResult.status === 'fulfilled') {
        setCategories(categoriesResult.value || []);
      } else {
        console.error('Failed to fetch categories:', categoriesResult.reason);
      }
      
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!form.content.trim()) {
      alert('Please enter content');
      return;
    }
    
    if (!form.category_id) {
      alert('Please select a category');
      return;
    }

    setSubmitting(true);

    try {
      await ArticleService.create({
        title: form.title.trim(),
        content: form.content.trim(),
        category_id: form.category_id,
        status: form.status as 'draft' | 'pending',
      });
      
      alert(form.status === 'pending' ? 'Article submitted for review!' : 'Article saved as draft');
      
      // Reset form
      setForm({ title: '', content: '', category_id: 0, status: 'draft' });
      
      // Refresh articles
      const updatedArticles = await ArticleService.myArticles();
      setArticles(updatedArticles || []);
      
    } catch (error) {
      console.error('Failed to submit article:', error);
      alert('Failed to save article. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      published: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header with Welcome Message */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Author Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-semibold">{user?.name || 'Author'}</span>! 👋
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.is_admin && (
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Admin Panel
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Articles</p>
          <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-bold text-green-600">
            {articles.filter(a => a.status === 'published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">
            {articles.filter(a => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">
            {articles.filter(a => a.status === 'draft').length}
          </p>
        </div>
      </div>

      {/* Create Article Form */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Write New Article</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            disabled={submitting}
          />

          <select
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={form.category_id}
            onChange={e => setForm({ ...form, category_id: Number(e.target.value) })}
            disabled={submitting || categories.length === 0}
          >
            <option value={0}>Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea
            placeholder="Content"
            className="w-full border px-4 py-2 rounded-lg h-40 focus:ring-2 focus:ring-blue-500"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            disabled={submitting}
          />

          <div className="flex items-center gap-4">
            <select
              className="border px-4 py-2 rounded-lg"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              disabled={submitting}
            >
              <option value="draft">Save as Draft</option>
              <option value="pending">Submit for Review</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      </div>

      {/* My Articles Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Articles</h2>
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No articles yet. Write your first article above!</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="p-2">{a.title}</td>
                  <td className="p-2">{a.category?.name ?? '-'}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-sm ${getStatusBadge(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-2">{new Date(a.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
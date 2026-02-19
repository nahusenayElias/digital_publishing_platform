'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    fetchArticle();
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/api/articles/${params.id}`, {
        headers
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Article not found');
        }
        throw new Error('Failed to fetch article');
      }

      const data = await res.json();
      setArticle(data.data || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!confirm('Publish this article?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/admin/articles/${article?.id}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        alert('Article published successfully!');
        fetchArticle(); // Refresh the article
      }
    } catch (err) {
      alert('Failed to publish article');
    }
  };

  const handleReject = async () => {
    if (!confirm('Reject this article?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/admin/articles/${article?.id}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        alert('Article rejected successfully!');
        fetchArticle(); // Refresh the article
      }
    } catch (err) {
      alert('Failed to reject article');
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error || 'Article not found'}</p>
          <button 
            onClick={() => router.push('/articles')}
            className="mt-4 text-sm text-red-600 underline"
          >
            View all articles
          </button>
        </div>
      </div>
    );
  }

  const isAuthor = user?.id === article.user?.id;
  const isAdmin = user?.is_admin;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Status banner for pending articles */}
      {article.status === 'pending' && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>⏳ This article is pending review</span>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={handlePublish}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Publish
              </button>
              <button
                onClick={handleReject}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}

      {article.status === 'rejected' && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          ❌ This article has been rejected
        </div>
      )}

      {/* Article header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link 
            href={`/categories/${article.category?.slug}`}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
          >
            {article.category?.name}
          </Link>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">
            {new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/authors/${article.user?.id}`}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {article.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{article.user?.name}</p>
              <p className="text-sm text-gray-500">{article.user?.email}</p>
            </div>
          </Link>
          
          {(isAuthor || isAdmin) && (
            <div className="flex gap-2">
              <Link
                href={`/articles/${article.id}/edit`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        {article.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Article footer */}
      <div className="mt-12 pt-6 border-t">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            Last updated: {new Date(article.updated_at).toLocaleDateString()}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-blue-600 hover:text-blue-800"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  articles_count: number;
  articles: Array<{
    id: number;
    title: string;
    content: string;
    created_at: string;
    user: {
      name: string;
    };
  }>;
}

export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

  useEffect(() => {
    fetchCategory();
  }, [params.slug]);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories/${params.slug}`);
      
      if (!res.ok) {
        throw new Error('Category not found');
      }

      const data = await res.json();
      setCategory(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load category');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!category) return <div className="p-8">Category not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-gray-600 mb-4">{category.description}</p>
      )}
      <p className="text-sm text-gray-500 mb-8">
        {category.articles_count} articles in this category
      </p>

      <div className="space-y-6">
        {category.articles?.map(article => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <div className="border p-6 rounded hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>By {article.user?.name}</span>
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
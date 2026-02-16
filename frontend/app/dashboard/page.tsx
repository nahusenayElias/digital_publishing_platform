'use client';

import { useEffect, useState } from 'react';
import { ArticleService } from '@/services/article-service';
import { CategoryService } from '@/services/category-service';

export default function Dashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    category_id: 0,
    status: 'draft',
  });

  useEffect(() => {
    ArticleService.myArticles().then(setArticles);
    CategoryService.all().then(setCategories);
  }, []);

  const submit = async () => {
    await ArticleService.create(form as any);
    setForm({ title: '', content: '', category_id: 0, status: 'draft' });
    setArticles(await ArticleService.myArticles());
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Author Dashboard</h1>

      {/* CREATE ARTICLE */}
      <div className="border rounded p-6 space-y-4">
        <h2 className="text-xl font-semibold">New Article</h2>

        <input
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="w-full border px-3 py-2 rounded"
          value={form.category_id}
          onChange={e =>
            setForm({ ...form, category_id: Number(e.target.value) })
          }
        >
          <option value={0}>Select category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <textarea
          placeholder="Content"
          className="w-full border px-3 py-2 rounded h-40"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />

        <select
          className="border px-3 py-2 rounded"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="pending">Submit for Review</option>
        </select>

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Article
        </button>
      </div>

      {/* MY ARTICLES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Articles</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Title</th>
              <th>Status</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.title}</td>
                <td className="capitalize">{a.status}</td>
                <td>{a.category?.name ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
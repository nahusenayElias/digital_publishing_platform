// app/articles/page.tsx
import { ArticleService } from '@/services/article-service';

export default async function ArticlesPage() {
  const articles = await ArticleService.getAll();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Articles</h1>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}
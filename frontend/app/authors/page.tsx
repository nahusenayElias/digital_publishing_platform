import { AuthorService } from '@/services/author-service';

export default async function AuthorsPage() {
  const authors = await AuthorService.getAll();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Authors</h1>
      <ul className="space-y-2">
        {authors.map((a) => (
          <li key={a.id}>
            <span className="font-medium">{a.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
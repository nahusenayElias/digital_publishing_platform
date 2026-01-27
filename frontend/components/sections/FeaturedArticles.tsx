export function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: 'Building Modern Web Apps with Next.js',
      excerpt: 'Learn how to leverage Next.js for building high-performance applications.',
      category: 'Technology',
      author: 'Alex Johnson',
      date: 'Jan 15, 2024',
      readTime: '8 min',
    },
    {
      id: 2,
      title: 'Headless CMS: The Future of Content',
      excerpt: 'Explore how headless architecture is revolutionizing content delivery.',
      category: 'Technology',
      author: 'Sarah Miller',
      date: 'Jan 14, 2024',
      readTime: '6 min',
    },
    {
      id: 3,
      title: 'TypeScript Best Practices',
      excerpt: 'Essential patterns for writing maintainable TypeScript code.',
      category: 'Programming',
      author: 'Mike Chen',
      date: 'Jan 13, 2024',
      readTime: '10 min',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, tutorials, and insights from our expert authors.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="card group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-primary">{article.category}</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-outline px-8 py-3 rounded-lg">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}

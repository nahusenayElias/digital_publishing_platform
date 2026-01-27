export function Features() {
  const features = [
    {
      title: 'Headless Architecture',
      description: 'Separate content management from presentation for maximum flexibility.',
      icon: '🔌',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Blazing Fast Performance',
      description: 'Built with Next.js for optimal speed and SEO performance.',
      icon: '⚡',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Modern Tech Stack',
      description: 'Powered by Drupal 10, Next.js 15, TypeScript, and Tailwind CSS.',
      icon: '🛠️',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Developer Friendly',
      description: 'Clean APIs, comprehensive documentation, and easy customization.',
      icon: '👨‍💻',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'SEO Optimized',
      description: 'Automatic sitemaps, meta tags, and server-side rendering.',
      icon: '🔍',
      color: 'from-red-500 to-rose-500',
    },
    {
      title: 'Mobile First',
      description: 'Fully responsive design that works perfectly on all devices.',
      icon: '📱',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A modern publishing platform designed for performance, flexibility, and ease of use.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white text-xl mb-4`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-accent-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 rounded-full px-4 py-2 mb-8">
            <span className="text-sm font-medium">Modern Headless CMS Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Publish Amazing{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Content
            </span>
            <br />
            with <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Laravel + Next.js</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A powerful, decoupled publishing platform combining Laravel's robust content 
            management with Next.js's lightning-fast performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 rounded-lg text-lg">
              Get Started Free
            </button>
            <button className="btn-outline px-8 py-4 rounded-lg text-lg">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

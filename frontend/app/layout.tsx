import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Publisher | Modern Content Platform',
  description: 'A cutting-edge publishing platform built with Drupal and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50">
        <div className="min-h-screen flex flex-col">
          {/* Simple Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">Digital Publisher</h1>
                  </div>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Home</a>
                  <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Articles</a>
                  <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Categories</a>
                  <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">About</a>
                </nav>
                <button className="btn-primary px-6 py-2 rounded-lg">Subscribe</button>
              </div>
            </div>
          </header>
          
          <main className="flex-1">{children}</main>
          
          {/* Simple Footer */}
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>© {new Date().getFullYear()} Digital Publisher. Built with Drupal + Next.js</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

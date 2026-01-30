import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Publisher | Modern Content Platform',
  description: 'A cutting-edge publishing platform built with Laravel and Next.js',
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
          {/* Header with Navigation */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700" />
                    </div>
                    <div className="ml-3">
                      <h1 className="text-xl font-bold text-gray-900">Digital Publisher</h1>
                    </div>
                  </Link>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                    Home
                  </Link>
                  <Link href="/articles" className="text-gray-700 hover:text-primary-600 font-medium">
                    Articles
                  </Link>
                  <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
                    Categories
                  </Link>
                  <Link href="/authors" className="text-gray-700 hover:text-primary-600 font-medium">
                    Authors
                  </Link>
                  <Link href="/admin" className="text-gray-700 hover:text-primary-600 font-medium">
                    Admin
                  </Link>
                </nav>
                <Link href="/subscribe" className="btn-primary rounded-lg">
                  Subscribe
                </Link>
              </div>
            </div>
          </header>
          
          <main className="flex-1">{children}</main>
          
          {/* Footer */}
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700" />
                    <h3 className="ml-3 text-lg font-bold">Digital Publisher</h3>
                  </div>
                  <p className="text-gray-600">
                    Modern publishing platform built with Laravel and Next.js
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/articles" className="text-gray-600 hover:text-primary-600">All Articles</Link></li>
                    <li><Link href="/categories" className="text-gray-600 hover:text-primary-600">Categories</Link></li>
                    <li><Link href="/authors" className="text-gray-600 hover:text-primary-600">Authors</Link></li>
                    <li><Link href="/about" className="text-gray-600 hover:text-primary-600">About Us</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><Link href="/privacy" className="text-gray-600 hover:text-primary-600">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-gray-600 hover:text-primary-600">Terms of Service</Link></li>
                    <li><Link href="/cookies" className="text-gray-600 hover:text-primary-600">Cookie Policy</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-primary-600">Twitter</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-primary-600">LinkedIn</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-primary-600">GitHub</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-primary-600">Contact</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t text-center text-gray-600">
                <p>© {new Date().getFullYear()} Digital Publisher. Built with Laravel + Next.js</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
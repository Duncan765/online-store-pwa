import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <ShoppingBag className="w-6 h-6" />
            <span>Store</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, ShoppingBag, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Premium Products, <br />
            <span className="text-neutral-600">Delivered with Care</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of high-quality products.
            Browse, find what you love, and call us to complete your purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <a href="tel:+254796002379" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call to Buy
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/gallery" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-neutral-600">
                Carefully selected items that meet our high standards for quality and design
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-neutral-600">
                Simply call us to place your order - fast, easy, and personal service
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest Updates</h3>
              <p className="text-neutral-600">
                Stay informed with our blog featuring new arrivals and product guides
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl text-neutral-300 mb-8">
            Browse our collection and give us a call to place your order
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/gallery">
              View All Products
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

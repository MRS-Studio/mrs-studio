'use client';
// app/trending/page.js
import { useEffect, useState } from 'react';
import { getTrendingProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import { BsFire } from 'react-icons/bs';

export default function TrendingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingProducts(20).then((result) => {
      setProducts(result);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 page-enter">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BsFire className="text-gold text-2xl" />
          <h1 className="text-3xl text-brown dark:text-cream"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Trending Now
          </h1>
        </div>
        <div className="h-0.5 w-10 bg-gold" />
        <p className="text-brown/40 dark:text-cream/30 text-sm mt-3 font-heading italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          The most coveted pieces of the moment
        </p>
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}

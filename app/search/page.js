'use client';
// app/search/page.js
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { FiSearch } from 'react-icons/fi';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchProducts(query).then((results) => {
        setProducts(results);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl text-brown dark:text-cream mb-6"
          style={{ fontFamily: "'Cinzel', serif" }}>
          Search
        </h1>
        <SearchBar placeholder="Search for luxury products..." />
      </div>

      {query ? (
        <>
          {!loading && (
            <div className="mb-6">
              <p className="text-brown/50 dark:text-cream/30 text-sm font-sans"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                {products.length} result{products.length !== 1 ? 's' : ''} for{' '}
                <span className="text-gold">"{query}"</span>
              </p>
            </div>
          )}
          <ProductGrid products={products} loading={loading} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <FiSearch size={40} className="text-brown/20 dark:text-cream/10" />
          <p className="text-brown/40 dark:text-cream/30 font-heading italic text-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Begin your search
          </p>
          <p className="text-sm text-brown/30 dark:text-cream/20 font-sans max-w-xs"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            Discover luxury products curated just for you
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}

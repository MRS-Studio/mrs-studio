'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function CategoryPage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const isAll = decodedName === 'all';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(isAll ? 'All' : decodedName);

  useEffect(() => {
    loadProducts(isAll ? 'All' : decodedName);
  }, [name]);

  const loadProducts = async (cat) => {
    setLoading(true);

    try {
      const res = await fetch('/api/products');
      const data = await res.json();

      if (cat === 'All') {
        setProducts(data);
      } else {
        const filtered = data.filter(
          (p) => p.category?.toLowerCase() === cat.toLowerCase()
        );
        setProducts(filtered);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    }

    setLoading(false);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    loadProducts(cat);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 page-enter">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brown/50 dark:text-cream/40 hover:text-gold transition-colors text-sm mb-6 font-sans"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <FiArrowLeft size={15} />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1
          className="text-3xl text-brown dark:text-cream"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {activeCategory === 'All' ? 'All Categories' : activeCategory}
        </h1>

        <div className="h-0.5 w-10 bg-gold mt-2" />

        {!loading && (
          <p
            className="text-brown/40 dark:text-cream/30 text-sm mt-2 font-sans"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="mb-6">
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      </div>

      <ProductGrid products={products} loading={loading} />

    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const loadProducts = async (category = 'All') => {
    try {
      setLoading(true);

      let url = '/api/products';

      if (category !== 'All') {
        url = `/api/products?category=${category}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      // Ensure products is always an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCategoryChange = async (cat) => {
    setActiveCategory(cat);
    await loadProducts(cat);
  };

  return (
    <div className="min-h-screen">
      <HeroBanner />

      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-2xl text-brown dark:text-cream"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {activeCategory === 'All'
                ? 'Latest Arrivals'
                : activeCategory}
            </h2>

            <div className="h-0.5 w-12 bg-gold mt-1.5" />
          </div>
        </div>

        <div className="mb-6">
          <CategoryFilter
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        <ProductGrid
          products={Array.isArray(products) ? products : []}
          loading={loading}
        />
      </section>
    </div>
  );
}
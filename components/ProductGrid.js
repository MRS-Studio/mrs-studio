"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from "@/lib/products";

export default function ProductGrid({
  category = null,
  searchTerm = null,
  pageSize = 12,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const observerTarget = useRef(null);

  // Initial load
  useEffect(() => {
    const loadInitialProducts = async () => {
      setIsLoading(true);

      try {
        let result;

        if (searchTerm) {
          result = await searchProducts(searchTerm, null, pageSize);
        } else if (category) {
          result = await fetchProductsByCategory(category, null, pageSize);
        } else {
          result = await fetchProducts(null, pageSize);
        }

        const safeProducts = Array.isArray(result?.products)
          ? result.products
          : [];

        setProducts(safeProducts);
        setLastVisible(result?.lastVisible || null);
        setHasMore(safeProducts.length === pageSize);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProducts();
  }, [category, searchTerm, pageSize]);

  // Load more products
  const loadMore = useCallback(async () => {
    if (!hasMore || !lastVisible) return;

    try {
      let result;

      if (searchTerm) {
        result = await searchProducts(searchTerm, lastVisible, pageSize);
      } else if (category) {
        result = await fetchProductsByCategory(category, lastVisible, pageSize);
      } else {
        result = await fetchProducts(lastVisible, pageSize);
      }

      const safeProducts = Array.isArray(result?.products)
        ? result.products
        : [];

      setProducts((prev) => [...prev, ...safeProducts]);
      setLastVisible(result?.lastVisible || null);
      setHasMore(safeProducts.length === pageSize);
    } catch (error) {
      console.error("Error loading more products:", error);
    }
  }, [category, searchTerm, pageSize, lastVisible, hasMore]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div
        id="products"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max"
      >
        <AnimatePresence>
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger */}
      {hasMore && <div ref={observerTarget} className="h-10 mt-10" />}

      {/* No products */}
      {!isLoading && products.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-lg text-dark-brown opacity-60">
            No products found. Try adjusting your search.
          </p>
        </motion.div>
      )}

      {/* End message */}
      {!hasMore && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 mt-10"
        >
          <p className="text-sm text-dark-brown opacity-50">
            You've reached the end of our collection
          </p>
        </motion.div>
      )}
    </div>
  );
}
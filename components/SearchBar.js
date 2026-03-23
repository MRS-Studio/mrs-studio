'use client';
// components/SearchBar.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ placeholder = 'Search for products...' }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-brown/20 dark:border-cream/10 bg-white dark:bg-brown-dark/60 text-brown dark:text-cream placeholder-brown/30 dark:placeholder-cream/30 shadow-card focus:outline-none focus:border-gold focus:shadow-gold transition-all"
        style={{ fontFamily: "'Jost', sans-serif" }}
      />
      <button
        type="submit"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1 text-brown/40 hover:text-gold transition-colors"
      >
        <FiSearch size={18} />
      </button>
    </form>
  );
}

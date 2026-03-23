'use client';

import { useState, useEffect } from "react";

const PRESET_CATEGORIES = [
  "Fashion",
  "Beauty",
  "Home Decor",
  "Jewelry",
  "Accessories",
  "Skincare",
  "Lifestyle",
  "Tech",
  "Wellness",
  "Bags",
];

export default function CategoryFilter({ activeCategory = "All", onChange }) {
  const [categories, setCategories] = useState(["All", ...PRESET_CATEGORIES]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) return;

        const cats = await res.json();

        if (Array.isArray(cats) && cats.length > 0) {
          // remove duplicates
          const uniqueCats = [...new Set(cats)];
          setCategories(["All", ...uniqueCats]);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }

    loadCategories();
  }, []);

  const handleSelect = (cat) => {
    if (onChange) {
      onChange(cat === "All" ? null : cat);
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-2 min-w-max px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`px-4 py-1.5 rounded-full text-xs border whitespace-nowrap transition-all duration-200
              ${
                activeCategory === cat || (cat === "All" && !activeCategory)
                  ? "bg-gold text-brown-dark border-gold shadow-gold"
                  : "bg-transparent text-brown/60 dark:text-cream/50 border-brown/20 dark:border-cream/10 hover:border-gold/50"
              }`}
            style={{
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
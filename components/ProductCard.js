'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80";

  const imageSrc = imageError
    ? fallbackImage
    : product.imageURL || fallbackImage;

  const productId = product._id || product.id;

  const price =
    product.price !== undefined && product.price !== null
      ? typeof product.price === "number"
        ? `$${product.price}`
        : product.price.startsWith("$")
        ? product.price
        : `$${product.price}`
      : null;

  return (
    <Link href={`/product/${productId}`} className="block">
      <article className="product-card gold-border-glow bg-white dark:bg-brown-dark/80 rounded-2xl overflow-hidden cursor-pointer group relative shadow-card">
        
        {/* Image */}
        <div
          className="relative w-full bg-cream dark:bg-brown-dark"
          style={{ aspectRatio: product.aspectRatio || "3/4" }}
        >
          <Image
            src={imageSrc}
            alt={product.title || "Product"}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20" />

          {/* Hover button */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans bg-white/90 text-black shadow">
              <FiShoppingBag size={12} />
              View Product
            </span>
          </div>

          {/* Like button */}
          <button
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10
            ${
              liked
                ? "bg-red-500 text-white"
                : "bg-white/20 text-white hover:bg-white/40"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            <FiHeart size={13} fill={liked ? "white" : "none"} />
          </button>

          {/* Category */}
          {product.category && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs">
              {product.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          <h3 className="text-sm font-medium line-clamp-2 mb-2">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            {price ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                {price}
              </span>
            ) : (
              <span className="text-xs opacity-50 italic">
                Price on site
              </span>
            )}

            {product.clicks > 0 && (
              <span className="flex items-center gap-1 text-xs opacity-60">
                <BsStarFill size={9} />
                {product.clicks > 999
                  ? `${(product.clicks / 1000).toFixed(1)}k`
                  : product.clicks}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
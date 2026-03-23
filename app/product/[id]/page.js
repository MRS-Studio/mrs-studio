'use client';
// app/product/[id]/page.js

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct, trackClick } from '@/lib/products';
import { FiArrowLeft, FiShoppingBag, FiShare2 } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

export default function ProductPage() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {

    async function loadProduct() {
      if (!id) return;

      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();

  }, [id]);

  const handleBuyNow = async () => {
    if (!product?.affiliateLink) return;

    try {
      await trackClick(id);
    } catch (err) {
      console.error(err);
    }

    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {

    const url = window.location.href;

    try {

      if (navigator.share) {
        await navigator.share({
          title: product?.title,
          url
        });

      } else {

        await navigator.clipboard.writeText(url);
        toast.success('Link copied!');

      }

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="skeleton aspect-square rounded-3xl" />
          <div className="space-y-4">
            <div className="skeleton h-8 rounded-full w-3/4" />
            <div className="skeleton h-4 rounded-full w-1/2" />
            <div className="skeleton h-20 rounded-2xl" />
            <div className="skeleton h-12 rounded-full w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-5xl opacity-20">✦</div>
        <p className="text-brown/50 dark:text-cream/30 font-heading text-lg italic">
          Product not found
        </p>
        <Link href="/" className="btn-luxury px-6 py-2.5 rounded-full text-sm">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 page-enter">

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brown/50 dark:text-cream/40 hover:text-gold transition-colors text-sm mb-8 font-sans"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <FiArrowLeft size={15} />
        Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">

        {/* Product image */}
        <div className="relative rounded-3xl overflow-hidden bg-cream dark:bg-brown-dark/50 aspect-square shadow-luxury">

          <Image
            src={imageError ? '/placeholder.jpg' : (product.imageURL || '/placeholder.jpg')}
            alt={product.title || "product image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={() => setImageError(true)}
          />

        </div>

        {/* Product details */}
        <div className="flex flex-col justify-center">

          {/* Category */}
          {product?.category && (
            <span
              className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs tracking-widest uppercase rounded-full mb-4 self-start"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {product.category}
            </span>
          )}

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl text-brown dark:text-cream leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.title}
          </h1>

          {/* Price */}
          {product?.price && (
            <div className="mb-5">
              <span
                className="price-badge px-4 py-1.5 rounded-full text-lg inline-block"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {String(product.price).startsWith('$')
                  ? product.price
                  : `$${product.price}`}
              </span>
            </div>
          )}

          <div className="h-px bg-gold/20 mb-5" />

          {/* Description */}
          {product?.description && (
            <p
              className="text-brown/70 dark:text-cream/60 leading-relaxed text-base mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem'
              }}
            >
              {product.description}
            </p>
          )}

          {/* Click stats */}
          {product?.clicks > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-brown/40 dark:text-cream/30 mb-6">
              <BsStarFill size={10} className="text-gold/60" />
              <span style={{ fontFamily: "'Jost', sans-serif" }}>
                {product.clicks} people loved this
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">

            {product?.affiliateLink ? (
              <button
                onClick={handleBuyNow}
                className="btn-luxury flex items-center gap-2 px-8 py-3.5 rounded-full text-sm shadow-gold-lg"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <FiShoppingBag size={16} />
                Buy Now
              </button>
            ) : (
              <span className="text-sm text-brown/40 italic font-heading">
                Link not available
              </span>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-3.5 rounded-full text-sm border border-brown/20 dark:border-cream/10 text-brown/60 dark:text-cream/50 hover:border-gold hover:text-gold transition-all duration-200"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <FiShare2 size={14} />
              Share
            </button>

          </div>

          {/* Date */}
          {product?.createdAt && (
            <p
              className="mt-6 text-xs text-brown/25 dark:text-cream/20 font-sans"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Added{" "}
              {new Date(product.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
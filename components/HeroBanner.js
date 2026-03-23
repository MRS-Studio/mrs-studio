'use client';
// components/HeroBanner.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brown-gradient min-h-[480px] sm:min-h-[560px] flex items-center">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold/8 blur-3xl" />

      {/* Gold line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-gold/80 text-xs tracking-[0.25em] uppercase font-sans"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Curated Luxury
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>

          {/* Main title */}
          <h1
            className={`hero-title text-4xl sm:text-5xl md:text-6xl text-cream mb-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms', fontFamily: "'Cinzel', serif" }}
          >
            Discover
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #C9A227, #E8C547, #C9A227)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Exquisite
            </span>
            Selections
          </h1>

          {/* Subtitle */}
          <p
            className={`text-cream/60 text-base sm:text-lg mb-8 leading-relaxed font-heading italic transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '300ms', fontFamily: "'Cormorant Garamond', serif" }}
          >
            A curated gallery of premium products, handpicked for the discerning eye.
            Explore, discover, and indulge.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              href="#products"
              className="btn-luxury px-7 py-3 rounded-full text-sm inline-block"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Explore Now
            </Link>
            <Link
              href="/trending"
              className="px-7 py-3 rounded-full text-sm border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-all duration-200"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Trending ↗
            </Link>
          </div>
        </div>

        {/* Decorative right side */}
        <div className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 opacity-20">
          <div className="w-px h-20 bg-gold" />
          <div className="rotate-45 w-4 h-4 border border-gold" />
          <div className="w-px h-20 bg-gold" />
          <span className="text-gold text-xs tracking-[0.3em] -rotate-90 translate-x-6"
            style={{ fontFamily: "'Cinzel', serif" }}>MRS STUDIO</span>
        </div>
      </div>
    </section>
  );
}

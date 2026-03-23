// components/Footer.js
import Link from 'next/link';
import { GiDiamondTrophy } from 'react-icons/gi';
import { FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-brown-dark border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiDiamondTrophy className="text-gold text-xl" />
              <span className="text-cream font-display text-lg tracking-widest"
                style={{ fontFamily: "'Cinzel', serif" }}>
                MRS{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>STUDIO</span>
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed italic font-heading"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Curating the finest luxury products for the discerning eye.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold text-xs tracking-widest uppercase mb-4 font-sans"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/category/all', label: 'Categories' },
                { href: '/trending', label: 'Trending' },
                { href: '/search', label: 'Search' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/40 hover:text-gold transition-colors text-sm font-sans"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold text-xs tracking-widest uppercase mb-4 font-sans"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { Icon: FiInstagram, label: 'Instagram' },
                { Icon: FiTwitter, label: 'Twitter' },
                { Icon: FiMail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold transition-all duration-200 hover:shadow-gold"
                  aria-label={label}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/25 text-xs font-sans"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            © {new Date().getFullYear()} MRS Studio. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs font-sans italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Crafted with elegance
          </p>
        </div>
      </div>
    </footer>
  );
}

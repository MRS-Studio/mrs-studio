'use client';
// components/Navbar.js
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import {
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiLogOut,
} from 'react-icons/fi';
import { GiDiamondTrophy } from 'react-icons/gi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);
  const adminRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next.toString());
    document.documentElement.classList.toggle('dark', next);
  };

  // Close admin menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/category/all', label: 'Categories' },
    { href: '/trending', label: 'Trending' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brown-dark/98 backdrop-blur-md shadow-luxury'
          : 'bg-brown-dark'
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <GiDiamondTrophy className="text-gold text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span
              className="text-xl sm:text-2xl font-display font-semibold tracking-widest text-cream"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              MRS{' '}
              <span className="text-gold-gradient bg-gold-gradient bg-clip-text"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                STUDIO
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm tracking-widest uppercase font-sans font-medium ${
                  isActive(link.href)
                    ? 'text-gold'
                    : 'text-cream/80 hover:text-gold'
                }`}
                style={{ fontFamily: "'Jost', sans-serif", letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search bar (desktop) */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? 'w-52' : 'w-8'}`}>
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center w-full">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="input-luxury w-full px-3 py-1.5 text-sm rounded-full border border-gold/30 bg-brown-light/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                    autoFocus
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                  />
                  <button type="submit" className="ml-1 text-gold hover:text-gold-light">
                    <FiSearch size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-cream/70 hover:text-gold transition-colors p-1"
                  aria-label="Open search"
                >
                  <FiSearch size={18} />
                </button>
              )}
            </div>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="text-cream/70 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-gold/10"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>

            {/* Admin user menu */}
            <div className="relative" ref={adminRef}>
              {user ? (
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors p-1.5"
                >
                  <FiUser size={17} />
                  <span className="hidden sm:block text-xs font-sans" style={{ fontFamily: "'Jost', sans-serif" }}>Admin</span>
                </button>
              ) : (
                <Link
                  href="/admin/login"
                  className="text-cream/50 hover:text-gold transition-colors p-1.5"
                  aria-label="Admin login"
                >
                  <FiUser size={17} />
                </Link>
              )}

              {/* Admin dropdown */}
              {user && adminMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-brown-dark border border-gold/20 rounded-xl shadow-luxury overflow-hidden z-50 animate-slideUp">
                  <div className="px-4 py-3 border-b border-gold/10">
                    <p className="text-xs text-cream/50 font-sans">Logged in as</p>
                    <p className="text-sm text-gold font-sans truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-cream/80 hover:text-gold hover:bg-gold/10 transition-colors font-sans"
                    onClick={() => setAdminMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/add-product"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-cream/80 hover:text-gold hover:bg-gold/10 transition-colors font-sans"
                    onClick={() => setAdminMenuOpen(false)}
                  >
                    Add Product
                  </Link>
                  <button
                    onClick={async () => { await logout(); setAdminMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-300 hover:text-red-200 hover:bg-red-900/20 transition-colors font-sans border-t border-gold/10"
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-cream/70 hover:text-gold transition-colors p-1.5"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search luxury products..."
              className="flex-1 px-4 py-2 text-sm rounded-full border border-gold/30 bg-brown-light/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
            />
            <button type="submit" className="p-2 bg-gold rounded-full text-brown-dark hover:bg-gold-light transition-colors">
              <FiSearch size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gold/10 bg-brown-dark animate-slideUp">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3.5 text-sm tracking-widest uppercase text-cream/80 hover:text-gold hover:bg-gold/5 transition-colors border-b border-gold/5"
              style={{ fontFamily: "'Jost', sans-serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

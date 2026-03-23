'use client';
// app/admin/dashboard/page.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { fetchProducts, deleteProduct, getDashboardStats } from '@/lib/products';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiTrendingUp, FiLogOut } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalClicks: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 🚨 Auth guard
  useEffect(() => {
    if (!user) {
      router.push('/admin/login'); // redirect if not logged in
    } else {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, statsData] = await Promise.all([
        fetchProducts(1, 50),
        getDashboardStats(),
      ]);
      setProducts(prods);
      setStats(statsData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const productId = product._id.toString();
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    setDeletingId(productId);
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id.toString() !== productId));
      setStats((prev) => ({
        ...prev,
        totalProducts: prev.totalProducts - 1,
        totalClicks: prev.totalClicks - (product.clicks || 0),
      }));
      toast.success('Product deleted');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) return <p className="text-center py-16">Redirecting to login...</p>; // show loading text

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl text-brown dark:text-cream"
              style={{ fontFamily: "'Cinzel', serif" }}>
            Dashboard
          </h1>
          <p className="text-brown/40 dark:text-cream/30 text-sm mt-1 font-sans"
             style={{ fontFamily: "'Jost', sans-serif" }}>
            Welcome back, <span className="text-gold">{user.email}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/add-product"
            className="btn-luxury flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <FiPlus size={15} /> Add Product
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border border-brown/20 dark:border-cream/10 text-brown/50 dark:text-cream/40 hover:border-red-400 hover:text-red-400 transition-all"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <FiLogOut size={14} />
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {/* Total Products */}
        <div className="bg-white dark:bg-brown-dark/80 rounded-2xl p-5 border border-brown/5 dark:border-gold/10 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-brown/40 dark:text-cream/30 tracking-widest uppercase mb-2 font-sans"
                 style={{ fontFamily: "'Jost', sans-serif" }}>Products</p>
              <p className="text-3xl font-light text-brown dark:text-cream"
                 style={{ fontFamily: "'Cinzel', serif" }}>{stats.totalProducts}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
              <FiPackage size={16} className="text-gold" />
            </div>
          </div>
        </div>

        {/* Total Clicks */}
        <div className="bg-white dark:bg-brown-dark/80 rounded-2xl p-5 border border-brown/5 dark:border-gold/10 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-brown/40 dark:text-cream/30 tracking-widest uppercase mb-2 font-sans"
                 style={{ fontFamily: "'Jost', sans-serif" }}>Total Clicks</p>
              <p className="text-3xl font-light text-brown dark:text-cream"
                 style={{ fontFamily: "'Cinzel', serif" }}>{stats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
              <FiTrendingUp size={16} className="text-gold" />
            </div>
          </div>
        </div>

        {/* Top Product */}
        <div className="col-span-2 sm:col-span-1 bg-white dark:bg-brown-dark/80 rounded-2xl p-5 border border-brown/5 dark:border-gold/10 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-brown/40 dark:text-cream/30 tracking-widest uppercase mb-2 font-sans"
                 style={{ fontFamily: "'Jost', sans-serif" }}>Top Product</p>
              <p className="text-sm text-brown dark:text-cream/80 line-clamp-2 font-heading italic"
                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {products.sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0]?.title || '—'}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <BsStarFill size={14} className="text-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {/* ... rest of your table code stays same ... */}
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { GiDiamondTrophy } from 'react-icons/gi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) router.push('/admin/dashboard'); // auto redirect if already logged in
  }, [user, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    if (res.success) {
      toast.success('Welcome back, Admin!');
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  if (authLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#1a0f0a] px-4">
      <div className="relative w-full max-w-sm">
        <div className="bg-white dark:bg-brown-dark rounded-3xl shadow-luxury border border-brown/5 dark:border-gold/10 overflow-hidden">
          <div className="h-1 bg-gold-gradient" />
          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center mb-8">
              <GiDiamondTrophy className="text-gold text-4xl mb-3" />
              <h1 className="text-2xl text-brown dark:text-cream tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>MRS STUDIO</h1>
              <p className="text-brown/40 dark:text-cream/30 text-xs mt-1.5 tracking-widest uppercase font-sans" style={{ fontFamily: "'Jost', sans-serif" }}>Admin Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/30 dark:text-cream/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  required
                  className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl text-sm dark:bg-brown-dark/80 dark:border-gold/20 dark:text-cream dark:placeholder-cream/30"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>

              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/30 dark:text-cream/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="input-luxury w-full pl-10 pr-10 py-3 rounded-xl text-sm dark:bg-brown-dark/80 dark:border-gold/20 dark:text-cream dark:placeholder-cream/30"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown/30 dark:text-cream/30 hover:text-gold transition-colors">
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-luxury w-full py-3.5 rounded-xl text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {loading ? <>Authenticating...</> : 'Enter Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
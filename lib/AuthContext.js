'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // prevent redirect before checking localStorage
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      const userData = { email };
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      router.push('/admin/dashboard'); // redirect to dashboard
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    router.push('/admin/login'); // redirect to login
  };

  // Protect pages
  const requireAuth = () => {
    if (!user && !loading) router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
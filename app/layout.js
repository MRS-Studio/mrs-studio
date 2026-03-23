// app/layout.js
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'MRS Studio — Luxury Product Showcase',
    template: '%s | MRS Studio',
  },
  description:
    'Discover handpicked luxury products curated with elegance. MRS Studio is your Pinterest-style destination for premium finds.',
  keywords: ['luxury', 'products', 'fashion', 'lifestyle', 'curated', 'MRS Studio'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mrs-studio.vercel.app',
    siteName: 'MRS Studio',
    title: 'MRS Studio — Luxury Product Showcase',
    description: 'Discover handpicked luxury products curated with elegance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MRS Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MRS Studio — Luxury Product Showcase',
    description: 'Discover handpicked luxury products curated with elegance.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-cream dark:bg-[#1a0f0a] transition-colors duration-300">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 page-enter">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'toast-luxury',
              duration: 3000,
              style: {
                background: '#4E342E',
                color: '#F5E6D3',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                fontFamily: "'Jost', sans-serif",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

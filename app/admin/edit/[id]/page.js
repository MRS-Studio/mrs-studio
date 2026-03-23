'use client';
// app/admin/edit/[id]/page.js
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct, updateProduct } from '@/lib/products';
import { FiUpload, FiX, FiArrowLeft, FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Fashion', 'Beauty', 'Home Decor', 'Jewelry', 'Accessories',
  'Skincare', 'Lifestyle', 'Tech', 'Wellness', 'Bags', 'Other',
];

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    affiliateLink: '',
    imageURL: '',
  });

  useEffect(() => {
    if (id) {
      getProduct(id).then((data) => {
        if (data) {
          setForm({
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            price: data.price || '',
            affiliateLink: data.affiliateLink || '',
            imageURL: data.imageURL || '',
          });
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title required'); return; }
    setSubmitting(true);
    try {
      await updateProduct(id, form, imageFile);
      toast.success('Product updated!');
      router.push('/admin/dashboard');
    } catch {
      toast.error('Update failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 rounded-full mb-8" />
        <div className="space-y-4">
          <div className="skeleton h-60 rounded-2xl" />
          <div className="skeleton h-12 rounded-xl" />
          <div className="skeleton h-24 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 text-brown/50 dark:text-cream/40 hover:text-gold transition-colors text-sm mb-6 font-sans"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        <FiArrowLeft size={15} />
        Back to Dashboard
      </Link>

      <div className="bg-white dark:bg-brown-dark/80 rounded-3xl border border-brown/5 dark:border-gold/10 shadow-card overflow-hidden">
        <div className="h-1 bg-gold-gradient" />
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl text-brown dark:text-cream mb-7"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image */}
            <div>
              <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Product Image
              </label>

              {(imagePreview || form.imageURL) ? (
                <div className="relative rounded-2xl overflow-hidden bg-cream dark:bg-brown-dark" style={{ maxHeight: '280px' }}>
                  <img
                    src={imagePreview || form.imageURL}
                    alt="Preview"
                    className="w-full object-cover rounded-2xl"
                    style={{ maxHeight: '280px' }}
                  />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brown-dark/70 text-cream flex items-center justify-center hover:bg-red-500/80 transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                  <label className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-brown-dark/70 rounded-full text-cream text-xs cursor-pointer hover:bg-brown-dark/90 transition-colors">
                    <FiUpload size={12} />
                    Change
                    <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-brown/15 dark:border-gold/15 hover:border-gold/40 transition-colors cursor-pointer">
                  <FiUpload size={20} className="text-gold" />
                  <p className="text-sm text-brown/50 dark:text-cream/40 font-sans">Upload image</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </label>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                style={{ fontFamily: "'Jost', sans-serif" }}>Title *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange}
                className="input-luxury w-full px-4 py-3 rounded-xl text-sm"
                style={{ fontFamily: "'Jost', sans-serif" }} />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                style={{ fontFamily: "'Jost', sans-serif" }}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={3} className="input-luxury w-full px-4 py-3 rounded-xl text-sm resize-none"
                style={{ fontFamily: "'Jost', sans-serif" }} />
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                  style={{ fontFamily: "'Jost', sans-serif" }}>Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="input-luxury w-full px-4 py-3 rounded-xl text-sm appearance-none"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  <option value="">Select</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                  style={{ fontFamily: "'Jost', sans-serif" }}>Price</label>
                <input type="text" name="price" value={form.price} onChange={handleChange}
                  placeholder="$99" className="input-luxury w-full px-4 py-3 rounded-xl text-sm"
                  style={{ fontFamily: "'Jost', sans-serif" }} />
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-xs text-brown/50 dark:text-cream/40 tracking-widest uppercase mb-2 font-sans"
                style={{ fontFamily: "'Jost', sans-serif" }}>Product Link</label>
              <div className="relative">
                <FiLink size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown/30 dark:text-cream/30" />
                <input type="url" name="affiliateLink" value={form.affiliateLink} onChange={handleChange}
                  placeholder="https://..." className="input-luxury w-full pl-9 pr-4 py-3 rounded-xl text-sm"
                  style={{ fontFamily: "'Jost', sans-serif" }} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="btn-luxury flex-1 py-3.5 rounded-xl text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ fontFamily: "'Cinzel', serif" }}>
                {submitting ? (
                  <><div className="w-4 h-4 rounded-full border-2 border-brown/30 border-t-brown animate-spin" />Saving...</>
                ) : 'Save Changes'}
              </button>
              <Link href="/admin/dashboard"
                className="px-5 py-3.5 rounded-xl border border-brown/20 dark:border-cream/10 text-brown/50 dark:text-cream/40 text-sm hover:border-gold hover:text-gold transition-all text-center"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

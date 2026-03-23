'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const CATEGORIES = ['Fashion','Beauty','Home Decor','Jewelry','Accessories','Skincare','Lifestyle','Tech','Wellness','Bags','Other'];

export default function AddProduct() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({ title:'', description:'', category:'', price:'', affiliateLink:'' });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10*1024*1024) return toast.error('Image must be under 10MB');
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title) return toast.error('Title is required');
    if (!imageFile) return toast.error('Please upload an image');

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('affiliateLink', form.affiliateLink);
      formData.append('file', imageFile);

      const res = await fetch('/api/products', { method:'POST', body:formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add product');

      toast.success('Product added!');
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error(err.message || 'Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-[#1a0f0a] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 mb-6 text-brown/50 hover:text-gold font-medium">
          <FiArrowLeft size={18}/> Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-brown-dark rounded-3xl shadow-xl border border-brown/5 dark:border-gold/10 p-6 sm:p-10 space-y-6">
          {/* Image */}
          <div>
            <label className="block mb-2 font-medium text-brown dark:text-cream">Product Image *</label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-64 sm:h-72 object-cover rounded-xl"/>
                <button type="button" onClick={()=>{setImageFile(null);setImagePreview(null);}} className="absolute top-2 right-2 p-2 rounded-full bg-red-400/20 hover:bg-red-400 text-red-600">
                  <FiX size={18}/>
                </button>
              </div>
            ) : (
              <label className="block border-dashed border-2 border-brown/30 dark:border-cream/20 p-8 text-center cursor-pointer rounded-xl text-brown dark:text-cream hover:border-gold hover:bg-gold/10">
                Click to upload
                <input type="file" accept="image/*" className="hidden" onChange={handleImage}/>
              </label>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-brown dark:text-cream">Title *</label>
            <input type="text" name="title" placeholder="Product Title" value={form.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-brown/20 dark:border-gold/20 bg-white dark:bg-brown-dark text-brown dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"/>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-brown dark:text-cream">Description</label>
            <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-brown/20 dark:border-gold/20 bg-white dark:bg-brown-dark text-brown dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"/>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-brown dark:text-cream">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-brown/20 dark:border-gold/20 bg-white dark:bg-brown-dark text-brown dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="">Select Category</option>
                {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block mb-2 font-medium text-brown dark:text-cream">Price</label>
              <span className="absolute left-3 top-[38px] text-brown/50 dark:text-cream/50">₹</span>
              <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full pl-7 px-4 py-3 rounded-xl border border-brown/20 dark:border-gold/20 bg-white dark:bg-brown-dark text-brown dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"/>
            </div>
          </div>

          {/* Affiliate Link */}
          <div>
            <label className="block mb-2 font-medium text-brown dark:text-cream">Affiliate Link</label>
            <input type="url" name="affiliateLink" placeholder="https://example.com" value={form.affiliateLink} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-brown/20 dark:border-gold/20 bg-white dark:bg-brown-dark text-brown dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"/>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-gold text-white font-medium hover:bg-gold/90 disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? 'Uploading...' : 'Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
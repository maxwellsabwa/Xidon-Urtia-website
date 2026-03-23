import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAddProduct = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'pads',
    description: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      navigate('/login');
    }
  }, [user, role, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'description') {
      const words = value.trim().split(/\s+/);
      if (words.length > 40) {
        return; // Don't allow more than 40 words
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        })
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount = formData.description.trim() === '' ? 0 : formData.description.trim().split(/\s+/).length;

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!user || role !== 'admin') return null;

  return (
    <main className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/admin" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-ink/40 hover:text-royal-blue transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl luxury-shadow">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center">
              <Package className="text-royal-blue" size={24} />
            </div>
            <h1 className="text-3xl font-serif italic">Add New <span className="text-royal-blue">Product</span></h1>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block font-bold">Product Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Luxury Silk Pad"
                  className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block font-bold">Price (Ksh)</label>
                <input 
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block font-bold">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors appearance-none"
                  required
                >
                  <option value="pads">Sanitary Pads</option>
                  <option value="tissues">Tissues</option>
                  <option value="furniture">Furniture</option>
                  <option value="rugs">Rugs</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block font-bold">Stock Quantity</label>
                <input 
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block font-bold">Image URL</label>
              <input 
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-[10px] uppercase tracking-widest text-ink/40 block font-bold">Description</label>
                <span className={`text-[10px] font-bold ${wordCount > 35 ? 'text-red-500' : 'text-ink/30'}`}>
                  {wordCount} / 40 words
                </span>
              </div>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the product..."
                rows={4}
                className="w-full bg-cream/30 border border-black/5 rounded-xl py-3 px-4 outline-none focus:border-royal-blue transition-colors resize-none"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink transition-all shadow-lg mt-4 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : (
                <>
                  <Save size={20} />
                  Add Product to Store
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminAddProduct;

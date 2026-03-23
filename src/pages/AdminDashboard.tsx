import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Layout, 
  ShoppingBag, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  LogOut,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, role, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'content' | 'orders'>('products');
  
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [pageContent, setPageContent] = useState<any[]>([]);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      navigate('/login');
    }
  }, [user, role, loading, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchProducts();
      
      const unsubOrders = onSnapshot(query(collection(db, 'orders'), orderBy('createdAt', 'desc')), (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      const unsubContent = onSnapshot(collection(db, 'pageContent'), (snapshot) => {
        setPageContent(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubOrders();
        unsubContent();
      };
    }
  }, [role]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        setIsEditing(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdateContent = async (id: string) => {
    await updateDoc(doc(db, 'pageContent', id), editForm);
    setIsEditing(null);
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!user || role !== 'admin') return null;

  return (
    <main className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-2 block">Management</span>
            <h1 className="text-4xl font-serif">Admin <span className="italic text-royal-blue">Dashboard</span></h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-royal-blue transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-black/5">
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'products' ? 'text-royal-blue' : 'text-ink/40'}`}
          >
            Stock Management
            {activeTab === 'products' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal-blue" />}
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'content' ? 'text-royal-blue' : 'text-ink/40'}`}
          >
            Page Content
            {activeTab === 'content' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal-blue" />}
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'orders' ? 'text-royal-blue' : 'text-ink/40'}`}
          >
            Orders
            {activeTab === 'orders' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal-blue" />}
          </button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'products' && (
            <motion.div 
              key="products"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif italic">Inventory</h2>
                <Link 
                  to="/admin/add-product"
                  className="bg-royal-blue text-white px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-ink transition-all"
                >
                  <Plus size={16} /> Add Product
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-white p-6 rounded-2xl luxury-shadow flex flex-col md:flex-row items-center gap-6">
                    <img src={product.image} className="w-20 h-20 object-cover rounded-lg" alt="" />
                    <div className="flex-grow w-full">
                      {isEditing === product.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Name</label>
                            <input 
                              className="w-full border p-2 rounded-lg" 
                              value={editForm.name} 
                              onChange={e => setEditForm({...editForm, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Price (Ksh)</label>
                            <input 
                              className="w-full border p-2 rounded-lg" 
                              type="number"
                              value={editForm.price} 
                              onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Category</label>
                            <select 
                              className="w-full border p-2 rounded-lg" 
                              value={editForm.category} 
                              onChange={e => setEditForm({...editForm, category: e.target.value})}
                            >
                              <option value="pads">Pads</option>
                              <option value="tissues">Tissues</option>
                              <option value="furniture">Furniture</option>
                              <option value="rugs">Rugs</option>
                              <option value="candles">Candles</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Stock</label>
                            <input 
                              className="w-full border p-2 rounded-lg" 
                              type="number"
                              value={editForm.stock} 
                              onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Description (Max 40 words)</label>
                            <textarea 
                              className="w-full border p-2 rounded-lg resize-none" 
                              rows={3}
                              value={editForm.description} 
                              onChange={e => {
                                const words = e.target.value.trim().split(/\s+/);
                                if (words.length <= 40) {
                                  setEditForm({...editForm, description: e.target.value});
                                }
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{product.name}</h3>
                              <p className="text-xs uppercase tracking-widest text-royal-blue font-bold mb-2">{product.category}</p>
                            </div>
                            <p className="font-bold text-royal-blue">Ksh. {product.price.toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-ink/60 line-clamp-2 mb-2">{product.description}</p>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-ink/30">Stock: {product.stock}</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {isEditing === product.id ? (
                        <>
                          <button onClick={() => handleUpdateProduct(product.id)} className="p-3 bg-green-50 text-green-600 hover:bg-green-100 rounded-xl transition-colors"><Save size={20} /></button>
                          <button onClick={() => setIsEditing(null)} className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"><X size={20} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setIsEditing(product.id); setEditForm(product); }} className="p-3 bg-royal-blue/5 text-royal-blue hover:bg-royal-blue/10 rounded-xl transition-colors"><Edit2 size={20} /></button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"><Trash2 size={20} /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif italic">Page Content</h2>
              <div className="grid grid-cols-1 gap-6">
                {pageContent.map(content => (
                  <div key={content.id} className="bg-white p-8 rounded-3xl luxury-shadow">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold uppercase tracking-widest">{content.id} Page</h3>
                      <button 
                        onClick={() => { setIsEditing(content.id); setEditForm(content); }}
                        className="text-royal-blue font-bold text-xs uppercase tracking-widest"
                      >
                        Edit Section
                      </button>
                    </div>

                    {isEditing === content.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Hero Title</label>
                          <input 
                            className="w-full border p-3 rounded-xl" 
                            value={editForm.heroTitle} 
                            onChange={e => setEditForm({...editForm, heroTitle: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Hero Subtitle</label>
                          <input 
                            className="w-full border p-3 rounded-xl" 
                            value={editForm.heroSubtitle} 
                            onChange={e => setEditForm({...editForm, heroSubtitle: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-ink/40 mb-1 block">Hero Image URL</label>
                          <input 
                            className="w-full border p-3 rounded-xl" 
                            value={editForm.heroImage} 
                            onChange={e => setEditForm({...editForm, heroImage: e.target.value})}
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button onClick={() => handleUpdateContent(content.id)} className="bg-royal-blue text-white px-8 py-3 rounded-xl font-bold">Save Changes</button>
                          <button onClick={() => setIsEditing(null)} className="border border-ink/20 px-8 py-3 rounded-xl font-bold">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-sm font-bold mb-1">Title</p>
                          <p className="text-ink/60 mb-4">{content.heroTitle}</p>
                          <p className="text-sm font-bold mb-1">Subtitle</p>
                          <p className="text-ink/60">{content.heroSubtitle}</p>
                        </div>
                        <div className="aspect-video rounded-2xl overflow-hidden">
                          <img src={content.heroImage} className="w-full h-full object-cover" alt="" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif italic">Customer Orders</h2>
              <div className="bg-white rounded-3xl luxury-shadow overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-ink text-white text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                      <th className="p-6">Order ID</th>
                      <th className="p-6">Customer</th>
                      <th className="p-6">Items</th>
                      <th className="p-6">Total</th>
                      <th className="p-6">Status</th>
                      <th className="p-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-cream/50 transition-colors">
                        <td className="p-6 font-mono text-xs">{order.id.slice(0, 8)}</td>
                        <td className="p-6">
                          <p className="font-bold">{order.customerName}</p>
                          <p className="text-xs text-ink/40">{order.customerEmail}</p>
                        </td>
                        <td className="p-6 text-xs">{order.items.length} items</td>
                        <td className="p-6 font-bold">Ksh. {order.total}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-xs text-ink/40">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default AdminDashboard;

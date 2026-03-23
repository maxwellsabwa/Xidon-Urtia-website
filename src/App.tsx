/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './context/AuthContext';

const FirebaseInitializer = () => {
  const { role } = useAuth();

  React.useEffect(() => {
    // Seed products if empty and user is admin
    if (role === 'admin') {
      const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
        if (snapshot.empty) {
          const initialProducts = [
            { name: 'Ultra Soft Pads', price: '1500', category: 'pads', description: 'Premium comfort for daily use.', image: 'https://picsum.photos/seed/pads1/400/400', stock: 50, featured: true },
            { name: 'Luxury Facial Tissue', price: '800', category: 'tissues', description: 'Gentle on skin, tough on messes.', image: 'https://picsum.photos/seed/tissue1/400/400', stock: 100 },
            { name: 'Artisanal Coffee Table', price: '45000', category: 'furniture', description: 'Handcrafted oak wood table.', image: 'https://picsum.photos/seed/furniture1/400/400', stock: 5, featured: true },
            { name: 'Persian Style Rug', price: '12000', category: 'rugs', description: 'Elegant patterns for your living room.', image: 'https://picsum.photos/seed/rugs1/400/400', stock: 10 },
            { name: 'Scented Soy Candle', price: '2500', category: 'candles', description: 'Lavender and vanilla infusion.', image: 'https://picsum.photos/seed/candle1/400/400', stock: 30 }
          ];
          initialProducts.forEach(async (product) => {
            await addDoc(collection(db, 'products'), product);
          });
        }
      });
      return () => unsub();
    }
  }, [role]);

  return null;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FirebaseInitializer />
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route 
                  path="/pads" 
                  element={
                    <CategoryPage 
                      title="Feminine Pads" 
                      category="pads" 
                      description="Gentle, reliable, and ultra-soft. Our premium pads are designed for the modern woman who refuses to compromise on comfort or style."
                    />
                  } 
                />
                <Route 
                  path="/tissues" 
                  element={
                    <CategoryPage 
                      title="Luxury Tissues" 
                      category="tissues" 
                      description="Experience the softest touch. Our luxury tissues bring a moment of indulgence to your daily routine."
                    />
                  } 
                />
                <Route 
                  path="/furniture" 
                  element={
                    <CategoryPage 
                      title="Bespoke Furniture" 
                      category="furniture" 
                      description="Timeless pieces crafted for your sanctuary. Elevate your living space with our curated selection of artisanal furniture."
                    />
                  } 
                />
                <Route 
                  path="/rugs" 
                  element={
                    <CategoryPage 
                      title="Premium Rugs" 
                      category="rugs" 
                      description="Art underfoot. Our hand-woven rugs combine traditional craftsmanship with contemporary luxury design."
                    />
                  } 
                />
                <Route 
                  path="/candles" 
                  element={
                    <CategoryPage 
                      title="Scented Candles" 
                      category="candles" 
                      description="Transform your atmosphere. Our hand-poured soy candles are infused with rare botanicals to create an immersive sensory experience."
                    />
                  } 
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

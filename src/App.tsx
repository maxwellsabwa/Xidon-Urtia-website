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
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
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
                <Route path="/login" element={<Login />} />
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

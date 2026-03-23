import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

interface CategoryPageProps {
  title: string;
  category: Product['category'];
  description: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, category, description }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'products'), where('category', '==', category));
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      setLoading(false);
    });
    return () => unsub();
  }, [category]);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-royal-blue font-bold mb-4 block">Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">{title}</h1>
          <p className="text-ink/60 max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-ink/40 uppercase tracking-widest text-xs">Loading Collection...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-ink/40 uppercase tracking-widest text-xs">No products found in this category.</div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;

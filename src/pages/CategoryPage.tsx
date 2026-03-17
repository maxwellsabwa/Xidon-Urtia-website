import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface CategoryPageProps {
  title: string;
  category: Product['category'];
  description: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, category, description }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } else {
        // Mock data fallback
        setProducts([...Array(8)].map((_, i) => ({
          id: `${category}-${i}`,
          name: `${title} Item ${i + 1}`,
          price: `Ksh. ${(Math.random() * 10000 + 2000).toFixed(0)}`,
          image: `https://picsum.photos/seed/${category}-${i}/600/800`,
          category: category,
          description: `A premium ${category} product for your luxury lifestyle.`
        })));
      }
    });
    return () => unsub();
  }, [category, title]);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;

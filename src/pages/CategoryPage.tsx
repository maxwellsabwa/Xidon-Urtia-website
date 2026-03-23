import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface CategoryPageProps {
  title: string;
  category: Product['category'];
  description: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, category, description }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const filtered = data.filter((p: any) => p.category === category);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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

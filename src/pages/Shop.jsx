import React from 'react';
import ProductCard from '../components/products/ProductCard';
import { atorsData } from '../data/ators';

export default function Shop({ onAddToCart, searchQuery }) {
  const filteredAtors = atorsData.filter(ator => {
    const query = (searchQuery || '').toLowerCase();
    return (
      ator.name.toLowerCase().includes(query) ||
      ator.bnName.toLowerCase().includes(query) ||
      ator.type.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2 border-b border-gray-200/60 pb-3">
        Premium Attar Collection
      </h2>
      {filteredAtors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredAtors.map(ator => (
            <ProductCard key={ator.id} ator={ator} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm mt-6">
          <p className="font-sans text-gray-500 text-sm">
            দুঃখিত ভাই, আপনার খোঁজা আতরটি আমাদের কালেকশনে পাওয়া যায়নি। 😔
          </p>
        </div>
      )}
    </div>
  );
}
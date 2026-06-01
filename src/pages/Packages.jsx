import React from 'react';
import PackageCard from '../components/packages/PackageCard';
import { comboPackages } from '../data/ators';

export default function Packages({ onAddToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2 border-b border-gray-200/60 pb-3">
        Special Combo Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {comboPackages.map((pkg, idx) => (
          <PackageCard key={idx} pkg={pkg} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
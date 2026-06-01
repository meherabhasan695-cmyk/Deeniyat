import React from 'react';
import ProductCard from '../components/products/ProductCard';
import PackageCard from '../components/packages/PackageCard';
// 🌟 আপনার ডাটা ফাইলের অরিজিনাল 'atorsData' এবং 'comboPackages' ইম্পোর্ট করা হলো
import { atorsData, comboPackages } from '../data/ators'; 

export default function Shop({ onAddToCart, searchQuery = '' }) {
  const query = searchQuery.toLowerCase().trim();

  // ১. আতর ফিল্টারিং লজিক (atorsData অ্যারে ব্যবহার করে)
  const filteredAtors = atorsData ? atorsData.filter(ator => {
    return (
      ator.name.toLowerCase().includes(query) ||
      (ator.bnName && ator.bnName.toLowerCase().includes(query)) ||
      (ator.specialityEn && ator.specialityEn.toLowerCase().includes(query)) ||
      (ator.type && ator.type.toLowerCase().includes(query))
    );
  }) : [];

  // ২. কম্বো প্যাকেজ ফিল্টারিং লজিক
  const filteredPackages = comboPackages ? comboPackages.filter(pkg => {
    return (
      pkg.name.toLowerCase().includes(query) ||
      (pkg.bnName && pkg.bnName.toLowerCase().includes(query)) ||
      'package'.includes(query) ||
      'combo'.includes(query) ||
      'set'.includes(query)
    );
  }) : [];

  const hasResults = filteredAtors.length > 0 || filteredPackages.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 font-sans">
      
      {/* আতর কালেকশন সেকশন */}
      {(query === '' || filteredAtors.length > 0) && (
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-6 border-b border-gray-100 pb-3">
            {query === '' ? 'Premium Attar Collection' : 'Matching Attars'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredAtors.map((ator) => (
              <ProductCard key={ator.id || ator.name} ator={ator} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}

      {/* হোম পেজে সার্চ করলে ম্যাচিং কম্বো প্যাকেজ দেখানোর সেকশন */}
      {query !== '' && filteredPackages.length > 0 && (
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-6 border-b border-gray-100 pb-3">
            Matching Combo Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}

      {/* কোনো কিছু ম্যাচ না করলে নো রেজাল্ট মেসেজ */}
      {!hasResults && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 max-w-2xl mx-auto">
          <p className="text-sm text-zinc-600 font-bold">
            দুঃখিত ভাই, আপনার খোঁজা আতর বা প্যাকেজটি আমাদের কালেকশনে পাওয়া যায়নি। 😔
          </p>
        </div>
      )}

    </div>
  );
}
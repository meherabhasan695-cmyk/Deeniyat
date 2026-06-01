import React from 'react';
import PackageCard from '../components/packages/PackageCard';
import { comboPackages } from '../data/ators';

// এখানে searchQuery প্রপস রিসিভ করা হলো (ডিফল্ট হিসেবে খালি স্ট্রিং রাখা হয়েছে)
export default function Packages({ onAddToCart, searchQuery = '' }) {
  
  // কাস্টমারের দেওয়া সার্চ কুয়েরি অনুযায়ী কম্বো প্যাকেজ ফিল্টার করার লজিক
  const filteredPackages = comboPackages.filter(pkg => {
    const query = searchQuery.toLowerCase();
    return (
      pkg.name.toLowerCase().includes(query) ||
      (pkg.bnName && pkg.bnName.toLowerCase().includes(query)) ||
      // কাস্টমার 'package' বা 'set' লিখলেও যেন সব কম্বো চলে আসে
      'package'.includes(query) ||
      'set'.includes(query) ||
      // প্যাকেজের ভেতরের কোনো নির্দিষ্ট আতরের নাম লিখে সার্চ করলেও যেন ওই প্যাকেজটা শো করে
      (pkg.items && pkg.items.some(item => item.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2 border-b border-gray-200/60 pb-3">
        Special Combo Packages
      </h2>
      
      {/* ফিল্টার হওয়া প্যাকেজ সংখ্যা ০ এর বেশি হলে গ্রিড দেখাবে, না হলে নোটিশ দেখাবে */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredPackages.map((pkg, idx) => (
            <PackageCard key={idx} pkg={pkg} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm mt-6">
          <p className="font-sans text-gray-500 text-sm">
            দুঃখিত ভাই, এই নামে কোনো স্পেশাল কম্বো প্যাকেজ খুঁজে পাওয়া যায়নি। 😔
          </p>
        </div>
      )}
    </div>
  );
}
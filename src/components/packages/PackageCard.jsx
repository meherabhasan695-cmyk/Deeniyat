import React from 'react';
import { ShoppingCart, Gift } from 'lucide-react';

export default function PackageCard({ pkg, onAddPackageToCart }) {
  
  const handleAddPackageClick = () => {
    if (onAddPackageToCart) {
      onAddPackageToCart({
        id: pkg.id,
        name: pkg.name,
        finalPrice: pkg.price,
        selectedSize: 'Combo Set',
        image: pkg.image,
        isCombo: true
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
      <div className="space-y-4">
        {/* Package Banner Image */}
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
          <img 
            src={pkg.image} 
            alt={pkg.name} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
          />
        </div>

        {/* Package Header Meta */}
        <div className="flex items-start justify-between gap-2 text-left">
          <div>
            <h3 className="font-serif text-base font-bold text-zinc-900">{pkg.name}</h3>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mt-0.5">
              LUXURY SET
            </span>
          </div>
          <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 font-sans text-xs font-black px-2.5 py-1 rounded-lg">
            {pkg.price} BDT
          </span>
        </div>

        {/* Free Gift Batch */}
        {pkg.gift && (
          <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-xl p-2.5 flex items-center gap-2 text-left">
            <Gift className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="text-[10px] font-bold text-emerald-800 leading-none">
              {pkg.gift}
            </span>
          </div>
        )}

        {/* Included Attars Checklist Box */}
        <div className="bg-zinc-50 border border-gray-100 rounded-xl p-4 text-left">
          <ul className="space-y-2 text-xs text-zinc-700 font-medium">
            {pkg.items && pkg.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 🌟 ৩ নম্বর ইস্যু: প্রিমিয়াম প্যাকেজের ৬টা আইটেম হলে নিচে এই স্পেশাল নোটটি দেখাবে */}
          {pkg.selectNote && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 text-center">
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider italic">
                ✨ {pkg.selectNote} (যেকোনো ৫টি বেছে নিন)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5 pt-1">
        <button
          onClick={handleAddPackageClick}
          type="button"
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add Collection To Cart
        </button>
      </div>
    </div>
  );
}
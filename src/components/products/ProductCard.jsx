import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ ator, onAddToCart }) {
  const [size, setSize] = useState('3ml');
  const [bottleType, setBottleType] = useState('regular');

  // দাম হিসাব করার লজিক
  const basePrice = ator.prices[size] || 0;
  const extraCharge = bottleType === 'premium' ? 30 : 0;
  const finalPrice = basePrice + extraCharge;

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: ator.id,
        name: ator.name,
        selectedSize: size,
        selectedBottle: bottleType === 'premium' ? 'Premium Spray Bottle' : 'Regular Roll-on',
        finalPrice: finalPrice,
        image: ator.image
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
      <div className="space-y-4">
        {/* Product Image */}
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
          <img 
            src={ator.image} 
            alt={ator.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {ator.type && (
            <span className="absolute top-2 right-2 bg-zinc-900/90 text-white font-sans text-[9px] font-bold px-2 py-1 rounded-md tracking-wider">
              {ator.type}
            </span>
          )}
        </div>

        {/* Product Titles */}
        <div className="text-left">
          <h3 className="font-serif text-base font-bold text-zinc-900">{ator.name}</h3>
          <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{ator.bnName}</p>
          <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed line-clamp-3 md:line-clamp-none">
            {ator.specialityEn}
          </p>
        </div>
      </div>

      {/* Selectors and Action Buttons */}
      <div className="space-y-4 mt-5 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3 text-left">
          {/* Size Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs text-zinc-900 font-medium outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="3ml">3ml</option>
              <option value="6ml">6ml</option>
            </select>
          </div>

          {/* Bottle Type Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Bottle Type</label>
            <select 
              value={bottleType} 
              onChange={(e) => setBottleType(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs text-zinc-900 font-medium outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="regular">Regular Roll-on (+0 BDT)</option>
              {/* 🌟 এখানে বানান একদম নিখুঁত করে Premium Spray Bottle করে দেওয়া হলো */}
              <option value="premium">Premium Spray Bottle (+30 BDT)</option>
            </select>
          </div>
        </div>

        {/* Price and Add to Cart Action */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="font-sans text-base font-black text-emerald-800 shrink-0">
            {finalPrice} BDT
          </span>
          
          <button
            onClick={handleAddToCartClick}
            type="button"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-[10px] uppercase tracking-widest px-4 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
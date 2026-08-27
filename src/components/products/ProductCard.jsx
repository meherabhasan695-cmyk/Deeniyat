import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ ator, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('3ml');
  const [bottleType, setBottleType] = useState('Regular Roll-on');

  const basePrice = ator.prices?.[selectedSize] || ator.prices?.['3ml'] || 0;
  const sprayExtra = bottleType === 'Spray Bottle' ? 30 : 0;
  const finalPrice = basePrice + sprayExtra;

  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: `${ator.id}-${selectedSize}-${bottleType}`,
        name: ator.name,
        finalPrice: finalPrice,
        selectedSize: `${selectedSize} (${bottleType})`,
        image: ator.image,
        isCombo: false
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
      <div className="space-y-3.5">
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
          <img 
            src={ator.image} 
            alt={ator.name} 
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          {ator.type && (
            <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white font-sans text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
              {ator.type}
            </span>
          )}
        </div>

        <div className="text-left space-y-1">
          <h3 className="font-serif text-base font-bold text-zinc-900 leading-tight">{ator.name}</h3>
          <p className="text-[11px] text-zinc-500 font-medium">{ator.bnName}</p>
          <p className="text-[10px] text-zinc-600 line-clamp-2 leading-relaxed pt-1">
            {ator.specialityEn}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-left">
          <div>
            <label className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block mb-1">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="3ml">3ml</option>
              <option value="6ml">6ml</option>
            </select>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block mb-1">Bottle Type</label>
            <select
              value={bottleType}
              onChange={(e) => setBottleType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="Regular Roll-on">Regular Roll-on</option>
              <option value="Spray Bottle">Spray (+30৳)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between">
        <span className="font-sans text-sm font-black text-emerald-800">
          {finalPrice} BDT
        </span>

        <button
          onClick={handleAddClick}
          type="button"
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
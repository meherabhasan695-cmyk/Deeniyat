import React, { useState } from 'react';

export default function ProductCard({ ator, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('3ml');
  const [selectedBottle, setSelectedBottle] = useState('rollon');

  const currentPrice = ator.prices && ator.prices[selectedSize] ? ator.prices[selectedSize] : (ator.price || 0);
  const bottleAdditionalPrice = selectedBottle === 'premium' ? 30 : 0;
  const finalPrice = currentPrice + bottleAdditionalPrice;

  const handleAdd = () => {
    onAddToCart({
      ...ator,
      selectedSize,
      selectedBottle,
      finalPrice: finalPrice
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full min-h-[520px] p-4">
      {/* Top Content Group */}
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative pt-[100%] bg-gray-50 overflow-hidden rounded-lg">
          <img 
            src={ator.image} 
            alt={ator.name} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <span className="absolute top-2 right-2 bg-zinc-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
            {ator.type}
          </span>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-serif text-base font-bold text-zinc-850 leading-tight">{ator.name}</h3>
          <p className="font-sans text-xs text-gray-400 mt-0.5">{ator.bnName}</p>
        </div>

        <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3">
          {ator.specialityEn}
        </p>

        {/* Dropdowns */}
        <div className="space-y-2 pt-1 text-[11px]">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Size</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none text-gray-700 font-medium cursor-pointer"
            >
              {ator.prices && Object.keys(ator.prices).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Bottle Type</label>
            <select 
              value={selectedBottle} 
              onChange={(e) => setSelectedBottle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none text-gray-700 font-medium cursor-pointer"
            >
              <option value="rollon">Regular Roll-on (+0 BDT)</option>
              <option value="premium">Premium Bottle (+30 BDT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Price & Call to Action */}
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Price</span>
          <span className="text-sm font-extrabold text-emerald-700">{finalPrice} BDT</span>
        </div>
        
        {/* এখানে কাস্টম ব্রান্ড কালার বদলে স্ট্যান্ডার্ড emerald কালার দেওয়া হলো যা ১০০% ভিজিবল হবে */}
        <button
          onClick={handleAdd}
          type="button"
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
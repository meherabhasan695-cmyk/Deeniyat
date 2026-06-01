import React, { useState } from 'react';

export default function ProductCard({ ator, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('3ml');
  const [selectedBottle, setSelectedBottle] = useState('rollon');

  // সাইজ অনুযায়ী প্রাইস বের করা
  const currentPrice = ator.prices[selectedSize] || ator.price;

  const handleAdd = () => {
    onAddToCart({
      ...ator,
      selectedSize,
      selectedBottle,
      finalPrice: currentPrice
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full">
      {/* Product Image */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
        <img 
          src={ator.image} 
          alt={ator.name} 
          className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-brand-dark/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
          {ator.type}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div>
          <h3 className="font-serif text-base font-bold text-brand-dark leading-tight">{ator.name}</h3>
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
              className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-brand-primary text-gray-700 font-medium"
            >
              {Object.keys(ator.prices).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Bottle Type</label>
            <select 
              value={selectedBottle} 
              onChange={(e) => setSelectedBottle(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-brand-primary text-gray-700 font-medium"
            >
              <option value="rollon">Regular Roll-on (+0 BDT)</option>
              <option value="premium">Premium Bottle (+50 BDT)</option>
            </select>
          </div>
        </div>

        {/* Price & Action Button Row — এটি নিচে পুশ করার জন্য flex-grow এর পরে দেওয়া হয়েছে */}
        <div className="pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-brand-primary">{currentPrice} BDT</span>
          </div>
          <button
            onClick={handleAdd}
            className="bg-brand-primary hover:bg-brand-dark text-white font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg transition-colors shadow-3xs"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
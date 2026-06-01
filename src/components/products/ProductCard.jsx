import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ ator, onAddToCart }) {
  const [size, setSize] = useState('3ml');
  const [bottleType, setBottleType] = useState('regular');

  const basePrice = ator.prices[size];
  const finalPrice = bottleType === 'spray' ? basePrice + 30 : basePrice;

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Product Image */}
      <div className="aspect-square bg-brand-light relative overflow-hidden">
        {ator.image ? (
          <img 
            src={ator.image} 
            alt={ator.name} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 select-none font-serif">
            [ {ator.name} Image ]
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-serif text-xl font-semibold text-brand-dark">{ator.name}</h3>
            {/* Smell Type Badge */}
            <span className="bg-brand-light border border-brand-primary/20 text-brand-primary text-[10px] font-sans font-bold px-2 py-0.5 rounded-full mt-1">
              {ator.type}
            </span>
          </div>
          <p className="font-sans text-xs text-gray-400 mb-3">{ator.bnName}</p>
          
          {/* Bilingual Description Container */}
          <div className="space-y-2 bg-brand-light/50 p-2.5 rounded border border-gray-50 mb-4">
            {/* English Description */}
            <p className="font-sans text-[11px] text-gray-500 leading-relaxed italic border-b border-gray-200/50 pb-1.5">
              {ator.specialityEn}
            </p>
            {/* Bangla Description */}
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              {ator.specialityBn}
            </p>
          </div>
          
          {/* Selectors */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-[10px] font-sans font-bold uppercase text-gray-400 mb-1">Size</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs bg-brand-light focus:outline-none focus:border-brand-accent font-sans"
              >
                <option value="3ml">3ml</option>
                <option value="6ml">6ml</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-sans font-bold uppercase text-gray-400 mb-1">Bottle Type</label>
              <select 
                value={bottleType} 
                onChange={(e) => setBottleType(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs bg-brand-light focus:outline-none focus:border-brand-accent font-sans"
              >
                <option value="regular">Regular Roll-on (+0 BDT)</option>
                <option value="spray">Spray Bottle (+30 BDT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <span className="font-sans text-base font-bold text-brand-primary">{finalPrice} BDT</span>
          <button
            onClick={() => onAddToCart({ ...ator, selectedSize: size, selectedBottle: bottleType, finalPrice })}
            className="bg-brand-primary hover:bg-brand-dark text-white font-sans text-xs font-semibold px-3 py-2 rounded flex items-center space-x-1.5 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
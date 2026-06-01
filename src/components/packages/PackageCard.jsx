import React, { useState } from 'react';
import { ShoppingCart, Gift, CheckSquare, Square } from 'lucide-react';

export default function PackageCard({ pkg, onAddPackageToCart }) {
  // প্রিমিয়াম প্যাকেজের প্রথম ৫টি আইটেম ডিফল্ট সিলেক্টেড রাখার জন্য
  const isPremium = pkg.selectNote;
  const defaultSelected = pkg.items && pkg.items.length > 5 ? pkg.items.slice(0, 5) : (pkg.items || []);
  
  const [selectedAttars, setSelectedAttars] = useState(defaultSelected);
  const [customText, setCustomText] = useState(''); // কাস্টম প্যাকেজের টেক্সট ট্র্যাক করার জন্য

  // প্রিমিয়াম প্যাকেজের চেকবক্স টগল লজিক
  const handleToggleAttar = (item) => {
    if (selectedAttars.includes(item)) {
      setSelectedAttars(selectedAttars.filter(i => i !== item));
    } else {
      if (selectedAttars.length >= 5) {
        alert('ভাই, এই প্যাকেজে সর্বোচ্চ ৫টি আতর সিলেক্ট করতে পারবেন।');
        return;
      }
      setSelectedAttars([...selectedAttars, item]);
    }
  };

  const handleAddPackageClick = () => {
    // ১. প্রিমিয়াম প্যাকেজের ক্ষেত্রে ৫টি সিলেক্ট না থাকলে রেস্ট্রিকশন
    if (isPremium && selectedAttars.length !== 5) {
      alert(`ভাই, দয়া করে যেকোনো ৫টি আতর সিলেক্ট করুন। আপনি এখন ${selectedAttars.length}টি সিলেক্ট করেছেন।`);
      return;
    }

    // ২. কাস্টমাইজড প্যাকেজের ক্ষেত্রে কিছু না লিখলে অ্যালার্ট
    if (pkg.isCustom && !customText.trim()) {
      alert('ভাই, আপনার কাস্টমাইজড প্যাকেজে কোন কোন আতর নিতে চান, তা নিচের বক্সে লিখে দিন।');
      return;
    }

    if (onAddPackageToCart) {
      let detailsString = 'Combo Set';
      if (isPremium) {
        detailsString = `Premium 5 Items (${selectedAttars.join(', ')})`;
      } else if (pkg.isCustom) {
        detailsString = `Custom Order: ${customText.trim()}`;
      } else if (pkg.items) {
        detailsString = `Regular 5 Items (${pkg.items.join(', ')})`;
      }

      onAddPackageToCart({
        id: pkg.id,
        name: pkg.name,
        finalPrice: pkg.price,
        selectedSize: detailsString,
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

        {/* 🌟 ডাইনামিক কন্টেন্ট বক্স: প্যাকেজের টাইপ অনুযায়ী ভেতরে চেঞ্জ হবে */}
        <div className="bg-zinc-50 border border-gray-100 rounded-xl p-4 text-left">
          {pkg.isCustom ? (
            // ক. কাস্টমাইজড প্যাকেজ হলে সুন্দর একটা নোট ও ইনপুট বক্স দেখাবে
            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 block">
                Write Your Chosen Attars
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows="3"
                placeholder="আপনার পছন্দের আতরগুলোর নাম এখানে কমা (,) দিয়ে লিখুন... (যেমন: Armani, Cool Water)"
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 font-medium resize-none shadow-3xs"
              />
            </div>
          ) : (
            // খ. রেগুলার অথবা প্রিমিয়াম প্যাকেজ হলে লিস্ট দেখাবে
            <ul className="space-y-2.5 text-xs text-zinc-700 font-medium">
              {pkg.items && pkg.items.map((item, idx) => {
                const isSelected = selectedAttars.includes(item);

                return (
                  <li 
                    key={idx} 
                    onClick={() => isPremium && handleToggleAttar(item)}
                    className={`flex items-center gap-2.5 p-0.5 rounded-lg transition-all ${
                      isPremium ? 'cursor-pointer hover:bg-gray-200/70 select-none' : ''
                    }`}
                  >
                    {isPremium ? (
                      // প্রিমিয়াম প্যাকেজের জন্য চেকবক্স
                      isSelected ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 shrink-0" />
                      )
                    ) : (
                      // রেগুলার প্যাকেজের জন্য ফিক্সড ডট
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    )}
                    
                    <span className={isPremium && isSelected ? "font-bold text-emerald-900" : "text-zinc-700"}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* প্রিমিয়াম প্যাকেজের ইন্ডিকেটর নোট */}
          {isPremium && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 text-center">
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider italic">
                ✨ {pkg.selectNote} ({selectedAttars.length}/5 Selected)
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
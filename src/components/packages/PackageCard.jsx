import React, { useState } from 'react';
import { ShoppingCart, Gift, CheckSquare, Square } from 'lucide-react';
import { atorsData } from '../../data/ators'; 

export default function PackageCard({ pkg, onAddPackageToCart, onAddToCart }) {
  const isPremium = pkg.selectNote;
  
  // Premium package এর জন্য checkbox state
  const defaultPremiumSelected = pkg.items && pkg.items.length > 5 ? pkg.items.slice(0, 5) : (pkg.items || []);
  const [selectedPremiumAttars, setSelectedPremiumAttars] = useState(defaultPremiumSelected);

  // Customized Package এর জন্য 5টি ড্রপডাউন স্টেট
  const [customDropdowns, setCustomDropdowns] = useState([
    atorsData[0]?.name || '',
    atorsData[1]?.name || '',
    atorsData[2]?.name || '',
    atorsData[3]?.name || '',
    atorsData[4]?.name || ''
  ]);

  const handleCustomDropdownChange = (index, value) => {
    const updated = [...customDropdowns];
    updated[index] = value;
    setCustomDropdowns(updated);
  };

  const handleTogglePremiumAttar = (item) => {
    if (selectedPremiumAttars.includes(item)) {
      setSelectedPremiumAttars(selectedPremiumAttars.filter(i => i !== item));
    } else {
      if (selectedPremiumAttars.length >= 5) {
        alert('ভাই, এই প্যাকেজে সর্বোচ্চ ৫টি আতর সিলেক্ট করতে পারবেন।');
        return;
      }
      setSelectedPremiumAttars([...selectedPremiumAttars, item]);
    }
  };

  const handleAddPackageClick = () => {
    if (isPremium && selectedPremiumAttars.length !== 5) {
      alert(`ভাই, দয়া করে যেকোনো ৫টি আতর সিলেক্ট করুন। আপনি এখন ${selectedPremiumAttars.length}টি সিলেক্ট করেছেন।`);
      return;
    }

    let detailsString = 'Combo Set';
    if (isPremium) {
      detailsString = `Premium 5 Items (${selectedPremiumAttars.join(', ')})`;
    } else if (pkg.isCustom) {
      detailsString = `Customized 5 Items (${customDropdowns.join(', ')})`;
    } else if (pkg.items) {
      detailsString = `Regular 5 Items (${pkg.items.join(', ')})`;
    }

    // কার্ট আইটেম অবজেক্ট রেডি করা হলো
    const cartItemData = {
      id: pkg.id,
      name: pkg.name,
      finalPrice: pkg.price,
      selectedSize: detailsString,
      image: pkg.image,
      isCombo: true
    };

    // 🌟 ফাংশনের নাম নিয়ে যেন আর কোনো প্যাঁচ না লাগে, সেজন্য ২টি নামই হ্যান্ডেল করা হলো
    if (onAddToCart) {
      onAddToCart(cartItemData);
    } else if (onAddPackageToCart) {
      onAddPackageToCart(cartItemData);
    } else {
      console.error("Cart function not found in props!");
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
              LUXURY COMBO
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

        {/* Dynamic Items Content Box */}
        <div className="bg-zinc-50 border border-gray-100 rounded-xl p-4 text-left">
          {pkg.isCustom ? (
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-wider font-black text-zinc-500 block mb-1">
                Select Your 5 Custom Attars
              </label>
              {[0, 1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-400 w-4">{num + 1}.</span>
                  <select
                    value={customDropdowns[num]}
                    onChange={(e) => handleCustomDropdownChange(num, e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-zinc-900 focus:outline-none focus:border-emerald-700 cursor-pointer shadow-3xs"
                  >
                    {atorsData.map((ator) => (
                      <option key={ator.id} value={ator.name}>
                        {ator.name} ({ator.bnName})
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2.5 text-xs text-zinc-700 font-medium">
              {pkg.items && pkg.items.map((item, idx) => {
                const isSelected = selectedPremiumAttars.includes(item);

                return (
                  <li 
                    key={idx} 
                    onClick={() => isPremium && handleTogglePremiumAttar(item)}
                    className={`flex items-center gap-2.5 p-0.5 rounded-lg transition-all ${
                      isPremium ? 'cursor-pointer hover:bg-gray-100/70 select-none' : ''
                    }`}
                  >
                    {isPremium ? (
                      isSelected ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-300 shrink-0" />
                      )
                    ) : (
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

          {isPremium && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 text-center">
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider italic">
                ✨ {pkg.selectNote} ({selectedPremiumAttars.length}/5 Selected)
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
import React, { useState } from 'react';
import { ShoppingCart, Gift } from 'lucide-react';

const availableAttars = [
  { name: "Vampire Blood", bnName: "ভ্যাম্পায়ার ব্লাড", isPremium: true },
  { name: "Chocolate Musk", bnName: "চকোলেট মাস্ক", isPremium: false },
  { name: "Ahsas Al-Arabian", bnName: "এহসাস আল এরাবিয়ান", isPremium: true },
  { name: "Green Irani Bakhoor", bnName: "ইরানি বাখুর", isPremium: false },
  { name: "Cool Water", bnName: "কুল ওয়াটার", isPremium: true },
  { name: "Ameer Al Oud", bnName: "আমীর আল ওউদ", isPremium: true },
  { name: "White Oud", bnName: "হোয়াইট ওউদ", isPremium: true },
  { name: "Green Musk / Kasturi", bnName: "গ্রীন কস্তুরি", isPremium: true },
  { name: "Salma", bnName: "সালমা", isPremium: false },
  { name: "Jannatul Firdaus", bnName: "জান্নাতুল ফিরদাউস", isPremium: false }
];

const premiumNames = availableAttars.filter(a => a.isPremium).map(a => a.name);

export default function PackageCard({ pkg, onAddPackageToCart, onAddToCart }) {
  const [customDropdowns, setCustomDropdowns] = useState([
    availableAttars[0]?.name || '',
    availableAttars[1]?.name || '',
    availableAttars[2]?.name || '',
    availableAttars[3]?.name || '',
    availableAttars[4]?.name || ''
  ]);

  const handleCustomDropdownChange = (index, value) => {
    const updated = [...customDropdowns];
    updated[index] = value;
    setCustomDropdowns(updated);
  };

  const premiumCount = customDropdowns.filter(name => premiumNames.includes(name)).length;
  const isPremiumTier = pkg.isCustom && premiumCount > 3;
  const calculatedPrice = pkg.isCustom ? (isPremiumTier ? 350 : 330) : pkg.price;

  const handleAddPackageClick = () => {
    let detailsString = 'Combo Set';
    if (pkg.isCustom) {
      detailsString = `Customized (${customDropdowns.join(', ')}) [${isPremiumTier ? 'Premium Tier: 350 BDT' : 'Regular Tier: 330 BDT'}]`;
    } else if (pkg.items) {
      detailsString = `${pkg.name} (${pkg.items.join(', ')})`;
    }

    const cartItemData = {
      id: pkg.id,
      name: pkg.isCustom && isPremiumTier ? "Customized Package (Premium Tier)" : pkg.name,
      finalPrice: calculatedPrice,
      selectedSize: detailsString,
      image: pkg.image,
      isCombo: true
    };

    if (onAddToCart) {
      onAddToCart(cartItemData);
    } else if (onAddPackageToCart) {
      onAddPackageToCart(cartItemData);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
      <div className="space-y-4">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
          <img 
            src={pkg.image} 
            alt={pkg.name} 
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
          />
        </div>

        <div className="flex items-start justify-between gap-2 text-left">
          <div>
            <h3 className="font-serif text-base font-bold text-zinc-900">{pkg.name}</h3>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mt-0.5">
              LUXURY COMBO
            </span>
          </div>
          <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 font-sans text-xs font-black px-2.5 py-1 rounded-lg">
            {calculatedPrice} BDT
          </span>
        </div>

        {pkg.gift && (
          <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-xl p-2.5 flex items-center gap-2 text-left">
            <Gift className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="text-[10px] font-bold text-emerald-800 leading-none">
              {pkg.gift}
            </span>
          </div>
        )}

        <div className="bg-zinc-50 border border-gray-100 rounded-xl p-4 text-left">
          {pkg.isCustom ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-wider font-black text-zinc-500 block">
                  Select Your 5 Custom Attars
                </label>
                {isPremiumTier && (
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    Premium Tier (350 BDT)
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400">
                (★ চিহ্নিত ৩টির বেশি আতর নিলে ৩৫০৳ প্রযোজ্য হবে)
              </p>
              {[0, 1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-400 w-4">{num + 1}.</span>
                  <select
                    value={customDropdowns[num]}
                    onChange={(e) => handleCustomDropdownChange(num, e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-zinc-900 focus:outline-none focus:border-emerald-700 cursor-pointer shadow-3xs"
                  >
                    {availableAttars.map((ator, index) => (
                      <option key={index} value={ator.name}>
                        {ator.name} ({ator.bnName}) {ator.isPremium ? '★' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2.5 text-xs text-zinc-700 font-medium">
              {pkg.items && pkg.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

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
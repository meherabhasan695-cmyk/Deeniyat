import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose, cartItems = [], onRemoveItem, onCheckoutClick }) {
  const navigate = useNavigate();

  // ১. কোয়ান্টিটি নম্বর হিসাব করা: একই প্রোডাক্ট বারবার যোগ করলে আলাদা লাইন না বানিয়ে এক লাইনে কোয়ান্টিটি বাড়াবে
  const groupedCartItems = cartItems.reduce((acc, item) => {
    // প্রোডাক্টের নাম, সাইজ এবং বোতলের টাইপ মিলিয়ে একটি ইউনিক আইডি তৈরি করা হলো
    const itemKey = `${item.id || item.name}-${item.selectedSize || 'default'}-${item.selectedBottle || 'default'}`;
    
    if (acc[itemKey]) {
      acc[itemKey].quantity += 1;
      acc[itemKey].totalPrice += Number(item.finalPrice) || Number(item.price) || 0;
    } else {
      acc[itemKey] = {
        ...item,
        quantity: 1,
        totalPrice: Number(item.finalPrice) || Number(item.price) || 0
      };
    }
    return acc;
  }, {});

  const finalGroupedItems = Object.values(groupedCartItems);

  // সাবটোটাল হিসাব
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.finalPrice) || Number(item.price) || 0), 0);

  const handleCheckoutRedirect = () => {
    if (onCheckoutClick) onCheckoutClick(); // স্লাইডবার ক্লোজ করবে
    onClose(); 
    navigate('/checkout'); // সরাসরি চেকআউট রাউটে নিয়ে যাবে
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-zinc-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" /> Your Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {finalGroupedItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm text-gray-400 italic">Your cart is empty</p>
              </div>
            ) : (
              finalGroupedItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-zinc-50/50 p-4 rounded-xl border border-gray-100 shadow-3xs relative group">
                  <div className="min-w-0 flex-1 pr-4">
                    <h4 className="font-serif text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">
                      {item.isCustom || item.items 
                        ? 'Combo Package' 
                        : `${item.selectedSize || '3ml'} | Bottle: ${item.selectedBottle === 'premium' ? 'Premium' : 'Regular'}`
                      }
                    </p>
                    
                    {/* এই যে ভাই, নম্বর কাউন্টার ব্যাজ (যেমন: x1, x2) যা কাস্টমারকে পরিষ্কার সংখ্যা দেখাবে */}
                    <div className="mt-2 inline-flex items-center bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-100">
                      Qty: {item.quantity}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-sans text-xs font-black text-zinc-900">
                      {item.totalPrice} BDT
                    </span>
                    <button
                      onClick={() => onRemoveItem(cartItems.findIndex(c => (c.id === item.id || c.name === item.name) && c.selectedSize === item.selectedSize && c.selectedBottle === item.selectedBottle))}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Total & Checkout Trigger Container */}
          <div className="p-6 border-t border-gray-100 bg-white space-y-4">
            <div className="flex justify-between items-center font-sans">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Subtotal:</span>
              <span className="text-base font-black text-zinc-900">{subtotal} BDT</span>
            </div>

            {/* এই বাটনটি সাদা হয়ে যাচ্ছিল ভাই, এখন ডিরেক্ট text-white এবং ভেতরের লেখা ভিজিবল করা হলো */}
            <button
              onClick={handleCheckoutRedirect}
              disabled={cartItems.length === 0}
              type="button"
              className={`w-full py-4 rounded-xl font-sans font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center cursor-pointer ${
                cartItems.length === 0
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white active:translate-y-px'
              }`}
            >
              <span className="text-white block visibility-visible font-bold">Proceed To Checkout</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
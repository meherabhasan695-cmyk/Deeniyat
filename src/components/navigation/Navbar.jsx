import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg'; 

export default function Navbar({ cartItemsCount, onCartOpen, searchQuery, setSearchQuery }) {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-3xs w-full">
      {/* 🌟 মেনু বা সার্চবার যাতে মোবাইলে ভেঙে নিচে না যায়, সেজন্য flex-col এবং sm:flex-row করা হলো */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Top Row: Logo & Cart for Mobile */}
        <div className="w-full sm:w-auto flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center space-x-3 select-none group">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-xs border border-gray-100">
              <img 
                src="/logo.jpg" 
                alt="DEENIYAT Essence Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-extrabold tracking-widest text-emerald-900 block leading-tight group-hover:text-emerald-700 transition-colors">
                DEENIYAT
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-emerald-600 font-black block mt-0.5 pl-0.5">
                Essence
              </span>
            </div>
          </Link>

          {/* 🌟 মোবাইল স্ক্রিনের জন্য কার্ট বাটনটি এখানেও দিয়ে দেওয়া হলো যাতে সহজে দেখা যায় */}
          <button
            onClick={onCartOpen}
            type="button"
            className="p-2.5 md:hidden hover:bg-gray-50 rounded-xl relative text-zinc-700 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 text-emerald-700" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-sans font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* 🌟 Dynamic Search Bar - মোবাইল এবং পিসি সব জায়গায় ভিজিবল করা হলো (hidden তাড়িয়ে দেওয়া হয়েছে) */}
        {(location.pathname === '/' || location.pathname === '/shop' || location.pathname === '/packages') && (
          <div className="w-full sm:flex-1 sm:max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Premium Attars, Combos..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 transition-all font-medium"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>
        )}

        {/* Navigation Menu & PC Cart Trigger */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
          {/* 🌟 মেনু আইটেমগুলো মোবাইলেও স্ক্রল বা রো আকারে শো করবে (hidden মোড ডিলিট করা হয়েছে) */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs font-bold text-gray-600 font-sans overflow-x-auto py-1 max-w-full">
            <Link to="/" className="hover:text-emerald-700 transition-colors whitespace-nowrap">Home</Link>
            <Link to="/shop" className="hover:text-emerald-700 transition-colors whitespace-nowrap">Shop Attar</Link>
            <Link to="/packages" className="hover:text-emerald-700 transition-colors whitespace-nowrap">Combos</Link>
            <Link to="/about" className="hover:text-emerald-700 transition-colors whitespace-nowrap">Our Story</Link>
          </div>

          {/* PC Cart Trigger */}
          <button
            onClick={onCartOpen}
            type="button"
            className="hidden md:block p-2.5 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all text-zinc-700 relative cursor-pointer group active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-emerald-700 transition-colors" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-sans font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md z-50">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
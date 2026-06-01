import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartItemsCount, onCartOpen, searchQuery, setSearchQuery }) {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-3xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo - 🌟 public ফোল্ডারের লোগো ইমেজটি সরাসরি স্ট্রিং পাথে লক করা হলো */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 select-none group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-xs border border-gray-100">
            <img 
              src="/logo.jpg" 
              alt="DEENIYAT Essence Logo" 
              className="w-full h-full object-cover transform-none" 
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

        {/* Dynamic Search Bar */}
        {(location.pathname === '/' || location.pathname === '/shop' || location.pathname === '/packages') && (
          <div className="flex-1 max-w-md relative hidden md:block">
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

        {/* Navigation Menu & Cart Trigger */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-600 font-sans">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-emerald-700 transition-colors">Shop Attar</Link>
            <Link to="/packages" className="hover:text-emerald-700 transition-colors">Combos</Link>
            <Link to="/about" className="hover:text-emerald-700 transition-colors">Our Story</Link>
          </div>

          <button
            onClick={onCartOpen}
            type="button"
            className="p-2.5 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all text-zinc-700 relative cursor-pointer group active:scale-95"
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
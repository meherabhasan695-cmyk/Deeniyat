import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, onCartClick, searchQuery, onSearchChange }) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      <div className="bg-brand-dark text-white text-[11px] py-1.5 px-4 text-center tracking-wide hidden sm:block">
        🌟 100% Pure & Luxury Islamic Fragrances — Elevate Your Presence
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-3 select-none cursor-pointer">
              <img src="/logo.jpg" alt="Deeniyat Essence Logo" className="h-12 w-auto object-contain sm:h-14" />
              <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-brand-primary tracking-wider leading-none">
                  DEENIYAT
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-brand-accent tracking-widest uppercase mt-1 leading-none font-bold">
                  Essence
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-2 md:hidden">
              <button onClick={onCartClick} className="relative p-2 text-brand-primary">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl w-full mx-auto md:mx-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Premium Ators, Combos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-brand-light/60 border border-gray-200 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark font-medium placeholder-gray-400 shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-1.5 rounded-md">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </form>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6 text-sm font-semibold text-brand-dark tracking-wide">
              <Link to="/" className="hover:text-brand-accent transition-colors py-2">Home</Link>
              <Link to="/shop" className="hover:text-brand-accent transition-colors py-2">Shop Ator</Link>
              <Link to="/packages" className="hover:text-brand-accent transition-colors py-2">Combos</Link>
              <Link to="/about" className="hover:text-brand-accent transition-colors py-2">Our Story</Link>
            </div>
            <span className="h-5 w-px bg-gray-200"></span>
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-brand-primary hover:text-brand-accent hover:bg-brand-light rounded-full transition-all focus:outline-none"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-accent text-white font-sans text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
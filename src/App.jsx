import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import Footer from './components/layout/Footer';
import Shop from './pages/Shop';
import Packages from './pages/Packages';
import About from './pages/About';
import Checkout from './pages/Checkout';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveItem = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== indexToRemove));
  };

  // 🌟 বুলেটপ্রুফ প্রাইস ক্যালকুলেশন: Vampire Blood বা যেকোনো আতরের প্রাইস অবজেক্ট ডাইনামিকালি হ্যান্ডেল করবে
  const totalAmount = cart.reduce((sum, item) => {
    let itemPrice = 0;
    if (item.finalPrice !== undefined && item.finalPrice !== null) {
      itemPrice = Number(item.finalPrice);
    } else if (item.price && typeof item.price === 'object') {
      itemPrice = Number(item.price['3ml'] || item.price.regular || Object.values(item.price)[0] || 0);
    } else {
      itemPrice = Number(item.price || 0);
    }
    return sum + itemPrice;
  }, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar
        cartItemsCount={cart.length}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />} />
          <Route path="/packages" element={<Packages onAddToCart={handleAddToCart} searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout cartItems={cart} totalAmount={totalAmount} onClearCart={() => setCart([])} />} />
        </Routes>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => setIsCartOpen(false)}
      />
    </div>
  );
}
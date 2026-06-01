import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import Footer from './components/layout/Footer';
import Shop from './pages/Shop';
import Packages from './pages/Packages';
import About from './pages/About';
import Checkout from './pages/Checkout';

// মূল লেআউট র্যাপার
function Layout({ cart, setCart, isCartOpen, setIsCartOpen, searchQuery, setSearchQuery, children }) {
  return (
    <div className="bg-brand-light min-h-screen flex flex-col">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={(i) => setCart(cart.filter((_, idx) => idx !== i))}
        onCheckoutClick={() => { setIsCartOpen(false); }} // সাইডবার ক্লোজ করে চেকআউটে যাওয়ার জন্য নিরাপদ ট্র্রিগার
      />
    </div>
  );
}

// আলাদা চেকআউট পেজ র্যাপার
function CheckoutPage({ cart, setCart }) {
  const navigate = useNavigate();
  return (
    <div className="bg-brand-light min-h-screen flex flex-col">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => navigate('/')}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <main className="flex-1">
        <Checkout
          cartItems={cart}
          onBackToShop={() => navigate('/')}
          onOrderSuccess={() => { setCart([]); navigate('/'); }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (item) => setCart([...cart, item]);

  const layoutProps = {
    cart, setCart, isCartOpen, setIsCartOpen, searchQuery, setSearchQuery
  };

  return (
    <Routes>
      {/* Home Route: আতর শপ কালেকশন দেখাবে */}
      <Route path="/" element={
        <Layout {...layoutProps}>
          <Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        </Layout>
      } />
      
      {/* Shop Route */}
      <Route path="/shop" element={
        <Layout {...layoutProps}>
          <Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        </Layout>
      } />
      
      {/* Packages Route: এখন এই পেজেও আপনাদের মেইন সার্চ কুয়েরি পাস করে দেওয়া হলো, যেন প্যাকেজও সার্চ বারের মাধ্যমে ডাইনামিকালি ফিল্টার হতে পারে */}
      <Route path="/packages" element={
        <Layout {...layoutProps}>
          <Packages onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        </Layout>
      } />
      
      {/* About Route */}
      <Route path="/about" element={
        <Layout {...layoutProps}>
          <About />
        </Layout>
      } />
      
      {/* Checkout Route */}
      <Route path="/checkout" element={
        <CheckoutPage cart={cart} setCart={setCart} />
      } />
    </Routes>
  );
}
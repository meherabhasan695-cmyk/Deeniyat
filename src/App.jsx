import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import Footer from './components/layout/Footer';
import Shop from './pages/Shop';
import Packages from './pages/Packages';
import About from './pages/About';
import Checkout from './pages/Checkout';

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
      />
    </div>
  );
}

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
      <Route path="/" element={
        <Layout {...layoutProps}>
          <Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        </Layout>
      } />
      <Route path="/shop" element={
        <Layout {...layoutProps}>
          <Shop onAddToCart={handleAddToCart} searchQuery={searchQuery} />
        </Layout>
      } />
      <Route path="/packages" element={
        <Layout {...layoutProps}>
          <Packages onAddToCart={handleAddToCart} />
        </Layout>
      } />
      <Route path="/about" element={
        <Layout {...layoutProps}>
          <About />
        </Layout>
      } />
      <Route path="/checkout" element={
        <CheckoutPage cart={cart} setCart={setCart} />
      } />
    </Routes>
  );
}
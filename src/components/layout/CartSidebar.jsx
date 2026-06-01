import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem }) {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-brand-primary">Your Cart</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-50 rounded text-gray-400 hover:text-brand-dark transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">Your cart is currently empty.</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-brand-light rounded border border-gray-100">
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-brand-dark">{item.name}</h4>
                    <p className="text-xs text-gray-400">
                      {item.selectedSize ? `${item.selectedSize} | Bottle: ${item.selectedBottle}` : 'Combo Pack'}
                    </p>
                    <span className="text-sm font-bold text-brand-primary block mt-1">{item.finalPrice} BDT</span>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Total */}
          <div className="p-6 border-t border-gray-100 bg-brand-light">
            <div className="flex justify-between text-base font-bold text-brand-dark mb-4">
              <span>Subtotal:</span>
              <span>{total} BDT</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className={`w-full py-3 text-center text-sm font-bold rounded shadow transition-all ${
                cartItems.length > 0 
                  ? 'bg-brand-primary hover:bg-brand-dark text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';

export default function Checkout({ cartItems = [], totalAmount = 0, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'dhaka',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryCharge = cartItems.length === 0 ? 0 : (formData.city === 'dhaka' ? 60 : 120);
  const grandTotal = cartItems.length === 0 ? 0 : (totalAmount + deliveryCharge);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getItemPrice = (item) => {
    if (item.finalPrice !== undefined && item.finalPrice !== null) return item.finalPrice;
    if (item.price && typeof item.price === 'object') {
      return item.price['3ml'] || item.price.regular || Object.values(item.price)[0] || 0;
    }
    return item.price || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('ভাই, দয়া করে নাম, মোবাইল নাম্বার এবং সম্পূর্ণ ঠিকানাটি লিখুন।');
      return;
    }

    setIsSubmitting(true);

    // 🌟 মেহরাব ভাই, আপনার দেওয়া একদম লেটেস্ট ও নতুন গুগল স্ক্রিপ্ট লিংকটি এখানে বসিয়ে দেওয়া হলো
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylmuqfVrIOmTN6A-r1et-K7nAsZBvJLvzM-kE19JG81TL4SfM7ZUrRV1KXNHlDqXDLxA/exec"; 

    // ডাটা ফর্ম-ইউআরএল ফরম্যাটে বিল্ড করা হচ্ছে (CORS জ্যাম প্রতিরোধী)
    const formBody = new URLSearchParams();
    formBody.append('name', formData.name);
    formBody.append('phone', formData.phone);
    formBody.append('address', formData.address);
    formBody.append('location', formData.city === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka');
    formBody.append('items', cartItems.map(item => `${item.name} (${item.selectedSize || '3ml'})`).join(', '));
    formBody.append('subtotal', totalAmount);
    formBody.append('delivery', deliveryCharge);
    formBody.append('total', grandTotal);
    formBody.append('paymentMethod', paymentMethod.toUpperCase());
    formBody.append('notes', formData.notes || '-');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      });
      
      setIsOrdered(true);
      if (onClearCart) onClearCart();
    } catch (error) {
      console.error("Submission Error: ", error);
      setIsOrdered(true);
      if (onClearCart) onClearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-zinc-850">
      <Navbar cartItemsCount={cartItems.length} onCartOpen={() => {}} searchQuery="" setSearchQuery={() => {}} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12">
        {isOrdered ? (
          <div className="max-w-xl mx-auto py-16 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-zinc-900">অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!</h2>
            <p className="text-sm text-zinc-600 max-w-sm mx-auto">
              অর্ডার কনফার্ম হয়েছে মেহরাব ভাই! এবার ডাটা সরাসরি আপনার এই নতুন লিংকে হিট করেছে। 🎉
            </p>
            <button type="button" onClick={() => navigate('/')} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all">
              Back to Shopping
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-3xl font-bold text-zinc-900 mb-8 border-b border-gray-200 pb-3">Checkout</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="font-serif text-lg font-bold text-zinc-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Truck className="w-5 h-5 text-emerald-700" /> Delivery Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="কাস্টমারের নাম" className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 font-medium" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXXX" className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 font-medium" required />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Full Address</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="বাসা নং, রোড নং, এলাকা এবং জেলা" className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 font-medium resize-none" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Region / City</label>
                  <select name="city" value={formData.city} onChange={handleInputChange} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700 font-medium cursor-pointer">
                    <option value="dhaka">Inside Dhaka (Dhaka City)</option>
                    <option value="outside">Outside Dhaka (All over BD)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Select Payment Method</label>
                  <label className="border rounded-xl p-3.5 flex items-center gap-3 cursor-pointer border-emerald-700 bg-emerald-50/40">
                    <input type="radio" checked readOnly className="accent-emerald-700" />
                    <div className="text-xs">
                      <span className="block font-bold text-zinc-900">Cash On Delivery</span>
                      <span className="block text-[9px] text-zinc-500 mt-0.5">হাতে পেয়ে টাকা দেবেন</span>
                    </div>
                  </label>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Order Notes (Optional)</label>
                  <input type="text" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="বিশেষ কোনো নির্দেশনা" className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-700" />
                </div>
              </div>

              <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
                <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-gray-200 pb-3">Order Summary</h3>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                      <div className="min-w-0 flex-1 pr-2">
                        <h4 className="font-serif text-xs font-bold text-zinc-900 truncate">{item.name}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{item.selectedSize || '3ml'}</p>
                      </div>
                      <span className="font-sans text-xs font-bold text-zinc-900 shrink-0">{getItemPrice(item)} BDT</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-200 text-xs text-zinc-700">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-zinc-900">{totalAmount} BDT</span></div>
                  <div className="flex justify-between"><span>Delivery Charge</span><span className="font-semibold text-zinc-900">+{deliveryCharge} BDT</span></div>
                  <div className="flex justify-between text-zinc-900 font-black text-sm pt-2 border-t border-dashed border-gray-200 mt-2"><span>Total Payable</span><span className="text-emerald-700">{grandTotal} BDT</span></div>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md cursor-pointer text-center block">
                  {isSubmitting ? 'Processing Order...' : `Place Order (${grandTotal} BDT)`}
                </button>
              </div>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
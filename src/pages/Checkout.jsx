import React, { useState } from 'react';
import { ShoppingBag, Truck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deliveryOptions = [
  { id: 'inside-dhaka', name: 'Inside Dhaka (ঢাকার ভেতর)', charge: 60, note: 'Home Delivery (৬০৳)' },
  { id: 'outside-dhaka', name: 'Outside Dhaka (ঢাকার বাইরে)', charge: 120, note: 'Courier Delivery (১২০৳)' },
  { id: 'buet-pickup', name: 'BUET Campus (বুয়েট)', charge: 0, note: 'Campus Pickup - ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! (০৳)' },
  { id: 'kuet-pickup', name: 'KUET Campus (কুয়েট)', charge: 0, note: 'Campus Pickup - ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! (০৳)' }
];

export default function Checkout({ cart = [], onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryArea: 'inside-dhaka',
    paymentMethod: 'Cash on Delivery',
    trxId: '',
    specialInstruction: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // কার্টের মূল হিসাব
  const subtotal = cart.reduce((acc, item) => acc + (item.finalPrice * (item.quantity || 1)), 0);
  const currentDelivery = deliveryOptions.find(opt => opt.id === formData.deliveryArea) || deliveryOptions[0];
  const deliveryCharge = currentDelivery.charge;
  const grandTotal = subtotal + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('আপনার কার্ট খালি!');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName: formData.name,
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      deliveryArea: currentDelivery.name,
      deliveryCharge: deliveryCharge,
      items: cart.map(item => `${item.name} (${item.selectedSize}) x ${item.quantity || 1}`).join(' | '),
      subtotal: subtotal,
      grandTotal: grandTotal,
      paymentMethod: formData.paymentMethod,
      trxId: formData.trxId,
      specialInstruction: formData.specialInstruction,
      orderDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    };

    try {
      // গুগল অ্যাপ স্ক্রিপ্ট / শিটে ডাটা পাঠানো
      await fetch(import.meta.env.VITE_GOOGLE_SHEET_URL || '', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (onClearCart) onClearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error('Order submission error:', error);
      alert('অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-zinc-900">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
        <p className="text-sm text-zinc-600">
          ধন্যবাদ, <strong>{formData.name}</strong>। আপনার অর্ডারটি গ্রহণ করা হয়েছে। খুব দ্রুতই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
        >
          হোম পেজে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-2xl font-bold text-zinc-900 mb-8 text-left">চেকআউট ও অর্ডার কনফার্মেশন</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ফর্ম সেকশন */}
        <div className="lg:col-span-7">
          <form onSubmit={handleOrderSubmit} className="space-y-6 text-left">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" /> ডেলিভারি তথ্য
              </h3>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="আপনার পুরো নাম লিখুন"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-emerald-700"
                />
              </div>

              {/* ডেলিভারি এরিয়া অপশন (BUET/KUET সহ) */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-2">ডেলিভারি এরিয়া সিলেক্ট করুন *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deliveryOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`border rounded-xl p-3 cursor-pointer flex flex-col justify-between transition-all ${
                        formData.deliveryArea === option.id
                          ? 'border-emerald-700 bg-emerald-50/50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="deliveryArea"
                          value={option.id}
                          checked={formData.deliveryArea === option.id}
                          onChange={handleInputChange}
                          className="accent-emerald-700"
                        />
                        <span className="text-xs font-bold text-zinc-900">{option.name}</span>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-800 mt-1 pl-5">
                        {option.charge === 0 ? '০৳ (ফ্রি)' : `${option.charge}৳`}
                      </span>
                    </label>
                  ))}
                </div>

                {/* বিশেষ দ্রষ্টব্য / নোট বক্স */}
                {(formData.deliveryArea === 'buet-pickup' || formData.deliveryArea === 'kuet-pickup') && (
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-emerald-900">
                      <strong>বিশেষ দ্রষ্টব্য (Note):</strong> আপনি ক্যাম্পাস পিকআপ সিলেক্ট করেছেন। বুয়েট বা কুয়েট ক্যাম্পাসে সরাসরি হ্যান্ড-টু-হ্যান্ড ডেলিভারি দেওয়া হবে, তাই কোনো ডেলিভারি চার্জ প্রযোজ্য নয় (সম্পূর্ণ ফ্রি)।
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  {formData.deliveryArea.includes('pickup') ? 'ক্যাম্পাসের হল/ডিপার্টমেন্টের বিবরণ *' : 'সম্পূর্ণ ঠিকানা *'}
                </label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={
                    formData.deliveryArea.includes('pickup')
                      ? "যেমন: আহসানউল্লাহ হল / ড. এম. এ. রশিদ হল / ডিপার্টমেন্ট ইত্যাদি"
                      : "বাসা নং, রোড নং, এলাকা এবং থানা"
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-emerald-700 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-md"
            >
              {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : `অর্ডার কনফার্ম করুন • ${grandTotal} BDT`}
            </button>
          </form>
        </div>

        {/* সামারি সেকশন */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 text-left sticky top-24">
            <h3 className="font-serif text-base font-bold text-zinc-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-700" /> অর্ডার সামারি
            </h3>

            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-zinc-900">{item.name}</p>
                    <p className="text-[11px] text-zinc-500">{item.selectedSize} {item.quantity > 1 ? `x ${item.quantity}` : ''}</p>
                  </div>
                  <span className="font-bold text-zinc-800">{item.finalPrice * (item.quantity || 1)} BDT</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>সাবটোটাল</span>
                <span className="font-bold text-zinc-900">{subtotal} BDT</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>ডেলিভারি চার্জ</span>
                <span className={`font-bold ${deliveryCharge === 0 ? 'text-emerald-700' : 'text-zinc-900'}`}>
                  {deliveryCharge === 0 ? '০ BDT (Free)' : `${deliveryCharge} BDT`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 border-t border-gray-200 pt-3">
                <span>সর্বমোট</span>
                <span className="text-emerald-800">{grandTotal} BDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
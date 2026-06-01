import React, { useState } from 'react';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzXd27xJnsC2U8bpEntjCquJxpbVQ7CfVnD64RhvmeiUbrNbOB4C3VJ9xqRCTSfD3NQ2g/exec';

export default function Checkout({ cartItems, onBackToShop, onOrderSuccess }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingLocation, setShippingLocation] = useState('inside');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsTotal = cartItems.reduce((total, item) => total + (item.finalPrice || item.price), 0);
  const shippingCharge = shippingLocation === 'inside' ? 40 : 80;
  const totalAmount = itemsTotal + shippingCharge;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod !== 'cod' && (!senderNumber || !trxId)) {
      alert('Please fill up your payment number and Transaction ID!');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name: fullName,
      phone: phone,
      address: address,
      location: shippingLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      items: cartItems.map(item => `${item.name} (${item.finalPrice || item.price} BDT)`).join(', '),
      subtotal: itemsTotal,
      delivery: shippingCharge,
      total: totalAmount,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'bkash' ? 'bKash' : 'Nagad',
      senderNumber: senderNumber || '-',
      trxId: trxId || '-',
    };

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error('Sheet save error:', err);
    }

    setIsSubmitting(false);
    alert('Alhamdulillah! তোমার অর্ডার সফলভাবে জমা হয়েছে! 🌟');
    onOrderSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans">
      <button
        onClick={onBackToShop}
        className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-brand-accent transition-colors mb-6 font-medium"
      >
        <span>← Back to Shop</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Form */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-brand-dark border-b border-gray-100 pb-3">
            Shipping & Payment
          </h2>

          <form onSubmit={handleSubmitOrder} className="space-y-5">

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                required
              />
            </div>

            {/* Delivery Location */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Delivery Location</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShippingLocation('inside')}
                  className={`border rounded-lg p-3 text-xs font-semibold tracking-wide transition-all flex flex-col items-center justify-center gap-1 ${
                    shippingLocation === 'inside'
                      ? 'border-brand-primary bg-brand-light/30 text-brand-primary shadow-2xs'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">📍 Inside Dhaka</span>
                  <span className="text-[10px] opacity-80">40 BDT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShippingLocation('outside')}
                  className={`border rounded-lg p-3 text-xs font-semibold tracking-wide transition-all flex flex-col items-center justify-center gap-1 ${
                    shippingLocation === 'outside'
                      ? 'border-brand-primary bg-brand-light/30 text-brand-primary shadow-2xs'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">🚚 Outside Dhaka</span>
                  <span className="text-[10px] opacity-80">80 BDT</span>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address"
                rows="3"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-brand-dark"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`border rounded-lg p-3 text-xs font-semibold tracking-wide transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-brand-primary bg-brand-light/30 text-brand-primary shadow-2xs'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`border rounded-lg p-3 text-xs font-semibold tracking-wide transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-500 bg-pink-50/30 text-pink-600 shadow-2xs'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`border rounded-lg p-3 text-xs font-semibold tracking-wide transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-orange-500 bg-orange-50/30 text-orange-600 shadow-2xs'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Nagad
                </button>
              </div>
            </div>

            {/* MFS Payment Box */}
            {paymentMethod !== 'cod' && (
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-3 text-xs text-gray-600 shadow-2xs">
                <p className="leading-relaxed">
                  📱 Please{' '}
                  <span className="font-bold text-brand-accent uppercase tracking-wider">Send Money</span>{' '}
                  to:{' '}
                  <span className="font-extrabold text-brand-primary text-sm bg-white border border-blue-100 px-2 py-0.5 rounded shadow-3xs">
                    {paymentMethod === 'bkash' ? '01711125777' : '01522123642'}
                  </span>{' '}
                  ({paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Personal). Then fill below:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                      Your {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Number
                    </label>
                    <input
                      type="text"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-primary font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                      Transaction ID (TrxID)
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 9X2JK8M0"
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-primary font-medium"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Placing Order...
                </>
              ) : (
                `Confirm Order (${totalAmount} BDT)`
              )}
            </button>

          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs h-fit space-y-4">
          <h3 className="font-serif text-lg font-bold text-brand-dark border-b border-gray-100 pb-2">
            Order Summary
          </h3>
          <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2.5 text-xs">
                <div>
                  <p className="font-bold text-gray-700">{item.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {item.items ? 'Combo Set' : 'Premium Fragrance'}
                  </p>
                </div>
                <span className="font-semibold text-brand-primary">
                  {item.finalPrice || item.price} BDT
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal:</span>
              <span className="font-semibold text-gray-700">{itemsTotal} BDT</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Charge:</span>
              <span className="font-semibold text-gray-700">+{shippingCharge} BDT</span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-sm">
            <span className="font-bold text-gray-600">Total Payable:</span>
            <span className="font-extrabold text-lg text-brand-primary">{totalAmount} BDT</span>
          </div>
        </div>

      </div>
    </div>
  );
}
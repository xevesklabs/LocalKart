import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/useCart';
import { formatINR } from '../utils/currency';

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const { cartItems, cartSubtotal, totalItems } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bengaluru',
    pincode: '',
    giftNote: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.address.trim()) {
      errs.address = 'Delivery address is required';
    }
    if (!formData.pincode.trim()) {
      errs.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit Indian pincode';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderSummary = {
        orderId: `LK-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        customer: formData,
        items: [...cartItems],
        totalAmount: cartSubtotal + (cartSubtotal >= 1999 ? 0 : 99),
      };
      onOrderPlaced(orderSummary);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 dark:border-stone-800 transition-colors duration-200">
        
        {/* Modal Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Preparation
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Delivery &amp; Customer Details
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Provide your delivery information to reserve your local items.
          </p>
        </div>

        {/* Order Brief */}
        <div className="bg-stone-50 dark:bg-stone-800/70 rounded-xl p-3.5 border border-stone-200/80 dark:border-stone-700 mb-5 flex items-center justify-between text-xs">
          <div>
            <span className="text-stone-500 dark:text-stone-400 font-medium">Order Subtotal:</span>{' '}
            <strong className="text-stone-900 dark:text-stone-100">{formatINR(cartSubtotal)}</strong>
            <span className="text-stone-400 dark:text-stone-500 mx-1">({totalItems} items)</span>
          </div>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            {cartSubtotal >= 1999 ? 'Free Dispatch' : '+ ₹99 Dispatch'}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 focus:ring-rose-200'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 focus:ring-rose-200'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500'
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="priya@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 focus:ring-rose-200'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Delivery Street Address <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="2"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Flat/House No., Building, Street Name, Area"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 resize-none ${
                errors.address
                  ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 focus:ring-rose-200'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500'
              }`}
            />
            {errors.address && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                City / Town
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Pincode <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                maxLength="6"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="560001"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 ${
                  errors.pincode
                    ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 focus:ring-rose-200'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500'
                }`}
              />
              {errors.pincode && (
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.pincode}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Gift Note / Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={formData.giftNote}
              onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
              placeholder="e.g. Please write: Happy Birthday Sneha!"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-900 dark:bg-amber-600 hover:bg-amber-950 dark:hover:bg-amber-700 text-white font-medium text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Demo Order'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

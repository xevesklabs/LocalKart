import React from 'react';
import { CheckCircle, Package, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function OrderSuccessModal({ orderSummary, onClose }) {
  if (!orderSummary) return null;

  const { orderId, date, customer, items, totalAmount } = orderSummary;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 dark:border-stone-800 transition-colors duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 dark:ring-emerald-950/40">
          <CheckCircle className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Order Prepared Successfully!
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Thank you for shopping local with <strong className="text-stone-800 dark:text-stone-200">LocalKart</strong>.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-xs font-semibold">
            <span>Order ID:</span>
            <span className="text-amber-900 dark:text-amber-400 font-bold">{orderId}</span>
          </div>
        </div>

        {/* Order Details Accordion / Summary Box */}
        <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 border border-stone-200/80 dark:border-stone-700 space-y-3 text-xs mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              Order Date
            </span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{date}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1.5 font-medium shrink-0">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              Deliver To
            </span>
            <div className="text-right text-stone-800 dark:text-stone-200">
              <div className="font-semibold">{customer.fullName}</div>
              <div className="text-stone-500 dark:text-stone-400 text-[11px] max-w-[200px] truncate">{customer.address}</div>
              <div className="text-stone-500 dark:text-stone-400 text-[11px]">{customer.city} - {customer.pincode}</div>
            </div>
          </div>

          {customer.giftNote && (
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-[11px]">
              <strong className="block font-semibold">Gift Note Included:</strong>
              "{customer.giftNote}"
            </div>
          )}

          {/* Ordered Line Items */}
          <div className="pt-1">
            <span className="block font-semibold text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-stone-400" />
              Items in this Order ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                  <span className="truncate max-w-[240px]">
                    {item.name} <strong className="text-stone-800 dark:text-stone-200">×{item.quantity}</strong>
                  </span>
                  <span className="font-medium text-stone-900 dark:text-stone-100 shrink-0">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex justify-between items-center text-sm font-bold text-stone-900 dark:text-stone-100">
            <span>Total Amount:</span>
            <span className="text-base text-amber-950 dark:text-amber-400">{formatINR(totalAmount)}</span>
          </div>
        </div>

        {/* Est delivery info */}
        <p className="text-[11px] text-center text-stone-500 dark:text-stone-400 mb-5">
          📦 Estimated local dispatch: <strong>Within 24–48 hours</strong> with eco-packaging.
        </p>

        {/* Action button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 px-4 rounded-xl bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white font-medium text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
        >
          <span>Continue Browsing Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

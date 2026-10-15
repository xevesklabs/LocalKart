import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/useCart';
import { formatINR } from '../utils/currency';

const FREE_SHIPPING_THRESHOLD = 1999;

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalItems,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col border-l border-transparent dark:border-stone-800 transition-colors duration-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/90">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Your Bag ({totalItems})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mr-2"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Alert */}
          {cartItems.length > 0 && (
            <div className="px-5 py-3 bg-amber-50/80 dark:bg-amber-950/60 border-b border-amber-200/60 dark:border-amber-800/60 text-xs">
              <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium mb-1.5">
                <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  {remainingForFreeShipping === 0
                    ? '🎉 You unlocked free local delivery!'
                    : `Add ${formatINR(remainingForFreeShipping)} more for Free Local Delivery`}
                </span>
                <span className="text-stone-500 dark:text-stone-400 font-bold">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full bg-amber-200/60 dark:bg-amber-900/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 dark:bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 dark:divide-stone-800">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 dark:text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4 text-stone-400 dark:text-stone-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mb-6">
                  Explore our handcrafted lifestyle items, stationery, and gift collections to start your order.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-800 dark:text-stone-200 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/80 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Local Dispatch</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatINR(99)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100">
                  <span>Estimated Total</span>
                  <span className="text-base font-extrabold text-amber-950 dark:text-amber-400">
                    {formatINR(
                      cartSubtotal + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 dark:bg-amber-600 hover:bg-amber-900 dark:hover:bg-amber-700 text-white font-medium text-sm transition-all shadow-md active:scale-98"
              >
                <span>Prepare Order &amp; Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-400 dark:text-stone-500">
                🔒 Prototype checkout • No live payment required
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

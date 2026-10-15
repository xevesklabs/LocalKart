import React from 'react';
import { ShoppingBag, Sparkles, Store } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Header() {
  const { totalItems, setIsCartOpen, lastAddedId } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/10">
              <Store className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  LocalKart
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 tracking-wide uppercase border border-amber-200/50 dark:border-amber-800/60">
                  Boutique
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
                Lifestyle &amp; Handcrafted Gifts
              </p>
            </div>
          </div>

          {/* Quick Badges / Shop Highlights */}
          <div className="hidden md:flex items-center gap-6 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Small-Batch Artisans</span>
            </div>
            <div className="h-4 w-[1px] bg-stone-200 dark:bg-stone-800" />
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Orders Open Online</span>
            </div>
          </div>

          {/* Cart Indicator Action */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart containing ${totalItems} items`}
            className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 active:scale-95 transition-all text-stone-800 dark:text-stone-100 font-medium text-sm shadow-xs ${
              lastAddedId ? 'ring-2 ring-amber-500 ring-offset-1 scale-105' : ''
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-stone-700 dark:text-stone-200" />
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -top-2 -right-2 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-stone-900 animate-scale-in"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="hidden md:inline text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

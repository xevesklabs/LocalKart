import React from 'react';
import { Gift, HeartHandshake, ShieldCheck, Truck } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-stone-50 to-stone-50 dark:from-stone-900/60 dark:via-stone-950 dark:to-stone-950 border-b border-stone-200/80 dark:border-stone-800 pt-10 pb-12 sm:pt-14 sm:pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200 dark:border-amber-800/80">
            <Gift className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            Curated Local Collection
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.15]">
            Handcrafted Goods &amp; Thoughtful Gifting for Every Day.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
            Welcome to <span className="font-semibold text-stone-900 dark:text-stone-100">LocalKart</span>. We collaborate with independent makers across the country to bring you artisanal decor, sustainable stationery, everyday accessories, and heartfelt gift hampers.
          </p>
        </div>

        {/* Value Props Row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-stone-200/80 dark:border-stone-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">100% Artisan Made</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Sourced ethically from local craft studios</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Careful Local Dispatch</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Eco-friendly protective gift packaging</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Verified Quality</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Strict quality check on every small batch</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Custom Gift Notes</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Free handwritten cards with every order</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Store, Heart, Mail, Phone, MapPin } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                LocalKart
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              An independent neighborhood boutique celebrating Indian craft heritage, everyday lifestyle goods, and sustainable gifting.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>12 Indiranagar 100ft Road, Bengaluru, Karnataka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+91 (80) 4920-1100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>orders@localkart.demo</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Artisanal Gifts &amp; Hampers</li>
              <li>Everyday Lifestyle Accessories</li>
              <li>Handmade Paper Stationery</li>
              <li>Studio Pottery &amp; Home Decor</li>
            </ul>
          </div>

          {/* Shop Hours & Note */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Store Hours
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Tuesday – Sunday: 10:30 AM – 8:30 PM<br />
              Closed on Mondays for studio artisan restock.
            </p>
            <span className="inline-block px-3 py-1 rounded-md bg-stone-800 text-amber-400 text-[11px] font-mono border border-stone-700">
              Prototype Version • 2026
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {CURRENT_YEAR} LocalKart Boutique. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> for local artisans
          </p>
        </div>
      </div>
    </footer>
  );
}

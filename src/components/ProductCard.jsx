import React, { useState } from 'react';
import { ShoppingBag, Check, Star, Sparkles, ImageOff } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { useCart } from '../context/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  const isLowStock = product.stockStatus === 'low_stock';

  return (
    <article className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col hover:shadow-lg hover:border-amber-200/80 dark:hover:border-amber-700/60 transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          /* Graceful Fallback Placeholder */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-stone-200 dark:from-stone-800 dark:to-stone-900 text-stone-500 dark:text-stone-400 p-4 text-center">
            <ImageOff className="w-8 h-8 text-stone-400 dark:text-stone-500 mb-2" />
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">{product.name}</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Category Pill Over Image */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 shadow-xs backdrop-blur-xs border border-white/50 dark:border-stone-700">
            {product.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          {isLowStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              Only {product.stockCount} left
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-600 text-white shadow-xs">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-stone-800 dark:text-stone-200 ml-0.5">{product.rating}</span>
            <span className="text-stone-400 dark:text-stone-500">({product.reviews})</span>
            {product.tags?.[0] && (
              <>
                <span className="text-stone-300 dark:text-stone-700 mx-1">•</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{product.tags[0]}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 dark:text-stone-500 block tracking-wider">
              Price
            </span>
            <span className="font-sans text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              {formatINR(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-stone-900 dark:bg-stone-800 hover:bg-amber-900 dark:hover:bg-amber-700 text-white border border-transparent dark:border-stone-700 shadow-xs hover:shadow-md'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
}

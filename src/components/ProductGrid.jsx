import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch, RotateCcw } from 'lucide-react';

export default function ProductGrid({
  products,
  searchQuery,
  selectedCategory,
  onResetFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 sm:p-14 text-center my-6 shadow-xs max-w-2xl mx-auto transition-colors duration-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/80 flex items-center justify-center text-amber-700 dark:text-amber-400">
          <PackageSearch className="w-8 h-8 stroke-[1.8]" />
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          No matching products found
        </h3>
        
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
          {searchQuery ? (
            <>
              We couldn't find any artisanal goods matching{' '}
              <span className="font-semibold text-stone-800 dark:text-stone-200">"{searchQuery}"</span>
              {selectedCategory !== 'All' && (
                <> in the <span className="font-semibold text-stone-800 dark:text-stone-200">{selectedCategory}</span> category</>
              )}.
            </>
          ) : (
            <>No items currently found in the selected category.</>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white text-sm font-medium transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Search &amp; Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

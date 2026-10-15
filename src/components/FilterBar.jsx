import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import ThemeToggle from './ThemeToggle';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalMatching,
  totalAll,
  categoryCounts,
}) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-4 sm:p-5 shadow-xs mb-8 space-y-4 transition-colors duration-200">
      {/* Top row: Search, Theme Toggle, and active count */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search input with Theme Toggle beside it */}
        <div className="flex items-center gap-2.5 flex-1 max-w-xl">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name (e.g. Candle, Brass, Journal)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 dark:focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dark Mode Toggle Button Beside Search Bar */}
          <ThemeToggle />
        </div>

        {/* Counter & quick reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5 font-medium text-stone-600 dark:text-stone-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
            <span>
              Showing <strong className="text-stone-900 dark:text-stone-100">{totalMatching}</strong> of {totalAll} items
            </span>
          </div>
          {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-300 font-semibold underline decoration-amber-300 dark:decoration-amber-600 underline-offset-2 transition-colors"
            >
              Reset all
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Category:
        </span>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] ?? 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-stone-900 dark:bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected
                    ? 'bg-stone-800 dark:bg-amber-700 text-stone-200 dark:text-amber-100'
                    : 'bg-stone-200/80 dark:bg-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

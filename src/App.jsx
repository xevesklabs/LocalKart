import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import Footer from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';

function Storefront() {
  const { clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const trimmedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        trimmedQuery === '' ||
        product.name.toLowerCase().includes(trimmedQuery) ||
        product.description.toLowerCase().includes(trimmedQuery) ||
        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery)));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleOrderPlaced = (orderSummary) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(orderSummary);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 flex flex-col selection:bg-amber-100 selection:text-amber-900 dark:selection:bg-amber-950 dark:selection:text-amber-200 transition-colors duration-200">
      {/* Navigation Header */}
      <Header />

      {/* Hero Announcement & Value Props */}
      <HeroBanner />

      {/* Main Product Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Explore Handcrafted Goods
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Browse small-batch gifts, timeless accessories, and home treasures.
          </p>
        </div>

        {/* Search, Filter Pills, Dark Mode Toggle & Counter */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalMatching={filteredProducts.length}
          totalAll={PRODUCTS.length}
          categoryCounts={categoryCounts}
        />

        {/* Responsive Product Grid / Empty State */}
        <ProductGrid
          products={filteredProducts}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Slide-over Shopping Cart */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Screen */}
      <OrderSuccessModal
        orderSummary={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Store Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Storefront />
      </CartProvider>
    </ThemeProvider>
  );
}

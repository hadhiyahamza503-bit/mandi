import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ServiceChoiceSection } from './components/ServiceChoiceSection.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { NearbyGuideSection } from './components/NearbyGuideSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationFooter } from './components/LocationFooter.tsx';
import { CartDrawer, CartItem } from './components/CartDrawer.tsx';
import { MenuItem, RESTAURANT_INFO } from './data/restaurantData.ts';
import { ShoppingBag, Phone, Flame } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      item: {
        id: 'shawaya-bishawari-qtr',
        name: 'Quarter Shawaya + Bishawari Rice Combo',
        arabicName: 'وجبة ربع شواية مع أرز بيشاوري',
        category: 'combos',
        description: 'Slow-fired charcoal chicken quarter served over fragrant Bishawari rice, accompanied by signature Yamama spicy gravy, garlic mayonnaise, and kuboos.',
        price: 180,
      },
      quantity: 1,
    },
    {
      item: {
        id: 'beef-mandi-signature',
        name: 'Yamama Signature Royal Beef Mandi',
        arabicName: 'مندي لحم بقري ملكي فاخر',
        category: 'mandi',
        description: 'Tender fall-apart spiced beef with rich caramelized glaze on fragrant Mandi basmati rice, crispy onions, cashews, raisins, spicy tomato salata salsa & bone broth reduction gravy.',
        price: 240,
      },
      portion: { label: 'Single / Quarter', price: 240 },
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [serviceMode, setServiceMode] = useState<'dine-in' | 'delivery'>('dine-in');

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (item: MenuItem, selectedPortion?: { label: string; price: number }) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.portion?.label === selectedPortion?.label
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [...prev, { item, portion: selectedPortion, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServiceChoice = (mode: 'dine-in' | 'delivery') => {
    setServiceMode(mode);
    const el = document.getElementById('service-choice');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#140206] text-[#f5ebd7] font-sans-body flex flex-col selection:bg-[#dfb15b] selection:text-[#1a0307]">
      {/* Primary Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectServiceMode={scrollToServiceChoice}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExploreMenu={scrollToMenu}
          onSelectService={scrollToServiceChoice}
        />

        {/* User Interactive Query 1: "Are you planning to dine in or order delivery?" */}
        <ServiceChoiceSection
          activeMode={serviceMode}
          setActiveMode={setServiceMode}
          onExploreMenu={scrollToMenu}
        />

        {/* Menu & Pricing Highlights with Food Photos */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* User Interactive Query 2: "Do you need help finding other nearby Mandi or Arabic restaurants?" */}
        <NearbyGuideSection />

        {/* Real Customer Reviews from prompt & Google/Justdial */}
        <ReviewsSection />
      </main>

      {/* Location, Highway directions & Footer */}
      <LocationFooter />

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Sticky Bottom Order Bar on Mobile / Tablet if items in cart */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-bold text-sm rounded-xl shadow-2xl shadow-black/80 flex items-center justify-between sm:justify-start gap-4 border border-[#ffd700]/50 transition-all hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1a0307]" />
              <span>Review Order ({totalCartCount})</span>
            </div>
            <span className="font-cinzel text-sm bg-[#1a0307] text-[#ffd700] px-2 py-0.5 rounded">
              ₹{cartItems.reduce((acc, ci) => acc + (ci.portion ? ci.portion.price : ci.item.price) * ci.quantity, 0)}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

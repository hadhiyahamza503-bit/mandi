import React, { useState } from 'react';
import { Phone, ShoppingBag, Clock, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectServiceMode: (mode: 'dine-in' | 'delivery') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectServiceMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if currently within 11:00 AM - 11:00 PM
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= 11 && currentHour < 23;

  return (
    <header className="sticky top-0 z-40 bg-[#1a0307]/95 backdrop-blur-md border-b border-[#dfb15b]/25 shadow-lg shadow-black/40">
      {/* Top micro-announcement banner */}
      <div className="bg-[#2a050e] border-b border-[#dfb15b]/15 px-4 py-1.5 text-xs text-[#e8d5aa]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-[#ffd700]">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {isOpen ? 'Open Now for Dining & Delivery' : 'Opens at 11:00 AM (Dining 12:30 PM)'}
            </span>
            <span className="hidden sm:inline text-[#dfb15b]/40">|</span>
            <span className="hidden sm:inline text-[#e8d5aa]/90">
              Calicut Road, Angadipuram, Perinthalmanna
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-[#ffd700] hover:text-[#ffe259] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#dfb15b]" />
              <span className="font-semibold">{RESTAURANT_INFO.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#ffd700] shadow-md shadow-amber-500/20 bg-[#2d050f] shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={RESTAURANT_INFO.logo}
              alt="Yamama Shawaya Logo - Refill Your Energy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#dfb15b] to-[#f5ebd7] group-hover:brightness-110 transition-all leading-tight">
              {RESTAURANT_INFO.name}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#ffd700]/90 tracking-wider uppercase">
              <span>{RESTAURANT_INFO.motto}</span>
              <span className="text-[#dfb15b]/40">·</span>
              <span className="text-[#e8d5aa]/75 font-normal">Angadipuram</span>
            </div>
          </div>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#e8d5aa]">
          <a href="#menu" className="hover:text-[#ffd700] transition-colors relative py-1">
            Menu & Combos
          </a>
          <a
            href="#service-choice"
            onClick={() => onSelectServiceMode('dine-in')}
            className="hover:text-[#ffd700] transition-colors relative py-1"
          >
            Dine-In
          </a>
          <a
            href="#service-choice"
            onClick={() => onSelectServiceMode('delivery')}
            className="hover:text-[#ffd700] transition-colors relative py-1"
          >
            Home Delivery
          </a>
          <a href="#nearby-guide" className="hover:text-[#ffd700] transition-colors relative py-1">
            Nearby Arabic Spots
          </a>
          <a href="#reviews" className="hover:text-[#ffd700] transition-colors relative py-1">
            Reviews
          </a>
          <a href="#location" className="hover:text-[#ffd700] transition-colors relative py-1">
            Location
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="View Order Bag"
            className="relative flex items-center gap-2 px-3 py-2 bg-[#2d050f] hover:bg-[#3c0915] border border-[#dfb15b]/30 rounded-lg text-[#ffd700] transition-all hover:border-[#ffd700]/70"
          >
            <ShoppingBag className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-semibold hidden sm:inline">Your Order</span>
            {cartCount > 0 && (
              <span className="bg-gradient-to-r from-[#ffd700] to-[#dfb15b] text-[#1a0307] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hi Yamama Shawaya, I would like to order or enquire about dining.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#dfb15b] to-[#c99732] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-semibold text-xs rounded-lg shadow-md shadow-black/40 hover:shadow-amber-500/20 transition-all"
          >
            <span>WhatsApp Order</span>
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#ffd700] hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#24050e] border-b border-[#dfb15b]/30 px-6 py-4 space-y-3">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Menu & Combos
          </a>
          <button
            onClick={() => {
              onSelectServiceMode('dine-in');
              setMobileMenuOpen(false);
              const el = document.getElementById('service-choice');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block text-left w-full text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Dine-In Table Reservation
          </button>
          <button
            onClick={() => {
              onSelectServiceMode('delivery');
              setMobileMenuOpen(false);
              const el = document.getElementById('service-choice');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block text-left w-full text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Delivery & Takeaway
          </button>
          <a
            href="#nearby-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Nearby Mandi & Arabic Spots Guide
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Customer Reviews (4.1 ★)
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#e8d5aa] hover:text-[#ffd700] py-1.5"
          >
            Location & Highway Directions
          </a>

          <div className="pt-3 border-t border-[#dfb15b]/20 flex flex-col gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#3a0815] border border-[#dfb15b]/40 rounded-lg text-[#ffd700] text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-[#dfb15b]" />
              Call {RESTAURANT_INFO.phones[0]}
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent('Hi Yamama Shawaya, I want to place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#dfb15b] to-[#c99732] text-[#1a0307] rounded-lg text-sm font-bold"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

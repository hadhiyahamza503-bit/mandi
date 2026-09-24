import React, { useState } from 'react';
import { Plus, Check, Flame, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData.ts';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, selectedPortion?: { label: string; price: number }) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('combos');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const [selectedPortions, setSelectedPortions] = useState<{ [itemId: string]: { label: string; price: number } }>({});

  const categories = [
    { id: 'combos', label: 'All Combos & Feasts' },
    { id: 'mandi', label: '👑 Royal Beef Mandi' },
    { id: 'shawaya', label: 'Charcoal Shawaya Solo' },
    { id: 'alfaham', label: 'Al Faham Barbecue' },
    { id: 'rice-sides', label: 'Bishawari Rice & Sides' },
    { id: 'beverages', label: 'Coolers & Drinks' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'combos') {
      return item.category === 'combos' || item.category === 'mandi';
    }
    return item.category === activeCategory;
  });

  const handleAddItem = (item: MenuItem) => {
    const portion = selectedPortions[item.id] || (item.portions ? item.portions[0] : undefined);
    onAddToCart(item, portion);

    // Provide momentary check feedback
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleSelectPortion = (itemId: string, portion: { label: string; price: number }) => {
    setSelectedPortions((prev) => ({ ...prev, [itemId]: portion }));
  };

  return (
    <section id="menu" className="py-14 sm:py-20 bg-[#160206] border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfb15b]">
            <Flame className="w-4 h-4 text-[#ffd700]" />
            <span>Rotisserie & Pit Grilled Delights</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5ebd7] text-balance">
            Signature Menu & Pricing
          </h2>

          <p className="text-sm sm:text-base text-[#e8d5aa]/85">
            Every Shawaya combo includes our signature slow-roasted charcoal chicken, aromatic Bishawari rice, spicy house gravy, kuboos, and garlic dip.
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#dfb15b] to-[#c79430] text-[#1a0307] shadow-lg shadow-amber-500/10'
                    : 'bg-[#25050d] text-[#e8d5aa] hover:text-[#ffd700] border border-[#dfb15b]/20 hover:border-[#dfb15b]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Combo Banner when viewing combos */}
        {activeCategory === 'combos' && (
          <div className="mb-10 p-5 bg-gradient-to-r from-[#320610] via-[#26050e] to-[#320610] border border-[#dfb15b]/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-[#ffd700] font-bold">
                Yamama Signature Formula
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5ebd7]">
                Charcoal Slow-Fired Chicken + Bishawari Rice + Signature Gravy
              </h3>
              <p className="text-xs text-[#e8d5aa]/80">
                Quarter Plate: ₹180 · Half Plate: ₹340 · Full Family Tray: ₹660 · Royal Beef Mandi: ₹240
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#service-choice"
                className="px-4 py-2 bg-[#dfb15b] hover:bg-[#ffd700] text-[#1a0307] text-xs font-bold rounded-lg transition-colors"
              >
                Dine-In or Order
              </a>
            </div>
          </div>
        )}

        {/* Featured Mandi Banner when viewing Mandi */}
        {activeCategory === 'mandi' && (
          <div className="mb-10 p-5 bg-gradient-to-r from-[#3f0817] via-[#2a050f] to-[#3f0817] border-2 border-[#ffd700]/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-amber-500/10">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-wider text-[#ffd700] font-bold">
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                <span>Chef's Master Signature Dish</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5ebd7]">
                Authentic Yemeni-Style Royal Beef Mandi
              </h3>
              <p className="text-xs sm:text-sm text-[#e8d5aa]/90 max-w-2xl">
                Slow-simmered tender spiced beef chunks topped on fragrant basmati rice with fried caramelized onions, roasted cashews, raisins, spicy tomato salata salsa, and rich bone marrow broth gravy.
              </p>
            </div>
            <div className="text-center md:text-right shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-[#dfb15b] block">Starting from</span>
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ffd700]">₹240</span>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const currentPortion = selectedPortions[item.id] || (item.portions ? item.portions[0] : null);
            const displayPrice = currentPortion ? currentPortion.price : item.price;
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                className="bg-[#24050e] border border-[#dfb15b]/30 hover:border-[#ffd700]/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Slot */}
                {item.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1b0307]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24050e] via-transparent to-transparent" />
                    
                    {item.signature && (
                      <div className="absolute top-3 left-3 bg-[#1a0307]/90 backdrop-blur-sm border border-[#dfb15b]/50 text-[#ffd700] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}

                    {item.isSpicy && (
                      <div className="absolute top-3 right-3 bg-[#690918]/90 text-[#ffe5a3] text-[10px] font-semibold px-2 py-1 rounded-md border border-[#dfb15b]/30">
                        Spicy Masala
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-[#2e0712] border-b border-[#dfb15b]/15 flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-[#dfb15b] uppercase">
                      Yamama Authentic Kitchen
                    </span>
                    {item.isSpicy && (
                      <span className="text-[10px] font-medium text-[#ffd700]">Spicy</span>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-cinzel text-lg font-bold text-[#f5ebd7] group-hover:text-[#ffd700] transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    {item.arabicName && (
                      <span className="block text-xs text-[#dfb15b]/70 font-medium">
                        {item.arabicName}
                      </span>
                    )}

                    <p className="text-xs text-[#e8d5aa]/80 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Portions Selector (if multiple portions) */}
                  {item.portions && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-[#dfb15b] uppercase tracking-wider block">
                        Select Portion
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.portions.map((portion) => (
                          <button
                            key={portion.label}
                            type="button"
                            onClick={() => handleSelectPortion(item.id, portion)}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                              currentPortion?.label === portion.label
                                ? 'bg-[#dfb15b] text-[#1a0307] font-bold'
                                : 'bg-[#1a0307] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
                            }`}
                          >
                            {portion.label} (₹{portion.price})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Add to Order Bar */}
                  <div className="pt-3 border-t border-[#dfb15b]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#e8d5aa]/70 uppercase block">Price</span>
                      <span className="font-cinzel text-2xl font-bold text-[#ffd700] tabular-nums">
                        ₹{displayPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddItem(item)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] hover:shadow-amber-500/20'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

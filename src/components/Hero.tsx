import React, { useState } from 'react';
import { Star, Flame, MapPin, ArrowRight, Sparkles, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface HeroProps {
  onExploreMenu: () => void;
  onSelectService: (service: 'dine-in' | 'delivery') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onSelectService }) => {
  const [activeHeroDish, setActiveHeroDish] = useState<'beef-mandi' | 'shawaya'>('beef-mandi');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#180307] via-[#24060f] to-[#180307] pt-6 pb-16 md:pt-12 md:pb-24 border-b border-[#dfb15b]/20">
      {/* Decorative ambient background golden glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story, Logo Mascot & Pricing Highlights */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Logo Badge & Tagline header row */}
            <div className="flex items-center gap-3.5 p-2 pr-4 bg-[#2b050f]/90 border border-[#dfb15b]/30 rounded-full w-fit backdrop-blur-md shadow-lg">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Yamama Shawaya Logo Refill Your Energy"
                className="w-12 h-12 rounded-full border-2 border-[#ffd700] object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffd700] tracking-wide uppercase">
                  <span>{RESTAURANT_INFO.name}</span>
                  <span className="text-[#dfb15b]/50">·</span>
                  <span className="text-[#e8d5aa] font-semibold">{RESTAURANT_INFO.motto}</span>
                </div>
                <span className="text-[11px] text-[#e8d5aa]/80">Calicut Road, Angadipuram</span>
              </div>
            </div>

            {/* Display Headline with Balanced Wrapping */}
            <div className="space-y-3">
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-[#f5ebd7] leading-[1.15] text-balance">
                Charcoal Slow-Fired Shawaya & Royal Beef Mandi
              </h1>

              {/* Famous Yamama Slogan in Golden Script */}
              <div className="inline-block px-4 py-2 bg-[#330813] border-l-4 border-[#dfb15b] rounded-r-md">
                <p className="font-playfair italic text-lg sm:text-xl text-[#ffd700] tracking-wide">
                  "{RESTAURANT_INFO.tagline}"
                </p>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#e8d5aa]/90 max-w-2xl leading-relaxed">
              Angadipuram's favorite Arabic destination for slow-charcoal grilled chicken, mouthwatering <strong className="text-[#ffd700] font-semibold">Signature Royal Beef Mandi</strong>, fragrant Bishawari spiced rice, and our famous Kerala-Arabic pepper gravy.
            </p>

            {/* Pricing Highlights Bar with Beef Mandi spotlight */}
            <div className="space-y-2">
              <div className="flex items-center justify-between max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb15b]">
                  Popular Combos & Signature Pricing:
                </span>
                <span className="text-[11px] text-[#ffd700] font-semibold">Avg ₹1–200 / person</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#2b050f]/80 border border-[#dfb15b]/25 rounded-xl backdrop-blur-sm max-w-2xl">
                <div className="text-center p-2 rounded-lg bg-[#1f0308]/60 border border-[#dfb15b]/15">
                  <span className="block text-[10px] uppercase tracking-wider text-[#dfb15b]/80 font-medium">Quarter Shawaya</span>
                  <span className="text-lg sm:text-xl font-bold font-cinzel text-[#ffd700] tabular-nums">₹180</span>
                  <span className="block text-[9px] text-[#e8d5aa]/70">With Bishawari Rice</span>
                </div>

                <div className="text-center p-2 rounded-lg bg-[#1f0308]/60 border border-[#dfb15b]/15">
                  <span className="block text-[10px] uppercase tracking-wider text-[#dfb15b]/80 font-medium">Half Shawaya</span>
                  <span className="text-lg sm:text-xl font-bold font-cinzel text-[#ffd700] tabular-nums">₹340</span>
                  <span className="block text-[9px] text-[#e8d5aa]/70">Ideal for 2 Persons</span>
                </div>

                <div className="text-center p-2 rounded-lg bg-[#1f0308]/60 border border-[#dfb15b]/15">
                  <span className="block text-[10px] uppercase tracking-wider text-[#dfb15b]/80 font-medium">Full Feast</span>
                  <span className="text-lg sm:text-xl font-bold font-cinzel text-[#ffd700] tabular-nums">₹660</span>
                  <span className="block text-[9px] text-[#e8d5aa]/70">Family Platter</span>
                </div>

                <div className="text-center p-2 rounded-lg bg-gradient-to-b from-[#480c1b] to-[#25050e] border border-[#ffd700]/50 shadow-md">
                  <span className="block text-[10px] uppercase tracking-wider text-[#ffd700] font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Beef Mandi
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-cinzel text-[#ffd700] tabular-nums">₹240</span>
                  <span className="block text-[9px] text-[#e8d5aa]">Tender Royal Beef</span>
                </div>
              </div>
            </div>

            {/* Service Intent Selector Prompts */}
            <div className="space-y-2 pt-1">
              <span className="text-xs uppercase tracking-widest text-[#dfb15b]/80 font-semibold block">
                How would you like to enjoy your meal today?
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectService('dine-in')}
                  className="px-5 py-3 bg-[#380815] hover:bg-[#4a0d1d] border border-[#dfb15b]/50 hover:border-[#ffd700] text-[#ffd700] rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  <span>Dine-In at Angadipuram</span>
                  <ArrowRight className="w-4 h-4 text-[#dfb15b] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectService('delivery')}
                  className="px-5 py-3 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] rounded-xl text-sm font-bold transition-all shadow-md shadow-black/50 hover:shadow-amber-500/25 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Order Home Delivery</span>
                  <ArrowRight className="w-4 h-4 text-[#1a0307] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExploreMenu}
                  className="px-4 py-3 text-sm text-[#e8d5aa] hover:text-[#ffd700] underline underline-offset-4 transition-colors font-medium cursor-pointer"
                >
                  Browse Menu & Beef Mandi
                </button>
              </div>
            </div>

            {/* Social Proof Proof-Adjacency */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#e8d5aa]/80">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25050d] rounded-lg border border-[#dfb15b]/20">
                <div className="flex text-[#ffd700]">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                  <Star className="w-3.5 h-3.5 fill-[#ffd700]/40 text-[#ffd700]" />
                </div>
                <span className="font-bold text-[#ffd700] tabular-nums">4.1</span>
                <span className="text-[#e8d5aa]/70">(218 Google Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25050d] rounded-lg border border-[#dfb15b]/20">
                <span className="font-semibold text-[#ffd700]">4.0 / 5</span>
                <span className="text-[#e8d5aa]/70">Justdial (217 votes)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Imagery Platter with Dish Selector */}
          <div className="lg:col-span-5 space-y-3">
            {/* Dish toggle bar */}
            <div className="flex items-center justify-between p-1 bg-[#25050e] border border-[#dfb15b]/30 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveHeroDish('beef-mandi')}
                className={`flex-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeHeroDish === 'beef-mandi'
                    ? 'bg-[#dfb15b] text-[#1a0307] shadow'
                    : 'text-[#e8d5aa] hover:text-[#ffd700]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Beef Mandi (₹240)</span>
              </button>

              <button
                onClick={() => setActiveHeroDish('shawaya')}
                className={`flex-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeHeroDish === 'shawaya'
                    ? 'bg-[#dfb15b] text-[#1a0307] shadow'
                    : 'text-[#e8d5aa] hover:text-[#ffd700]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Charcoal Shawaya (₹180)</span>
              </button>
            </div>

            <div className="relative group">
              {/* Outer Golden Border & Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#dfb15b]/40 via-[#ffd700]/30 to-[#dfb15b]/40 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
              
              <div className="relative bg-[#25050e] border border-[#dfb15b]/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#1f040a]">
                  <img
                    src={
                      activeHeroDish === 'beef-mandi'
                        ? '/src/assets/images/beef_mandi_signature_1790224184787.jpg'
                        : '/src/assets/images/yamama_hero_platter_1790223741119.jpg'
                    }
                    alt={
                      activeHeroDish === 'beef-mandi'
                        ? 'Yamama Signature Royal Beef Mandi Feast Platter with Mandi Rice, spicy salata and gravy'
                        : 'Yamama Shawaya Charcoal Grilled Chicken with Fragrant Bishawari Rice and House Gravy'
                    }
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                  />
                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180307] via-transparent to-black/20" />
                  
                  {/* Floating Logo Watermark Badge */}
                  <div className="absolute top-3 right-3 bg-[#1a0307]/90 backdrop-blur-md p-1.5 rounded-full border border-[#ffd700]/60 shadow-lg">
                    <img
                      src={RESTAURANT_INFO.logo}
                      alt="Yamama Badge"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </div>

                  {/* Floating Authenticity Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="bg-[#1a0307]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#dfb15b]/40 text-[#ffd700] font-semibold flex items-center gap-1.5">
                      {activeHeroDish === 'beef-mandi' ? (
                        <>
                          <Award className="w-3.5 h-3.5 text-[#ffd700]" />
                          <span>Tender Spiced Royal Beef</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-3.5 h-3.5 text-[#ff8f00]" />
                          <span>Natural Charcoal Slow-Fired</span>
                        </>
                      )}
                    </div>

                    <div className="bg-[#1a0307]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#dfb15b]/40 text-[#f5ebd7] font-medium">
                      {activeHeroDish === 'beef-mandi' ? 'Salata & Gravy Included' : 'Special Gravy Included'}
                    </div>
                  </div>
                </div>

                {/* Sub-bar below hero image */}
                <div className="p-4 bg-[#21050c] flex items-center justify-between text-xs text-[#e8d5aa]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#dfb15b] shrink-0" />
                    <span className="line-clamp-1">Oradampalam-Valiyavitilpadi, Tirurkad / Calicut Rd</span>
                  </div>
                  <span className="font-bold text-[#ffd700] whitespace-nowrap pl-2">
                    11 AM – 11 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

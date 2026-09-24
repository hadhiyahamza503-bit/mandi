import React, { useState } from 'react';
import { Compass, Check, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { NEARBY_RESTAURANTS, RESTAURANT_INFO } from '../data/restaurantData.ts';

export const NearbyGuideSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'shawaya' | 'mandi' | 'cafe'>('all');

  const filteredSpots = NEARBY_RESTAURANTS.filter((spot) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'shawaya') return spot.name === 'Yamama Shawaya' || spot.knownFor.toLowerCase().includes('shawaya');
    if (selectedFilter === 'mandi') return spot.name === 'Nahdi Kuzhimandhi' || spot.name === 'Yamama Shawaya';
    if (selectedFilter === 'cafe') return spot.name === 'Coqueiro' || spot.name === 'Food Stories';
    return true;
  });

  return (
    <section id="nearby-guide" className="py-14 sm:py-20 bg-[#1a0307] border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfb15b]">
            <Compass className="w-4 h-4 text-[#ffd700]" />
            <span>Angadipuram & Perinthalmanna Food Guide</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#f5ebd7] text-balance">
            Nearby Mandi & Arabic Dining Guide
          </h2>

          <p className="text-sm sm:text-base text-[#e8d5aa]/80">
            Comparing the most searched Arabic & grill spots around Calicut Road, Tirurkad, and Perinthalmanna so you can find the exact taste you're craving.
          </p>

          {/* Interactive Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#dfb15b] text-[#1a0307]'
                  : 'bg-[#28050e] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
              }`}
            >
              All 5 Popular Spots
            </button>
            <button
              onClick={() => setSelectedFilter('shawaya')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'shawaya'
                  ? 'bg-[#dfb15b] text-[#1a0307]'
                  : 'bg-[#28050e] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
              }`}
            >
              Charcoal Shawaya Specials
            </button>
            <button
              onClick={() => setSelectedFilter('mandi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'mandi'
                  ? 'bg-[#dfb15b] text-[#1a0307]'
                  : 'bg-[#28050e] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
              }`}
            >
              Mandi & Rice Feasts
            </button>
            <button
              onClick={() => setSelectedFilter('cafe')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'cafe'
                  ? 'bg-[#dfb15b] text-[#1a0307]'
                  : 'bg-[#28050e] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
              }`}
            >
              Cafes & Multi-Cuisine
            </button>
          </div>
        </div>

        {/* Spot Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => {
            const isYamama = spot.name === 'Yamama Shawaya';

            return (
              <div
                key={spot.name}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isYamama
                    ? 'bg-gradient-to-b from-[#380814] to-[#25050e] border-2 border-[#ffd700] shadow-xl shadow-amber-500/10 relative'
                    : 'bg-[#22040c] border border-[#dfb15b]/20 hover:border-[#dfb15b]/50'
                }`}
              >
                {isYamama && (
                  <div className="absolute -top-3 left-6 bg-[#ffd700] text-[#1a0307] text-[10px] uppercase font-black px-3 py-0.5 rounded-full tracking-wider shadow">
                    Top Pick For Charcoal Shawaya
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-cinzel text-xl font-bold ${isYamama ? 'text-[#ffd700]' : 'text-[#f5ebd7]'}`}>
                        {spot.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#dfb15b]/80 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#dfb15b]" />
                        <span>{spot.distance}</span>
                      </div>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#160206] text-[#e8d5aa] border border-[#dfb15b]/30 tabular-nums">
                      {spot.priceLevel}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#e8d5aa]/90">
                    <div>
                      <span className="font-semibold text-[#dfb15b] block">Known For:</span>
                      <p>{spot.knownFor}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-[#dfb15b] block">Signature Dish:</span>
                      <p className="font-medium text-[#ffd700]">{spot.bestDish}</p>
                    </div>

                    <div className="pt-2 border-t border-[#dfb15b]/15">
                      <span className="font-semibold text-[#dfb15b] block">
                        {isYamama ? 'Why Yamama is Unique:' : 'Yamama Comparison:'}
                      </span>
                      <p className="italic text-[#e8d5aa]/80">{spot.yamamaAdvantage}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {isYamama ? (
                    <a
                      href="#menu"
                      className="w-full py-2.5 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Shawaya & Beef Mandi</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-[#e8d5aa]/70 pt-2 border-t border-[#dfb15b]/10">
                      <span>Atmosphere: {spot.atmosphere}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Summary Note */}
        <div className="mt-10 p-5 bg-[#26050e] border border-[#dfb15b]/30 rounded-xl text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold text-[#ffd700] tracking-wider block">
            Looking for something specific?
          </span>
          <p className="text-xs sm:text-sm text-[#e8d5aa]/80">
            For classic slow-charcoal chicken with spicy house gravy, signature <strong className="text-[#ffd700]">Royal Beef Mandi (₹240)</strong> & fragrant Bishawari rice on Calicut Road, Yamama Shawaya is the direct choice. For traditional pit-cooked mutton mandi, Nahdi Kuzhimandhi is 3.8 km towards the bypass.
          </p>
        </div>

      </div>
    </section>
  );
};

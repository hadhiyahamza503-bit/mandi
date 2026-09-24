import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Heart, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

export const LocationFooter: React.FC = () => {
  return (
    <footer id="location" className="bg-[#120205] text-[#f5ebd7] border-t border-[#dfb15b]/30">
      {/* Location & Directions Highlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-[#dfb15b]/20">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfb15b]">
              Find Yamama Shawaya
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ffd700]">
              Visit Us on Calicut Road, Angadipuram
            </h2>
            <p className="text-sm text-[#e8d5aa]/85 leading-relaxed max-w-xl">
              Conveniently positioned on the main Calicut Road corridor between Angadipuram and Tirurkad, near Perinthalmanna. Ample roadside parking for quick takeaway and dining visitors.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#ffd700] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f5ebd7] block">Address:</strong>
                  <span className="text-[#e8d5aa]/90">{RESTAURANT_INFO.address}</span>
                  <span className="block text-xs text-[#dfb15b]/80 mt-0.5">
                    (Oradampalam-Valiyavitilpadi, Tirurkad, Perinthalmanna, Kerala 679321)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-[#ffd700] shrink-0" />
                <div>
                  <strong className="text-[#f5ebd7]">Working Hours: </strong>
                  <span className="text-[#e8d5aa]/90">Daily 11:00 AM – 11:00 PM</span>
                  <span className="text-xs text-[#dfb15b] block">Dining room opens at 12:30 PM · Peak rush at 9:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-[#ffd700] shrink-0" />
                <div>
                  <strong className="text-[#f5ebd7]">Contact & Orders: </strong>
                  <span className="text-[#ffd700] font-semibold">{RESTAURANT_INFO.phones.join('  /  ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#1a0307]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
                className="px-5 py-2.5 bg-[#2a050f] hover:bg-[#380815] border border-[#dfb15b]/40 text-[#ffd700] font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#dfb15b]" />
                <span>Call Restaurant Desk</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Card */}
          <div className="lg:col-span-5 bg-[#1f0308] border border-[#dfb15b]/35 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfb15b]/20">
              <div className="flex items-center gap-3">
                <img
                  src={RESTAURANT_INFO.logo}
                  alt="Yamama Logo Badge"
                  className="w-10 h-10 rounded-full border border-[#ffd700] object-cover"
                />
                <div>
                  <span className="font-cinzel text-base font-bold text-[#ffd700] block leading-tight">
                    {RESTAURANT_INFO.name}
                  </span>
                  <span className="text-[10px] text-[#dfb15b] font-semibold tracking-wider uppercase">
                    {RESTAURANT_INFO.motto}
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live on Highway
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#e8d5aa]">
              <div className="flex justify-between py-1 border-b border-[#dfb15b]/10">
                <span className="text-[#dfb15b]">Price per person:</span>
                <span className="font-bold text-[#ffd700]">₹1–200 (Reported by 40+ people)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#dfb15b]/10">
                <span className="text-[#dfb15b]">Popular times:</span>
                <span className="font-medium text-[#f5ebd7]">Mon–Sun peak at 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#dfb15b]/10">
                <span className="text-[#dfb15b]">Typical dwell time:</span>
                <span className="font-medium text-[#f5ebd7]">30 mins</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#dfb15b]/10">
                <span className="text-[#dfb15b]">Services offered:</span>
                <span className="font-medium text-[#f5ebd7]">Dine-in, Takeaway & Home Delivery</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#ffd700] hover:text-[#fff] underline flex items-center justify-center gap-1 font-medium"
              >
                <span>View Google Maps listing & reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Quiet Editorial Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#dfb15b]/70">
          <p>© {new Date().getFullYear()} Yamama Shawaya. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Specialty Charcoal Rotisserie & Bishawari Flavored Rice</span>
            <span aria-hidden="true">·</span>
            <span>Angadipuram, Kerala</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

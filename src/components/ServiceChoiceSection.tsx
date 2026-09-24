import React, { useState } from 'react';
import { Utensils, Bike, Clock, Phone, MapPin, Users, Calendar, AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO, POPULAR_TIMES_DATA } from '../data/restaurantData.ts';

interface ServiceChoiceSectionProps {
  activeMode: 'dine-in' | 'delivery';
  setActiveMode: (mode: 'dine-in' | 'delivery') => void;
  onExploreMenu: () => void;
}

export const ServiceChoiceSection: React.FC<ServiceChoiceSectionProps> = ({
  activeMode,
  setActiveMode,
  onExploreMenu,
}) => {
  // Table booking state
  const [partySize, setPartySize] = useState('2-3 People');
  const [diningTime, setDiningTime] = useState('08:30 PM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Quick delivery form
  const [deliveryArea, setDeliveryArea] = useState('Angadipuram');
  const [selectedQuickCombo, setSelectedQuickCombo] = useState('Half Shawaya + Bishawari Combo (₹340)');

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    // Auto-compose WhatsApp message for table reservation
    const message = `Hello Yamama Shawaya, I would like to reserve/notify a table for Dine-In at Angadipuram.\nName: ${customerName || 'Guest'}\nParty Size: ${partySize}\nTime: ${diningTime}\nPhone: ${customerPhone || 'Not provided'}`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleQuickDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Yamama Shawaya, I want to order Delivery to ${deliveryArea}.\nItem: ${selectedQuickCombo}\nName: ${customerName || 'Customer'}\nPhone: ${customerPhone || 'Direct Call'}`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="service-choice" className="py-14 sm:py-20 bg-[#1e0409] border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700]">
            Experience Yamama Your Way
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5ebd7] text-balance">
            Are You Planning to Dine In or Order Delivery?
          </h2>
          <p className="text-sm sm:text-base text-[#e8d5aa]/80">
            Enjoy our hot charcoal slow-fired chicken fresh from the rotisserie at our Calicut Road dining hall, or enjoy rapid doorstep delivery across Angadipuram & Perinthalmanna.
          </p>

          {/* Interactive Mode Segmented Control */}
          <div className="inline-flex p-1.5 bg-[#2a050e] border border-[#dfb15b]/40 rounded-xl shadow-inner mt-4">
            <button
              onClick={() => setActiveMode('dine-in')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeMode === 'dine-in'
                  ? 'bg-gradient-to-r from-[#dfb15b] to-[#c79430] text-[#1a0307] shadow-md'
                  : 'text-[#e8d5aa] hover:text-[#ffd700]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Dine-In at Angadipuram</span>
            </button>

            <button
              onClick={() => setActiveMode('delivery')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeMode === 'delivery'
                  ? 'bg-gradient-to-r from-[#dfb15b] to-[#c79430] text-[#1a0307] shadow-md'
                  : 'text-[#e8d5aa] hover:text-[#ffd700]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Home Delivery & Takeaway</span>
            </button>
          </div>
        </div>

        {/* Content Box Based on Active Mode */}
        {activeMode === 'dine-in' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Popular Times & Peak Hours Warning */}
            <div className="lg:col-span-6 bg-[#26050e] border border-[#dfb15b]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#dfb15b] font-semibold">
                  Google Live Insights
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffd700] mt-1">
                  Popular Times & Atmosphere
                </h3>
                <p className="text-sm text-[#e8d5aa]/80 mt-1">
                  Average spend: ₹1–200 per person · People typically spend 30 minutes here.
                </p>
              </div>

              {/* Peak 9 PM Warning Note */}
              <div className="p-4 bg-[#390814] border-l-4 border-[#ffb703] rounded-r-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#ffb703] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#f5ebd7]">
                  <strong className="text-[#ffd700] block mb-0.5">9:00 PM: Usually Busy</strong>
                  <span>Peak dining time with up to 20–30 minutes wait for family seating. We recommend arriving around 7:30 PM or placing a quick table notice below.</span>
                </div>
              </div>

              {/* Popular Times Day Bar Visualization */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase text-[#dfb15b]/70 tracking-wider">
                  Weekly Rush Hours (9 PM Peak)
                </span>
                <div className="grid grid-cols-7 gap-2 pt-2">
                  {POPULAR_TIMES_DATA.map((item) => (
                    <div key={item.day} className="flex flex-col items-center gap-1.5">
                      <div className="w-full bg-[#1b0307] h-24 rounded-lg flex items-end p-1 relative group">
                        <div
                          style={{ height: `${item.busyLevel}%` }}
                          className={`w-full rounded-md transition-all ${
                            item.busyLevel >= 90
                              ? 'bg-gradient-to-t from-[#c79430] to-[#ffd700]'
                              : 'bg-[#dfb15b]/60'
                          }`}
                        />
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#160206] border border-[#dfb15b] text-[10px] text-[#ffd700] px-1.5 py-0.5 rounded whitespace-nowrap z-20">
                          {item.waitMinutes}m wait
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[#e8d5aa]">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing Details */}
              <div className="pt-2 border-t border-[#dfb15b]/20 grid grid-cols-2 gap-4 text-xs text-[#e8d5aa]">
                <div>
                  <span className="text-[#dfb15b] block font-semibold">Dining Opening</span>
                  <span>Daily 12:30 PM (Kitchen opens 11:00 AM)</span>
                </div>
                <div>
                  <span className="text-[#dfb15b] block font-semibold">Closing Time</span>
                  <span>11:00 PM Sharp</span>
                </div>
              </div>
            </div>

            {/* Right Column: Table Reservation / Notify Visit Form */}
            <div className="lg:col-span-6 bg-[#26050e] border border-[#dfb15b]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#dfb15b] font-semibold">
                  Reserve or Notify Arrival
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffd700] mt-1">
                  Dine-In Table Request
                </h3>
                <p className="text-sm text-[#e8d5aa]/80 mt-1">
                  Let the counter know in advance so our rotisserie team keeps your slow-fired Shawaya and hot Bishawari rice ready!
                </p>
              </div>

              {bookingConfirmed ? (
                <div className="p-6 bg-[#340813] border border-[#dfb15b]/40 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#ffd700] mx-auto" />
                  <h4 className="font-cinzel text-lg font-bold text-[#f5ebd7]">
                    Request Prepared!
                  </h4>
                  <p className="text-xs text-[#e8d5aa]/90 leading-relaxed">
                    We have opened WhatsApp to confirm with the restaurant desk at Calicut Road. You can also call us directly at <strong>{RESTAURANT_INFO.phones[0]}</strong>.
                  </p>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="text-xs text-[#ffd700] underline font-semibold mt-2 cursor-pointer"
                  >
                    Modify details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTableSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      >
                        <option>1 Person (Solo combo)</option>
                        <option>2-3 People (Half Shawaya)</option>
                        <option>4-6 People (Full Platter)</option>
                        <option>Family Group (7+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                        Expected Arrival Time
                      </label>
                      <select
                        value={diningTime}
                        onChange={(e) => setDiningTime(e.target.value)}
                        className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      >
                        <option>12:30 PM (Lunch)</option>
                        <option>01:30 PM (Lunch)</option>
                        <option>07:00 PM (Early Dinner)</option>
                        <option>08:00 PM (Dinner)</option>
                        <option>08:30 PM (Dinner)</option>
                        <option>09:00 PM (Peak Dinner)</option>
                        <option>09:30 PM (Dinner)</option>
                        <option>10:15 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ahamed Faris"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 97473 62102"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Table Request to Counter</span>
                    </button>

                    <a
                      href={RESTAURANT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-[#340813] hover:bg-[#450c1b] border border-[#dfb15b]/40 text-[#ffd700] font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#dfb15b]" />
                      <span>Get Driving Directions</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* Delivery & Takeaway Mode */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Delivery Info & Hotlines */}
            <div className="lg:col-span-6 bg-[#26050e] border border-[#dfb15b]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#dfb15b] font-semibold">
                  Fast Doorstep Dispatch
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffd700] mt-1">
                  Home Delivery & Parcel Takeaway
                </h3>
                <p className="text-sm text-[#e8d5aa]/80 mt-1">
                  Enjoy hot shawaya chicken and steaming Bishawari rice delivered fresh to your home or office.
                </p>
              </div>

              {/* Service Areas */}
              <div className="p-4 bg-[#330813] rounded-xl border border-[#dfb15b]/25 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffd700] block">
                  Delivery Coverage Radii
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[#e8d5aa]">
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Angadipuram</span>
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Perinthalmanna Town</span>
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Tirurkad</span>
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Valiyavitilpadi</span>
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Oradampalam</span>
                  <span className="px-2.5 py-1 bg-[#1a0307] rounded-md border border-[#dfb15b]/20">Cherukara Road</span>
                </div>
              </div>

              {/* Direct Call Cards */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#dfb15b] uppercase tracking-wider block">
                  Direct Order Hotlines
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RESTAURANT_INFO.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="p-3.5 bg-[#1f040a] hover:bg-[#2d050f] border border-[#dfb15b]/40 rounded-xl flex items-center gap-3 text-[#ffd700] font-bold text-sm transition-all group"
                    >
                      <Phone className="w-5 h-5 text-[#dfb15b] group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block text-[10px] text-[#e8d5aa]/70 font-normal">Delivery Desk</span>
                        <span>{phone}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#dfb15b]/20 flex items-center justify-between text-xs text-[#e8d5aa]">
                <span>No minimum order for Angadipuram</span>
                <span className="text-[#ffd700] font-semibold">Packaging with foil heat seal</span>
              </div>
            </div>

            {/* Quick Delivery WhatsApp Order Builder */}
            <div className="lg:col-span-6 bg-[#26050e] border border-[#dfb15b]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#dfb15b] font-semibold">
                  Express Order via WhatsApp
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffd700] mt-1">
                  1-Click Delivery Order
                </h3>
                <p className="text-sm text-[#e8d5aa]/80 mt-1">
                  Choose your combo, enter delivery address, and send directly to Yamama's WhatsApp order line.
                </p>
              </div>

              <form onSubmit={handleQuickDeliverySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                    Select Your Favorite Shawaya Combo
                  </label>
                  <select
                    value={selectedQuickCombo}
                    onChange={(e) => setSelectedQuickCombo(e.target.value)}
                    className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                  >
                    <option>👑 Royal Beef Mandi Single Plate (₹240)</option>
                    <option>👑 Royal Beef Mandi Half Plate (₹460)</option>
                    <option>👑 Royal Beef Mandi Full Platter (₹890)</option>
                    <option>Quarter Shawaya + Bishawari Combo (₹180)</option>
                    <option>Half Shawaya + Bishawari Combo (₹340)</option>
                    <option>Full Shawaya + Bishawari Feast Platter (₹660)</option>
                    <option>Quarter Masala Shawaya Combo (₹190)</option>
                    <option>Half Masala Shawaya Combo (₹360)</option>
                    <option>Full Masala Shawaya Combo (₹690)</option>
                    <option>Peri Peri Al Faham (Quarter ₹150 / Half ₹280)</option>
                    <option>Honey Chilli Al Faham (Quarter ₹160 / Half ₹300)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                      Your Delivery Area / Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Calicut Rd / Tirurkad"
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      required
                      className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#dfb15b] mb-1.5">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9847123456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full bg-[#1b0307] border border-[#dfb15b]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order to WhatsApp (097473 62102)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onExploreMenu}
                    className="py-3 px-4 bg-[#340813] hover:bg-[#450c1b] border border-[#dfb15b]/40 text-[#ffd700] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Custom Cart Items
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

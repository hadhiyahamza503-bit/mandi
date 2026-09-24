import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData.ts';

export interface CartItem {
  item: MenuItem;
  portion?: { label: string; price: number };
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => {
    const unitPrice = curr.portion ? curr.portion.price : curr.item.price;
    return acc + unitPrice * curr.quantity;
  }, 0);

  const packagingFee = orderType === 'delivery' && subtotal > 0 ? 20 : 0;
  const grandTotal = subtotal + packagingFee;

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let itemsList = cartItems
      .map((ci) => {
        const title = ci.portion ? `${ci.item.name} (${ci.portion.label})` : ci.item.name;
        const price = (ci.portion ? ci.portion.price : ci.item.price) * ci.quantity;
        return `• ${ci.quantity}x ${title} - ₹${price}`;
      })
      .join('\n');

    const msg = `*NEW ORDER - YAMAMA SHAWAYA*\n` +
      `---------------------------------\n` +
      `*Order Type:* ${orderType.toUpperCase()}\n` +
      `*Customer:* ${customerName || 'Customer'}\n` +
      `*Phone:* ${customerPhone || 'Direct Call'}\n` +
      (orderType === 'delivery' ? `*Delivery Address:* ${deliveryAddress || 'Angadipuram / Perinthalmanna'}\n` : '') +
      (orderNotes ? `*Special Notes:* ${orderNotes}\n` : '') +
      `---------------------------------\n` +
      `*Items:*\n${itemsList}\n` +
      `---------------------------------\n` +
      (packagingFee > 0 ? `*Packaging:* ₹${packagingFee}\n` : '') +
      `*Grand Total:* ₹${grandTotal}\n\n` +
      `_Please confirm preparation time and dispatch._`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#24050e] border-l border-[#dfb15b]/40 shadow-2xl flex flex-col text-[#f5ebd7]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#2d0712] border-b border-[#dfb15b]/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={RESTAURANT_INFO.logo}
                alt="Yamama Shawaya Logo"
                className="w-9 h-9 rounded-full border border-[#ffd700] object-cover"
              />
              <div>
                <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#ffd700] leading-tight">
                  Your Yamama Order
                </h2>
                <span className="text-[10px] text-[#dfb15b] tracking-wider uppercase block">
                  {RESTAURANT_INFO.motto}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#e8d5aa] hover:text-[#ffd700] rounded-lg hover:bg-[#3d0916] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Empty state */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#dfb15b]/40 mx-auto" />
                <p className="font-cinzel text-base text-[#e8d5aa]">Your order tray is empty</p>
                <p className="text-xs text-[#e8d5aa]/70 max-w-xs mx-auto">
                  Add slow-fired chicken shawaya, Royal Beef Mandi, Bishawari rice combos, or Al Faham barbecue to get started.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#dfb15b] hover:bg-[#ffd700] text-[#1a0307] text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Itemized List */}
                <div className="space-y-3">
                  {cartItems.map((ci, index) => {
                    const unitPrice = ci.portion ? ci.portion.price : ci.item.price;
                    const itemTotal = unitPrice * ci.quantity;

                    return (
                      <div
                        key={`${ci.item.id}-${ci.portion?.label || 'default'}`}
                        className="p-3 bg-[#1b0307] border border-[#dfb15b]/25 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#f5ebd7] truncate">
                            {ci.item.name}
                          </h4>
                          {ci.portion && (
                            <span className="text-[11px] text-[#dfb15b] block font-medium">
                              Portion: {ci.portion.label}
                            </span>
                          )}
                          <span className="text-xs font-bold text-[#ffd700] tabular-nums">
                            ₹{unitPrice}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(index, ci.quantity - 1)}
                            className="p-1 rounded bg-[#2e0611] hover:bg-[#420a1a] text-[#dfb15b] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="text-xs font-bold text-[#f5ebd7] w-5 text-center tabular-nums">
                            {ci.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(index, ci.quantity + 1)}
                            className="p-1 rounded bg-[#2e0611] hover:bg-[#420a1a] text-[#dfb15b] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#ffd700] tabular-nums block">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery or Takeaway Toggle */}
                <div className="p-3.5 bg-[#1b0307] border border-[#dfb15b]/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#dfb15b] uppercase tracking-wider">
                      Fulfillment Mode
                    </span>
                    <div className="flex items-center gap-1 p-1 bg-[#28050e] rounded-lg">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                          orderType === 'delivery'
                            ? 'bg-[#dfb15b] text-[#1a0307]'
                            : 'text-[#e8d5aa]'
                        }`}
                      >
                        Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                          orderType === 'takeaway'
                            ? 'bg-[#dfb15b] text-[#1a0307]'
                            : 'text-[#e8d5aa]'
                        }`}
                      >
                        Takeaway
                      </button>
                    </div>
                  </div>

                  {/* Customer inputs */}
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#24050e] border border-[#dfb15b]/30 rounded-lg px-3 py-2 text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                    <input
                      type="tel"
                      placeholder="Contact Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#24050e] border border-[#dfb15b]/30 rounded-lg px-3 py-2 text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                    {orderType === 'delivery' && (
                      <textarea
                        rows={2}
                        placeholder="Delivery Location / Landmark in Angadipuram / Perinthalmanna"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-[#24050e] border border-[#dfb15b]/30 rounded-lg px-3 py-2 text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Special instructions (e.g. extra spicy gravy, no mayo)"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full bg-[#24050e] border border-[#dfb15b]/30 rounded-lg px-3 py-2 text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="p-3.5 bg-[#1b0307] border border-[#dfb15b]/25 rounded-xl space-y-1.5 text-xs text-[#e8d5aa]">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-[#f5ebd7] tabular-nums">₹{subtotal}</span>
                  </div>
                  {packagingFee > 0 && (
                    <div className="flex justify-between text-[#dfb15b]">
                      <span>Foil Sealing & Delivery Packaging</span>
                      <span className="font-bold tabular-nums">₹{packagingFee}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#dfb15b]/20 flex justify-between text-sm font-bold text-[#ffd700]">
                    <span>Total Amount</span>
                    <span className="tabular-nums font-cinzel text-lg">₹{grandTotal}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Controls */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#2d0712] border-t border-[#dfb15b]/25 space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] font-bold text-sm rounded-xl shadow-lg shadow-black/40 hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order via WhatsApp (₹{grandTotal})</span>
              </button>

              <div className="flex items-center justify-between text-xs">
                <a
                  href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
                  className="text-[#dfb15b] hover:text-[#ffd700] flex items-center gap-1 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {RESTAURANT_INFO.phones[0]}</span>
                </a>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

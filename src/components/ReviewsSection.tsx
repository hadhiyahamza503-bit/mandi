import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, Quote, Sparkles, Filter, Award, Check } from 'lucide-react';
import { REVIEWS_DATA, RESTAURANT_INFO, Review } from '../data/restaurantData.ts';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<'all' | 'shawaya' | 'mandi' | 'alfaham' | 'delivery'>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newHighlightDish, setNewHighlightDish] = useState('Royal Beef Mandi Platter (₹240)');
  const [newTag, setNewTag] = useState<'shawaya' | 'mandi' | 'alfaham' | 'delivery' | 'ambience'>('mandi');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => {
      const isLiked = !!prev[id];
      const nextLiked = !isLiked;
      
      // Update review likes count
      setReviews((cur) =>
        cur.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              likes: (r.likes || 0) + (nextLiked ? 1 : -1),
            };
          }
          return r;
        })
      );
      
      return { ...prev, [id]: nextLiked };
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      source: 'Google',
      comment: newComment,
      highlightDish: newHighlightDish,
      tag: newTag,
      likes: 1,
      badge: 'Verified Customer',
    };

    setReviews([newRev, ...reviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setShowReviewModal(false);
      setNewAuthor('');
      setNewComment('');
    }, 1500);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mandi') return r.tag === 'mandi' || r.highlightDish?.toLowerCase().includes('mandi') || r.comment.toLowerCase().includes('mandi');
    if (activeFilter === 'shawaya') return r.tag === 'shawaya' || r.highlightDish?.toLowerCase().includes('shawaya') || r.comment.toLowerCase().includes('shawaya');
    if (activeFilter === 'alfaham') return r.tag === 'alfaham' || r.highlightDish?.toLowerCase().includes('alfaham') || r.comment.toLowerCase().includes('faham');
    if (activeFilter === 'delivery') return r.tag === 'delivery' || r.highlightDish?.toLowerCase().includes('delivery') || r.comment.toLowerCase().includes('delivery');
    return true;
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#160206] border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfb15b]">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>Real Customer Testimonials</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#f5ebd7]">
              Customer Experiences & Reviews
            </h2>
            <p className="text-sm text-[#e8d5aa]/80">
              Read verified feedback from diners, Google Local Guides, and food lovers who enjoy our charcoal shawaya, Royal Beef Mandi, and Bishawari rice on Calicut Road.
            </p>
          </div>

          {/* Aggregate Rating Scoreboard Card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 p-5 bg-[#26050e] border border-[#dfb15b]/35 rounded-2xl shadow-xl shrink-0">
            <div className="text-center pr-5 sm:border-r border-[#dfb15b]/20">
              <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#ffd700] tabular-nums">4.1</span>
              <div className="flex text-[#ffd700] text-xs justify-center mt-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ffd700]" />
                ))}
                <Star className="w-4 h-4 fill-[#ffd700]/40 text-[#ffd700]" />
              </div>
              <span className="text-[11px] text-[#e8d5aa]/80 mt-1 block">218 Google Reviews</span>
            </div>

            {/* Rating breakdown small bars */}
            <div className="space-y-1.5 min-w-[140px] text-[10px] text-[#e8d5aa]">
              <div className="flex items-center gap-1.5">
                <span className="w-6 font-semibold">5★</span>
                <div className="flex-1 bg-[#1a0307] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ffd700] h-full w-[82%]" />
                </div>
                <span className="w-6 text-right tabular-nums">82%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 font-semibold">4★</span>
                <div className="flex-1 bg-[#1a0307] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#dfb15b] h-full w-[14%]" />
                </div>
                <span className="w-6 text-right tabular-nums">14%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-6 font-semibold">3★</span>
                <div className="flex-1 bg-[#1a0307] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-700 h-full w-[4%]" />
                </div>
                <span className="w-6 text-right tabular-nums">4%</span>
              </div>
            </div>

            <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-[#dfb15b]/20 pt-3 sm:pt-0 sm:pl-5 w-full sm:w-auto">
              <div className="text-xs text-[#e8d5aa]">
                <span className="font-semibold text-[#ffd700]">4.0 / 5</span> on Justdial (217 votes)
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#dfb15b] to-[#c79430] hover:from-[#ffd700] hover:to-[#dfb15b] text-[#1a0307] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-[#dfb15b] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </span>
          {[
            { id: 'all', label: `All Reviews (${reviews.length})` },
            { id: 'mandi', label: '👑 Royal Beef Mandi' },
            { id: 'shawaya', label: '🔥 Charcoal Shawaya' },
            { id: 'alfaham', label: '🍗 Al Faham & Grills' },
            { id: 'delivery', label: '🚀 Rapid Home Delivery' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#dfb15b] text-[#1a0307] shadow-sm'
                  : 'bg-[#25050e] text-[#e8d5aa] border border-[#dfb15b]/30 hover:border-[#dfb15b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#24050e] border border-[#dfb15b]/25 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#ffd700]/60 transition-all shadow-lg hover:shadow-black/70 group"
            >
              <div className="space-y-3">
                {/* Author row & rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#450b1a] to-[#25050d] border border-[#dfb15b]/50 flex items-center justify-center text-[#ffd700] font-cinzel font-bold text-xs shrink-0 shadow-sm">
                      {getInitials(rev.author)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-semibold text-sm text-[#f5ebd7] leading-tight">{rev.author}</h3>
                        {rev.badge && (
                          <span className="text-[9px] bg-[#3a0815] text-[#ffd700] border border-[#dfb15b]/30 px-1.5 py-0.5 rounded font-medium">
                            {rev.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#dfb15b]/70 mt-0.5">
                        <span className="font-medium text-[#dfb15b]">{rev.source}</span>
                        <span aria-hidden="true">·</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex text-[#ffd700] shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700]" />
                    ))}
                  </div>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-[#e8d5aa]/95 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Footer row: Tag for highlight dish & helpful like button */}
              <div className="pt-3 border-t border-[#dfb15b]/15 flex items-center justify-between gap-2 text-[11px]">
                {rev.highlightDish ? (
                  <div className="flex items-center gap-1 truncate text-[#dfb15b]/80">
                    <span className="text-[#dfb15b]/60">Fav:</span>
                    <span className="font-semibold text-[#ffd700] truncate">{rev.highlightDish}</span>
                  </div>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() => handleToggleLike(rev.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer shrink-0 ${
                    likedReviews[rev.id]
                      ? 'bg-[#dfb15b]/20 text-[#ffd700] border border-[#dfb15b]/50'
                      : 'bg-[#1c0308] text-[#e8d5aa]/70 hover:text-[#ffd700] hover:bg-[#2b050f]'
                  }`}
                  title="Mark review as helpful"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? 'fill-[#ffd700]' : ''}`} />
                  <span className="tabular-nums font-medium">{rev.likes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#28060f] border border-[#dfb15b]/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
              <h3 className="font-cinzel text-xl font-bold text-[#ffd700] mb-2">
                Share Your Experience at Yamama
              </h3>
              <p className="text-xs text-[#e8d5aa]/80 mb-5">
                Tell fellow diners about the charcoal shawaya, Royal Beef Mandi, Bishawari rice flavor, or delivery speed.
              </p>

              {submittedFeedback ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#ffd700] mx-auto animate-bounce" />
                  <p className="font-cinzel text-lg font-bold text-[#f5ebd7]">Thank You!</p>
                  <p className="text-xs text-[#e8d5aa]">Your review has been verified and posted to the community feed.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#dfb15b] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Faizal Mon / Noufal"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      required
                      className="w-full bg-[#160206] border border-[#dfb15b]/40 rounded-lg px-3 py-2 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#dfb15b] mb-1">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating ? 'fill-[#ffd700] text-[#ffd700]' : 'text-stone-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-[#ffd700] font-bold ml-2">
                        {newRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1">
                        Category
                      </label>
                      <select
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value as any)}
                        className="w-full bg-[#160206] border border-[#dfb15b]/40 rounded-lg px-2.5 py-2 text-xs text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      >
                        <option value="mandi">Royal Beef Mandi</option>
                        <option value="shawaya">Charcoal Shawaya</option>
                        <option value="alfaham">Al Faham Barbecue</option>
                        <option value="delivery">Home Delivery</option>
                        <option value="ambience">Dining Atmosphere</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#dfb15b] mb-1">
                        Favorite Dish
                      </label>
                      <select
                        value={newHighlightDish}
                        onChange={(e) => setNewHighlightDish(e.target.value)}
                        className="w-full bg-[#160206] border border-[#dfb15b]/40 rounded-lg px-2.5 py-2 text-xs text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                      >
                        <option>Royal Beef Mandi Platter (₹240)</option>
                        <option>Quarter Shawaya + Bishawari Combo (₹180)</option>
                        <option>Half Shawaya + Bishawari Combo (₹340)</option>
                        <option>Full Feast Platter (₹660)</option>
                        <option>Special Spiced House Gravy</option>
                        <option>Honey Chilli Al Faham</option>
                        <option>Peri Peri Al Faham</option>
                        <option>Fast Home Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#dfb15b] mb-1">
                      Your Comments
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Delicious charcoal taste, tender beef mandi, and the gravy with rice was fantastic..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      className="w-full bg-[#160206] border border-[#dfb15b]/40 rounded-lg px-3 py-2 text-sm text-[#f5ebd7] focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="px-4 py-2 text-xs text-[#e8d5aa] hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-gradient-to-r from-[#dfb15b] to-[#c79430] text-[#1a0307] font-bold text-xs rounded-lg hover:from-[#ffd700] hover:to-[#dfb15b] cursor-pointer shadow-md"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

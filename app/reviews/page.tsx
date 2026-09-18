"use client";

import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface ReviewItem {
  id: string;
  name: string;
  phone?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch {
      // Ignore network error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg("Please enter your review or suggestion!");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
          phone: phone.trim() || undefined,
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("🎉 Thank you! Your review has been submitted.");
        setName("");
        setPhone("");
        setComment("");
        setRating(5);
        if (data.review) {
          setReviews([data.review, ...reviews]);
        }
      } else {
        setErrorMsg(data.error || "Failed to submit review.");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0b0f19] px-4 pt-28 pb-20 text-white md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-[#00D2FF] uppercase">
              Community Feedback & Ratings
            </p>
            <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
              User <span className="text-[#00D2FF]">Reviews & Suggestions</span>
            </h1>
            <p className="mt-3 text-sm text-white/70 md:text-base">
              Share your experience, request new free tools, games, or streaming resources!
            </p>

            {/* Average Rating Banner */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2">
              <span className="text-2xl font-black text-[#00D2FF]">
                {averageRating}
              </span>
              <div className="flex text-yellow-400">
                {"★".repeat(Math.round(Number(averageRating)))}
                {"☆".repeat(5 - Math.round(Number(averageRating)))}
              </div>
              <span className="text-xs text-white/50">
                ({reviews.length} total reviews)
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white">Leave a Review or Suggestion</h2>
            <p className="mt-1 text-xs text-white/50">
              Name and phone number are optional. Your phone number is never shown publicly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Your Rating:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span
                        className={
                          (hoverRating || rating) >= star
                            ? "text-yellow-400"
                            : "text-white/20"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#00D2FF] self-center">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Your Name <span className="text-white/40 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex (defaults to Anonymous)"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Phone / WhatsApp <span className="text-white/40 font-normal">(Optional & Private)</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 234 567 8900"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Review / Suggestion Textarea */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Your Review / Suggestion <span className="text-[#00D2FF]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you like, or suggest movies, games, and tools we should add..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#00D2FF] focus:outline-none"
                  required
                />
              </div>

              {/* Messages */}
              {errorMsg && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  {successMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Community Reviews Feed */}
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-6">
              All Reviews ({reviews.length})
            </h2>

            {loading ? (
              <div className="text-center py-10 text-white/50 text-sm">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
                No reviews yet. Be the first to leave one above!
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00D2FF]/20 font-bold text-[#00D2FF]">
                          {rev.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {rev.name}
                          </h4>
                          <div className="text-xs text-yellow-400">
                            {"★".repeat(rev.rating)}
                            {"☆".repeat(5 - rev.rating)}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs text-white/40">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
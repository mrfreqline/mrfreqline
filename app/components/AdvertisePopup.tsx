"use client";
import { useState } from "react";
import Link from "next/link";

const slides = [
  { id: 1, title: "Desktop Placement", description: "Showcase your brand on our homepage banner.", image: "/ad-1.png" },
  { id: 2, title: "Mobile View Placement", description: "Reach mobile users with optimized banner spots.", image: "/ad-2.png" },
  { id: 3, title: "Sidebar Integration", description: "High-visibility sidebar slots for maximum engagement.", image: "/ad-3.png" },
  { id: 4, title: "Toolkit Banner Placement", description: "Target active users directly on our utility pages.", image: "/ad-4.png" },
];
interface AdvertisePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvertisePopup({ isOpen, onClose }: AdvertisePopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-[#101522] p-5 sm:max-w-xl sm:p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">✕</button>

        <span className="inline-block rounded-md border border-[#00D2FF]/30 bg-[#00D2FF]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#00D2FF]">PARTNERSHIP OPPORTUNITY</span>
        <h2 className="mt-3 text-xl sm:text-2xl font-extrabold text-white">Advertise Your Business</h2>
        <p className="mt-2 text-sm text-white/70">Showcase your brand directly to our audience on MRFREQLINE.</p>

        <div className="mt-5 relative">
          <div className="relative h-40 sm:h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
            <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">{slides[currentIndex].title}</p>
              <p className="mt-1 text-xs sm:text-sm text-white/80">{slides[currentIndex].description}</p>
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-[#00D2FF] hover:text-black">‹</button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-[#00D2FF] hover:text-black">›</button>

          <div className="mt-3 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all ${currentIndex === index ? "w-6 bg-[#00D2FF]" : "w-2 bg-white/20"}`} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">Custom placements and packages available on request.</p>
          <Link href="/contact" onClick={onClose} className="rounded-xl bg-[#00D2FF] px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-black transition hover:opacity-90">Advertise With Us ↗</Link>
        </div>
      </div>
    </div>
  );
}
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col items-center px-6 pt-24 pb-16 text-center">
        {/* Top Tagline */}
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#00D2FF]">
          GAMING • TECH • DIGITAL
        </p>

        {/* Main Brand Title */}
        <h1 className="text-5xl font-extrabold text-white md:text-6xl">
          MR<span className="text-[#00D2FF]">FREQLINE</span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-4 max-w-xl text-white/70">
          Curated tech resources, gaming tools, and guides — verified and updated regularly.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <a
            href="https://youtube.com/@mrfreqline?si=GC3wgeiBRAc0Pq9G"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Watch on YouTube
          </a>

          <a
            href="https://discord.gg/yourlink"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Join Discord
          </a>
        </div>

        {/* 3 Homepage Cards */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 text-left md:grid-cols-3">
          {/* Card 1: Best Free Websites */}
          <Link
            href="/resources"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-[#00D2FF]/50 hover:bg-white/[0.08]"
          >
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D2FF]">
              Best Free Websites
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Verified, tested links across streaming, anime, and utility sites.
            </p>
          </Link>

          {/* Card 2: Best PC Optimization Tools */}
          <Link
            href="/tech"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-[#00D2FF]/50 hover:bg-white/[0.08]"
          >
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D2FF]">
              Best PC Optimization Tools
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Open-source tweaks and boosters to squeeze out extra FPS.
            </p>
          </Link>

          {/* Card 3: Free Gaming Resources (Restored!) */}
          <Link
            href="/gaming/free-resources"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-[#00D2FF]/50 hover:bg-white/[0.08]"
          >
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D2FF]">
              Free Gaming Resources
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Optimized configs, game boosters, and free verified gaming assets.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
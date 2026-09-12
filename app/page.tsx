import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col items-center px-6 pt-24 pb-16 text-center">
        <p className="mb-2 text-sm font-semibold tracking-widest text-[#00D2FF]">
          GAMING • TECH • DIGITAL
        </p>

        <h1 className="text-5xl font-extrabold text-white md:text-6xl">
          MR<span className="text-[#00D2FF]">FREQLINE</span>
        </h1>

        <p className="mt-4 max-w-xl text-white/70">
          Curated tech resources, gaming tools, and guides — verified and updated regularly.
        </p>

        <div className="mt-8 flex gap-4">
          {/* YouTube */}
          <a
            href="https://youtube.com/@mrfreqline?si=GC3wgeiBRAc0Pq9G"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 shadow-lg shadow-[#00D2FF]/20"
          >
            Watch on YouTube
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/P6jNH9HDc6"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00D2FF] hover:bg-white/5"
          >
            Join Discord
          </a>
        </div>

        <div className="mt-20 grid w-full max-w-6xl gap-6 md:grid-cols-3">
          <a
            href="/resources/best-free-websites"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition hover:border-[#00D2FF] hover:bg-white/10"
          >
            <h3 className="text-lg font-bold text-white">
              Best Free Websites
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Verified, tested links across streaming, anime, and utility sites.
            </p>
          </a>

          <a
            href="/tech/best-pc-optimization-tools"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition hover:border-[#00D2FF] hover:bg-white/10"
          >
            <h3 className="text-lg font-bold text-white">
              Best PC Optimization Tools
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Open-source tweaks and boosters to squeeze out extra FPS.
            </p>
          </a>

          <a
            href="/gaming/free-resources"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition hover:border-[#00D2FF] hover:bg-white/10"
          >
            <h3 className="text-lg font-bold text-white">
              Free Gaming Resources
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Configs, crosshairs, and tools for your favorite games.
            </p>
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
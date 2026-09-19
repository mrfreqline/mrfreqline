import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import AdsterraBanner from "./components/AdsterraBanner";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col items-center px-6 pt-24 pb-16 text-center transition-colors duration-300">
        {/* Top Tagline */}
        <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--accent-primary)]">
          GAMING • TECH • DIGITAL
        </p>

        {/* Main Brand Title */}
        <h1 className="text-5xl font-extrabold text-[var(--text-main)] md:text-6xl">
          MR<span className="text-[var(--accent-primary)]">FREQLINE</span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-4 max-w-xl text-[var(--text-muted)]">
          Curated tech resources, gaming tools, and guides — verified and updated regularly.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <a
            href="https://youtube.com/@mrfreqline?si=GC3wgeiBRAc0Pq9G"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-black shadow-md transition hover:opacity-90 hover:scale-[1.02]"
          >
            Watch on YouTube
          </a>

          <a
            href="https://discord.gg/QQCt4cwqn"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] px-6 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:opacity-80"
          >
            Join Discord
          </a>
        </div>

        {/* Adsterra Responsive Banner */}
        <div className="mt-12 w-full max-w-5xl">
          <AdsterraBanner format="responsive" />
        </div>

        {/* 4 Feature Cards with High-Contrast Typography */}
        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Best Free Websites */}
          <Link
            href="/resources/best-free-websites"
            className="group rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-md transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-[var(--accent-primary)]">
              Best Free Websites
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
              Verified, tested links across streaming, anime, and utility sites.
            </p>
          </Link>

          {/* Card 2: Best PC Optimization Tools */}
          <Link
            href="/tech/best-pc-optimization-tools"
            className="group rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-md transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-[var(--accent-primary)]">
              Best PC Optimization Tools
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
              Open-source tweaks and boosters to squeeze out extra FPS.
            </p>
          </Link>

          {/* Card 3: Free Gaming Resources */}
          <Link
            href="/gaming/free-resources"
            className="group rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-md transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-[var(--accent-primary)]">
              Free Gaming Resources
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
              Free game utilities, boosters, asset packs, and verified tools.
            </p>
          </Link>

          {/* Card 4: The Internet Vault */}
          <Link
            href="/resources/internet-vault"
            className="group rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-md transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-[var(--accent-primary)]">
              The Internet Vault
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
              Master archive of developer tools, books, audio, and media software.
            </p>
          </Link>
        </div>

        {/* Adsterra Native Banner */}
        <div className="mt-12 w-full max-w-5xl">
          <AdsterraBanner format="native" />
        </div>
      </main>

      <Footer />
    </>
  );
}
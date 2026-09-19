import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <span>© 2026 MrFreqline</span>
        <nav className="flex gap-6">
          <Link href="/" className="transition hover:text-[#00D2FF]">Home</Link>
          <Link href="/prompts" className="transition hover:text-[#00D2FF]">Prompts</Link>
          <Link href="/reviews" className="transition hover:text-[#00D2FF]">Reviews</Link>
          <Link href="/resources" className="transition hover:text-[#00D2FF]">Resources</Link>
          <Link href="/contact" className="transition hover:text-[#00D2FF]">Contact</Link>
          <Link href="/donate" className="transition hover:text-[#00D2FF]">Donate</Link>
          <Link href="/settings" className="transition hover:text-[#00D2FF]">Setting</Link>
        </nav>
      </div>
    </footer>
  );
}
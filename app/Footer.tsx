export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <span>© 2026 MrFreqline</span>
        <nav className="flex gap-6">
          <a href="/" className="transition hover:text-[--accent-cyan]">Home</a>
          <a href="/gaming" className="transition hover:text-[--accent-cyan]">Gaming</a>
          <a href="/tech" className="transition hover:text-[--accent-cyan]">Tech</a>
          <a href="/resources" className="transition hover:text-[--accent-cyan]">Resources</a>
          <a href="/contact" className="transition hover:text-[--accent-cyan]">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
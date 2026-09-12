"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";

export const dynamic = "force-dynamic";

const defaultLinks = [
  // Free Courses
  { title: "freeCodeCamp", category: "Free Courses", status: "TRUSTED", url: "https://www.freecodecamp.org" },
  { title: "Harvard CS50 (edX)", category: "Free Courses", status: "TRUSTED", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x" },
  { title: "Odin Project", category: "Free Courses", status: "TRUSTED", url: "https://www.theodinproject.com" },
  { title: "MIT OpenCourseWare", category: "Free Courses", status: "TRUSTED", url: "https://ocw.mit.edu" },
  { title: "Coursera (Audit Mode)", category: "Free Courses", status: "ACTIVE", url: "https://www.coursera.org" },
  { title: "Khan Academy", category: "Free Courses", status: "TRUSTED", url: "https://www.khanacademy.org" },
  { title: "Sololearn", category: "Free Courses", status: "ACTIVE", url: "https://www.sololearn.com" },
  { title: "Class Central", category: "Free Courses", status: "ACTIVE", url: "https://www.classcentral.com" },
  { title: "Full Stack Open", category: "Free Courses", status: "TRUSTED", url: "https://fullstackopen.com" },
  { title: "Kaggle Learn", category: "Free Courses", status: "ACTIVE", url: "https://www.kaggle.com/learn" },

  // Student Tools
  { title: "GitHub Student Pack", category: "Student Tools", status: "TRUSTED", url: "https://education.github.com/pack" },
  { title: "Notion Education", category: "Student Tools", status: "TRUSTED", url: "https://www.notion.so/product/notion-for-education" },
  { title: "Figma for Students", category: "Student Tools", status: "TRUSTED", url: "https://www.figma.com/education" },
  { title: "JetBrains Student License", category: "Student Tools", status: "TRUSTED", url: "https://www.jetbrains.com/community/education/#students" },
  { title: "Canva for Education", category: "Student Tools", status: "ACTIVE", url: "https://www.canva.com/education" },
  { title: "Spotify Student + Hulu", category: "Student Tools", status: "ACTIVE", url: "https://www.spotify.com/us/student" },
  { title: "Overleaf (LaTeX)", category: "Student Tools", status: "ACTIVE", url: "https://www.overleaf.com" },
  { title: "Autodesk Student Access", category: "Student Tools", status: "ACTIVE", url: "https://www.autodesk.com/education/edu-software" },

  // Movies & Shows
  { title: "1shows.org", category: "Movies & Shows", status: "TRUSTED", url: "https://1shows.org" },
  { title: "1flex.org", category: "Movies & Shows", status: "TRUSTED", url: "https://1flex.org" },
  { title: "1tube.org", category: "Movies & Shows", status: "TRUSTED", url: "https://1tube.org" },
  { title: "shuttletv.su", category: "Movies & Shows", status: "ACTIVE", url: "https://shuttletv.su" },
  { title: "flickystream.mov", category: "Movies & Shows", status: "TRUSTED", url: "https://flickystream.mov" },
  { title: "meowtv.ru", category: "Movies & Shows", status: "ACTIVE", url: "https://meowtv.ru" },
  { title: "rivestream.ru", category: "Movies & Shows", status: "ACTIVE", url: "https://rivestream.ru" },
  { title: "cinema.army", category: "Movies & Shows", status: "ACTIVE", url: "https://cinema.army" },
  { title: "spencerdevs.xyz", category: "Movies & Shows", status: "ACTIVE", url: "https://spencerdevs.xyz" },
  { title: "primeflix.ru", category: "Movies & Shows", status: "ACTIVE", url: "https://primeflix.ru" },
  { title: "nepu.cc", category: "Movies & Shows", status: "ACTIVE", url: "https://nepu.cc" },
  { title: "flixgaze.com", category: "Movies & Shows", status: "ACTIVE", url: "https://flixgaze.com" },
  { title: "netplayz.top", category: "Movies & Shows", status: "ACTIVE", url: "https://netplayz.top" },
  { title: "hollymoviehd.cc", category: "Movies & Shows", status: "ACTIVE", url: "https://hollymoviehd.cc" },
  { title: "cinejoy.to", category: "Movies & Shows", status: "ACTIVE", url: "https://cinejoy.to" },
  { title: "movy.sx", category: "Movies & Shows", status: "ACTIVE", url: "https://movy.sx" },
  { title: "cinemacity.cc", category: "Movies & Shows", status: "ACTIVE", url: "https://cinemacity.cc" },
  { title: "onlyflix.to", category: "Movies & Shows", status: "ACTIVE", url: "https://onlyflix.to" },
  { title: "popcornmovies.ac", category: "Movies & Shows", status: "ACTIVE", url: "https://popcornmovies.ac" },
  { title: "lookmovie2.to", category: "Movies & Shows", status: "ACTIVE", url: "https://lookmovie2.to" },
  { title: "willow.arlen.icu", category: "Movies & Shows", status: "ACTIVE", url: "https://willow.arlen.icu" },
  { title: "fmovies-hd.to", category: "Movies & Shows", status: "ACTIVE", url: "https://fmovies-hd.to" },
  { title: "flixway.ru", category: "Movies & Shows", status: "ACTIVE", url: "https://flixway.ru" },
  { title: "streamingunity.vip", category: "Movies & Shows", status: "ACTIVE", url: "https://streamingunity.vip" },

  // Anime
  { title: "reanime.to", category: "Anime", status: "TRUSTED", url: "https://reanime.to" },
  { title: "animepahe.pw", category: "Anime", status: "TRUSTED", url: "https://animepahe.pw" },
  { title: "anikototv.to", category: "Anime", status: "TRUSTED", url: "https://anikototv.to" },
  { title: "enma.lol", category: "Anime", status: "TRUSTED", url: "https://enma.lol" },
  { title: "miruro.to", category: "Anime", status: "TRUSTED", url: "https://miruro.to" },
  { title: "anime.nexus", category: "Anime", status: "ACTIVE", url: "https://anime.nexus" },
  { title: "anidb.app", category: "Anime", status: "ACTIVE", url: "https://anidb.app" },
  { title: "anikage.cc", category: "Anime", status: "ACTIVE", url: "https://anikage.cc" },
  { title: "anidap.lol", category: "Anime", status: "ACTIVE", url: "https://anidap.lol" },
  { title: "kitetsu.net", category: "Anime", status: "ACTIVE", url: "https://kitetsu.net" },
  { title: "aniflix.uno", category: "Anime", status: "ACTIVE", url: "https://aniflix.uno" },
  { title: "animex.one", category: "Anime", status: "ACTIVE", url: "https://animex.one" },
  { title: "animetvplus.xyz", category: "Anime", status: "ACTIVE", url: "https://animetvplus.xyz" },
  { title: "anistream.one", category: "Anime", status: "ACTIVE", url: "https://anistream.one" },
  { title: "kaa.lt", category: "Anime", status: "ACTIVE", url: "https://kaa.lt" },
  { title: "justanime.to", category: "Anime", status: "ACTIVE", url: "https://justanime.to" },
  { title: "aniwaves.ru", category: "Anime", status: "ACTIVE", url: "https://aniwaves.ru" },
  { title: "animeheaven.me", category: "Anime", status: "ACTIVE", url: "https://animeheaven.me" },
  { title: "anitaku.io", category: "Anime", status: "ACTIVE", url: "https://anitaku.io" },
  { title: "lunarx.to", category: "Anime", status: "ACTIVE", url: "https://lunarx.to" },

  // Manga
  { title: "mangaball.net", category: "Manga", status: "TRUSTED", url: "https://mangaball.net" },
  { title: "atsu.moe", category: "Manga", status: "TRUSTED", url: "https://atsu.moe" },
  { title: "onisaga.com", category: "Manga", status: "TRUSTED", url: "https://onisaga.com" },
  { title: "kagane.to", category: "Manga", status: "ACTIVE", url: "https://kagane.to" },
  { title: "aquareader.org", category: "Manga", status: "ACTIVE", url: "https://aquareader.org" },
  { title: "comick.dev", category: "Manga", status: "ACTIVE", url: "https://comick.dev" },
  { title: "comix.to", category: "Manga", status: "ACTIVE", url: "https://comix.to" },
  { title: "mangadot.net", category: "Manga", status: "ACTIVE", url: "https://mangadot.net" },
  { title: "mangabuddy1.co.uk", category: "Manga", status: "ACTIVE", url: "https://mangabuddy1.co.uk" },
  { title: "qtoon.org", category: "Manga", status: "ACTIVE", url: "https://qtoon.org" },
  { title: "specterscans.com", category: "Manga", status: "ACTIVE", url: "https://specterscans.com" },
  { title: "mangago.me", category: "Manga", status: "ACTIVE", url: "https://mangago.me" },
  { title: "mangafire.to", category: "Manga", status: "ACTIVE", url: "https://mangafire.to" },
  { title: "allmanga.to", category: "Manga", status: "ACTIVE", url: "https://allmanga.to" },
  { title: "mangakakalot.gg", category: "Manga", status: "ACTIVE", url: "https://mangakakalot.gg" },
  { title: "asurascans.com", category: "Manga", status: "ACTIVE", url: "https://asurascans.com" },
  { title: "batcave.biz", category: "Manga", status: "ACTIVE", url: "https://batcave.biz" },
  { title: "readcomicsonline.ru", category: "Manga", status: "ACTIVE", url: "https://readcomicsonline.ru" },
  { title: "mangahub.io", category: "Manga", status: "ACTIVE", url: "https://mangahub.io" },
  { title: "weebcentral.com", category: "Manga", status: "ACTIVE", url: "https://weebcentral.com" },
  { title: "mangakatana.com", category: "Manga", status: "ACTIVE", url: "https://mangakatana.com" },
  { title: "likemanga.ink", category: "Manga", status: "ACTIVE", url: "https://likemanga.ink" },
  { title: "mangaxo.com", category: "Manga", status: "ACTIVE", url: "https://mangaxo.com" },
  { title: "kingofshojo.com", category: "Manga", status: "NEW", url: "https://kingofshojo.com" },

  // Live TV & Sports
  { title: "dlive.sx", category: "Live TV & Sports", status: "TRUSTED", url: "https://dlive.sx" },
  { title: "ondemand.st", category: "Live TV & Sports", status: "TRUSTED", url: "https://ondemand.st" },
  { title: "streamed.pk", category: "Live TV & Sports", status: "TRUSTED", url: "https://streamed.pk" },
  { title: "en97.sportplus.watch", category: "Live TV & Sports", status: "ACTIVE", url: "https://en97.sportplus.watch" },
  { title: "venuevault.live", category: "Live TV & Sports", status: "ACTIVE", url: "https://venuevault.live" },
  { title: "thetvapp.plus", category: "Live TV & Sports", status: "ACTIVE", url: "https://thetvapp.plus" },
  { title: "ntv.cx", category: "Live TV & Sports", status: "ACTIVE", url: "https://ntv.cx" },
  { title: "publiciptv.com", category: "Live TV & Sports", status: "ACTIVE", url: "https://publiciptv.com" },
  { title: "streamking.cx", category: "Live TV & Sports", status: "ACTIVE", url: "https://streamking.cx" },
  { title: "thestreameast.top", category: "Live TV & Sports", status: "ACTIVE", url: "https://thestreameast.top" },
  { title: "v2.sportsurge.net", category: "Live TV & Sports", status: "ACTIVE", url: "https://v2.sportsurge.net" },
  { title: "famelack.com", category: "Live TV & Sports", status: "ACTIVE", url: "https://famelack.com" },
  { title: "sportsbite.org", category: "Live TV & Sports", status: "ACTIVE", url: "https://sportsbite.org" },
  { title: "stmify.com", category: "Live TV & Sports", status: "ACTIVE", url: "https://stmify.com" },
  { title: "ppv.st", category: "Live TV & Sports", status: "ACTIVE", url: "https://ppv.st" },
  { title: "fifstream1.gt.tc", category: "Live TV & Sports", status: "ACTIVE", url: "https://fifstream1.gt.tc" },
  { title: "freetvgarden.com", category: "Live TV & Sports", status: "ACTIVE", url: "https://freetvgarden.com" },

  // Apps
  { title: "playtorrio.pages.dev", category: "Apps", status: "ACTIVE", url: "https://playtorrio.pages.dev" },
  { title: "beetvs.com.co", category: "Apps", status: "ACTIVE", url: "https://beetvs.com.co" },
  { title: "hdobox.net", category: "Apps", status: "ACTIVE", url: "https://hdobox.net" },
  { title: "moviesbox.com.co", category: "Apps", status: "ACTIVE", url: "https://moviesbox.com.co" },
  { title: "netmirror.gg", category: "Apps", status: "ACTIVE", url: "https://netmirror.gg" },
  { title: "pikashowtv.in", category: "Apps", status: "ACTIVE", url: "https://pikashowtv.in" },
  { title: "mobiflix.tv", category: "Apps", status: "ACTIVE", url: "https://mobiflix.tv" },
  { title: "youcineapkpro.com", category: "Apps", status: "NEW", url: "https://youcineapkpro.com" },

  // Free Softwares
  { title: "Ninite", category: "Free Softwares", status: "TRUSTED", url: "https://ninite.com" },
  { title: "7-Zip", category: "Free Softwares", status: "TRUSTED", url: "https://www.7-zip.org" },
  { title: "VLC Media Player", category: "Free Softwares", status: "TRUSTED", url: "https://www.videolan.org/vlc" },
  { title: "LibreOffice", category: "Free Softwares", status: "ACTIVE", url: "https://www.libreoffice.org" },
  { title: "GIMP", category: "Free Softwares", status: "ACTIVE", url: "https://www.gimp.org" },

  // Download Managers
  {
    title: "Free Download Manager",
    category: "Download Managers",
    status: "TRUSTED",
    url: "https://www.freedownloadmanager.org",
    guide: {
      steps: [
        "Visit the official website.",
        "Download the installer for your operating system.",
        "Run the installer and complete the setup.",
        "Enable the browser extension if required.",
      ],
      warning: "Always download software from the official website.",
      youtubeUrl: "https://www.youtube.com/results?search_query=free+download+manager+tutorial",
    },
  },
];

const categories = [
  "All",
  "Movies & Shows",
  "Anime",
  "Manga",
  "Live TV & Sports",
  "Apps",
  "Free Softwares",
  "Download Managers",
  "Free Courses",
  "Student Tools",
];

export default function BestFreeWebsites() {
  const [links, setLinks] = useState<any[]>(defaultLinks);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<{ title: string; guide: any } | null>(null);

  // Fetch items from the backend API/admin panel dynamically
  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Combine fetched links with default links, or replace them depending on preference
          // Using a Map or filtering out duplicates by title/url if necessary, or just appending:
          setLinks([...defaultLinks, ...data]);
        }
      })
      .catch((err) => console.error("Error loading links from database:", err));
  }, []);

  const filteredLinks = links.filter((link) => {
    const matchesCategory =
      activeCategory === "All" || (link.category || "").toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      (link.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFaviconUrl = (siteUrl: string) => {
    try {
      const domain = new URL(siteUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-16 bg-[#07090e] text-white font-sans">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white">Best Free Websites</h1>
              <p className="mt-2 text-white/60">Verified, tested links — safe and working.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-right">
              <span className="text-2xl font-bold text-[#00D2FF]">{filteredLinks.length}</span>
              <span className="ml-2 text-xs text-white/50">Links Found</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all duration-300"
            />
            {/* Category Navbar */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-[#00D2FF] text-black shadow-[0_0_20px_rgba(0,210,255,0.6)] scale-105 font-extrabold"
                      : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}

              {/* Essentials Toolkit button */}
              <Link
                href="/resources/essentials-toolkit"
                className="flex items-center gap-2 rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/10 px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#00D2FF] transition-all duration-300 hover:bg-[#00D2FF] hover:text-black hover:scale-105 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
              >
                <span>🛠️</span>
                <span>Essential Toolkit</span>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {filteredLinks.map((link, index) => (
              <div
                key={`${link.title}-${index}`}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d111a] p-5 transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-lg hover:shadow-[#00D2FF]/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#00D2FF]/20 px-3 py-1 text-xs font-bold text-[#00D2FF]">
                      {link.status || "ACTIVE"}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-1">
                      <img
                        src={getFaviconUrl(link.url)}
                        alt=""
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white">{link.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{link.category}</p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#00D2FF] transition-colors hover:underline"
                  >
                    Visit Website ↗
                  </a>
                  {link.guide && (
                    <button
                      onClick={() => setSelectedGuide({ title: link.title, guide: link.guide })}
                      className="ml-auto rounded-lg border border-[#00D2FF]/40 bg-[#00D2FF]/10 px-3 py-1.5 text-xs font-bold text-[#00D2FF] transition-all duration-200 hover:bg-[#00D2FF] hover:text-black hover:scale-[1.02]"
                    >
                      Setup Guide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="mt-12 py-12 text-center text-white/40">
              No matching sites found. Try a different search term.
            </div>
          )}
        </div>
      </main>

      {selectedGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedGuide(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white">{selectedGuide.title}</h2>
              <button
                onClick={() => setSelectedGuide(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
            <h3 className="mt-6 text-sm font-bold text-[#00D2FF]">Setup Guide</h3>
            <ol className="mt-4 space-y-3">
              {selectedGuide.guide.steps.map((step: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm leading-6 text-white/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D2FF]/10 text-xs font-bold text-[#00D2FF]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {selectedGuide.guide.warning && (
              <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-xs text-yellow-300">
                {selectedGuide.guide.warning}
              </div>
            )}
            {selectedGuide.guide.youtubeUrl && (
              <a
                href={selectedGuide.guide.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-[#00D2FF] px-4 py-2.5 text-xs font-bold text-black transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              >
                Watch Tutorials ↗
              </a>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
"use client";

import { useState } from "react";

export default function StickyMobileAd() {
  const [closed, setClosed] = useState(false);
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  if (!showAds || closed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-center bg-[#0b0f19]/95 border-t border-white/10 py-1.5 px-2 shadow-2xl backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => setClosed(true)}
          className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-black/80 text-[10px] text-white/70 border border-white/20 hover:text-white"
          title="Close Ad"
        >
          ✕
        </button>
        <iframe
          srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : 'b3a5419d2021a60899442c169a42e0c8','format' : 'iframe','height' : 50,'width' : 320,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/b3a5419d2021a60899442c169a42e0c8/invoke.js"></script></body></html>`}
          width={320}
          height={50}
          className="border-0 overflow-hidden"
          title="Sticky Mobile Ad"
        />
      </div>
    </div>
  );
}

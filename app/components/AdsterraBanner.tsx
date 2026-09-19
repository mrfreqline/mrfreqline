"use client";

interface AdProps {
  format?: "native" | "300x250" | "728x90" | "468x60" | "320x50" | "responsive";
  className?: string;
}

export default function AdsterraBanner({
  format = "native",
  className = "",
}: AdProps) {
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  if (!showAds) return null;

  return (
    <div className={`my-8 flex w-full flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">
        Advertisement
      </span>

      {/* 1. RESPONSIVE BANNER */}
      {format === "responsive" && (
        <div className="w-full flex justify-center">
          {/* Desktop 728x90 */}
          <div className="hidden lg:flex h-[110px] w-full max-w-[750px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : '86fefc8761b896371da1568aef53cba4','format' : 'iframe','height' : 90,'width' : 728,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/86fefc8761b896371da1568aef53cba4/invoke.js"></script></body></html>`}
              width={728}
              height={90}
              className="border-0 overflow-hidden"
              title="Leaderboard Advertisement"
            />
          </div>

          {/* Tablet 468x60 */}
          <div className="hidden sm:flex lg:hidden h-[80px] w-[480px] items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : '2fc4519fd440d9dd5267d110e20e4b1e','format' : 'iframe','height' : 60,'width' : 468,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/2fc4519fd440d9dd5267d110e20e4b1e/invoke.js"></script></body></html>`}
              width={468}
              height={60}
              className="border-0 overflow-hidden"
              title="Classic Banner Advertisement"
            />
          </div>

          {/* Mobile 320x50 */}
          <div className="flex sm:hidden h-[70px] w-[340px] items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : 'b3a5419d2021a60899442c169a42e0c8','format' : 'iframe','height' : 50,'width' : 320,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/b3a5419d2021a60899442c169a42e0c8/invoke.js"></script></body></html>`}
              width={320}
              height={50}
              className="border-0 overflow-hidden"
              title="Mobile Advertisement"
            />
          </div>
        </div>
      )}

      {/* 2. NATIVE BANNER */}
      {format === "native" && (
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;background:transparent;color:#fff;font-family:sans-serif;overflow:hidden;}</style></head><body><script async="async" data-cfasync="false" src="https://pl31405889.profitableratecpmnetwork.com/4242f2fd574a0b0db1ba48866cc5c56c/invoke.js"></script><div id="container-4242f2fd574a0b0db1ba48866cc5c56c"></div></body></html>`}
            width="100%"
            height={220}
            className="border-0 overflow-hidden"
            title="Native Advertisement"
          />
        </div>
      )}

      {/* 3. 300x250 BANNER */}
      {format === "300x250" && (
        <div className="flex h-[270px] w-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : '9bc39c7cb4a9195fd211f78f0d196fc3','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/9bc39c7cb4a9195fd211f78f0d196fc3/invoke.js"></script></body></html>`}
            width={300}
            height={250}
            className="border-0 overflow-hidden"
            title="Square Advertisement"
          />
        </div>
      )}

      {/* 4. 728x90 LEADERBOARD */}
      {format === "728x90" && (
        <div className="hidden md:flex h-[110px] w-full max-w-[750px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : '86fefc8761b896371da1568aef53cba4','format' : 'iframe','height' : 90,'width' : 728,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/86fefc8761b896371da1568aef53cba4/invoke.js"></script></body></html>`}
            width={728}
            height={90}
            className="border-0 overflow-hidden"
            title="Leaderboard Advertisement"
          />
        </div>
      )}

      {/* 5. 468x60 CLASSIC */}
      {format === "468x60" && (
        <div className="flex h-[80px] w-[480px] items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : '2fc4519fd440d9dd5267d110e20e4b1e','format' : 'iframe','height' : 60,'width' : 468,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/2fc4519fd440d9dd5267d110e20e4b1e/invoke.js"></script></body></html>`}
            width={468}
            height={60}
            className="border-0 overflow-hidden"
            title="Classic Banner Advertisement"
          />
        </div>
      )}

      {/* 6. 320x50 MOBILE BANNER */}
      {format === "320x50" && (
        <div className="flex md:hidden h-[70px] w-[340px] items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions = {'key' : 'b3a5419d2021a60899442c169a42e0c8','format' : 'iframe','height' : 50,'width' : 320,'params' : {}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/b3a5419d2021a60899442c169a42e0c8/invoke.js"></script></body></html>`}
            width={320}
            height={50}
            className="border-0 overflow-hidden"
            title="Mobile Advertisement"
          />
        </div>
      )}
    </div>
  );
}
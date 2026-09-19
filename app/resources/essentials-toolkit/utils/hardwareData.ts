/**
 * Hardware specs & performance benchmarks database for:
 * - PC Bottleneck Calculator
 * - PSU Calculator
 * - FPS Calculator
 */

export interface CpuModel {
  id: string;
  name: string;
  brand: "Intel" | "AMD";
  score: number; // 1-100 performance tier
  tdp: number; // Watts
  cores: number;
}

export interface GpuModel {
  id: string;
  name: string;
  brand: "NVIDIA" | "AMD" | "Intel";
  score: number; // 1-100 performance tier
  tdp: number; // Watts
  vram: number; // GB
}

export interface GamePreset {
  id: string;
  title: string;
  baseFps1080p: number; // At tier 50
  cpuWeight: number; // 0.1 to 0.5 (e.g. esports is CPU heavy)
}

export const CPU_LIST: CpuModel[] = [
  // AMD Ryzen 7000 / 9000
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", brand: "AMD", score: 98, tdp: 120, cores: 8 },
  { id: "r9-7950x3d", name: "AMD Ryzen 9 7950X3D", brand: "AMD", score: 99, tdp: 120, cores: 16 },
  { id: "r9-7900x", name: "AMD Ryzen 9 7900X", brand: "AMD", score: 94, tdp: 170, cores: 12 },
  { id: "r7-7700x", name: "AMD Ryzen 7 7700X", brand: "AMD", score: 90, tdp: 105, cores: 8 },
  { id: "r5-7600x", name: "AMD Ryzen 5 7600X", brand: "AMD", score: 86, tdp: 105, cores: 6 },
  { id: "r5-7600", name: "AMD Ryzen 5 7600", brand: "AMD", score: 83, tdp: 65, cores: 6 },

  // AMD Ryzen 5000
  { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", brand: "AMD", score: 89, tdp: 105, cores: 8 },
  { id: "r7-5700x3d", name: "AMD Ryzen 7 5700X3D", brand: "AMD", score: 85, tdp: 105, cores: 8 },
  { id: "r7-5800x", name: "AMD Ryzen 7 5800X", brand: "AMD", score: 82, tdp: 105, cores: 8 },
  { id: "r5-5600x", name: "AMD Ryzen 5 5600X", brand: "AMD", score: 77, tdp: 65, cores: 6 },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", brand: "AMD", score: 75, tdp: 65, cores: 6 },
  { id: "r5-5500", name: "AMD Ryzen 5 5500", brand: "AMD", score: 68, tdp: 65, cores: 6 },
  { id: "r5-3600", name: "AMD Ryzen 5 3600", brand: "AMD", score: 60, tdp: 65, cores: 6 },

  // Intel 14th & 13th Gen
  { id: "i9-14900k", name: "Intel Core i9-14900K", brand: "Intel", score: 99, tdp: 253, cores: 24 },
  { id: "i7-14700k", name: "Intel Core i7-14700K", brand: "Intel", score: 96, tdp: 253, cores: 20 },
  { id: "i5-14600k", name: "Intel Core i5-14600K", brand: "Intel", score: 91, tdp: 181, cores: 14 },
  { id: "i5-14400f", name: "Intel Core i5-14400F", brand: "Intel", score: 82, tdp: 148, cores: 10 },
  { id: "i9-13900k", name: "Intel Core i9-13900K", brand: "Intel", score: 97, tdp: 253, cores: 24 },
  { id: "i7-13700k", name: "Intel Core i7-13700K", brand: "Intel", score: 94, tdp: 253, cores: 16 },
  { id: "i5-13600k", name: "Intel Core i5-13600K", brand: "Intel", score: 89, tdp: 181, cores: 14 },
  { id: "i5-13400f", name: "Intel Core i5-13400F", brand: "Intel", score: 80, tdp: 148, cores: 10 },

  // Intel 12th & 11th Gen
  { id: "i7-12700k", name: "Intel Core i7-12700K", brand: "Intel", score: 88, tdp: 190, cores: 12 },
  { id: "i5-12600k", name: "Intel Core i5-12600K", brand: "Intel", score: 84, tdp: 150, cores: 10 },
  { id: "i5-12400f", name: "Intel Core i5-12400F", brand: "Intel", score: 76, tdp: 117, cores: 6 },
  { id: "i3-12100f", name: "Intel Core i3-12100F", brand: "Intel", score: 67, tdp: 89, cores: 4 },
  { id: "i5-11400f", name: "Intel Core i5-11400F", brand: "Intel", score: 65, tdp: 125, cores: 6 },
  { id: "i5-10400f", name: "Intel Core i5-10400F", brand: "Intel", score: 58, tdp: 65, cores: 6 },
];

export const GPU_LIST: GpuModel[] = [
  // NVIDIA RTX 40 Series
  { id: "rtx-4090", name: "NVIDIA GeForce RTX 4090", brand: "NVIDIA", score: 100, tdp: 450, vram: 24 },
  { id: "rtx-4080-super", name: "NVIDIA GeForce RTX 4080 Super", brand: "NVIDIA", score: 92, tdp: 320, vram: 16 },
  { id: "rtx-4080", name: "NVIDIA GeForce RTX 4080", brand: "NVIDIA", score: 90, tdp: 320, vram: 16 },
  { id: "rtx-4070-ti-super", name: "NVIDIA GeForce RTX 4070 Ti Super", brand: "NVIDIA", score: 86, tdp: 285, vram: 16 },
  { id: "rtx-4070-super", name: "NVIDIA GeForce RTX 4070 Super", brand: "NVIDIA", score: 82, tdp: 220, vram: 12 },
  { id: "rtx-4070", name: "NVIDIA GeForce RTX 4070", brand: "NVIDIA", score: 78, tdp: 200, vram: 12 },
  { id: "rtx-4060-ti", name: "NVIDIA GeForce RTX 4060 Ti", brand: "NVIDIA", score: 70, tdp: 160, vram: 8 },
  { id: "rtx-4060", name: "NVIDIA GeForce RTX 4060", brand: "NVIDIA", score: 64, tdp: 115, vram: 8 },

  // NVIDIA RTX 30 & 20 Series
  { id: "rtx-3090-ti", name: "NVIDIA GeForce RTX 3090 Ti", brand: "NVIDIA", score: 87, tdp: 450, vram: 24 },
  { id: "rtx-3080", name: "NVIDIA GeForce RTX 3080", brand: "NVIDIA", score: 79, tdp: 320, vram: 10 },
  { id: "rtx-3070", name: "NVIDIA GeForce RTX 3070", brand: "NVIDIA", score: 71, tdp: 220, vram: 8 },
  { id: "rtx-3060-ti", name: "NVIDIA GeForce RTX 3060 Ti", brand: "NVIDIA", score: 66, tdp: 200, vram: 8 },
  { id: "rtx-3060", name: "NVIDIA GeForce RTX 3060", brand: "NVIDIA", score: 58, tdp: 170, vram: 12 },
  { id: "rtx-3050", name: "NVIDIA GeForce RTX 3050", brand: "NVIDIA", score: 45, tdp: 130, vram: 8 },
  { id: "rtx-2060", name: "NVIDIA GeForce RTX 2060", brand: "NVIDIA", score: 48, tdp: 160, vram: 6 },
  { id: "gtx-1660-super", name: "NVIDIA GeForce GTX 1660 Super", brand: "NVIDIA", score: 42, tdp: 125, vram: 6 },

  // AMD Radeon RX 7000 / 6000
  { id: "rx-7900-xtx", name: "AMD Radeon RX 7900 XTX", brand: "AMD", score: 94, tdp: 355, vram: 24 },
  { id: "rx-7900-xt", name: "AMD Radeon RX 7900 XT", brand: "AMD", score: 88, tdp: 315, vram: 20 },
  { id: "rx-7800-xt", name: "AMD Radeon RX 7800 XT", brand: "AMD", score: 80, tdp: 263, vram: 16 },
  { id: "rx-7700-xt", name: "AMD Radeon RX 7700 XT", brand: "AMD", score: 73, tdp: 245, vram: 12 },
  { id: "rx-7600-xt", name: "AMD Radeon RX 7600 XT", brand: "AMD", score: 63, tdp: 190, vram: 16 },
  { id: "rx-6700-xt", name: "AMD Radeon RX 6700 XT", brand: "AMD", score: 68, tdp: 230, vram: 12 },
  { id: "rx-6600", name: "AMD Radeon RX 6600", brand: "AMD", score: 54, tdp: 132, vram: 8 },
];

export const GAMES_LIST: GamePreset[] = [
  { id: "cyberpunk", title: "Cyberpunk 2077", baseFps1080p: 65, cpuWeight: 0.25 },
  { id: "cs2", title: "Counter-Strike 2", baseFps1080p: 210, cpuWeight: 0.5 },
  { id: "valorant", title: "Valorant", baseFps1080p: 280, cpuWeight: 0.55 },
  { id: "gtav", title: "Grand Theft Auto V", baseFps1080p: 125, cpuWeight: 0.35 },
  { id: "fortnite", title: "Fortnite", baseFps1080p: 140, cpuWeight: 0.4 },
  { id: "warzone", title: "Call of Duty: Warzone", baseFps1080p: 95, cpuWeight: 0.3 },
  { id: "rdr2", title: "Red Dead Redemption 2", baseFps1080p: 72, cpuWeight: 0.2 },
  { id: "apex", title: "Apex Legends", baseFps1080p: 155, cpuWeight: 0.35 },
];

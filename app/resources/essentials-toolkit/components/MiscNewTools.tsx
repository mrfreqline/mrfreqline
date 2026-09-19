"use client";

import React, { useState, useEffect, useRef } from "react";

/* =========================================================================
   1. AREA CONVERTER (METRIC, IMPERIAL & NEPALI ROPANI / BIGHA)
   ========================================================================= */
// 1 Square Meter = base
const AREA_TO_SQM: Record<string, number> = {
  sqm: 1,
  sqft: 0.092903,
  acre: 4046.86,
  hectare: 10000,
  sqkm: 1000000,
  // Nepali Ropani system:
  ropani: 508.72, // 1 Ropani = 508.72 sq m = 5476 sq ft = 16 Aana
  aana: 31.80,   // 1 Aana = 31.80 sq m = 342.25 sq ft = 4 Paisa
  paisa: 7.95,   // 1 Paisa = 7.95 sq m = 85.56 sq ft = 4 Daam
  daam: 1.99,    // 1 Daam = 1.99 sq m = 21.39 sq ft
  // Nepali Terai Bigha system:
  bigha: 6772.63, // 1 Bigha = 6772.63 sq m = 20 Kattha
  kattha: 338.63, // 1 Kattha = 338.63 sq m = 20 Dhur
  dhur: 16.93,    // 1 Dhur = 16.93 sq m
};

export function AreaConverterTool() {
  const [val, setVal] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("ropani");
  const [toUnit, setToUnit] = useState<string>("sqft");

  const sqm = val * (AREA_TO_SQM[fromUnit] || 1);
  const converted = sqm / (AREA_TO_SQM[toUnit] || 1);

  // Decompose into full Ropani-Aana-Paisa-Daam breakdown if desired
  const totalRopani = sqm / 508.72;
  const r = Math.floor(totalRopani);
  const remR = (totalRopani - r) * 16;
  const a = Math.floor(remR);
  const remA = (remR - a) * 4;
  const p = Math.floor(remA);
  const d = Math.round((remA - p) * 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Area & Land Measurement Converter</h3>
        <p className="text-xs text-[var(--text-muted)]">Convert between International Metric/Imperial units and Traditional Nepali land units (Ropani & Bigha systems).</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Value</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={val}
            onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">From Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <optgroup label="Nepali Hill Units (Ropani System)">
              <option value="ropani">Ropani</option>
              <option value="aana">Aana</option>
              <option value="paisa">Paisa</option>
              <option value="daam">Daam</option>
            </optgroup>
            <optgroup label="Nepali Terai Units (Bigha System)">
              <option value="bigha">Bigha</option>
              <option value="kattha">Kattha</option>
              <option value="dhur">Dhur</option>
            </optgroup>
            <optgroup label="International Standard">
              <option value="sqft">Square Feet (sq ft)</option>
              <option value="sqm">Square Meters (sq m)</option>
              <option value="acre">Acres</option>
              <option value="hectare">Hectares</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">To Unit</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <optgroup label="International Standard">
              <option value="sqft">Square Feet (sq ft)</option>
              <option value="sqm">Square Meters (sq m)</option>
              <option value="acre">Acres</option>
              <option value="hectare">Hectares</option>
            </optgroup>
            <optgroup label="Nepali Hill Units (Ropani System)">
              <option value="ropani">Ropani</option>
              <option value="aana">Aana</option>
              <option value="paisa">Paisa</option>
              <option value="daam">Daam</option>
            </optgroup>
            <optgroup label="Nepali Terai Units (Bigha System)">
              <option value="bigha">Bigha</option>
              <option value="kattha">Kattha</option>
              <option value="dhur">Dhur</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{val} {fromUnit} equals</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-xl text-[var(--text-main)]">{toUnit}</span>
        </div>
        <div className="mt-4 pt-3 border-t border-[var(--surface-border)] text-xs text-[var(--text-muted)]">
          Nepali Traditional Breakdown: <span className="font-bold text-[var(--text-main)]">{r} Ropani, {a} Aana, {p} Paisa, {d} Daam</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. VOLUME, SPEED & FUEL ECONOMY CONVERTER
   ========================================================================= */
export function VolumeSpeedTool() {
  const [tab, setTab] = useState<"speed" | "volume" | "fuel">("speed");
  const [speedVal, setSpeedVal] = useState<number>(100);
  const [speedFrom, setSpeedFrom] = useState<"kmh" | "mph" | "ms" | "knots">("kmh");

  const [volVal, setVolVal] = useState<number>(5);
  const [volFrom, setVolFrom] = useState<"liters" | "gallons" | "ml" | "floz">("liters");

  const [fuelVal, setFuelVal] = useState<number>(15); // km/L

  // Speed conversion relative to m/s
  const speedToMs: Record<string, number> = {
    kmh: 0.277778,
    mph: 0.44704,
    ms: 1,
    knots: 0.514444,
  };
  const ms = speedVal * (speedToMs[speedFrom] || 1);

  // Volume relative to Liters
  const volToLiters: Record<string, number> = {
    liters: 1,
    gallons: 3.78541, // US gallon
    ml: 0.001,
    floz: 0.0295735,
  };
  const liters = volVal * (volToLiters[volFrom] || 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Speed, Volume & Fuel Economy Converter</h3>
          <p className="text-xs text-[var(--text-muted)]">Switch between automotive speeds, fluid volumes, and fuel efficiency units.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setTab("speed")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "speed" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Speed
          </button>
          <button
            type="button"
            onClick={() => setTab("volume")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "volume" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Volume
          </button>
          <button
            type="button"
            onClick={() => setTab("fuel")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "fuel" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Fuel Economy
          </button>
        </div>
      </div>

      {tab === "speed" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="number"
              value={speedVal}
              onChange={(e) => setSpeedVal(parseFloat(e.target.value) || 0)}
              className="flex-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
            />
            <select
              value={speedFrom}
              onChange={(e) => setSpeedFrom(e.target.value as any)}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 text-xs font-bold text-[var(--text-main)]"
            >
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
              <option value="ms">m/s</option>
              <option value="knots">Knots</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">km/h</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--accent-primary)]">{(ms / 0.277778).toFixed(1)}</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">mph</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{(ms / 0.44704).toFixed(1)}</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">m/s</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{ms.toFixed(1)}</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Knots</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{(ms / 0.514444).toFixed(1)}</div>
            </div>
          </div>
        </div>
      )}

      {tab === "volume" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="number"
              value={volVal}
              onChange={(e) => setVolVal(parseFloat(e.target.value) || 0)}
              className="flex-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
            />
            <select
              value={volFrom}
              onChange={(e) => setVolFrom(e.target.value as any)}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 text-xs font-bold text-[var(--text-main)]"
            >
              <option value="liters">Liters (L)</option>
              <option value="gallons">US Gallons (gal)</option>
              <option value="ml">Milliliters (ml)</option>
              <option value="floz">Fluid Ounces (fl oz)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Liters</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--accent-primary)]">{liters.toFixed(2)} L</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">US Gallons</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{(liters / 3.78541).toFixed(2)} gal</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Milliliters</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{Math.round(liters * 1000).toLocaleString()} ml</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Fluid Ounces</span>
              <div className="mt-1 text-lg font-black font-mono text-[var(--text-main)]">{(liters / 0.0295735).toFixed(1)} oz</div>
            </div>
          </div>
        </div>
      )}

      {tab === "fuel" && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Enter Mileage (Kilometers per Liter - km/L):</label>
            <input
              type="number"
              step="0.5"
              value={fuelVal}
              onChange={(e) => setFuelVal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-center">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">km / Liter</span>
              <div className="mt-1 text-xl font-black font-mono text-[var(--accent-primary)]">{fuelVal.toFixed(1)} km/L</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">L / 100 km</span>
              <div className="mt-1 text-xl font-black font-mono text-[var(--text-main)]">{fuelVal > 0 ? (100 / fuelVal).toFixed(2) : "0"} L/100km</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">US MPG</span>
              <div className="mt-1 text-xl font-black font-mono text-[var(--text-main)]">{(fuelVal * 2.35215).toFixed(1)} MPG</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   3. ADVANCED TEXT CLEANER (DEDUPLICATOR, SORTER, REVERSER & FIND/REPLACE)
   ========================================================================= */
export function TextCleanerTool() {
  const [text, setText] = useState<string>("Apple\nBanana\nOrange\nApple\nMango\nBanana\nPineapple");
  const [findWord, setFindWord] = useState<string>("");
  const [replaceWord, setReplaceWord] = useState<string>("");

  const removeDuplicates = () => {
    const lines = text.split("\n");
    const unique = Array.from(new Set(lines));
    setText(unique.join("\n"));
  };

  const sortLines = (direction: "asc" | "desc") => {
    const lines = text.split("\n");
    lines.sort((a, b) => (direction === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
    setText(lines.join("\n"));
  };

  const reverseCharacters = () => {
    setText(text.split("").reverse().join(""));
  };

  const reverseLines = () => {
    setText(text.split("\n").reverse().join("\n"));
  };

  const doFindReplace = () => {
    if (!findWord) return;
    setText(text.replaceAll(findWord, replaceWord));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-3">
        <h3 className="text-base font-bold text-[var(--text-main)]">Text Deduplicator, Sorter & Cleaner</h3>
        <p className="text-xs text-[var(--text-muted)]">Remove duplicate lines, sort alphabetically, reverse text, and perform quick find & replace.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={removeDuplicates}
          className="rounded-xl bg-[var(--accent-primary)] px-3 py-1.5 text-xs font-bold text-black shadow-sm"
        >
          Remove Duplicate Lines
        </button>
        <button
          type="button"
          onClick={() => sortLines("asc")}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 py-1.5 text-xs font-bold text-[var(--text-main)]"
        >
          Sort A ➔ Z
        </button>
        <button
          type="button"
          onClick={() => sortLines("desc")}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 py-1.5 text-xs font-bold text-[var(--text-main)]"
        >
          Sort Z ➔ A
        </button>
        <button
          type="button"
          onClick={reverseLines}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 py-1.5 text-xs font-bold text-[var(--text-main)]"
        >
          Reverse Lines
        </button>
        <button
          type="button"
          onClick={reverseCharacters}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 py-1.5 text-xs font-bold text-[var(--text-main)]"
        >
          Reverse All Text
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5">
        <span className="text-xs font-bold text-[var(--text-muted)]">Find:</span>
        <input
          type="text"
          placeholder="Find text..."
          value={findWord}
          onChange={(e) => setFindWord(e.target.value)}
          className="flex-1 min-w-[110px] rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-2.5 py-1 text-xs text-[var(--text-main)] focus:outline-none"
        />
        <span className="text-xs font-bold text-[var(--text-muted)]">Replace with:</span>
        <input
          type="text"
          placeholder="Replace..."
          value={replaceWord}
          onChange={(e) => setReplaceWord(e.target.value)}
          className="flex-1 min-w-[110px] rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-2.5 py-1 text-xs text-[var(--text-main)] focus:outline-none"
        />
        <button
          type="button"
          onClick={doFindReplace}
          className="w-full sm:w-auto rounded-lg bg-[var(--accent-primary)] px-3 py-1 text-xs font-bold text-black"
        >
          Replace All
        </button>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3 text-xs font-mono text-[var(--text-main)] focus:outline-none"
      />

      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>Lines: {text.split("\n").length} | Characters: {text.length}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(text)}
          className="font-bold text-[var(--accent-primary)] hover:underline"
        >
          Copy Cleaned Text
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   4. GAMING MOUSE SENSITIVITY CONVERTER
   ========================================================================= */
// Yaw multipliers per game
const YAW_FACTORS: Record<string, number> = {
  cs2: 0.022,
  valorant: 0.07,
  apex: 0.022,
  overwatch: 0.0066,
  fortnite: 0.005555,
  r6: 0.00572,
  cod: 0.0066,
};

export function MouseSensitivityTool() {
  const [fromGame, setFromGame] = useState<string>("valorant");
  const [toGame, setToGame] = useState<string>("cs2");
  const [sens, setSens] = useState<number>(0.35);
  const [dpi, setDpi] = useState<number>(800);

  // Conversion formula:
  // sens_A * yaw_A = sens_B * yaw_B
  // sens_B = sens_A * (yaw_A / yaw_B)
  const convertedSens = sens * (YAW_FACTORS[fromGame] / YAW_FACTORS[toGame]);
  
  // cm/360 turn: 360 / (sens * DPI * yaw * 0.393701)
  const edpi = sens * dpi;
  const cm360 = (360 * 2.54) / (sens * (YAW_FACTORS[fromGame] * (180 / Math.PI)) * dpi * (Math.PI / 180));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Gaming Mouse Sensitivity Converter</h3>
        <p className="text-xs text-[var(--text-muted)]">Transfer your exact aim and muscle memory across competitive shooters with identical cm/360 distance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Source Game</label>
          <select
            value={fromGame}
            onChange={(e) => setFromGame(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <option value="valorant">Valorant</option>
            <option value="cs2">Counter-Strike 2 (CS2)</option>
            <option value="apex">Apex Legends</option>
            <option value="overwatch">Overwatch 2</option>
            <option value="fortnite">Fortnite</option>
            <option value="r6">Rainbow Six Siege</option>
            <option value="cod">Call of Duty (Warzone)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Target Game</label>
          <select
            value={toGame}
            onChange={(e) => setToGame(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <option value="cs2">Counter-Strike 2 (CS2)</option>
            <option value="valorant">Valorant</option>
            <option value="apex">Apex Legends</option>
            <option value="overwatch">Overwatch 2</option>
            <option value="fortnite">Fortnite</option>
            <option value="r6">Rainbow Six Siege</option>
            <option value="cod">Call of Duty (Warzone)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Your Sensitivity</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={sens}
            onChange={(e) => setSens(parseFloat(e.target.value) || 0.1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Mouse DPI</label>
          <input
            type="number"
            step="50"
            min="100"
            value={dpi}
            onChange={(e) => setDpi(parseInt(e.target.value) || 800)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Converted In-Game Sensitivity</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {convertedSens.toFixed(3)}
        </div>
        <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">
          eDPI: <span className="font-bold text-[var(--text-main)]">{Math.round(edpi)}</span> | Preserves identical 360° mouse turn distance
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   5. REACTION TIME TEST (VISUAL CLICK BENCHMARK)
   ========================================================================= */
export function ReactionTimeTool() {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "result" | "early">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setState("waiting");
    const randomDelay = Math.floor(Math.random() * 2500) + 1500; // 1.5s to 4s
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setState("ready");
    }, randomDelay);
  };

  const handleClick = () => {
    if (state === "idle" || state === "result" || state === "early") {
      startTest();
    } else if (state === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("early");
    } else if (state === "ready") {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setScores((prev) => [...prev, elapsed]);
      setState("result");
    }
  };

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Reaction Time Benchmark</h3>
        <p className="text-xs text-[var(--text-muted)]">Benchmark your visual reflex and click response time in milliseconds.</p>
      </div>

      <div
        onClick={handleClick}
        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl p-8 text-center transition-all select-none shadow-md ${
          state === "waiting"
            ? "bg-rose-500 text-white"
            : state === "ready"
            ? "bg-emerald-500 text-black font-extrabold"
            : state === "early"
            ? "bg-amber-500 text-black"
            : "bg-[var(--surface-canvas)] border border-[var(--surface-border)] text-[var(--text-main)] hover:border-[var(--accent-primary)]"
        }`}
      >
        {state === "idle" && (
          <div>
            <div className="text-2xl font-black">Click to Start</div>
            <p className="mt-2 text-xs opacity-75">When the red screen turns GREEN, click as fast as you can.</p>
          </div>
        )}
        {state === "waiting" && (
          <div>
            <div className="text-3xl font-black">Wait for green...</div>
            <p className="mt-2 text-xs opacity-75">Don't click yet!</p>
          </div>
        )}
        {state === "ready" && (
          <div>
            <div className="text-4xl font-black animate-pulse">CLICK NOW!</div>
          </div>
        )}
        {state === "early" && (
          <div>
            <div className="text-2xl font-black">Too soon!</div>
            <p className="mt-2 text-xs opacity-75">You clicked before it turned green. Click anywhere to try again.</p>
          </div>
        )}
        {state === "result" && (
          <div>
            <div className="text-5xl font-black font-mono">{reactionTime} ms</div>
            <p className="mt-2 text-xs opacity-75">
              {reactionTime! < 200 ? "⚡ Pro Gamer Reflexes!" : reactionTime! < 270 ? "🎯 Faster than average human!" : "🐢 Standard human reflex (~270ms)."}
            </p>
            <p className="mt-3 text-xs font-bold underline">Click to test again</p>
          </div>
        )}
      </div>

      {scores.length > 0 && (
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--surface-border)] pt-3">
          <span>Trials Completed: <strong className="text-[var(--text-main)]">{scores.length}</strong></span>
          <span>Average Reflex: <strong className="text-[var(--accent-primary)] font-mono">{avgScore} ms</strong></span>
          <button
            type="button"
            onClick={() => { setScores([]); setState("idle"); }}
            className="text-rose-400 hover:underline"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   6. STOPWATCH & COUNTDOWN TIMER
   ========================================================================= */
export function StopwatchCountdownTool() {
  const [tab, setTab] = useState<"stopwatch" | "countdown">("stopwatch");

  // Stopwatch state
  const [swTime, setSwTime] = useState<number>(0);
  const [swRunning, setSwRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (swRunning) {
      timer = setInterval(() => setSwTime((t) => t + 10), 10);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [swRunning]);

  const recordLap = () => {
    setLaps((prev) => [...prev, swTime]);
  };

  const resetSw = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };

  const formatSw = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(2, "0")}`;
  };

  // Countdown state
  const [cdInput, setCdInput] = useState<number>(5); // minutes
  const [cdLeft, setCdLeft] = useState<number>(5 * 60);
  const [cdRunning, setCdRunning] = useState<boolean>(false);

  useEffect(() => {
    let cdTimer: NodeJS.Timeout | null = null;
    if (cdRunning && cdLeft > 0) {
      cdTimer = setInterval(() => setCdLeft((t) => t - 1), 1000);
    } else if (cdLeft === 0) {
      setCdRunning(false);
    }
    return () => {
      if (cdTimer) clearInterval(cdTimer);
    };
  }, [cdRunning, cdLeft]);

  const startCd = (mins: number) => {
    setCdInput(mins);
    setCdLeft(mins * 60);
    setCdRunning(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Stopwatch & Countdown Studio</h3>
          <p className="text-xs text-[var(--text-muted)]">Precision millisecond stopwatch with lap splits and customizable countdown timers.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setTab("stopwatch")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "stopwatch" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Stopwatch
          </button>
          <button
            type="button"
            onClick={() => setTab("countdown")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "countdown" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Countdown Timer
          </button>
        </div>
      </div>

      {tab === "stopwatch" ? (
        <div className="text-center space-y-5">
          <div className="py-4 text-5xl md:text-6xl font-black font-mono tracking-wider text-[var(--text-main)]">
            {formatSw(swTime)}
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setSwRunning(!swRunning)}
              className={`rounded-xl px-6 py-2.5 text-xs font-black transition ${swRunning ? "bg-amber-400 text-black" : "bg-[var(--accent-primary)] text-black"}`}
            >
              {swRunning ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={recordLap}
              disabled={!swRunning}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 py-2.5 text-xs font-bold text-[var(--text-main)] disabled:opacity-40"
            >
              Lap Split
            </button>
            <button
              type="button"
              onClick={resetSw}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 py-2.5 text-xs font-bold text-rose-400"
            >
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="max-h-40 overflow-y-auto rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3 text-left">
              <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Lap Splits</span>
              <div className="mt-2 space-y-1">
                {laps.map((lap, i) => (
                  <div key={i} className="flex justify-between text-xs font-mono text-[var(--text-main)]">
                    <span>Lap {i + 1}</span>
                    <span>{formatSw(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-5">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[1, 3, 5, 10, 15, 30].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => startCd(m)}
                className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2.5 sm:px-3 py-1 text-xs font-bold hover:border-[var(--accent-primary)]"
              >
                {m}m
              </button>
            ))}
          </div>

          <div className="py-3 sm:py-4 text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-wider text-[var(--text-main)]">
            {String(Math.floor(cdLeft / 60)).padStart(2, "0")}:{String(cdLeft % 60).padStart(2, "0")}
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setCdRunning(!cdRunning)}
              className="rounded-xl bg-[var(--accent-primary)] px-6 py-2.5 text-xs font-black text-black"
            >
              {cdRunning ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => { setCdRunning(false); setCdLeft(cdInput * 60); }}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 py-2.5 text-xs font-bold text-[var(--text-muted)]"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   7. WORLD CLOCK & TIME ZONE CONVERTER
   ========================================================================= */
const CITIES = [
  { name: "Kathmandu (Nepal)", zone: "Asia/Kathmandu", offset: "UTC+5:45" },
  { name: "New Delhi (India)", zone: "Asia/Kolkata", offset: "UTC+5:30" },
  { name: "Dubai (UAE)", zone: "Asia/Dubai", offset: "UTC+4:00" },
  { name: "London (UK)", zone: "Europe/London", offset: "UTC+0 / BST" },
  { name: "New York (USA)", zone: "America/New_York", offset: "EST / EDT" },
  { name: "Tokyo (Japan)", zone: "Asia/Tokyo", offset: "UTC+9:00" },
  { name: "Sydney (Australia)", zone: "Australia/Sydney", offset: "AEST / AEDT" },
];

export function WorldClockTool() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">World Clock & Time Zone Converter</h3>
        <p className="text-xs text-[var(--text-muted)]">Live synchronised digital clocks across global financial and business hubs.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((city) => {
          let cityTime = "";
          let cityDate = "";
          try {
            cityTime = time.toLocaleTimeString("en-US", { timeZone: city.zone, hour: "2-digit", minute: "2-digit", second: "2-digit" });
            cityDate = time.toLocaleDateString("en-US", { timeZone: city.zone, weekday: "short", month: "short", day: "numeric" });
          } catch {
            cityTime = "--:--";
          }

          return (
            <div
              key={city.name}
              className="flex items-center justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 shadow-sm"
            >
              <div>
                <h4 className="text-xs font-bold text-[var(--text-main)]">{city.name}</h4>
                <span className="text-[10px] text-[var(--text-muted)]">{city.offset} • {cityDate}</span>
              </div>

              <div className="text-right">
                <div className="text-lg font-black font-mono text-[var(--accent-primary)]">{cityTime}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

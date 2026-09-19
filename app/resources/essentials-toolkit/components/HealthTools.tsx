"use client";

import React, { useState } from "react";

/* =========================================================================
   1. CALORIE & BMR CALCULATOR (MIFFLIN-ST JEOR FORMULA)
   ========================================================================= */
export function CalorieBmrTool() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(25);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.375); // Light exercise

  // Mifflin-St Jeor Equation
  const bmr = gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Calorie & BMR Calculator (Mifflin-St Jeor)</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate your Basal Metabolic Rate (calories burned at rest) and Total Daily Energy Expenditure (TDEE).</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Age</label>
          <input
            type="number"
            min="10"
            max="110"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 20)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Weight (kg)</label>
          <input
            type="number"
            min="20"
            max="250"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 50)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Height (cm)</label>
          <input
            type="number"
            min="50"
            max="250"
            value={heightCm}
            onChange={(e) => setHeightCm(parseFloat(e.target.value) || 150)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Daily Activity Level</label>
        <select
          value={activity}
          onChange={(e) => setActivity(parseFloat(e.target.value))}
          className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-semibold text-[var(--text-main)]"
        >
          <option value={1.2}>Sedentary (Little or no exercise, desk job)</option>
          <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
          <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
          <option value={1.725}>Very Active (Hard exercise 6-7 days/week)</option>
          <option value={1.9}>Extra Active (Intense physical job or 2x daily training)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-center">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Basal Metabolic Rate (BMR)</span>
          <div className="mt-2 text-3xl font-black text-[var(--text-main)] font-mono">{Math.round(bmr)} <span className="text-sm font-normal text-[var(--text-muted)]">kcal / day</span></div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Calories burned at complete rest</p>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Maintenance Calories (TDEE)</span>
          <div className="mt-2 text-3xl font-black text-[var(--accent-primary)] font-mono">{tdee} <span className="text-sm font-normal text-[var(--text-muted)]">kcal / day</span></div>
          <p className="mt-1 text-xs text-emerald-400">Calories to maintain current weight</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. DAILY WATER INTAKE CALCULATOR
   ========================================================================= */
export function WaterIntakeTool() {
  const [weightKg, setWeightKg] = useState<number>(68);
  const [exerciseMins, setExerciseMins] = useState<number>(30);
  const [climate, setClimate] = useState<"temperate" | "hot">("temperate");

  // Standard: 35ml per kg of body weight + 350ml per 30 mins exercise + 500ml for hot climate
  const baseWaterMl = weightKg * 35;
  const exerciseWaterMl = (exerciseMins / 30) * 350;
  const climateWaterMl = climate === "hot" ? 500 : 0;
  const totalWaterMl = baseWaterMl + exerciseWaterMl + climateWaterMl;
  const liters = (totalWaterMl / 1000).toFixed(2);
  const glasses = Math.round(totalWaterMl / 250); // 250ml per glass

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Daily Water Intake Calculator</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate your optimal daily water hydration based on body weight, exercise duration, and climate.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Body Weight (kg)</label>
          <input
            type="number"
            min="20"
            max="250"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 50)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Daily Exercise (Minutes)</label>
          <input
            type="number"
            min="0"
            max="300"
            step="15"
            value={exerciseMins}
            onChange={(e) => setExerciseMins(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Weather / Climate</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as "temperate" | "hot")}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            <option value="temperate">Normal / Moderate Climate</option>
            <option value="hot">Hot / Summer / Humid Weather</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Recommended Daily Hydration</span>
        <div className="mt-2 text-4xl font-black text-cyan-400 font-mono">
          {liters} <span className="text-xl text-[var(--text-main)]">Liters</span>
        </div>
        <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">
          Equivalent to roughly <span className="font-bold text-[var(--text-main)]">{glasses} glasses</span> (250ml each) spread evenly across the day.
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   3. WEIGHT GAIN & LOSS PLANNER
   ========================================================================= */
export function WeightGoalTool() {
  const [goal, setGoal] = useState<"lose" | "gain">("lose");
  const [currentWeight, setCurrentWeight] = useState<number>(75);
  const [targetWeight, setTargetWeight] = useState<number>(68);
  const [targetWeeks, setTargetWeeks] = useState<number>(12);
  const [maintenanceCalories, setMaintenanceCalories] = useState<number>(2200);

  const diffKg = Math.abs(currentWeight - targetWeight);
  const weeklyRateKg = targetWeeks > 0 ? diffKg / targetWeeks : 0;
  // 1 kg of fat roughly corresponds to ~7700 calories
  const dailyCalorieAdjustment = (weeklyRateKg * 7700) / 7;
  const targetCalories = goal === "lose" 
    ? Math.max(1200, Math.round(maintenanceCalories - dailyCalorieAdjustment))
    : Math.round(maintenanceCalories + dailyCalorieAdjustment);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Weight Goal Planner (Gain or Loss)</h3>
          <p className="text-xs text-[var(--text-muted)]">Calculate the safe caloric deficit or surplus needed to reach your target body weight.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => { setGoal("lose"); setCurrentWeight(75); setTargetWeight(68); }}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${goal === "lose" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Weight Loss
          </button>
          <button
            type="button"
            onClick={() => { setGoal("gain"); setCurrentWeight(60); setTargetWeight(68); }}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${goal === "gain" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Weight Gain
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Current Weight (kg)</label>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Target Weight (kg)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Time Horizon (Weeks)</label>
          <input
            type="number"
            min="1"
            max="104"
            value={targetWeeks}
            onChange={(e) => setTargetWeeks(parseInt(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Maintenance (kcal)</label>
          <input
            type="number"
            step="50"
            value={maintenanceCalories}
            onChange={(e) => setMaintenanceCalories(parseInt(e.target.value) || 2000)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Weekly Rate</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--text-main)]">{weeklyRateKg.toFixed(2)} kg / week</div>
          <span className="text-[10px] text-[var(--text-muted)]">{weeklyRateKg > 1 ? "⚠️ Rapid change" : "Healthy sustainable pace"}</span>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Daily Caloric {goal === "lose" ? "Deficit" : "Surplus"}</span>
          <div className="mt-1.5 text-xl font-black font-mono text-amber-400">{Math.round(dailyCalorieAdjustment)} kcal</div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Target Daily Intake</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--accent-primary)]">{targetCalories} kcal / day</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. BODY FAT PERCENTAGE CALCULATOR (US NAVY TAPE METHOD)
   ========================================================================= */
export function BodyFatTool() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState<number>(175);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [waistCm, setWaistCm] = useState<number>(85);
  const [hipCm, setHipCm] = useState<number>(95); // For females

  // US Navy Body Fat Equations
  // Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
  // Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
  let bodyFat = 0;
  if (gender === "male") {
    const diff = waistCm - neckCm;
    if (diff > 0) {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
    }
  } else {
    const sum = waistCm + hipCm - neckCm;
    if (sum > 0) {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(heightCm)) - 450;
    }
  }

  const safeBf = Math.max(3, Math.min(60, bodyFat));

  const getCategory = (bf: number, g: "male" | "female") => {
    if (g === "male") {
      if (bf < 6) return { cat: "Essential Fat", color: "text-amber-400" };
      if (bf <= 13) return { cat: "Athletes", color: "text-emerald-400" };
      if (bf <= 17) return { cat: "Fitness", color: "text-emerald-400" };
      if (bf <= 24) return { cat: "Average", color: "text-blue-400" };
      return { cat: "Above Average / Obese", color: "text-rose-400" };
    } else {
      if (bf < 14) return { cat: "Essential Fat", color: "text-amber-400" };
      if (bf <= 20) return { cat: "Athletes", color: "text-emerald-400" };
      if (bf <= 24) return { cat: "Fitness", color: "text-emerald-400" };
      if (bf <= 31) return { cat: "Average", color: "text-blue-400" };
      return { cat: "Above Average / Obese", color: "text-rose-400" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Body Fat Percentage Calculator (US Navy)</h3>
          <p className="text-xs text-[var(--text-muted)]">Estimate body fat percentage using standard circumference measurements.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setGender("male")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${gender === "male" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => setGender("female")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${gender === "female" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Female
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(parseFloat(e.target.value) || 170)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Neck Circumference (cm)</label>
          <input
            type="number"
            value={neckCm}
            onChange={(e) => setNeckCm(parseFloat(e.target.value) || 35)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Waist Circumference (cm)</label>
          <input
            type="number"
            value={waistCm}
            onChange={(e) => setWaistCm(parseFloat(e.target.value) || 80)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        {gender === "female" && (
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Hip Circumference (cm)</label>
            <input
              type="number"
              value={hipCm}
              onChange={(e) => setHipCm(parseFloat(e.target.value) || 90)}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
            />
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Estimated Body Fat</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {safeBf.toFixed(1)}%
        </div>
        <p className={`mt-2 text-xs font-bold ${getCategory(safeBf, gender).color}`}>
          Classification: {getCategory(safeBf, gender).cat}
        </p>
      </div>
    </div>
  );
}

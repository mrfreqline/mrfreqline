"use client";

import React, { useState, useEffect, useRef } from "react";

/* =========================================================================
   1. SEE GPA CALCULATOR (NEPAL SECONDARY EDUCATION EXAMINATION)
   ========================================================================= */
interface SubjectRow {
  name: string;
  creditHours: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  "A": 3.6,
  "B+": 3.2,
  "B": 2.8,
  "C+": 2.4,
  "C": 2.0,
  "D": 1.6,
  "NG": 0.0,
};

export function SeeGpaTool() {
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { name: "Nepali", creditHours: 4, grade: "A" },
    { name: "English", creditHours: 4, grade: "A+" },
    { name: "Compulsory Mathematics", creditHours: 4, grade: "A" },
    { name: "Science & Technology", creditHours: 4, grade: "A+" },
    { name: "Social Studies", creditHours: 4, grade: "B+" },
    { name: "Optional I", creditHours: 4, grade: "A" },
    { name: "Optional II", creditHours: 4, grade: "B+" },
  ]);

  const updateGrade = (index: number, grade: string) => {
    const updated = [...subjects];
    updated[index].grade = grade;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, creditHours: 4, grade: "A" }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const totalCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);
  const totalPoints = subjects.reduce((sum, s) => sum + (GRADE_POINTS[s.grade] || 0) * s.creditHours, 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const hasNG = subjects.some((s) => s.grade === "NG");

  const getGpaLetter = (val: number) => {
    if (val >= 3.6) return "A+ (Outstanding)";
    if (val >= 3.2) return "A (Excellent)";
    if (val >= 2.8) return "B+ (Very Good)";
    if (val >= 2.4) return "B (Good)";
    if (val >= 2.0) return "C+ (Satisfactory)";
    if (val >= 1.6) return "C (Acceptable)";
    return "D / NG (Insufficient)";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">SEE GPA Calculator (Nepal)</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate your Secondary Education Examination (Class 10) GPA based on the latest 4.0 grading system.</p>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <table className="min-w-[500px] w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--surface-border)] text-[var(--text-muted)]">
              <th className="pb-2 font-semibold">Subject</th>
              <th className="pb-2 font-semibold">Credit Hours</th>
              <th className="pb-2 font-semibold">Grade</th>
              <th className="pb-2 font-semibold">Grade Point</th>
              <th className="pb-2 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--surface-border)]">
            {subjects.map((sub, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-canvas)]">
                <td className="py-2.5 pr-3">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => {
                      const updated = [...subjects];
                      updated[idx].name = e.target.value;
                      setSubjects(updated);
                    }}
                    className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2.5 py-1 text-xs text-[var(--text-main)] focus:outline-none"
                  />
                </td>
                <td className="py-2.5 pr-3">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={sub.creditHours}
                    onChange={(e) => {
                      const updated = [...subjects];
                      updated[idx].creditHours = parseFloat(e.target.value) || 1;
                      setSubjects(updated);
                    }}
                    className="w-16 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2.5 py-1 text-xs text-[var(--text-main)] focus:outline-none"
                  />
                </td>
                <td className="py-2.5 pr-3">
                  <select
                    value={sub.grade}
                    onChange={(e) => updateGrade(idx, e.target.value)}
                    className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2.5 py-1 text-xs font-bold text-[var(--text-main)] focus:outline-none"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2.5 font-mono text-xs font-semibold text-[var(--text-muted)]">
                  {GRADE_POINTS[sub.grade]?.toFixed(1)}
                </td>
                <td className="py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => removeSubject(idx)}
                    className="text-xs text-rose-400 hover:text-rose-300"
                    title="Remove"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addSubject}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
        >
          + Add Subject
        </button>
      </div>

      {/* Result Card */}
      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Final Result</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">{gpa} <span className="text-lg text-[var(--text-muted)]">/ 4.00</span></div>
        <p className="mt-2 text-xs font-semibold text-[var(--text-main)]">{hasNG ? "Non-Graded (NG) in one or more subjects" : getGpaLetter(parseFloat(gpa))}</p>
        <p className="mt-1 text-[11px] text-[var(--text-muted)]">Total Credits: {totalCredits} | Total Weighted Points: {totalPoints.toFixed(1)}</p>
      </div>
    </div>
  );
}

/* =========================================================================
   2. +2 NEB GPA CALCULATOR (SCIENCE / MANAGEMENT / HUMANITIES)
   ========================================================================= */
export function NebGpaTool() {
  const [stream, setStream] = useState<"science" | "management" | "custom">("science");
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { name: "Compulsory English", creditHours: 4, grade: "A" },
    { name: "Compulsory Nepali", creditHours: 4, grade: "A" },
    { name: "Mathematics", creditHours: 5, grade: "A+" },
    { name: "Physics", creditHours: 5, grade: "A" },
    { name: "Chemistry", creditHours: 5, grade: "B+" },
    { name: "Biology / Computer Science", creditHours: 5, grade: "A" },
  ]);

  useEffect(() => {
    if (stream === "science") {
      setSubjects([
        { name: "Compulsory English", creditHours: 4, grade: "A" },
        { name: "Compulsory Nepali", creditHours: 4, grade: "A" },
        { name: "Mathematics", creditHours: 5, grade: "A+" },
        { name: "Physics", creditHours: 5, grade: "A" },
        { name: "Chemistry", creditHours: 5, grade: "B+" },
        { name: "Biology / Computer Science", creditHours: 5, grade: "A" },
      ]);
    } else if (stream === "management") {
      setSubjects([
        { name: "Compulsory English", creditHours: 4, grade: "A" },
        { name: "Compulsory Nepali", creditHours: 4, grade: "A" },
        { name: "Social Studies / Life Skills", creditHours: 4, grade: "A+" },
        { name: "Accounting", creditHours: 5, grade: "A" },
        { name: "Economics", creditHours: 5, grade: "B+" },
        { name: "Business Studies / Hotel Mgmt", creditHours: 5, grade: "A" },
      ]);
    }
  }, [stream]);

  const totalCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);
  const totalPoints = subjects.reduce((sum, s) => sum + (GRADE_POINTS[s.grade] || 0) * s.creditHours, 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const hasNG = subjects.some((s) => s.grade === "NG");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">+2 NEB GPA Calculator (Class 11 & 12)</h3>
          <p className="text-xs text-[var(--text-muted)]">Official National Examinations Board (+2) grading formula with credit hour weighting.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setStream("science")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${stream === "science" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Science
          </button>
          <button
            type="button"
            onClick={() => setStream("management")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${stream === "management" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Management
          </button>
          <button
            type="button"
            onClick={() => setStream("custom")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${stream === "custom" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Custom
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <table className="min-w-[500px] w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--surface-border)] text-[var(--text-muted)]">
              <th className="pb-2 font-semibold">Subject</th>
              <th className="pb-2 font-semibold">Credits</th>
              <th className="pb-2 font-semibold">Grade</th>
              <th className="pb-2 font-semibold">Points</th>
              <th className="pb-2 text-right font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--surface-border)]">
            {subjects.map((sub, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-canvas)]">
                <td className="py-2.5 pr-3 font-semibold text-[var(--text-main)]">{sub.name}</td>
                <td className="py-2.5 pr-3 font-mono text-[var(--text-muted)]">{sub.creditHours} CH</td>
                <td className="py-2.5 pr-3">
                  <select
                    value={sub.grade}
                    onChange={(e) => {
                      const updated = [...subjects];
                      updated[idx].grade = e.target.value;
                      setSubjects(updated);
                    }}
                    className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2.5 py-1 text-xs font-bold text-[var(--text-main)]"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2.5 font-mono text-xs font-semibold text-[var(--text-muted)]">
                  {((GRADE_POINTS[sub.grade] || 0) * sub.creditHours).toFixed(1)}
                </td>
                <td className="py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">+2 NEB Overall GPA</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">{gpa} <span className="text-lg text-[var(--text-muted)]">/ 4.00</span></div>
        <p className="mt-2 text-xs font-semibold text-[var(--text-main)]">{hasNG ? "Non-Graded (NG) - Must re-appear in supplementary exam" : "Eligible for University Admission"}</p>
      </div>
    </div>
  );
}

/* =========================================================================
   3. CGPA CALCULATOR (COLLEGE / UNIVERSITY MULTI-SEMESTER)
   ========================================================================= */
interface SemesterItem {
  id: number;
  name: string;
  sgpa: number;
  credits: number;
}

export function CgpaTool() {
  const [scale, setScale] = useState<"4.0" | "10.0">("4.0");
  const [semesters, setSemesters] = useState<SemesterItem[]>([
    { id: 1, name: "Semester 1", sgpa: 3.6, credits: 18 },
    { id: 2, name: "Semester 2", sgpa: 3.8, credits: 18 },
    { id: 3, name: "Semester 3", sgpa: 3.5, credits: 21 },
    { id: 4, name: "Semester 4", sgpa: 3.9, credits: 20 },
  ]);

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([...semesters, { id: Date.now(), name: `Semester ${nextNum}`, sgpa: scale === "4.0" ? 3.5 : 8.5, credits: 18 }]);
  };

  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = semesters.reduce((sum, s) => sum + s.sgpa * s.credits, 0);
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Cumulative GPA (CGPA) Calculator</h3>
          <p className="text-xs text-[var(--text-muted)]">Calculate multi-semester or multi-year university cumulative GPA with credit hours.</p>
        </div>

        <div className="flex gap-1 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setScale("4.0")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${scale === "4.0" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            4.0 Scale
          </button>
          <button
            type="button"
            onClick={() => setScale("10.0")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${scale === "10.0" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            10.0 Scale
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {semesters.map((sem, idx) => (
          <div key={sem.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3">
            <span className="w-24 font-bold text-xs text-[var(--text-main)]">{sem.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--text-muted)]">SGPA:</span>
              <input
                type="number"
                step="0.01"
                min="0"
                max={scale === "4.0" ? "4.0" : "10.0"}
                value={sem.sgpa}
                onChange={(e) => {
                  const updated = [...semesters];
                  updated[idx].sgpa = parseFloat(e.target.value) || 0;
                  setSemesters(updated);
                }}
                className="w-20 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-2 py-1 text-xs font-bold font-mono text-[var(--text-main)]"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--text-muted)]">Credits:</span>
              <input
                type="number"
                min="1"
                value={sem.credits}
                onChange={(e) => {
                  const updated = [...semesters];
                  updated[idx].credits = parseFloat(e.target.value) || 1;
                  setSemesters(updated);
                }}
                className="w-16 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-2 py-1 text-xs font-mono text-[var(--text-main)]"
              />
            </div>
            <button
              type="button"
              onClick={() => setSemesters(semesters.filter((_, i) => i !== idx))}
              className="ml-auto text-xs text-rose-400 hover:text-rose-300"
            >
              ✕ Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addSemester}
          className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-primary)]"
        >
          + Add Semester
        </button>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Overall CGPA</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">{cgpa} <span className="text-lg text-[var(--text-muted)]">/ {scale}</span></div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">Total Completed Credit Units: {totalCredits}</p>
      </div>
    </div>
  );
}

/* =========================================================================
   4. MARKS TO GPA & PERCENTAGE CONVERTER
   ========================================================================= */
export function MarksGpaTool() {
  const [mode, setMode] = useState<"marks-to-gpa" | "gpa-to-marks">("marks-to-gpa");
  const [inputVal, setInputVal] = useState<number>(85);

  const calculateGpa = (percentage: number) => {
    if (percentage >= 90) return { gpa: "4.00", grade: "A+", desc: "Outstanding" };
    if (percentage >= 80) return { gpa: "3.60", grade: "A", desc: "Excellent" };
    if (percentage >= 70) return { gpa: "3.20", grade: "B+", desc: "Very Good" };
    if (percentage >= 60) return { gpa: "2.80", grade: "B", desc: "Good" };
    if (percentage >= 50) return { gpa: "2.40", grade: "C+", desc: "Satisfactory" };
    if (percentage >= 40) return { gpa: "2.00", grade: "C", desc: "Acceptable" };
    if (percentage >= 35) return { gpa: "1.60", grade: "D", desc: "Basic" };
    return { gpa: "0.00", grade: "NG", desc: "Non-Graded (Fail)" };
  };

  const calculatePercentage = (gpa: number) => {
    // Standard Formula: Percentage = GPA * 25 (for 4.0 scale) or (GPA - 0.75) * 10
    const directPct = Math.min(100, Math.max(0, gpa * 25)).toFixed(1);
    const cbsePct = Math.min(100, Math.max(0, gpa * 9.5)).toFixed(1);
    return { directPct, cbsePct };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Marks ↔ GPA & Percentage Converter</h3>
        <p className="text-xs text-[var(--text-muted)]">Convert between exam percentage marks, letter grades, and 4.0 / 10.0 scale GPA.</p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
        <button
          type="button"
          onClick={() => { setMode("marks-to-gpa"); setInputVal(85); }}
          className={`flex-1 min-w-[140px] rounded-lg py-2 text-[11px] sm:text-xs font-bold ${mode === "marks-to-gpa" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
        >
          Percentage Marks ➔ GPA
        </button>
        <button
          type="button"
          onClick={() => { setMode("gpa-to-marks"); setInputVal(3.6); }}
          className={`flex-1 min-w-[140px] rounded-lg py-2 text-[11px] sm:text-xs font-bold ${mode === "gpa-to-marks" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
        >
          GPA ➔ Percentage Marks
        </button>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 sm:p-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
            {mode === "marks-to-gpa" ? "Enter Percentage Marks (0 - 100%):" : "Enter GPA (0.00 - 4.00):"}
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max={mode === "marks-to-gpa" ? 100 : 4}
            value={inputVal}
            onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-4 py-2 text-sm font-bold font-mono text-[var(--text-main)] focus:border-[var(--accent-primary)] focus:outline-none"
          />
        </div>

        {mode === "marks-to-gpa" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-center">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">GPA (4.0)</span>
              <div className="mt-1 text-2xl font-black text-[var(--accent-primary)] font-mono">{calculateGpa(inputVal).gpa}</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Letter Grade</span>
              <div className="mt-1 text-2xl font-black text-[var(--text-main)]">{calculateGpa(inputVal).grade}</div>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Status</span>
              <div className="mt-1 text-xs font-bold text-emerald-400">{calculateGpa(inputVal).desc}</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-center">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Equivalent Percentage</span>
              <div className="mt-1 text-2xl font-black text-[var(--accent-primary)] font-mono">{calculatePercentage(inputVal).directPct}%</div>
              <p className="mt-1 text-[10px] text-[var(--text-muted)]">Standard 4.0 Scale (GPA × 25)</p>
            </div>
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-3">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">CBSE / AICTE Equiv</span>
              <div className="mt-1 text-2xl font-black text-[var(--text-main)] font-mono">{calculatePercentage(inputVal).cbsePct}%</div>
              <p className="mt-1 text-[10px] text-[var(--text-muted)]">Formula: GPA × 9.5</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   5. TARGET MARKS & PASS/FAIL PREDICTOR
   ========================================================================= */
export function TargetMarksTool() {
  const [currentScore, setCurrentScore] = useState<number>(32);
  const [currentWeight, setCurrentWeight] = useState<number>(40);
  const [targetFinalGrade, setTargetFinalGrade] = useState<number>(80);
  const [passingThreshold, setPassingThreshold] = useState<number>(40);

  const finalExamWeight = Math.max(0, 100 - currentWeight);
  const currentEarnedPoints = (currentScore / 100) * currentWeight;
  const neededPoints = targetFinalGrade - currentEarnedPoints;
  const neededFinalScore = finalExamWeight > 0 ? (neededPoints / finalExamWeight) * 100 : 0;
  
  const passNeededPoints = passingThreshold - currentEarnedPoints;
  const passNeededFinalScore = finalExamWeight > 0 ? (passNeededPoints / finalExamWeight) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Target Marks & Pass/Fail Predictor</h3>
        <p className="text-xs text-[var(--text-muted)]">Find out what score you need on your final exam to pass or hit your target grade.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Current Internal / Midterm Score (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={currentScore}
            onChange={(e) => setCurrentScore(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Current Assessment Weightage (%)</label>
          <input
            type="number"
            min="1"
            max="99"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Target Desired Overall Grade (%)</label>
          <input
            type="number"
            min="1"
            max="100"
            value={targetFinalGrade}
            onChange={(e) => setTargetFinalGrade(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Minimum Passing Threshold (%)</label>
          <input
            type="number"
            min="1"
            max="100"
            value={passingThreshold}
            onChange={(e) => setPassingThreshold(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 sm:p-5 text-center">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Score Needed to Pass ({passingThreshold}%)</span>
          <div className="mt-2 text-3xl font-black text-emerald-400 font-mono">
            {passNeededFinalScore <= 0 ? "Already Passed!" : `${Math.min(100, passNeededFinalScore).toFixed(1)}%`}
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">On remaining {finalExamWeight}% final exam</p>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 sm:p-5 text-center">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Score Needed for Target ({targetFinalGrade}%)</span>
          <div className="mt-2 text-3xl font-black text-[var(--accent-primary)] font-mono">
            {neededFinalScore > 100 ? "Mathematically Impossible" : neededFinalScore <= 0 ? "Goal Achieved!" : `${neededFinalScore.toFixed(1)}%`}
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {neededFinalScore > 100 ? "Max possible is 100%" : `Aim for ${Math.ceil(neededFinalScore)}/100`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. POMODORO STUDY TIMER
   ========================================================================= */
export function PomodoroTool() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      if (mode === "work") {
        setCompletedSessions((c) => c + 1);
        setMode("shortBreak");
        setTimeLeft(5 * 60);
      } else {
        setMode("work");
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode]);

  const selectMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === "work") setTimeLeft(25 * 60);
    else if (newMode === "shortBreak") setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4 text-left">
        <h3 className="text-base font-bold text-[var(--text-main)]">Pomodoro Study Timer</h3>
        <p className="text-xs text-[var(--text-muted)]">Boost study retention with 25-minute focus intervals and 5-minute restorative breaks.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => selectMode("work")}
          className={`rounded-xl px-3.5 sm:px-4 py-1.5 text-xs font-bold transition ${mode === "work" ? "bg-[var(--accent-primary)] text-black font-extrabold" : "border border-[var(--surface-border)] text-[var(--text-muted)]"}`}
        >
          Focus (25m)
        </button>
        <button
          type="button"
          onClick={() => selectMode("shortBreak")}
          className={`rounded-xl px-3.5 sm:px-4 py-1.5 text-xs font-bold transition ${mode === "shortBreak" ? "bg-emerald-400 text-black font-extrabold" : "border border-[var(--surface-border)] text-[var(--text-muted)]"}`}
        >
          Short Break (5m)
        </button>
        <button
          type="button"
          onClick={() => selectMode("longBreak")}
          className={`rounded-xl px-3.5 sm:px-4 py-1.5 text-xs font-bold transition ${mode === "longBreak" ? "bg-indigo-400 text-black font-extrabold" : "border border-[var(--surface-border)] text-[var(--text-muted)]"}`}
        >
          Long Break (15m)
        </button>
      </div>

      <div className="py-4 sm:py-6">
        <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-widest font-mono text-[var(--text-main)]">
          {formattedTime}
        </div>
        <p className="mt-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          {mode === "work" ? "🔥 Stay Deeply Focused" : "☕ Take a Refreshing Break"}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className={`rounded-2xl px-6 sm:px-8 py-3 text-xs sm:text-sm font-black transition shadow-md ${isRunning ? "bg-amber-400 text-black" : "bg-[var(--accent-primary)] text-black"}`}
        >
          {isRunning ? "Pause" : "Start Focus"}
        </button>
        <button
          type="button"
          onClick={() => selectMode(mode)}
          className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 sm:px-6 py-3 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)]"
        >
          Reset
        </button>
      </div>

      <div className="pt-2 text-xs text-[var(--text-muted)]">
        Completed Study Sessions Today: <span className="font-bold text-[var(--accent-primary)]">{completedSessions}</span>
      </div>
    </div>
  );
}

/* =========================================================================
   7. EXAM COUNTDOWN
   ========================================================================= */
interface ExamItem {
  id: string;
  subject: string;
  date: string;
}

export function ExamCountdownTool() {
  const [exams, setExams] = useState<ExamItem[]>([
    { id: "1", subject: "Final Mathematics Exam", date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0] },
    { id: "2", subject: "Physics / Accountancy", date: new Date(Date.now() + 21 * 86400000).toISOString().split("T")[0] },
  ]);
  const [newSub, setNewSub] = useState("");
  const [newDate, setNewDate] = useState("");

  const addExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub || !newDate) return;
    setExams([...exams, { id: Date.now().toString(), subject: newSub, date: newDate }]);
    setNewSub("");
    setNewDate("");
  };

  const getDaysLeft = (targetStr: string) => {
    const target = new Date(targetStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Exam Countdown & Study Planner</h3>
        <p className="text-xs text-[var(--text-muted)]">Keep track of your exam timetable with live days-remaining countdowns.</p>
      </div>

      <form onSubmit={addExam} className="flex flex-col sm:flex-row flex-wrap gap-2.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-3 sm:p-3.5">
        <input
          type="text"
          placeholder="Exam Subject / Test Name..."
          value={newSub}
          onChange={(e) => setNewSub(e.target.value)}
          className="flex-1 min-w-[180px] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 py-2 text-xs text-[var(--text-main)] focus:outline-none"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 py-2 text-xs text-[var(--text-main)] focus:outline-none"
        />
        <button
          type="submit"
          className="w-full sm:w-auto rounded-xl bg-[var(--accent-primary)] px-4 py-2 text-xs font-black text-black transition hover:opacity-90"
        >
          Add Exam
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {exams.map((item) => {
          const days = getDaysLeft(item.date);
          const isUrgent = days <= 3 && days >= 0;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 shadow-sm"
            >
              <div>
                <h4 className="text-xs font-bold text-[var(--text-main)]">{item.subject}</h4>
                <p className="mt-1 text-[11px] text-[var(--text-muted)]">Exam Date: {item.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-xl font-black font-mono ${days < 0 ? "text-slate-500" : isUrgent ? "text-rose-400" : "text-[var(--accent-primary)]"}`}>
                    {days < 0 ? "Passed" : `${days} Days`}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">{days >= 0 ? "Remaining" : "Completed"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExams(exams.filter((x) => x.id !== item.id))}
                  className="text-xs text-rose-400 hover:text-rose-300"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   8. ATTENDANCE & BUNK CALCULATOR
   ========================================================================= */
export function AttendanceTool() {
  const [totalClasses, setTotalClasses] = useState<number>(60);
  const [attendedClasses, setAttendedClasses] = useState<number>(48);
  const [requiredPercent, setRequiredPercent] = useState<number>(75);

  const currentPercent = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  
  // Can bunk calculation
  // (attended) / (total + bunk) >= req / 100
  // attended / (req / 100) >= total + bunk
  // bunk = Math.floor((attended * 100) / req - total)
  const canBunk = Math.max(0, Math.floor((attendedClasses * 100) / requiredPercent - totalClasses));

  // Must attend calculation
  // (attended + x) / (total + x) >= req / 100
  // (attended + x) * 100 >= req * (total + x)
  // 100*attended + 100*x >= req*total + req*x
  // (100 - req)*x >= req*total - 100*attended
  // x = Math.ceil((req*total - 100*attended) / (100 - req))
  const mustAttend = Math.max(0, Math.ceil((requiredPercent * totalClasses - 100 * attendedClasses) / (100 - requiredPercent)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">College Attendance & Bunk Calculator</h3>
        <p className="text-xs text-[var(--text-muted)]">Check if your attendance meets your university requirement, and calculate how many classes you can skip or must attend.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Total Classes Held</label>
          <input
            type="number"
            min="1"
            value={totalClasses}
            onChange={(e) => setTotalClasses(parseInt(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Classes Attended</label>
          <input
            type="number"
            min="0"
            max={totalClasses}
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(Math.min(totalClasses, parseInt(e.target.value) || 0))}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Required Threshold (%)</label>
          <input
            type="number"
            min="1"
            max="99"
            value={requiredPercent}
            onChange={(e) => setRequiredPercent(parseInt(e.target.value) || 75)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Current Attendance</span>
          <div className={`mt-2 text-4xl font-black font-mono ${currentPercent >= requiredPercent ? "text-emerald-400" : "text-rose-400"}`}>
            {currentPercent.toFixed(1)}%
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {currentPercent >= requiredPercent ? `Safe (Threshold: ${requiredPercent}%)` : `Shortage of ${(requiredPercent - currentPercent).toFixed(1)}%`}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Guidance Advice</span>
          {currentPercent >= requiredPercent ? (
            <div>
              <div className="mt-2 text-3xl font-black text-[var(--accent-primary)] font-mono">{canBunk} Classes</div>
              <p className="mt-1 text-xs text-emerald-400">You can safely bunk {canBunk} upcoming class{canBunk !== 1 ? "es" : ""}!</p>
            </div>
          ) : (
            <div>
              <div className="mt-2 text-3xl font-black text-rose-400 font-mono">{mustAttend} Classes</div>
              <p className="mt-1 text-xs text-rose-400">Must attend next {mustAttend} consecutive class{mustAttend !== 1 ? "es" : ""} without absence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

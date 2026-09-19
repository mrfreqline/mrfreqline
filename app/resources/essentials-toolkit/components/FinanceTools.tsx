"use client";

import React, { useState } from "react";

/* =========================================================================
   1. SIMPLE & COMPOUND INTEREST CALCULATOR
   ========================================================================= */
export function InterestTool() {
  const [type, setType] = useState<"simple" | "compound">("compound");
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(10);
  const [timeYears, setTimeYears] = useState<number>(3);
  const [frequency, setFrequency] = useState<number>(1); // 1 = yearly, 4 = quarterly, 12 = monthly

  let interest = 0;
  let totalAmount = 0;

  if (type === "simple") {
    interest = (principal * rate * timeYears) / 100;
    totalAmount = principal + interest;
  } else {
    // Compound interest: A = P * (1 + r/(100*n))^(n*t)
    const n = frequency;
    const r = rate / 100;
    totalAmount = principal * Math.pow(1 + r / n, n * timeYears);
    interest = totalAmount - principal;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Simple & Compound Interest Calculator</h3>
          <p className="text-xs text-[var(--text-muted)]">Calculate accrued interest, future wealth value, and compound growth over time.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setType("compound")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${type === "compound" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Compound Interest
          </button>
          <button
            type="button"
            onClick={() => setType("simple")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${type === "simple" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Simple Interest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Principal Amount</label>
          <input
            type="number"
            min="1"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Time Period (Years)</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={timeYears}
            onChange={(e) => setTimeYears(parseFloat(e.target.value) || 0.5)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      {type === "compound" && (
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Compounding Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2 text-xs font-semibold text-[var(--text-main)]"
          >
            <option value={1}>Annually (Once per year)</option>
            <option value={2}>Semi-Annually (Twice per year)</option>
            <option value={4}>Quarterly (Every 3 months)</option>
            <option value={12}>Monthly (Every month)</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Principal Invested</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--text-main)]">{principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Total Interest Earned</span>
          <div className="mt-1.5 text-xl font-black font-mono text-emerald-400">{interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Total Future Value</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--accent-primary)]">{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. EMI LOAN CALCULATOR
   ========================================================================= */
export function LoanEmiTool() {
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(11.5);
  const [tenureYears, setTenureYears] = useState<number>(15);

  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;
  const emi = n > 0 && r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Loan EMI & Mortgage Calculator</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate monthly Equated Monthly Installment (EMI), total interest, and amortized loan repayment.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Loan Amount</label>
          <input
            type="number"
            min="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Interest Rate (% p.a.)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Loan Tenure (Years)</label>
          <input
            type="number"
            min="1"
            max="35"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Monthly Loan EMI</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {Math.round(emi).toLocaleString()} <span className="text-sm text-[var(--text-muted)]">/ month</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[var(--surface-border)] pt-4 text-xs">
          <div>
            <span className="text-[var(--text-muted)]">Total Interest Payable:</span>
            <div className="font-bold text-rose-400 font-mono text-sm">{Math.round(totalInterest).toLocaleString()}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Total Amount (Principal + Interest):</span>
            <div className="font-bold text-[var(--text-main)] font-mono text-sm">{Math.round(totalPayment).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. SIP CALCULATOR (SYSTEMATIC INVESTMENT PLAN)
   ========================================================================= */
export function SipTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(14);
  const [tenureYears, setTenureYears] = useState<number>(10);

  const i = expectedReturnRate / (12 * 100);
  const n = tenureYears * 12;
  // SIP Formula: M = P * ((1+i)^n - 1) / i * (1+i)
  const totalValue = n > 0 && i > 0 ? monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : 0;
  const investedAmount = monthlyInvestment * n;
  const wealthGain = totalValue - investedAmount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">SIP Calculator (Mutual Funds & Wealth)</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate compound wealth growth on periodic monthly systematic investments.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Monthly Investment</label>
          <input
            type="number"
            min="500"
            step="500"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Expected Annual Return (%)</label>
          <input
            type="number"
            step="0.5"
            min="1"
            value={expectedReturnRate}
            onChange={(e) => setExpectedReturnRate(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Time Horizon (Years)</label>
          <input
            type="number"
            min="1"
            max="40"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Total Amount Invested</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--text-main)]">{Math.round(investedAmount).toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Estimated Wealth Gain</span>
          <div className="mt-1.5 text-xl font-black font-mono text-emerald-400">+{Math.round(wealthGain).toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-center">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Total Expected Value</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--accent-primary)]">{Math.round(totalValue).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. FIXED DEPOSIT & RECURRING DEPOSIT CALCULATOR
   ========================================================================= */
export function FdRdTool() {
  const [tab, setTab] = useState<"fd" | "rd">("fd");
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(2);

  // FD: A = P * (1 + r/4)^(4*t) (quarterly compounding standard in Nepal/India)
  const fdMaturity = amount * Math.pow(1 + (rate / 100) / 4, 4 * tenureYears);
  const fdInterest = fdMaturity - amount;

  // RD: Maturity for monthly deposit
  const n = tenureYears * 12;
  const i = (rate / 100) / 12;
  const rdMaturity = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const rdTotalDeposit = amount * n;
  const rdInterest = rdMaturity - rdTotalDeposit;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Fixed Deposit (FD) & RD Calculator</h3>
          <p className="text-xs text-[var(--text-muted)]">Calculate bank fixed deposit and recurring deposit maturity amounts with interest.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setTab("fd")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "fd" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Fixed Deposit (FD)
          </button>
          <button
            type="button"
            onClick={() => setTab("rd")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "rd" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Recurring Deposit (RD)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
            {tab === "fd" ? "Lump-Sum Deposit Amount" : "Monthly Installment Amount"}
          </label>
          <input
            type="number"
            min="1000"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Interest Rate (% p.a.)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Tenure (Years)</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseFloat(e.target.value) || 0.5)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Estimated Maturity Value</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {Math.round(tab === "fd" ? fdMaturity : rdMaturity).toLocaleString()}
        </div>
        <p className="mt-2 text-xs text-emerald-400 font-semibold">
          Includes Total Interest: +{Math.round(tab === "fd" ? fdInterest : rdInterest).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   5. PROFIT & LOSS / MARGIN CALCULATOR
   ========================================================================= */
export function ProfitLossTool() {
  const [costPrice, setCostPrice] = useState<number>(800);
  const [sellingPrice, setSellingPrice] = useState<number>(1000);

  const diff = sellingPrice - costPrice;
  const isProfit = diff >= 0;
  const profitLossPercent = costPrice > 0 ? (Math.abs(diff) / costPrice) * 100 : 0;
  const profitMarginPercent = sellingPrice > 0 ? (diff / sellingPrice) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Profit & Loss / Margin Calculator</h3>
        <p className="text-xs text-[var(--text-muted)]">Calculate profit margin, markup percentage, and gross profit or loss.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Cost Price (CP)</label>
          <input
            type="number"
            min="0"
            value={costPrice}
            onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Selling Price (SP)</label>
          <input
            type="number"
            min="0"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Net {isProfit ? "Profit" : "Loss"} Amount</span>
          <div className={`mt-1.5 text-2xl font-black font-mono ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
            {isProfit ? "+" : "-"}{Math.abs(diff).toFixed(2)}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">{isProfit ? "Profit Markup" : "Loss %"} (on CP)</span>
          <div className="mt-1.5 text-2xl font-black font-mono text-[var(--text-main)]">{profitLossPercent.toFixed(1)}%</div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Gross Margin (on SP)</span>
          <div className="mt-1.5 text-2xl font-black font-mono text-[var(--accent-primary)]">{profitMarginPercent.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. DISCOUNT CALCULATOR
   ========================================================================= */
export function DiscountTool() {
  const [originalPrice, setOriginalPrice] = useState<number>(2500);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [extraCoupon, setExtraCoupon] = useState<number>(5);

  const priceAfterFirst = originalPrice * (1 - discountPercent / 100);
  const finalPrice = priceAfterFirst * (1 - extraCoupon / 100);
  const totalSaved = originalPrice - finalPrice;
  const effectiveDiscountPercent = originalPrice > 0 ? (totalSaved / originalPrice) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Discount & Sale Price Calculator</h3>
        <p className="text-xs text-[var(--text-muted)]">Find the final discounted price and calculate extra coupon savings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Original Price</label>
          <input
            type="number"
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Primary Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Extra Coupon / Promo (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={extraCoupon}
            onChange={(e) => setExtraCoupon(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Final Sale Price</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {finalPrice.toFixed(2)}
        </div>
        <p className="mt-2 text-xs font-semibold text-emerald-400">
          You Save: {totalSaved.toFixed(2)} ({effectiveDiscountPercent.toFixed(1)}% total off)
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   7. VAT & SALES TAX CALCULATOR (NEPAL 13% & CUSTOM)
   ========================================================================= */
export function VatTool() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState<number>(10000);
  const [vatRate, setVatRate] = useState<number>(13); // Nepal 13% default

  let netAmount = 0;
  let vatAmount = 0;
  let grossAmount = 0;

  if (mode === "add") {
    netAmount = amount;
    vatAmount = (netAmount * vatRate) / 100;
    grossAmount = netAmount + vatAmount;
  } else {
    grossAmount = amount;
    netAmount = grossAmount / (1 + vatRate / 100);
    vatAmount = grossAmount - netAmount;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">VAT & Sales Tax Calculator</h3>
          <p className="text-xs text-[var(--text-muted)]">Compute Value Added Tax (Nepal Standard 13% or custom rate). Add or reverse/remove VAT.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setMode("add")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${mode === "add" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Add VAT (Exclusive)
          </button>
          <button
            type="button"
            onClick={() => setMode("remove")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${mode === "remove" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Remove VAT (Inclusive)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
            {mode === "add" ? "Net Amount (Without VAT)" : "Gross Amount (With VAT Included)"}
          </label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">VAT Percentage (%)</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={vatRate}
              onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
            />
            <button
              type="button"
              onClick={() => setVatRate(13)}
              className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3 text-xs font-bold text-[var(--accent-primary)]"
              title="Set to Nepal Standard 13%"
            >
              13% (Nepal)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Net (Excl. VAT)</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--text-main)]">{netAmount.toFixed(2)}</div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">VAT Amount ({vatRate}%)</span>
          <div className="mt-1.5 text-xl font-black font-mono text-emerald-400">+{vatAmount.toFixed(2)}</div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Gross (Incl. VAT)</span>
          <div className="mt-1.5 text-xl font-black font-mono text-[var(--accent-primary)]">{grossAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. NEPAL SALARY & INCOME TAX CALCULATOR (LATEST SLABS)
   ========================================================================= */
export function SalaryTaxTool() {
  const [maritalStatus, setMaritalStatus] = useState<"individual" | "married">("individual");
  const [monthlySalary, setMonthlySalary] = useState<number>(60000);
  const [ssfDeduction, setSsfDeduction] = useState<boolean>(true); // 1% tax exempted if enrolled in SSF

  const annualSalary = monthlySalary * 12;

  // Nepal Tax Slabs for FY 2080/81 - 2081/82
  // Individual: 5L @ 1% (or 0% with SSF), 2L (5L-7L) @ 10%, 3L (7L-10L) @ 20%, 10L (10L-20L) @ 30%, Above 20L @ 36%
  // Married: 6L @ 1% (or 0% with SSF), 2L (6L-8L) @ 10%, 3L (8L-11L) @ 20%, 9L (11L-20L) @ 30%, Above 20L @ 36%
  const b1 = maritalStatus === "individual" ? 500000 : 600000;
  const b2 = b1 + 200000;
  const b3 = b2 + 300000;
  const b4 = 2000000;

  let totalTax = 0;

  if (annualSalary <= b1) {
    totalTax += ssfDeduction ? 0 : annualSalary * 0.01;
  } else {
    totalTax += ssfDeduction ? 0 : b1 * 0.01;

    if (annualSalary <= b2) {
      totalTax += (annualSalary - b1) * 0.10;
    } else {
      totalTax += (b2 - b1) * 0.10;

      if (annualSalary <= b3) {
        totalTax += (annualSalary - b2) * 0.20;
      } else {
        totalTax += (b3 - b2) * 0.20;

        if (annualSalary <= b4) {
          totalTax += (annualSalary - b3) * 0.30;
        } else {
          totalTax += (b4 - b3) * 0.30;
          totalTax += (annualSalary - b4) * 0.36;
        }
      }
    }
  }

  const monthlyTax = totalTax / 12;
  const monthlyTakeHome = monthlySalary - monthlyTax;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)] pb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Nepal Salary & Income Tax Calculator</h3>
          <p className="text-xs text-[var(--text-muted)]">Official Nepal Inland Revenue Department (IRD) tax slabs for Individual & Married status.</p>
        </div>

        <div className="flex gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
          <button
            type="button"
            onClick={() => setMaritalStatus("individual")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${maritalStatus === "individual" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Single / Individual
          </button>
          <button
            type="button"
            onClick={() => setMaritalStatus("married")}
            className={`rounded-lg px-3 py-1 text-xs font-bold ${maritalStatus === "married" ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"}`}
          >
            Married Couple
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Monthly Gross Salary (NPR)</label>
          <input
            type="number"
            min="1000"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-main)] cursor-pointer">
            <input
              type="checkbox"
              checked={ssfDeduction}
              onChange={(e) => setSsfDeduction(e.target.checked)}
              className="rounded"
            />
            <span>Enrolled in Social Security Fund (SSF) — 1% exemption on 1st slab</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Monthly Tax (TDS)</span>
          <div className="mt-1.5 text-2xl font-black font-mono text-rose-400">NPR {Math.round(monthlyTax).toLocaleString()}</div>
          <span className="text-[10px] text-[var(--text-muted)]">Annual: NPR {Math.round(totalTax).toLocaleString()}</span>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Effective Tax Rate</span>
          <div className="mt-1.5 text-2xl font-black font-mono text-[var(--text-main)]">
            {annualSalary > 0 ? ((totalTax / annualSalary) * 100).toFixed(1) : "0"}%
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Net Monthly Take-Home</span>
          <div className="mt-1.5 text-2xl font-black font-mono text-emerald-400">NPR {Math.round(monthlyTakeHome).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   9. SAVINGS GOAL PLANNER
   ========================================================================= */
export function SavingsGoalTool() {
  const [goalAmount, setGoalAmount] = useState<number>(500000);
  const [currentSaved, setCurrentSaved] = useState<number>(50000);
  const [targetMonths, setTargetMonths] = useState<number>(18);

  const remaining = Math.max(0, goalAmount - currentSaved);
  const monthlyDeposit = targetMonths > 0 ? remaining / targetMonths : 0;
  const progressPercent = goalAmount > 0 ? Math.min(100, (currentSaved / goalAmount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Savings Goal Planner</h3>
        <p className="text-xs text-[var(--text-muted)]">Determine exactly how much you need to save each month to buy a bike, gadget, or reach financial milestones.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Target Savings Goal Amount</label>
          <input
            type="number"
            min="100"
            value={goalAmount}
            onChange={(e) => setGoalAmount(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Already Saved Amount</label>
          <input
            type="number"
            min="0"
            value={currentSaved}
            onChange={(e) => setCurrentSaved(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Target Deadline (Months)</label>
          <input
            type="number"
            min="1"
            max="120"
            value={targetMonths}
            onChange={(e) => setTargetMonths(parseInt(e.target.value) || 1)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Required Monthly Deposit</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {Math.ceil(monthlyDeposit).toLocaleString()} <span className="text-sm text-[var(--text-muted)]">/ month</span>
        </div>
        <div className="mt-4 max-w-md mx-auto">
          <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1 font-semibold">
            <span>Progress: {progressPercent.toFixed(1)}%</span>
            <span>Remaining: {remaining.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--surface-border)] overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   10. MULTI-CURRENCY CONVERTER
   ========================================================================= */
const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  NPR: 134.5,
  INR: 83.9,
  EUR: 0.92,
  GBP: 0.77,
  AUD: 1.51,
  CAD: 1.38,
  JPY: 153.2,
  AED: 3.67,
};

export function CurrencyTool() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState<string>("USD");
  const [toCurr, setToCurr] = useState<string>("NPR");

  const fromRate = CURRENCY_RATES[fromCurr] || 1;
  const toRate = CURRENCY_RATES[toCurr] || 1;
  // Convert fromCurr to USD, then USD to toCurr
  const inUsd = amount / fromRate;
  const converted = inUsd * toRate;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-[var(--surface-border)] pb-4">
        <h3 className="text-base font-bold text-[var(--text-main)]">Currency Converter</h3>
        <p className="text-xs text-[var(--text-muted)]">Convert between major global and regional currencies including NPR, USD, INR, EUR, and GBP.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">Amount</label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)] font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">From Currency</label>
          <select
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            {Object.keys(CURRENCY_RATES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">To Currency</label>
          <select
            value={toCurr}
            onChange={(e) => setToCurr(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-2.5 text-xs font-bold text-[var(--text-main)]"
          >
            {Object.keys(CURRENCY_RATES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{amount} {fromCurr} equals</span>
        <div className="mt-2 text-4xl font-black text-[var(--accent-primary)] font-mono">
          {converted.toFixed(2)} <span className="text-xl text-[var(--text-main)]">{toCurr}</span>
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          1 {fromCurr} = {(toRate / fromRate).toFixed(4)} {toCurr}
        </p>
      </div>
    </div>
  );
}

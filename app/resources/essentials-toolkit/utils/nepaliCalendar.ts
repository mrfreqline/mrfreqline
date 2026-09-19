/**
 * Bikram Sambat (BS) <-> Gregorian (AD) Date Utility
 * Supports date conversion, month definitions, and age calculation for BS & AD.
 */

// Nepali month names
export const BS_MONTHS = [
  { id: 1, name: "Baishakh", np: "वैशाख", days: 31 },
  { id: 2, name: "Jestha", np: "जेठ", days: 31 },
  { id: 3, name: "Ashadh", np: "असार", days: 32 },
  { id: 4, name: "Shrawan", np: "साउन", days: 31 },
  { id: 5, name: "Bhadra", np: "भदौ", days: 31 },
  { id: 6, name: "Ashwin", np: "असोज", days: 30 },
  { id: 7, name: "Kartik", np: "कात्तिक", days: 30 },
  { id: 8, name: "Mangsir", np: "मंसिर", days: 29 },
  { id: 9, name: "Poush", np: "पुस", days: 30 },
  { id: 10, name: "Magh", np: "माघ", days: 29 },
  { id: 11, name: "Falgun", np: "फागुन", days: 30 },
  { id: 12, name: "Chaitra", np: "चैत", days: 30 },
];

export const AD_MONTHS = [
  { id: 1, name: "January", days: 31 },
  { id: 2, name: "February", days: 28 },
  { id: 3, name: "March", days: 31 },
  { id: 4, name: "April", days: 30 },
  { id: 5, name: "May", days: 31 },
  { id: 6, name: "June", days: 30 },
  { id: 7, name: "July", days: 31 },
  { id: 8, name: "August", days: 31 },
  { id: 9, name: "September", days: 30 },
  { id: 10, name: "October", days: 31 },
  { id: 11, name: "November", days: 30 },
  { id: 12, name: "December", days: 31 },
];

// Number of days in each month for BS years 2000 to 2090
// Format: [year, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12]
// Standard days mapping for accurate conversion
const BS_CALENDAR_DATA: Record<number, number[]> = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2085: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2087: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2088: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
};

// Reference point: 2000 Baishakh 1 BS = 1943 April 14 AD (Wednesday)
const REF_BS_YEAR = 2000;
const REF_AD_DATE = new Date(1943, 3, 14); // 0-indexed month: April is 3

/**
 * Get days in a specific BS month
 */
export function getBsDaysInMonth(year: number, month: number): number {
  const yearData = BS_CALENDAR_DATA[year];
  if (yearData && month >= 1 && month <= 12) {
    return yearData[month - 1];
  }
  // Fallback defaults
  const fallback = BS_MONTHS.find((m) => m.id === month);
  return fallback ? fallback.days : 30;
}

/**
 * Convert BS Date (Year, Month, Day) to Gregorian AD Date
 */
export function convertBsToAd(bsYear: number, bsMonth: number, bsDay: number): Date | null {
  if (bsYear < 2000 || bsYear > 2090) {
    // Approximation for outside calendar bounds: BS is ~56 years, 8 months, 17 days ahead
    const approxYear = bsYear - 57;
    return new Date(approxYear, bsMonth - 1, bsDay);
  }

  let totalDays = 0;

  // Add days for complete years from reference
  for (let y = REF_BS_YEAR; y < bsYear; y++) {
    const yearDays = BS_CALENDAR_DATA[y];
    if (yearDays) {
      totalDays += yearDays.reduce((acc, d) => acc + d, 0);
    } else {
      totalDays += 365;
    }
  }

  // Add days for completed months in target year
  const currentYearMonths = BS_CALENDAR_DATA[bsYear];
  if (currentYearMonths) {
    for (let m = 0; m < bsMonth - 1; m++) {
      totalDays += currentYearMonths[m];
    }
  }

  // Add remaining days (0-indexed offset from 1st of month)
  totalDays += bsDay - 1;

  const result = new Date(REF_AD_DATE.getTime());
  result.setDate(result.getDate() + totalDays);
  return result;
}

/**
 * Convert Gregorian AD Date to BS Date (Year, Month, Day)
 */
export function convertAdToBs(adDate: Date): { year: number; month: number; day: number; monthName: string } {
  const diffMs = adDate.getTime() - REF_AD_DATE.getTime();
  let daysDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    // Before 2000 BS, return approximate
    const approxBsYear = adDate.getFullYear() + 57;
    return {
      year: approxBsYear,
      month: adDate.getMonth() + 1,
      day: adDate.getDate(),
      monthName: BS_MONTHS[adDate.getMonth()]?.name || "Baishakh",
    };
  }

  let currentYear = REF_BS_YEAR;

  while (currentYear <= 2090) {
    const yearData = BS_CALENDAR_DATA[currentYear];
    const daysInThisYear = yearData
      ? yearData.reduce((acc, d) => acc + d, 0)
      : 365;

    if (daysDiff < daysInThisYear) {
      // It falls within currentYear
      let currentMonth = 1;
      const monthDays = yearData || BS_MONTHS.map((m) => m.days);

      for (let m = 0; m < 12; m++) {
        const daysInMonth = monthDays[m];
        if (daysDiff < daysInMonth) {
          const day = daysDiff + 1;
          const monthName = BS_MONTHS[m]?.name || "Baishakh";
          return {
            year: currentYear,
            month: currentMonth,
            day,
            monthName,
          };
        }
        daysDiff -= daysInMonth;
        currentMonth++;
      }
    }

    daysDiff -= daysInThisYear;
    currentYear++;
  }

  // Beyond 2090 BS
  return {
    year: adDate.getFullYear() + 57,
    month: adDate.getMonth() + 1,
    day: adDate.getDate(),
    monthName: BS_MONTHS[adDate.getMonth()]?.name || "Baishakh",
  };
}

/**
 * Calculate age between two dates (supporting both AD and BS)
 */
export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  nextBirthdayDays: number;
}

export function calculateAdAge(birthDate: Date, targetDate: Date = new Date()): AgeResult {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = Math.max(0, targetDate.getTime() - birthDate.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday calculation
  const nextBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBday < targetDate) {
    nextBday.setFullYear(targetDate.getFullYear() + 1);
  }
  const nextBdayMs = nextBday.getTime() - targetDate.getTime();
  const nextBirthdayDays = Math.ceil(nextBdayMs / (1000 * 60 * 60 * 24));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    nextBirthdayDays: Math.max(0, nextBirthdayDays),
  };
}

export function calculateBsAge(
  birthBsYear: number,
  birthBsMonth: number,
  birthBsDay: number,
  targetBsYear: number,
  targetBsMonth: number,
  targetBsDay: number
): AgeResult {
  // Convert both to AD for accurate total days and countdown
  const birthAd = convertBsToAd(birthBsYear, birthBsMonth, birthBsDay) || new Date();
  const targetAd = convertBsToAd(targetBsYear, targetBsMonth, targetBsDay) || new Date();

  let years = targetBsYear - birthBsYear;
  let months = targetBsMonth - birthBsMonth;
  let days = targetBsDay - birthBsDay;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = getBsDaysInMonth(targetBsYear, targetBsMonth - 1 || 12);
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const baseAd = calculateAdAge(birthAd, targetAd);

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays: baseAd.totalDays,
    totalWeeks: baseAd.totalWeeks,
    totalMonths: years * 12 + months,
    totalHours: baseAd.totalHours,
    nextBirthdayDays: baseAd.nextBirthdayDays,
  };
}

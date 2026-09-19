export type ToolId =
  // Academic & Education
  | "see-gpa-calculator"
  | "neb-gpa-calculator"
  | "cgpa-calculator"
  | "marks-gpa-converter"
  | "target-marks-calculator"
  | "pomodoro-timer"
  | "exam-countdown"
  | "attendance-calculator"
  // Finance & Money
  | "simple-compound-interest"
  | "loan-emi-calculator"
  | "sip-investment-calculator"
  | "fd-rd-calculator"
  | "profit-loss-calculator"
  | "discount-calculator"
  | "vat-calculator"
  | "salary-tax-calculator"
  | "savings-goal-calculator"
  | "currency-converter"
  // Health & Fitness
  | "calorie-bmr-calculator"
  | "water-intake-calculator"
  | "weight-goal-calculator"
  | "body-fat-calculator"
  | "bmi-calculator"
  // PC & Gaming
  | "mouse-sensitivity-converter"
  | "reaction-time-test"
  | "pc-bottleneck"
  | "psu-calculator"
  | "fps-calculator"
  | "speed-test"
  | "network-tool"
  // Time & Date
  | "stopwatch-countdown"
  | "world-clock-converter"
  | "age-calculator"
  | "date-difference"
  | "bs-ad-converter"
  // Extended Converters & Units
  | "area-converter"
  | "volume-speed-converter"
  | "unit-converter"
  // Text & Dev
  | "text-cleaner-tools"
  | "preeti-unicode"
  | "ai-prompt-gen"
  | "json-formatter"
  | "word-counter"
  | "case-converter"
  | "color-converter"
  | "lorem-generator"
  | "markdown-preview"
  | "url-encoder"
  // PDF & Media
  | "pdf-merge"
  | "pdf-split"
  | "pdf-compress"
  | "pdf-to-image"
  | "image-to-pdf"
  | "text-to-pdf"
  | "image-compress"
  | "image-converter"
  | "yt-thumbnail"
  // Security & Privacy
  | "password-gen"
  | "file-hash"
  | "hash-generator"
  | "qr-generator"
  | "qr-scanner"
  | "uuid-gen"
  | "base64"
  // Shared
  | "percentage-calculator";

export type ToolCategory =
  | "All"
  | "Favorites"
  | "Academic & Education"
  | "Finance & Money"
  | "Health & Fitness"
  | "PC & Gaming"
  | "PDF & Media"
  | "Security & Privacy"
  | "Time & Date"
  | "Text & Dev";

export interface ToolSEOItem {
  id: ToolId;
  name: string;
  category: ToolCategory;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  shortDescription: string;
  features: string[];
  howToSteps: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: ToolId[];
}

export const TOOLS_DIRECTORY: Record<ToolId, ToolSEOItem> = {
  /* =========================================================================
     ACADEMIC & EDUCATION TOOLS
     ========================================================================= */
  "see-gpa-calculator": {
    id: "see-gpa-calculator",
    name: "SEE GPA Calculator",
    category: "Academic & Education",
    badge: "Nepal Board",
    seoTitle: "SEE GPA Calculator - Class 10 Nepal Grading System | MrFreqline",
    seoDescription: "Calculate your Secondary Education Examination (SEE Class 10) GPA based on the latest Nepal Examination Board 4.0 grading system. Free and instant.",
    keywords: ["see gpa calculator", "class 10 gpa calculator nepal", "neb see grading calculator", "how to calculate see gpa", "nepal see grade sheet calculator"],
    shortDescription: "Calculate your Secondary Education Examination (Class 10) GPA based on the latest 4.0 grading system.",
    features: [
      "Official Nepal National Examination Board 4.0 grading system",
      "Weighted GPA calculation factoring in theory and practical credit hours",
      "Automatic Non-Graded (NG) subject detection",
      "Add, edit, or customize subjects dynamically",
    ],
    howToSteps: [
      { step: 1, title: "Select Grades", desc: "Choose your letter grades (A+, A, B+, B, C+, C, D, NG) for each compulsory and optional subject." },
      { step: 2, title: "Customize Subjects", desc: "Adjust credit hours or add additional optional subjects if required." },
      { step: 3, title: "View Final GPA", desc: "See your calculated GPA out of 4.00 and overall division classification." },
    ],
    faqs: [
      { question: "What is the passing criteria for SEE in Nepal?", answer: "Under the latest letter grading guidelines, students must achieve at least a 'D' (35% or 1.6 GPA) in both theoretical and practical components to avoid Non-Graded (NG) status." },
      { question: "How is SEE GPA calculated from letter grades?", answer: "Each letter grade corresponds to a grade point (e.g. A+=4.0, A=3.6, B+=3.2). The GPA is the sum of (Grade Point × Credit Hours) divided by the Total Credit Hours." },
    ],
    relatedSlugs: ["neb-gpa-calculator", "marks-gpa-converter", "target-marks-calculator", "cgpa-calculator"],
  },

  "neb-gpa-calculator": {
    id: "neb-gpa-calculator",
    name: "+2 NEB GPA Calculator",
    category: "Academic & Education",
    badge: "Class 11 & 12",
    seoTitle: "+2 NEB GPA Calculator - Class 11 & 12 Science/Management/Humanities | MrFreqline",
    seoDescription: "Calculate overall +2 NEB GPA for Class 11 and 12 students across Science, Management, and Humanities streams with official credit hour weighting.",
    keywords: ["neb gpa calculator", "+2 gpa calculator nepal", "class 12 neb result calculator", "neb science gpa calculator", "neb management gpa calculator"],
    shortDescription: "Official National Examinations Board (+2) grading formula with credit hour weighting.",
    features: [
      "Stream presets for Science, Management, and Humanities",
      "Official credit hour allocations (English 4 CH, Nepali 4 CH, Science 5 CH)",
      "Instant Non-Graded (NG) subject alert and supplementary eligibility",
      "College and university admission GPA evaluation",
    ],
    howToSteps: [
      { step: 1, title: "Choose Stream", desc: "Pick Science, Management, or Custom to pre-populate standard +2 curriculum subjects." },
      { step: 2, title: "Set Letter Grades", desc: "Select your secured letter grades for each board exam subject." },
      { step: 3, title: "Get Overall GPA", desc: "View your total GPA out of 4.00 and eligibility for Bachelor's programs." },
    ],
    faqs: [
      { question: "What is Non-Graded (NG) in NEB Class 12?", answer: "Students who score below 35% in theoretical examination receive NG (Non-Graded) and must appear in supplementary chance exams." },
    ],
    relatedSlugs: ["see-gpa-calculator", "cgpa-calculator", "marks-gpa-converter", "target-marks-calculator"],
  },

  "cgpa-calculator": {
    id: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "Academic & Education",
    badge: "College",
    seoTitle: "Cumulative GPA (CGPA) Calculator - Semester & Degree CGPA | MrFreqline",
    seoDescription: "Calculate multi-semester cumulative Grade Point Average (CGPA) with credit units on 4.0 or 10.0 grading scales. Simple, accurate, and instant.",
    keywords: ["cgpa calculator", "cumulative gpa calculator", "semester gpa to cgpa", "calculate university cgpa", "credit hour cgpa calculator"],
    shortDescription: "Calculate multi-semester or multi-year university cumulative GPA with credit hours.",
    features: [
      "Supports 4.0 scale (US/Nepal/TU/KU/PU) and 10.0 scale (India/Europe)",
      "Dynamic addition of unlimited semesters or trimesters",
      "Credit unit weighting for accurate cumulative calculation",
      "Real-time updates as you type your SGPA scores",
    ],
    howToSteps: [
      { step: 1, title: "Choose Scale", desc: "Select either 4.0 or 10.0 maximum grading scale." },
      { step: 2, title: "Input Semester SGPAs", desc: "Enter your SGPA (Semester GPA) and credit count for each term." },
      { step: 3, title: "Review Cumulative CGPA", desc: "Get your overall weighted degree CGPA instantly." },
    ],
    faqs: [
      { question: "What is the difference between SGPA and CGPA?", answer: "SGPA (Semester Grade Point Average) measures your performance in a single academic term, whereas CGPA (Cumulative GPA) is the weighted average across all completed semesters." },
    ],
    relatedSlugs: ["marks-gpa-converter", "neb-gpa-calculator", "target-marks-calculator", "attendance-calculator"],
  },

  "marks-gpa-converter": {
    id: "marks-gpa-converter",
    name: "Marks ↔ GPA Converter",
    category: "Academic & Education",
    seoTitle: "Marks to GPA Converter & Percentage to GPA Online | MrFreqline",
    seoDescription: "Convert exam percentage marks to 4.0 scale GPA and letter grades, or convert GPA to percentage marks. Supports standard and CBSE/AICTE formulas.",
    keywords: ["marks to gpa converter", "percentage to gpa", "gpa to percentage calculator", "convert 4.0 gpa to percent", "cbse gpa to percentage"],
    shortDescription: "Convert between exam percentage marks, letter grades, and 4.0 / 10.0 scale GPA.",
    features: [
      "Bidirectional conversion: Percentage to GPA and GPA to Percentage",
      "Shows official letter grade (A+, A, B+, B, C+, C, D, NG)",
      "Includes standard US/International formula and CBSE/AICTE 9.5 multiplier",
      "One-click copy and instant live calculation",
    ],
    howToSteps: [
      { step: 1, title: "Choose Direction", desc: "Select 'Percentage Marks ➔ GPA' or 'GPA ➔ Percentage Marks'." },
      { step: 2, title: "Enter Score", desc: "Type your obtained percentage or GPA score." },
      { step: 3, title: "Inspect Result", desc: "View the equivalent GPA, letter grade, and conversion formulas." },
    ],
    faqs: [
      { question: "How do you convert 4.0 GPA to percentage?", answer: "On a standard 4.0 scale, multiplying your GPA by 25 yields the direct equivalent percentage (e.g., 3.6 × 25 = 90%). Under Indian CBSE/AICTE guidelines, multiplying GPA by 9.5 is standard." },
    ],
    relatedSlugs: ["percentage-calculator", "cgpa-calculator", "target-marks-calculator", "see-gpa-calculator"],
  },

  "target-marks-calculator": {
    id: "target-marks-calculator",
    name: "Target Marks & Pass Predictor",
    category: "Academic & Education",
    badge: "Predictor",
    seoTitle: "Target Marks Calculator & Pass/Fail Predictor | MrFreqline",
    seoDescription: "Find out what score you need on your final exam to pass or hit your target grade (A, B, or honors). Enter your current internal marks and weightage.",
    keywords: ["target marks calculator", "pass fail predictor", "what do i need on my final exam", "required final exam grade calculator", "exam passing score calculator"],
    shortDescription: "Find out what score you need on your final exam to pass or hit your target grade.",
    features: [
      "Calculates minimum final exam score required to pass",
      "Computes exact score needed to achieve target final letter grade",
      "Handles variable internal assessment vs final exam weightings (e.g. 40/60, 30/70)",
      "Flags mathematically impossible target scores in advance",
    ],
    howToSteps: [
      { step: 1, title: "Enter Current Score", desc: "Input your internal or midterm marks percentage." },
      { step: 2, title: "Set Weightage", desc: "Specify the weight of your internal assessments (e.g., 40%)." },
      { step: 3, title: "Set Goals", desc: "Enter your target overall percentage and minimum passing requirement." },
    ],
    faqs: [
      { question: "How does the final exam target calculator work?", answer: "It subtracts your current earned points from your desired total points and divides by the remaining final exam percentage weight." },
    ],
    relatedSlugs: ["attendance-calculator", "exam-countdown", "pomodoro-timer", "marks-gpa-converter"],
  },

  "pomodoro-timer": {
    id: "pomodoro-timer",
    name: "Pomodoro Study Timer",
    category: "Academic & Education",
    badge: "Productivity",
    seoTitle: "Free Pomodoro Study Timer Online - 25/5 Focus & Break Timer | MrFreqline",
    seoDescription: "Boost study retention and exam focus with the 25-minute Pomodoro technique. Includes 5-minute short breaks, 15-minute long breaks, and session tracking.",
    keywords: ["pomodoro timer online", "study timer", "25 minute focus timer", "pomodoro technique free", "student study stopwatch", "adhd focus timer online"],
    shortDescription: "Boost study retention with 25-minute focus intervals and 5-minute restorative breaks.",
    features: [
      "Standard 25-minute Focus, 5-minute Short Break, and 15-minute Long Break presets",
      "Session counter tracking completed study intervals",
      "Clean, distraction-free interface with minimal battery drain",
      "100% free and in-browser with zero signup needed",
    ],
    howToSteps: [
      { step: 1, title: "Start Focus", desc: "Click 'Start Focus' to begin your 25-minute undistracted study block." },
      { step: 2, title: "Take Break", desc: "When the timer completes, take a 5-minute stretch or water break." },
      { step: 3, title: "Repeat", desc: "After 4 completed sessions, enjoy an extended 15-minute restorative break." },
    ],
    faqs: [
      { question: "Why is the Pomodoro Technique effective for studying?", answer: "Breaking long study sessions into 25-minute intervals prevents cognitive fatigue, maintains high dopamine and focus, and aids memory consolidation." },
    ],
    relatedSlugs: ["exam-countdown", "attendance-calculator", "target-marks-calculator", "stopwatch-countdown"],
  },

  "exam-countdown": {
    id: "exam-countdown",
    name: "Exam Countdown",
    category: "Academic & Education",
    seoTitle: "Exam Countdown Timer - Days Remaining Study Timetable | MrFreqline",
    seoDescription: "Keep track of your exam timetable with live days-remaining countdowns for each subject. Add exams, track deadlines, and organize study schedules.",
    keywords: ["exam countdown timer", "days until exam calculator", "study timetable countdown", "how many days until my exam", "exam deadline tracker"],
    shortDescription: "Keep track of your exam timetable with live days-remaining countdowns.",
    features: [
      "Add custom exam subjects, test dates, and deadlines",
      "Live days-remaining calculation with urgency color indicators",
      "Identifies exams scheduled within the next 3 days",
      "Clean, responsive study dashboard",
    ],
    howToSteps: [
      { step: 1, title: "Enter Subject", desc: "Type your exam or project name into the title box." },
      { step: 2, title: "Select Date", desc: "Pick the test date from the calendar picker." },
      { step: 3, title: "Track Countdown", desc: "Monitor the remaining days and prioritize your revision accordingly." },
    ],
    faqs: [
      { question: "Are my exam dates saved if I close the tab?", answer: "Yes, exam items persist locally in your browser memory so your study timetable remains intact." },
    ],
    relatedSlugs: ["pomodoro-timer", "target-marks-calculator", "attendance-calculator", "date-difference"],
  },

  "attendance-calculator": {
    id: "attendance-calculator",
    name: "Attendance & Bunk Calculator",
    category: "Academic & Education",
    badge: "Student Essential",
    seoTitle: "College Attendance & Bunk Calculator - Check Minimum 75% | MrFreqline",
    seoDescription: "Check if your attendance meets your university 75% or 80% requirement. Find out exactly how many classes you can bunk or must attend.",
    keywords: ["attendance calculator", "bunk calculator college", "can i bunk class calculator", "75 percent attendance calculator", "how many classes can i miss"],
    shortDescription: "Check if your attendance meets your university requirement, and calculate how many classes you can skip or must attend.",
    features: [
      "Calculates current attendance percentage in real time",
      "Bunk Calculator: Tells you exactly how many future classes you can safely skip",
      "Recovery Calculator: Tells you how many consecutive classes you must attend to restore 75% threshold",
      "Customizable threshold (75%, 80%, 85%)",
    ],
    howToSteps: [
      { step: 1, title: "Input Total Classes", desc: "Enter total classes conducted by your institution so far." },
      { step: 2, title: "Input Classes Attended", desc: "Enter the number of classes you were physically present in." },
      { step: 3, title: "Get Advice", desc: "Instantly see your attendance status and exactly how many classes you can skip or must attend." },
    ],
    faqs: [
      { question: "How does the 'Can I Bunk' calculation work?", answer: "It determines how many future absences can occur while keeping your ratio of (Attended Classes) / (Total Classes + Future Absences) greater than or equal to your target percentage (e.g. 75%)." },
    ],
    relatedSlugs: ["pomodoro-timer", "exam-countdown", "target-marks-calculator", "cgpa-calculator"],
  },

  /* =========================================================================
     FINANCE & MONEY TOOLS
     ========================================================================= */
  "simple-compound-interest": {
    id: "simple-compound-interest",
    name: "Interest Calculator (Simple & Compound)",
    category: "Finance & Money",
    badge: "Finance",
    seoTitle: "Simple & Compound Interest Calculator - Future Value & Growth | MrFreqline",
    seoDescription: "Calculate simple and compound interest online. Compare compounding frequencies (yearly, quarterly, monthly) and see your total investment growth.",
    keywords: ["simple interest calculator", "compound interest calculator", "calculate compound growth online", "interest calculator p r t", "investment maturity calculator"],
    shortDescription: "Calculate accrued interest, future wealth value, and compound growth over time.",
    features: [
      "Dual mode: Simple Interest ($I = PRT$) and Compound Interest ($A = P(1 + r/n)^{nt}$)",
      "Customizable compounding frequency: Annually, Semi-Annually, Quarterly, Monthly",
      "Clear breakdown of Principal vs Total Interest Earned",
      "100% private: all calculations performed locally in your browser",
    ],
    howToSteps: [
      { step: 1, title: "Choose Mode", desc: "Select either Compound Interest or Simple Interest." },
      { step: 2, title: "Enter Parameters", desc: "Type your principal deposit, annual interest rate, and duration in years." },
      { step: 3, title: "Review Growth", desc: "See your total earned interest and total maturity amount." },
    ],
    faqs: [
      { question: "Why does compound interest grow faster than simple interest?", answer: "Simple interest is paid only on the initial principal, whereas compound interest adds earned interest back into the principal each period, earning 'interest on interest'." },
    ],
    relatedSlugs: ["loan-emi-calculator", "sip-investment-calculator", "fd-rd-calculator", "savings-goal-calculator"],
  },

  "loan-emi-calculator": {
    id: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    category: "Finance & Money",
    badge: "Loans",
    seoTitle: "Loan EMI Calculator - Home, Car & Personal Loan Monthly Payment | MrFreqline",
    seoDescription: "Calculate your monthly loan EMI (Equated Monthly Installment), total interest payable, and total cost of borrowing for home, auto, or personal loans.",
    keywords: ["loan emi calculator", "home loan emi calculator", "car loan emi", "calculate monthly emi online", "loan interest calculator", "mortgage payment calculator"],
    shortDescription: "Calculate monthly Equated Monthly Installment (EMI), total interest, and amortized loan repayment.",
    features: [
      "Calculates exact monthly EMI based on standard amortization formula",
      "Displays total interest payable vs original principal amount",
      "Supports loans from 1 to 35 years tenure",
      "Adjustable loan amounts and interest rates",
    ],
    howToSteps: [
      { step: 1, title: "Enter Loan Amount", desc: "Input the total principal amount you plan to borrow." },
      { step: 2, title: "Set Rate & Tenure", desc: "Enter the annual interest rate (% p.a.) and tenure in years." },
      { step: 3, title: "View Monthly EMI", desc: "See your fixed monthly payment and total interest cost." },
    ],
    faqs: [
      { question: "What is an EMI?", answer: "An Equated Monthly Installment (EMI) is a fixed monthly payment made by a borrower to a lender on a specified date each calendar month until the loan is fully repaid." },
    ],
    relatedSlugs: ["simple-compound-interest", "sip-investment-calculator", "fd-rd-calculator", "salary-tax-calculator"],
  },

  "sip-investment-calculator": {
    id: "sip-investment-calculator",
    name: "SIP Investment Calculator",
    category: "Finance & Money",
    badge: "Wealth",
    seoTitle: "SIP Calculator - Mutual Funds & Systematic Investment Plan Return | MrFreqline",
    seoDescription: "Calculate the future value of your Systematic Investment Plan (SIP) in mutual funds and stocks. Plan your monthly savings and compound wealth gains.",
    keywords: ["sip calculator", "systematic investment plan calculator", "mutual fund sip calculator", "sip return calculator online", "monthly sip wealth calculator"],
    shortDescription: "Calculate compound wealth growth on periodic monthly systematic investments.",
    features: [
      "Calculates total invested amount vs estimated capital gains",
      "Configurable monthly deposit, expected return rate, and years",
      "Realistic compound returns model for mutual funds and equities",
      "Clean summary cards with formatted currency",
    ],
    howToSteps: [
      { step: 1, title: "Set Monthly SIP", desc: "Enter how much money you plan to invest every month." },
      { step: 2, title: "Set Expected Return", desc: "Input your expected annual return rate (e.g. 12% to 15% for index funds)." },
      { step: 3, title: "Inspect Future Wealth", desc: "View the total projected value and wealth gained over your investment horizon." },
    ],
    faqs: [
      { question: "Why is a monthly SIP better than a lump-sum investment?", answer: "SIP allows you to benefit from rupee-cost averaging, smoothing out market volatility by automatically purchasing more units when prices are low." },
    ],
    relatedSlugs: ["simple-compound-interest", "loan-emi-calculator", "savings-goal-calculator", "fd-rd-calculator"],
  },

  "fd-rd-calculator": {
    id: "fd-rd-calculator",
    name: "FD & RD Calculator",
    category: "Finance & Money",
    seoTitle: "Fixed Deposit (FD) & Recurring Deposit (RD) Calculator | MrFreqline",
    seoDescription: "Calculate bank Fixed Deposit (FD) and Recurring Deposit (RD) maturity returns. Accurate quarterly interest compounding for Nepal and international banks.",
    keywords: ["fd calculator", "rd calculator", "fixed deposit maturity calculator", "recurring deposit return calculator", "bank interest calculator"],
    shortDescription: "Calculate bank fixed deposit and recurring deposit maturity amounts with interest.",
    features: [
      "Dual calculator: Lump-sum Fixed Deposit (FD) & Monthly Recurring Deposit (RD)",
      "Standard quarterly compounding interest calculation",
      "Shows total principal invested and earned interest",
      "Fast, private in-browser tool with zero ads",
    ],
    howToSteps: [
      { step: 1, title: "Select Product", desc: "Choose Fixed Deposit (lump sum) or Recurring Deposit (monthly)." },
      { step: 2, title: "Enter Deposit & Rate", desc: "Type your investment amount, bank interest rate, and tenure." },
      { step: 3, title: "Check Maturity Amount", desc: "Inspect your final payout and accrued interest." },
    ],
    faqs: [
      { question: "How often do banks compound Fixed Deposit interest?", answer: "Most commercial banks in Nepal and India compound FD interest on a quarterly (3-month) basis, which this calculator models accurately." },
    ],
    relatedSlugs: ["simple-compound-interest", "sip-investment-calculator", "savings-goal-calculator", "loan-emi-calculator"],
  },

  "profit-loss-calculator": {
    id: "profit-loss-calculator",
    name: "Profit & Loss Calculator",
    category: "Finance & Money",
    seoTitle: "Profit & Loss / Margin Calculator - Markup & Gross Profit | MrFreqline",
    seoDescription: "Calculate net profit, net loss, profit margin percentage, and markup on cost price online. Essential financial tool for businesses and traders.",
    keywords: ["profit and loss calculator", "profit margin calculator", "markup calculator", "calculate gross profit margin", "cost price selling price calculator"],
    shortDescription: "Calculate profit margin, markup percentage, and gross profit or loss.",
    features: [
      "Instant profit or loss detection with color-coded status",
      "Calculates Profit Margin % (based on Selling Price)",
      "Calculates Markup % (based on Cost Price)",
      "Useful for retail pricing, freelancing, and e-commerce stores",
    ],
    howToSteps: [
      { step: 1, title: "Enter Cost Price", desc: "Input your total cost to purchase or manufacture the product." },
      { step: 2, title: "Enter Selling Price", desc: "Input your target retail or resale price." },
      { step: 3, title: "View Margins", desc: "Inspect your net profit amount, profit margin %, and markup percentage." },
    ],
    faqs: [
      { question: "What is the difference between Margin and Markup?", answer: "Markup is the percentage added to the Cost Price to reach the Selling Price. Margin is the percentage of the Selling Price that represents profit." },
    ],
    relatedSlugs: ["discount-calculator", "vat-calculator", "percentage-calculator", "salary-tax-calculator"],
  },

  "discount-calculator": {
    id: "discount-calculator",
    name: "Discount Calculator",
    category: "Finance & Money",
    seoTitle: "Discount Calculator - Sale Price & Percentage Off Online | MrFreqline",
    seoDescription: "Calculate final sale price and savings on discounted products. Supports stacked coupons, double discounts, and sales promotions in your browser.",
    keywords: ["discount calculator", "sale price calculator", "percent off calculator", "calculate discount online", "double discount coupon calculator"],
    shortDescription: "Find the final discounted price and calculate extra coupon savings.",
    features: [
      "Calculates final discounted price and total money saved",
      "Supports secondary promo codes and stacked coupon discounts",
      "Shows effective total percentage saved",
      "Real-time calculation with zero page reloads",
    ],
    howToSteps: [
      { step: 1, title: "Enter Original Price", desc: "Type the sticker price of the product." },
      { step: 2, title: "Set Discount %", desc: "Enter the primary sale discount (e.g. 20%)." },
      { step: 3, title: "Add Extra Coupon (Optional)", desc: "Add any extra promotional voucher or coupon percentage to see your final checkout price." },
    ],
    faqs: [
      { question: "How does a double discount work?", answer: "If an item has 20% off and an extra 10% coupon, the 10% is applied to the already discounted price, resulting in an effective 28% total discount rather than 30%." },
    ],
    relatedSlugs: ["vat-calculator", "profit-loss-calculator", "percentage-calculator", "currency-converter"],
  },

  "vat-calculator": {
    id: "vat-calculator",
    name: "VAT & Sales Tax Calculator",
    category: "Finance & Money",
    badge: "Nepal 13%",
    seoTitle: "VAT Calculator - Add or Remove 13% VAT & Sales Tax Online | MrFreqline",
    seoDescription: "Calculate Value Added Tax (VAT) with Nepal standard 13% or custom tax rates. Add VAT to net price or reverse/remove VAT from gross invoices.",
    keywords: ["vat calculator", "nepal vat calculator 13", "add vat calculator", "remove vat online reverse", "sales tax calculator free"],
    shortDescription: "Compute Value Added Tax (Nepal Standard 13% or custom rate). Add or reverse/remove VAT.",
    features: [
      "Preset with Nepal's standard 13% Value Added Tax rate",
      "Supports custom global VAT / GST percentages",
      "Add VAT (exclusive) and Remove VAT (reverse inclusive tax calculation)",
      "Clear breakdown of Net, VAT amount, and Gross total",
    ],
    howToSteps: [
      { step: 1, title: "Choose Calculation Mode", desc: "Select 'Add VAT (Exclusive)' or 'Remove VAT (Inclusive)'." },
      { step: 2, title: "Enter Price & Rate", desc: "Type your amount and adjust the VAT percentage if necessary." },
      { step: 3, title: "View Tax Breakdown", desc: "Inspect net subtotal, tax levied, and final invoice gross amount." },
    ],
    faqs: [
      { question: "How do you calculate price before VAT (Reverse VAT)?", answer: "To remove VAT, divide the gross price by (1 + VAT Rate / 100). For example, with 13% VAT, divide by 1.13." },
    ],
    relatedSlugs: ["discount-calculator", "profit-loss-calculator", "salary-tax-calculator", "currency-converter"],
  },

  "salary-tax-calculator": {
    id: "salary-tax-calculator",
    name: "Nepal Salary & Income Tax Calculator",
    category: "Finance & Money",
    badge: "Nepal IRD",
    seoTitle: "Nepal Salary & Income Tax Calculator (FY 2081/82) | MrFreqline",
    seoDescription: "Calculate monthly take-home salary and income tax (TDS) under latest Nepal Inland Revenue Department (IRD) tax slabs for Individual and Married filers.",
    keywords: ["nepal income tax calculator", "salary tax calculator nepal", "nepal tax slabs 2081", "calculate take home salary nepal", "ssf tax exemption nepal"],
    shortDescription: "Official Nepal Inland Revenue Department (IRD) tax slabs for Individual & Married status.",
    features: [
      "Latest Nepal IRD tax slabs (1%, 10%, 20%, 30%, 36%) for FY 2080/81 - 2081/82",
      "Supports Individual (NPR 500k base) and Married (NPR 600k base) categories",
      "Includes Social Security Fund (SSF) 1% first-slab exemption toggle",
      "Displays monthly TDS deduction, annual tax liability, and net take-home salary",
    ],
    howToSteps: [
      { step: 1, title: "Select Marital Status", desc: "Choose Single / Individual or Married Couple." },
      { step: 2, title: "Enter Monthly Salary", desc: "Type your gross monthly basic salary." },
      { step: 3, title: "Inspect Net Pay", desc: "See your exact monthly tax deduction and net bank deposit amount." },
    ],
    faqs: [
      { question: "What are the income tax slabs in Nepal?", answer: "For individuals: 1st 5 Lakhs (1%), Next 2 Lakhs (10%), Next 3 Lakhs (20%), Next 10 Lakhs (30%), and above 20 Lakhs (36%). If contributing to SSF, the 1% tax on the first slab is waived." },
    ],
    relatedSlugs: ["vat-calculator", "loan-emi-calculator", "savings-goal-calculator", "currency-converter"],
  },

  "savings-goal-calculator": {
    id: "savings-goal-calculator",
    name: "Savings Goal Planner",
    category: "Finance & Money",
    seoTitle: "Savings Goal Calculator - Monthly Deposit & Target Savings | MrFreqline",
    seoDescription: "Determine exactly how much money you need to save each month to purchase a gadget, car, dream vacation, or emergency fund by your target deadline.",
    keywords: ["savings goal calculator", "how much to save each month", "target savings planner", "emergency fund calculator", "budget savings goal online"],
    shortDescription: "Determine exactly how much you need to save each month to buy a bike, gadget, or reach financial milestones.",
    features: [
      "Calculates exact monthly savings requirement to hit target deadline",
      "Visual progress bar showing % of goal already accumulated",
      "Displays remaining balance and timeframe",
      "Intuitive, clean, and instant calculation",
    ],
    howToSteps: [
      { step: 1, title: "Set Target Goal", desc: "Enter the total purchase price or financial goal you want to achieve." },
      { step: 2, title: "Enter Existing Savings", desc: "Input any money already set aside for this goal." },
      { step: 3, title: "Set Deadline", desc: "Specify how many months you have to achieve the goal to see your required monthly deposit." },
    ],
    faqs: [
      { question: "What is the 50/30/20 rule for savings?", answer: "The rule recommends allocating 50% of your net income to Needs (rent, food), 30% to Wants (entertainment), and 20% toward Savings and debt payoff." },
    ],
    relatedSlugs: ["sip-investment-calculator", "simple-compound-interest", "salary-tax-calculator", "loan-emi-calculator"],
  },

  "currency-converter": {
    id: "currency-converter",
    name: "Currency Converter",
    category: "Finance & Money",
    badge: "Exchange",
    seoTitle: "Currency Converter Online - NPR, USD, INR, EUR, GBP Rates | MrFreqline",
    seoDescription: "Convert money between Nepali Rupee (NPR), US Dollar (USD), Indian Rupee (INR), Euro (EUR), British Pound (GBP), and other major global currencies.",
    keywords: ["currency converter", "npr to usd converter", "usd to npr exchange rate", "inr to npr converter", "nepal currency exchange calculator"],
    shortDescription: "Convert between major global and regional currencies including NPR, USD, INR, EUR, and GBP.",
    features: [
      "Converts across NPR, USD, INR, EUR, GBP, AUD, CAD, JPY, and AED",
      "Calculates bidirectional cross-exchange rates instantly",
      "Clean in-browser interface without slow external widget embeds",
      "100% free and mobile-friendly",
    ],
    howToSteps: [
      { step: 1, title: "Enter Amount", desc: "Type the monetary value you wish to convert." },
      { step: 2, title: "Choose Currencies", desc: "Select your source currency and destination currency." },
      { step: 3, title: "View Converted Sum", desc: "Inspect the converted amount and unitary exchange rate." },
    ],
    faqs: [
      { question: "What is the fixed exchange rate between NPR and INR?", answer: "The Nepali Rupee (NPR) is officially pegged to the Indian Rupee (INR) at a fixed rate of 1 INR = 1.60 NPR." },
    ],
    relatedSlugs: ["salary-tax-calculator", "vat-calculator", "discount-calculator", "unit-converter"],
  },

  /* =========================================================================
     HEALTH & FITNESS TOOLS
     ========================================================================= */
  "calorie-bmr-calculator": {
    id: "calorie-bmr-calculator",
    name: "Calorie & BMR Calculator",
    category: "Health & Fitness",
    badge: "Fitness",
    seoTitle: "Calorie & BMR Calculator - Basal Metabolic Rate & TDEE | MrFreqline",
    seoDescription: "Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the scientifically validated Mifflin-St Jeor equation.",
    keywords: ["calorie calculator", "bmr calculator", "tdee calculator", "how many calories do i need a day", "mifflin st jeor calculator online"],
    shortDescription: "Calculate your Basal Metabolic Rate (calories burned at rest) and Total Daily Energy Expenditure (TDEE).",
    features: [
      "Uses the gold-standard Mifflin-St Jeor formula",
      "Calculates BMR (calories burned at complete rest)",
      "Calculates TDEE (maintenance calories) based on activity multipliers",
      "Supports male and female metabolic benchmarks",
    ],
    howToSteps: [
      { step: 1, title: "Enter Vitals", desc: "Input your gender, age, body weight (kg), and height (cm)." },
      { step: 2, title: "Select Activity Level", desc: "Choose your typical weekly physical activity from sedentary to very active." },
      { step: 3, title: "Inspect Calorie Needs", desc: "View your resting BMR and total daily maintenance calories." },
    ],
    faqs: [
      { question: "What is the difference between BMR and TDEE?", answer: "BMR is the baseline energy your body requires simply to keep vital organs functioning at rest. TDEE includes BMR plus the additional calories burned moving, working, and exercising." },
    ],
    relatedSlugs: ["bmi-calculator", "weight-goal-calculator", "water-intake-calculator", "body-fat-calculator"],
  },

  "water-intake-calculator": {
    id: "water-intake-calculator",
    name: "Daily Water Intake Calculator",
    category: "Health & Fitness",
    seoTitle: "Daily Water Intake Calculator - How Much Water Should I Drink? | MrFreqline",
    seoDescription: "Calculate your recommended daily water hydration in liters and glasses based on your body weight, exercise duration, and climate. Stay optimally hydrated.",
    keywords: ["water intake calculator", "how much water should i drink a day", "daily hydration calculator", "water intake by weight", "water glasses per day calculator"],
    shortDescription: "Calculate your optimal daily water hydration based on body weight, exercise duration, and climate.",
    features: [
      "Calculates personalized hydration based on body weight (35ml/kg baseline)",
      "Accounts for exercise sweat loss and hot/humid climate factors",
      "Provides output in both Liters and standard 250ml glasses",
      "Promotes sustained athletic performance and cellular hydration",
    ],
    howToSteps: [
      { step: 1, title: "Enter Body Weight", desc: "Input your weight in kilograms." },
      { step: 2, title: "Set Exercise Time", desc: "Specify your typical daily workout minutes." },
      { step: 3, title: "Choose Climate", desc: "Toggle between normal temperate weather or hot summer conditions." },
    ],
    faqs: [
      { question: "Is the '8 glasses a day' rule accurate for everyone?", answer: "Not necessarily. Hydration needs vary significantly based on body mass, sweat rate, physical activity, and ambient temperature." },
    ],
    relatedSlugs: ["calorie-bmr-calculator", "bmi-calculator", "weight-goal-calculator", "body-fat-calculator"],
  },

  "weight-goal-calculator": {
    id: "weight-goal-calculator",
    name: "Weight Goal Planner",
    category: "Health & Fitness",
    seoTitle: "Weight Goal Planner - Caloric Deficit & Surplus for Weight Loss/Gain | MrFreqline",
    seoDescription: "Calculate the exact daily caloric deficit or surplus needed to safely lose fat or gain muscle weight over your target timeline in weeks.",
    keywords: ["weight goal planner", "calorie deficit calculator", "weight loss calculator weeks", "weight gain calorie surplus", "how long to lose weight calculator"],
    shortDescription: "Calculate the safe caloric deficit or surplus needed to reach your target body weight.",
    features: [
      "Dual planner: Weight Loss (caloric deficit) or Weight Gain (caloric surplus)",
      "Calculates safe weekly rate of weight change (kg/week)",
      "Alerts you if weekly change is too rapid or aggressive",
      "Recommends specific daily target calorie intake",
    ],
    howToSteps: [
      { step: 1, title: "Choose Goal", desc: "Select Weight Loss or Weight Gain." },
      { step: 2, title: "Set Weights & Timeline", desc: "Enter current weight, target weight, and target weeks." },
      { step: 3, title: "Review Calorie Target", desc: "Inspect your required daily calorie intake to hit your goal on schedule." },
    ],
    faqs: [
      { question: "What is considered a safe rate of weight loss?", answer: "A healthy and sustainable rate of fat loss is between 0.5 kg to 1 kg per week (roughly a 500 to 1000 daily calorie deficit)." },
    ],
    relatedSlugs: ["calorie-bmr-calculator", "bmi-calculator", "body-fat-calculator", "water-intake-calculator"],
  },

  "body-fat-calculator": {
    id: "body-fat-calculator",
    name: "Body Fat Percentage Calculator",
    category: "Health & Fitness",
    seoTitle: "Body Fat Percentage Calculator (US Navy Tape Method) | MrFreqline",
    seoDescription: "Estimate your body fat percentage using the US Navy tape measure method with neck, waist, hip, and height measurements. Free and accurate.",
    keywords: ["body fat calculator", "us navy body fat calculator", "calculate body fat percentage online", "tape measure body fat formula", "body fat percentage categories"],
    shortDescription: "Estimate body fat percentage using standard circumference measurements.",
    features: [
      "Calculates body fat % using the US Navy circumference method",
      "Tailored formulas for both male and female physiology",
      "Visual classification category (Athlete, Fitness, Average, Above Average)",
      "Requires only a standard tape measure",
    ],
    howToSteps: [
      { step: 1, title: "Select Gender", desc: "Choose Male or Female." },
      { step: 2, title: "Enter Measurements", desc: "Measure your height, neck, and waist (and hips for females) in centimeters." },
      { step: 3, title: "Inspect Body Fat %", desc: "View your estimated body fat percentage and fitness category." },
    ],
    faqs: [
      { question: "How accurate is the US Navy body fat formula?", answer: "When measured carefully at consistent anatomical landmarks, the US Navy tape method is within 3-4% of DEXA scans, making it one of the most reliable accessible estimation methods." },
    ],
    relatedSlugs: ["bmi-calculator", "calorie-bmr-calculator", "weight-goal-calculator", "water-intake-calculator"],
  },

  /* =========================================================================
     PC & GAMING TOOLS
     ========================================================================= */
  "mouse-sensitivity-converter": {
    id: "mouse-sensitivity-converter",
    name: "Mouse Sensitivity Converter",
    category: "PC & Gaming",
    badge: "Gaming Aim",
    seoTitle: "Gaming Mouse Sensitivity Converter - Valorant, CS2, Apex & Overwatch | MrFreqline",
    seoDescription: "Convert mouse sensitivity between Valorant, CS2, Apex Legends, Overwatch 2, Fortnite, and Call of Duty. Keep identical muscle memory and cm/360 turn distance.",
    keywords: ["mouse sensitivity converter", "valorant to cs2 sensitivity", "cs2 to valorant sens", "apex to valorant sens", "edpi calculator", "cm per 360 calculator"],
    shortDescription: "Transfer your exact aim and muscle memory across competitive shooters with identical cm/360 distance.",
    features: [
      "Supports Valorant, Counter-Strike 2, Apex Legends, Overwatch 2, Fortnite, Rainbow Six Siege, Call of Duty",
      "Calculates true eDPI (Effective DPI)",
      "Preserves exact 360-degree mouse turn distance (cm/360)",
      "Zero mouse aim muscle memory loss between games",
    ],
    howToSteps: [
      { step: 1, title: "Pick Source Game", desc: "Select the game you currently play and enter your in-game sensitivity." },
      { step: 2, title: "Enter DPI", desc: "Type your mouse hardware DPI (e.g., 800 or 1600)." },
      { step: 3, title: "Get Converted Sens", desc: "Select your destination game to see the exact sensitivity setting to copy." },
    ],
    faqs: [
      { question: "What is eDPI?", answer: "eDPI (effective DPI) is your mouse DPI multiplied by your in-game sensitivity. It allows players using different hardware DPIs to compare their true in-game aim speed." },
    ],
    relatedSlugs: ["fps-calculator", "reaction-time-test", "pc-bottleneck", "psu-calculator"],
  },

  "reaction-time-test": {
    id: "reaction-time-test",
    name: "Reaction Time Benchmark",
    category: "PC & Gaming",
    badge: "Reflex",
    seoTitle: "Reaction Time Test Online - Benchmark Visual Reflexes in Milliseconds | MrFreqline",
    seoDescription: "Test your human visual reaction time in milliseconds (ms). Wait for the red screen to turn green and click as fast as possible. Compare against pro gamers.",
    keywords: ["reaction time test", "visual reflex benchmark", "click speed test ms", "human benchmark reaction time", "gaming reflex test online"],
    shortDescription: "Benchmark your visual reflex and click response time in milliseconds.",
    features: [
      "High-precision millisecond timing via `performance.now()`",
      "Randomized delay preventing premature false clicks",
      "Session history with average reflex score computation",
      "Percentile classification (Pro Gamer <200ms, Fast <250ms, Average ~270ms)",
    ],
    howToSteps: [
      { step: 1, title: "Click to Begin", desc: "Click the test panel; the screen turns RED ('Wait for green...')." },
      { step: 2, title: "Wait for Green", desc: "Do not click early. In 1.5 to 4 seconds, the screen turns bright GREEN." },
      { step: 3, title: "Click Instantly", desc: "Click as fast as possible to view your reaction latency in milliseconds." },
    ],
    faqs: [
      { question: "What is the average human reaction time?", answer: "The average human visual reaction time to a visual stimulus is approximately 250 to 275 milliseconds. Elite esports athletes often average 170 to 210 ms." },
    ],
    relatedSlugs: ["mouse-sensitivity-converter", "fps-calculator", "speed-test", "pc-bottleneck"],
  },

  /* =========================================================================
     TIME & DATE TOOLS
     ========================================================================= */
  "stopwatch-countdown": {
    id: "stopwatch-countdown",
    name: "Stopwatch & Countdown Studio",
    category: "Time & Date",
    seoTitle: "Online Stopwatch & Countdown Timer with Laps | MrFreqline",
    seoDescription: "Precision online stopwatch with millisecond lap tracking and customizable countdown timer with audio alerts. 100% free, lightweight in-browser utility.",
    keywords: ["online stopwatch with laps", "countdown timer online", "millisecond stopwatch in browser", "free timer online", "lap split stopwatch"],
    shortDescription: "Precision millisecond stopwatch with lap splits and customizable countdown timers.",
    features: [
      "Precision millisecond (0.01s) stopwatch timer",
      "Lap split recorder with split history log",
      "Quick countdown presets (1m, 3m, 5m, 10m, 15m, 30m)",
      "Clean, modern typography for presentations and workouts",
    ],
    howToSteps: [
      { step: 1, title: "Choose Mode", desc: "Toggle between Stopwatch or Countdown Timer." },
      { step: 2, title: "Start Timing", desc: "Click 'Start' to track elapsed time or begin countdown." },
      { step: 3, title: "Record Laps", desc: "Use the 'Lap Split' button to record intermediate times." },
    ],
    faqs: [
      { question: "Can I use this timer for HIIT or interval workouts?", answer: "Yes! The stopwatch with lap splits is ideal for timing gym sets, sprints, track events, and study sessions." },
    ],
    relatedSlugs: ["pomodoro-timer", "world-clock-converter", "date-difference", "age-calculator"],
  },

  "world-clock-converter": {
    id: "world-clock-converter",
    name: "World Clock & Time Zone Converter",
    category: "Time & Date",
    badge: "Global",
    seoTitle: "World Clock & International Time Zone Converter | MrFreqline",
    seoDescription: "Live synchronised digital clocks across global cities: Kathmandu, New Delhi, London, New York, Tokyo, Sydney, and Dubai. Plan international calls easily.",
    keywords: ["world clock online", "time zone converter", "kathmandu time to est", "current time in new york london tokyo", "international meeting time planner"],
    shortDescription: "Live synchronised digital clocks across global financial and business hubs.",
    features: [
      "Live synchronised local clocks updated every second",
      "Covers major hubs: Kathmandu (NPT), New York (EST), London (GMT), Tokyo (JST), Sydney (AEST), Dubai (GST)",
      "Displays UTC offsets and local day/date",
      "Ideal for remote workers, freelancers, and international teams",
    ],
    howToSteps: [
      { step: 1, title: "View Clocks", desc: "Inspect real-time digital clocks across all major time zones." },
      { step: 2, title: "Check Date & Offset", desc: "See whether target cities are in the previous or next calendar day." },
      { step: 3, title: "Schedule Meetings", desc: "Easily identify overlapping business hours for overseas calls." },
    ],
    faqs: [
      { question: "What is the time difference between Nepal and UTC?", answer: "Nepal Time (NPT) is UTC+5:45, making it one of the few non-hourly time zones in the world." },
    ],
    relatedSlugs: ["date-difference", "stopwatch-countdown", "age-calculator", "bs-ad-converter"],
  },

  /* =========================================================================
     EXTENDED CONVERTERS & UNITS
     ========================================================================= */
  "area-converter": {
    id: "area-converter",
    name: "Area & Land Converter (Nepali & International)",
    category: "Text & Dev",
    badge: "Land Units",
    seoTitle: "Area & Land Converter - Ropani, Bigha, Sq Ft, Acres & Sq Meters | MrFreqline",
    seoDescription: "Convert land and area measurements between International (sq ft, sq meters, acres, hectares) and traditional Nepali land units (Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur).",
    keywords: ["area converter", "ropani to sq ft converter", "bigha to ropani", "nepali land measurement calculator", "aana to square feet", "sq meters to acres"],
    shortDescription: "Convert between International Metric/Imperial units and Traditional Nepali land units (Ropani & Bigha systems).",
    features: [
      "Traditional Nepali Hill units: Ropani, Aana, Paisa, Daam",
      "Traditional Nepali Terai units: Bigha, Kattha, Dhur",
      "International standards: Square Feet, Square Meters, Acres, Hectares",
      "Detailed breakdown of residual Ropani, Aana, Paisa, and Daam components",
    ],
    howToSteps: [
      { step: 1, title: "Enter Quantity", desc: "Input the land area value." },
      { step: 2, title: "Select Units", desc: "Choose your source unit and destination unit." },
      { step: 3, title: "View Exact Conversion", desc: "Inspect the converted value along with full Nepali traditional decomposition." },
    ],
    faqs: [
      { question: "How many square feet are in 1 Ropani?", answer: "1 Ropani equals 5,476 square feet (508.72 square meters), which is divided into 16 Aana." },
      { question: "How many square feet are in 1 Bigha?", answer: "1 Bigha equals 72,900 square feet (6,772.63 square meters), which is divided into 20 Kattha." },
    ],
    relatedSlugs: ["volume-speed-converter", "unit-converter", "percentage-calculator", "profit-loss-calculator"],
  },

  "volume-speed-converter": {
    id: "volume-speed-converter",
    name: "Volume, Speed & Fuel Economy Converter",
    category: "Text & Dev",
    seoTitle: "Volume, Speed & Fuel Economy Converter - km/h, mph, L/100km, MPG | MrFreqline",
    seoDescription: "Convert fluid volume (Liters, Gallons, fl oz), vehicle speed (km/h, mph, m/s, knots), and automotive fuel economy (km/L, L/100km, US MPG).",
    keywords: ["speed converter kmh to mph", "volume converter liters to gallons", "fuel economy converter km/l to mpg", "l per 100km to mpg", "automotive unit converter"],
    shortDescription: "Switch between automotive speeds, fluid volumes, and fuel efficiency units.",
    features: [
      "Speed: Kilometers per hour (km/h), Miles per hour (mph), Meters per second (m/s), Knots",
      "Volume: Liters (L), US Gallons (gal), Milliliters (ml), Fluid Ounces (fl oz)",
      "Fuel Economy: km/L, L/100km, US MPG",
      "Instant real-time multi-unit comparison cards",
    ],
    howToSteps: [
      { step: 1, title: "Select Category", desc: "Choose Speed, Volume, or Fuel Economy." },
      { step: 2, title: "Enter Number", desc: "Type your number and select your source unit." },
      { step: 3, title: "View Equivalents", desc: "Compare equivalent values across all corresponding measurement systems simultaneously." },
    ],
    faqs: [
      { question: "How do you convert km/L to L/100km?", answer: "To convert km per liter to liters per 100 km, divide 100 by the km/L value (e.g. 15 km/L = 100 / 15 = 6.67 L/100km)." },
    ],
    relatedSlugs: ["area-converter", "unit-converter", "percentage-calculator", "speed-test"],
  },

  /* =========================================================================
     ADVANCED TEXT TOOLS
     ========================================================================= */
  "text-cleaner-tools": {
    id: "text-cleaner-tools",
    name: "Text Deduplicator & Sorter",
    category: "Text & Dev",
    seoTitle: "Text Deduplicator & Sorter - Remove Duplicate Lines & Sort Online | MrFreqline",
    seoDescription: "Clean up lists and text files: remove duplicate lines, sort alphabetically (A-Z, Z-A), reverse text and lines, and perform bulk find and replace online.",
    keywords: ["remove duplicate lines", "text sorter online", "sort lines alphabetically", "reverse text online", "find and replace text free", "clean text lists online"],
    shortDescription: "Remove duplicate lines, sort alphabetically, reverse text, and perform quick find & replace.",
    features: [
      "One-click duplicate line removal for lists, emails, and data sets",
      "Alphabetical sorting (A to Z and Z to A)",
      "Reverses characters or line ordering",
      "Built-in Find & Replace with one-click replace all",
    ],
    howToSteps: [
      { step: 1, title: "Paste Text", desc: "Paste your raw list or text into the editor." },
      { step: 2, title: "Click Action", desc: "Click 'Remove Duplicate Lines', 'Sort A-Z', or 'Reverse'." },
      { step: 3, title: "Copy Cleaned Text", desc: "Copy your deduplicated, sorted list with one click." },
    ],
    faqs: [
      { question: "Are my private text lists uploaded to a server?", answer: "No! All text cleaning, deduplication, and sorting takes place 100% inside your browser memory. Nothing is ever logged or transmitted." },
    ],
    relatedSlugs: ["word-counter", "case-converter", "markdown-preview", "preeti-unicode"],
  },

  /* =========================================================================
     EXISTING 36 TOOLS (PRESERVED & CATEGORIZED)
     ========================================================================= */
  "preeti-unicode": {
    id: "preeti-unicode",
    name: "Preeti ↔ Unicode Converter",
    category: "Text & Dev",
    badge: "Nepali",
    seoTitle: "Preeti to Unicode Converter - Fast & Accurate Nepali Font Typing Tool | MrFreqline",
    seoDescription: "Convert traditional Nepali Preeti font typing to Unicode and vice versa in real time. Fast, accurate ligature handling, 100% free with one-click copy.",
    keywords: ["preeti to unicode", "unicode to preeti", "nepali font converter", "preeti converter online", "nepali unicode typing", "traditional nepali font to unicode"],
    shortDescription: "Convert traditional Nepali Preeti font typing to modern Unicode and vice versa in real time.",
    features: [
      "Bidirectional conversion (Preeti to Unicode & Unicode to Preeti)",
      "Accurate ligature handling (tra, shra, ksha, halanta, and short 'i' matra reordering)",
      "One-click copy to clipboard and quick clear",
      "100% client-side: typing remains completely private in your browser",
    ],
    howToSteps: [
      { step: 1, title: "Choose Direction", desc: "Select either Preeti ➔ Unicode or Unicode ➔ Preeti using the toggle." },
      { step: 2, title: "Type or Paste Text", desc: "Enter your Nepali text into the input box; conversion occurs instantly in real time." },
      { step: 3, title: "Copy Result", desc: "Click the 'Copy Output' button to copy converted text ready for web, Word, or social media." },
    ],
    faqs: [
      { question: "Why do I need to convert Preeti to Unicode?", answer: "Preeti is a legacy font encoding that requires viewers to have the Preeti font installed. Unicode works natively across all modern devices, smartphones, search engines, and social media without special fonts." },
      { question: "Is my typed text saved or sent to any server?", answer: "No. All text processing is executed 100% locally in your browser memory using JavaScript. Nothing is sent to any server." },
    ],
    relatedSlugs: ["word-counter", "case-converter", "bs-ad-converter", "text-cleaner-tools"],
  },

  "file-hash": {
    id: "file-hash",
    name: "File Hash & Checksum Checker",
    category: "Security & Privacy",
    badge: "Verification",
    seoTitle: "File Hash & Checksum Checker - Free Online SHA-256, SHA-1, SHA-512 Verifier | MrFreqline",
    seoDescription: "Verify file integrity in your browser with SHA-256, SHA-1, and SHA-512 checksums. Compare hashes to ensure files are unaltered and safe. 100% private.",
    keywords: ["file hash checker", "checksum verifier online", "sha256 file checker", "sha1 checksum", "sha512 generator", "verify file integrity online"],
    shortDescription: "Verify integrity of any local file. Compute SHA-256, SHA-1, SHA-512 and compare expected checksums.",
    features: [
      "Computes SHA-256, SHA-1, and SHA-512 cryptographic hashes simultaneously",
      "Instant checksum comparison with visual Pass/Fail verification",
      "Zero server upload: hashes are computed directly via Web Crypto API in your browser",
      "Supports large files (ISOs, zip archives, documents, software installers)",
    ],
    howToSteps: [
      { step: 1, title: "Select or Drop File", desc: "Drag and drop any file into the hash verifier or click to select from your drive." },
      { step: 2, title: "Inspect Hashes", desc: "View automatically generated SHA-256, SHA-1, and SHA-512 checksum strings." },
      { step: 3, title: "Compare Hash (Optional)", desc: "Paste the author's published checksum into the comparator to verify integrity." },
    ],
    faqs: [
      { question: "Are my files uploaded to the internet?", answer: "Never. The File Hash Checker utilizes the native browser Web Crypto API. The file is read chunk-by-chunk in local browser memory and never leaves your computer." },
    ],
    relatedSlugs: ["hash-generator", "password-gen", "base64", "speed-test"],
  },

  "speed-test": {
    id: "speed-test",
    name: "Internet Speed Test",
    category: "PC & Gaming",
    badge: "Live Network",
    seoTitle: "Free Internet Speed Test - Check Download Speed, Ping Latency & Jitter | MrFreqline",
    seoDescription: "Test your live internet connection speed directly in your browser. Measure download throughput in Mbps, ping latency, and connection jitter with zero ads.",
    keywords: ["internet speed test", "check wifi speed online", "download speed test mbps", "ping test latency", "jitter test online"],
    shortDescription: "Test your live internet download throughput, latency ping, and jitter directly in the browser.",
    features: [
      "Multi-chunk download throughput testing in real time (Mbps)",
      "High-precision ping latency (ms) and connection jitter evaluation",
      "Ad-free, lightweight, and responsive interface",
      "Works on desktop, laptops, tablets, and mobile devices",
    ],
    howToSteps: [
      { step: 1, title: "Start Test", desc: "Click the 'Run Speed Test' button to begin testing." },
      { step: 2, title: "Monitor Telemetry", desc: "Watch live ping latency and multi-stream download throughput measurements." },
      { step: 3, title: "Review Benchmark", desc: "Check your final download rate (Mbps), average ping (ms), and connection stability." },
    ],
    faqs: [
      { question: "How does this speed test measure throughput?", answer: "It downloads sample binary chunks over HTTPS from high-performance global CDN edge nodes and computes real-time transfer rates over elapsed time." },
    ],
    relatedSlugs: ["network-tool", "pc-bottleneck", "psu-calculator", "reaction-time-test"],
  },

  "pc-bottleneck": {
    id: "pc-bottleneck",
    name: "PC Bottleneck Calculator",
    category: "PC & Gaming",
    badge: "Hardware",
    seoTitle: "PC Bottleneck Calculator (2026) - CPU & GPU Balance Checker | MrFreqline",
    seoDescription: "Calculate hardware bottleneck percentage between your CPU, GPU, and display resolution. Detect CPU vs GPU bound limits and get tailored upgrade advice.",
    keywords: ["pc bottleneck calculator", "cpu gpu bottleneck test", "pc build bottleneck checker", "gpu bottleneck calculator"],
    shortDescription: "Calculate hardware bottleneck percentage between CPU, GPU, and display resolution with diagnostics.",
    features: [
      "Extensive hardware database featuring Intel 12th-14th Gen, AMD Ryzen 5000-9000, NVIDIA RTX 30/40, and AMD Radeon RX 6000/7000",
      "Evaluates performance across 1080p, 1440p (2K), and 4K (2160p) display resolutions",
      "Pinpoints whether your system is CPU-bound, GPU-bound, or balanced",
      "Actionable upgrade and optimization recommendations",
    ],
    howToSteps: [
      { step: 1, title: "Select Processor", desc: "Choose your Intel Core or AMD Ryzen CPU model from the dropdown." },
      { step: 2, title: "Select Graphics Card", desc: "Choose your NVIDIA GeForce or AMD Radeon GPU model." },
      { step: 3, title: "Pick Screen Resolution", desc: "Select 1080p, 1440p, or 4K to calculate real-time bottleneck percentage." },
    ],
    faqs: [
      { question: "What is an acceptable PC bottleneck percentage?", answer: "A bottleneck percentage below 10% to 15% is considered well-balanced and indicates your CPU and GPU work together efficiently." },
    ],
    relatedSlugs: ["fps-calculator", "psu-calculator", "mouse-sensitivity-converter", "speed-test"],
  },

  "psu-calculator": {
    id: "psu-calculator",
    name: "PSU Power Calculator",
    category: "PC & Gaming",
    badge: "PC Builder",
    seoTitle: "PC PSU Power Supply Calculator - Estimate Total System Wattage | MrFreqline",
    seoDescription: "Calculate peak wattage requirements and recommended power supply capacity for your PC build. Accurate CPU and GPU TDP calculation with safety headroom.",
    keywords: ["psu calculator", "power supply calculator", "pc wattage calculator", "how many watts psu do i need"],
    shortDescription: "Calculate peak wattage requirements and recommended power supply capacity for your PC build.",
    features: [
      "Calculates real-time system wattage based on CPU TDP, GPU TDP, RAM, and drives",
      "Includes 25% safety overhead buffer to prevent power trip shutdowns",
      "Recommends optimal 80 Plus power efficiency tiers (Bronze, Gold, Platinum)",
      "Supports latest high-demand NVIDIA RTX 40 series and Intel/AMD processors",
    ],
    howToSteps: [
      { step: 1, title: "Select Components", desc: "Pick your CPU and graphics card models to load accurate manufacturer TDPs." },
      { step: 2, title: "Configure Storage & RAM", desc: "Select your number of RAM sticks, NVMe SSDs, and SATA hard drives." },
      { step: 3, title: "Review Recommended PSU", desc: "Get calculated peak load wattage and recommended PSU wattage rating." },
    ],
    faqs: [
      { question: "Why is the recommended PSU wattage higher than estimated load?", answer: "Power supplies operate most efficiently between 50% and 80% load. Adding a 20-30% headroom prevents thermal throttling and handles GPU transient spikes." },
    ],
    relatedSlugs: ["pc-bottleneck", "fps-calculator", "speed-test", "reaction-time-test"],
  },

  "fps-calculator": {
    id: "fps-calculator",
    name: "FPS Estimator",
    category: "PC & Gaming",
    badge: "Benchmarking",
    seoTitle: "FPS Calculator & Estimator - Game Performance Benchmark | MrFreqline",
    seoDescription: "Estimate gaming FPS for top games like Cyberpunk 2077, Valorant, GTA V, and CS2. Check expected frames across Low, Medium, High, and Ultra presets.",
    keywords: ["fps calculator", "fps estimator", "game performance calculator", "can i run it fps", "gaming pc fps test"],
    shortDescription: "Estimate in-game average frames per second across Low, Med, High, and Ultra presets for top titles.",
    features: [
      "Estimates average FPS across Low, Medium, High, and Ultra graphics presets",
      "Covers popular games: Cyberpunk 2077, Valorant, GTA V, CS2, Fortnite, Warzone",
      "Considers CPU, GPU, and display resolution interplay",
      "Provides intuitive performance classification (Competitive, Ultra Smooth, Playable)",
    ],
    howToSteps: [
      { step: 1, title: "Choose Your Game", desc: "Pick the title you want to benchmark from the game list." },
      { step: 2, title: "Set Hardware & Resolution", desc: "Select your CPU, GPU, and target display resolution." },
      { step: 3, title: "View FPS Forecast", desc: "Inspect estimated average frames per second across all 4 visual quality presets." },
    ],
    faqs: [
      { question: "How accurate are these FPS estimates?", answer: "Estimates are calculated using real-world benchmark metrics, relative GPU compute TFLOPs, and architectural game engine scalers." },
    ],
    relatedSlugs: ["pc-bottleneck", "psu-calculator", "mouse-sensitivity-converter", "reaction-time-test"],
  },

  "network-tool": {
    id: "network-tool",
    name: "IP & Network Inspector",
    category: "PC & Gaming",
    badge: "Network",
    seoTitle: "IP & Network Inspector - Check Public IP, ISP, Location & DNS Latency | MrFreqline",
    seoDescription: "Discover your public IPv4 address, ISP, city, country, timezone, and test live DNS ping latency directly in your browser. Clean and privacy-first.",
    keywords: ["what is my ip", "ip address lookup", "check my isp online", "dns ping test", "public ip checker"],
    shortDescription: "Detect public IP, ISP details, connection protocol, and test live DNS ping latency.",
    features: [
      "Instant detection of public IPv4 address and ISP organization",
      "Geographical location breakdown (City, Region, Country, Timezone)",
      "Live DNS round-trip ping latency test",
      "WebRTC local network IP candidate inspection",
    ],
    howToSteps: [
      { step: 1, title: "Open Inspector", desc: "Navigate to the tool; your network details are resolved automatically." },
      { step: 2, title: "Test DNS Latency", desc: "Click 'Test Latency' to ping major public DNS providers." },
      { step: 3, title: "Copy IP Details", desc: "Use the one-click copy button to copy your public IP address." },
    ],
    faqs: [
      { question: "Does this tool expose my exact home address?", answer: "No. IP geolocation only identifies the city/region of your ISP's routing facility or node, not your personal physical residence." },
    ],
    relatedSlugs: ["speed-test", "file-hash", "password-gen", "base64"],
  },

  "ai-prompt-gen": {
    id: "ai-prompt-gen",
    name: "AI Prompt Architect",
    category: "Text & Dev",
    badge: "AI Tools",
    seoTitle: "AI Prompt Architect - Structured Prompt Generator for ChatGPT & Claude | MrFreqline",
    seoDescription: "Generate structured, high-performing AI prompts with roles, tones, target tasks, and format constraints. Ideal for ChatGPT, Claude, Gemini, and DeepSeek.",
    keywords: ["ai prompt generator", "chatgpt prompt creator", "claude prompt architect", "prompt engineering tool"],
    shortDescription: "Generate structured, high-converting prompts with roles, context, and constraints for ChatGPT & Claude.",
    features: [
      "Configurable role/persona, tone of voice, objective task, and output formatting",
      "Built-in negative constraints to prevent common AI hallucinations",
      "Formatted for immediate copy-paste into ChatGPT, Claude 3.5, Gemini, or DeepSeek",
      "100% free and client-side prompt synthesis",
    ],
    howToSteps: [
      { step: 1, title: "Define Role & Tone", desc: "Select the AI persona and tone." },
      { step: 2, title: "Specify Task & Constraints", desc: "Enter your core objective and formatting requirements." },
      { step: 3, title: "Copy Master Prompt", desc: "Click 'Copy Master Prompt' and paste directly into your chosen AI chat assistant." },
    ],
    faqs: [
      { question: "Why are structured prompts better than simple questions?", answer: "Structured prompts provide explicit context, constraints, and formatting guidelines, significantly reducing hallucinations." },
    ],
    relatedSlugs: ["word-counter", "markdown-preview", "preeti-unicode", "json-formatter"],
  },

  "yt-thumbnail": {
    id: "yt-thumbnail",
    name: "YouTube Thumbnail Grabber",
    category: "PDF & Media",
    badge: "Media",
    seoTitle: "YouTube Thumbnail Grabber - Download HD (1080p, 720p) Thumbnails Free | MrFreqline",
    seoDescription: "Download high-resolution YouTube video thumbnails in 1080p (MaxRes), 720p, and 480p. Works with regular YouTube URLs and YouTube Shorts with one click.",
    keywords: ["youtube thumbnail grabber", "download youtube thumbnail", "youtube thumbnail downloader hd", "get 1080p youtube thumbnail"],
    shortDescription: "Extract and download high-resolution HD (1080p, 720p, 480p) thumbnails from any YouTube video URL.",
    features: [
      "Instant extraction of MaxRes (1080p), High (720p), Medium (480p), and Standard thumbnails",
      "Supports standard links, short URLs (`youtu.be`), and YouTube Shorts (`/shorts/`)",
      "Direct one-click image download buttons",
      "No watermarks, no registration, 100% free",
    ],
    howToSteps: [
      { step: 1, title: "Paste Video Link", desc: "Paste any YouTube video or Shorts link into the URL input field." },
      { step: 2, title: "Preview Resolutions", desc: "View loaded thumbnails in Full HD, HD, and standard resolutions." },
      { step: 3, title: "Download Image", desc: "Click 'Download 1080p' or 'Download 720p' to save the thumbnail image." },
    ],
    faqs: [
      { question: "Can I download thumbnails from YouTube Shorts?", answer: "Yes. Simply paste the YouTube Shorts URL and the tool will extract the official video ID and thumbnail artwork." },
    ],
    relatedSlugs: ["image-compress", "image-converter", "pdf-to-image", "ai-prompt-gen"],
  },

  "age-calculator": {
    id: "age-calculator",
    name: "Age Calculator",
    category: "Time & Date",
    badge: "AD & BS",
    seoTitle: "Age Calculator - Exact Chronological Age in Years, Months & Days | MrFreqline",
    seoDescription: "Calculate your exact age in years, months, days, total weeks, and days until your next birthday. Supports both English (AD) and Nepali (Bikram Sambat BS) calendars.",
    keywords: ["age calculator", "calculate age online", "exact age in days", "age calculator ad bs", "nepali age calculator"],
    shortDescription: "Calculate exact age with both English (AD) and Nepali (BS) calendar systems. Type dates directly.",
    features: [
      "Dual calendar support: Gregorian (AD) and Nepali Bikram Sambat (BS)",
      "Granular breakdown: Years, months, days, total hours, weeks, and days lived",
      "Days remaining until your next birthday celebration",
      "Direct keyboard typing or interactive date pickers",
    ],
    howToSteps: [
      { step: 1, title: "Select Calendar", desc: "Choose Gregorian (AD) or Bikram Sambat (BS)." },
      { step: 2, title: "Enter Date of Birth", desc: "Type your birth year, month, and day." },
      { step: 3, title: "View Age Statistics", desc: "Instantly see your exact age breakdown and next birthday countdown." },
    ],
    faqs: [
      { question: "Does this handle leap years accurately?", answer: "Yes. Both Gregorian leap years and variable Nepali calendar month day allocations are calculated with high precision." },
    ],
    relatedSlugs: ["date-difference", "bs-ad-converter", "bmi-calculator", "world-clock-converter"],
  },

  "date-difference": {
    id: "date-difference",
    name: "Date Difference",
    category: "Time & Date",
    badge: "AD & BS",
    seoTitle: "Date Difference Calculator - Days Between Dates & Working Days | MrFreqline",
    seoDescription: "Calculate the exact number of days, weeks, months, and working business days between two dates. Works with both AD and BS calendars in your browser.",
    keywords: ["date difference calculator", "days between two dates", "duration calculator", "business days between dates"],
    shortDescription: "Calculate duration, total days, weeks, and working business days in AD or BS.",
    features: [
      "Calculates total calendar days, elapsed weeks, and months between two dates",
      "Computes working business days excluding Saturdays and Sundays",
      "Supports both AD (Gregorian) and BS (Bikram Sambat) calendar formats",
      "Real-time instant calculation with zero page reload",
    ],
    howToSteps: [
      { step: 1, title: "Select Start Date", desc: "Enter or select the beginning date." },
      { step: 2, title: "Select End Date", desc: "Enter or select the destination date." },
      { step: 3, title: "Review Duration", desc: "See total days, business days, and time breakdown." },
    ],
    faqs: [
      { question: "Can I calculate future dates?", answer: "Yes, you can calculate the exact days remaining until future milestones or project deadlines." },
    ],
    relatedSlugs: ["age-calculator", "bs-ad-converter", "stopwatch-countdown", "world-clock-converter"],
  },

  "bs-ad-converter": {
    id: "bs-ad-converter",
    name: "BS ↔ AD Date Converter",
    category: "Time & Date",
    badge: "Popular",
    seoTitle: "BS to AD Converter - Bikram Sambat to English Date Conversion | MrFreqline",
    seoDescription: "Convert dates between Bikram Sambat (BS - Nepali Patro) and Gregorian (AD - English Calendar) instantly. Accurate conversion covering 1970 BS to 2100 BS.",
    keywords: ["bs to ad converter", "ad to bs converter", "nepali date converter", "bikram sambat to gregorian", "miti converter"],
    shortDescription: "Convert dates between Bikram Sambat (BS) and Gregorian (AD) calendars instantly.",
    features: [
      "Bidirectional conversion: BS to AD and AD to BS",
      "Accurate historical Nepali calendar lookup mapping",
      "Shows day of the week and Nepali month details (Baisakh, Jestha, etc.)",
      "Fast, lightweight, and 100% private",
    ],
    howToSteps: [
      { step: 1, title: "Choose Conversion Direction", desc: "Select BS ➔ AD or AD ➔ BS." },
      { step: 2, title: "Enter Year, Month, Day", desc: "Select or type the date you want to convert." },
      { step: 3, title: "Copy Converted Date", desc: "View the equivalent date in the target calendar and copy with one click." },
    ],
    faqs: [
      { question: "Why is the Bikram Sambat calendar ~57 years ahead of AD?", answer: "The Bikram Sambat calendar is an ancient Hindu solar calendar initiated by King Vikramaditya in 57 BCE, making it approximately 56.7 years ahead of the Gregorian calendar." },
    ],
    relatedSlugs: ["age-calculator", "date-difference", "preeti-unicode", "world-clock-converter"],
  },

  "bmi-calculator": {
    id: "bmi-calculator",
    name: "BMI Calculator",
    category: "Health & Fitness",
    seoTitle: "Free BMI Calculator - Body Mass Index & Healthy Weight Range | MrFreqline",
    seoDescription: "Calculate your Body Mass Index (BMI) using metric (cm/kg) or imperial (ft/lbs) units. View WHO weight classifications and ideal healthy weight ranges.",
    keywords: ["bmi calculator", "body mass index calculator", "calculate bmi online", "healthy weight calculator"],
    shortDescription: "Body Mass Index calculator with metric and imperial units, health ranges, and ideal weight.",
    features: [
      "Supports Metric (centimeters / kilograms) and Imperial (feet, inches / pounds)",
      "Instant WHO category classification (Underweight, Normal, Overweight, Obese)",
      "Calculates ideal healthy weight range based on height",
      "Visual color-coded scale indicator",
    ],
    howToSteps: [
      { step: 1, title: "Select Measurement System", desc: "Toggle between Metric (cm/kg) or Imperial (ft/lbs)." },
      { step: 2, title: "Enter Height & Weight", desc: "Input your height and current body weight." },
      { step: 3, title: "View BMI Classification", desc: "Review your calculated BMI number, category, and healthy target range." },
    ],
    faqs: [
      { question: "What is a healthy BMI range?", answer: "According to the World Health Organization (WHO), a normal and healthy BMI for adults falls between 18.5 and 24.9." },
    ],
    relatedSlugs: ["calorie-bmr-calculator", "water-intake-calculator", "weight-goal-calculator", "body-fat-calculator"],
  },

  "percentage-calculator": {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Academic & Education",
    seoTitle: "Free Percentage Calculator - Calculate Percentages & Changes Online | MrFreqline",
    seoDescription: "Calculate percentages easily: find X% of Y, percentage increase/decrease between two values, and ratios. Instant real-time math calculations.",
    keywords: ["percentage calculator", "calculate percent online", "percentage increase calculator", "what is x percent of y"],
    shortDescription: "Calculate percent values, percentage increase/decrease, and ratios in real time.",
    features: [
      "Calculate 'What is X% of Y?' instantly",
      "Calculate percentage increase or decrease between two values",
      "Calculate 'X is what percent of Y?'",
      "Shows step-by-step mathematical formulas",
    ],
    howToSteps: [
      { step: 1, title: "Choose Calculation Mode", desc: "Select standard percentage, percentage change, or percentage proportion." },
      { step: 2, title: "Enter Values", desc: "Input your numbers into the designated fields." },
      { step: 3, title: "Inspect Result", desc: "View the calculated percentage along with the formula used." },
    ],
    faqs: [
      { question: "How do you calculate percentage increase?", answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100: ((New - Old) / Old) * 100." },
    ],
    relatedSlugs: ["marks-gpa-converter", "target-marks-calculator", "discount-calculator", "profit-loss-calculator"],
  },

  "pdf-merge": {
    id: "pdf-merge",
    name: "PDF Merge",
    category: "PDF & Media",
    badge: "Popular",
    seoTitle: "Free PDF Merge Online - Combine Multiple PDF Files Privately | MrFreqline",
    seoDescription: "Combine multiple PDF files into a single organized document online. 100% free, client-side in-browser processing with zero file uploads to external servers.",
    keywords: ["merge pdf online", "combine pdf files", "pdf joiner free", "merge pdf without upload", "private pdf merge"],
    shortDescription: "Combine multiple PDF documents into a single organized file.",
    features: [
      "Merge unlimited PDF documents into one single file",
      "Reorder, sort, and remove files before combining",
      "100% private: uses pdf-lib client-side in browser memory; files never leave your computer",
      "Instant processing and immediate download",
    ],
    howToSteps: [
      { step: 1, title: "Select PDF Files", desc: "Click to upload or drag and drop two or more PDF files." },
      { step: 2, title: "Arrange Order", desc: "Reorder files to your desired reading sequence." },
      { step: 3, title: "Merge & Download", desc: "Click 'Merge PDFs' to compile and download your combined PDF instantly." },
    ],
    faqs: [
      { question: "Are my confidential PDF documents uploaded to your servers?", answer: "No! All PDF merging operations run entirely client-side within your browser using WebAssembly and pdf-lib. Your files never touch our servers." },
    ],
    relatedSlugs: ["pdf-split", "pdf-compress", "image-to-pdf", "pdf-to-image"],
  },

  "pdf-split": {
    id: "pdf-split",
    name: "PDF Split",
    category: "PDF & Media",
    seoTitle: "Free PDF Split Online - Extract Pages from PDF Documents | MrFreqline",
    seoDescription: "Extract specific pages or page ranges from any PDF document. Free, in-browser client-side PDF splitter with zero privacy compromises.",
    keywords: ["split pdf online", "extract pages from pdf", "pdf separator free", "separate pdf pages online"],
    shortDescription: "Extract specific pages or page ranges (e.g. 1-3, 5) into new PDFs.",
    features: [
      "Extract single pages, multiple pages, or custom page ranges (e.g. 1-4, 7, 9-12)",
      "Live page count detection and validation",
      "100% client-side privacy: processed locally in your browser memory",
      "Clean instant PDF download",
    ],
    howToSteps: [
      { step: 1, title: "Upload PDF", desc: "Select or drag the PDF file you want to split." },
      { step: 2, title: "Specify Page Range", desc: "Enter the pages you need (e.g., '1-3, 5, 8')." },
      { step: 3, title: "Extract & Save", desc: "Click 'Split PDF' to download your extracted document." },
    ],
    faqs: [
      { question: "How do I specify multiple pages to split?", answer: "You can use commas and hyphens. For example, typing '1-5, 8' extracts pages 1, 2, 3, 4, 5, and 8 into a new PDF." },
    ],
    relatedSlugs: ["pdf-merge", "pdf-compress", "pdf-to-image", "image-to-pdf"],
  },

  "pdf-compress": {
    id: "pdf-compress",
    name: "PDF Compressor",
    category: "PDF & Media",
    seoTitle: "Free PDF Compressor Online - Reduce PDF File Size Privately | MrFreqline",
    seoDescription: "Compress and reduce the file size of PDF documents in your browser. Streamline objects and deduplicate internal resources with 100% privacy.",
    keywords: ["compress pdf online", "reduce pdf file size", "shrink pdf free", "compress pdf without upload"],
    shortDescription: "Optimize PDF structure and deduplicate internal streams to reduce file size.",
    features: [
      "Reduces PDF file size by stripping redundant structures and optimizing object streams",
      "Zero cloud upload: processed locally using modern browser memory",
      "Displays before and after file size comparison",
      "Immediate one-click download",
    ],
    howToSteps: [
      { step: 1, title: "Select PDF", desc: "Upload the PDF document you want to optimize." },
      { step: 2, title: "Optimize", desc: "Click 'Compress PDF' to rebuild and optimize internal streams." },
      { step: 3, title: "Download", desc: "Check your saved file size percentage and download the optimized PDF." },
    ],
    faqs: [
      { question: "Will compressing my PDF degrade its text quality?", answer: "No. Structural optimization preserves crisp text and vector elements while stripping unused metadata and duplicate streams." },
    ],
    relatedSlugs: ["pdf-merge", "pdf-split", "image-compress", "image-to-pdf"],
  },

  "pdf-to-image": {
    id: "pdf-to-image",
    name: "PDF ➔ Image",
    category: "PDF & Media",
    seoTitle: "Convert PDF to Image Online - PDF to JPG & PNG Converter | MrFreqline",
    seoDescription: "Convert PDF pages into high-resolution JPG or PNG images directly in your browser. Free, fast, and completely confidential with zero server uploads.",
    keywords: ["pdf to image", "convert pdf to png", "pdf to jpg online free", "extract images from pdf"],
    shortDescription: "Convert PDF pages into high-resolution PNG or JPG image files.",
    features: [
      "Convert PDF pages into high-resolution PNG or JPEG images",
      "Choose to convert page 1 or all individual pages",
      "Rendered locally in your browser using HTML5 Canvas",
      "Direct one-click image download",
    ],
    howToSteps: [
      { step: 1, title: "Choose PDF Document", desc: "Drop or select your PDF file." },
      { step: 2, title: "Select Output Format", desc: "Choose between PNG (lossless) or JPG (compact)." },
      { step: 3, title: "Convert & Download", desc: "Download high-quality rendered images immediately." },
    ],
    faqs: [
      { question: "Is PNG or JPG better for PDF conversion?", answer: "PNG is recommended for text-heavy documents to ensure razor-sharp typography. JPG is ideal for photo-heavy brochures to keep file sizes smaller." },
    ],
    relatedSlugs: ["image-to-pdf", "pdf-merge", "image-converter", "image-compress"],
  },

  "image-to-pdf": {
    id: "image-to-pdf",
    name: "Image ➔ PDF",
    category: "PDF & Media",
    seoTitle: "Convert Image to PDF Online - JPG, PNG & WebP to PDF | MrFreqline",
    seoDescription: "Convert images into a formatted PDF document. Combine multiple JPG, PNG, and WebP pictures into a single organized PDF. 100% client-side.",
    keywords: ["image to pdf", "jpg to pdf converter", "png to pdf free", "combine images into pdf"],
    shortDescription: "Compile multiple JPG and PNG images into a clean paginated PDF document.",
    features: [
      "Compile single or multiple JPG, PNG, and WebP images into a single PDF",
      "Maintains natural aspect ratio with clean standard page margins",
      "Processed locally without sending images across the internet",
      "Instant generation and download",
    ],
    howToSteps: [
      { step: 1, title: "Upload Images", desc: "Select one or multiple images from your computer or phone." },
      { step: 2, title: "Arrange", desc: "Review the selected images." },
      { step: 3, title: "Convert to PDF", desc: "Click 'Generate PDF' and download your new multi-page document." },
    ],
    faqs: [
      { question: "Can I combine both JPG and PNG images together in one PDF?", answer: "Yes. The converter accepts mixed image formats and scales each onto clean PDF pages." },
    ],
    relatedSlugs: ["pdf-to-image", "pdf-merge", "image-compress", "image-converter"],
  },

  "text-to-pdf": {
    id: "text-to-pdf",
    name: "Text ➔ PDF",
    category: "PDF & Media",
    seoTitle: "Text to PDF Converter - Convert Plain Text & Notes to PDF | MrFreqline",
    seoDescription: "Convert plain text, code, or meeting notes into a clean, formatted A4 PDF document online. Free, fast, client-side, and ready to print.",
    keywords: ["text to pdf", "convert text to pdf online", "txt to pdf converter", "create pdf from text"],
    shortDescription: "Convert plain text notes or code into formatted A4 PDF documents.",
    features: [
      "Instant transformation of raw text or notes into formatted A4 PDFs",
      "Automatic line wrapping and pagination handling",
      "Ideal for printing notes, documentation, and receipts",
      "100% private and generated directly in your browser",
    ],
    howToSteps: [
      { step: 1, title: "Type or Paste Text", desc: "Paste your text or notes into the editor." },
      { step: 2, title: "Set Document Title", desc: "Optionally add a header title for the generated PDF." },
      { step: 3, title: "Generate PDF", desc: "Click 'Export to PDF' to download your document." },
    ],
    faqs: [
      { question: "Does Text to PDF support long documents?", answer: "Yes, text is automatically formatted and split across multiple pages as needed." },
    ],
    relatedSlugs: ["markdown-preview", "pdf-merge", "word-counter", "json-formatter"],
  },

  "image-compress": {
    id: "image-compress",
    name: "Image Compressor",
    category: "PDF & Media",
    badge: "Popular",
    seoTitle: "Free Image Compressor Online - Compress JPG, PNG & WebP | MrFreqline",
    seoDescription: "Compress images online without losing visible quality. Reduce JPG, PNG, and WebP file sizes directly in your browser with adjustable compression sliders.",
    keywords: ["image compressor online", "compress jpg free", "compress png online", "reduce image size", "shrink image kb"],
    shortDescription: "Compress JPG, PNG & WebP images with adjustable quality slider and size stats.",
    features: [
      "Adjustable compression quality slider (10% to 100%)",
      "Real-time original vs. compressed file size comparison with % savings",
      "Supports JPG, PNG, and WebP formats",
      "Zero server uploads: compression runs in browser memory using HTML5 Canvas",
    ],
    howToSteps: [
      { step: 1, title: "Select Image", desc: "Drop or select any JPG, PNG, or WebP picture." },
      { step: 2, title: "Adjust Quality", desc: "Slide the quality control to achieve your desired balance of size and fidelity." },
      { step: 3, title: "Download Compressed Image", desc: "Click download to save your lightweight image." },
    ],
    faqs: [
      { question: "How much file size can I save with image compression?", answer: "Typical savings range from 50% to 85% with virtually zero perceptible loss in visual quality." },
    ],
    relatedSlugs: ["image-converter", "pdf-compress", "yt-thumbnail", "pdf-to-image"],
  },

  "image-converter": {
    id: "image-converter",
    name: "JPG ↔ PNG Converter",
    category: "PDF & Media",
    seoTitle: "Free Image Converter Online - Convert JPG, PNG & WebP | MrFreqline",
    seoDescription: "Convert images between JPG, PNG, and WebP formats instantly in your browser. Fast, free, client-side conversion with zero image uploads.",
    keywords: ["jpg to png converter", "png to jpg online", "convert image to webp", "image format converter free"],
    shortDescription: "Convert images between JPG, PNG, and WebP formats instantly in your browser.",
    features: [
      "Convert between JPG, PNG, and WebP formats with one click",
      "Maintains crisp resolution and color fidelity",
      "100% private: all rendering is executed locally via browser canvas",
      "Direct instant download without waiting in server queues",
    ],
    howToSteps: [
      { step: 1, title: "Upload Image", desc: "Select the image you wish to convert." },
      { step: 2, title: "Choose Target Format", desc: "Select JPG, PNG, or modern WebP." },
      { step: 3, title: "Convert & Save", desc: "Click 'Convert & Download' to obtain your converted file." },
    ],
    faqs: [
      { question: "Why convert PNG to WebP or JPG?", answer: "WebP provides superior compression, reducing file sizes by up to 30% compared to JPG and PNG while maintaining transparency support." },
    ],
    relatedSlugs: ["image-compress", "pdf-to-image", "image-to-pdf", "yt-thumbnail"],
  },

  "password-gen": {
    id: "password-gen",
    name: "Password Studio & Fortifier",
    category: "Security & Privacy",
    badge: "Fortifier",
    seoTitle: "Password Generator & Fortifier - Create Strong Unbreakable Passwords | MrFreqline",
    seoDescription: "Generate random high-entropy passwords or type your own password to fortify it into an unbreakable military-grade password. Real-time strength meter.",
    keywords: ["password generator", "password fortifier", "make password stronger", "strong password creator", "password strength checker"],
    shortDescription: "Generate passwords, test real-time strength, and make existing passwords unbreakable.",
    features: [
      "Type & Fortify mode: test your password strength in real time (0-100%)",
      "'Make Password Stronger' button: upgrades weak passwords to 16+ character high-entropy passwords while keeping them memorable",
      "Random generator mode with custom length (8 to 48 chars) and character toggles",
      "Uses cryptographically secure `crypto.getRandomValues()`",
    ],
    howToSteps: [
      { step: 1, title: "Choose Mode", desc: "Select 'Type & Fortify' to improve an existing password, or 'Random Generator' for a new one." },
      { step: 2, title: "Test & Upgrade", desc: "Type your password to see its score, then click 'Make Password Stronger' to instantly fortify it." },
      { step: 3, title: "Copy", desc: "Click the copy button to safely store your new password in your password manager." },
    ],
    faqs: [
      { question: "How does 'Make Password Stronger' work?", answer: "It preserves the familiar root of your word while injecting cryptographic salt, symbol substitutions, and high-entropy characters." },
    ],
    relatedSlugs: ["file-hash", "hash-generator", "uuid-gen", "base64"],
  },

  "hash-generator": {
    id: "hash-generator",
    name: "Hash Generator",
    category: "Security & Privacy",
    seoTitle: "Cryptographic Hash Generator - SHA-256, SHA-512, SHA-1 Online | MrFreqline",
    seoDescription: "Generate real-time cryptographic hashes for any text string. Computes SHA-256, SHA-512, SHA-384, and SHA-1 hashes using the native Web Crypto API.",
    keywords: ["hash generator online", "sha256 generator", "sha512 hash generator", "sha1 generator online"],
    shortDescription: "Compute SHA-256, SHA-512, SHA-384, and SHA-1 cryptographic hashes via Web Crypto API.",
    features: [
      "Real-time hash generation as you type",
      "Simultaneous calculation of SHA-256, SHA-512, SHA-384, and SHA-1",
      "Uses the browser's hardware-accelerated Web Crypto API",
      "One-click copy for each respective hash string",
    ],
    howToSteps: [
      { step: 1, title: "Enter Text", desc: "Type or paste your input string into the text box." },
      { step: 2, title: "View Hashes", desc: "Watch SHA-256, SHA-512, and SHA-1 strings calculate instantly." },
      { step: 3, title: "Copy", desc: "Click the copy icon beside your preferred hash algorithm." },
    ],
    faqs: [
      { question: "Can a SHA-256 hash be decrypted back to the original text?", answer: "No. Cryptographic hash functions are one-way mathematical algorithms designed to be irreversible." },
    ],
    relatedSlugs: ["file-hash", "password-gen", "base64", "uuid-gen"],
  },

  "qr-generator": {
    id: "qr-generator",
    name: "QR Code Generator",
    category: "Security & Privacy",
    badge: "Popular",
    seoTitle: "Free QR Code Generator - Create Custom High-Res QR Codes Online | MrFreqline",
    seoDescription: "Generate high-resolution QR codes for website URLs, plain text, Wi-Fi networks, and contact info. Free, downloadable in PNG format, with zero expiration.",
    keywords: ["qr code generator", "create qr code free", "free qr generator online", "qr code for url"],
    shortDescription: "Generate high-resolution downloadable QR codes for URLs, text, Wi-Fi, and contacts.",
    features: [
      "Generates high-contrast, error-corrected QR codes instantly",
      "Supports URLs, plain text, email, phone numbers, and Wi-Fi credentials",
      "One-click high-resolution PNG download",
      "100% permanent QR codes with no scan limits and no expiration",
    ],
    howToSteps: [
      { step: 1, title: "Input Content", desc: "Type or paste your website URL or plain text into the input field." },
      { step: 2, title: "Preview Code", desc: "See your scannable QR code generated immediately." },
      { step: 3, title: "Download", desc: "Click 'Download QR Code' to save a high-resolution PNG image." },
    ],
    faqs: [
      { question: "Do these QR codes expire?", answer: "No! These are static QR codes containing your direct data. They never expire and have zero scan limits." },
    ],
    relatedSlugs: ["qr-scanner", "url-encoder", "password-gen", "base64"],
  },

  "qr-scanner": {
    id: "qr-scanner",
    name: "QR Code Scanner",
    category: "Security & Privacy",
    seoTitle: "Free QR Code Scanner Online - Scan QR Codes from Image & Web | MrFreqline",
    seoDescription: "Scan and decode QR codes from image files or screenshots in your browser. Decode URLs and text instantly with zero app installations. 100% private.",
    keywords: ["qr code scanner online", "scan qr code from image", "decode qr code free", "read qr code from picture"],
    shortDescription: "Upload any QR image to instantly decode and copy text or open URLs.",
    features: [
      "Upload image or screenshot to decode QR codes in milliseconds",
      "Extracts URLs, text, and data with one-click copy",
      "Direct 'Open Link' button for detected website URLs",
      "All image decoding runs locally on your device via jsQR",
    ],
    howToSteps: [
      { step: 1, title: "Upload QR Image", desc: "Select or drop a photo or screenshot containing a QR code." },
      { step: 2, title: "Instant Decode", desc: "The embedded content is recognized and parsed immediately." },
      { step: 3, title: "Copy or Visit", desc: "Copy the decoded text or click to navigate to the target web page." },
    ],
    faqs: [
      { question: "Can I scan a QR code from a screenshot on my PC?", answer: "Yes! Simply save or paste your screenshot into the tool, and it will decode the QR code without needing a mobile camera." },
    ],
    relatedSlugs: ["qr-generator", "url-encoder", "file-hash", "base64"],
  },

  "uuid-gen": {
    id: "uuid-gen",
    name: "UUID Generator",
    category: "Security & Privacy",
    seoTitle: "Free UUID Generator - Generate Random RFC4122 v4 UUIDs & GUIDs | MrFreqline",
    seoDescription: "Generate random RFC4122 Version 4 UUIDs and GUIDs online. Generate single or bulk unique identifiers with hyphens or uppercase toggles.",
    keywords: ["uuid generator", "guid generator", "v4 uuid online", "generate random uuid"],
    shortDescription: "Generate RFC4122 v4 UUIDs individually or in bulk with one-click copy.",
    features: [
      "Cryptographically random RFC4122 version 4 UUID generation",
      "Bulk generation option (1 to 50 UUIDs at once)",
      "Options for uppercase/lowercase and removing hyphens",
      "One-click copy all to clipboard",
    ],
    howToSteps: [
      { step: 1, title: "Select Quantity", desc: "Choose whether you need a single UUID or a batch of IDs." },
      { step: 2, title: "Generate", desc: "Click 'Generate New UUID' to produce fresh identifiers." },
      { step: 3, title: "Copy", desc: "Copy your UUIDs directly into your code, database, or API test." },
    ],
    faqs: [
      { question: "Are these UUIDs collision-safe?", answer: "Yes. Version 4 UUIDs provide 122 bits of cryptographic entropy, making the mathematical probability of a duplicate virtually zero." },
    ],
    relatedSlugs: ["password-gen", "hash-generator", "base64", "json-formatter"],
  },

  "base64": {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    category: "Security & Privacy",
    seoTitle: "Base64 Encode & Decode Online - UTF-8 Text to Base64 Converter | MrFreqline",
    seoDescription: "Encode text into Base64 or decode Base64 strings back into plain text online. Full UTF-8 and unicode character support with real-time conversion.",
    keywords: ["base64 encoder", "base64 decoder online", "text to base64", "base64 to text"],
    shortDescription: "Two-way encoder and decoder for plain text and UTF-8 strings.",
    features: [
      "Bidirectional conversion (Text to Base64 & Base64 to Text)",
      "Handles full UTF-8 emoji and international Unicode characters safely",
      "Real-time instant live output calculation",
      "One-click copy and quick swap controls",
    ],
    howToSteps: [
      { step: 1, title: "Select Mode", desc: "Choose between 'Encode to Base64' or 'Decode from Base64'." },
      { step: 2, title: "Input Content", desc: "Type or paste your string into the input area." },
      { step: 3, title: "Copy Converted String", desc: "Click 'Copy Output' to grab the result." },
    ],
    faqs: [
      { question: "Why does standard Base64 sometimes break with emojis?", answer: "Older JavaScript `btoa` only supports Latin1 characters. Our tool incorporates proper UTF-8 percent-encoding wrappers to guarantee flawless Unicode and emoji handling." },
    ],
    relatedSlugs: ["url-encoder", "json-formatter", "hash-generator", "uuid-gen"],
  },

  "json-formatter": {
    id: "json-formatter",
    name: "JSON Formatter",
    category: "Text & Dev",
    badge: "Popular",
    seoTitle: "Free JSON Formatter & Validator - Beautify & Minify JSON Online | MrFreqline",
    seoDescription: "Format, beautify, validate, and minify JSON online. Real-time syntax error highlighting, clean indentation, and instant one-click copy.",
    keywords: ["json formatter", "beautify json online", "json validator", "minify json"],
    shortDescription: "Beautify, validate, minify, and inspect JSON payloads with error detection.",
    features: [
      "Beautify with customizable 2-space indentation",
      "Minify and compact JSON for network payloads",
      "Real-time syntax validation with line-specific error messages",
      "One-click copy formatted code",
    ],
    howToSteps: [
      { step: 1, title: "Paste JSON", desc: "Paste raw unformatted or minified JSON into the editor." },
      { step: 2, title: "Format or Minify", desc: "Click 'Beautify' for clean readable indentation or 'Minify' to compress." },
      { step: 3, title: "Copy Clean JSON", desc: "Click copy to use the validated JSON in your project." },
    ],
    faqs: [
      { question: "Is my JSON payload sent to any backend server?", answer: "No. The validator runs `JSON.parse` entirely in your local browser sandbox. Private API tokens remain 100% confidential." },
    ],
    relatedSlugs: ["base64", "url-encoder", "markdown-preview", "uuid-gen"],
  },

  "word-counter": {
    id: "word-counter",
    name: "Word Counter",
    category: "Text & Dev",
    seoTitle: "Word Counter Online - Real-Time Word & Character Count Tool | MrFreqline",
    seoDescription: "Count words, characters, sentences, and paragraphs in real time. Get estimated reading and speaking times for essays, blog posts, and scripts.",
    keywords: ["word counter", "character count online", "sentence counter", "reading time calculator"],
    shortDescription: "Real-time count of words, characters, sentences, paragraphs, reading and speaking time.",
    features: [
      "Real-time count of words, characters (with and without spaces), sentences, and paragraphs",
      "Calculates estimated reading time (200 wpm) and speaking time (130 wpm)",
      "Live updates as you type or paste text",
      "One-click clear and copy buttons",
    ],
    howToSteps: [
      { step: 1, title: "Type or Paste Text", desc: "Enter your article, essay, or speech into the editor." },
      { step: 2, title: "Inspect Live Metrics", desc: "View updated counters for words, characters, sentences, and estimated reading time." },
      { step: 3, title: "Copy or Clear", desc: "Use quick buttons to copy your text or clear the editor." },
    ],
    faqs: [
      { question: "How is reading time calculated?", answer: "Reading time is calculated using the standard average adult reading speed of 200 words per minute." },
    ],
    relatedSlugs: ["case-converter", "text-cleaner-tools", "lorem-generator", "preeti-unicode"],
  },

  "case-converter": {
    id: "case-converter",
    name: "Case Converter",
    category: "Text & Dev",
    seoTitle: "Text Case Converter Online - UPPERCASE, lowercase, Title Case | MrFreqline",
    seoDescription: "Convert text case online: UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case. Fast, real-time typography and developer tool.",
    keywords: ["case converter", "text case changer", "convert to uppercase online", "convert to title case"],
    shortDescription: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    features: [
      "Transforms text to UPPERCASE, lowercase, and Title Case",
      "Developer formats: camelCase, snake_case, kebab-case, and PascalCase",
      "Preserves spacing and special characters appropriately",
      "One-click copy to clipboard",
    ],
    howToSteps: [
      { step: 1, title: "Paste Text", desc: "Enter your text into the input box." },
      { step: 2, title: "Select Desired Case", desc: "Click your desired casing button." },
      { step: 3, title: "Copy Result", desc: "Click copy to use the formatted text immediately." },
    ],
    faqs: [
      { question: "What is camelCase used for?", answer: "camelCase is standard in JavaScript and programming languages for naming variables and functions without spaces (e.g., `myVariableName`)." },
    ],
    relatedSlugs: ["word-counter", "text-cleaner-tools", "preeti-unicode", "url-encoder"],
  },

  "unit-converter": {
    id: "unit-converter",
    name: "Unit Converter",
    category: "Text & Dev",
    seoTitle: "Universal Unit Converter - Length, Weight, Temperature & Data | MrFreqline",
    seoDescription: "Convert measurements easily across Length (meters, feet, inches), Weight (kg, lbs), Temperature (Celsius, Fahrenheit), and Digital Storage (MB, GB, TB).",
    keywords: ["unit converter", "length converter online", "weight converter kg to lbs", "temperature converter c to f"],
    shortDescription: "Convert measurements across Length, Weight, Temperature, and Digital Storage units.",
    features: [
      "Supports Length (Meters, Kilometers, Miles, Feet, Inches)",
      "Supports Weight (Kilograms, Grams, Pounds, Ounces)",
      "Supports Temperature (Celsius, Fahrenheit, Kelvin)",
      "Supports Digital Data (Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes)",
    ],
    howToSteps: [
      { step: 1, title: "Select Category", desc: "Choose Length, Weight, Temperature, or Digital Storage." },
      { step: 2, title: "Set Units", desc: "Pick your source unit and target conversion unit." },
      { step: 3, title: "View Converted Value", desc: "Enter your quantity to see the converted result instantly." },
    ],
    faqs: [
      { question: "How many gigabytes are in a terabyte?", answer: "In standard decimal notation used by storage manufacturers, 1 Terabyte (TB) equals 1,000 Gigabytes (GB)." },
    ],
    relatedSlugs: ["area-converter", "volume-speed-converter", "percentage-calculator", "bmi-calculator"],
  },

  "color-converter": {
    id: "color-converter",
    name: "Color & Palette Studio",
    category: "Text & Dev",
    seoTitle: "Color Converter & Palette Studio - HEX, RGB & HSL Converter | MrFreqline",
    seoDescription: "Convert color formats between HEX, RGB, and HSL with a live interactive preview swatch. Copy CSS color strings with one click. Free web design tool.",
    keywords: ["color converter", "hex to rgb converter", "rgb to hex online", "color picker online"],
    shortDescription: "Convert color formats between HEX, RGB, and HSL with visual preview and copy.",
    features: [
      "Convert seamlessly between HEX (#ff0055), RGB, and HSL formats",
      "Interactive visual color picker and live color swatch preview",
      "One-click copy for clean CSS-ready color code strings",
      "Real-time synchronization across all color code formats",
    ],
    howToSteps: [
      { step: 1, title: "Pick or Type Color", desc: "Use the visual color picker or paste a HEX, RGB, or HSL code." },
      { step: 2, title: "View Formats", desc: "All equivalent color notations update automatically in real time." },
      { step: 3, title: "Copy Code", desc: "Click the copy button next to your required CSS color format." },
    ],
    faqs: [
      { question: "What is the advantage of HSL over RGB?", answer: "HSL (Hue, Saturation, Lightness) is more intuitive for designers because you can adjust brightness or vibrancy without changing the underlying hue." },
    ],
    relatedSlugs: ["unit-converter", "markdown-preview", "json-formatter", "base64"],
  },

  "lorem-generator": {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    category: "Text & Dev",
    seoTitle: "Lorem Ipsum Generator - Dummy & Placeholder Text Generator | MrFreqline",
    seoDescription: "Generate clean dummy placeholder text for website designs and layouts. Generate custom paragraphs, sentences, or word counts with one-click copy.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text generator", "generate lorem ipsum online"],
    shortDescription: "Generate clean placeholder text by paragraphs, sentences, or words.",
    features: [
      "Generate custom numbers of paragraphs, sentences, or individual words",
      "Optional toggle to start with standard 'Lorem ipsum dolor sit amet...'",
      "Clean punctuation and natural paragraph spacing",
      "One-click copy to clipboard",
    ],
    howToSteps: [
      { step: 1, title: "Set Count & Unit", desc: "Choose how many paragraphs, sentences, or words you need." },
      { step: 2, title: "Generate", desc: "Click 'Generate Lorem Ipsum' to create placeholder text." },
      { step: 3, title: "Copy", desc: "Click 'Copy Text' to paste into your design mockups or code." },
    ],
    faqs: [
      { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is standard placeholder dummy text used in the printing and digital design industries since the 1500s." },
    ],
    relatedSlugs: ["word-counter", "case-converter", "text-cleaner-tools", "markdown-preview"],
  },

  "markdown-preview": {
    id: "markdown-preview",
    name: "Markdown Previewer",
    category: "Text & Dev",
    seoTitle: "Free Markdown Previewer Online - Live Rendered Markdown & HTML | MrFreqline",
    seoDescription: "Write and preview Markdown in real time with side-by-side rendered HTML view. Supports headings, bold, italics, code blocks, lists, and links.",
    keywords: ["markdown previewer online", "live markdown editor", "markdown to html converter", "github markdown preview online"],
    shortDescription: "Write Markdown with live rendered HTML preview and instant clipboard copy.",
    features: [
      "Side-by-side real-time live preview as you type",
      "Supports standard GitHub Flavored Markdown (headings, lists, blockquotes, code, tables)",
      "Instant copy formatted HTML output or raw Markdown",
      "100% client-side privacy: nothing is sent to a server",
    ],
    howToSteps: [
      { step: 1, title: "Write Markdown", desc: "Type or paste your Markdown content in the editor panel." },
      { step: 2, title: "Live Preview", desc: "Observe the formatted HTML typography render immediately on the right." },
      { step: 3, title: "Copy", desc: "Copy the raw markdown or export your formatted content." },
    ],
    faqs: [
      { question: "Can I use this to draft README.md files?", answer: "Yes! It is ideal for drafting GitHub README files, technical documentation, and blog posts." },
    ],
    relatedSlugs: ["text-to-pdf", "word-counter", "json-formatter", "text-cleaner-tools"],
  },

  "url-encoder": {
    id: "url-encoder",
    name: "URL Encoder / Decoder",
    category: "Text & Dev",
    seoTitle: "URL Encoder & Decoder Online - Percent Encoding Converter | MrFreqline",
    seoDescription: "Encode query strings and decode percent-encoded URLs online. Safely format special characters, spaces, and query parameters for HTTP requests.",
    keywords: ["url encoder", "url decoder online", "percent encoding converter", "encode url string"],
    shortDescription: "Encode query parameters and decode complex URLs safely in your browser.",
    features: [
      "Two-way URL encoding (`encodeURIComponent`) and decoding (`decodeURIComponent`)",
      "Handles reserved characters (&, ?, =, #, /) and spaces safely",
      "Live real-time output conversion as you type",
      "One-click copy to clipboard",
    ],
    howToSteps: [
      { step: 1, title: "Select Mode", desc: "Choose 'Encode' to escape special characters or 'Decode' to parse encoded URLs." },
      { step: 2, title: "Enter URL or String", desc: "Paste your link or parameter string into the box." },
      { step: 3, title: "Copy Converted URL", desc: "Click 'Copy Output' to use in your API or browser address bar." },
    ],
    faqs: [
      { question: "Why do URLs need percent-encoding?", answer: "Characters like spaces, ampersands, and question marks have special syntactic meaning in HTTP URLs. Percent-encoding replaces them with safe hexadecimal representations." },
    ],
    relatedSlugs: ["base64", "qr-generator", "json-formatter", "case-converter"],
  },
};

export const ALL_TOOL_SLUGS = Object.keys(TOOLS_DIRECTORY) as ToolId[];

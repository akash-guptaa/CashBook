// Combined Personal Finance Management Tool Bundle

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ===== FILE: src/initialData.js =====
// Default Initial Data for Personal Finance Management Tool
// Multi-User Architecture with Salaried User Profiles and Admin Roles

window.INITIAL_DATA = {
  // Pre-configured Users
  users: [
    {
      id: "usr-admin",
      name: "System Administrator",
      email: "admin@cashbook.com",
      password: "Passwd@123",
      role: "admin",
      status: "active", // 'active' | 'inactive'
      monthlySalary: 120000,
      roleTitle: "Lead IT Administrator",
      company: "CashBook Global Ltd",
      payDay: 1,
      currency: "₹",
      currencyCode: "INR",
      savingsGoalPercentage: 40
    },
    {
      id: "usr-rahul",
      name: "Rahul Sharma",
      email: "rahul@cashbook.com",
      password: "Passwd@123",
      role: "user",
      status: "active",
      monthlySalary: 95000,
      roleTitle: "Senior Software Engineer",
      company: "Tata Consultancy Services Ltd",
      payDay: 1,
      currency: "₹",
      currencyCode: "INR",
      savingsGoalPercentage: 35
    },
    {
      id: "usr-priya",
      name: "Kiran",
      email: "akash@cashbook.com",
      password: "Passwd@123",
      role: "user",
      status: "active",
      monthlySalary: 82000,
      roleTitle: "Product Marketing Manager",
      company: "Infosys Digital Media",
      payDay: 5,
      currency: "₹",
      currencyCode: "INR",
      savingsGoalPercentage: 30
    }
  ],

  incomeCategories: [
    { id: "inc-1", name: "Monthly Salary", icon: "wallet", color: "#059669", group: "Salary & Career" },
    { id: "inc-2", name: "Bonus", icon: "gift", color: "#8B5CF6", group: "Salary & Career" },
    { id: "inc-3", name: "Incentives", icon: "award", color: "#3B82F6", group: "Salary & Career" },
    { id: "inc-4", name: "Freelancing", icon: "laptop", color: "#06B6D4", group: "Secondary Income" },
    { id: "inc-5", name: "Business Income", icon: "briefcase", color: "#F59E0B", group: "Secondary Income" },
    { id: "inc-6", name: "Interest Income", icon: "percent", color: "#10B981", group: "Investments" },
    { id: "inc-7", name: "Rental Income", icon: "home", color: "#F97316", group: "Investments" },
    { id: "inc-8", name: "Investment Returns", icon: "trending-up", color: "#14B8A6", group: "Investments" },
    { id: "inc-9", name: "Gifts Received", icon: "heart", color: "#EC4899", group: "Personal" },
    { id: "inc-10", name: "Other Income", icon: "plus-circle", color: "#64748B", group: "Other" }
  ],

  expenseCategories: [
    // Home & Living
    { id: "exp-1", name: "Home EMI", icon: "home", color: "#DC2626", group: "Home & Living" },
    { id: "exp-2", name: "Rent", icon: "key", color: "#B91C1C", group: "Home & Living" },
    { id: "exp-3", name: "Maintenance", icon: "tool", color: "#D97706", group: "Home & Living" },
    { id: "exp-4", name: "Electricity", icon: "zap", color: "#EAB308", group: "Home & Living" },
    { id: "exp-5", name: "Water Bill", icon: "droplet", color: "#2563EB", group: "Home & Living" },
    { id: "exp-6", name: "Gas", icon: "flame", color: "#EA580C", group: "Home & Living" },
    { id: "exp-7", name: "Groceries", icon: "shopping-cart", color: "#16A34A", group: "Home & Living" },

    // Personal
    { id: "exp-8", name: "Shopping", icon: "shopping-bag", color: "#7C3AED", group: "Personal" },
    { id: "exp-9", name: "Clothing", icon: "shirt", color: "#9333EA", group: "Personal" },
    { id: "exp-10", name: "Mobile Recharge", icon: "smartphone", color: "#0284C7", group: "Personal" },
    { id: "exp-11", name: "Internet", icon: "wifi", color: "#0891B2", group: "Personal" },
    { id: "exp-12", name: "Personal Care", icon: "sparkles", color: "#DB2777", group: "Personal" },
    { id: "exp-13", name: "Medical", icon: "activity", color: "#059669", group: "Personal" },
    { id: "exp-14", name: "Entertainment", icon: "film", color: "#C026D3", group: "Personal" },

    // Transportation
    { id: "exp-15", name: "Petrol", icon: "fuel", color: "#EF4444", group: "Transportation" },
    { id: "exp-16", name: "Public Transport", icon: "bus", color: "#3B82F6", group: "Transportation" },
    { id: "exp-17", name: "Vehicle Maintenance", icon: "tool", color: "#475569", group: "Transportation" },
    { id: "exp-18", name: "Cab", icon: "car", color: "#F59E0B", group: "Transportation" },

    // Financial
    { id: "exp-19", name: "Loan EMI", icon: "credit-card", color: "#BE123C", group: "Financial" },
    { id: "exp-20", name: "Credit Card Payment", icon: "credit-card", color: "#4338CA", group: "Financial" },
    { id: "exp-21", name: "Insurance", icon: "shield", color: "#0F766E", group: "Financial" },
    { id: "exp-22", name: "Investments", icon: "trending-up", color: "#047857", group: "Financial" },
    { id: "exp-23", name: "Savings", icon: "piggy-bank", color: "#0284C7", group: "Financial" },
    { id: "exp-24", name: "Bank Charges", icon: "file-text", color: "#64748B", group: "Financial" },

    // Family & Lifestyle
    { id: "exp-25", name: "Family Expenses", icon: "users", color: "#6D28D9", group: "Family & Lifestyle" },
    { id: "exp-26", name: "Wife / Personal", icon: "heart", color: "#E11D48", group: "Family & Lifestyle" },
    { id: "exp-27", name: "Dining", icon: "utensils", color: "#D97706", group: "Family & Lifestyle" },
    { id: "exp-28", name: "Travel", icon: "compass", color: "#0284C7", group: "Family & Lifestyle" },
    { id: "exp-29", name: "Gifts", icon: "gift", color: "#F43F5E", group: "Family & Lifestyle" },
    { id: "exp-30", name: "Other Expenses", icon: "more-horizontal", color: "#64748B", group: "Family & Lifestyle" }
  ],

  // Balance sheets keyed by User ID
  balanceSheets: {
    "usr-rahul": {
      assets: {
        cashInHand: 12500,
        bankBalance: 145000,
        savings: 220000,
        investments: 680000,
        otherAssets: 210000
      },
      liabilities: {
        homeLoan: 1450000,
        personalLoan: 0,
        creditCard: 18400,
        otherLiabilities: 0
      },
      lastUpdated: "2026-11-01"
    },
    "usr-priya": {
      assets: {
        cashInHand: 8000,
        bankBalance: 110000,
        savings: 180000,
        investments: 420000,
        otherAssets: 150000
      },
      liabilities: {
        homeLoan: 0,
        personalLoan: 45000,
        creditCard: 12500,
        otherLiabilities: 0
      },
      lastUpdated: "2026-11-01"
    },
    "usr-admin": {
      assets: {
        cashInHand: 25000,
        bankBalance: 320000,
        savings: 450000,
        investments: 1200000,
        otherAssets: 500000
      },
      liabilities: {
        homeLoan: 800000,
        personalLoan: 0,
        creditCard: 22000,
        otherLiabilities: 0
      },
      lastUpdated: "2026-11-01"
    }
  },

  sampleAttachments: [
    { id: "att-1", name: "Grocery_Supermarket_Bill.jpg", type: "photo", size: "420 KB" },
    { id: "att-2", name: "HPCL_Petrol_Fuel_Receipt.png", type: "photo", size: "310 KB" },
    { id: "att-3", name: "TCS_Payslip_Salary_Nov2026.pdf", type: "pdf", size: "1.2 MB" },
    { id: "att-4", name: "Adani_Electricity_Bill.pdf", type: "pdf", size: "850 KB" }
  ],

  // Realistic Transactions tagged with userId
  transactions: [
    // --- Rahul Sharma's Transactions (November 2026) ---
    {
      id: "tx-nov-01",
      userId: "usr-rahul",
      type: "IN",
      categoryId: "inc-1",
      categoryName: "Monthly Salary",
      amount: 95000,
      date: "2026-11-01",
      time: "09:30 AM",
      comment: "Salary credited for October 2026 - TCS Ltd",
      attachments: [{ name: "TCS_Payslip_Salary_Nov2026.pdf", type: "pdf", size: "1.2 MB" }]
    },
    {
      id: "tx-nov-02",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-2",
      categoryName: "Rent",
      amount: 22000,
      date: "2026-11-01",
      time: "11:15 AM",
      comment: "Monthly 2BHK flat rent transfer to landlord via UPI",
      attachments: []
    },
    {
      id: "tx-nov-03",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-22",
      categoryName: "Investments",
      amount: 15000,
      date: "2026-11-02",
      time: "10:00 AM",
      comment: "Monthly SIP Auto-Debit (Nifty 50 Index Fund & Parag Parikh Flexi Cap)",
      attachments: []
    },
    {
      id: "tx-nov-04",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-23",
      categoryName: "Savings",
      amount: 10000,
      date: "2026-11-02",
      time: "10:30 AM",
      comment: "Emergency Fund Recurring Deposit transfer",
      attachments: []
    },
    {
      id: "tx-nov-05",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-7",
      categoryName: "Groceries",
      amount: 4850,
      date: "2026-11-03",
      time: "06:45 PM",
      comment: "D-Mart monthly grocery run (rice, atta, pulses, oil)",
      attachments: [{ name: "Grocery_Supermarket_Bill.jpg", type: "photo", size: "420 KB" }]
    },
    {
      id: "tx-nov-06",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-4",
      categoryName: "Electricity",
      amount: 2140,
      date: "2026-11-03",
      time: "08:20 PM",
      comment: "Electricity bill paid via GPay",
      attachments: [{ name: "Adani_Electricity_Bill.pdf", type: "pdf", size: "850 KB" }]
    },
    {
      id: "tx-nov-07",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-15",
      categoryName: "Petrol",
      amount: 2500,
      date: "2026-11-04",
      time: "08:15 AM",
      comment: "Full tank fuel HPCL auto fuel station",
      attachments: [{ name: "HPCL_Petrol_Fuel_Receipt.png", type: "photo", size: "310 KB" }]
    },
    {
      id: "tx-nov-08",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-11",
      categoryName: "Internet",
      amount: 1179,
      date: "2026-11-04",
      time: "04:30 PM",
      comment: "Jio Fiber broadband monthly 100 Mbps postpaid plan",
      attachments: []
    },
    {
      id: "tx-nov-09",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-10",
      categoryName: "Mobile Recharge",
      amount: 719,
      date: "2026-11-05",
      time: "12:10 PM",
      comment: "Airtel 84-day prepaid recharge (2GB/day)",
      attachments: []
    },
    {
      id: "tx-nov-10",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-27",
      categoryName: "Dining",
      amount: 1850,
      date: "2026-11-05",
      time: "09:30 PM",
      comment: "Family dinner at Barbeque Nation",
      attachments: []
    },
    {
      id: "tx-nov-11",
      userId: "usr-rahul",
      type: "IN",
      categoryId: "inc-4",
      categoryName: "Freelancing",
      amount: 18500,
      date: "2026-11-06",
      time: "02:15 PM",
      comment: "UI/UX component library consulting milestone payment",
      attachments: []
    },
    {
      id: "tx-nov-12",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-26",
      categoryName: "Wife / Personal",
      amount: 5000,
      date: "2026-11-06",
      time: "05:00 PM",
      comment: "Monthly household discretionary allowance",
      attachments: []
    },
    {
      id: "tx-nov-13",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-7",
      categoryName: "Groceries",
      amount: 100,
      date: "2026-11-07",
      time: "08:46 AM",
      comment: "Vegetables & coriander from local vendor stall",
      attachments: []
    },
    {
      id: "tx-nov-14",
      userId: "usr-rahul",
      type: "OUT",
      categoryId: "exp-18",
      categoryName: "Cab",
      amount: 340,
      date: "2026-11-07",
      time: "01:20 PM",
      comment: "Uber ride from client office to metro station",
      attachments: []
    },

    // --- Kiran's Transactions (November 2026) ---
    {
      id: "tx-priya-01",
      userId: "usr-priya",
      type: "IN",
      categoryId: "inc-1",
      categoryName: "Monthly Salary",
      amount: 82000,
      date: "2026-11-05",
      time: "10:00 AM",
      comment: "Salary credited - Infosys Digital Media",
      attachments: []
    },
    {
      id: "tx-priya-02",
      userId: "usr-priya",
      type: "OUT",
      categoryId: "exp-2",
      categoryName: "Rent",
      amount: 18000,
      date: "2026-11-05",
      time: "12:30 PM",
      comment: "Flat rent share payment",
      attachments: []
    },
    {
      id: "tx-priya-03",
      userId: "usr-priya",
      type: "OUT",
      categoryId: "exp-7",
      categoryName: "Groceries",
      amount: 3600,
      date: "2026-11-06",
      time: "07:15 PM",
      comment: "Organic food market fruits and groceries",
      attachments: []
    },
    {
      id: "tx-priya-04",
      userId: "usr-priya",
      type: "OUT",
      categoryId: "exp-8",
      categoryName: "Shopping",
      amount: 4200,
      date: "2026-11-07",
      time: "04:00 PM",
      comment: "Winter wardrobe essentials from Zara",
      attachments: []
    },

    // --- Admin Transactions ---
    {
      id: "tx-admin-01",
      userId: "usr-admin",
      type: "IN",
      categoryId: "inc-1",
      categoryName: "Monthly Salary",
      amount: 120000,
      date: "2026-11-01",
      time: "09:00 AM",
      comment: "Director salary credit",
      attachments: []
    },
    {
      id: "tx-admin-02",
      userId: "usr-admin",
      type: "OUT",
      categoryId: "exp-22",
      categoryName: "Investments",
      amount: 35000,
      date: "2026-11-02",
      time: "11:00 AM",
      comment: "Portfolio SIP auto-investment",
      attachments: []
    }
  ]
};


// ===== FILE: src/icons.js =====
// Self-contained SVG Icon Library for Personal Finance Tool
// Styled with standard SVG paths matching Lucide icons

window.Icons = {
  ArrowLeft: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  ),
  Calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  ),
  Paperclip: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  Camera: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  FileText: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  ),
  Backspace: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 22} height={props.size || 22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
    </svg>
  ),
  Plus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  ),
  Minus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M5 12h14"/>
    </svg>
  ),
  X: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Check: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  Search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Trash2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  Edit2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
    </svg>
  ),
  ChevronDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ChevronRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  LayoutDashboard: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  ),
  BookOpen: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  BarChart3: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  ),
  Tags: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m15 5 4 4"/><path d="M13 2H6a2 2 0 0 0-2 2v7l9 9 7-7-7-9z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
    </svg>
  ),
  Settings: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Wallet: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
    </svg>
  ),
  TrendingUp: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  TrendingDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>
    </svg>
  ),
  PiggyBank: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>
    </svg>
  ),
  CreditCard: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Shield: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    </svg>
  ),
  Home: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Gift: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  ),
  Award: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Laptop: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
    </svg>
  ),
  Briefcase: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Percent: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  ),
  Heart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  ShoppingCart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  ),
  Fuel: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <line x1="3" y1="22" x2="15" y2="22"/><path d="M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>
    </svg>
  ),
  Utensils: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2"/><path d="M9 14v8"/>
    </svg>
  ),
  Zap: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Car: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
    </svg>
  ),
  Download: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  RefreshCw: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  ),
  Smartphone: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  Monitor: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Tablet: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Key: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  ),
  Tool: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Droplet: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  ),
  Flame: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  ShoppingBag: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Shirt: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
  Wifi: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>
    </svg>
  ),
  Sparkles: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  Activity: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Film: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  ),
  Bus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M8 6v6"/><path d="M16 6v6"/><path d="M4 18v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3"/><path d="M17 18v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3"/><rect width="18" height="14" x="3" y="4" rx="2"/><path d="M3 12h18"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/>
    </svg>
  ),
  Users: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Compass: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  MoreHorizontal: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  PieChart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
  ),
  Printer: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
    </svg>
  ),
  UserCheck: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
    </svg>
  ),
  Receipt: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-8"/><path d="M16 12h-8"/><path d="M10 16H8"/>
    </svg>
  ),
  Landmark: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>
    </svg>
  ),
  LogIn: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
  ),
  LogOut: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  KeyRound: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>
    </svg>
  ),
  Eye: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  ),
  Lock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Unlock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className || ""}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>
  )
};

// Helper to resolve icon by string name
window.getIconComponent = function(iconName, props = {}) {
  const map = {
    'arrow-left': window.Icons.ArrowLeft,
    'calendar': window.Icons.Calendar,
    'paperclip': window.Icons.Paperclip,
    'camera': window.Icons.Camera,
    'file-text': window.Icons.FileText,
    'backspace': window.Icons.Backspace,
    'plus': window.Icons.Plus,
    'minus': window.Icons.Minus,
    'x': window.Icons.X,
    'check': window.Icons.Check,
    'search': window.Icons.Search,
    'trash': window.Icons.Trash2,
    'trash-2': window.Icons.Trash2,
    'edit': window.Icons.Edit2,
    'edit-2': window.Icons.Edit2,
    'chevron-down': window.Icons.ChevronDown,
    'chevron-right': window.Icons.ChevronRight,
    'dashboard': window.Icons.LayoutDashboard,
    'cashbook': window.Icons.BookOpen,
    'reports': window.Icons.BarChart3,
    'categories': window.Icons.Tags,
    'profile': window.Icons.UserCheck,
    'settings': window.Icons.Settings,
    'wallet': window.Icons.Wallet,
    'trending-up': window.Icons.TrendingUp,
    'trending-down': window.Icons.TrendingDown,
    'piggy-bank': window.Icons.PiggyBank,
    'credit-card': window.Icons.CreditCard,
    'shield': window.Icons.Shield,
    'home': window.Icons.Home,
    'gift': window.Icons.Gift,
    'award': window.Icons.Award,
    'laptop': window.Icons.Laptop,
    'briefcase': window.Icons.Briefcase,
    'percent': window.Icons.Percent,
    'heart': window.Icons.Heart,
    'shopping-cart': window.Icons.ShoppingCart,
    'shopping-bag': window.Icons.ShoppingBag,
    'shirt': window.Icons.Shirt,
    'fuel': window.Icons.Fuel,
    'utensils': window.Icons.Utensils,
    'zap': window.Icons.Zap,
    'car': window.Icons.Car,
    'download': window.Icons.Download,
    'refresh': window.Icons.RefreshCw,
    'smartphone': window.Icons.Smartphone,
    'monitor': window.Icons.Monitor,
    'tablet': window.Icons.Tablet,
    'key': window.Icons.Key,
    'tool': window.Icons.Tool,
    'droplet': window.Icons.Droplet,
    'flame': window.Icons.Flame,
    'wifi': window.Icons.Wifi,
    'sparkles': window.Icons.Sparkles,
    'activity': window.Icons.Activity,
    'film': window.Icons.Film,
    'bus': window.Icons.Bus,
    'users': window.Icons.Users,
    'compass': window.Icons.Compass,
    'more-horizontal': window.Icons.MoreHorizontal,
    'printer': window.Icons.Printer,
    'receipt': window.Icons.Receipt,
    'landmark': window.Icons.Landmark,
    'log-in': window.Icons.LogIn,
    'log-out': window.Icons.LogOut,
    'key-round': window.Icons.KeyRound,
    'eye': window.Icons.Eye,
    'eye-off': window.Icons.EyeOff,
    'lock': window.Icons.Lock,
    'unlock': window.Icons.Unlock,
    'user': window.Icons.UserCheck
  };

  const Component = map[iconName] || window.Icons.Tags;
  return <Component {...props} />;
};


// ===== FILE: src/loginAndSecurity.js =====
// Login Page, Security & Salary Privacy Protection, and Live Camera Modal
// Handles user authentication, salary privacy password masking, camera capture, and file explorer

// ============================================================================
// 1. SALARY PRIVACY VIEWER (Requires user password every time to view salary)
// ============================================================================
window.SalaryPrivacyViewer = function({
  amount,
  currency = "₹",
  currentUser,
  label = "Salary",
  subText = null,
  inline = false,
  size = "normal" // "small" | "normal" | "large"
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const passwordInputRef = useRef(null);

  const handleOpenPrompt = (e) => {
    if (e) e.stopPropagation();
    setPasswordInput("");
    setErrorMsg("");
    setShowPromptModal(true);
    setTimeout(() => {
      if (passwordInputRef.current) passwordInputRef.current.focus();
    }, 100);
  };

  const handleVerifyPassword = (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!passwordInput) {
      setErrorMsg("Please enter your password.");
      return;
    }

    // Verify password against current active user's password or admin password
    const isValid = (currentUser && passwordInput === currentUser.password) || passwordInput === "Passwd@123";

    if (!isValid) {
      setErrorMsg("Incorrect password. Please try again.");
      return;
    }

    // Password verified! Reveal salary
    setIsRevealed(true);
    setShowPromptModal(false);
    setPasswordInput("");
    setErrorMsg("");
  };

  const handleLockAgain = (e) => {
    if (e) e.stopPropagation();
    setIsRevealed(false);
  };

  // Small inline chip (used in Header)
  if (inline && size === "small") {
    return (
      <span className="inline-flex items-center space-x-1.5">
        <span className="text-slate-400">Salary:</span>
        {isRevealed ? (
          <span className="font-extrabold text-slate-800">
            {window.formatCurrency(amount, currency)}
            <button
              onClick={handleLockAgain}
              className="ml-1.5 text-slate-400 hover:text-slate-600 text-[10px] underline font-bold"
              title="Hide Salary"
            >
              [Hide]
            </button>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-1">
            <span className="font-mono text-slate-400 tracking-widest text-xs">••••••••</span>
            <button
              onClick={handleOpenPrompt}
              className="text-[#9B111E] hover:text-[#7B0D18] text-[10px] font-bold underline flex items-center space-x-0.5 ml-1"
              title="Enter password to view salary"
            >
              <span>{window.getIconComponent('eye', { size: 11 })}</span>
              <span>View</span>
            </button>
          </span>
        )}

        {/* Password Prompt Modal */}
        {showPromptModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-red-50 text-[#9B111E]">
                    {window.getIconComponent('lock', { size: 16 })}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Salary Privacy Verification</h4>
                    <p className="text-[10px] text-slate-400">Protected salaried individual data</p>
                  </div>
                </div>
                <button onClick={() => setShowPromptModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  {window.getIconComponent('x', { size: 16 })}
                </button>
              </div>

              <form onSubmit={handleVerifyPassword} className="mt-4 space-y-3">
                <p className="text-xs text-slate-600">
                  Enter password for <strong>{currentUser ? currentUser.name : 'user'}</strong> to reveal salary details.
                </p>

                {errorMsg && (
                  <div className="p-2 bg-red-50 border border-red-200 text-xs text-[#9B111E] font-semibold rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    type={showPasswordText ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (e.g. Passwd@123)"
                    className="w-full p-2.5 pr-10 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {window.getIconComponent(showPasswordText ? 'eye-off' : 'eye', { size: 14 })}
                  </button>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPromptModal(false)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Unlock Salary
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </span>
    );
  }

  // Large Card (used in Income Report)
  if (size === "large") {
    return (
      <div className="relative">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        
        {isRevealed ? (
          <div className="flex items-center justify-between mt-1">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {window.formatCurrency(amount, currency)}
            </h3>
            <button
              onClick={handleLockAgain}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1 font-semibold"
              title="Lock salary again"
            >
              <span>{window.getIconComponent('lock', { size: 13 })}</span>
              <span>Hide</span>
            </button>
          </div>
        ) : (
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-slate-400 tracking-widest font-mono">
                ••••••••
              </span>
              <span className="text-slate-400">
                {window.getIconComponent('lock', { size: 16 })}
              </span>
            </div>

            <button
              onClick={handleOpenPrompt}
              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[#9B111E] rounded-lg text-xs font-bold transition flex items-center space-x-1"
            >
              <span>{window.getIconComponent('eye', { size: 13 })}</span>
              <span>Unlock Salary</span>
            </button>
          </div>
        )}

        {subText && <p className="text-xs text-slate-500 mt-1">{subText}</p>}

        {/* Password Prompt Modal */}
        {showPromptModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-red-50 text-[#9B111E]">
                    {window.getIconComponent('lock', { size: 16 })}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Salary Privacy Verification</h4>
                    <p className="text-[10px] text-slate-400">Password required to view salary</p>
                  </div>
                </div>
                <button onClick={() => setShowPromptModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  {window.getIconComponent('x', { size: 16 })}
                </button>
              </div>

              <form onSubmit={handleVerifyPassword} className="mt-4 space-y-3">
                <p className="text-xs text-slate-600">
                  Please enter user password for <strong>{currentUser ? currentUser.name : 'user'}</strong> to reveal salary details.
                </p>

                {errorMsg && (
                  <div className="p-2 bg-red-50 border border-red-200 text-xs text-[#9B111E] font-semibold rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    type={showPasswordText ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (e.g. Passwd@123)"
                    className="w-full p-2.5 pr-10 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {window.getIconComponent(showPasswordText ? 'eye-off' : 'eye', { size: 14 })}
                  </button>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPromptModal(false)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Unlock Salary
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standard Normal display (used in Dashboard header banner)
  return (
    <div className="inline-flex items-center space-x-2">
      <span className="text-[11px] text-slate-400">{label}:</span>
      {isRevealed ? (
        <span className="text-[11px] font-extrabold text-slate-800 flex items-center space-x-1.5">
          <span>{window.formatCurrency(amount, currency)}</span>
          <button
            onClick={handleLockAgain}
            className="text-[10px] text-slate-400 hover:text-slate-600 underline font-semibold"
          >
            [Hide]
          </button>
        </span>
      ) : (
        <span className="inline-flex items-center space-x-1">
          <span className="text-[11px] font-mono tracking-widest text-slate-400">••••••••</span>
          <button
            onClick={handleOpenPrompt}
            className="text-[10px] font-bold text-[#9B111E] hover:underline flex items-center space-x-0.5 ml-1"
          >
            <span>{window.getIconComponent('eye', { size: 11 })}</span>
            <span>View</span>
          </button>
        </span>
      )}

      {/* Password Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-red-50 text-[#9B111E]">
                  {window.getIconComponent('lock', { size: 16 })}
                </span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Salary Privacy Verification</h4>
                  <p className="text-[10px] text-slate-400">Password required to view salary</p>
                </div>
              </div>
              <button onClick={() => setShowPromptModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                {window.getIconComponent('x', { size: 16 })}
              </button>
            </div>

            <form onSubmit={handleVerifyPassword} className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">
                Please enter user password for <strong>{currentUser ? currentUser.name : 'user'}</strong> to reveal salary details.
              </p>

              {errorMsg && (
                <div className="p-2 bg-red-50 border border-red-200 text-xs text-[#9B111E] font-semibold rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showPasswordText ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password (e.g. Passwd@123)"
                  className="w-full p-2.5 pr-10 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {window.getIconComponent(showPasswordText ? 'eye-off' : 'eye', { size: 14 })}
                </button>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPromptModal(false)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Unlock Salary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. SALARY PRIVACY INPUT (Used in Profile Settings form)
// ============================================================================
window.SalaryPrivacyInput = function({
  value,
  onChange,
  currentUser,
  currency = "₹"
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);

  const handleVerifyPassword = (e) => {
    if (e) e.preventDefault();
    if (!passwordInput) {
      setErrorMsg("Please enter your password.");
      return;
    }
    const isValid = (currentUser && passwordInput === currentUser.password) || passwordInput === "Passwd@123";
    if (!isValid) {
      setErrorMsg("Incorrect password. Please try again.");
      return;
    }
    setIsUnlocked(true);
    setShowPromptModal(false);
    setPasswordInput("");
    setErrorMsg("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-slate-600 font-bold block">Monthly Net Salary ({currency})</label>
        {isUnlocked ? (
          <button
            type="button"
            onClick={() => setIsUnlocked(false)}
            className="text-[10px] text-slate-400 hover:text-slate-600 font-bold underline"
          >
            [Lock Salary]
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { setPasswordInput(""); setErrorMsg(""); setShowPromptModal(true); }}
            className="text-[10px] text-[#9B111E] hover:underline font-bold flex items-center space-x-1"
          >
            <span>{window.getIconComponent('lock', { size: 10 })}</span>
            <span>Unlock to View/Edit</span>
          </button>
        )}
      </div>

      {isUnlocked ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full p-2.5 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
        />
      ) : (
        <div
          onClick={() => { setPasswordInput(""); setErrorMsg(""); setShowPromptModal(true); }}
          className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer flex items-center justify-between"
          title="Click to enter password and unlock"
        >
          <span className="font-mono text-slate-400 tracking-widest text-sm">••••••••••</span>
          <span className="text-xs font-bold text-[#9B111E] flex items-center space-x-1">
            <span>{window.getIconComponent('eye', { size: 13 })}</span>
            <span>Reveal</span>
          </span>
        </div>
      )}

      {/* Password Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-red-50 text-[#9B111E]">
                  {window.getIconComponent('lock', { size: 16 })}
                </span>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Verify Password</h4>
                  <p className="text-[10px] text-slate-400">Unlock salary editing</p>
                </div>
              </div>
              <button onClick={() => setShowPromptModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                {window.getIconComponent('x', { size: 16 })}
              </button>
            </div>

            <form onSubmit={handleVerifyPassword} className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">
                Enter password to view and edit your net monthly salary.
              </p>

              {errorMsg && (
                <div className="p-2 bg-red-50 border border-red-200 text-xs text-[#9B111E] font-semibold rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="relative">
                <input
                  type={showPasswordText ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password (e.g. Passwd@123)"
                  className="w-full p-2.5 pr-10 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {window.getIconComponent(showPasswordText ? 'eye-off' : 'eye', { size: 14 })}
                </button>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPromptModal(false)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Unlock Salary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. LIVE CAMERA CAPTURE MODAL (Opens Camera Viewfinder / Snaps Photos)
// ============================================================================
window.LiveCameraModal = function({
  onCapture,
  onClose,
  onOpenDeviceFilePicker
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // "user" or "environment"

  // Start Camera Stream
  const startCamera = async (mode) => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Camera API is not supported in this browser environment. Please use device camera or file browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode ? { ideal: mode } : "environment" },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
        setCameraActive(true);
      }
    } catch (err) {
      console.warn("Camera start warning:", err);
      setCameraError("Unable to access live camera viewfinder (" + (err.name || "Permission") + "). You can use the device camera or file explorer below.");
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Capture Snapshot from Video Frame
  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

      const snapName = `Camera_Bill_${new Date().toLocaleDateString('en-GB').replace(/\//g, '')}_${Date.now().toString().slice(-4)}.jpg`;
      onCapture(dataUrl, snapName);
    } catch (e) {
      alert("Error capturing snapshot. Please choose file from device.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col border border-slate-700 animate-scale-in">
        
        {/* Header */}
        <div className="p-3 sm:p-4 bg-slate-800/90 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#9B111E] text-white">
              {window.getIconComponent('camera', { size: 18 })}
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">Camera • Capture Bill / Receipt</h3>
              <p className="text-[10px] text-slate-300">Take a clear photo of your receipt or expense proof</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-full">
            {window.getIconComponent('x', { size: 20 })}
          </button>
        </div>

        {/* Camera Viewport Body */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[360px] overflow-hidden">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full max-h-[420px] object-cover"
            />
          ) : (
            <div className="p-6 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                {window.getIconComponent('camera', { size: 32 })}
              </div>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                {cameraError || "Initializing camera..."}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenDeviceFilePicker) onOpenDeviceFilePicker();
                }}
                className="px-4 py-2.5 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl text-xs font-bold shadow-md inline-flex items-center space-x-2"
              >
                <span>{window.getIconComponent('camera', { size: 16 })}</span>
                <span>Open Device Camera / Photos</span>
              </button>
            </div>
          )}

          {/* Viewfinder Target Guidelines */}
          {cameraActive && (
            <div className="absolute inset-4 pointer-events-none border-2 border-white/30 rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-l-2 border-emerald-400 absolute top-2 left-2"></div>
              <div className="w-12 h-12 border-t-2 border-r-2 border-emerald-400 absolute top-2 right-2"></div>
              <div className="w-12 h-12 border-b-2 border-l-2 border-emerald-400 absolute bottom-2 left-2"></div>
              <div className="w-12 h-12 border-b-2 border-r-2 border-emerald-400 absolute bottom-2 right-2"></div>
              <span className="text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded-full font-mono">
                Align Bill / Receipt Inside Frame
              </span>
            </div>
          )}
        </div>

        {/* Camera Controls Footer */}
        <div className="p-4 bg-slate-800 flex items-center justify-around border-t border-slate-700">
          
          {/* Flip / Switch Camera */}
          <button
            type="button"
            onClick={() => setFacingMode(facingMode === "user" ? "environment" : "user")}
            className="p-3 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition"
            title="Switch Front/Rear Camera"
          >
            {window.getIconComponent('refresh', { size: 20 })}
          </button>

          {/* Large Shutter Button */}
          <button
            type="button"
            onClick={cameraActive ? handleSnapPhoto : () => { onClose(); if (onOpenDeviceFilePicker) onOpenDeviceFilePicker(); }}
            className="w-16 h-16 rounded-full bg-[#9B111E] hover:bg-[#b01422] active:scale-95 border-4 border-white shadow-xl flex items-center justify-center transition"
            title="Take Photo"
          >
            <span className="w-6 h-6 rounded-full bg-white"></span>
          </button>

          {/* Direct File Picker Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenDeviceFilePicker) onOpenDeviceFilePicker();
            }}
            className="p-3 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition"
            title="Browse Device Files / Phone Camera"
          >
            {window.getIconComponent('smartphone', { size: 20 })}
          </button>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 4. FULL DEDICATED LOGIN PAGE COMPONENT
// ============================================================================
window.LoginPage = function({
  users,
  onLoginSuccess
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit (Handles Enter key automatically via form onSubmit)
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      setErrorMessage("No account registered with this email address.");
      setIsSubmitting(false);
      return;
    }

    if (user.password !== password) {
      setErrorMessage("Incorrect password. Default demo password is Passwd@123");
      setIsSubmitting(false);
      return;
    }

    if (user.status === 'inactive') {
      setErrorMessage(`Access Denied: The account for ${user.name} (${user.email}) is currently INACTIVE. Please contact admin@cashbook.com to reactivate access.`);
      setIsSubmitting(false);
      return;
    }

    // Success!
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(user);
    }, 200);
  };

  // Quick 1-Click Login for effortless testing
  const handleQuickLogin = (targetEmail, targetPassword) => {
    setEmail(targetEmail);
    setPassword(targetPassword);
    setErrorMessage(null);

    const user = users.find(u => u.email.toLowerCase() === targetEmail.toLowerCase());
    if (user) {
      if (user.status === 'inactive') {
        setErrorMessage(`Access Denied: The account for ${user.name} is currently INACTIVE.`);
        return;
      }
      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-[#7B0D18] flex items-center justify-center p-4 sm:p-6 text-slate-800 font-sans selection:bg-[#9B111E] selection:text-white">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-scale-in">
        
        {/* Top Header Banner */}
        <div className="bg-[#9B111E] p-6 text-white text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
          
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-[#9B111E] flex items-center justify-center font-extrabold text-2xl shadow-lg mb-3">
            ₹
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Personal Finance Cash Book
          </h1>
          <p className="text-xs text-red-100 font-medium mt-1">
            Salaried Money Management • IN / OUT Ledger
          </p>

          <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 bg-black/20 rounded-full text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Secure Salaried Portal</span>
          </div>
        </div>

        {/* Main Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-[#9B111E] flex items-start space-x-2 animate-fade-in">
              <span className="shrink-0 mt-0.5">{window.getIconComponent('x', { size: 14 })}</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-700 font-extrabold block mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cashbook.com or rahul@cashbook.com"
                  className="w-full p-3 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E] text-xs transition"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-extrabold block">
                  Password
                </label>
                <span className="text-[10px] text-slate-400">Demo: Passwd@123</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter account password"
                  className="w-full p-3 pr-10 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E] text-xs transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {window.getIconComponent(showPassword ? 'eye-off' : 'eye', { size: 16 })}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#9B111E] hover:bg-[#850d18] active:scale-[0.99] text-white font-extrabold italic text-sm tracking-widest uppercase rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>{window.getIconComponent('log-in', { size: 16 })}</span>
              <span>{isSubmitting ? "SIGNING IN..." : "SIGN IN TO CASH BOOK"}</span>
            </button>
          </form>

          {/* Quick Demo One-Click Accounts */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
              Quick 1-Click Demo Logins
            </p>

            <div className="space-y-2">
              
              {/* Admin Card */}
              <div
                onClick={() => handleQuickLogin("admin@cashbook.com", "Passwd@123")}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/80 cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-extrabold text-slate-900 text-xs">System Admin</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-purple-200 text-purple-900">
                        Admin
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">admin@cashbook.com • Full User & Status Control</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-700">Login →</span>
              </div>

              {/* Rahul Sharma Card */}
              <div
                onClick={() => handleQuickLogin("rahul@cashbook.com", "Passwd@123")}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#9B111E] text-white font-extrabold text-xs flex items-center justify-center">
                    RS
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-extrabold text-slate-900 text-xs">Rahul Sharma</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-800">
                        User
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">rahul@cashbook.com • Senior SWE @ TCS</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#9B111E]">Login →</span>
              </div>

              {/* Kiran Card */}
              <div
                onClick={() => handleQuickLogin("akash@cashbook.com", "Passwd@123")}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center">
                    K
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-extrabold text-slate-900 text-xs">Kiran</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-800">
                        User
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">akash@cashbook.com • Marketing Manager @ Infosys</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-700">Login →</span>
              </div>

            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] text-slate-400">
              Admin can create new users, manage existing profiles, and toggle active/inactive access.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};


// ===== FILE: src/components.js =====
// Core Components for Personal Finance Management Tool
// Built with React 18, Tailwind CSS, and Clean Interactive UI

// Utility for currency formatting (Indian Rupee format: ₹ 1,23,456)
window.formatCurrency = function(amount, symbol = "₹") {
  if (amount === undefined || amount === null || isNaN(amount)) return `${symbol} 0`;
  const num = Math.round(Number(amount));
  return `${symbol} ${num.toLocaleString('en-IN')}`;
};

// Format Date nicely (e.g. "07 Nov 26")
window.formatDateDisplay = function(dateStr) {
  if (!dateStr) return "07 Nov 26";
  try {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    return `${day} ${month} ${year}`;
  } catch (e) {
    return dateStr;
  }
};

// ============================================================================
// 1. CASH BOOK ENTRY SCREEN (Pixel-perfect match to reference screenshot)
// Responsive across Mobile, Tablet, and Desktop viewports
// ============================================================================
window.CashBookEntry = function({
  mode, // 'IN' or 'OUT'
  onBack,
  onSave,
  categories,
  onAddCategory,
  sampleAttachments,
  deviceMode = 'mobile', // 'mobile' | 'tablet' | 'desktop'
  initialTransaction = null // Optional transaction for EDIT mode
}) {
  const isEditing = !!initialTransaction;
  const [amountStr, setAmountStr] = useState(initialTransaction ? String(initialTransaction.amount) : "100");
  const [calcExpression, setCalcExpression] = useState(initialTransaction ? String(initialTransaction.amount) : "100");
  const [selectedCategory, setSelectedCategory] = useState(
    initialTransaction
      ? (categories.find(c => c.id === initialTransaction.categoryId || c.name.toLowerCase() === initialTransaction.categoryName.toLowerCase()) || null)
      : null
  );
  const [comment, setComment] = useState(initialTransaction ? (initialTransaction.comment || "") : "");
  const [date, setDate] = useState(initialTransaction ? initialTransaction.date : "2026-11-07");
  const [attachments, setAttachments] = useState(initialTransaction ? (initialTransaction.attachments || []) : []);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showLiveCamera, setShowLiveCamera] = useState(false);

  // Hidden file inputs for Camera and PDF Explorer
  const photoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Set default category on mount if not editing
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      if (initialTransaction) {
        const found = categories.find(c => c.id === initialTransaction.categoryId || c.name.toLowerCase() === initialTransaction.categoryName.toLowerCase());
        if (found) setSelectedCategory(found);
      } else if (mode === 'OUT') {
        const defaultCat = categories.find(c => c.name.toLowerCase().includes('home') || c.name.toLowerCase().includes('grocer') || c.name.toLowerCase().includes('rent')) || categories[0];
        setSelectedCategory(defaultCat);
      } else {
        const defaultCat = categories.find(c => c.name.toLowerCase().includes('salary')) || categories[0];
        setSelectedCategory(defaultCat);
      }
    }
  }, [categories, mode, initialTransaction]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Safe Calculator Evaluation
  const evaluateExpression = (expr) => {
    try {
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100');
      sanitized = sanitized.replace(/[\+\-\*\/]+$/, '');
      if (!sanitized) return 0;
      if (/^[0-9\.\+\-\*\/\s\(\)]+$/.test(sanitized)) {
        const res = new Function(`return (${sanitized})`)();
        if (isFinite(res)) {
          return Math.max(0, Math.round(res * 100) / 100);
        }
      }
      return parseFloat(sanitized) || 0;
    } catch (e) {
      return parseFloat(amountStr) || 0;
    }
  };

  // Keypad click handler
  const handleKeyClick = (key) => {
    if (navigator.vibrate) navigator.vibrate(10);

    if (key === 'C') {
      setAmountStr("0");
      setCalcExpression("0");
      return;
    }

    if (key === 'BACKSPACE') {
      let cur = calcExpression.toString();
      if (cur.length <= 1 || cur === "0") {
        setAmountStr("0");
        setCalcExpression("0");
      } else {
        const next = cur.slice(0, -1);
        setCalcExpression(next);
        const evalVal = evaluateExpression(next);
        setAmountStr(String(evalVal));
      }
      return;
    }

    if (key === 'M+') {
      const curNum = parseFloat(amountStr) || 0;
      const newMem = memoryValue + curNum;
      setMemoryValue(newMem);
      showToast(`Added ₹${curNum} to Memory (M = ₹${newMem})`);
      return;
    }

    if (key === 'M-') {
      const curNum = parseFloat(amountStr) || 0;
      const newMem = Math.max(0, memoryValue - curNum);
      setMemoryValue(newMem);
      showToast(`Subtracted ₹${curNum} from Memory (M = ₹${newMem})`);
      return;
    }

    if (key === '=') {
      const res = evaluateExpression(calcExpression);
      setAmountStr(String(res));
      setCalcExpression(String(res));
      return;
    }

    if (['+', '-', '×', '÷', '%'].includes(key)) {
      const lastChar = calcExpression.slice(-1);
      if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
        setCalcExpression(calcExpression.slice(0, -1) + key);
      } else {
        setCalcExpression(calcExpression + key);
      }
      return;
    }

    // Number or dot
    if (calcExpression === "0" && key !== ".") {
      setCalcExpression(key);
      setAmountStr(key);
    } else {
      if (key === "." && calcExpression.includes(".")) {
        const parts = calcExpression.split(/[\+\-\×\÷]/);
        if (parts[parts.length - 1].includes(".")) return;
      }
      const next = calcExpression + key;
      setCalcExpression(next);
      const evalVal = evaluateExpression(next);
      setAmountStr(String(evalVal));
    }
  };

  // Handle Save / Update (Save data on enter or button click)
  const handleSaveClick = () => {
    const finalAmount = evaluateExpression(calcExpression);
    if (!finalAmount || finalAmount <= 0) {
      showToast("Please enter an amount greater than 0");
      return;
    }
    if (!selectedCategory) {
      showToast("Please select a category");
      return;
    }

    const txToSave = {
      id: initialTransaction ? initialTransaction.id : ("tx-" + Date.now()),
      userId: initialTransaction ? initialTransaction.userId : undefined,
      type: mode, // 'IN' or 'OUT'
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      amount: finalAmount,
      date: date,
      time: initialTransaction ? (initialTransaction.time || "12:00 PM") : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      comment: comment.trim() || (mode === 'IN' ? `${selectedCategory.name} received` : `${selectedCategory.name} expense`),
      attachments: attachments
    };

    onSave(txToSave, isEditing);
  };

  // Physical Keyboard Support: MAKE SAVE DATA ON ENTER
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If typing in input or textarea
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        // Pressing Enter inside description/comment field saves transaction data immediately!
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSaveClick();
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        handleKeyClick(e.key);
      } else if (e.key === '.') {
        handleKeyClick('.');
      } else if (e.key === '+') {
        handleKeyClick('+');
      } else if (e.key === '-') {
        handleKeyClick('-');
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        handleKeyClick('×');
      } else if (e.key === '/') {
        handleKeyClick('÷');
      } else if (e.key === '%') {
        handleKeyClick('%');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        // Pressing Enter on physical keyboard saves data!
        handleSaveClick();
      } else if (e.key === '=') {
        e.preventDefault();
        handleKeyClick('=');
      } else if (e.key === 'Backspace') {
        handleKeyClick('BACKSPACE');
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleKeyClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calcExpression, amountStr, memoryValue, selectedCategory, comment, date, attachments]);

  // ON ADD PHOTO: OPEN CAMERA
  const handleOpenPhotoCamera = () => {
    if (attachments.length >= 4) {
      showToast("Maximum 4 attachments allowed");
      return;
    }
    // Open camera modal with live viewfinder & mobile camera trigger
    setShowLiveCamera(true);
  };

  // Handle Photo captured from live camera modal
  const handleCaptureLiveCamera = (dataUrl, snapName) => {
    if (attachments.length >= 4) {
      showToast("Maximum 4 attachments allowed");
      return;
    }
    const newAtt = {
      id: "att-" + Date.now(),
      name: snapName || `Camera_Bill_${new Date().toISOString().slice(0, 10)}.jpg`,
      type: "photo",
      size: "350 KB",
      preview: dataUrl
    };
    setAttachments(prev => [...prev, newAtt]);
    showToast(`✓ Camera photo captured & attached!`);
    setShowLiveCamera(false);
  };

  // Handle Photo selected via file picker / mobile native camera
  const handlePhotoFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (attachments.length >= 4) {
      showToast("Maximum 4 attachments allowed");
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const sizeStr = file.size ? `${(file.size / 1024).toFixed(0)} KB` : "420 KB";
      const newAtt = {
        id: "att-" + Date.now(),
        name: file.name || `Camera_Photo_${new Date().toISOString().slice(0, 10)}.jpg`,
        type: "photo",
        size: sizeStr,
        preview: loadEvt.target.result
      };
      setAttachments(prev => [...prev, newAtt]);
      showToast(`✓ Photo attached: ${newAtt.name}`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ON ADD PDF: OPEN FILE EXPLORER FOR ATTACHED FILE
  const handleOpenPdfExplorer = () => {
    if (attachments.length >= 4) {
      showToast("Maximum 4 attachments allowed");
      return;
    }
    // Triggers OS File Explorer dialog specifically for PDF files
    if (pdfInputRef.current) {
      pdfInputRef.current.click();
    }
  };

  // Handle PDF selected via File Explorer
  const handlePdfFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (attachments.length >= 4) {
      showToast("Maximum 4 attachments allowed");
      return;
    }
    const sizeStr = file.size ? `${(file.size / 1024).toFixed(0)} KB` : "620 KB";
    const newAtt = {
      id: "att-" + Date.now(),
      name: file.name,
      type: "pdf",
      size: sizeStr
    };
    setAttachments(prev => [...prev, newAtt]);
    showToast(`✓ Attached PDF: ${file.name}`);
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    return categories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase().trim()));
  }, [categories, categorySearch]);

  const exactCategoryMatch = useMemo(() => {
    return categories.some(c => c.name.toLowerCase() === categorySearch.toLowerCase().trim());
  }, [categories, categorySearch]);

  // Handle inline category creation
  const handleCreateInlineCategory = () => {
    if (!categorySearch.trim()) return;
    const newCat = {
      id: `${mode.toLowerCase()}-${Date.now()}`,
      name: categorySearch.trim(),
      icon: mode === 'IN' ? 'wallet' : 'shopping-cart',
      color: mode === 'IN' ? '#059669' : '#DC2626',
      group: mode === 'IN' ? 'Secondary Income' : 'Personal'
    };
    onAddCategory(newCat, mode);
    setSelectedCategory(newCat);
    setIsCategoryPickerOpen(false);
    setCategorySearch("");
    showToast(`Created & selected "${newCat.name}"`);
  };

  // Header Title matching screenshot
  const headerActionText = mode === 'OUT' ? 'You gave' : 'You received';
  const headerPreposition = mode === 'OUT' ? 'to' : 'from';
  const categoryDisplayName = selectedCategory ? selectedCategory.name.toLowerCase() : (mode === 'OUT' ? 'home expense' : 'income');
  const displayAmount = evaluateExpression(calcExpression);

  // Is widescreen desktop mode
  const isDesktop = deviceMode === 'desktop';

  // Calculator Keypad JSX (Shared across mobile, tablet, and desktop)
  const CalculatorKeypad = (
    <div className="grid grid-cols-4 gap-1.5 text-slate-800 font-bold select-none text-base">
      {/* ROW 1: C, M+, M-, Backspace */}
      <button
        onClick={() => handleKeyClick('C')}
        className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-sm shadow-xs transition"
      >
        C
      </button>
      <button
        onClick={() => handleKeyClick('M+')}
        className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-sm shadow-xs transition"
      >
        M+
      </button>
      <button
        onClick={() => handleKeyClick('M-')}
        className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-sm shadow-xs transition"
      >
        M-
      </button>
      <button
        onClick={() => handleKeyClick('BACKSPACE')}
        className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center shadow-xs transition"
        title="Backspace"
      >
        {window.getIconComponent('backspace', { size: 18 })}
      </button>

      {/* ROW 2: 7, 8, 9, and split [÷ | %] */}
      <button
        onClick={() => handleKeyClick('7')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        7
      </button>
      <button
        onClick={() => handleKeyClick('8')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        8
      </button>
      <button
        onClick={() => handleKeyClick('9')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        9
      </button>
      
      <div className="grid grid-cols-2 gap-1">
        <button
          onClick={() => handleKeyClick('÷')}
          className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-sm shadow-xs transition"
        >
          ÷
        </button>
        <button
          onClick={() => handleKeyClick('%')}
          className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-xs shadow-xs transition"
        >
          %
        </button>
      </div>

      {/* ROW 3: 4, 5, 6, × */}
      <button
        onClick={() => handleKeyClick('4')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        4
      </button>
      <button
        onClick={() => handleKeyClick('5')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        5
      </button>
      <button
        onClick={() => handleKeyClick('6')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        6
      </button>
      <button
        onClick={() => handleKeyClick('×')}
        className="h-10 md:h-11 rounded-lg bg-[#D4E4F7] hover:bg-[#c4daf3] active:bg-[#b0cdf0] text-slate-800 flex items-center justify-center font-bold text-sm shadow-xs transition"
      >
        ×
      </button>

      {/* ROW 4: 1, 2, 3, - */}
      <button
        onClick={() => handleKeyClick('1')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        1
      </button>
      <button
        onClick={() => handleKeyClick('2')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        2
      </button>
      <button
        onClick={() => handleKeyClick('3')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        3
      </button>
      <button
        onClick={() => handleKeyClick('-')}
        className="h-10 md:h-11 rounded-lg bg-[#0C5BA6] hover:bg-[#0a4d8d] active:bg-[#083e72] text-white flex items-center justify-center font-bold text-lg shadow-xs transition"
      >
        -
      </button>

      {/* ROW 5: 0, ., =, + */}
      <button
        onClick={() => handleKeyClick('0')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        0
      </button>
      <button
        onClick={() => handleKeyClick('.')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        .
      </button>
      <button
        onClick={() => handleKeyClick('=')}
        className="h-10 md:h-11 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shadow-xs transition"
      >
        =
      </button>
      <button
        onClick={() => handleKeyClick('+')}
        className="h-10 md:h-11 rounded-lg bg-[#0C5BA6] hover:bg-[#0a4d8d] active:bg-[#083e72] text-white flex items-center justify-center font-bold text-lg shadow-xs transition"
      >
        +
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] select-none relative font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur animate-fade-in flex items-center space-x-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER - Matches Screenshot */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center flex-1 overflow-hidden">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#9B111E] active:opacity-70 transition hover:bg-red-50 rounded-full shrink-0"
            title="Back to Cash Book"
          >
            {window.getIconComponent('arrow-left', { size: 24, className: 'stroke-[2.5]' })}
          </button>

          <div className="ml-3 flex-1 overflow-hidden pr-2">
            <button
              onClick={() => setIsCategoryPickerOpen(true)}
              className="text-left w-full group flex items-center space-x-1.5 focus:outline-hidden"
            >
              <h1 className="text-lg md:text-xl font-extrabold italic text-[#9B111E] tracking-tight truncate leading-tight">
                {headerActionText} ₹ {displayAmount} {headerPreposition} <span className="underline decoration-dotted underline-offset-4 group-hover:text-red-700">{categoryDisplayName}</span>
              </h1>
              <span className="text-[#9B111E] opacity-60 text-xs">▼</span>
            </button>
          </div>
        </div>

        {/* Desktop Keyboard Tip Pill */}
        {isDesktop && (
          <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full shrink-0 hidden md:inline-block">
            Keyboard enabled (0-9, +, -, *, /, Enter)
          </span>
        )}
      </div>

      {/* MAIN BODY: ADAPTS RESPONSIVELY FOR DESKTOP VS MOBILE/TABLET */}
      {isDesktop ? (
        // DESKTOP DUAL-COLUMN LAYOUT
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-12 gap-6 max-w-5xl mx-auto w-full items-start">
          
          {/* LEFT COLUMN: Transaction Form Details */}
          <div className="col-span-7 space-y-4">
            
            {/* 1. Large Amount Input Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Transaction Amount
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-extrabold italic text-[#9B111E]">₹</span>
                <span className="text-3xl md:text-4xl font-extrabold italic text-[#9B111E] tracking-tight">
                  {calcExpression || "0"}
                </span>
              </div>

              {calcExpression && calcExpression !== String(displayAmount) && (
                <div className="text-xs font-semibold text-slate-500 mt-1 italic">
                  Calculated Total = ₹ {displayAmount}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-medium">Category:</span>
                  <button
                    onClick={() => setIsCategoryPickerOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#9B111E] hover:bg-red-100 transition"
                  >
                    {selectedCategory && (
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedCategory.color || '#9B111E' }}></span>
                    )}
                    <span>{selectedCategory ? selectedCategory.name : "Select Category"}</span>
                    {window.getIconComponent('chevron-down', { size: 12 })}
                  </button>
                </div>

                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${mode === 'OUT' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {mode === 'OUT' ? 'Expense' : 'Income'}
                </span>
              </div>
            </div>

            {/* 2. Details Card (Save on Enter) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
              <label className="text-xs font-bold text-slate-500 block mb-1">Description / Notes</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveClick();
                  }
                }}
                placeholder="Enter details (Items, bill no., quantity, etc.) • Press Enter to Save"
                className="w-full text-sm font-medium italic text-slate-700 placeholder:text-slate-400 placeholder:italic focus:outline-hidden bg-transparent"
              />
            </div>

            {/* 3. Date & Attachments */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Transaction Date</span>
                <button
                  onClick={() => setShowDatePickerModal(true)}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <span className="text-[#9B111E]">{window.getIconComponent('calendar', { size: 14 })}</span>
                  <span>{window.formatDateDisplay(date)}</span>
                  <span className="text-[#9B111E] text-[10px]">▼</span>
                </button>
              </div>

              {/* Attachments */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="italic flex items-center space-x-1">
                    <span>{window.getIconComponent('paperclip', { size: 14 })}</span>
                    <span>Attach bills (max 4)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{attachments.length}/4 attached</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    onClick={handleOpenPhotoCamera}
                    disabled={attachments.length >= 4}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition active:scale-95"
                    title="Open Camera to capture bill photo"
                  >
                    <span className="text-[#9B111E]">{window.getIconComponent('camera', { size: 15 })}</span>
                    <span>Add photo (Camera)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenPdfExplorer}
                    disabled={attachments.length >= 4}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition active:scale-95"
                    title="Open File Explorer to attach PDF"
                  >
                    <span className="text-[#9B111E]">{window.getIconComponent('file-text', { size: 15 })}</span>
                    <span>Add PDF (Explorer)</span>
                  </button>
                </div>

                {attachments.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center space-x-2 overflow-hidden pr-1">
                          {att.preview ? (
                            <img src={att.preview} alt="" className="w-6 h-6 object-cover rounded-sm shrink-0 border border-slate-200" />
                          ) : (
                            <span className="text-[#9B111E] shrink-0">
                              {att.type === 'pdf' ? window.getIconComponent('file-text', { size: 14 }) : window.getIconComponent('camera', { size: 14 })}
                            </span>
                          )}
                          <span className="font-medium text-slate-700 truncate">{att.name}</span>
                        </div>
                        <button onClick={() => removeAttachment(idx)} className="p-1 text-slate-400 hover:text-red-600">
                          {window.getIconComponent('x', { size: 12 })}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop SAVE Button */}
            <button
              onClick={handleSaveClick}
              className="w-full py-3.5 bg-[#9B111E] hover:bg-[#880b19] active:scale-[0.99] text-white font-extrabold italic text-base tracking-widest uppercase rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>{isEditing ? 'UPDATE TRANSACTION' : 'SAVE TRANSACTION'}</span>
            </button>
          </div>

          {/* RIGHT COLUMN: Numeric Keypad for Desktop */}
          <div className="col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Calculator Keypad
              </span>
              <span className="text-[10px] text-slate-400">
                Memory: ₹{memoryValue}
              </span>
            </div>

            {CalculatorKeypad}

            <p className="text-[11px] text-slate-400 italic text-center pt-2">
              Tip: You can use your physical computer keyboard or the buttons above.
            </p>
          </div>

        </div>
      ) : (
        // MOBILE & TABLET VERTICAL STACKED LAYOUT (100% Matching Screenshot)
        <>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
            
            {/* 1. Large Amount Input Card */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition relative">
              <div className="flex items-center space-x-2">
                <span className="text-2xl md:text-3xl font-extrabold italic text-[#9B111E]">₹</span>
                <span className="text-2xl md:text-3xl font-extrabold italic text-[#9B111E] tracking-tight">
                  {calcExpression || "0"}
                </span>
              </div>

              {calcExpression && calcExpression !== String(displayAmount) && (
                <div className="text-xs font-medium text-slate-500 mt-1 italic">
                  = ₹ {displayAmount}
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-medium">Category:</span>
                  <button
                    onClick={() => setIsCategoryPickerOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#9B111E] hover:bg-red-100 transition"
                  >
                    {selectedCategory && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCategory.color || '#9B111E' }}></span>
                    )}
                    <span>{selectedCategory ? selectedCategory.name : "Select Category"}</span>
                    {window.getIconComponent('chevron-down', { size: 12 })}
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${mode === 'OUT' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {mode === 'OUT' ? 'Expense' : 'Income'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Details Card (Save on Enter) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveClick();
                  }
                }}
                placeholder="Enter details (Items, bill no., etc.) • Enter to Save"
                className="w-full text-sm font-medium italic text-slate-700 placeholder:text-slate-400 placeholder:italic focus:outline-hidden bg-transparent"
              />
            </div>

            {/* 3. Date Selector Pill */}
            <div className="flex items-center">
              <button
                onClick={() => setShowDatePickerModal(true)}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 shadow-2xs transition"
              >
                <span className="text-[#9B111E]">
                  {window.getIconComponent('calendar', { size: 15 })}
                </span>
                <span className="tracking-wide">{window.formatDateDisplay(date)}</span>
                <span className="text-[#9B111E] text-[10px]">▼</span>
              </button>
            </div>

            {/* 4. Attachments */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600">
                <span className="text-slate-400">
                  {window.getIconComponent('paperclip', { size: 16 })}
                </span>
                <span className="italic">Attach bills (max 4)</span>
                <span className="text-[10px] text-slate-400 ml-1">({attachments.length}/4)</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  type="button"
                  onClick={handleOpenPhotoCamera}
                  disabled={attachments.length >= 4}
                  className={`flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 bg-white rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 shadow-2xs transition active:scale-95 ${attachments.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Open Camera to snap bill"
                >
                  <span className="text-[#9B111E]">
                    {window.getIconComponent('camera', { size: 16 })}
                  </span>
                  <span>Add photo (Camera)</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenPdfExplorer}
                  disabled={attachments.length >= 4}
                  className={`flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 bg-white rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 shadow-2xs transition active:scale-95 ${attachments.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Open File Explorer for PDF"
                >
                  <span className="text-[#9B111E]">
                    {window.getIconComponent('file-text', { size: 16 })}
                  </span>
                  <span>Add PDF (Explorer)</span>
                </button>
              </div>

              {attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs shadow-2xs">
                      <div className="flex items-center space-x-1.5 overflow-hidden pr-1">
                        {att.preview ? (
                          <img src={att.preview} alt="" className="w-5 h-5 object-cover rounded-sm shrink-0 border border-slate-200" />
                        ) : (
                          <span className="text-[#9B111E] shrink-0">
                            {att.type === 'pdf' ? window.getIconComponent('file-text', { size: 14 }) : window.getIconComponent('camera', { size: 14 })}
                          </span>
                        )}
                        <span className="font-medium text-slate-700 truncate">{att.name}</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(idx)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 shrink-0"
                        title="Remove attachment"
                      >
                        {window.getIconComponent('x', { size: 14 })}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FIXED BOTTOM SECTION ON MOBILE / TABLET: SAVE BUTTON + CUSTOM NUMERIC KEYPAD */}
          <div className="bg-[#EDF2F7] border-t border-slate-200/80 p-2 space-y-2 shrink-0 shadow-lg">
            <button
              onClick={handleSaveClick}
              className="w-full py-3 bg-[#9B111E] hover:bg-[#880b19] active:bg-[#730814] text-white font-extrabold italic text-sm tracking-widest uppercase rounded-lg shadow-md transition active:scale-[0.99] flex items-center justify-center space-x-1.5"
            >
              <span>{isEditing ? 'UPDATE TRANSACTION' : 'SAVE'}</span>
            </button>
            {CalculatorKeypad}
          </div>
        </>
      )}

      {/* INLINE CATEGORY SELECTOR & CREATOR MODAL */}
      {isCategoryPickerOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl animate-slide-up">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Select {mode === 'OUT' ? 'Expense' : 'Income'} Category
                </h3>
                <p className="text-xs text-slate-500">Search existing or create a new category inline</p>
              </div>
              <button
                onClick={() => { setIsCategoryPickerOpen(false); setCategorySearch(""); }}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                {window.getIconComponent('x', { size: 20 })}
              </button>
            </div>

            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {window.getIconComponent('search', { size: 16 })}
                </span>
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder={`Search ${mode === 'OUT' ? 'expense' : 'income'} categories...`}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
                  autoFocus
                />
              </div>

              {categorySearch.trim() && !exactCategoryMatch && (
                <button
                  onClick={handleCreateInlineCategory}
                  className="mt-2 w-full flex items-center justify-center space-x-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-[#9B111E] rounded-lg text-xs font-bold transition"
                >
                  {window.getIconComponent('plus', { size: 14 })}
                  <span>Add "{categorySearch.trim()}" as new category</span>
                </button>
              )}
            </div>

            <div className="overflow-y-auto p-3 space-y-2 flex-1">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  No categories found. Tap "+ Add" above to create it!
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredCategories.map((cat) => {
                    const isSelected = selectedCategory && selectedCategory.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryPickerOpen(false);
                          setCategorySearch("");
                        }}
                        className={`flex items-center space-x-2.5 p-2.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'border-[#9B111E] bg-red-50/60 ring-1 ring-[#9B111E]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: cat.color || '#9B111E' }}
                        >
                          {window.getIconComponent(cat.icon || 'tags', { size: 16 })}
                        </span>
                        <div className="overflow-hidden">
                          <p className={`text-xs font-bold truncate ${isSelected ? 'text-[#9B111E]' : 'text-slate-800'}`}>
                            {cat.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">{cat.group || 'General'}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DATE PICKER MODAL */}
      {showDatePickerModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl animate-scale-in">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">Select Transaction Date</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E] mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setDate("2026-11-07");
                  setShowDatePickerModal(false);
                }}
                className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-lg"
              >
                Today (07 Nov)
              </button>
              <button
                onClick={() => setShowDatePickerModal(false)}
                className="flex-1 py-1.5 px-3 bg-[#9B111E] hover:bg-[#880b19] text-xs font-bold text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Native File Inputs for Camera & PDF Explorer */}
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        capture="environment"
        onChange={handlePhotoFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={pdfInputRef}
        accept=".pdf,application/pdf"
        onChange={handlePdfFileChange}
        className="hidden"
      />

      {/* Live Camera Viewfinder Modal */}
      {showLiveCamera && (
        <window.LiveCameraModal
          onCapture={handleCaptureLiveCamera}
          onClose={() => setShowLiveCamera(false)}
          onOpenDeviceFilePicker={() => {
            setShowLiveCamera(false);
            if (photoInputRef.current) photoInputRef.current.click();
          }}
        />
      )}

    </div>
  );
};


// ===== FILE: src/views.js =====
// Main Views for Personal Finance Management Tool:
// Dashboard, CashBook Overview, Reports, Categories Management, and Profile / Settings

// ============================================================================
// 2. CASH BOOK OVERVIEW SCREEN
// ============================================================================
window.CashBookOverview = function({
  transactions,
  onOpenEntry,
  onDeleteTransaction,
  onEditTransaction,
  currency = "₹"
}) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'IN' | 'OUT'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxForDetail, setSelectedTxForDetail] = useState(null);

  // Month summary for November 2026
  const currentMonthStats = useMemo(() => {
    let totalIn = 0;
    let totalOut = 0;
    transactions.forEach(tx => {
      // consider Nov 2026
      if (tx.date.startsWith('2026-11')) {
        if (tx.type === 'IN') totalIn += Number(tx.amount);
        if (tx.type === 'OUT') totalOut += Number(tx.amount);
      }
    });
    return {
      totalIn,
      totalOut,
      netBalance: totalIn - totalOut
    };
  }, [transactions]);

  // Filtered transactions sorted chronologically (newest first)
  const filteredList = useMemo(() => {
    return transactions
      .filter(tx => {
        if (filterType !== 'ALL' && tx.type !== filterType) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCat = tx.categoryName.toLowerCase().includes(q);
          const matchComment = tx.comment ? tx.comment.toLowerCase().includes(q) : false;
          const matchAmount = String(tx.amount).includes(q);
          return matchCat || matchComment || matchAmount;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filterType, searchQuery]);

  // Compute running balance starting from baseline
  const listWithRunningBalance = useMemo(() => {
    // Sort oldest first to compute cumulative
    const sortedOldest = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let running = 0;
    const balanceMap = {};
    sortedOldest.forEach(tx => {
      if (tx.type === 'IN') running += Number(tx.amount);
      else running -= Number(tx.amount);
      balanceMap[tx.id] = running;
    });

    return filteredList.map(tx => ({
      ...tx,
      runningBalance: balanceMap[tx.id] || 0
    }));
  }, [filteredList, transactions]);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#9B111E] to-[#7B0D18] text-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">Cash Book • November 2026</span>
            <h2 className="text-xl font-extrabold tracking-tight">Daily Cash & Bank Ledger</h2>
          </div>
          <span className="text-xs px-2.5 py-1 bg-white/20 backdrop-blur rounded-full font-bold">
            {transactions.length} entries
          </span>
        </div>

        {/* 3-Part Quick Summary Card */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20 text-center">
          <div className="bg-black/15 p-2 rounded-lg">
            <p className="text-[10px] text-emerald-200 font-medium uppercase">Total IN</p>
            <p className="text-xs md:text-sm font-extrabold text-emerald-300 truncate">
              +{window.formatCurrency(currentMonthStats.totalIn, currency)}
            </p>
          </div>
          <div className="bg-black/15 p-2 rounded-lg">
            <p className="text-[10px] text-red-200 font-medium uppercase">Total OUT</p>
            <p className="text-xs md:text-sm font-extrabold text-red-300 truncate">
              -{window.formatCurrency(currentMonthStats.totalOut, currency)}
            </p>
          </div>
          <div className="bg-black/15 p-2 rounded-lg">
            <p className="text-[10px] text-sky-200 font-medium uppercase">Net Balance</p>
            <p className="text-xs md:text-sm font-extrabold text-white truncate">
              {window.formatCurrency(currentMonthStats.netBalance, currency)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* TWO PROMINENT ACTION BUTTONS/CARDS: IN vs OUT (Mandatory Feature) */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* IN CARD - Money Received */}
          <button
            onClick={() => onOpenEntry('IN')}
            className="group relative overflow-hidden bg-white hover:bg-emerald-50/50 active:scale-[0.98] border-2 border-emerald-500 rounded-2xl p-4 text-left shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition">
                +
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Income
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
              IN
            </h3>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              Money Received
            </p>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
              Salary, Bonus, Freelancing, Gifts
            </p>
          </button>

          {/* OUT CARD - Money Spent (Matches Dark Red Theme) */}
          <button
            onClick={() => onOpenEntry('OUT')}
            className="group relative overflow-hidden bg-white hover:bg-red-50/50 active:scale-[0.98] border-2 border-[#9B111E] rounded-2xl p-4 text-left shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-10 h-10 rounded-xl bg-red-100 text-[#9B111E] flex items-center justify-center font-extrabold text-lg shadow-2xs group-hover:bg-[#9B111E] group-hover:text-white transition">
                -
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                Expense
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#9B111E] transition">
              OUT
            </h3>
            <p className="text-xs font-semibold text-[#9B111E] mt-0.5">
              Money Spent
            </p>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
              Rent, EMI, Food, Bills, Fuel
            </p>
          </button>

        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {window.getIconComponent('search', { size: 16 })}
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category, details, amount..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {window.getIconComponent('x', { size: 14 })}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filterType === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType('IN')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filterType === 'IN'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              IN Only
            </button>
            <button
              onClick={() => setFilterType('OUT')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filterType === 'OUT'
                  ? 'bg-[#9B111E] text-white'
                  : 'bg-red-50 text-[#9B111E] hover:bg-red-100'
              }`}
            >
              OUT Only
            </button>
          </div>
        </div>

        {/* CHRONOLOGICAL TRANSACTION LEDGER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Transaction Ledger</span>
            <span>{listWithRunningBalance.length} Records</span>
          </div>

          {listWithRunningBalance.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                {window.getIconComponent('book-open', { size: 24 })}
              </div>
              <p className="text-sm font-bold text-slate-700">No transactions match your filter</p>
              <p className="text-xs text-slate-400 mt-1">Try changing filters or record an IN/OUT entry above.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {listWithRunningBalance.map((tx) => {
                const isIncome = tx.type === 'IN';
                return (
                  <div
                    key={tx.id}
                    onClick={() => setSelectedTxForDetail(tx)}
                    className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300 transition cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden pr-2">
                      {/* IN/OUT Badge Icon */}
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                        isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#9B111E]'
                      }`}>
                        {isIncome ? 'IN' : 'OUT'}
                      </span>

                      <div className="overflow-hidden">
                        <div className="flex items-center space-x-1.5">
                          <p className="text-xs md:text-sm font-bold text-slate-900 truncate">
                            {tx.categoryName}
                          </p>
                          {tx.attachments && tx.attachments.length > 0 && (
                            <span className="text-slate-400 shrink-0" title={`${tx.attachments.length} attachment(s)`}>
                              {window.getIconComponent('paperclip', { size: 12 })}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {tx.comment || `${tx.categoryName} entry`}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {window.formatDateDisplay(tx.date)} {tx.time ? `• ${tx.time}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Amount & Running Balance */}
                    <div className="text-right shrink-0">
                      <p className={`text-sm md:text-base font-extrabold italic tracking-tight ${
                        isIncome ? 'text-emerald-600' : 'text-[#9B111E]'
                      }`}>
                        {isIncome ? '+' : '-'}{window.formatCurrency(tx.amount, currency)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        Bal: {window.formatCurrency(tx.runningBalance, currency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* TRANSACTION DETAIL MODAL */}
      {selectedTxForDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                selectedTxForDetail.type === 'IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedTxForDetail.type === 'IN' ? 'Money Received (IN)' : 'Money Spent (OUT)'}
              </span>
              <button
                onClick={() => setSelectedTxForDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                {window.getIconComponent('x', { size: 18 })}
              </button>
            </div>

            <div className="py-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Transaction Amount</p>
              <h2 className={`text-3xl font-extrabold italic tracking-tight my-1 ${
                selectedTxForDetail.type === 'IN' ? 'text-emerald-600' : 'text-[#9B111E]'
              }`}>
                {selectedTxForDetail.type === 'IN' ? '+' : '-'}{window.formatCurrency(selectedTxForDetail.amount, currency)}
              </h2>
              <p className="text-sm font-bold text-slate-800">{selectedTxForDetail.categoryName}</p>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time</span>
                <span className="font-bold text-slate-700">{window.formatDateDisplay(selectedTxForDetail.date)} {selectedTxForDetail.time || ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Running Balance</span>
                <span className="font-bold text-slate-700">{window.formatCurrency(selectedTxForDetail.runningBalance, currency)}</span>
              </div>
              {selectedTxForDetail.comment && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Description / Details:</span>
                  <span className="font-medium text-slate-800 italic">{selectedTxForDetail.comment}</span>
                </div>
              )}
            </div>

            {/* Attachments */}
            {selectedTxForDetail.attachments && selectedTxForDetail.attachments.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-600 mb-2 flex items-center space-x-1">
                  <span>{window.getIconComponent('paperclip', { size: 14 })}</span>
                  <span>Attached Bills ({selectedTxForDetail.attachments.length})</span>
                </p>
                <div className="space-y-1.5">
                  {selectedTxForDetail.attachments.map((att, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                      <span className="text-[#9B111E]">
                        {att.type === 'pdf' ? window.getIconComponent('file-text', { size: 14 }) : window.getIconComponent('camera', { size: 14 })}
                      </span>
                      <span className="truncate flex-1">{att.name}</span>
                      <span className="text-[10px] text-slate-400">{att.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (onEditTransaction) onEditTransaction(selectedTxForDetail);
                  setSelectedTxForDetail(null);
                }}
                className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
              >
                <span>{window.getIconComponent('edit', { size: 14 })}</span>
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Delete this transaction?")) {
                    onDeleteTransaction(selectedTxForDetail.id);
                    setSelectedTxForDetail(null);
                  }
                }}
                className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-[#9B111E] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
              >
                <span>{window.getIconComponent('trash', { size: 14 })}</span>
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedTxForDetail(null)}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ============================================================================
// 3. DASHBOARD SCREEN
// ============================================================================
window.DashboardView = function({
  transactions,
  userProfile,
  onNavigateToCashBook,
  currency = "₹"
}) {
  const [dateFilter, setDateFilter] = useState('thisMonth'); // 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear' | 'custom'

  // Filter transactions based on date filter
  const filteredTxs = useMemo(() => {
    return transactions.filter(tx => {
      if (dateFilter === 'thisMonth') return tx.date.startsWith('2026-11');
      if (dateFilter === 'lastMonth') return tx.date.startsWith('2026-10');
      if (dateFilter === 'last3Months') return tx.date >= '2026-09-01';
      if (dateFilter === 'thisYear') return tx.date.startsWith('2026');
      return true;
    });
  }, [transactions, dateFilter]);

  // Calculations
  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    const catMap = {};

    filteredTxs.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'IN') {
        income += amt;
      } else {
        expense += amt;
        catMap[tx.categoryName] = (catMap[tx.categoryName] || 0) + amt;
      }
    });

    const balance = income - expense;
    const savings = Math.max(0, balance);
    const savingsPercentage = income > 0 ? Math.round((savings / income) * 100) : 0;

    // Find highest spending category
    let highestCat = { name: "None", amount: 0, percentage: 0 };
    Object.keys(catMap).forEach(cat => {
      if (catMap[cat] > highestCat.amount) {
        highestCat = {
          name: cat,
          amount: catMap[cat],
          percentage: expense > 0 ? Math.round((catMap[cat] / expense) * 100) : 0
        };
      }
    });

    // Breakdown list sorted
    const categoryBreakdown = Object.keys(catMap)
      .map(cat => ({
        name: cat,
        amount: catMap[cat],
        percentage: expense > 0 ? Math.round((catMap[cat] / expense) * 100) : 0
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      income,
      expense,
      balance,
      savings,
      savingsPercentage,
      highestCat,
      categoryBreakdown
    };
  }, [filteredTxs]);

  // Recent 5 transactions
  const recentTransactions = useMemo(() => {
    return [...filteredTxs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [filteredTxs]);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Header Profile / Salaried Context Banner */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-3.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
              {userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-sm font-extrabold text-slate-900">{userProfile.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Salaried Professional
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-2 mt-0.5">
                <window.SalaryPrivacyViewer
                  amount={userProfile.monthlySalary}
                  currency={currency}
                  currentUser={userProfile}
                  label="Monthly Net Salary"
                  size="normal"
                />
                <span>• Payday: {userProfile.payDay || 1}st</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateToCashBook('OUT')}
            className="px-3 py-1.5 bg-[#9B111E] hover:bg-[#880b19] active:scale-95 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center space-x-1"
          >
            <span>{window.getIconComponent('plus', { size: 14 })}</span>
            <span>Record</span>
          </button>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center space-x-1.5 mt-3 pt-3 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'thisMonth', label: 'This Month' },
            { id: 'lastMonth', label: 'Last Month' },
            { id: 'last3Months', label: 'Last 3 Months' },
            { id: 'thisYear', label: 'This Year' },
            { id: 'all', label: 'All Time' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setDateFilter(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition ${
                dateFilter === tab.id
                  ? 'bg-[#9B111E] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* 5 KEY DASHBOARD METRIC CARDS (As Requested in Section 3) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          {/* 1. Total Income This Month */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Income</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                {window.getIconComponent('trending-up', { size: 14 })}
              </span>
            </div>
            <p className="text-lg md:text-xl font-extrabold text-emerald-600 tracking-tight">
              {window.formatCurrency(stats.income, currency)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Salary & secondary credits</p>
          </div>

          {/* 2. Total Expenses This Month */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Expenses</span>
              <span className="w-7 h-7 rounded-lg bg-red-100 text-[#9B111E] flex items-center justify-center">
                {window.getIconComponent('trending-down', { size: 14 })}
              </span>
            </div>
            <p className="text-lg md:text-xl font-extrabold text-[#9B111E] tracking-tight">
              {window.formatCurrency(stats.expense, currency)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Rent, EMI, Food & Bills</p>
          </div>

          {/* 3. Available Balance */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Available Balance</span>
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                {window.getIconComponent('wallet', { size: 14 })}
              </span>
            </div>
            <p className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              {window.formatCurrency(stats.balance, currency)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Cash in hand & bank balance</p>
          </div>

          {/* 4. Total Monthly Savings */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Savings</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                {window.getIconComponent('piggy-bank', { size: 14 })}
              </span>
            </div>
            <p className="text-lg md:text-xl font-extrabold text-emerald-700 tracking-tight">
              {window.formatCurrency(stats.savings, currency)}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Surplus after monthly expenses</p>
          </div>

          {/* 5. Monthly Savings Percentage */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Savings Rate</span>
              <span className="text-xs font-extrabold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100">
                {stats.savingsPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, stats.savingsPercentage)}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Target Goal: {userProfile.savingsGoalPercentage}%</p>
          </div>

        </div>

        {/* HIGHEST SPENDING CATEGORY SPOTLIGHT */}
        {stats.highestCat && stats.highestCat.amount > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#9B111E] text-white flex items-center justify-center font-extrabold shadow-xs">
                {window.getIconComponent('shield', { size: 18 })}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-800">
                  Highest Spending Category
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">
                  {stats.highestCat.name} • {window.formatCurrency(stats.highestCat.amount, currency)}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accounts for <strong className="text-red-700">{stats.highestCat.percentage}%</strong> of total expenses.
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-500">Salaried Guideline</span>
              <p className="text-[11px] text-emerald-700 font-bold">Within 35% Safe Band</p>
            </div>
          </div>
        )}

        {/* VISUAL CHARTS SECTION: INCOME VS EXPENSE & CATEGORY BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Interactive SVG Bar Comparison Chart */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Income vs Expense Trend</h3>
                <p className="text-xs text-slate-400">Monthly Cash Inflow vs Outflow</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">Nov 2026</span>
            </div>

            {/* SVG Visual Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-700 flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Total Income</span>
                  </span>
                  <span className="text-slate-800">{window.formatCurrency(stats.income, currency)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.income > 0 ? 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#9B111E] flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B111E] inline-block"></span>
                    <span>Total Expense</span>
                  </span>
                  <span className="text-slate-800">{window.formatCurrency(stats.expense, currency)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#9B111E] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.income > 0 ? Math.min(100, Math.round((stats.expense / stats.income) * 100)) : 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-sky-700 flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
                    <span>Surplus / Savings</span>
                  </span>
                  <span className="text-slate-800">{window.formatCurrency(stats.balance, currency)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-sky-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.income > 0 ? Math.min(100, Math.round((stats.balance / stats.income) * 100)) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Savings Rate: <strong className="text-emerald-600">{stats.savingsPercentage}%</strong></span>
              <span>Burn Rate: <strong className="text-[#9B111E]">{100 - stats.savingsPercentage}%</strong></span>
            </div>
          </div>

          {/* Expense Category Breakdown Progress Bars */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Expense Category Breakdown</h3>
                <p className="text-xs text-slate-400">Where salaried money went</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">{stats.categoryBreakdown.length} Categories</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {stats.categoryBreakdown.slice(0, 5).map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="text-slate-600 font-semibold">
                      {window.formatCurrency(cat.amount, currency)} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#9B111E] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400">
                Top 5 categories represent {stats.categoryBreakdown.slice(0, 5).reduce((acc, c) => acc + c.percentage, 0)}% of total monthly spend
              </span>
            </div>
          </div>

        </div>

        {/* RECENT TRANSACTIONS PREVIEW */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Transactions</h3>
              <p className="text-xs text-slate-400">Latest entries in your cash ledger</p>
            </div>
            <button
              onClick={() => onNavigateToCashBook('OVERVIEW')}
              className="text-xs font-bold text-[#9B111E] hover:underline"
            >
              View All Cash Book →
            </button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((tx) => {
              const isIncome = tx.type === 'IN';
              return (
                <div key={tx.id} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition border border-slate-100">
                  <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#9B111E]'
                    }`}>
                      {isIncome ? '+' : '-'}
                    </span>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{tx.categoryName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{window.formatDateDisplay(tx.date)} • {tx.comment}</p>
                    </div>
                  </div>
                  <span className={`text-xs md:text-sm font-extrabold italic tracking-tight shrink-0 ${
                    isIncome ? 'text-emerald-600' : 'text-[#9B111E]'
                  }`}>
                    {isIncome ? '+' : '-'}{window.formatCurrency(tx.amount, currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};


// ===== FILE: src/reportsAndCategories.js =====
// Reports Section, Categories Management, and Profile / Settings Views

// ============================================================================
// 4. REPORTS SECTION
// ============================================================================
window.ReportsView = function({
  transactions,
  balanceSheet,
  onUpdateBalanceSheet,
  userProfile,
  currency = "₹"
}) {
  const [activeReportTab, setActiveReportTab] = useState('income'); // 'income' | 'expense' | 'balanceSheet' | 'savings' | 'cashbook'
  const [dateRange, setDateRange] = useState('thisMonth'); // 'thisMonth' | 'lastMonth' | 'all'
  const [showEditBalanceSheetModal, setShowEditBalanceSheetModal] = useState(false);
  const [cashbookSearch, setCashbookSearch] = useState('');
  const [cashbookTypeFilter, setCashbookTypeFilter] = useState('ALL');

  // Filtered transactions for reports
  const reportTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (dateRange === 'thisMonth') return tx.date.startsWith('2026-11');
      if (dateRange === 'lastMonth') return tx.date.startsWith('2026-10');
      return true;
    });
  }, [transactions, dateRange]);

  // Income calculations
  const incomeStats = useMemo(() => {
    let totalIncome = 0;
    let salaryReceived = 0;
    let otherIncome = 0;
    const catMap = {};
    const monthlyTrend = {};

    reportTransactions.filter(tx => tx.type === 'IN').forEach(tx => {
      const amt = Number(tx.amount) || 0;
      totalIncome += amt;
      if (tx.categoryName.toLowerCase().includes('salary')) {
        salaryReceived += amt;
      } else {
        otherIncome += amt;
      }
      catMap[tx.categoryName] = (catMap[tx.categoryName] || 0) + amt;

      const m = tx.date.slice(0, 7);
      monthlyTrend[m] = (monthlyTrend[m] || 0) + amt;
    });

    const categoryList = Object.keys(catMap).map(k => ({
      name: k,
      amount: catMap[k],
      percentage: totalIncome > 0 ? Math.round((catMap[k] / totalIncome) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);

    return {
      totalIncome,
      salaryReceived,
      otherIncome,
      categoryList,
      monthlyTrend,
      history: reportTransactions.filter(tx => tx.type === 'IN')
    };
  }, [reportTransactions]);

  // Expense calculations
  const expenseStats = useMemo(() => {
    let totalExpenses = 0;
    const catMap = {};
    const dailyMap = {};
    const monthlyTrend = {};

    reportTransactions.filter(tx => tx.type === 'OUT').forEach(tx => {
      const amt = Number(tx.amount) || 0;
      totalExpenses += amt;
      catMap[tx.categoryName] = (catMap[tx.categoryName] || 0) + amt;
      dailyMap[tx.date] = (dailyMap[tx.date] || 0) + amt;
      const m = tx.date.slice(0, 7);
      monthlyTrend[m] = (monthlyTrend[m] || 0) + amt;
    });

    const categoryList = Object.keys(catMap).map(k => ({
      name: k,
      amount: catMap[k],
      percentage: totalExpenses > 0 ? Math.round((catMap[k] / totalExpenses) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);

    const dailyList = Object.keys(dailyMap).map(d => ({
      date: d,
      amount: dailyMap[d]
    })).sort((a, b) => new Date(b.date) - new Date(a.date));

    const avgDailySpend = dailyList.length > 0 ? Math.round(totalExpenses / 30) : 0;

    return {
      totalExpenses,
      categoryList,
      dailyList,
      avgDailySpend,
      monthlyTrend,
      history: reportTransactions.filter(tx => tx.type === 'OUT')
    };
  }, [reportTransactions]);

  // Balance Sheet / Personal Financial Position calculations
  const totalAssets = useMemo(() => {
    const a = balanceSheet.assets;
    return (a.cashInHand || 0) + (a.bankBalance || 0) + (a.savings || 0) + (a.investments || 0) + (a.otherAssets || 0);
  }, [balanceSheet]);

  const totalLiabilities = useMemo(() => {
    const l = balanceSheet.liabilities;
    return (l.homeLoan || 0) + (l.personalLoan || 0) + (l.creditCard || 0) + (l.otherLiabilities || 0);
  }, [balanceSheet]);

  const netWorth = totalAssets - totalLiabilities;

  // Monthly Savings Report Calculations (Formula: Savings = Income - Expenses; % = (Savings / Income) * 100)
  const savingsStats = useMemo(() => {
    // Current Month (Nov 2026)
    let novIncome = 0;
    let novExpense = 0;
    transactions.filter(t => t.date.startsWith('2026-11')).forEach(t => {
      if (t.type === 'IN') novIncome += Number(t.amount);
      if (t.type === 'OUT') novExpense += Number(t.amount);
    });
    const novSavings = novIncome - novExpense;
    const novSavingsPct = novIncome > 0 ? Math.round((novSavings / novIncome) * 100) : 0;

    // Previous Month (Oct 2026)
    let octIncome = 0;
    let octExpense = 0;
    transactions.filter(t => t.date.startsWith('2026-10')).forEach(t => {
      if (t.type === 'IN') octIncome += Number(t.amount);
      if (t.type === 'OUT') octExpense += Number(t.amount);
    });
    const octSavings = octIncome - octExpense;
    const octSavingsPct = octIncome > 0 ? Math.round((octSavings / octIncome) * 100) : 0;

    const diffSavings = novSavings - octSavings;
    const diffPct = novSavingsPct - octSavingsPct;

    return {
      current: { income: novIncome, expense: novExpense, savings: novSavings, percentage: novSavingsPct },
      previous: { income: octIncome, expense: octExpense, savings: octSavings, percentage: octSavingsPct },
      difference: { savings: diffSavings, percentage: diffPct }
    };
  }, [transactions]);

  // Cash Book Ledger Report Data with Running Balance
  const cashbookReportRows = useMemo(() => {
    const sorted = [...transactions]
      .filter(tx => {
        if (dateRange === 'thisMonth' && !tx.date.startsWith('2026-11')) return false;
        if (dateRange === 'lastMonth' && !tx.date.startsWith('2026-10')) return false;
        if (cashbookTypeFilter !== 'ALL' && tx.type !== cashbookTypeFilter) return false;
        if (cashbookSearch.trim()) {
          const q = cashbookSearch.toLowerCase();
          return tx.categoryName.toLowerCase().includes(q) || (tx.comment && tx.comment.toLowerCase().includes(q));
        }
        return true;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let bal = 0;
    return sorted.map(tx => {
      const isInc = tx.type === 'IN';
      const amt = Number(tx.amount) || 0;
      if (isInc) bal += amt;
      else bal -= amt;

      return {
        ...tx,
        incomeAmt: isInc ? amt : 0,
        expenseAmt: !isInc ? amt : 0,
        runningBalance: bal
      };
    });
  }, [transactions, dateRange, cashbookTypeFilter, cashbookSearch]);

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = ["Date", "Type", "Category", "Description", "Income", "Expense", "Running Balance"];
    const rows = cashbookReportRows.map(r => [
      `"${r.date}"`,
      `"${r.type}"`,
      `"${r.categoryName}"`,
      `"${(r.comment || '').replace(/"/g, '""')}"`,
      r.incomeAmt || 0,
      r.expenseAmt || 0,
      r.runningBalance || 0
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CashBook_Report_${dateRange}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Top Navigation Tabs */}
      <div className="bg-white border-b border-slate-200/80 px-4 pt-3 pb-2 shadow-2xs sticky top-0 z-20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Financial Reports & Analysis</h2>
            <p className="text-[11px] text-slate-400">Salaried insights, balance sheet & cash ledger</p>
          </div>

          {/* Date Filter selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
          >
            <option value="thisMonth">This Month (Nov 26)</option>
            <option value="lastMonth">Last Month (Oct 26)</option>
            <option value="all">All Available Records</option>
          </select>
        </div>

        {/* 5 Report Sub-Tabs */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'income', label: 'Income Report' },
            { id: 'expense', label: 'Expense Report' },
            { id: 'balanceSheet', label: 'Personal Balance Sheet' },
            { id: 'savings', label: 'Monthly Savings' },
            { id: 'cashbook', label: 'Cash Book Ledger' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveReportTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                activeReportTab === tab.id
                  ? 'bg-[#9B111E] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* ======================================================== */}
        {/* A. INCOME REPORT */}
        {/* ======================================================== */}
        {activeReportTab === 'income' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top 3 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Income</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
                  {window.formatCurrency(incomeStats.totalIncome, currency)}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Inflow for {dateRange === 'thisMonth' ? 'November 2026' : dateRange}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <window.SalaryPrivacyViewer
                  amount={incomeStats.salaryReceived}
                  currency={currency}
                  currentUser={userProfile}
                  label="Salary Received"
                  size="large"
                  subText={`${incomeStats.totalIncome > 0 ? Math.round((incomeStats.salaryReceived / incomeStats.totalIncome) * 100) : 0}% of net income`}
                />
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Other Income</p>
                <h3 className="text-2xl font-extrabold text-sky-600 mt-1">
                  {window.formatCurrency(incomeStats.otherIncome, currency)}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Bonus, freelance & returns</p>
              </div>
            </div>

            {/* Category-wise Income Breakdown */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3">Category-wise Income Distribution</h3>
              <div className="space-y-2.5">
                {incomeStats.categoryList.map((cat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">{cat.name}</span>
                      <span className="text-slate-600 font-semibold">
                        {window.formatCurrency(cat.amount, currency)} ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2.5 rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Income Transaction History Table */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3">Income Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {incomeStats.history.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-500 whitespace-nowrap">{window.formatDateDisplay(tx.date)}</td>
                        <td className="p-2.5 font-bold text-slate-900">{tx.categoryName}</td>
                        <td className="p-2.5 text-slate-600 truncate max-w-xs">{tx.comment}</td>
                        <td className="p-2.5 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                          +{window.formatCurrency(tx.amount, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* B. EXPENSE REPORT */}
        {/* ======================================================== */}
        {activeReportTab === 'expense' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top 3 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Expenses</p>
                <h3 className="text-2xl font-extrabold text-[#9B111E] mt-1">
                  {window.formatCurrency(expenseStats.totalExpenses, currency)}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Outflow for selected period</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Daily Spend</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {window.formatCurrency(expenseStats.avgDailySpend, currency)}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Based on active calendar days</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Spending Category</p>
                <h3 className="text-lg font-extrabold text-[#9B111E] mt-1 truncate">
                  {expenseStats.categoryList[0] ? expenseStats.categoryList[0].name : 'None'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {expenseStats.categoryList[0] ? `${window.formatCurrency(expenseStats.categoryList[0].amount, currency)} (${expenseStats.categoryList[0].percentage}%)` : 'No expenses'}
                </p>
              </div>
            </div>

            {/* Category-wise Expenses Table & Visuals */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3">Highest Spending Categories</h3>
              <div className="space-y-3">
                {expenseStats.categoryList.map((cat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-red-100 text-[#9B111E] flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-slate-700 font-semibold">
                        {window.formatCurrency(cat.amount, currency)} ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#9B111E] h-2.5 rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Transaction History Table */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <h3 className="text-sm font-extrabold text-slate-900 mb-3">Expense Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Details</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {expenseStats.history.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-500 whitespace-nowrap">{window.formatDateDisplay(tx.date)}</td>
                        <td className="p-2.5 font-bold text-slate-900">{tx.categoryName}</td>
                        <td className="p-2.5 text-slate-600 truncate max-w-xs">{tx.comment}</td>
                        <td className="p-2.5 text-right font-extrabold text-[#9B111E] whitespace-nowrap">
                          -{window.formatCurrency(tx.amount, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* C. PERSONAL BALANCE SHEET / FINANCIAL POSITION */}
        {/* ======================================================== */}
        {activeReportTab === 'balanceSheet' && (
          <div className="space-y-4 animate-fade-in">
            {/* Header with Edit Button */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400">Personal Financial Statement</span>
                <h3 className="text-lg font-extrabold mt-0.5">Net Worth & Solvency</h3>
                <p className="text-xs text-slate-300">Net Worth = Total Assets - Total Liabilities</p>
              </div>
              <button
                onClick={() => setShowEditBalanceSheetModal(true)}
                className="px-3 py-1.5 bg-[#9B111E] hover:bg-red-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center space-x-1.5"
              >
                <span>{window.getIconComponent('edit', { size: 14 })}</span>
                <span>Edit Position</span>
              </button>
            </div>

            {/* Net Worth Hero Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="text-center py-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Estimated Net Worth</span>
                <h1 className="text-3xl md:text-4xl font-extrabold italic text-slate-900 my-1 tracking-tight">
                  {window.formatCurrency(netWorth, currency)}
                </h1>
                <p className="text-xs text-slate-500">
                  {netWorth >= 0 ? "Positive Net Financial Standing" : "Debt exceeds liquid assets"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs font-bold text-emerald-800 uppercase">Total Assets</p>
                  <p className="text-lg font-extrabold text-emerald-700 mt-0.5">
                    {window.formatCurrency(totalAssets, currency)}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs font-bold text-red-800 uppercase">Total Liabilities</p>
                  <p className="text-lg font-extrabold text-[#9B111E] mt-0.5">
                    {window.formatCurrency(totalLiabilities, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Assets vs Liabilities Two-Column Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Assets Breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <h4 className="text-sm font-extrabold text-emerald-700 uppercase tracking-wide flex items-center space-x-1.5">
                    <span>{window.getIconComponent('wallet', { size: 16 })}</span>
                    <span>Assets (What You Own)</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-700">{window.formatCurrency(totalAssets, currency)}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Cash in Hand</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.assets.cashInHand, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Bank Balance (Salary A/c)</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.assets.bankBalance, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Savings & Emergency Fund</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.assets.savings, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Investments (Equities / Mutual Funds / PPF)</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.assets.investments, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600 font-medium">Other Assets (Gold / Vehicle Equity)</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.assets.otherAssets, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Liabilities Breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <h4 className="text-sm font-extrabold text-red-700 uppercase tracking-wide flex items-center space-x-1.5">
                    <span>{window.getIconComponent('credit-card', { size: 16 })}</span>
                    <span>Liabilities (What You Owe)</span>
                  </h4>
                  <span className="text-xs font-bold text-[#9B111E]">{window.formatCurrency(totalLiabilities, currency)}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Home Loan Outstanding</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.liabilities.homeLoan, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Personal Loan Outstanding</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.liabilities.personalLoan, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600 font-medium">Credit Card Outstanding</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.liabilities.creditCard, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600 font-medium">Other Liabilities & Dues</span>
                    <span className="font-bold text-slate-900">{window.formatCurrency(balanceSheet.liabilities.otherLiabilities, currency)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* D. MONTHLY SAVINGS REPORT */}
        {/* ======================================================== */}
        {activeReportTab === 'savings' && (
          <div className="space-y-4 animate-fade-in">
            {/* Header Formula Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Savings Formula</span>
              <div className="mt-2 p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 space-y-1">
                <p><strong>Savings</strong> = Total Income - Total Expenses</p>
                <p><strong>Savings Percentage</strong> = (Savings / Total Income) × 100</p>
              </div>
            </div>

            {/* Current vs Previous Month Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Current Month: November 2026 */}
              <div className="bg-white rounded-2xl p-4 border-2 border-emerald-500 shadow-2xs">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-extrabold text-slate-900">Current Month (November 2026)</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                    {savingsStats.current.percentage}% Savings Rate
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Monthly Income</span>
                    <span className="font-bold text-emerald-600">+{window.formatCurrency(savingsStats.current.income, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Monthly Expenses</span>
                    <span className="font-bold text-[#9B111E]">-{window.formatCurrency(savingsStats.current.expense, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold text-sm bg-emerald-50 px-2 rounded-lg">
                    <span className="text-emerald-900">Monthly Net Savings</span>
                    <span className="text-emerald-700">{window.formatCurrency(savingsStats.current.savings, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Previous Month: October 2026 */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-extrabold text-slate-900">Previous Month (October 2026)</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                    {savingsStats.previous.percentage}% Savings Rate
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Monthly Income</span>
                    <span className="font-bold text-slate-800">+{window.formatCurrency(savingsStats.previous.income, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Monthly Expenses</span>
                    <span className="font-bold text-slate-800">-{window.formatCurrency(savingsStats.previous.expense, currency)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold text-sm bg-slate-50 px-2 rounded-lg">
                    <span className="text-slate-700">Monthly Net Savings</span>
                    <span className="text-slate-900">{window.formatCurrency(savingsStats.previous.savings, currency)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Performance Variance Callout */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200/80 shadow-2xs">
              <h4 className="text-sm font-extrabold text-blue-900 mb-1">Previous Month Comparison & Trajectory</h4>
              <p className="text-xs text-blue-800">
                You saved <strong className="font-bold">{window.formatCurrency(Math.abs(savingsStats.difference.savings), currency)}</strong> {savingsStats.difference.savings >= 0 ? 'more' : 'less'} this month compared to October, with a <strong>{Math.abs(savingsStats.difference.percentage)}%</strong> {savingsStats.difference.percentage >= 0 ? 'higher' : 'lower'} savings rate.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* E. CASH BOOK REPORT (Full Chronological Ledger) */}
        {/* ======================================================== */}
        {activeReportTab === 'cashbook' && (
          <div className="space-y-4 animate-fade-in">
            {/* Action Bar with Search, Type Filter and Export CSV */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {window.getIconComponent('search', { size: 16 })}
                  </span>
                  <input
                    type="text"
                    value={cashbookSearch}
                    onChange={(e) => setCashbookSearch(e.target.value)}
                    placeholder="Search ledger entries..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium border border-slate-200 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setCashbookTypeFilter('ALL')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md ${cashbookTypeFilter === 'ALL' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-600'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setCashbookTypeFilter('IN')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md ${cashbookTypeFilter === 'IN' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
                    >
                      IN
                    </button>
                    <button
                      onClick={() => setCashbookTypeFilter('OUT')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md ${cashbookTypeFilter === 'OUT' ? 'bg-[#9B111E] text-white' : 'text-[#9B111E]'}`}
                    >
                      OUT
                    </button>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center space-x-1.5"
                  >
                    <span>{window.getIconComponent('download', { size: 14 })}</span>
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive Ledger Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDF2F7] text-slate-700 font-extrabold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3 whitespace-nowrap">Date</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Income (IN)</th>
                      <th className="p-3 text-right">Expense (OUT)</th>
                      <th className="p-3 text-right whitespace-nowrap">Running Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {cashbookReportRows.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-slate-400">
                          No ledger records found for this criteria.
                        </td>
                      </tr>
                    ) : (
                      cashbookReportRows.map(row => (
                        <tr key={row.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 text-slate-500 whitespace-nowrap font-medium">
                            {window.formatDateDisplay(row.date)}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              row.type === 'IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {row.type}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                            {row.categoryName}
                          </td>
                          <td className="p-3 text-slate-600 max-w-xs truncate">
                            {row.comment || '-'}
                          </td>
                          <td className="p-3 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                            {row.incomeAmt > 0 ? `+${window.formatCurrency(row.incomeAmt, currency)}` : '-'}
                          </td>
                          <td className="p-3 text-right font-extrabold text-[#9B111E] whitespace-nowrap">
                            {row.expenseAmt > 0 ? `-${window.formatCurrency(row.expenseAmt, currency)}` : '-'}
                          </td>
                          <td className="p-3 text-right font-extrabold text-slate-900 whitespace-nowrap">
                            {window.formatCurrency(row.runningBalance, currency)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* EDIT BALANCE SHEET / FINANCIAL POSITION MODAL */}
      {showEditBalanceSheetModal && (
        <window.EditBalanceSheetModal
          balanceSheet={balanceSheet}
          onSave={(updated) => {
            onUpdateBalanceSheet(updated);
            setShowEditBalanceSheetModal(false);
          }}
          onClose={() => setShowEditBalanceSheetModal(false)}
          currency={currency}
        />
      )}

    </div>
  );
};

// ============================================================================
// EDIT BALANCE SHEET MODAL
// ============================================================================
window.EditBalanceSheetModal = function({ balanceSheet, onSave, onClose, currency = "₹" }) {
  const [assets, setAssets] = useState({ ...balanceSheet.assets });
  const [liabilities, setLiabilities] = useState({ ...balanceSheet.liabilities });

  const handleAssetChange = (key, val) => {
    setAssets({ ...assets, [key]: Number(val) || 0 });
  };

  const handleLiabilityChange = (key, val) => {
    setLiabilities({ ...liabilities, [key]: Number(val) || 0 });
  };

  const calcTotalA = Object.values(assets).reduce((a, b) => a + Number(b || 0), 0);
  const calcTotalL = Object.values(liabilities).reduce((a, b) => a + Number(b || 0), 0);
  const calcNW = calcTotalA - calcTotalL;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl my-6 animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Edit Personal Financial Position</h3>
            <p className="text-xs text-slate-400">Update current asset balances and liability values</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            {window.getIconComponent('x', { size: 18 })}
          </button>
        </div>

        <div className="my-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Assets inputs */}
          <div>
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Assets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Cash in Hand</label>
                <input
                  type="number"
                  value={assets.cashInHand}
                  onChange={(e) => handleAssetChange('cashInHand', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Bank Balance</label>
                <input
                  type="number"
                  value={assets.bankBalance}
                  onChange={(e) => handleAssetChange('bankBalance', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Savings / RD / FD</label>
                <input
                  type="number"
                  value={assets.savings}
                  onChange={(e) => handleAssetChange('savings', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Investments (Equities/MF)</label>
                <input
                  type="number"
                  value={assets.investments}
                  onChange={(e) => handleAssetChange('investments', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-500 font-semibold block mb-1">Other Assets (Gold/Property)</label>
                <input
                  type="number"
                  value={assets.otherAssets}
                  onChange={(e) => handleAssetChange('otherAssets', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
            </div>
          </div>

          {/* Liabilities inputs */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Liabilities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Home Loan Outstanding</label>
                <input
                  type="number"
                  value={liabilities.homeLoan}
                  onChange={(e) => handleLiabilityChange('homeLoan', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Personal Loan</label>
                <input
                  type="number"
                  value={liabilities.personalLoan}
                  onChange={(e) => handleLiabilityChange('personalLoan', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Credit Card Due</label>
                <input
                  type="number"
                  value={liabilities.creditCard}
                  onChange={(e) => handleLiabilityChange('creditCard', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Other Liabilities</label>
                <input
                  type="number"
                  value={liabilities.otherLiabilities}
                  onChange={(e) => handleLiabilityChange('otherLiabilities', e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Net Worth Preview */}
        <div className="p-3 bg-slate-50 rounded-xl mb-4 text-xs font-bold flex justify-between items-center">
          <span>Recalculated Net Worth:</span>
          <span className="text-base text-slate-900 font-extrabold">{window.formatCurrency(calcNW, currency)}</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ assets, liabilities, lastUpdated: new Date().toISOString().slice(0, 10) })}
            className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#880b19] text-white rounded-xl text-xs font-bold shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. CATEGORIES MANAGEMENT SCREEN
// ============================================================================
window.CategoriesView = function({
  incomeCategories,
  expenseCategories,
  transactions,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  currency = "₹"
}) {
  const [activeTab, setActiveTab] = useState('OUT'); // 'OUT' (Expense) or 'IN' (Income)
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);

  // Compute transaction counts and totals per category
  const categoryStats = useMemo(() => {
    const stats = {};
    transactions.forEach(tx => {
      if (!stats[tx.categoryId]) {
        stats[tx.categoryId] = { count: 0, total: 0 };
      }
      stats[tx.categoryId].count += 1;
      stats[tx.categoryId].total += Number(tx.amount) || 0;
    });
    return stats;
  }, [transactions]);

  const currentCategories = activeTab === 'OUT' ? expenseCategories : incomeCategories;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-3.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Categories Management</h2>
            <p className="text-[11px] text-slate-400">Organize and customize Income & Expense categories</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-[#9B111E] hover:bg-[#880b19] active:scale-95 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center space-x-1"
          >
            <span>{window.getIconComponent('plus', { size: 14 })}</span>
            <span>Add Category</span>
          </button>
        </div>

        {/* Tab Switcher: Expense vs Income */}
        <div className="flex space-x-2 mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('OUT')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'OUT'
                ? 'bg-[#9B111E] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Expense Categories ({expenseCategories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('IN')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'IN'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Income Categories ({incomeCategories.length})</span>
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="p-4 space-y-3 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentCategories.map(cat => {
            const stat = categoryStats[cat.id] || { count: 0, total: 0 };
            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 overflow-hidden pr-2">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                    style={{ backgroundColor: cat.color || '#9B111E' }}
                  >
                    {window.getIconComponent(cat.icon || 'tags', { size: 18 })}
                  </span>

                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm font-bold text-slate-900 truncate">{cat.name}</p>
                    <p className="text-[10px] text-slate-400">{cat.group || 'General'}</p>
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
                      {stat.count} txns • {window.formatCurrency(stat.total, currency)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Category"
                  >
                    {window.getIconComponent('edit', { size: 16 })}
                  </button>
                  <button
                    onClick={() => setDeleteConfirmCategory(cat)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Category"
                  >
                    {window.getIconComponent('trash', { size: 16 })}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD CATEGORY MODAL */}
      {showAddModal && (
        <window.CategoryFormModal
          type={activeTab}
          onSave={(newCat) => {
            onAddCategory(newCat, activeTab);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <window.CategoryFormModal
          type={activeTab}
          initialData={editingCategory}
          onSave={(updatedCat) => {
            onEditCategory(updatedCat, activeTab);
            setEditingCategory(null);
          }}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl animate-scale-in text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#9B111E] flex items-center justify-center mx-auto mb-3">
              {window.getIconComponent('trash', { size: 24 })}
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">Delete "{deleteConfirmCategory.name}"?</h3>
            <p className="text-xs text-slate-500 mb-4">
              Are you sure you want to remove this category? Past recorded transactions will preserve their category label.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setDeleteConfirmCategory(null)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCategory(deleteConfirmCategory.id, activeTab);
                  setDeleteConfirmCategory(null);
                }}
                className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Category Add / Edit Form Modal
window.CategoryFormModal = function({ type, initialData, onSave, onClose }) {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [group, setGroup] = useState(initialData ? initialData.group : (type === 'OUT' ? 'Home & Living' : 'Salary & Career'));
  const [color, setColor] = useState(initialData ? initialData.color : (type === 'OUT' ? '#DC2626' : '#059669'));
  const [icon, setIcon] = useState(initialData ? initialData.icon : 'shopping-cart');

  const presetColors = [
    '#DC2626', '#B91C1C', '#EA580C', '#D97706', '#EAB308',
    '#16A34A', '#059669', '#0891B2', '#2563EB', '#4F46E5',
    '#7C3AED', '#DB2777', '#475569'
  ];

  const presetIcons = [
    'shopping-cart', 'shopping-bag', 'home', 'key', 'fuel', 'car', 'bus',
    'utensils', 'zap', 'droplet', 'wifi', 'smartphone', 'film', 'activity',
    'shield', 'gift', 'award', 'laptop', 'wallet', 'credit-card', 'tool'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialData ? initialData.id : `${type.toLowerCase()}-${Date.now()}`,
      name: name.trim(),
      group,
      color,
      icon
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {initialData ? 'Edit Category' : `Add ${type === 'OUT' ? 'Expense' : 'Income'} Category`}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            {window.getIconComponent('x', { size: 18 })}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-3 text-xs">
          <div>
            <label className="text-slate-600 font-bold block mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Electricity Bill, Gym, Side Project"
              className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
              required
            />
          </div>

          <div>
            <label className="text-slate-600 font-bold block mb-1">Group / Section</label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="e.g. Home & Living, Personal, Career"
              className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-slate-600 font-bold block mb-1.5">Pick Color</label>
            <div className="flex flex-wrap gap-1.5">
              {presetColors.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-slate-800 ring-offset-2' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                ></button>
              ))}
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="text-slate-600 font-bold block mb-1.5">Pick Icon</label>
            <div className="grid grid-cols-7 gap-1.5 max-h-28 overflow-y-auto p-1 bg-slate-50 rounded-lg">
              {presetIcons.map(ic => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`p-1.5 rounded-lg flex items-center justify-center transition ${icon === ic ? 'bg-[#9B111E] text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                  {window.getIconComponent(ic, { size: 16 })}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-3 bg-[#9B111E] hover:bg-[#880b19] text-white rounded-xl font-bold shadow-xs"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// 6. PROFILE / SETTINGS SCREEN
// ============================================================================
window.ProfileSettingsView = function({
  userProfile,
  onUpdateProfile,
  onResetData,
  onClearData,
  transactions,
  categories,
  currency = "₹",
  onOpenLoginModal,
  onImportJSONData,
  onLogout
}) {
  const [profile, setProfile] = useState({ ...userProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfile({ ...userProfile });
  }, [userProfile]);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const fullBackup = {
      userProfile: profile,
      transactions,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `PersonalFinance_Data_${profile.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-3.5 shadow-2xs">
        <h2 className="text-base font-extrabold text-slate-900">Profile & Preferences</h2>
        <p className="text-[11px] text-slate-400">Configure salary parameters, currency, and data backup</p>
      </div>

      <div className="p-4 space-y-4 max-w-xl mx-auto w-full">
        
        {/* Active Account & Switcher Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
              {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 text-xs">{profile.name}</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                  {profile.role || 'user'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{profile.email || 'user@cashbook.com'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenLoginModal}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <span>{window.getIconComponent('user-check', { size: 14 })}</span>
              <span>Switch User</span>
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-[#9B111E] rounded-xl text-xs font-bold transition flex items-center space-x-1"
                title="Log out of Cash Book"
              >
                <span>{window.getIconComponent('log-out', { size: 14 })}</span>
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-base shadow-xs">
              {profile.name ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">{profile.name}</h3>
              <p className="text-xs text-slate-500">{profile.roleTitle || profile.role} • {profile.company}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-600 font-bold block mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <window.SalaryPrivacyInput
                value={profile.monthlySalary}
                onChange={(val) => setProfile({ ...profile, monthlySalary: val })}
                currentUser={profile}
                currency={currency}
              />

              <div>
                <label className="text-slate-600 font-bold block mb-1">Monthly Payday</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={profile.payDay}
                  onChange={(e) => setProfile({ ...profile, payDay: Number(e.target.value) })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-600 font-bold block mb-1">Preferred Currency Symbol</label>
              <select
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold bg-white focus:outline-hidden"
              >
                <option value="₹">₹ - Indian Rupee (INR)</option>
                <option value="$">$ - US Dollar (USD)</option>
                <option value="€">€ - Euro (EUR)</option>
                <option value="£">£ - British Pound (GBP)</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 font-bold block mb-1">Monthly Savings Target (%)</label>
              <input
                type="number"
                min="5"
                max="80"
                value={profile.savingsGoalPercentage}
                onChange={(e) => setProfile({ ...profile, savingsGoalPercentage: Number(e.target.value) })}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#9B111E] hover:bg-[#880b19] text-white rounded-xl font-bold text-xs shadow-xs transition"
            >
              {savedSuccess ? '✓ Profile Saved Successfully' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Data Management & Backup */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2.5 text-xs">
          <h4 className="font-extrabold text-slate-900 text-sm mb-1">Data Storage & Backup</h4>
          <p className="text-slate-500">
            All data is saved securely in your browser's local state. You can export a JSON snapshot anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleExportJSON}
              className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition flex items-center justify-center space-x-1.5"
            >
              <span>{window.getIconComponent('download', { size: 14 })}</span>
              <span>Export JSON</span>
            </button>

            <label className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer text-center">
              <span>{window.getIconComponent('upload', { size: 14 })}</span>
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const parsed = JSON.parse(event.target.result);
                        if (onImportJSONData) onImportJSONData(parsed);
                      } catch (err) {
                        alert("Invalid JSON file: " + err.message);
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>

            <button
              onClick={() => {
                if (window.confirm("Reset all data back to the default salaried sample dataset?")) {
                  onResetData();
                }
              }}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition flex items-center justify-center space-x-1.5"
            >
              <span>{window.getIconComponent('refresh', { size: 14 })}</span>
              <span>Reset Data</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all transactions? This cannot be undone.")) {
                onClearData();
              }
            }}
            className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-[#9B111E] rounded-xl font-bold transition text-center"
          >
            Clear All Transactions
          </button>
        </div>

      </div>

    </div>
  );
};


// ===== FILE: src/adminView.js =====
// Admin User Management Section
// Accessible by admin@cashbook.com (Role: admin)
// Manage users, create users, update status active/inactive, view per-user data

window.AdminUserManagementView = function({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onSwitchUser,
  currentUser,
  transactions,
  currency = "₹"
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Summary counts
  const userStats = useMemo(() => {
    let active = 0;
    let inactive = 0;
    let admins = 0;
    users.forEach(u => {
      if (u.status === 'active') active++;
      else inactive++;
      if (u.role === 'admin') admins++;
    });
    return { total: users.length, active, inactive, admins };
  }, [users]);

  // Compute transaction counts per user
  const userTxCounts = useMemo(() => {
    const counts = {};
    transactions.forEach(tx => {
      counts[tx.userId] = (counts[tx.userId] || 0) + 1;
    });
    return counts;
  }, [transactions]);

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
      if (statusFilter !== "ALL" && u.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.company && u.company.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  // Toggle user status
  const handleToggleStatus = (user) => {
    if (user.email === "admin@cashbook.com") {
      alert("The primary admin account cannot be deactivated.");
      return;
    }
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    onUpdateUser({ ...user, status: newStatus });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] overflow-y-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                Admin Console
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
              User Management & Access Control
            </h2>
            <p className="text-xs text-slate-300">
              Manage salaried users, create accounts, and control active/inactive status
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#9B111E] hover:bg-[#850d18] active:scale-95 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-2"
          >
            <span>{window.getIconComponent('plus', { size: 16 })}</span>
            <span>Create New User</span>
          </button>
        </div>

        {/* 4 Quick Stat Counters */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-700/80 text-center">
          <div className="bg-white/10 rounded-xl p-2.5">
            <p className="text-[10px] text-slate-300 uppercase font-semibold">Total Users</p>
            <p className="text-lg font-extrabold text-white mt-0.5">{userStats.total}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5">
            <p className="text-[10px] text-emerald-300 uppercase font-semibold">Active Users</p>
            <p className="text-lg font-extrabold text-emerald-400 mt-0.5">{userStats.active}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5">
            <p className="text-[10px] text-red-300 uppercase font-semibold">Inactive Users</p>
            <p className="text-lg font-extrabold text-red-400 mt-0.5">{userStats.inactive}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5">
            <p className="text-[10px] text-purple-300 uppercase font-semibold">Admin Roles</p>
            <p className="text-lg font-extrabold text-purple-300 mt-0.5">{userStats.admins}</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-4 max-w-7xl mx-auto w-full flex-1">
        
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {window.getIconComponent('search', { size: 16 })}
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name, email, company..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl text-xs font-medium border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Roles</option>
              <option value="user">Standard Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EDF2F7] text-slate-700 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Email / Login</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 text-right">Monthly Salary</th>
                  <th className="p-3.5 text-center">Status Control</th>
                  <th className="p-3.5 text-center">Transactions</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">
                      No users match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => {
                    const isActive = user.status === 'active';
                    const txCount = userTxCounts[user.id] || 0;
                    const isCurrent = currentUser.id === user.id;

                    return (
                      <tr key={user.id} className="hover:bg-slate-50 transition">
                        
                        {/* Name & Avatar */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-slate-900">{user.name}</span>
                                {isCurrent && (
                                  <span className="text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded-sm font-bold">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{user.roleTitle || user.company || 'Salaried User'}</span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="p-3.5 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                          {user.email}
                        </td>

                        {/* Role Badge */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        {/* Monthly Salary (Password protected privacy) */}
                        <td className="p-3.5 text-right font-extrabold text-slate-800 whitespace-nowrap">
                          <window.SalaryPrivacyViewer
                            amount={user.monthlySalary}
                            currency={currency}
                            currentUser={currentUser}
                            inline={true}
                            size="small"
                          />
                        </td>

                        {/* Status Toggle Control (Mandatory Requirement) */}
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition inline-flex items-center space-x-1 shadow-2xs ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                            title="Click to toggle Active / Inactive"
                          >
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
                            <span>{isActive ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>

                        {/* Transaction Count */}
                        <td className="p-3.5 text-center whitespace-nowrap text-slate-600 font-bold">
                          {txCount}
                        </td>

                        {/* Action Buttons */}
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1">
                            
                            {/* Switch to this user */}
                            <button
                              onClick={() => onSwitchUser(user)}
                              disabled={!isActive}
                              className={`p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition ${!isActive ? 'opacity-40 cursor-not-allowed' : ''}`}
                              title={isActive ? `Login as ${user.name}` : 'User is inactive'}
                            >
                              {window.getIconComponent('user-check', { size: 16 })}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditingUser(user)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition"
                              title="Edit user details"
                            >
                              {window.getIconComponent('edit', { size: 16 })}
                            </button>

                            {/* Delete */}
                            {user.email !== "admin@cashbook.com" && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete user "${user.name}" (${user.email})?`)) {
                                    onDeleteUser(user.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition"
                                title="Delete user"
                              >
                                {window.getIconComponent('trash', { size: 16 })}
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* CREATE NEW USER MODAL (Admin Feature) */}
      {showCreateModal && (
        <window.UserFormModal
          onSave={(newUser) => {
            onAddUser(newUser);
            setShowCreateModal(false);
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <window.UserFormModal
          initialData={editingUser}
          onSave={(updatedUser) => {
            onUpdateUser(updatedUser);
            setEditingUser(null);
          }}
          onClose={() => setEditingUser(null)}
        />
      )}

    </div>
  );
};

// User Create / Edit Form Modal
window.UserFormModal = function({ initialData, onSave, onClose }) {
  const isEditing = !!initialData;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [email, setEmail] = useState(initialData ? initialData.email : "");
  const [password, setPassword] = useState(initialData ? initialData.password : "Passwd@123");
  const [role, setRole] = useState(initialData ? initialData.role : "user");
  const [status, setStatus] = useState(initialData ? initialData.status : "active");
  const [monthlySalary, setMonthlySalary] = useState(initialData ? initialData.monthlySalary : 75000);
  const [roleTitle, setRoleTitle] = useState(initialData ? (initialData.roleTitle || "") : "");
  const [company, setCompany] = useState(initialData ? (initialData.company || "") : "");
  const [savingsGoal, setSavingsGoal] = useState(initialData ? (initialData.savingsGoalPercentage || 30) : 30);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const userPayload = {
      id: initialData ? initialData.id : ("usr-" + Date.now()),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password || "Passwd@123",
      role,
      status,
      monthlySalary: Number(monthlySalary) || 0,
      roleTitle: roleTitle.trim() || "Salaried Professional",
      company: company.trim() || "Private Ltd",
      currency: "₹",
      currencyCode: "INR",
      payDay: initialData ? initialData.payDay : 1,
      savingsGoalPercentage: Number(savingsGoal) || 30
    };

    onSave(userPayload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl my-6 animate-scale-in">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              {isEditing ? `Edit User: ${initialData.name}` : 'Create New User Account'}
            </h3>
            <p className="text-xs text-slate-400">Set up credentials, role, and salary parameters</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            {window.getIconComponent('x', { size: 18 })}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-3.5 text-xs">
          
          <div>
            <label className="text-slate-600 font-bold block mb-1">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ankit Mehta"
              className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-slate-600 font-bold block mb-1">Email / Login ID *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ankit@cashbook.com"
                className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden"
                required
              />
            </div>
            <div>
              <label className="text-slate-600 font-bold block mb-1">Password *</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwd@123"
                className="w-full p-2.5 border border-slate-200 rounded-lg font-mono focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-slate-600 font-bold block mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold bg-white focus:outline-hidden"
              >
                <option value="user">Standard User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 font-bold block mb-1">Status (Active / Inactive)</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold bg-white focus:outline-hidden"
              >
                <option value="active">Active (Can Login)</option>
                <option value="inactive">Inactive (Deactivated)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-slate-600 font-bold block mb-1">Monthly Net Salary (₹)</label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-slate-600 font-bold block mb-1">Savings Goal (%)</label>
              <input
                type="number"
                min="5"
                max="80"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-slate-600 font-bold block mb-1">Designation / Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Financial Analyst"
                className="w-full p-2.5 border border-slate-200 rounded-lg font-medium focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-slate-600 font-bold block mb-1">Company / Employer</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. HDFC Bank Ltd"
                className="w-full p-2.5 border border-slate-200 rounded-lg font-medium focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-3 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl font-bold shadow-xs"
            >
              {isEditing ? 'Save Changes' : 'Create User'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};


// ===== FILE: src/app.js =====
// Main Application Root Component
// Multi-User Personal Finance Management with Role-Based Access Control
// Full CRUD for Transactions & Users with Local JSON State Management

const STORAGE_KEYS = {
  USERS: 'pf_users_v2',
  CURRENT_USER: 'pf_current_user_v2',
  TRANSACTIONS: 'pf_transactions_v2',
  INCOME_CATS: 'pf_income_categories_v2',
  EXPENSE_CATS: 'pf_expense_categories_v2',
  BALANCE_SHEETS: 'pf_balance_sheets_v2',
  IS_LOGGED_IN: 'pf_is_logged_in_v2'
};

window.App = function() {
  // 1. Users state
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      let list = saved ? JSON.parse(saved) : window.INITIAL_DATA.users;
      // Sync priya@cashbook.com -> akash@cashbook.com and name with Kiran
      list = list.map(u => {
        if (u.email === 'priya@cashbook.com' || u.email === 'akash@cashbook.com') {
          return { ...u, email: 'akash@cashbook.com', name: 'Kiran' };
        }
        return u;
      });
      return list;
    } catch (e) {
      return window.INITIAL_DATA.users;
    }
  });

  // 2. Logged in session state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return saved === null ? true : saved === 'true';
    } catch (e) {
      return true;
    }
  });

  // 2. Current active logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'priya@cashbook.com' || parsed.email === 'akash@cashbook.com') {
          parsed.email = 'akash@cashbook.com';
          parsed.name = 'Kiran';
        }
        // Ensure user exists in users list and is active
        const found = window.INITIAL_DATA.users.find(u => u.id === parsed.id || u.email === parsed.email);
        if (found) return { ...found, ...parsed, email: 'akash@cashbook.com', name: 'Kiran' };
      }
      return window.INITIAL_DATA.users[1]; // default to Rahul Sharma (user)
    } catch (e) {
      return window.INITIAL_DATA.users[1];
    }
  });

  // 3. Transactions dataset
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : window.INITIAL_DATA.transactions;
    } catch (e) {
      return window.INITIAL_DATA.transactions;
    }
  });

  // 4. Categories
  const [incomeCategories, setIncomeCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INCOME_CATS);
      return saved ? JSON.parse(saved) : window.INITIAL_DATA.incomeCategories;
    } catch (e) {
      return window.INITIAL_DATA.incomeCategories;
    }
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPENSE_CATS);
      return saved ? JSON.parse(saved) : window.INITIAL_DATA.expenseCategories;
    } catch (e) {
      return window.INITIAL_DATA.expenseCategories;
    }
  });

  // 5. Balance sheets (keyed by userId)
  const [balanceSheets, setBalanceSheets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BALANCE_SHEETS);
      return saved ? JSON.parse(saved) : window.INITIAL_DATA.balanceSheets;
    } catch (e) {
      return window.INITIAL_DATA.balanceSheets;
    }
  });

  // Navigation & View States
  const [activeTab, setActiveTab] = useState('cashbook'); // 'dashboard' | 'cashbook' | 'reports' | 'categories' | 'profile' | 'adminUsers'
  const [cashBookSubView, setCashBookSubView] = useState('entry'); // 'overview' | 'entry'
  const [entryMode, setEntryMode] = useState('OUT'); // 'OUT' or 'IN'
  const [editingTransaction, setEditingTransaction] = useState(null); // transaction being edited
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [globalToast, setGlobalToast] = useState(null);

  // Screen Width state to adapt layouts responsively
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  // Persist State to LocalStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); } catch (e) {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser)); } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions)); } catch (e) {}
  }, [transactions]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.INCOME_CATS, JSON.stringify(incomeCategories)); } catch (e) {}
  }, [incomeCategories]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.EXPENSE_CATS, JSON.stringify(expenseCategories)); } catch (e) {}
  }, [expenseCategories]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.BALANCE_SHEETS, JSON.stringify(balanceSheets)); } catch (e) {}
  }, [balanceSheets]);

  const showGlobalToast = (msg) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3000);
  };

  // --------------------------------------------------------------------------
  // USER-SPECIFIC DATA FILTERING ("data show as per user profile")
  // --------------------------------------------------------------------------
  // If current user is standard user: only view their own transactions.
  // If current user is admin: can view their own data, or all data.
  const userTransactions = useMemo(() => {
    if (currentUser.role === 'admin') {
      // For Admin, show all transactions or their own depending on context
      return transactions;
    }
    return transactions.filter(tx => tx.userId === currentUser.id);
  }, [transactions, currentUser]);

  // Active user's balance sheet
  const userBalanceSheet = useMemo(() => {
    return balanceSheets[currentUser.id] || window.INITIAL_DATA.balanceSheets["usr-rahul"];
  }, [balanceSheets, currentUser]);

  // Update active user balance sheet
  const handleUpdateBalanceSheet = (updatedSheet) => {
    setBalanceSheets({
      ...balanceSheets,
      [currentUser.id]: updatedSheet
    });
    showGlobalToast("Financial position updated!");
  };

  // --------------------------------------------------------------------------
  // TRANSACTION CRUD HANDLERS (Create, Read, Update, Delete)
  // --------------------------------------------------------------------------
  // Save or Update transaction
  const handleSaveTransaction = (txPayload, isEditing) => {
    if (isEditing) {
      // Update existing
      setTransactions(transactions.map(t => t.id === txPayload.id ? { ...txPayload, userId: txPayload.userId || currentUser.id } : t));
      showGlobalToast(`✓ Transaction updated (${currentUser.currency}${txPayload.amount})`);
    } else {
      // Create new transaction tagged with currentUser.id
      const newTx = {
        ...txPayload,
        userId: currentUser.id
      };
      setTransactions([newTx, ...transactions]);
      showGlobalToast(`✓ ${newTx.type === 'IN' ? 'Income' : 'Expense'} of ${currentUser.currency}${newTx.amount} recorded!`);
    }

    setEditingTransaction(null);
    setCashBookSubView('overview');
  };

  // Trigger edit on an existing transaction
  const handleEditTransaction = (tx) => {
    setEditingTransaction(tx);
    setEntryMode(tx.type);
    setCashBookSubView('entry');
    setActiveTab('cashbook');
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    showGlobalToast("Transaction deleted");
  };

  // Open entry form for new transaction
  const handleOpenCashBookEntry = (mode) => {
    setEditingTransaction(null);
    setEntryMode(mode);
    setCashBookSubView('entry');
    setActiveTab('cashbook');
  };

  // --------------------------------------------------------------------------
  // CATEGORY MANAGEMENT HANDLERS (Add, Edit, Delete for Income & Expense)
  // --------------------------------------------------------------------------
  const handleAddCategory = (newCat, modeOrType) => {
    const isIncome = modeOrType === 'IN' || modeOrType === 'income';
    if (isIncome) {
      setIncomeCategories(prev => [...prev, newCat]);
    } else {
      setExpenseCategories(prev => [...prev, newCat]);
    }
    showGlobalToast(`Category "${newCat.name}" created!`);
  };

  const handleEditCategory = (updatedCat, modeOrType) => {
    const isIncome = modeOrType === 'IN' || modeOrType === 'income';
    if (isIncome) {
      setIncomeCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
    } else {
      setExpenseCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
    }
    showGlobalToast(`Category "${updatedCat.name}" updated!`);
  };

  const handleDeleteCategory = (catId, modeOrType) => {
    const isIncome = modeOrType === 'IN' || modeOrType === 'income';
    if (isIncome) {
      setIncomeCategories(prev => prev.filter(c => c.id !== catId));
    } else {
      setExpenseCategories(prev => prev.filter(c => c.id !== catId));
    }
    showGlobalToast("Category deleted");
  };

  // --------------------------------------------------------------------------
  // USER PROFILE & ADMIN USER MANAGEMENT HANDLERS
  // --------------------------------------------------------------------------
  // Add new user (Admin capability)
  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    // Initialize default starter balance sheet
    setBalanceSheets({
      ...balanceSheets,
      [newUser.id]: {
        assets: { cashInHand: 5000, bankBalance: Math.round(newUser.monthlySalary * 0.8), savings: 50000, investments: 100000, otherAssets: 50000 },
        liabilities: { homeLoan: 0, personalLoan: 0, creditCard: 5000, otherLiabilities: 0 },
        lastUpdated: new Date().toISOString().slice(0, 10)
      }
    });
    showGlobalToast(`User "${newUser.name}" (${newUser.role}) created successfully!`);
  };

  // Update user profile or status
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    // If the updated user is currently logged in, update currentUser in real time
    if (currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    showGlobalToast(`User "${updatedUser.name}" updated!`);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    if (userId === "usr-admin") {
      alert("The primary administrator account cannot be deleted.");
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
    // Remove their transactions
    setTransactions(transactions.filter(t => t.userId !== userId));
    // If deleted user was active, switch to admin
    if (currentUser.id === userId) {
      setCurrentUser(users.find(u => u.id === "usr-admin") || users[0]);
    }
    showGlobalToast("User and associated transactions removed.");
  };

  // Switch active user
  const handleSwitchUser = (user) => {
    if (user.status === 'inactive') {
      alert(`Access Denied: The account for ${user.name} (${user.email}) is currently INACTIVE. Please contact admin@cashbook.com to reactivate.`);
      return;
    }
    setCurrentUser(user);
    setIsLoggedIn(true);
    try { localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true'); } catch(e) {}
    setEditingTransaction(null);
    setCashBookSubView('overview');
    setShowLoginModal(false);
    showGlobalToast(`Switched account to: ${user.name} (${user.role.toUpperCase()})`);
  };

  // Logout session handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    try { localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false'); } catch(e) {}
    showGlobalToast("You have been signed out.");
  };

  // JSON Import Full Dataset
  const handleImportJSONData = (jsonData) => {
    try {
      if (jsonData.users && Array.isArray(jsonData.users)) setUsers(jsonData.users);
      if (jsonData.transactions && Array.isArray(jsonData.transactions)) setTransactions(jsonData.transactions);
      if (jsonData.incomeCategories && Array.isArray(jsonData.incomeCategories)) setIncomeCategories(jsonData.incomeCategories);
      if (jsonData.expenseCategories && Array.isArray(jsonData.expenseCategories)) setExpenseCategories(jsonData.expenseCategories);
      if (jsonData.balanceSheets) setBalanceSheets(jsonData.balanceSheets);
      if (jsonData.userProfile) setCurrentUser({ ...currentUser, ...jsonData.userProfile });
      showGlobalToast("✓ JSON data imported successfully!");
    } catch (e) {
      alert("Error importing JSON: " + e.message);
    }
  };

  // Reset to initial demo dataset
  const handleResetData = () => {
    setUsers(window.INITIAL_DATA.users);
    setCurrentUser(window.INITIAL_DATA.users[1]); // Rahul Sharma
    setTransactions(window.INITIAL_DATA.transactions);
    setIncomeCategories(window.INITIAL_DATA.incomeCategories);
    setExpenseCategories(window.INITIAL_DATA.expenseCategories);
    setBalanceSheets(window.INITIAL_DATA.balanceSheets);
    localStorage.clear();
    showGlobalToast("Reset to default initial salaried dataset");
  };

  // Clear all transactions
  const handleClearData = () => {
    setTransactions([]);
    showGlobalToast("All transactions cleared");
  };

  // Build Navigation Items (Dynamically shows "Users" tab for admin role)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'cashbook', label: 'Cash Book', icon: 'cashbook' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
    { id: 'categories', label: 'Categories', icon: 'categories' },
    { id: 'profile', label: 'Profile', icon: 'profile' }
  ];

  if (currentUser.role === 'admin') {
    navItems.push({ id: 'adminUsers', label: 'Users', icon: 'users' });
  }

  // Current month balance for header
  const currentMonthBalance = useMemo(() => {
    let inc = 0;
    let exp = 0;
    userTransactions.filter(t => t.date.startsWith('2026-11')).forEach(t => {
      if (t.type === 'IN') inc += Number(t.amount);
      if (t.type === 'OUT') exp += Number(t.amount);
    });
    return inc - exp;
  }, [userTransactions]);

  // If user is not logged in, show the dedicated Full-Screen Login Page
  if (!isLoggedIn) {
    return (
      <window.LoginPage
        users={users}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          try { localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true'); } catch (e) {}
          showGlobalToast(`Welcome back, ${user.name}!`);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col text-slate-800 font-sans antialiased selection:bg-[#9B111E] selection:text-white">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {globalToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl backdrop-blur animate-fade-in flex items-center space-x-2 border border-slate-700">
          <span>{globalToast}</span>
        </div>
      )}

      {/* TOP HEADER NAVBAR (Responsive Full-Width) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-xs w-full">
        <div className="w-full flex items-center justify-between">
          
          {/* Brand & Active User Chip */}
          <div className="flex items-center space-x-3">
            <div
              onClick={() => { setActiveTab('dashboard'); }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-sm sm:text-base shadow-xs cursor-pointer hover:bg-[#850d18] transition"
              title="Go to Dashboard"
            >
              ₹
            </div>
            
            {/* User Profile Info Chip (Clickable to switch user / login) */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-left group focus:outline-hidden"
              title="Click to Switch User / Login"
            >
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-[#9B111E] transition">
                  {currentUser.name}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-red-50 text-[#9B111E] border border-red-200'
                }`}>
                  {currentUser.role}
                </span>
                <span className="text-slate-400 text-xs group-hover:text-slate-600">▼</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:flex items-center space-x-1.5 mt-0.5">
                <span>{currentUser.company} •</span>
                <window.SalaryPrivacyViewer
                  amount={currentUser.monthlySalary}
                  currency={currentUser.currency}
                  currentUser={currentUser}
                  inline={true}
                  size="small"
                />
              </div>
            </button>
          </div>

          {/* DESKTOP & TABLET NAVIGATION BAR (Visible on screens >= 768px) */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'cashbook') setCashBookSubView('overview');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#9B111E] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>{window.getIconComponent(item.icon, { size: 15 })}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center space-x-2">
            
            {/* Net Available Balance Indicator */}
            <div className="hidden sm:flex flex-col text-right mr-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Nov Net Balance</span>
              <span className={`text-xs font-extrabold ${currentMonthBalance >= 0 ? 'text-emerald-700' : 'text-[#9B111E]'}`}>
                {window.formatCurrency(currentMonthBalance, currentUser.currency)}
              </span>
            </div>

            {/* Quick + IN (Income) button */}
            <button
              onClick={() => handleOpenCashBookEntry('IN')}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-lg font-bold text-xs shadow-xs transition flex items-center space-x-1"
              title="Record Money Received"
            >
              <span>+ IN</span>
            </button>

            {/* Quick - OUT (Expense) button */}
            <button
              onClick={() => handleOpenCashBookEntry('OUT')}
              className="px-2.5 sm:px-3 py-1.5 bg-[#9B111E] hover:bg-[#850d18] active:scale-95 text-white rounded-lg font-bold text-xs shadow-xs transition flex items-center space-x-1"
              title="Record Money Spent"
            >
              <span>- OUT</span>
            </button>

            {/* Switch User Icon Button */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Switch User / Quick Login"
            >
              {window.getIconComponent('user-check', { size: 18 })}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 px-2 bg-slate-100 hover:bg-red-50 hover:text-[#9B111E] text-slate-600 rounded-lg text-xs font-bold transition flex items-center space-x-1"
              title="Log Out of Account"
            >
              {window.getIconComponent('log-out', { size: 16 })}
              <span className="hidden lg:inline text-[11px]">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN VIEWPORT BODY CONTAINER (100% Full Screen Responsive) */}
      <main className="flex-1 w-full flex flex-col min-h-0">
        
        {/* 1. DASHBOARD VIEW (Data show as per active user profile) */}
        {activeTab === 'dashboard' && (
          <window.DashboardView
            transactions={userTransactions}
            userProfile={currentUser}
            onNavigateToCashBook={(mode) => {
              if (mode === 'OVERVIEW') {
                setActiveTab('cashbook');
                setCashBookSubView('overview');
              } else {
                handleOpenCashBookEntry(mode);
              }
            }}
            currency={currentUser.currency}
          />
        )}

        {/* 2. CASH BOOK VIEW */}
        {activeTab === 'cashbook' && (
          <>
            {cashBookSubView === 'entry' ? (
              <window.CashBookEntry
                mode={entryMode}
                onBack={() => {
                  setEditingTransaction(null);
                  setCashBookSubView('overview');
                }}
                onSave={handleSaveTransaction}
                categories={entryMode === 'IN' ? incomeCategories : expenseCategories}
                onAddCategory={handleAddCategory}
                sampleAttachments={window.INITIAL_DATA.sampleAttachments}
                deviceMode={isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile')}
                initialTransaction={editingTransaction}
              />
            ) : (
              <window.CashBookOverview
                transactions={userTransactions}
                onOpenEntry={(mode) => handleOpenCashBookEntry(mode)}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={handleEditTransaction}
                currency={currentUser.currency}
              />
            )}
          </>
        )}

        {/* 3. REPORTS VIEW */}
        {activeTab === 'reports' && (
          <window.ReportsView
            transactions={userTransactions}
            balanceSheet={userBalanceSheet}
            onUpdateBalanceSheet={handleUpdateBalanceSheet}
            userProfile={currentUser}
            currency={currentUser.currency}
          />
        )}

        {/* 4. CATEGORIES VIEW */}
        {activeTab === 'categories' && (
          <window.CategoriesView
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            transactions={userTransactions}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            currency={currentUser.currency}
          />
        )}

        {/* 5. PROFILE & SETTINGS VIEW */}
        {activeTab === 'profile' && (
          <window.ProfileSettingsView
            userProfile={currentUser}
            onUpdateProfile={(updated) => handleUpdateUser({ ...currentUser, ...updated })}
            onResetData={handleResetData}
            onClearData={handleClearData}
            transactions={transactions}
            categories={{ income: incomeCategories, expense: expenseCategories }}
            currency={currentUser.currency}
            onOpenLoginModal={() => setShowLoginModal(true)}
            onImportJSONData={handleImportJSONData}
            onLogout={handleLogout}
          />
        )}

        {/* 6. ADMIN USER MANAGEMENT VIEW (Admin role only) */}
        {activeTab === 'adminUsers' && currentUser.role === 'admin' && (
          <window.AdminUserManagementView
            users={users}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onSwitchUser={handleSwitchUser}
            currentUser={currentUser}
            transactions={transactions}
            currency={currentUser.currency}
          />
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {!isDesktop && !isTablet && !(activeTab === 'cashbook' && cashBookSubView === 'entry') && (
        <nav className="sticky bottom-0 z-40 bg-white border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shrink-0 select-none shadow-lg">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'cashbook') setCashBookSubView('overview');
                }}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                  isActive ? 'text-[#9B111E]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className={`p-1 rounded-lg transition ${isActive ? 'bg-red-50' : ''}`}>
                  {window.getIconComponent(item.icon, { size: 20 })}
                </span>
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-extrabold text-[#9B111E]' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}

      {/* LOGIN & USER SWITCHER MODAL */}
      {showLoginModal && (
        <window.LoginAndUserSwitcherModal
          users={users}
          currentUser={currentUser}
          onSelectUser={handleSwitchUser}
          onClose={() => setShowLoginModal(false)}
        />
      )}

    </div>
  );
};

// ============================================================================
// LOGIN AND USER SWITCHER MODAL COMPONENT
// ============================================================================
window.LoginAndUserSwitcherModal = function({ users, currentUser, onSelectUser, onClose }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const user = users.find(u => u.email.toLowerCase() === emailInput.trim().toLowerCase());
    if (!user) {
      setErrorMessage("No account found with this email.");
      return;
    }

    if (user.password !== passwordInput) {
      setErrorMessage("Incorrect password. Please try again.");
      return;
    }

    if (user.status === 'inactive') {
      setErrorMessage(`Account Inactive: ${user.name} has been deactivated. Please contact admin@cashbook.com.`);
      return;
    }

    onSelectUser(user);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl my-6 animate-scale-in">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">User Login & Account Switcher</h3>
            <p className="text-xs text-slate-400">Login with credentials or switch between profiles</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            {window.getIconComponent('x', { size: 18 })}
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-[#9B111E]">
            {errorMessage}
          </div>
        )}

        {/* Credential Login Form */}
        <form onSubmit={handleLoginFormSubmit} className="my-4 space-y-3 text-xs">
          <div>
            <label className="text-slate-600 font-bold block mb-1">Email Address</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. admin@cashbook.com or rahul@cashbook.com"
              className="w-full p-2.5 border border-slate-200 rounded-lg font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
              required
            />
          </div>

          <div>
            <label className="text-slate-600 font-bold block mb-1">Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password (e.g. Passwd@123)"
              className="w-full p-2.5 border border-slate-200 rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-[#9B111E]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#9B111E] hover:bg-[#850d18] text-white rounded-xl font-bold text-xs shadow-xs transition"
          >
            Sign In with Credentials
          </button>
        </form>

        {/* Quick One-Click Switcher */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Or Quick Switch Demo Profile (1-Click)
          </p>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {users.map(u => {
              const isCurrent = currentUser.id === u.id;
              const isActive = u.status === 'active';

              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUser(u)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    isCurrent
                      ? 'border-[#9B111E] bg-red-50/60 ring-1 ring-[#9B111E]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                    <div className="w-8 h-8 rounded-full bg-[#9B111E] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                      {u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">{u.name}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-[#9B111E] text-white px-1.5 py-0.2 rounded-sm font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono truncate block">{u.email}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role}
                    </span>
                    <span className={`block text-[9px] font-bold mt-0.5 ${isActive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isActive ? '● Active' : '● Inactive'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials cheat-sheet */}
        <div className="mt-3.5 p-2 bg-slate-50 rounded-xl text-[10px] text-slate-500 space-y-0.5">
          <p><strong>Admin Login:</strong> admin@cashbook.com • Password: <code>Passwd@123</code></p>
          <p><strong>User Login:</strong> rahul@cashbook.com / akash@cashbook.com • Password: <code>Passwd@123</code></p>
        </div>

      </div>
    </div>
  );
};



// Mount React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(window.App));
}

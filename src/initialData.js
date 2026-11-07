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

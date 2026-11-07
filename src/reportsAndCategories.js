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

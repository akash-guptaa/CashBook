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

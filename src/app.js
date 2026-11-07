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

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

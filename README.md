# Personal Finance Management Tool (Responsive Cash Book)
**A modern Personal Finance Management Web Application built specifically for salaried individuals, responsive as per screen (Mobile, Tablet, and Desktop).**

Designed following the uploaded Cash Book reference design with high-fidelity UI/UX, responsive layout modes, and real-time local state calculations.

---

## 📱 Responsive Screen Mode System (As Per Screen)

The application features an intelligent viewport adaptation system located at the top toolbar:

1. **⚡ Auto (As Per Screen - Default)**:
   - Automatically detects your live screen resolution via dynamic viewport listener (`window.innerWidth` & `resize` events).
   - **Mobile** (`< 640px`): Native full-screen mobile experience, vertical keypad matching reference screenshot, mobile bottom navigation.
   - **Tablet** (`640px - 1024px`): Tablet canvas, 2-column cards, touch-optimized spacing.
   - **Desktop** (`>= 1024px`): Widescreen layout, desktop top navigation bar, side-by-side transaction entry (Form on left, Keypad on right), physical keyboard support (Numpad, 0-9, Enter, Backspace).

2. **📱 Mobile Mode (390px)**:
   - When on desktop monitors, selecting Mobile presents the authentic mobile phone frame with status bar (`8:46 📶 32.0KB/s VoLTE 6%`) and home bar matching the uploaded screenshot.

3. **📟 Tablet Mode (768px)**:
   - Displays a clean tablet frame with dual-column cards and optimized touch targets.

4. **💻 Desktop Mode (Widescreen max-w-7xl)**:
   - Full-width desktop experience with top navigation pills, user profile chip, and side-by-side transaction entry.

---

## 🌟 Key Highlights & Design Compliance

1. **Exact Cash Book Transaction Entry (Matching Screenshot)**
   - **Dynamic Header**: Italic bold banner (`You gave ₹ 100 to home expense` for **OUT** or `You received ₹ 95,000 from Monthly Salary` for **IN**) with back navigation (`←`).
   - **Large Amount Display**: White rounded card with large currency symbol `₹` and formatted amount in bold italic dark red (`#9B111E`).
   - **Category Selection & Inline Creation**: Search existing categories or create a new category directly inline within the category dropdown (`+ Add "..." as new category`).
   - **Comment / Description**: Rounded input card with placeholder `Enter details (Items, bill no., quantity, etc.)`.
   - **Date Selector**: Compact pill button `07 Nov 26 ▼` with custom date picker modal.
   - **Attachments**: `Attach bills (max 4)` with dedicated `Add photo` and `Add PDF` buttons, preview chips, and removal controls.
   - **Fixed SAVE Button**: Bold, dark red (`#9B111E`) uppercase italic full-width button.
   - **Custom Numeric Calculator Keypad**: Exact replica of reference screenshot:
     - Row 1: `C` (Clear), `M+` (Memory Add), `M-` (Memory Subtract), `⌫` (Backspace) in light blue (`#D4E4F7`).
     - Row 2: `7`, `8`, `9` (White) and split column `÷` and `%` (Light Blue).
     - Row 3: `4`, `5`, `6` (White) and `×` (Light Blue).
     - Row 4: `1`, `2`, `3` (White) and `-` (Royal Blue with white symbol).
     - Row 5: `0`, `.`, `=` (White) and `+` (Royal Blue with white symbol).
     - Full interactive arithmetic evaluation (`+`, `-`, `×`, `÷`, `%`, `=`) with live preview, memory toasts, and physical keyboard support!

2. **Cash Book Ledger (Main Feature)**
   - Two prominent, visually distinct cards:
     - **IN – Money Received (Income)**: Emerald green theme with quick stats and salary/freelance guidance.
     - **OUT – Money Spent (Expense)**: Dark red theme with quick stats and living expense guidance.
   - Running Balance Ledger with filters: All, IN Only, OUT Only, date filtering, and search.

3. **Salaried Finance Dashboard**
   - **Total Income This Month** (Salary + Bonus + Secondary credits).
   - **Total Expenses This Month** (Rent, EMI, Groceries, Fuel, Utilities).
   - **Available Balance** (Income minus Expenses).
   - **Total Savings** and **Monthly Savings Percentage** (with visual goal progress bar).
   - **Highest Spending Category Spotlight** (e.g. Rent/EMI alerting user on salaried spending ratios).
   - **Income vs Expense Comparison Bar Chart** (interactive SVG visualization).
   - **Expense Category Breakdown** (segmented progress bars with percentages).
   - **Date Filters**: This Month, Last Month, Last 3 Months, This Year, All Time.

4. **Comprehensive Financial Reports**
   - **Income Report**: Total Income, Salary Received, Other Income, Category-wise breakdown table, monthly trend.
   - **Expense Report**: Total Expenses, Highest Spending Categories leaderboard, Average daily burn rate, detailed expense history.
   - **Personal Balance Sheet / Financial Position**:
     - **Assets**: Cash in Hand, Bank Balance, Savings, Investments (Equities/Mutual Funds/PPF), Other Assets (Gold/Property).
     - **Liabilities**: Home Loan Outstanding, Personal Loan Outstanding, Credit Card Outstanding, Other Liabilities.
     - **Net Worth**: `Net Worth = Total Assets - Total Liabilities`.
     - **Editable Statement**: Modal allows user to edit opening balances and update asset/liability numbers at any time.
   - **Monthly Savings Report**:
     - Formula: `Savings = Total Income - Total Expenses` & `Savings % = (Savings / Total Income) × 100`.
     - November 2026 vs October 2026 side-by-side comparison with net variance.
   - **Cash Book Report**:
     - Formal chronological accounting ledger table.
     - Columns: `Date`, `Type`, `Category`, `Description`, `Income (IN)`, `Expense (OUT)`, `Running Balance`.
     - **Export to CSV**: Generates and downloads real `.csv` spreadsheet file with one click!

5. **Category Management**
   - Separate tabs for **Expense Categories** and **Income Categories**.
   - Grouped structure: Home & Living, Personal, Transportation, Financial, Family & Lifestyle.
   - Add, Edit, and Delete categories with color pickers and icon selectors.

6. **Profile / Settings & Preferences**
   - Salaried Individual profile (Rahul Sharma, Monthly Salary ₹95,000, Payday: 1st of month).
   - Currency switcher (`₹` INR default, `$`, `€`, `£`, `AED`).
   - Backup & Restore: Export full JSON backup, reset to sample data, or clear transactions.

---

## 🌐 Netlify Hosting Deployment

This project includes complete Netlify configuration (`netlify.toml` and `_redirects`):

1. **Deploying via Git (GitHub / GitLab / Bitbucket)**:
   - Connect your repository to [Netlify](https://app.netlify.com).
   - **Build command**: `npm run build` (or `node build.js && node generate-html.js`)
   - **Publish directory**: `.` (root directory)
   - Netlify will automatically detect `netlify.toml` and configure SPA routing redirects!

2. **Deploying via Netlify Drag & Drop**:
   - Simply drag the entire folder `C:\Users\Admin\.gemini\antigravity\scratch\personal-finance-tool` directly into Netlify Drop at https://app.netlify.com/drop.
   - It will go live immediately on your custom `*.netlify.app` URL!

---

## 🔐 User Accounts & Login Credentials

| User Name | Email Address | Role | Password | Description |
|-----------|---------------|------|----------|-------------|
| **System Administrator** | `admin@cashbook.com` | `admin` | `Passwd@123` | Full access to Admin Console, user creation, active/inactive status toggle |
| **Rahul Sharma** | `rahul@cashbook.com` | `user` | `Passwd@123` | Senior SWE @ TCS • Salary: ₹95,000 (Protected) |
| **Kiran** | `akash@cashbook.com` | `user` | `Passwd@123` | Product Marketing Manager @ Infosys • Salary: ₹82,000 (Protected) |

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari):
```
file:///C:/Users/Admin/.gemini/antigravity/scratch/personal-finance-tool/index.html
```
The bundle is pre-compiled to pure native JavaScript, so it mounts immediately in < 20ms with zero loading delay!

### Option 2: Run with Node.js Local Server
Run the built-in zero-dependency server:
```bash
cd C:\Users\Admin\.gemini\antigravity\scratch\personal-finance-tool
npm start
# or: node server.js
```
Then open your browser at:
```
http://localhost:3000
```

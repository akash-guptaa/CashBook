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

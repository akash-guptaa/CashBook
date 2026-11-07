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

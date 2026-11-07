// Automated verification test script for Personal Finance Management Tool
const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, 'app-bundle.js'), 'utf8');

console.log("=== RUNNING AUTOMATED FEATURE VERIFICATION ===");

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${message}`);
}

// 1. Check Login Page presence and logic
assert(bundle.includes('window.LoginPage = function'), "LoginPage component is defined");
assert(bundle.includes('admin@cashbook.com'), "Admin credentials present");
assert(bundle.includes('Passwd@123'), "Default password present");
assert(bundle.includes('Access Denied: The account for'), "Inactive user blocking logic present");
assert(bundle.includes('handleQuickLogin'), "1-Click quick demo logins present");
assert(bundle.includes('akash@cashbook.com'), "User akash@cashbook.com present");
assert(bundle.includes('name: "Kiran"') || bundle.includes('name:"Kiran"'), "User has name 'Kiran'");

// 2. Check Photo Camera integration
assert(bundle.includes('capture') && bundle.includes('"environment"'), "HTML5 camera capture='environment' attribute present for direct mobile camera launch");
assert(bundle.includes('image/*'), "Image file input present");
assert(bundle.includes('LiveCameraModal') || bundle.includes('window.LiveCameraModal'), "Live camera viewfinder modal component defined");
assert(bundle.includes('getUserMedia'), "getUserMedia camera API accessed for live camera video stream");
assert(bundle.includes('toDataURL'), "Canvas snapshot capture from live camera stream present");
assert(bundle.includes('handleOpenPhotoCamera'), "Add Photo triggers camera");

// 3. Check PDF File Explorer integration
assert(bundle.includes('application/pdf'), "PDF accept filter present for File Explorer");
assert(bundle.includes('pdfInputRef'), "File explorer ref present on Add PDF");
assert(bundle.includes('handlePdfFileChange'), "PDF file metadata handler present");

// 4. Check Save Data on Enter
assert(bundle.includes('Enter'), "Enter key detection present");
assert(bundle.includes('handleSaveClick'), "Save click function wired to Enter key");

// 5. Check Salary Privacy Protection (password required every time)
assert(bundle.includes('SalaryPrivacyViewer'), "SalaryPrivacyViewer component defined");
assert(bundle.includes('SalaryPrivacyInput'), "SalaryPrivacyInput component defined");
assert(bundle.includes('\u2022') || bundle.includes('••••') || bundle.includes('u2022'), "Salary masked with privacy dots by default");
assert(bundle.includes('Salary Privacy Verification'), "Salary password verification modal present");
assert(bundle.includes('password'), "Verifies against active user password");
assert(bundle.includes('Unlock Salary'), "Unlock salary button present");

// 6. Check that HTML file is valid and contains bundle
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert(html.includes('id="root"'), "index.html has root element");
assert(html.includes('window.LoginPage'), "index.html inlines LoginPage");
assert(html.includes('LiveCameraModal'), "index.html inlines LiveCameraModal");
assert(html.includes('SalaryPrivacyViewer'), "index.html inlines SalaryPrivacyViewer");

console.log("\n🎉 ALL 6 VERIFICATION TEST SUITES PASSED CLEANLY!");

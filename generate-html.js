const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, 'app-bundle.js'), 'utf8');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Personal Finance Management Tool • Cash Book</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              red: '#9B111E',
              redDark: '#7B0D18',
              redLight: '#FBECEE',
              blue: '#0C5BA6',
              blueLight: '#D4E4F7',
              blueSoft: '#EDF5FD'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
          }
        }
      }
    };
  </script>

  <!-- Custom Styles & Animations -->
  <style>
    * {
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box;
    }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F8FAFC;
      color: #1E293B;
      overflow-x: hidden;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in {
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-slide-up {
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-scale-in {
      animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  </style>

  <!-- React 18 & ReactDOM CDN with cdnjs (Fastest global CDN with high uptime) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
</head>
<body>
  <!-- Root React App Container -->
  <div id="root">
    <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748B; font-family: sans-serif; font-size: 14px; gap: 12px;">
      <div style="width: 48px; height: 48px; border-radius: 12px; background: #9B111E; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        ₹
      </div>
      <div style="font-weight: 600; color: #1E293B;">Cash Book • Personal Finance Tool</div>
      <div style="font-size: 12px; color: #94A3B8;">Loading application...</div>
    </div>
  </div>

  <!-- Global Error Handler & Recovery Helper -->
  <script>
    window.addEventListener('error', function(e) {
      console.error('App runtime error:', e.error || e.message);
      var root = document.getElementById('root');
      if (root && root.innerHTML.includes('Loading application...')) {
        root.innerHTML = '<div style=\"min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: sans-serif;\">' +
          '<div style=\"background: white; border-radius: 16px; padding: 24px; max-width: 420px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; border: 1px solid #E2E8F0;\">' +
          '<div style=\"width: 44px; height: 44px; background: #FEF2F2; color: #9B111E; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-weight: bold; font-size: 20px;\">!</div>' +
          '<h3 style=\"color: #0F172A; font-size: 16px; font-weight: bold; margin: 0 0 6px;\">Unable to Load Cash Book</h3>' +
          '<p style=\"color: #64748B; font-size: 12px; margin: 0 0 16px;\">' + (e.message || 'An initialization error occurred.') + '</p>' +
          '<button onclick=\"localStorage.clear(); location.reload();\" style=\"width: 100%; padding: 10px; background: #9B111E; color: white; border: none; border-radius: 10px; font-weight: bold; font-size: 13px; cursor: pointer;\">Clear Local Cache & Reload</button>' +
          '</div></div>';
      }
    });
  </script>

  <!-- Pre-compiled Native JavaScript Bundle (Zero Babel compilation delay) -->
  <script>
${bundle}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlTemplate, 'utf8');
console.log('Successfully generated index.html with pre-compiled bundle!');

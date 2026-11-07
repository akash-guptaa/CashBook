const fs = require('fs');
const path = require('path');

const srcFiles = [
  'src/initialData.js',
  'src/icons.js',
  'src/loginAndSecurity.js',
  'src/components.js',
  'src/views.js',
  'src/reportsAndCategories.js',
  'src/adminView.js',
  'src/app.js'
];

let rawBundle = '// Combined Personal Finance Management Tool Bundle\n\nconst { useState, useEffect, useMemo, useRef, useCallback } = React;\n\n';

srcFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  rawBundle += `// ===== FILE: ${file} =====\n`;
  rawBundle += fs.readFileSync(filePath, 'utf8') + '\n\n';
});

rawBundle += `
// Mount React App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(window.App));
}
`;

fs.writeFileSync(path.join(__dirname, 'app-bundle.raw.js'), rawBundle, 'utf8');

// Pre-compile JSX with Babel so browsers run pure, native JavaScript with ZERO in-browser compilation lag
let compiledCode = null;
try {
  let babel;
  let presetReact;
  try {
    babel = require('@babel/core');
    presetReact = '@babel/preset-react';
  } catch (e1) {
    const npxBabel = 'C:/Users/Admin/AppData/Local/npm-cache/_npx/249ca9fcd30c476a/node_modules/@babel/core';
    const npxPreset = 'C:/Users/Admin/AppData/Local/npm-cache/_npx/249ca9fcd30c476a/node_modules/@babel/preset-react';
    babel = require(npxBabel);
    presetReact = npxPreset;
  }

  const res = babel.transformSync(rawBundle, {
    presets: [presetReact],
    filename: 'app-bundle.js'
  });
  compiledCode = res.code;
  fs.writeFileSync(path.join(__dirname, 'app-bundle.js'), compiledCode, 'utf8');
  console.log('✓ Successfully pre-compiled JSX bundle to plain JavaScript (Size: ' + compiledCode.length + ' bytes)!');
} catch (err) {
  console.warn('Pre-compilation note (using raw bundle):', err.message);
  fs.writeFileSync(path.join(__dirname, 'app-bundle.js'), rawBundle, 'utf8');
}

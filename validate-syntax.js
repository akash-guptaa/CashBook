const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, 'app-bundle.js'), 'utf8');

// Basic bracket and tag balancing check
const openBraces = (bundle.match(/{/g) || []).length;
const closeBraces = (bundle.match(/}/g) || []).length;
console.log(`Braces count: { = ${openBraces}, } = ${closeBraces}`);

const openParens = (bundle.match(/\(/g) || []).length;
const closeParens = (bundle.match(/\)/g) || []).length;
console.log(`Parens count: ( = ${openParens}, ) = ${closeParens}`);

if (openBraces === closeBraces && openParens === closeParens) {
  console.log('Syntax bracket balance is valid!');
} else {
  console.warn('Warning: Bracket count mismatch');
}

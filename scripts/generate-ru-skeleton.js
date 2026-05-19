// Generates a skeleton ru.json by replacing all English string values with empty strings
// Run: node scripts/generate-ru-skeleton.js

const fs = require('fs');
const path = require('path');

function replaceValuesWithEmpty(obj) {
  if (typeof obj === 'string') return '';
  if (Array.isArray(obj)) return obj.map(replaceValuesWithEmpty);
  if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = replaceValuesWithEmpty(obj[key]);
    }
    return result;
  }
  return obj;
}

const enPath = path.join(__dirname, '..', 'en.json');
const ruPath = path.join(__dirname, '..', 'ru.json');
const srcRuPath = path.join(__dirname, '..', 'src', 'i18n', 'messages', 'ru.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const ru = replaceValuesWithEmpty(en);

// Add localeNativeRussian to the nav object
if (ru.nav) {
  ru.nav.localeNativeRussian = '';
}

const content = JSON.stringify(ru, null, 2);

fs.writeFileSync(ruPath, content + '\n', 'utf-8');
fs.writeFileSync(srcRuPath, content + '\n', 'utf-8');

console.log('Generated ru.json at:');
console.log('  -', ruPath);
console.log('  -', srcRuPath);

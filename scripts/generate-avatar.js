#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Criar um avatar SVG com iniciais JBA em PNG
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient Background -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0066ff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#6b21a8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0066ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Rounded square background -->
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  
  <!-- Letter J -->
  <text x="90" y="320" font-family="Arial, sans-serif" font-size="160" font-weight="700" fill="white">J</text>
  
  <!-- Letter B -->
  <text x="220" y="320" font-family="Arial, sans-serif" font-size="160" font-weight="700" fill="white">B</text>
  
  <!-- Letter A -->
  <text x="380" y="320" font-family="Arial, sans-serif" font-size="160" font-weight="700" fill="white">A</text>
</svg>`;

// Salvar SVG
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const svgPath = path.join(publicDir, 'avatar.svg');
fs.writeFileSync(svgPath, svgContent);

console.log('✅ Avatar SVG criado em:', svgPath);
console.log('\n📝 Para converter SVG em PNG, use:');
console.log('   npx sharp avatar.svg -o avatar.png');
console.log('\nOu instale e use ImageMagick:');
console.log('   convert avatar.svg avatar.png');

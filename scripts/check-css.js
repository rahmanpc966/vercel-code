const fs = require('fs');
const path = require('path');

console.log('🔍 CSS Configuration Check\n');

// Check if globals.css exists and has Tailwind directives
const globalsPath = path.join(__dirname, '..', 'app', 'globals.css');
if (fs.existsSync(globalsPath)) {
  const content = fs.readFileSync(globalsPath, 'utf8');
  console.log('✅ globals.css exists');
  
  if (content.includes('@tailwind base')) {
    console.log('✅ @tailwind base directive found');
  } else {
    console.log('❌ @tailwind base directive missing');
  }
  
  if (content.includes('@tailwind components')) {
    console.log('✅ @tailwind components directive found');
  } else {
    console.log('❌ @tailwind components directive missing');
  }
  
  if (content.includes('@tailwind utilities')) {
    console.log('✅ @tailwind utilities directive found');
  } else {
    console.log('❌ @tailwind utilities directive missing');
  }
} else {
  console.log('❌ globals.css not found');
}

// Check tailwind.config.ts
const tailwindPath = path.join(__dirname, '..', 'tailwind.config.ts');
if (fs.existsSync(tailwindPath)) {
  console.log('✅ tailwind.config.ts exists');
} else {
  console.log('❌ tailwind.config.ts not found');
}

// Check postcss.config.mjs
const postcssPath = path.join(__dirname, '..', 'postcss.config.mjs');
if (fs.existsSync(postcssPath)) {
  const content = fs.readFileSync(postcssPath, 'utf8');
  console.log('✅ postcss.config.mjs exists');
  
  if (content.includes('tailwindcss')) {
    console.log('✅ tailwindcss plugin configured');
  } else {
    console.log('❌ tailwindcss plugin missing');
  }
  
  if (content.includes('autoprefixer')) {
    console.log('✅ autoprefixer plugin configured');
  } else {
    console.log('❌ autoprefixer plugin missing');
  }
} else {
  console.log('❌ postcss.config.mjs not found');
}

// Check package.json for required dependencies
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log('✅ package.json exists');
  
  const requiredDeps = ['tailwindcss', 'postcss', 'autoprefixer'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} dependency found`);
    } else {
      console.log(`❌ ${dep} dependency missing`);
    }
  });
} else {
  console.log('❌ package.json not found');
}

console.log('\n🎯 CSS Check Complete!');
console.log('\n📝 Next Steps:');
console.log('1. Visit http://localhost:3000/css-test to see if CSS is working');
console.log('2. Check browser developer tools for any CSS errors');
console.log('3. Verify that Tailwind classes are being applied');

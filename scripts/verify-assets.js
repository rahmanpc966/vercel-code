const fs = require("fs")
const path = require("path")

const requiredFiles = [
  "logo.svg",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "site.webmanifest",
]

const publicDir = path.join(process.cwd(), "public")

console.log("Checking for required files in public directory...")

const missingFiles = []

for (const file of requiredFiles) {
  const filePath = path.join(publicDir, file)
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file)
  } else {
    console.log(`✓ ${file} exists`)
  }
}

if (missingFiles.length > 0) {
  console.error("\nMissing files:")
  missingFiles.forEach((file) => console.error(`✗ ${file} is missing`))
  console.error("\nPlease add these files to your public directory.")
} else {
  console.log("\nAll required files are present in the public directory.")
}

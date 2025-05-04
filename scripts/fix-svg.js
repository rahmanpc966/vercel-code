const fs = require("fs")
const path = require("path")

// Path to the original SVG file
const originalSvgPath = path.join(process.cwd(), "public", "logo.svg")
// Path to save the fixed SVG file
const fixedSvgPath = path.join(process.cwd(), "public", "logo-fixed.svg")

try {
  // Read the original SVG file
  const svgContent = fs.readFileSync(originalSvgPath, "utf8")

  console.log("Original SVG content:")
  console.log(svgContent.substring(0, 200) + "...")

  // Check if the SVG has a viewBox attribute
  if (!svgContent.includes("viewBox")) {
    console.log("Warning: SVG does not have a viewBox attribute")
  }

  // Check if the SVG has fill attributes
  if (!svgContent.includes('fill="')) {
    console.log("Warning: SVG might not have fill attributes, which could make it invisible")
  }

  // Create a fixed version with a white background
  let fixedSvg = svgContent

  // If the SVG doesn't start with the XML declaration, add it
  if (!fixedSvg.startsWith("<?xml")) {
    fixedSvg = '<?xml version="1.0" encoding="UTF-8"?>\n' + fixedSvg
  }

  // Find the opening <svg> tag
  const svgTagMatch = fixedSvg.match(/<svg[^>]*>/)
  if (svgTagMatch) {
    const svgTag = svgTagMatch[0]

    // Add a white background rectangle right after the opening <svg> tag
    const backgroundRect = `<rect width="100%" height="100%" fill="#ffffff" rx="4" ry="4"/>`
    fixedSvg = fixedSvg.replace(svgTag, svgTag + "\n  " + backgroundRect)

    // Write the fixed SVG to a new file
    fs.writeFileSync(fixedSvgPath, fixedSvg)
    console.log(`Fixed SVG saved to ${fixedSvgPath}`)
  } else {
    console.error("Could not find opening <svg> tag")
  }
} catch (error) {
  console.error("Error processing SVG file:", error)
}

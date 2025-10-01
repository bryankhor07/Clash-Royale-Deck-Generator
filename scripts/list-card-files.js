const fs = require("fs");
const path = require("path");

const cardsDir = path.join(__dirname, "../public/cards");

if (!fs.existsSync(cardsDir)) {
  console.log("public/cards/ directory not found");
  process.exit(1);
}

const files = fs.readdirSync(cardsDir)
  .filter(f => f.endsWith('.png') || f.endsWith('.webp'))
  .sort();

console.log(`Found ${files.length} image files in public/cards/:\n`);

files.slice(0, 30).forEach(file => {
  console.log(`  ${file}`);
});

if (files.length > 30) {
  console.log(`\n  ... and ${files.length - 30} more`);
}

console.log("\n\nSample comparison:");
console.log("Expected format: hog-rider.png");
console.log("Actual files:   ", files[0]);

const fs = require("fs");
const path = require("path");

const cardsPath = path.join(__dirname, "../data/cards.json");
const cardsDir = path.join(__dirname, "../public/cards");

// Read cards.json
const cards = JSON.parse(fs.readFileSync(cardsPath, "utf-8"));

// Get all files in public/cards/ (png and webp)
let availableFiles = [];
if (fs.existsSync(cardsDir)) {
  availableFiles = fs.readdirSync(cardsDir).filter(f => f.endsWith('.png') || f.endsWith('.webp'));
}

console.log(`Found ${availableFiles.length} images in public/cards/\n`);

// Convert card name to PascalCase filename format
function toFilename(name) {
  return name
    .replace(/\./g, "") // Remove periods
    .split(/\s+/) // Split by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(""); // Join without spaces
}

let updated = 0;
let notFound = [];

// Update each card
for (const card of cards) {
  const baseFilename = toFilename(card.name);
  
  // Check for .webp first (preferred), then .png
  let matchedFile = null;
  if (availableFiles.includes(`${baseFilename}.webp`)) {
    matchedFile = `${baseFilename}.webp`;
  } else if (availableFiles.includes(`${baseFilename}.png`)) {
    matchedFile = `${baseFilename}.png`;
  }
  
  if (matchedFile) {
    card.image = `/cards/${matchedFile}`;
    console.log(`✓ ${card.name} → /cards/${matchedFile}`);
    updated++;
  } else {
    console.log(`✗ ${card.name} → file not found: ${baseFilename}.png or .webp`);
    notFound.push({ name: card.name, expected: `${baseFilename}.png or .webp` });
  }
}

// Write updated cards.json
fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2), "utf-8");

console.log(`\n✓ Updated ${updated} cards in ${cardsPath}`);

if (notFound.length > 0) {
  console.log(`\n⚠ ${notFound.length} cards without matching images:`);
  notFound.forEach(item => {
    console.log(`  - ${item.name} (expected: ${item.expected})`);
  });
}

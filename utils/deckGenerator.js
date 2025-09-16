import cards from "../data/cards.json";

// Utility to pick a random card from a role
function pickRandom(role, excludeIds = []) {
  const pool = cards.filter(
    (c) => c.role === role && !excludeIds.includes(c.id)
  );
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function tryGenerate(winConCard, maxElixir, attempts = 20) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const chosen = [winConCard];
    const exclude = [winConCard.id];

    // Follow role slots
    const roles = [
      "Big Spell",
      "Small Spell",
      "Building",
      "Splash Damage",
      "Support",
      "Cycle",
      "Cycle",
    ];

    for (let role of roles) {
      const card = pickRandom(role, exclude);
      if (card) {
        chosen.push(card);
        exclude.push(card.id);
      }
    }

    if (chosen.length < 8) continue; // failed to fill deck

    const avgElixir =
      chosen.reduce((sum, card) => sum + card.elixir, 0) / chosen.length;

    if (avgElixir <= maxElixir) {
      // Determine archetype
      let archetype = "Unknown";
      const beatdown = [
        "Golem",
        "P.E.K.K.A",
        "Giant",
        "Sparky",
        "Goblin Giant",
        "Electro Giant",
        "Mega Knight",
        "Giant Skeleton",
      ];
      const cycle = ["Hog Rider", "Miner", "Ram Rider", "Bandit"];
      const siege = ["X-Bow", "Mortar"];
      const control = [
        "Royal Giant",
        "Balloon",
        "Graveyard",
        "Lava Hound",
        "Royal Recruits",
      ];

      if (beatdown.includes(winConCard.name)) archetype = "Beatdown";
      else if (cycle.includes(winConCard.name)) archetype = "Cycle";
      else if (siege.includes(winConCard.name)) archetype = "Siege";
      else if (control.includes(winConCard.name)) archetype = "Control";

      return {
        deck: chosen,
        avgElixir: avgElixir.toFixed(2),
        archetype,
      };
    }
  }
  return null;
}

/**
 * Generate a deck based on filters
 * @param {Object} filters
 * @param {string} filters.winCondition - name of the win condition card
 * @param {number} filters.maxElixir - maximum allowed average elixir
 */
export function generateDeck({ winCondition, maxElixir }) {
  const winConCard = cards.find(
    (c) => c.name === winCondition && c.role === "Win Condition"
  );

  if (!winConCard) {
    throw new Error("Invalid win condition card");
  }

  // Try with strict maxElixir
  let result = tryGenerate(winConCard, maxElixir);
  if (result) return result;

  // Retry with a slightly looser constraint (+0.5)
  result = tryGenerate(winConCard, maxElixir + 0.5, 10);
  if (result) {
    return {
      ...result,
      note: "Deck generated with relaxed max elixir constraint (+0.5)",
    };
  }

  // Still failed
  return {
    deck: [],
    avgElixir: null,
    archetype: "Unknown",
    note: "No valid deck could be generated with given filters",
  };
}

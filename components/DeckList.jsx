import DeckCard from "./DeckCard";

export default function DeckList({
  deck,
  avgElixir,
  archetype,
  note,
  onRetry,
  onEmptyCta,
}) {
  // Build role coverage map
  const targetRoles = [
    "Win Condition",
    "Big Spell",
    "Small Spell",
    "Building",
    "Splash Damage",
    "Support",
    "Cycle",
  ];

  const roleDescriptions = {
    "Win Condition": "Primary card to win the game (e.g., Hog Rider, RG).",
    "Big Spell": "High-damage spell for medium/large troops and towers.",
    "Small Spell": "Cheap spell to clear swarms or reset.",
    Building: "Defensive structure to distract or defend.",
    "Splash Damage": "Area damage to handle swarms.",
    Support: "Single-target or utility support behind pushes.",
    Cycle: "Low-cost cards to cycle and defend efficiently.",
  };

  const roleCounts = (deck || []).reduce((acc, c) => {
    const r = c.role;
    if (r && targetRoles.includes(r)) acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  if (!deck || deck.length === 0) {
    return (
      <div className="mt-8 p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">🃏</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No deck generated yet
        </h3>
        <p className="text-gray-500 mb-4">
          Choose your filters and create your winning strategy!
        </p>
        {note && <p className="text-sm text-red-500 italic mb-4">{note}</p>}
        <button
          onClick={onEmptyCta}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
        >
          Generate your first deck
        </button>
      </div>
    );
  }

  const copyAsText = async () => {
    const names = deck.map((c) => c.name).join(", ");
    const text = `Deck: ${names}\nAvg Elixir: ${avgElixir}\nArchetype: ${archetype}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Deck copied to clipboard!");
    } catch (e) {
      console.error(e);
      alert("Failed to copy deck.");
    }
  };

  const makeShareLink = () => {
    const ids = deck.map((c) => c.id).join("-");
    const url = new URL(window.location.href);
    url.searchParams.set("deck", ids);
    return url.toString();
  };

  const copyShareLink = async () => {
    const link = makeShareLink();
    try {
      await navigator.clipboard.writeText(link);
      alert("Share link copied!");
    } catch (e) {
      console.error(e);
      alert("Failed to copy link.");
    }
  };

  const exportAsImage = () => {
    // Simple canvas export listing the deck contents
    const canvas = document.createElement("canvas");
    const width = 900;
    const height = 500;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#6366f1");
    gradient.addColorStop(1, "#ec4899");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText("Clash Royale Deck", 30, 50);
    ctx.font = "16px Arial";
    ctx.fillText(`Archetype: ${archetype}  |  Avg Elixir: ${avgElixir}`, 30, 80);
    // Cards
    ctx.font = "18px Arial";
    deck.forEach((c, i) => {
      ctx.fillText(`${i + 1}. ${c.name} (${c.role}, ${c.elixir})`, 30, 120 + i * 35);
    });
    // Download
    const link = document.createElement("a");
    link.download = "deck.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mt-8">
      <div className="sr-only" aria-live="polite">Deck generated. Archetype {archetype}, Avg Elixir {avgElixir}.</div>
      {/* Deck header with animated background */}
      <div className="relative p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl text-white mb-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
          <div
            className="absolute top-12 right-8 w-6 h-6 bg-white/70 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-6 left-12 w-4 h-4 bg-white/50 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <span>👑</span>
              Generated Deck
              <span>👑</span>
            </h2>
          </div>

          {/* Deck Stats */}
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{avgElixir}</div>
              <div className="text-sm opacity-90">⚡ Avg Elixir</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{archetype}</div>
              <div className="text-sm opacity-90">🎯 Archetype</div>
            </div>
          </div>

          {/* Role coverage */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl mx-auto mb-4">
            {targetRoles.map((r) => (
              <span
                key={r}
                title={roleDescriptions[r]}
                className={`text-xs px-3 py-1 rounded-full bg-white/20 inline-flex items-center justify-center gap-2`}
                aria-label={`${r}: ${roleCounts[r] || 0}`}
              >
                <strong>{r}</strong>
                <span className="opacity-80">{roleCounts[r] || 0}</span>
              </span>
            ))}
          </div>

          {/* Note if exists */}
          {note && (
            <p className="text-center text-yellow-200 text-sm italic">{note}</p>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {deck.map((card, index) => (
          <DeckCard key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          onClick={onRetry}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span>🔄</span>
            Try Another Deck
          </div>
        </button>

        <button
          onClick={copyAsText}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
          aria-label="Copy deck as text"
        >
          📋 Copy Deck
        </button>

        <button
          onClick={copyShareLink}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/40"
          aria-label="Copy share link"
        >
          🔗 Share Link
        </button>

        <button
          onClick={exportAsImage}
          className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-500/40"
          aria-label="Export deck as image"
        >
          🖼️ Export Image
        </button>
      </div>
    </div>
  );
}

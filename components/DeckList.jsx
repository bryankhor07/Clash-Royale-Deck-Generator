import DeckCard from "./DeckCard";

export default function DeckList({
  deck,
  avgElixir,
  archetype,
  note,
  onRetry,
}) {
  if (!deck || deck.length === 0) {
    return (
      <div className="mt-8 p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">🃏</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No deck generated yet
        </h3>
        <p className="text-gray-500 mb-2">
          Choose your filters and create your winning strategy!
        </p>
        {note && <p className="text-sm text-red-500 italic">{note}</p>}
      </div>
    );
  }

  return (
    <div className="mt-8">
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
              <div className="text-3xl font-bold">{avgElixir}</div>
              <div className="text-sm opacity-90">⚡ Avg Elixir</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{archetype}</div>
              <div className="text-sm opacity-90">🎯 Archetype</div>
            </div>
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
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span>🔄</span>
            Try Another Deck
          </div>
        </button>
      </div>
    </div>
  );
}

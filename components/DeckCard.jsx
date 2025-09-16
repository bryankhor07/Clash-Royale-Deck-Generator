export default function DeckCard({ card, index }) {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-600";
      case "rare":
        return "from-orange-400 to-orange-600";
      case "epic":
        return "from-purple-400 to-purple-600";
      case "legendary":
        return "from-yellow-400 to-yellow-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getElixirColor = (elixir) => {
    if (elixir <= 2) return "text-green-600 bg-green-100";
    if (elixir <= 4) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Rarity border */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
          card.rarity
        )} opacity-20 group-hover:opacity-30 transition-opacity`}
      ></div>

      <div className="relative p-4">
        {/* Elixir cost badge */}
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 ${getElixirColor(
            card.elixir
          )} rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10`}
        >
          {card.elixir}
        </div>

        {/* Card image */}
        <div className="relative mb-3">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-24 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Card info */}
        <div className="text-center">
          <h3 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
            {card.name}
          </h3>
          <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
            {card.role}
          </span>
        </div>
      </div>
    </div>
  );
}

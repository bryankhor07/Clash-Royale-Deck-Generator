"use client";

import { useState } from "react";

export default function Filters({ onApply }) {
  const [winCondition, setWinCondition] = useState("");
  const [maxElixir, setMaxElixir] = useState(4.5);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!winCondition) {
      alert("Select your champion");
      return;
    }

    setIsGenerating(true);

    // Simulate loading
    setTimeout(() => {
      onApply({ winCondition, maxElixir });
      setIsGenerating(false);
    }, 1500);
  };

  const winConditions = [
    "Hog Rider",
    "Giant",
    "Royal Giant",
    "Miner",
    "Graveyard",
    "X-Bow",
    "Lava Hound",
    "Golem",
    "P.E.K.K.A",
    "Balloon",
  ];

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"></div>

      <form
        onSubmit={handleSubmit}
        className="relative p-8 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-2xl max-w-md mx-auto overflow-hidden"
      >
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-2xl">⚔️</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Deck Filters
          </h2>
        </div>

        {/* Win Condition */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-3">
            🏆 Win Condition
          </label>
          <div className="relative">
            <select
              value={winCondition}
              onChange={(e) => setWinCondition(e.target.value)}
              className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm text-gray-800 font-medium shadow-sm hover:shadow-md appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled className="text-gray-400">
                ✨ Select your champion ✨
              </option>
              {winConditions.map((condition) => (
                <option
                  key={condition}
                  value={condition}
                  className="text-gray-800 py-2"
                >
                  {condition === "Hog Rider" && "🐗"}
                  {condition === "Giant" && "🗿"}
                  {condition === "Royal Giant" && "👑"}
                  {condition === "Miner" && "⛏️"}
                  {condition === "Graveyard" && "💀"}
                  {condition === "X-Bow" && "🏹"}
                  {condition === "Lava Hound" && "🌋"}
                  {condition === "Golem" && "🪨"}
                  {condition === "P.E.K.K.A" && "🤖"}
                  {condition === "Balloon" && "🎈"}
                  {" " + condition}
                </option>
              ))}
            </select>

            {/* Custom dropdown indicator with hover effect */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </div>

            {/* Selection indicator */}
            {winCondition && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Max Elixir with visual indicator */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-3">
            ⚡ Max Average Elixir:{" "}
            <span className="text-purple-600">{maxElixir}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              value={maxElixir}
              onChange={(e) => setMaxElixir(parseFloat(e.target.value))}
              min="2.0"
              max="6.0"
              step="0.1"
              className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #f59e0b 50%, #ef4444 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Fast</span>
              <span>Balanced</span>
              <span>Heavy</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:transform-none"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating Magic...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>🎲</span>
              Generate Deck
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

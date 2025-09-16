"use client";

import { useState } from "react";
import { generateDeck } from "@/utils/deckGenerator";
import Filters from "@/components/Filters";
import DeckList from "@/components/DeckList";
import Image from "next/image";

export default function Home() {
  const [deckData, setDeckData] = useState({
    deck: [],
    avgElixir: null,
    archetype: "Unknown",
  });
  const [lastFilters, setLastFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    setLastFilters(filters);
    const result = generateDeck(filters);
    setDeckData(result);
  };

  const handleRetry = () => {
    if (lastFilters) {
      const result = generateDeck(lastFilters);
      setDeckData(result);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ClashRoyaleBg.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Main header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-md">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              CLASH
            </span>{" "}
            <span className="bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
              ROYALE
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Deck Generator
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Create the perfect deck strategy with our intelligent generator.
            Choose your win condition and elixir preference to dominate the
            arena!
            <span className="text-2xl ml-2">⚔️</span>
          </p>
        </div>

        <Filters onApply={handleApplyFilters} />
        <DeckList
          deck={deckData.deck}
          avgElixir={deckData.avgElixir}
          archetype={deckData.archetype}
          note={deckData.note}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}

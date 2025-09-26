"use client";

import { useEffect, useState } from "react";
import { generateDeck } from "@/utils/deckGenerator";
import Filters from "@/components/Filters";
import DeckList from "@/components/DeckList";
import Image from "next/image";
import cards from "@/data/cards.json";

export default function Home() {
  const [deckData, setDeckData] = useState({
    deck: [],
    avgElixir: null,
    archetype: "Unknown",
  });
  const [lastFilters, setLastFilters] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleApplyFilters = (filters) => {
    setLastFilters(filters);
    const result = generateDeck(filters);
    setDeckData(result);
    try {
      localStorage.setItem("lastDeckData", JSON.stringify(result));
      localStorage.setItem("lastFilters", JSON.stringify(filters));
    } catch {}
  };

  const handleRetry = () => {
    if (lastFilters) {
      const result = generateDeck(lastFilters);
      setDeckData(result);
      try {
        localStorage.setItem("lastDeckData", JSON.stringify(result));
      } catch {}
    }
  };

  const handleLoadingChange = (loading) => {
    setIsGenerating(loading);
  };

  const handleEmptyCta = () => {
    const el = document.getElementById("winConditionSelect");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.focus(), 400);
    }
  };

  // On mount: hydrate from URL or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const deckParam = params.get("deck");
      if (deckParam) {
        const ids = deckParam
          .split("-")
          .map((s) => parseInt(s, 10))
          .filter((n) => !Number.isNaN(n));
        const selected = cards.filter((c) => ids.includes(c.id));
        if (selected.length > 0) {
          const avg = (
            selected.reduce((sum, c) => sum + (c.elixir || 0), 0) /
            selected.length
          ).toFixed(2);
          setDeckData({ deck: selected, avgElixir: avg, archetype: "Imported" });
          return;
        }
      }

      const stored = localStorage.getItem("lastDeckData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.deck) setDeckData(parsed);
      }
      const storedFilters = localStorage.getItem("lastFilters");
      if (storedFilters) setLastFilters(JSON.parse(storedFilters));
    } catch {}
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top loading bar */}
      <div
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 z-50 ${
          isGenerating ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
        aria-hidden={!isGenerating}
      />
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

        <Filters onApply={handleApplyFilters} onLoadingChange={handleLoadingChange} />
        <DeckList
          deck={deckData.deck}
          avgElixir={deckData.avgElixir}
          archetype={deckData.archetype}
          note={deckData.note}
          onRetry={handleRetry}
          onEmptyCta={handleEmptyCta}
        />
      </div>
    </div>
  );
}

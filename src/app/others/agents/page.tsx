"use client";

import CardSkins from "@/components/Card/CardSkins";
import { useEffect, useState } from "react";

interface Rarity {
  id: string;
  name: string;
  color: string;
}

interface Crate {
  id: string;
  name: string;
  image: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  collections: Crate[];
  tournament_event?: string;
  type: string;
  market_hash_name: string | null;
  effect: string;
  image: string;
}

const rarityOrder = ["Master", "Superior", "Exceptional", "Distinguished"];

export default function Tournament() {
  const [stickers, setStickers] = useState<Agent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stickersPerPage = 45;

  const fetchStickers = async () => {
    try {
      const response = await fetch("https://api.cs2data.info/en/agents.json");
      const data = await response.json();
      
      // Filtra os stickers que têm market_hash_name não nulo
      const filteredStickers: Agent[] = data.filter(
        (Agent: Agent) => Agent.market_hash_name !== null
      );

      setStickers(filteredStickers);
    } catch (error) {
      console.error("Erro ao buscar os stickers:", error);
    }
  };

  useEffect(() => {
    fetchStickers();
  }, []);

  const orderStickersByRarity = (stickers: Agent[]) => {
    return stickers.sort((a, b) => {
      const aRarityIndex = rarityOrder.indexOf(a.rarity.name);
      const bRarityIndex = rarityOrder.indexOf(b.rarity.name);
      return aRarityIndex - bRarityIndex;
    });
  };

  const orderedStickers = orderStickersByRarity(stickers);
  const totalPages = Math.ceil(orderedStickers.length / stickersPerPage);
  const currentStickers = orderedStickers.slice(
    (currentPage - 1) * stickersPerPage,
    currentPage * stickersPerPage
  );

  return (
    <div className="bg-zinc-900">
      <div className="flex justify-center my-10 gap-10 items-center">
        <div className="flex flex-col text-white font-medium px-6 gap-1">
          <span className="text-4xl">All Agents</span>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center my-4 text-white py-5">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
          >
            {"<"}
          </button>
        )}

        {Array.from({ length: 6 }, (_, index) => {
          const pageNumber = index + 1;
          const displayPageNumber =
            currentPage > 3 ? currentPage - 3 + index : pageNumber;
          return (
            displayPageNumber <= totalPages && (
              <button
                key={displayPageNumber}
                onClick={() => setCurrentPage(displayPageNumber)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === displayPageNumber
                    ? "bg-indigo-600 text-white"
                    : "bg-black-300 text-black hover:bg-indigo-800"
                }`}
              >
                {displayPageNumber}
              </button>
            )
          );
        })}

        {currentPage < totalPages && (
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="mx-2 px-4 py-2 rounded bg-black-300 text-white hover:bg-indigo-800"
          >
            {">"}
          </button>
        )}
      </div>
      {/* Nav */}

      <div className="flex justify-center items-center my-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {currentStickers.length > 0 ? (
            currentStickers.map((Agent) => (
              <CardSkins
                key={Agent.id}
                skinName={Agent.name}
                imageUrl={Agent.image}
                rarity={Agent.rarity}
                specialOption="Default"
                priceWithoutStatTrak="no data"
                priceWithStatTrak=""
                collectionName={Agent.collections[0]?.name || "Unknown Crate"}
                collectionImageUrl={Agent.collections[0]?.image || ""}
                basePath="/others/agents"
              />
            ))
          ) : (
            <div className="bg-zinc-900"></div>
          )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center my-4 text-white py-5">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
          >
            {"<"}
          </button>
        )}

        {Array.from({ length: 6 }, (_, index) => {
          const pageNumber = index + 1;
          const displayPageNumber =
            currentPage > 3 ? currentPage - 3 + index : pageNumber;
          return (
            displayPageNumber <= totalPages && (
              <button
                key={displayPageNumber}
                onClick={() => setCurrentPage(displayPageNumber)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === displayPageNumber
                    ? "bg-indigo-600 text-white"
                    : "bg-black-300 text-black hover:bg-indigo-800"
                }`}
              >
                {displayPageNumber}
              </button>
            )
          );
        })}

        {currentPage < totalPages && (
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="mx-2 px-4 py-2 rounded bg-black-300 text-white hover:bg-indigo-800"
          >
            {">"}
          </button>
        )}
      </div>
      {/* Nav */}
    </div>
  );
}

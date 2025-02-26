"use client";

import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import { useEffect, useState } from "react";

interface Rarity {
  id: string;
  name: string;
  color: string;
}

interface MusicKit {
  id: string;
  name: string;
}

interface Crate {
  id: string;
  name: string;
  image: string;
  contains: MusicKit[];
}

interface musickit {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  crates: Crate[];
  tournament_event?: string;
  type: string;
  market_hash_name: string | null;
  effect: string;
  image: string;
  collectionName: string;
  collectionImageUrl: string;
}

const rarityOrder = ["Master", "Superior", "Exceptional", "Distinguished"];

export default function Tournament() {
  const [stickers, setStickers] = useState<musickit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stickersPerPage = 45;

  const fetchStickersAndCrates = async () => {
    try {
      const musickitsResponse = await axios.get(
        "https://api.cs2data.info/en/music_kits.json",
      );
      console.log("Stickers:", musickitsResponse.data);

      const filteredStickers: musickit[] = musickitsResponse.data.filter(
        (musickit: musickit) => !musickit.name.startsWith("StatTrak™"),
      );

      const crateResponse = await axios.get(
        "https://api.cs2data.info/en/crates/music_kit_boxes.json",
      );
      console.log("Crates:", crateResponse.data);

      const cratesData: Crate[] = crateResponse.data;

      const stickersWithCrates = filteredStickers.map((musickit) => {
        const associatedCrates = cratesData.filter((crate) =>
          crate.contains.some((kit) => kit.id === musickit.id),
        );

        const firstCrate = associatedCrates[0] || null;

        return {
          ...musickit,
          crates: associatedCrates,
          collectionName: firstCrate ? firstCrate.name : "",
          collectionImageUrl: firstCrate ? firstCrate.image : "",
        };
      });

      console.log("Stickers with Crates:", stickersWithCrates);

      setStickers(stickersWithCrates);
    } catch (error) {
      console.error("Erro ao buscar os stickers ou crates:", error);
    }
  };

  useEffect(() => {
    fetchStickersAndCrates();
  }, []);

  const orderStickersByRarity = (stickers: musickit[]) => {
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
    currentPage * stickersPerPage,
  );

  return (
    <>
      <div className="bg-zinc-900">
        <div className="flex justify-center my-10 gap-10 items-center">
          <div className="flex flex-col text-white font-medium px-6 gap-1">
            <span className="text-4xl">All Music Kits</span>
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
              className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
            >
              {">"}
            </button>
          )}
        </div>
        {/* Nav */}

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
            {currentStickers.length > 0 ? (
              currentStickers.map((musickit) => (
                <CardSkins
                  key={musickit.id}
                  skinName={musickit.name}
                  imageUrl={musickit.image}
                  rarity={musickit.rarity}
                  specialOption="Default"
                  priceWithoutStatTrak=""
                  priceWithStatTrak=""
                  collectionName={musickit.collectionName}
                  collectionImageUrl={musickit.collectionImageUrl}
                  basePath="/others/music-kits"
                />
              ))
            ) : (
              <div className="bg-zinc-900">Nenhum musickit encontrado.</div>
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
              className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
            >
              {">"}
            </button>
          )}
        </div>
        {/* Nav */}
      </div>
    </>
  );
}

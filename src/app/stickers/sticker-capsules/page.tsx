"use client";

import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

interface Sticker {
  id: string;
  name: string;
  description: string;
  tournament_event?: string;
  type: string;
  market_hash_name: string | null;
  effect: string;
  image: string;
}

export default function Tournament() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stickersPerPage = 45;

  const fetchStickers = async () => {
    try {
      const response = await fetch(
        "https://api.cs2data.info/en/crates/capsules/stickers.json"
      );
      const data = await response.json();
      const filteredStickers: Sticker[] = data
        .filter(
          (sticker: Sticker) =>
            sticker.market_hash_name !== null && sticker.type === "Sticker Capsule"
        )
        .reverse();

      setStickers(filteredStickers);
    } catch (error) {
      console.error("Erro ao buscar os stickers:", error);
    }
  };

  useEffect(() => {
    fetchStickers();
  }, []);

  const totalPages = Math.ceil(stickers.length / stickersPerPage);
  const currentStickers = stickers.slice(
    (currentPage - 1) * stickersPerPage,
    currentPage * stickersPerPage
  );

  return (
    <div className="bg-zinc-900">
      <Header />
      <div className="flex justify-center my-10 gap-10 items-center">
        <div className="flex flex-col text-white font-medium px-6 gap-1">
          <span className="text-4xl">All Sticker Capsules</span>
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
            currentStickers.map((sticker) => (
              <CardSkins
                key={sticker.id}
                skinName={sticker.name}
                imageUrl={sticker.image}
                specialOption="Default"
                priceWithoutStatTrak="no data"
                priceWithStatTrak=""
                collectionName={""}
                collectionImageUrl={""}
                basePath=""
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

      <Footer />
    </div>
  );
}

"use client";

import CardSkins from "@/components/Card/CardSkins";
import { useEffect, useState } from "react";
import { stickersData } from "./collection/[id]/stickersData";

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

interface Sticker {
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
}

const rarityOrder = [
    "Contraband",
    "Extraordinary",
    "Exotic",
    "Remarkable",
    "High Grade",
];

export default function Regular() {
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 27;

    const fetchStickers = async () => {
        try {
            const response = await fetch("https://api.cs2data.info/en/stickers.json");
            if (!response.ok) {
                throw new Error("Erro ao buscar os stickers");
            }
            const data = await response.json();
            const filteredStickers: Sticker[] = data.filter(
                (sticker: Sticker) =>
                    sticker.market_hash_name !== null &&
                    !sticker.tournament_event
            );

            setStickers(filteredStickers);
        } catch (error) {
            console.error("Erro ao buscar os stickers:", error);
        }
    };

    useEffect(() => {
        fetchStickers();
    }, []);

    const orderStickersByRarity = (stickers: Sticker[]) => {
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
        <>
            <div className="bg-zinc-900">
                <div className="flex justify-center my-10 gap-10 items-center">
                    <div className="flex flex-col text-white font-medium px-6 gap-1">
                        <span className="text-4xl">All Regular Stickers</span>
                    </div>
                </div>

                {/* Nav */}
                <div className="flex items-center justify-center my-4 text-white py-5">
                    {currentPage > 1 && (
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
                        >
                            {"<"}
                        </button>
                    )}

                    {Array.from({ length: 6 }, (_, index) => {
                        const pageNumber = index + 1;
                        const displayPageNumber =
                            currentPage > 3
                                ? currentPage - 3 + index
                                : pageNumber;
                        return (
                            displayPageNumber <= totalPages && (
                                <button
                                    key={displayPageNumber}
                                    onClick={() =>
                                        setCurrentPage(displayPageNumber)
                                    }
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
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
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
                        {currentStickers.map((sticker) => {
                            const collection = stickersData.find((collection) =>
                                collection.stickers.some(
                                    (s) => s.name === sticker.name
                                )
                            );

                            const basePath = collection
                                ? "/stickers/regular/collection/"
                                : "/stickers/regular/capsules/";

                            return (
                                <CardSkins
                                    key={sticker.id}
                                    skinName={sticker.name}
                                    imageUrl={sticker.image}
                                    rarity={sticker.rarity}
                                    specialOption="Default"
                                    priceWithoutStatTrak="no data"
                                    priceWithStatTrak=""
                                    collectionName={
                                        collection?.collectionName ??
                                        sticker?.crates?.[0]?.name ??
                                        ""
                                    }
                                    collectionImageUrl={
                                        collection?.collectionImage ??
                                        sticker?.crates?.[0]?.image ??
                                        ""
                                    }
                                    basePath={basePath}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Nav */}
                <div className="flex items-center justify-center my-4 text-white py-5">
                    {currentPage > 1 && (
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className="mx-2 px-4 py-2 rounded bg-black-300 text-black hover:bg-indigo-800"
                        >
                            {"<"}
                        </button>
                    )}

                    {Array.from({ length: 6 }, (_, index) => {
                        const pageNumber = index + 1;
                        const displayPageNumber =
                            currentPage > 3
                                ? currentPage - 3 + index
                                : pageNumber;
                        return (
                            displayPageNumber <= totalPages && (
                                <button
                                    key={displayPageNumber}
                                    onClick={() =>
                                        setCurrentPage(displayPageNumber)
                                    }
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
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            className="mx-2 px-4 py-2 rounded bg-black-300 text-white hover:bg-indigo-800"
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

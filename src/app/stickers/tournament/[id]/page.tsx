"use client";

import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { notFound, useParams } from "next/navigation"; // Importe o useRouter
import { useEffect, useState } from "react";
import { stickersData } from "./stickersData"; // Importe o arquivo de configuração

interface Rarity {
    id: string;
    name: string;
    color: string;
}

interface Sticker {
    id: string;
    name: string;
    description: string;
    rarity: Rarity;
    crates: {
        name: string;
        image: string;
    }[];
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

export default function StickersPage() {
    const { id } = useParams();
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 27;

    const stickerExists = stickersData.some((sticker) => sticker.id === id);
    if (!stickerExists) {
        notFound();
    }

    const fetchStickers = async () => {
        try {
            const response = await fetch("https://api.cs2data.info/en/stickers.json");
            if (!response.ok) {
                throw new Error("Falha ao buscar os stickers");
            }

            const data = await response.json();
            const filteredStickers: Sticker[] = data.filter((sticker: Sticker) => {
                const tournament = stickersData.find((tournament) => tournament.id === id);
                return (
                    sticker.market_hash_name !== null &&
                    tournament &&
                    sticker.tournament_event === tournament.tournament_event
                );
            });

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
        currentPage * stickersPerPage,
    );

    const renderPagination = () => (
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
    );

    return (
        <>
            <div className="bg-zinc-900">
                <Header />
                <div className="flex justify-center my-10 gap-10 items-center">
                    <div className="flex flex-col text-white font-medium px-6 gap-1">
                        {stickers.length > 0 ? (
                            <span className="text-4xl">
                                {stickers[0].tournament_event} Stickers
                            </span>
                        ) : (
                            <span className="text-4xl">Stickers</span>
                        )}
                    </div>
                </div>

                {/* Navegação de Páginas */}
                {renderPagination()}

                <div className="flex justify-center items-center my-4">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                        {currentStickers.length > 0 ? (
                            currentStickers.map((sticker) => (
                                <CardSkins
                                    key={sticker.id}
                                    skinName={sticker.name}
                                    imageUrl={sticker.image}
                                    rarity={sticker.rarity}
                                    specialOption="Default"
                                    priceWithoutStatTrak="no data"
                                    priceWithStatTrak=""
                                    collectionName={sticker?.crates?.[0]?.name || ""}
                                    collectionImageUrl={sticker?.crates?.[0]?.image || ""}
                                    basePath="/stickers/tournament/capsules/"
                                />
                            ))
                        ) : (
                            <div className="bg-zinc-900">
                                Nenhum sticker encontrado.
                            </div>
                        )}
                    </div>
                </div>

                {/* Navegação de Páginas */}
                {renderPagination()}

                <Footer />
            </div>
        </>
    );
}

"use client";

import CardSkins from "@/components/Card/CardSkins";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { stickersData } from "./stickersData";

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

    const collection = stickersData.find(
        (collection) => collection.collectionId === id,
    );

    if (!collection) {
        notFound();
    }

    const fetchStickers = async () => {
        try {
            const response = await fetch("https://api.cs2data.info/en/stickers.json");

            if (!response.ok) {
                throw new Error("Erro ao buscar os stickers");
            }

            const data = await response.json();
            const filteredStickers: Sticker[] = data.filter(
                (sticker: Sticker) => {
                    return (
                        sticker.market_hash_name !== null &&
                        collection?.stickers.some(
                            (collectionSticker) =>
                                collectionSticker.name === sticker.name,
                        )
                    );
                },
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

    return (
        <>
            <div className="bg-zinc-900">
                <div className="crate-container">
                    {orderedStickers.length > 0 && (
                        <>
                            <div className="crate-image-wrapper">
                                {orderedStickers.length > 0 &&
                                (collection?.collectionImage ||
                                    (orderedStickers[0]?.crates?.length > 0 &&
                                        orderedStickers[0].crates[0]
                                            ?.image)) ? (
                                    <Image
                                        width={100}
                                        height={100}
                                        src={ 
                                            orderedStickers[0]?.crates?.[0]
                                                ?.image ||
                                            collection?.collectionImage ||
                                            ""
                                        }
                                        alt={ 
                                            orderedStickers[0]?.crates?.[0]
                                                ?.name ||
                                            collection?.collectionName ||
                                            ""
                                        }
                                        className="crate-image"
                                        priority
                                    />
                                ) : (
                                    <div className="placeholder-image"></div>
                                )}
                            </div>
                            <span className="crate-info">
                                <span className="crate-name">
                                    {collection?.collectionName}
                                </span>
                            </span>
                        </>
                    )}
                </div>

                <div className="flex justify-center items-center my-4">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                        {orderedStickers.length > 0 ? (
                            orderedStickers.map((sticker) => (
                                <CardSkins
                                    key={sticker.id}
                                    skinName={sticker.name}
                                    imageUrl={sticker.image}
                                    rarity={sticker.rarity}
                                    specialOption="Default"
                                    priceWithoutStatTrak="no data"
                                    priceWithStatTrak="no data"
                                    collectionName={ 
                                        sticker?.crates?.[0]?.name ||
                                        collection?.collectionName
                                    }
                                    collectionImageUrl={ 
                                        sticker?.crates?.[0]?.image ||
                                        collection?.collectionImage ||
                                        ""
                                    }
                                    basePath="/stickers/regular/collection/"
                                />
                            ))
                        ) : (
                            <div className="bg-zinc-900"></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

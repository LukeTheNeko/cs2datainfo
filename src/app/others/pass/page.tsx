"use client";

import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import { useEffect, useState } from "react";

interface Rarity {
  id: string;
  name: string;
  color: string;
}

interface pass {
  id: string;
  name: string;
}

interface Crate {
  id: string;
  name: string;
  image: string;
  contains: pass[];
}

interface pass {
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

const rarityOrder = ["Extraordinary", "Exotic", "Remarkable", "High Grade"];

export default function Tournament() {
  const [stickers, setStickers] = useState<pass[]>([]);

  const fetchStickersAndCrates = async () => {
    try {
      const musickitsResponse = await axios.get(
        "https://api.cs2data.info/en/collectibles.json",
      );
      console.log("Stickers:", musickitsResponse.data);

      const filteredStickers: pass[] = musickitsResponse.data.filter(
        (pass: pass) =>
          !pass.name.startsWith("StatTrak™") &&
          pass.market_hash_name !== null &&
          !pass.name.includes("Souvenir Package") &&
          pass.type !== "Pin" &&
          (pass.name.includes("3 Souvenir Tokens") ||
            !pass.name.includes("Souvenir Token")),
      );

      const crateResponse = await axios.get(
        "https://api.cs2data.info/en/crates/capsules/pins.json",
      );
      console.log("Crates:", crateResponse.data);

      const cratesData: Crate[] = crateResponse.data;

      const stickersWithCrates = filteredStickers.map((pass) => {
        const associatedCrates = cratesData.filter((crate) =>
          crate.contains.some((kit) => kit.id === pass.id),
        );

        const firstCrate = associatedCrates[0] || null;

        return {
          ...pass,
          crates: associatedCrates,
          collectionName: firstCrate ? firstCrate.name : "",
          collectionImageUrl: firstCrate ? firstCrate.image : "",
        };
      });

      setStickers(stickersWithCrates);
    } catch (error) {
      console.error("Error fetching stickers and crates:", error);
    }
  };

  useEffect(() => {
    fetchStickersAndCrates();
  }, []);

  const orderStickersByRarity = (stickers: pass[]) => {
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
        <div className="flex justify-center my-10 gap-10 items-center">
          <div className="flex flex-col text-white font-medium px-6 gap-1">
            <span className="text-4xl">All Pass</span>
          </div>
        </div>

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
            {orderedStickers.length > 0 ? (
              orderedStickers.map((pass) => (
                <CardSkins
                  key={pass.id}
                  skinName={pass.name}
                  imageUrl={pass.image}
                  rarity={pass.rarity}
                  specialOption="Default"
                  priceWithoutStatTrak="no data"
                  priceWithStatTrak=""
                  collectionName={pass.collectionName}
                  collectionImageUrl={pass.collectionImageUrl}
                  basePath="/others/pins"
                />
              ))
            ) : (
              <div className="bg-zinc-900">Nenhum pass encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

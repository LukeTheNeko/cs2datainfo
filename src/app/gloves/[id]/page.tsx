import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import { notFound } from "next/navigation";
import { glovesArray } from "./glovesArray";
import Image from "next/image";

interface Skin {
    id: string;
    name: string;
    description: string;
    weapon: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
    rarity: {
        id: string;
        name: string;
        color: string;
    };
    image: string;
    wears: { name: string }[];
    collections: { name: string; image: string }[];
    crates: { id: string; name: string; image: string }[];
    stattrak: boolean;
    souvenir: boolean;
}

const weaponIdMap = Object.fromEntries(
    glovesArray.map((weapon) => [weapon.name.toLowerCase(), weapon.id]),
);

export default async function Gloves({ params }: { params: { id: string } }) {
    const weaponId = weaponIdMap[params.id.toLowerCase()];

    if (!weaponId) {
        notFound();
    }

    try {
        const { data } = await axios.get<Skin[]>(
            "https://api.cs2data.info/en/skins.json",
        );

        const filteredSkins = data.filter(
            (item) => item.weapon.id === weaponId,
        );

        const uniqueSkinsMap = new Set();
        const uniqueSkins = [];

        for (const skin of filteredSkins) {
            const skinNameLower = skin.name.toLowerCase();

            if (!uniqueSkinsMap.has(skinNameLower)) {
                uniqueSkinsMap.add(skinNameLower);
                uniqueSkins.push(skin);
            }
        }

        const randomSkin =
            uniqueSkins.length > 0
                ? uniqueSkins[Math.floor(Math.random() * uniqueSkins.length)]
                : null;

        return (
            <div className="bg-zinc-900">
                <Header />

                <div className="flex flex-col md:flex-row justify-center items-center my-16 text-white font-medium mx-20">
                    <div className="md:pr-4 md:pl-2">
                        {randomSkin && (
                            <Image
                                width={100}
                                height={100}
                                src={randomSkin.image}
                                alt={randomSkin.name}
                                className="w-full h-auto"
                                priority
                            />
                        )}
                    </div>
                    <span className="text-2xl md:text-4xl mt-4 md:mt-0">
                        {randomSkin ? randomSkin.weapon.name : "No"} Skins
                    </span>
                </div>

                <div className="flex justify-center items-center my-10">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                        {uniqueSkins.length > 0 ? (
                            uniqueSkins.map((item, index) => {
                                const {
                                    name: skinName,
                                    image: imageUrl,
                                    crates,
                                } = item;

                                const crateCount = crates.length;

                                const randomCrateImage =
                                    crateCount > 0
                                        ? crates[
                                              Math.floor(
                                                  Math.random() * crateCount,
                                              )
                                          ].image
                                        : "";

                                return (
                                    <CardSkins
                                        key={index}
                                        skinName={skinName}
                                        rarity={{
                                            color: item.rarity.color,
                                            name: item.rarity.name,
                                        }}
                                        imageUrl={imageUrl}
                                        specialOption="Default"
                                        priceWithoutStatTrak="no data"
                                        priceWithStatTrak=""
                                        collectionName={`Found in ${crateCount} cases`}
                                        collectionImageUrl={randomCrateImage}
                                        basePath=""
                                    />
                                );
                            })
                        ) : (
                            <div className="text-white">No skins found</div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        );
    } catch (error) {
        console.error("Error fetching skins:", error);
        return <div className="text-white">Failed to load skins</div>;
    }
}

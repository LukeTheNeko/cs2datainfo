import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { patchesArray } from "./patchesArray";

interface Patch {
    id: string;
    name: string;
    description: string;
    rarity: {
        id: string;
        name: string;
        color: string;
    };
    market_hash_name: string;
    crates: Array<{
        id: string;
        name: string;
        image: string;
    }>;
    image: string;
}

const rarityOrder = ["Exotic", "Remarkable", "High Grade"];

export default async function Collection({
    params,
}: {
    params: { id: string };
}) {
    const selectedPatch = patchesArray.find(
        (patch) => patch.link === params.id,
    );

    if (!selectedPatch) {
        notFound();
    }

    try {
        const response = await axios.get(
            "https://api.cs2data.info/en/patches.json",
        );
        const patches: Patch[] = response.data;

        const filteredPatches = patches.filter((patch) =>
            patch.crates.some((crate) => crate.id === selectedPatch.id),
        );

        if (filteredPatches.length === 0) {
            notFound();
        }

        const sortedPatches = filteredPatches.sort((a, b) => {
            const rarityAIndex = rarityOrder.indexOf(a.rarity.name);
            const rarityBIndex = rarityOrder.indexOf(b.rarity.name);
            return (
                (rarityAIndex >= 0 ? rarityAIndex : Infinity) -
                (rarityBIndex >= 0 ? rarityBIndex : Infinity)
            );
        });

        console.log("Sorted Patches:", sortedPatches);

        return (
            <>
                <div className="bg-zinc-900">
                    <Header />
                    <div className="crate-container">
                        {sortedPatches.length > 0 && (
                            <div className="crate-image-wrapper flex justify-center items-center gap-4">
                                <Image
                                    width={100}
                                    height={100}
                                    src={sortedPatches[0].crates[0]?.image}
                                    alt={sortedPatches[0].crates[0]?.name}
                                    className="w-auto h-auto"
                                    priority
                                />
                                <span className="crate-info">
                                    <span className="crate-name">
                                        {sortedPatches[0].crates[0]?.name}
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center my-4">
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                            {sortedPatches.map((patch) => (
                                <CardSkins
                                    key={patch.id}
                                    skinName={patch.name}
                                    imageUrl={patch.image}
                                    rarity={patch.rarity}
                                    specialOption={"Default"}
                                    priceWithoutStatTrak="No data"
                                    priceWithStatTrak=""
                                    collectionName={patch.crates[0]?.name}
                                    collectionImageUrl={patch.crates[0]?.image}
                                    basePath="/others/patches"
                                />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    } catch (error) {
        console.error("Error fetching patches:", error);
        notFound();
    }
}

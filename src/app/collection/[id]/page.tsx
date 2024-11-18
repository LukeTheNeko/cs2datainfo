import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Rarity {
    id: string;
    name: string;
    color: string;
}

interface Skin {
    id: string;
    name: string;
    rarity: Rarity;
    paint_index: string;
    image: string;
    stattrak: boolean;
    souvenir: boolean;
}

interface Crate {
    id: string;
    name: string;
    image: string;
}

interface CollectionSet {
    id: string;
    name: string;
    crates: Crate[];
    contains: Skin[];
    image: string;
}

const formatNameForId = (name: string) =>
    name
        .replace(/CS:GO\s+/i, "")
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

export default async function Collection({
    params,
}: {
    params: { id: string };
}) {
    const crateId = formatNameForId(params.id);
    let collectionSet: CollectionSet | null = null;
    let skinsData: Skin[] = [];

    try {
        const collectionsResponse = await axios.get(
            "https://api.cs2data.info/en/collections.json",
        );
        const collections = collectionsResponse.data.filter(
            (item: CollectionSet) => item.id,
        );

        collectionSet =
            collections.find((item: CollectionSet) => {
                const formattedItemName = formatNameForId(item.name);
                return formattedItemName === crateId;
            }) || null;

        const skinsResponse = await axios.get<Skin[]>(
            "https://api.cs2data.info/en/skins.json",
        );
        skinsData = skinsResponse.data;
    } catch {
        notFound();
    }

    if (!collectionSet) {
        notFound();
    }

    return (
        <>
            <div className="bg-zinc-900">
                <Header />
                <div className="crate-container">
                    <div className="crate-image-wrapper">
                        <Image
                            width={100}
                            height={100}
                            src={collectionSet.image}
                            alt={collectionSet.name}
                            className="crate-image"
                            priority
                        />
                    </div>
                    <span className="crate-info">
                        <span className="crate-name">{collectionSet.name}</span>
                    </span>
                </div>

                <div className="flex justify-center items-center my-4">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                        {collectionSet.contains &&
                        collectionSet.contains.length > 0 ? (
                            collectionSet.contains
                                .slice()
                                .reverse()
                                .map((item: Skin) => {
                                    const skinData = skinsData.find(
                                        (skin) => skin.name === item.name,
                                    );

                                    const stattrak =
                                        skinData?.stattrak || false;
                                    const souvenir =
                                        skinData?.souvenir || false;

                                    return (
                                        <CardSkins
                                            key={item.id}
                                            skinName={item.name}
                                            imageUrl={item.image}
                                            rarity={item.rarity}
                                            specialOption={
                                                stattrak
                                                    ? "StatTrak"
                                                    : souvenir
                                                    ? "Souvenir"
                                                    : "Default"
                                            }
                                            priceWithoutStatTrak="No data"
                                            priceWithStatTrak="No Data"
                                            collectionName={collectionSet.name}
                                            collectionImageUrl={
                                                collectionSet.image
                                            }
                                            basePath="/collection/"
                                        />
                                    );
                                })
                        ) : (
                            <div className="text-white">
                                No items found in the crate.
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

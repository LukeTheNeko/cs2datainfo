import axios from "axios";
import Image from "next/image";
import crateIdData from "../../../public/crateId.json";
import CardRareSpecial from "../Card/CardRareSpecial";
import CardSkins from "../Card/CardSkins";
import Link from "next/link";

interface Skin {
    id: string;
    name: string;
    rarity: {
        id: string;
        name: string;
        color: string;
    };
    paint_index: string | null;
    phase?: string | null;
    image: string;
}

interface Crate {
    id: string;
    name: string;
    description: string | null;
    type: string;
    first_sale_date: string;
    contains: Skin[];
    contains_rare: Skin[];
    image: string;
}

const formatNameForId = (name: string) =>
    name
        .replace(/CS:GO\s+/i, "")
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

export default async function HomeCases() {
    let crate: Crate | null = null;

    const crateId = crateIdData.id;

    try {
        const response = await axios.get(
            "https://api.cs2data.info/en/crates.json",
        );
        crate =
            response.data.find((item: Crate) => item.id === crateId) || null;
    } catch (error) {
        console.error("Error fetching crate data:", error);
    }

    if (!crate) {
        return (
            <div className="flex justify-center items-center h-72 text-white">
                <span>Crate not found.</span>
            </div>
        );
    }

    return (
        <>
            <div className="crate-container">
                <div className="crate-image-wrapper">
                    <Image
                        width={250}
                        height={250}
                        src={crate.image}
                        alt={crate.name}
                        className="crate-image"
                        priority
                    />
                </div>
                <span className="crate-info">
                    <span className="crate-name">{crate.name}</span>
                    <span className="crate-sale-date">
                        First Sale Date: {crate.first_sale_date}
                    </span>
                </span>
            </div>

            <div className="flex justify-center items-center my-4">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                    <Link
                        href={`/cases/${formatNameForId(
                            crate.name,
                        )}/rare-items`}
                        className="flex justify-center items-center my-4"
                    >
                        <CardRareSpecial crateId={crate.id} rare />
                    </Link>

                    {crate.contains && crate.contains.length > 0 ? (
                        crate.contains
                            .slice()
                            .reverse()
                            .map((item: any, index: number) => (
                                <CardSkins
                                    key={index}
                                    skinName={item.name}
                                    imageUrl={item.image}
                                    rarity={item.rarity}
                                    specialOption="StatTrak"
                                    priceWithoutStatTrak="No data"
                                    priceWithStatTrak="No Data"
                                    collectionName={crate.name}
                                    collectionImageUrl={crate.image}
                                    basePath="/cases/"
                                />
                            ))
                    ) : (
                        <div className="text-white">
                            No items found in the crate.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

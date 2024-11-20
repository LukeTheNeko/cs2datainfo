import CardSkins from "@/components/Card/CardSkins";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import { notFound } from "next/navigation";
import { weaponsArray } from "./weaponsData";
import Image from "next/image";
import Head from "next/head";

interface Skin {
    id: string;
    name: string;
    description: string;
    weapon: {
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
    crates: { name: string; image: string }[];
    stattrak: boolean;
    souvenir: boolean;
}

const rarityOrder = [
    "Contraband",
    "Covert",
    "Classified",
    "Restricted",
    "Mil-Spec Grade",
    "Industrial Grade",
    "Consumer Grade",
];

const weaponIdMap = Object.fromEntries(
    weaponsArray.map((weapon) => [weapon.name.toLowerCase(), weapon.id]),
);

const getCollectionOrCrate = (item: Skin) => {
    if (item.souvenir && item.collections.length > 0) {
        return { item: item.collections[0], basePath: "/collection" };
    }
    if (item.crates.length > 0) {
        return { item: item.crates[0], basePath: "/cases" };
    }
    return {
        item: item.collections[0] || { name: "Unknown Collection", image: "" },
        basePath: "/collection",
    };
};

export default async function Weapons({ params }: { params: { id: string } }) {
    const weaponId = weaponIdMap[params.id.toLowerCase()];

    if (!weaponId) {
        notFound();
    }

    try {
        const { data } = await axios.get<Skin[]>(
            "https://api.cs2data.info/en/skins.json",
        );

        const uniqueSkins = Array.from(
            new Map(
                data
                    .filter((item) => weaponId === item.weapon.id)
                    .map((item) => [item.name, item]),
            ).values(),
        ).sort(
            (a, b) =>
                rarityOrder.indexOf(a.rarity.name) -
                rarityOrder.indexOf(b.rarity.name),
        );

        const weaponName =
            uniqueSkins.length > 0
                ? uniqueSkins[0].weapon.name
                : "Unknown Weapon";

        return (
            <>
                <title>{`All ${weaponName} Skins - CS2Data.info`}</title>
                <Head>
                    <link
                        rel="mask-icon"
                        href="/mask-icon.svg"
                        color="#eb4034"
                    />
                    <meta name="theme-color" content="#eb4034" />
                    <meta
                        name="title"
                        content={`All ${weaponName} Skins - CS2Data.info`}
                    />
                    <meta
                        name="description"
                        content={`All ${weaponName} Skins - CS2Data Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more.`}
                    />
                    {/* Adicione outras metatags, como Open Graph e Twitter Cards */}
                </Head>

                <div className="bg-zinc-900">
                    <Header />
                    <div className="flex flex-col md:flex-row justify-center items-center my-16 text-white font-medium mx-20">
                        <div className="md:pr-4 md:pl-2">
                            {uniqueSkins.length > 0 && (
                                <Image
                                    width={100}
                                    height={100}
                                    src={`https://img.cs2data.info/static/panorama/images/econ/weapons/base_weapons/${uniqueSkins[0].weapon.id}_png.png`}
                                    alt={uniqueSkins[0].weapon.name}
                                    className="w-full h-auto"
                                    priority
                                />
                            )}
                        </div>
                        <span className="text-2xl md:text-4xl mt-4 md:mt-0">
                            {uniqueSkins[0].weapon.name} Skins
                        </span>
                    </div>

                    <div className="flex justify-center items-center my-10">
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                            {uniqueSkins.length > 0 ? (
                                uniqueSkins.map((item) => {
                                    const {
                                        name: skinName,
                                        image: imageUrl,
                                        rarity,
                                        stattrak,
                                        souvenir,
                                    } = item;
                                    const {
                                        item: collectionOrCrate,
                                        basePath,
                                    } = getCollectionOrCrate(item);
                                    const {
                                        name: collectionName,
                                        image: collectionImageUrl,
                                    } = collectionOrCrate;

                                    return (
                                        <CardSkins
                                            key={item.id}
                                            skinName={skinName}
                                            imageUrl={imageUrl}
                                            rarity={rarity}
                                            specialOption={
                                                stattrak
                                                    ? "StatTrak"
                                                    : souvenir
                                                    ? "Souvenir"
                                                    : "Default"
                                            }
                                            priceWithoutStatTrak="no data"
                                            priceWithStatTrak="no data"
                                            collectionName={collectionName}
                                            collectionImageUrl={
                                                collectionImageUrl
                                            }
                                            basePath={basePath}
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
            </>
        );
    } catch {
        return <div className="text-white">Failed to load skins</div>;
    }
}

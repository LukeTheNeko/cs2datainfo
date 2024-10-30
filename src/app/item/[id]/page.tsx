import Image from "next/image";
import { Slider } from "./slider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";

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
    pattern: {
        id: string;
        name: string;
    };
    min_float: number;
    max_float: number;
    rarity: {
        id: string;
        name: string;
        color: string;
    };
    stattrak: string;
    souvenir: string;
    finish_style: {
        id: string;
        name: string;
    };
    paint_index: string;
    wears: Array<{
        id: string;
        name: string;
    }>;
    collections: Array<{
        id: string;
        name: string;
        image: string;
    }>;
    crates: Array<{
        id: string;
        name: string;
        image: string;
    }>;
    team: {
        id: string;
        name: string;
    };
    image: string;
}

async function fetchSkinData(): Promise<Skin | null> {
    try {
        const response = await axios.get(
            "https://api.cs2data.info/en/skins.json",
        );
        return (
            response.data.find(
                (item: Skin) => item.name === "AK-47 | Redline",
            ) || null
        );
    } catch (error) {
        console.error("Erro ao buscar dados da skin:", error);
        return null;
    }
}

export default async function Item() {
    const skin = await fetchSkinData();

    if (!skin) {
        return <div>Skin não encontrada.</div>;
    }

    const processDescription = (description: string) => {
        const flavorTextRegex = /<i>(.*?)<\/i>/;
        const flavorTextMatch = description.match(flavorTextRegex);
        const cleanedDescription = description
            .replace(flavorTextRegex, "")
            .replace(/\\n/g, " ")
            .trim();

        return {
            cleanedDescription,
            flavorText: flavorTextMatch ? flavorTextMatch[1] : null,
        };
    };

    const { cleanedDescription, flavorText } = processDescription(
        skin.description,
    );

    const rarityClasses = {
        StatTrak: "bg-[#cf6a32]",
        Souvenir: "bg-[#b89b02]",
        Default: "bg-transparent",
    };

    const rarityType = skin.stattrak
        ? "StatTrak"
        : skin.souvenir
        ? "Souvenir"
        : "Default";

    const calcs = (n: number, left: boolean) => {
        const [FN, MW, FT, WW, BS] = [0.07, 0.16, 0.39, 0.46, 0.99];

        const nu =
            n < FN
                ? n
                : n < MW
                ? n - FN
                : n < FT
                ? n - MW
                : n < WW
                ? n - FT
                : n === BS
                ? n - 0.45
                : n - 0.46;

        const times: number =
            n < FN ? 7 : n < MW ? 9 : n < FT ? 23 : n < WW ? 9 : 54;

        const percentage: number = Number((nu * (20 / times) * 100).toFixed(2));

        const pos: number =
            n < FN ? 0 : n < MW ? 20 : n < FT ? 40 : n < WW ? 60 : 80;

        const res: number = percentage + pos;

        return left ? res : 100 - res;
    };

    return (
        <>
            <Header />
            <div className="bg-zinc-900 text-white h-screen flex flex-col">
                <div className="gap-6 flex justify-center mx-20 my-10">
                    <div className="gap-2 justify-between flex flex-col">
                        <div className="flex flex-col flex-center w-[500px] h-[500px] bg-black-300 rounded-md">
                            <div className="flex text-center mt-1 justify-center text-2xl">
                                <span>{skin.name}</span>
                            </div>
                            <div className="px-4 py-2 text-center">
                                <div className="gap-2 text-black-500">
                                    <div
                                        style={{
                                            backgroundColor: skin.rarity.color,
                                        }}
                                        className="h-6 rounded-md mb-1"
                                    >
                                        <span>{skin.rarity.name}</span>
                                    </div>
                                    <div
                                        className={`h-6 ${rarityClasses[rarityType]} rounded-md`}
                                    >
                                        {skin.stattrak && "StatTrak Available"}
                                        {skin.souvenir && "Souvenir Available"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center p-2 h-[450px]">
                                <Image
                                    alt={skin.name}
                                    height={400}
                                    width={400}
                                    src={skin.image}
                                    priority
                                    className="pr-2 pl-2"
                                />
                            </div>
                            <Slider
                                initialValue={Number(skin.min_float || 0)}
                                maxThumbValue={Number(skin.max_float || 0)}
                            />
                        </div>
                        <div className="w-[500px] h-[90px] rounded-md justify-center items-center flex gap-4 bg-black-300">
                            {skin.crates.map((crate) => (
                                <Image
                                    key={crate.id}
                                    alt={crate.name}
                                    height={70}
                                    width={70}
                                    src={crate.image}
                                    className="pr-2 pl-2"
                                    priority
                                />
                            ))}
                            {skin.collections.map((collection) => (
                                <Image
                                    key={collection.id}
                                    alt={collection.name}
                                    height={70}
                                    width={70}
                                    priority
                                    className="pr-2 pl-2"
                                    src={collection.image}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-2 w-[410px] rounded-md">
                        <div className="flex flex-col p-5 rounded-md bg-black-300">
                            <div className="flex justify-between">
                                <span>Factory New</span>
                                <span>$ TO DO</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Minimal Wear</span>
                                <span>$ TO DO</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Field-Tested</span>
                                <span>$ TO DO</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Well-Worn</span>
                                <span>$ TO DO</span>
                            </div>

                            {skin.stattrak && (
                                <>
                                    <hr className="m-2" />
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-orange-400 font-medium">
                                                StatTrak
                                            </span>{" "}
                                            Factory New
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-orange-400 font-medium">
                                                StatTrak
                                            </span>{" "}
                                            Minimal Wear
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-orange-400 font-medium">
                                                StatTrak
                                            </span>{" "}
                                            Field-Tested
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-orange-400 font-medium">
                                                StatTrak
                                            </span>{" "}
                                            Well-Worn
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                </>
                            )}

                            {skin.souvenir && (
                                <>
                                    <hr className="m-2" />
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-yellow-400 font-medium">
                                                Souvenir
                                            </span>{" "}
                                            Factory New
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-yellow-400 font-medium">
                                                Souvenir
                                            </span>{" "}
                                            Minimal Wear
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-yellow-400 font-medium">
                                                Souvenir
                                            </span>{" "}
                                            Field-Tested
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>
                                            <span className="text-yellow-400 font-medium">
                                                Souvenir
                                            </span>{" "}
                                            Well-Worn
                                        </span>
                                        <span>$ TO DO</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="w-[410px] p-5 bg-black-300 rounded-md">
                            <div className="flex relative mt-2 mb-2 mx-4">
                                <div
                                    className="absolute top-0"
                                    style={{
                                        left: `${calcs(skin.max_float, true)}%`,
                                    }}
                                >
                                    <span
                                        className="text-xs absolute"
                                        style={{
                                            marginTop: "-20px",
                                            marginLeft: "-10px",
                                        }}
                                    >
                                        {Number(skin.max_float || 0).toFixed(2)}
                                    </span>
                                    <svg
                                        className="absolute w-1.5 h-1.5"
                                        style={{
                                            marginTop: "-5px",
                                            marginLeft: "-2px",
                                        }}
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 12 7"
                                    >
                                        <path d="M11.261 2.02A.96.96 0 009.941.623L6 4.35 2.06.623A.96.96 0 00.74 2.02l4.573 4.33a1 1 0 001.374 0l4.574-4.33z"></path>
                                    </svg>
                                </div>
                                <div
                                    className="absolute top-0"
                                    style={{
                                        left: `${calcs(skin.min_float, true)}%`,
                                    }}
                                >
                                    <span
                                        className="text-xs absolute"
                                        style={{
                                            marginTop: "-20px",
                                            marginLeft: "-10px",
                                        }}
                                    >
                                        {Number(skin.min_float || 0).toFixed(2)}
                                    </span>
                                    <svg
                                        className="absolute w-1.5 h-1.5"
                                        style={{
                                            marginTop: "-5px",
                                            marginLeft: "-2px",
                                        }}
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 12 7"
                                    >
                                        <path d="M11.261 2.02A.96.96 0 009.941.623L6 4.35 2.06.623A.96.96 0 00.74 2.02l4.573 4.33a1 1 0 001.374 0l4.574-4.33z"></path>
                                    </svg>
                                </div>
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600"></div>
                                <div
                                    className="absolute z-10 top-0 h-[3px] bg-green-600"
                                    style={{
                                        left: `${calcs(skin.min_float, true)}%`,
                                        right: `${calcs(
                                            skin.max_float,
                                            false,
                                        )}%`,
                                    }}
                                ></div>
                                <div className="w-1/5 bg-black-400 text-center shadow-md py-2 border-black-500 border-r rounded-bl tippy">
                                    <span className="text-xs">FN</span>
                                </div>
                                <div className="w-1/5 bg-black-400 text-center shadow-md py-2 border-black-500 border-r tippy">
                                    <span className="text-xs">MW</span>
                                </div>
                                <div className="w-1/5 bg-black-400 text-center shadow-md py-2 border-black-500 border-r tippy">
                                    <span className="text-xs">FT</span>
                                </div>
                                <div className="w-1/5 bg-black-400 text-center shadow-md py-2 border-black-500 border-r tippy">
                                    <span className="text-xs">WW</span>
                                </div>
                                <div className="w-1/5 bg-black-400 text-center shadow-md py-2 rounded-br">
                                    <span className="text-xs">BS</span>
                                </div>
                            </div>

                            <div className="font-medium">
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Category:
                                        </span>
                                        {skin.weapon.name}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Type:
                                        </span>
                                        {skin.category.name}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Finish:
                                        </span>
                                        {skin.pattern.name}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Finish Style:
                                        </span>
                                        {skin.finish_style.name}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Finish Catalog:
                                        </span>
                                        {skin.paint_index}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="font-extralight text-sm">
                                        <span className="font-medium pr-2 text-base">
                                            Description:
                                        </span>
                                        {cleanedDescription}
                                    </span>
                                </div>
                                {flavorText && (
                                    <div className="flex">
                                        <span className="font-extralight text-sm">
                                            <span className="font-medium pr-2 text-base">
                                                Flavor Text:
                                            </span>
                                            <span className="special-flavor-text">
                                                {flavorText}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

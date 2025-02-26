import CardSkins from "@/components/Card/CardSkins";
import { notFound } from "next/navigation";
import { knivesArray } from "./knivesArray";
import Image from "next/image";

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
  crates: { id: string; name: string; image: string }[];
  stattrak: boolean;
  souvenir: boolean;
}

const weaponIdMap = Object.fromEntries(
  knivesArray.map((weapon) => [weapon.name.toLowerCase(), weapon.id]),
);

const vanillaIdMap = Object.fromEntries(
  knivesArray.map((weapon) => [weapon.name.toLowerCase(), weapon.id_vanilla]),
);

export default async function Knives({ params }: { params: { id: string } }) {
  const weaponId = weaponIdMap[params.id.toLowerCase()];
  const vanillaId = vanillaIdMap[params.id.toLowerCase()];

  if (!weaponId && !vanillaId) {
    notFound();
  }

  try {
    const response = await fetch("https://api.cs2data.info/en/skins.json");
    const data: Skin[] = await response.json();

    const filteredSkins = data.filter(
      (item) => item.weapon.id === weaponId || item.weapon.id === vanillaId,
    );

    const skinsWithVanilla = data.filter(
      (item) =>
        item.weapon.id === vanillaId &&
        !filteredSkins.some((filtered) => filtered.id === item.id),
    );

    const uniqueSkinsMap = new Set();
    const uniqueSkins = [];

    for (const skin of [...filteredSkins, ...skinsWithVanilla]) {
      const skinNameLower = skin.name.toLowerCase();

      if (!uniqueSkinsMap.has(skinNameLower)) {
        uniqueSkinsMap.add(skinNameLower);
        uniqueSkins.push(skin);
      }
    }

    return (
      <div className="bg-zinc-900">
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
                const { name: skinName, image: imageUrl, crates } = item;

                const crateCount = crates.length;
                const randomCrateImage =
                  crateCount > 0
                    ? crates[Math.floor(Math.random() * crateCount)].image
                    : "";

                return (
                  <CardSkins
                    key={item.id}
                    skinName={skinName}
                    imageUrl={imageUrl}
                    rarity={{
                      color: item.rarity.color,
                      name: item.rarity.name,
                    }}
                    specialOption="StatTrak"
                    priceWithoutStatTrak="no data - nodata"
                    priceWithStatTrak="no data - nodata"
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
      </div>
    );
  } catch (error) {
    console.error("Error fetching skins:", error);
    return <div className="text-white">Failed to load skins</div>;
  }
}

import Image from "next/image";
import crateIdData from "../../../public/crateId.json";
import { cookies } from "next/headers";

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

interface Collection {
  id: string;
  name: string;
  crates: Crate[];
  contains: Skin[];
  image: string;
}

const getUniqueSkinsByName = (skins: Skin[]) => {
  const seenNames = new Set();
  return skins.filter((skin) => {
    if (seenNames.has(skin.name)) {
      return false;
    }
    seenNames.add(skin.name);
    return true;
  });
};

interface CardRaresProps {
  params?: { id: string }; // O objeto params é opcional
  crateId?: string; // crateId é opcional
  rare?: boolean; // rare é opcional
  skin?: boolean; // skin é opcional
}

export default async function CardRareSpecial({
  params,
  rare = false,
  skin = false,
}: CardRaresProps) {
  const idToUse = params?.id || crateIdData.id;

  let crate: Crate | null = null;
  let collectionImage: string | null = null;

  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value || "en";

  try {
    const response = await fetch(
      `https://api.cs2data.info/${language}/crates.json`
    );
    const cratesData = await response.json();
    crate = cratesData.find((item: Crate) => item.id === idToUse) || null;
  } catch (error) {
    console.error("Error fetching crate data:", error);
  }

  if (!crate) {
    return (
      <div className="flex justify-center items-center h-72 text-white bg-black-300">
        <span>Crate not found.</span>
      </div>
    );
  }

  try {
    const collectionResponse = await fetch(
      `https://api.cs2data.info/${language}/collections.json`
    );
    const collectionsData = await collectionResponse.json();
    const collection = collectionsData.find((col: Collection) =>
      col.crates.some((c) => c.name === crate.name)
    );

    if (collection) {
      collectionImage = collection.image;
    }
  } catch (error) {
    console.error("Error fetching collection data:", error);
  }

  const getRandomSkins = (skins: Skin[], count: number) => {
    if (skins.length <= 15) {
      return skins.slice(0, count);
    } else {
      const shuffled = skins.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  };

  const uniqueSkins = rare
    ? getUniqueSkinsByName(crate.contains_rare)
    : getUniqueSkinsByName(crate.contains);
  const skinsToShow = getRandomSkins(uniqueSkins, 4);

  const hasKnives = uniqueSkins.some(
    (item) => item.rarity.id === "rarity_ancient_weapon"
  );
  const hasGloves = uniqueSkins.some(
    (item) => item.rarity.id === "rarity_ancient"
  );

  const itemType = skin ? "" : hasGloves ? "Gloves" : hasKnives ? "Knives" : "";
  const imageToUse = skin
    ? collectionImage || "/img/others/rare_item.webp"
    : "/img/others/rare_item.webp";

  return (
    <>
      <div className="skin-card cursor-pointer bg-black-300">
        <div className="header">
          <div className="skin-name">
            <span>
              {skin ? `${crate.name} | Skins` : `${crate.name} | ${itemType}`}
            </span>
          </div>
          <div className="rarity-info">
            <div className="rarity-badge">
              <span></span>
            </div>
            <div
              className={`special-option ${
                skin ? "bg-[#eceae0c5]" : "bg-[#ffd900c5]"
              }`}
            >
              <span>{skin ? "★ Case Items ★" : "★ Rare Special Items ★"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-2 h-[269.5px] w-[370px] my-14">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="justify-center items-center text-center">
              <Image
                width={120}
                height={120}
                src={imageToUse}
                alt={skin ? "case items" : "rare items"}
                className="pr-2 pl-2 w-full h-full"
              />
            </div>

            <div className="gap-6 grid mt-2 grid-cols-2 items-center">
              {skinsToShow.map((item) => (
                <Image
                  key={item.id}
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.name}
                  className="pr-2 pl-2 w-full h-full"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-end text-sm font-medium mt-7">
          <span>
            {uniqueSkins.length} {skin ? "Case Items" : "Rare Special Items"}
          </span>
        </div>
      </div>
    </>
  );
}

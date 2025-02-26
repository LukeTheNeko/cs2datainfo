import CardRareSpecial from "@/components/Card/CardRareSpecial";
import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function Cases({ params }: { params: { id: string } }) {
  const crateId = formatNameForId(params.id);
  let crate: Crate | null = null;

  try {
    const response = await axios.get("https://api.cs2data.info/en/crates.json");
    const cases = response.data.filter((item: Crate) => item.type === "Case");

    crate =
      cases.find((item: Crate) => {
        const formattedItemName = formatNameForId(item.name);
        return formattedItemName === crateId;
      }) || null;
  } catch {
    notFound();
  }

  if (!crate) {
    notFound();
  }

  return (
    <>
      <div className="bg-zinc-900">
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
            <span className="crate-sale-date text-[#ffd900c5]">Rare Items</span>
          </span>
        </div>

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
            <Link
              href={`/cases/${formatNameForId(crate.name)}`}
              className="flex justify-center items-center my-4"
            >
              <CardRareSpecial params={{ id: crate.id }} skin />
            </Link>

            {crate.contains && crate.contains.length > 0 ? (
              crate.contains_rare
                .slice()
                .reverse()
                .filter(
                  (item: Skin, index: number, self: Skin[]) =>
                    index === self.findIndex((i) => i.name === item.name),
                )
                .map((item: Skin) => {
                  const rarityToSpecialOption: Record<
                    string,
                    "Default" | "StatTrak" | "Souvenir"
                  > = {
                    Extraordinary: "Default",
                    Covert: "StatTrak",
                  };

                  const specialOption: "Default" | "StatTrak" | "Souvenir" =
                    rarityToSpecialOption[item.rarity.name] || "Default";

                  return (
                    <CardSkins
                      key={item.id}
                      skinName={item.name}
                      imageUrl={item.image}
                      rarity={item.rarity}
                      specialOption={specialOption}
                      priceWithoutStatTrak="No data"
                      priceWithStatTrak="No Data"
                      collectionName={crate.name}
                      collectionImageUrl={crate.image}
                      basePath="/cases/"
                    />
                  );
                })
            ) : (
              <div className="text-white">No items found in the crate.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

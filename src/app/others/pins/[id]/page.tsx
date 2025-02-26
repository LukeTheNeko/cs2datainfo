import CardSkins from "@/components/Card/CardSkins";
import Image from "next/image";
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
    .replace(/:/g, "")
    .replace(/CS:GO\s+/i, "")
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

export default async function Pins({ params }: { params: { id: string } }) {
  const crateId = formatNameForId(params.id);

  let crate: Crate | null = null;

  try {
    const response = await fetch(
      "https://api.cs2data.info/en/crates/capsules/pins.json",
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const cases: Crate[] = await response.json();
    const filteredCases = cases.filter((item) => item.type === "Pins");

    crate =
      filteredCases.find((item) => {
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
          </span>
        </div>

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
            {crate.contains && crate.contains.length > 0 ? (
              crate.contains
                .slice()
                .reverse()
                .map((item: Skin, index: number) => (
                  <CardSkins
                    key={index}
                    skinName={item.name}
                    imageUrl={item.image}
                    rarity={item.rarity}
                    specialOption="Default"
                    priceWithoutStatTrak="No data"
                    priceWithStatTrak=""
                    collectionName={crate.name}
                    collectionImageUrl={crate.image}
                    basePath="/others/pins/"
                  />
                ))
            ) : (
              <div className="text-white">No items found in the crate.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

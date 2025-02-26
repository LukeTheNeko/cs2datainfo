import CardSkins from "@/components/Card/CardSkins";
import Image from "next/image";
import { notFound } from "next/navigation";

const formatNameForId = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\|/g, "")
    .replace(/\★/g, "")
    .replace(/:/g, "")
    .replace(/CS:GO/gi, "csgo")
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+/g, "")
    .replace(/-+$/g, "");

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

export default async function Cases({ params }: { params: { id: string } }) {
  const crateId = formatNameForId(params.id);

  let crate: Crate | null = null;

  try {
    const responseEn = await fetch(
      "https://api.cs2data.info/en/crates/capsules/patches.json",
      {
        cache: "no-store",
      },
    );
    const casesEn = await responseEn.json();
    const filteredCasesEn = casesEn.filter(
      (item: Crate) => item.type === "Patch Capsule",
    );

    crate =
      filteredCasesEn.find(
        (item: Crate) => formatNameForId(item.name) === crateId,
      ) || null;

    if (!crate) {
      notFound();
    }
  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
    notFound();
  }

  return (
    <>
      <div className="bg-zinc-900">
        <div className="crate-container">
          <div className="crate-image-wrapper">
            <span></span>
            {crate && (
              <Image
                width={250}
                height={250}
                src={crate.image}
                alt={crate.name}
                className="crate-image"
                priority
              />
            )}
          </div>
          <span className="crate-info">
            <span className="crate-name">{crate?.name}</span>
          </span>
        </div>

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
            {crate?.contains && crate.contains.length > 0 ? (
              crate.contains
                .slice()
                .reverse()
                .map((item: Skin) => (
                  <CardSkins
                    key={item.id}
                    skinName={item.name}
                    imageUrl={item.image}
                    rarity={item.rarity}
                    specialOption="Default"
                    priceWithoutStatTrak="No data"
                    priceWithStatTrak="No Data"
                    collectionName={crate.name || ""}
                    collectionImageUrl={crate.image || ""}
                    basePath="/others/patches/"
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

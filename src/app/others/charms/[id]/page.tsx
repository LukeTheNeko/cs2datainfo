import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { charmsData } from "./charmsArray";

interface Rarity {
  id: string;
  name: string;
  color: string;
}

interface Capsula {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  market_hash_name: string;
  image: string;
}

async function fetchCharms(): Promise<Capsula[]> {
  const response = await axios.get<Capsula[]>(
    "https://api.cs2data.info/en/keychains.json",
  );
  return response.data;
}

export default async function CharmsPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = charmsData.find(
    (collection) => collection.collectionId === params.id,
  );

  if (!collection) {
    return notFound();
  }

  const apiCharms = await fetchCharms();

  const filteredCharms = collection.charms
    .map((colCharm) => {
      const charmName = `Charm | ${colCharm.name}`;
      return apiCharms.find(
        (apiCharm) => apiCharm.market_hash_name === charmName,
      );
    })
    .filter(Boolean) as Capsula[];

  return (
    <>
      <div className="bg-zinc-900">
        <div className="crate-container">
          {collection && (
            <>
              <div className="crate-image-wrapper">
                <Image
                  width={100}
                  height={100}
                  src={collection.collectionImage || ""}
                  alt={collection.collectionName || ""}
                  className="crate-image"
                  priority
                />
              </div>
              <span className="crate-info">
                <span className="crate-name">{collection.collectionName}</span>
              </span>
            </>
          )}
        </div>

        <div className="flex justify-center items-center my-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
            {filteredCharms.length > 0 ? (
              filteredCharms.map((charm) => (
                <CardSkins
                  key={charm.id}
                  skinName={charm.name}
                  imageUrl={charm.image}
                  rarity={{
                    name: charm.rarity.name,
                    color: charm.rarity.color,
                  }}
                  specialOption="Default"
                  priceWithoutStatTrak="no data"
                  priceWithStatTrak=""
                  collectionName={collection.collectionName}
                  collectionImageUrl={collection.collectionImage || ``}
                  basePath="/others/charms/"
                />
              ))
            ) : (
              <div className="bg-zinc-900">Nenhum charm encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

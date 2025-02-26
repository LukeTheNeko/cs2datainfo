import Image from "next/image";
import Link from "next/link";
import { Skin } from "./skin";

const CollectionCase = ({ skin }: { skin: Skin }) => {
  const rarityType = skin.stattrak
    ? "StatTrak"
    : skin.souvenir
    ? "Souvenir"
    : "Default";

  const urlPrefix = rarityType === "Souvenir" ? "/souvenir/" : "/cases/";

  return (
    <>
      <div className="flex flex-col gap-2">
        {skin.collections && skin.collections.length > 0 && (
          <div className="rounded-md justify-center items-center flex bg-black-300 p-2">
            {skin.collections.map((collection) => (
              <div
                key={collection.name}
                className="flex flex-col items-center gap-2"
              >
                <Link
                  className="flex flex-col items-center"
                  href={`/collection/${collection.name
                    .toLowerCase()
                    .replace(/CS:GO/gi, "csgo")
                    .replace(/&/g, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <Image
                    alt={collection.name}
                    height={75}
                    width={75}
                    src={collection.image}
                    className="pr-2 pl-2"
                    priority
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {skin.crates && skin.crates.length > 0 && (
          <div className="rounded-md justify-center items-center flex flex-wrap gap-2 bg-black-300 p-2">
            {skin.crates.map((crate) => (
              <div
                key={`${crate.name}-${skin.id}`}
                className="flex items-center gap-2"
              >
                <Link
                  className="flex items-center text-left"
                  href={`${urlPrefix}${crate.name
                    .toLowerCase()
                    .replace(/CS:GO/gi, "csgo")
                    .replace(/&/g, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <Image
                    alt={crate.name}
                    height={75}
                    width={75}
                    src={crate.image}
                    className="pr-2 pl-2"
                    priority
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionCase;

import CollectionCase from "@/components/Items/CollectionCase";
import Summary from "@/components/Items/Summary";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Skin } from "@/components/Items/skin";
import Link from "next/link";

export default async function Item({ params }: { params: { id: string } }) {
  function formatSkinName(name: string): string {
    return name
      .replace(/\|/g, "") // Remove "|"
      .replace(/CS:GO/g, "") // Remove "CS:GO"
      .replace(/[ā]/g, "a") // ã to a remove ~
      .replace(/StatTrak™/g, "") // Remove "StatTrak™"
      .replace(/\(Holo\/Foil\)/g, "") // Remove "(Holo/Foil)"
      .replace(/\(Foil\)/g, "") // Remove "(Foil)"
      .replace(/★/g, "") // Remove a estrela "★"
      .replace(/\s* & \s*/g, "-") // Substitui "&" e espaços ao redor por "-"
      .replace(/\s+/g, "-") // Substitui espaços por "-"
      .replace(/-+/g, "-") // Remove hífens duplicados
      .toLowerCase() // Converte para minúsculas
      .replace(/^-+/g, "") // Remove hífens no início
      .replace(/-+$/g, ""); // Remove hífens no final
  }

  async function fetchSkinData(): Promise<Skin[] | null> {
    try {
      const response = await axios.get(
        "https://api.cs2data.info/en/skins.json",
      );
      return response.data || null;
    } catch {
      return null;
    }
  }

  const skins = await fetchSkinData();

  if (!skins) {
    return notFound();
  }

  const skin = skins.find((item) => formatSkinName(item.name) === params.id);

  if (!skin) {
    return notFound();
  }

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

  const filteredSkins = skins.filter(
    (item) => item.name === skin.name && item.phase,
  );

  return (
    <>
      <div className="bg-zinc-900 text-white flex flex-col">
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
              <div className="flex justify-center p-2">
                <Image
                  alt={skin.name}
                  height={500}
                  width={500}
                  src={skin.image}
                  priority
                  className="pr-2 pl-2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2 w-[410px] rounded-md">
            <div className="flex flex-col p-2 rounded-md bg-black-300">
              {[
                "Factory New",
                "Minimal Wear",
                "Field-Tested",
                "Well-Worn",
                "Battle-Scarred",
              ].map((wearName) => {
                const exists = skin.wears.some((w) => w.name === wearName);
                const linkClass = exists
                  ? "flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md my-0.5"
                  : "flex justify-between bg-black-400 px-2 py-0.5 rounded-md cursor-not-allowed opacity-45 my-0.5";

                return (
                  <Link
                    key={wearName}
                    className={linkClass}
                    href={
                      exists
                        ? `https://steamcommunity.com/market/listings/730/${skin.name} (${wearName})`
                        : "#"
                    }
                    target="_blank"
                  >
                    <span>{wearName}</span>
                    <span>
                      {exists ? "$ TO DO MAKE PRICES" : "Not possible"}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* {(skin.stattrak || skin.souvenir) && (
                            <div className="flex flex-col p-2 rounded-md bg-black-300">
                                {skin.stattrak && (
                                    <>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-orange-400 font-medium">
                                                    StatTrak
                                                </span>{" "}
                                                Factory New
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-orange-400 font-medium">
                                                    StatTrak
                                                </span>{" "}
                                                Minimal Wear
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-orange-400 font-medium">
                                                    StatTrak
                                                </span>{" "}
                                                Field-Tested
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-orange-400 font-medium">
                                                    StatTrak
                                                </span>{" "}
                                                Well-Worn
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-orange-400 font-medium">
                                                    StatTrak
                                                </span>{" "}
                                                Battle-Scarred
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                    </>
                                )}

                                {skin.souvenir && (
                                    <>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-yellow-400 font-medium">
                                                    Souvenir
                                                </span>{" "}
                                                Factory New
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-yellow-400 font-medium">
                                                    Souvenir
                                                </span>{" "}
                                                Minimal Wear
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-yellow-400 font-medium">
                                                    Souvenir
                                                </span>{" "}
                                                Field-Tested
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-yellow-400 font-medium">
                                                    Souvenir
                                                </span>{" "}
                                                Well-Worn
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                        <Link
                                            className="flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md"
                                            href={`https://steamcommunity.com/market/listings/730/${skin.name} (Battle-Scarred)`}
                                            target="_blank"
                                        >
                                            <span>
                                                <span className="text-yellow-400 font-medium">
                                                    Souvenir
                                                </span>{" "}
                                                Battle-Scarred
                                            </span>
                                            <span>$ TO DO MAKE PRICES</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )} */}

            {(skin.stattrak || skin.souvenir) && (
              <div className="flex flex-col p-2 rounded-md bg-black-300">
                {skin.stattrak && (
                  <>
                    {[
                      "Factory New",
                      "Minimal Wear",
                      "Field-Tested",
                      "Well-Worn",
                      "Battle-Scarred",
                    ].map((wearName) => {
                      const exists = skin.wears.some(
                        (w) => w.name === wearName,
                      );
                      const linkClass = exists
                        ? "flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md my-0.5"
                        : "flex justify-between bg-black-400 px-2 py-0.5 rounded-md cursor-not-allowed opacity-45 my-0.5";

                      return (
                        <Link
                          key={wearName}
                          className={linkClass}
                          href={
                            exists
                              ? `https://steamcommunity.com/market/listings/730/StatTrak™ ${skin.name} (${wearName})`
                              : "#"
                          }
                          target="_blank"
                        >
                          <span>
                            <span className="text-orange-400 font-medium">
                              StatTrak
                            </span>{" "}
                            {wearName}
                          </span>
                          <span>
                            {exists ? "$ TO DO MAKE PRICES" : "Not possible"}
                          </span>
                        </Link>
                      );
                    })}
                  </>
                )}

                {skin.souvenir && (
                  <>
                    {[
                      "Factory New",
                      "Minimal Wear",
                      "Field-Tested",
                      "Well-Worn",
                      "Battle-Scarred",
                    ].map((wearName) => {
                      const exists = skin.wears.some(
                        (w) => w.name === wearName,
                      );
                      const linkClass = exists
                        ? "flex justify-between hover:bg-black-400 px-2 py-0.5 rounded-md my-0.5"
                        : "flex justify-between bg-black-400 px-2 py-0.5 rounded-md cursor-not-allowed opacity-45 my-0.5";

                      return (
                        <Link
                          key={wearName}
                          className={linkClass}
                          href={
                            exists
                              ? `https://steamcommunity.com/market/listings/730/Souvenir ${skin.name} (${wearName})`
                              : "#"
                          }
                          target="_blank"
                        >
                          <span>
                            <span className="text-yellow-400 font-medium">
                              Souvenir
                            </span>{" "}
                            {wearName}
                          </span>
                          <span>
                            {exists ? "$ TO DO MAKE PRICES" : "Not possible"}
                          </span>
                        </Link>
                      );
                    })}
                  </>
                )}
              </div>
            )}

            <Summary skin={skin} />
            <CollectionCase skin={skin} />
          </div>
        </div>

        {filteredSkins.length > 0 && (
          <div className="bg-black-300 md:mx-20 mx-5 my-10 p-4 rounded-md flex flex-col justify-center items-center text-center shadow-md">
            <span className="text-3xl md:text-5xl font-medium">
              Skin Variations
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 m-5">
              {filteredSkins.map((skin) => (
                <div
                  key={`${skin.name}-${skin.paint_index}-${skin.phase}`}
                  className="flex flex-col p-4"
                >
                  <div className="whitespace-nowrap flex flex-col">
                    <span className="text-lg font-medium">{skin.phase}</span>
                    <span className="text-sm font-light">
                      Finish Catalog #{skin.paint_index}
                    </span>
                  </div>
                  {skin.image && (
                    <Image
                      height={500}
                      width={500}
                      src={skin.image}
                      alt={skin.phase}
                      className="my-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

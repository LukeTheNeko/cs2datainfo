import Image from "next/image";
import Link from "next/link";
import crateIdData from "../../../public/crateId.json";
import CardRareSpecial from "../Card/CardRareSpecial";
import CardSkins from "../Card/CardSkins";
import NewItems from "./NewItems";

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
    .replace(/\|/g, "") // Remove "|"
    .replace(/:/g, "") // Remove ":"
    .replace(/CS:GO/gi, "csgo") // Substitui "CS:GO" por "csgo"
    .replace(/&/g, "") // Remove "&"
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .normalize("NFD") // Normaliza os caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\u0400-\u04FF\-]/g, "") // Permite letras, números, hífens e caracteres não latinos
    .replace(/-+/g, "-") // Remove hífens duplicados
    .replace(/^-+/g, "") // Remove hífens no início
    .replace(/-+$/g, "") // Remove hífens no final
    .toLowerCase(); // Converte para minúsculas

export default async function HomeCases() {
  let crate: Crate | null = null;
  const crateId = crateIdData.id;

  try {
    const response = await fetch("https://api.cs2data.info/en/crates.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    crate = data.find((item: Crate) => item.id === crateId) || null;
  } catch (error) {
    console.error("Error fetching crate data:", error);
  }

  if (!crate) {
    return (
      <div className="flex justify-center items-center h-72 text-white">
        <span>Crate not found.</span>
      </div>
    );
  }

  return (
    <>
      <NewItems
        titleContent={`Check out all the new <span class="font-semibold text-indigo-500 hover:underline"><a href="https://store.steampowered.com/sale/armory" target="_blank">Armory</a></span> items!`}
        items={[
          {
            src: "https://img.cs2data.info/static/panorama/images/econ/set_icons/set_xpshop_wpn_01_png.png",
            name: "Limited Edition Item",
            href: "/collection/limited-edition-item",
            amountname: "Skins",
            amount: "1",
          },
          {
            src: "https://img.cs2data.info/static/panorama/images/econ/set_icons/set_graphic_design_png.png",
            name: "The Graphic Design Collection",
            href: "/collection/the-graphic-design-collection",
            amountname: "Skins",
            amount: "16",
          },
          {
            src: "https://img.cs2data.info/static/panorama/images/econ/set_icons/set_overpass_2024_png.png",
            name: "The Overpass 2024 Collection",
            href: "/collection/the-overpass-2024-collection",
            amountname: "Skins",
            amount: "16",
          },
          {
            src: "https://img.cs2data.info/static/panorama/images/econ/set_icons/set_realism_camo_png.png",
            name: "The Sport & Field Collection",
            href: "/collection/the-sport-field-collection",
            amountname: "Skins",
            amount: "16",
          },
          {
            src: "/img/others/missing_link_charm_collection.webp",
            name: "Missing Link Charms",
            href: "/others/charms/missing-link-charm-collection",
            amountname: "Charms",
            amount: "17",
          },
          {
            src: "/img/others/small_arms_charm_collection.webp",
            name: "Small Arms Charms",
            href: "/others/charms/small-arms-charm-collection",
            amountname: "Charms",
            amount: "16",
          },
          {
            src: "https://img.cs2data.info/static/panorama/images/econ/weapon_cases/crate_community_34_png.png",
            name: "Gallery Case Skins",
            href: "/cases/gallery-case",
            amountname: "Skins",
            amount: "17",
          },
          {
            src: "/img/collections/elemental_craft_stickers.webp",
            name: "Elemental Stickers",
            href: "/stickers/regular/collection/elemental-craft-stickers",
            amountname: "Stickers",
            amount: "26",
          },
          {
            src: "/img/collections/character_craft_stickers.webp",
            name: "Character Stickers",
            href: "/stickers/regular/collection/character-craft-stickers",
            amountname: "Stickers",
            amount: "25",
          },
        ]}
      />

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
          <span className="crate-sale-date">
            First Sale Date: {crate.first_sale_date}
          </span>
        </span>
      </div>

      <div className="flex justify-center items-center my-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          <Link
            href={`/cases/${formatNameForId(crate.name)}/rare-items`}
            className="flex justify-center items-center my-4"
          >
            <CardRareSpecial crateId={crate.id} rare />
          </Link>

          {crate.contains && crate.contains.length > 0 ? (
            crate.contains
              .slice()
              .reverse()
              .map((item: any) => (
                <CardSkins
                  key={item.id}
                  skinName={item.name}
                  imageUrl={item.image}
                  rarity={item.rarity}
                  specialOption="StatTrak"
                  priceWithoutStatTrak="No data"
                  priceWithStatTrak="No Data"
                  collectionName={crate.name}
                  collectionImageUrl={crate.image}
                  basePath="/cases/"
                />
              ))
          ) : (
            <div className="text-white">No items found in the crate.</div>
          )}
        </div>
      </div>
    </>
  );
}

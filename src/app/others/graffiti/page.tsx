import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

interface Rarity {
  id: string;
  name: string;
  color: string;
}

interface Crate {
  id: string;
  name: string;
  image: string;
}

interface Graffiti {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  crates: Crate[];
  tournament_event?: string;
  type: string;
  market_hash_name: string | null;
  effect: string;
  image: string;
}

const rarityOrder = [
  "#b0c3d9", // Base Grade

  "#eb4b4b", // Master
  "#d32ce6", // Superior
  "#8847ff", // Exceptional
  "#4b69ff", // Distinguished
];

export default async function GraffitiPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value || "en";

  const fetchgraffiti = async () => {
    try {
      const response = await axios.get(
        `https://api.cs2data.info/${language}/graffiti.json`,
      );
      return response.data.filter(
        (graffiti: Graffiti) => graffiti.market_hash_name !== null,
      );
    } catch (error) {
      console.error("Erro ao buscar os graffiti:", error);
      return [];
    }
  };

  const graffiti = await fetchgraffiti();

  const orderGraffitiByRarity = (graffiti: Graffiti[]) => {
    return graffiti.sort((a, b) => {
      const aRarityIndex = rarityOrder.indexOf(a.rarity.color);
      const bRarityIndex = rarityOrder.indexOf(b.rarity.color);
      return aRarityIndex - bRarityIndex;
    });
  };

  const orderedgraffiti = orderGraffitiByRarity(graffiti);
  const graffitiPerPage = 45;
  const totalPages = Math.ceil(orderedgraffiti.length / graffitiPerPage);

  const currentPage =
    searchParams.page && parseInt(searchParams.page) > 0
      ? Math.min(parseInt(searchParams.page), totalPages)
      : 1;

  const startIndex = (currentPage - 1) * graffitiPerPage;
  const currentgraffiti = orderedgraffiti.slice(
    startIndex,
    startIndex + graffitiPerPage,
  );

  return (
    <div className="bg-zinc-900">
      <div className="flex justify-center my-10 items-center gap-1">
        <div className="flex flex-col text-white font-medium px-6 gap-1">
          <span className="text-4xl">All Graffiti</span>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {currentgraffiti.length > 0 ? (
            currentgraffiti.map((graffiti) => (
              <CardSkins
                key={graffiti.id}
                skinName={graffiti.name}
                imageUrl={graffiti.image}
                rarity={graffiti.rarity}
                specialOption="Default"
                priceWithoutStatTrak="no data"
                priceWithStatTrak=""
                collectionName={""}
                collectionImageUrl={""}
                basePath="/others/graffiti"
              />
            ))
          ) : (
            <div>No graffiti found.</div>
          )}
        </div>
      </div>

      {/* -------------------------------------- Pagination -------------------------------------- */}
      <div className="flex justify-end items-center my-10 text-sm mx-20">
        <div className="flex">
          {/* Botão de Página Anterior */}
          <Link
            href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
            className={`items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950 rounded-l-md
               ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            &lt;
          </Link>

          {/* Primeiras Páginas */}
          {currentPage <= 6 ? (
            <>
              {Array.from({ length: 9 }, (_, index) => (
                <Link
                  key={index + 1}
                  href={`?page=${index + 1}`}
                  className={`items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950 ${
                    currentPage === index + 1 ? "bg-indigo-950" : ""
                  }`}
                >
                  {index + 1}
                </Link>
              ))}
              <span className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950">
                ...
              </span>
              <Link
                href={`?page=${totalPages - 1}`}
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                {totalPages - 1}
              </Link>
              <Link
                href={`?page=${totalPages}`}
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                {totalPages}
              </Link>
            </>
          ) : currentPage >= totalPages - 5 ? (
            <>
              <Link
                href="?page=1"
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                1
              </Link>
              <Link
                href="?page=2"
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                2
              </Link>
              <span className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950">
                ...
              </span>
              {Array.from({ length: 9 }, (_, index) => (
                <Link
                  key={totalPages - 8 + index}
                  href={`?page=${totalPages - 8 + index}`}
                  className={`items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950 ${
                    currentPage === totalPages - 8 + index
                      ? "bg-indigo-950"
                      : ""
                  }`}
                >
                  {totalPages - 8 + index}
                </Link>
              ))}
            </>
          ) : (
            <>
              <Link
                href="?page=1"
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                1
              </Link>
              <Link
                href="?page=2"
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                2
              </Link>
              <span className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950">
                ...
              </span>
              {Array.from({ length: 6 }, (_, index) => (
                <Link
                  key={currentPage - 3 + index}
                  href={`?page=${currentPage - 3 + index}`}
                  className={`items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950 ${
                    currentPage === currentPage - 3 + index
                      ? "bg-indigo-700"
                      : ""
                  }`}
                >
                  {currentPage - 3 + index}
                </Link>
              ))}
              <span className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950">
                ...
              </span>
              <Link
                href={`?page=${totalPages - 1}`}
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                {totalPages - 1}
              </Link>
              <Link
                href={`?page=${totalPages}`}
                className="items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950"
              >
                {totalPages}
              </Link>
            </>
          )}

          {/* Botão de Página Seguinte */}
          <Link
            href={currentPage < totalPages ? `?page=${currentPage + 1}` : "#"}
            className={`items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-black-300 border border-black-400 cursor-pointer leading-5 hover:bg-indigo-950 rounded-r-md 
              ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
          >
            &gt;
          </Link>
        </div>
      </div>
      {/* -------------------------------------- Pagination -------------------------------------- */}
    </div>
  );
}

import CardSkins from "@/components/Card/CardSkins";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { agentsArray } from "./agentsArray";

interface Agent {
  id: string;
  name: string;
  description: string;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
  collections: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  team: {
    id: string;
    name: string;
  };
  market_hash_name: string;
  image: string;
  model_player: string;
}

export default async function Collection({
  params,
}: {
  params: { id: string };
}) {
  const selectedCollection = agentsArray.find(
    (agent) => agent.link === params.id,
  );

  if (!selectedCollection) {
    notFound();
  }

  try {
    const response = await axios.get("https://api.cs2data.info/en/agents.json");
    const agents: Agent[] = response.data;

    const filteredAgents = agents.filter((agent) =>
      agent.collections.some(
        (collection) => collection.id === selectedCollection.id,
      ),
    );

    if (filteredAgents.length === 0) {
      notFound();
    }

    const rarityOrder = ["Master", "Superior", "Exceptional", "Distinguished"];

    const sortedAgents = filteredAgents.sort((a, b) => {
      const rarityAIndex = rarityOrder.indexOf(a.rarity.name);
      const rarityBIndex = rarityOrder.indexOf(b.rarity.name);
      return (
        (rarityAIndex >= 0 ? rarityAIndex : Infinity) -
        (rarityBIndex >= 0 ? rarityBIndex : Infinity)
      );
    });

    console.log("Sorted Agents:", sortedAgents);

    return (
      <>
        <div className="bg-zinc-900">
          <div className="crate-container">
            {sortedAgents.length > 0 && (
              <div className="crate-image-wrapper flex justify-center items-center gap-4">
                <Image
                  width={100}
                  height={100}
                  src={sortedAgents[0].collections[0]?.image}
                  alt={sortedAgents[0].collections[0]?.name}
                  className="w-auto h-auto"
                  priority
                />
                <span className="crate-info">
                  <span className="crate-name">
                    {sortedAgents[0].collections[0]?.name}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center my-4">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
              {sortedAgents.map((agent) => (
                <CardSkins
                  key={agent.id}
                  skinName={agent.name}
                  imageUrl={agent.image}
                  rarity={agent.rarity}
                  specialOption={"Default"}
                  priceWithoutStatTrak="No data"
                  priceWithStatTrak=""
                  collectionName={agent.collections[0]?.name}
                  collectionImageUrl={agent.collections[0]?.image}
                  basePath="/others/agents"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching agents:", error);
    notFound();
  }
}

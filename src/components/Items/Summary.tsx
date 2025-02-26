import Link from "next/link";
import Wears from "./Wears";
import { Skin } from "./skin";

const processDescription = (description: string) => {
  const flavorTextRegex = /<i>(.*?)<\/i>/;
  const flavorTextMatch = description.match(flavorTextRegex);
  const cleanedDescription = description
    .replace(flavorTextRegex, "")
    .replace(/\\n/g, " ")
    .trim();

  return {
    cleanedDescription,
    flavorText: flavorTextMatch ? flavorTextMatch[1] : null,
  };
};

const Summary = ({ skin }: { skin: Skin }) => {
  const { cleanedDescription, flavorText } = processDescription(
    skin.description,
  );

  return (
    <div className="w-[410px] p-5 bg-black-300 rounded-md">
      <Wears
        values={{
          min_float: skin.min_float,
          max_float: skin.max_float,
        }}
      />

      <div className="font-bold text-white">
        <div className="flex">
          <span className="font-extralight text-sm">
            <span className="font-bold pr-1 text-base">Description:</span>
            {cleanedDescription}
          </span>
        </div>
        {flavorText && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Flavor Text:</span>
              <span className="special-flavor-text">{flavorText}</span>
            </span>
          </div>
        )}
        {skin.weapon?.name && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Weapon:</span>
              {skin.weapon.name}
            </span>
          </div>
        )}
        {skin.category?.name && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Type:</span>
              {skin.category.name}
            </span>
          </div>
        )}
        {skin.pattern?.name && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Finish:</span>
              {skin.pattern.name}
            </span>
          </div>
        )}
        {skin.style?.name && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Finish Style:</span>
              <Link
                className="hover:underline"
                href={skin.style.url}
                target="_blank"
              >
                {skin.style.name}
              </Link>
            </span>
          </div>
        )}
        {!skin.phase && skin.paint_index && (
          <div className="flex">
            <span className="font-extralight text-sm">
              <span className="font-bold pr-1 text-base">Finish Catalog:</span>
              {skin.paint_index}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;

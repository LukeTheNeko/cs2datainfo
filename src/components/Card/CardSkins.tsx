import Image from "next/image";
import Link from "next/link";

interface CardProps {
    skinName: string;
    rarity?: {
        name?: string; // Tornando a propriedade name opcional
        color?: string; // Tornando a propriedade color opcional
    };
    specialOption: "StatTrak" | "Souvenir" | "Default";
    imageUrl: string;
    priceWithoutStatTrak: string;
    priceWithStatTrak?: string;
    collectionName: string;
    collectionImageUrl: string;
    basePath: string;
}

export default function CardSkins(props: CardProps) {
    const rarityClasses = {
        StatTrak: "bg-[#cf6a32]",
        Souvenir: "bg-[#b89b02]",
        Default: "bg-transparent",
    };

    const rarityType = props.specialOption;
    const slug = encodeURIComponent(
        props.skinName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-"),
    );

    const textSizeTitleClass =
        props.skinName.length > 40 ? "text-[15px]" : "text-[20px]";
    const textSizeCollectionClass =
        props.collectionName.length > 50
            ? "text-[10px]"
            : props.collectionName.length > 30
            ? "text-[12px]"
            : "text-[14px]";

    return (
        <div className="skin-card">
            <Link href={`/item/${slug}`} className="flex flex-col">
                <div className="header">
                    <div className={`skin-name h-6 ${textSizeTitleClass}`}>
                        <span>{props.skinName}</span>
                    </div>
                    <div className="rarity-info">
                        <div
                            className="rarity-badge"
                            style={{
                                backgroundColor:
                                    props.rarity?.color || "transparent",
                            }}
                        >
                            {/* Exibe o nome da raridade apenas se estiver presente */}
                            {props.rarity?.name && (
                                <span>{props.rarity.name}</span>
                            )}
                        </div>
                        <div
                            className={`special-option ${rarityClasses[rarityType]}`}
                        >
                            {props.specialOption === "StatTrak" &&
                                "StatTrak Available"}
                            {props.specialOption === "Souvenir" &&
                                "Souvenir Available"}
                        </div>
                    </div>
                </div>

                <div className="image-container">
                    <div className="image-wrapper">
                        <Image
                            width={3000}
                            height={3000}
                            src={props.imageUrl}
                            alt={props.skinName}
                            priority
                        />
                    </div>
                </div>

                <div className="price-info">
                    <span className="price-without-stattrak h-6">
                        {props.priceWithoutStatTrak}
                    </span>
                    <span className="price-with-stattrak h-6">
                        {props.priceWithStatTrak}
                    </span>
                </div>
            </Link>

            <div className="collection-info">
                <div className="collection-image">
                    {props.collectionImageUrl ? (
                        <Image
                            width={18}
                            height={18}
                            src={props.collectionImageUrl}
                            alt={props.collectionName}
                        />
                    ) : (
                        <span className="text-zinc-300"></span>
                    )}
                </div>
                <Link
                    href={`${props.basePath}/${encodeURIComponent(
                        props.collectionName
                            .replace(/\|/g, "") // Remove "|"
                            .replace(/CS:GO/g, "") // Remove "CS:GO"
                            .replace(/StatTrak™/g, "") // Remove "stattrak™"
                            .replace(/\(Holo\/Foil\)/g, "") // Remove "(Holo/Foil)
                            .replace(/\(Foil\)/g, "") // Remove "(Holo/Foil)
                            .replace(/\s* & \s*/g, "-") // Substitui "&" e espaços ao redor por "-"
                            .replace(/\s+/g, "-") // Substitui espaços por "-"
                            .replace(/-+/g, "-") // Remove hífens duplicados
                            .toLowerCase() // Converte para minúsculas
                            .replace(/^-+|-+$/g, ""), // Remove hífens no início ou no fim
                    )}`}
                    className={`collection-link ${textSizeCollectionClass}`}
                >
                    {props.collectionName}
                </Link>
            </div>
        </div>
    );
}

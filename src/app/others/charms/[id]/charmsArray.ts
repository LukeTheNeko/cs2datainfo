interface Capsula {
    id: string;
    name: string;
}

interface Collection {
    collectionName: string;
    collectionImage?: string;
    collectionId: string;
    charms: Capsula[];
}

export const charmsData: Collection[] = [
    {
        collectionName: "Small Arms Charm Collection",
        collectionId: "small-arms-charm-collection",
        collectionImage: "/img/others/small_arms_charm_collection.webp",
        charms: [
            { id: "", name: "Baby Karat T" },
            { id: "", name: "Baby Karat CT" },
            { id: "", name: "Semi-Precious" },
            { id: "", name: "Lil' Squirt" },
            { id: "", name: "Titeenium AWP" },
            { id: "", name: "Die-cast AK" },
            { id: "", name: "Glamour Shot" },
            { id: "", name: "POP Art" },
            { id: "", name: "Disco MAC" },
            { id: "", name: "Hot Hands" },
            { id: "", name: "Baby's AK" },
            { id: "", name: "Whittle Knife" },
            { id: "", name: "Pocket AWP" },
            { id: "", name: "Stitch-Loaded" },
            { id: "", name: "Lil' Cap Gun" },
            { id: "", name: "Backsplash" },
        ],
    },
    {
        collectionName: "Missing Link Charm Collection",
        collectionId: "missing-link-charm-collection",
        collectionImage: "/img/others/missing_link_charm_collection.webp",
        charms: [
            { id: "", name: "Hot Howl" },
            { id: "", name: "Hot Wurst" },
            { id: "", name: "Diamond Dog" },
            { id: "", name: "Lil' Monster" },
            { id: "", name: "Diner Dog" },
            { id: "", name: "Lil' Teacup" },
            { id: "", name: "Chicken Lil'" },
            { id: "", name: "Lil' Whiskers" },
            { id: "", name: "Lil' Sandy" },
            { id: "", name: "That's Bananas" },
            { id: "", name: "Lil' Squatch" },
            { id: "", name: "Lil' SAS" },
            { id: "", name: "Lil' Crass" },
            { id: "", name: "Hot Sauce" },
            { id: "", name: "Pinch O' Salt" },
            { id: "", name: "Big Kev" },
            { id: "", name: "Lil' Ava" },
        ],
    },
];

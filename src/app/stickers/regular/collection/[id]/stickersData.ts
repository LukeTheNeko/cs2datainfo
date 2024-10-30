interface Capsula {
    id: string;
    name: string;
}

interface Collection {
    collectionName: string;
    collectionImage?: string;
    collectionId: string;
    stickers: Capsula[];
}

export const stickersData: Collection[] = [
    {
        collectionName: "Elemental Craft Stickers",
        collectionId: "elemental-craft-stickers",
        collectionImage: "/img/collections/elemental_craft_stickers.webp",
        stickers: [
            {
                id: "ruby-stream-lenticular",
                name: "Sticker | Ruby Stream (Lenticular)",
            },
            {
                id: "ruby-wave-lenticular",
                name: "Sticker | Ruby Wave (Lenticular)",
            },
            {
                id: "bolt-charge-foil",
                name: "Sticker | Bolt Charge (Foil)",
            },
            {
                id: "winding-scorch-foil",
                name: "Sticker | Winding Scorch (Foil)",
            },
            {
                id: "bolt-strike-foil",
                name: "Sticker | Bolt Strike (Foil)",
            },
            {
                id: "bolt-energy-foil",
                name: "Sticker | Bolt Energy (Foil)",
            },
            {
                id: "rainbow-route-holo",
                name: "Sticker | Rainbow Route (Holo)",
            },
            {
                id: "boom-trail-glitter",
                name: "Sticker | Boom Trail (Glitter)",
            },
            {
                id: "boom-detonation-glitter",
                name: "Sticker | Boom Detonation (Glitter)",
            },
            {
                id: "boom-blast-glitter",
                name: "Sticker | Boom Blast (Glitter)",
            },
            {
                id: "boom-epicenter-glitter",
                name: "Sticker | Boom Epicenter (Glitter)",
            },
            {
                id: "high-heat",
                name: "Sticker | High Heat",
            },
            {
                id: "winding-scorch",
                name: "Sticker | Winding Scorch",
            },
            {
                id: "scorch-loop",
                name: "Sticker | Scorch Loop",
            },
            {
                id: "bolt-charge",
                name: "Sticker | Bolt Charge",
            },
            {
                id: "bolt-strike",
                name: "Sticker | Bolt Strike",
            },
            {
                id: "boom-trail",
                name: "Sticker | Boom Trail",
            },
            {
                id: "scorch-loop-reverse",
                name: "Sticker | Scorch Loop (Reverse)",
            },
            {
                id: "hydro-wave",
                name: "Sticker | Hydro Wave",
            },
            {
                id: "hydro-stream",
                name: "Sticker | Hydro Stream",
            },
            {
                id: "hot-rod-heat",
                name: "Sticker | Hot Rod Heat",
            },
            {
                id: "bolt-energy",
                name: "Sticker | Bolt Energy",
            },
            {
                id: "hydro-geyser",
                name: "Sticker | Hydro Geyser",
            },
            {
                id: "boom-detonation",
                name: "Sticker | Boom Detonation",
            },
            {
                id: "boom-blast",
                name: "Sticker | Boom Blast",
            },
            {
                id: "boom-epicenter",
                name: "Sticker | Boom Epicenter",
            },
        ],
    },
    {
        collectionName: "Character Craft Stickers",
        collectionId: "character-craft-stickers",
        collectionImage: "/img/collections/character_craft_stickers.webp",
        stickers: [
            {
                id: "googly-eye-lenticular",
                name: "Sticker | Googly Eye (Lenticular)",
            },
            {
                id: "side-eyes-lenticular",
                name: "Sticker | Side Eyes (Lenticular)",
            },
            {
                id: "red-shades-foil",
                name: "Sticker | Red Shades (Foil)",
            },
            {
                id: "gold-teef-foil",
                name: "Sticker | Gold Teef (Foil)",
            },
            {
                id: "mustachio-foil",
                name: "Sticker | Mustachio (Foil)",
            },
            {
                id: "taste-buddy-holo",
                name: "Sticker | Taste Buddy (Holo)",
            },
            {
                id: "kawaii-eyes-glitter",
                name: "Sticker | Kawaii Eyes (Glitter)",
            },
            {
                id: "say-cheese-holo",
                name: "Sticker | Say Cheese (Holo)",
            },
            {
                id: "hypnoteyes-holo",
                name: "Sticker | Hypnoteyes (Holo)",
            },
            {
                id: "from-the-deep-glitter",
                name: "Sticker | From The Deep (Glitter)",
            },
            {
                id: "quick-peek",
                name: "Sticker | Quick Peek",
            },
            {
                id: "clown-wig",
                name: "Sticker | Clown Wig",
            },
            {
                id: "ribbon-tie",
                name: "Sticker | Ribbon Tie",
            },
            {
                id: "blinky",
                name: "Sticker | Blinky",
            },
            {
                id: "flex",
                name: "Sticker | Flex",
            },
            {
                id: "chompers",
                name: "Sticker | Chompers",
            },
            {
                id: "clown-nose",
                name: "Sticker | Clown Nose",
            },
            {
                id: "xd",
                name: "Sticker | XD",
            },
            {
                id: "fly-high",
                name: "Sticker | Fly High",
            },
            {
                id: "taste-bud",
                name: "Sticker | Taste Bud",
            },
            {
                id: "strike-a-pose",
                name: "Sticker | Strike A Pose",
            },
            {
                id: "glare",
                name: "Sticker | Glare",
            },
            {
                id: "lefty-t",
                name: "Sticker | Lefty (T)",
            },
            {
                id: "from-the-deep",
                name: "Sticker | From The Deep",
            },
            {
                id: "lefty-ct",
                name: "Sticker | Lefty (CT)",
            },
        ],
    },
    {
        collectionName: "Operation Riptide Sticker Collection",
        collectionId: "operation-riptide-sticker-collection",
        stickers: [
            {
                id: "great-wave-foil",
                name: "Sticker | Great Wave (Foil)",
            },
            {
                id: "seeing-red-foil",
                name: "Sticker | Seeing Red (Foil)",
            },
            {
                id: "liquid-fire-holo",
                name: "Sticker | Liquid Fire (Holo)",
            },
            {
                id: "dead-eye-holo",
                name: "Sticker | Dead Eye (Holo)",
            },
            {
                id: "great-wave-holo",
                name: "Sticker | Great Wave (Holo)",
            },
            {
                id: "kill-count-holo",
                name: "Sticker | Kill Count (Holo)",
            },
            {
                id: "liquid-fire",
                name: "Sticker | Liquid Fire",
            },
            {
                id: "great-wave",
                name: "Sticker | Great Wave",
            },
            {
                id: "kill-count",
                name: "Sticker | Kill Count",
            },
            {
                id: "chicken-of-the-sky",
                name: "Sticker | Chicken of the Sky",
            },
            {
                id: "dead-eye",
                name: "Sticker | Dead Eye",
            },
            {
                id: "seeing-red",
                name: "Sticker | Seeing Red",
            },
            {
                id: "gutted",
                name: "Sticker | Gutted",
            },
            {
                id: "operation-riptide",
                name: "Sticker | Operation Riptide",
            },
        ],
    },
    {
        collectionName: "Riptide Surf Shop Sticker Collection",
        collectionId: "riptide-surf-shop-sticker-collection",
        stickers: [
            {
                id: "doppler-poison-frog-foil",
                name: "Sticker | Doppler Poison Frog (Foil)",
            },
            {
                id: "ultraviolet-poison-frog-foil",
                name: "Sticker | Ultraviolet Poison Frog (Foil)",
            },
            {
                id: "crimson-web-poison-frog-foil",
                name: "Sticker | Crimson Web Poison Frog (Foil)",
            },
            {
                id: "lore-poison-frog-foil",
                name: "Sticker | Lore Poison Frog (Foil)",
            },
            {
                id: "blaze-surf-k-foil",
                name: "Sticker | Blaze Surf K (Foil)",
            },
            {
                id: "dragon-lore-surf-ava-foil",
                name: "Sticker | Dragon Lore Surf Ava (Foil)",
            },
            {
                id: "sticker-bomb-surf-k-foil",
                name: "Sticker | Sticker Bomb Surf K (Foil)",
            },
            {
                id: "hypnotic-surf-k-foil",
                name: "Sticker | Hypnotic Surf K (Foil)",
            },
            {
                id: "fire-serpent-surf-k-foil",
                name: "Sticker | Fire Serpent Surf K (Foil)",
            },
            {
                id: "akihabara-accept-surf-ava-foil",
                name: "Sticker | Akihabara Accept Surf Ava (Foil)",
            },
            {
                id: "sticker-bomb-surf-ava-foil",
                name: "Sticker | Sticker Bomb Surf Ava (Foil)",
            },
            {
                id: "dark-water-surf-ava-foil",
                name: "Sticker | Dark Water Surf Ava (Foil)",
            },
            {
                id: "cotton-candy-flow-holo",
                name: "Sticker | Cotton Candy Flow (Holo)",
            },
            {
                id: "miami-tier6-holo",
                name: "Sticker | Miami Tier6 (Holo)",
            },
            {
                id: "opal-flick-holo",
                name: "Sticker | Opal Flick (Holo)",
            },
            {
                id: "miami-flow-holo",
                name: "Sticker | Miami Flow (Holo)",
            },
            {
                id: "flame-tier6-holo",
                name: "Sticker | Flame Tier6 (Holo)",
            },
            {
                id: "toxic-flow-holo",
                name: "Sticker | Toxic Flow (Holo)",
            },
            {
                id: "neon-opal-strafe-holo",
                name: "Sticker | Neon Opal Strafe (Holo)",
            },
            {
                id: "miami-buttery-holo",
                name: "Sticker | Miami Buttery (Holo)",
            },
            {
                id: "forge-tier6-holo",
                name: "Sticker | Forge Tier6 (Holo)",
            },
            {
                id: "abalone-strafe-holo",
                name: "Sticker | Abalone Strafe (Holo)",
            },
            {
                id: "watermelon-strafe-holo",
                name: "Sticker | Watermelon Strafe (Holo)",
            },
            {
                id: "watermelon-tier6-holo",
                name: "Sticker | Watermelon Tier6 (Holo)",
            },
            {
                id: "miami-flick-holo",
                name: "Sticker | Miami Flick (Holo)",
            },
            {
                id: "miami-skill-surf-holo",
                name: "Sticker | Miami Skill Surf (Holo)",
            },
            {
                id: "mood-ring-strafe-holo",
                name: "Sticker | Mood Ring Strafe (Holo)",
            },
            {
                id: "ocean-sunset-flick-holo",
                name: "Sticker | Ocean Sunset Flick (Holo)",
            },
            {
                id: "bubble-gum-skill-surf-holo",
                name: "Sticker | Bubble Gum Skill Surf (Holo)",
            },
            {
                id: "watermelon-flow-holo",
                name: "Sticker | Watermelon Flow (Holo)",
            },
            {
                id: "mercury-flick-holo",
                name: "Sticker | Mercury Flick (Holo)",
            },
            {
                id: "candy-buttery-holo",
                name: "Sticker | Candy Buttery (Holo)",
            },
            {
                id: "flame-buttery-holo",
                name: "Sticker | Flame Buttery (Holo)",
            },
            {
                id: "watermelon-buttery-holo",
                name: "Sticker | Watermelon Buttery (Holo)",
            },
            {
                id: "ocean-sunset-skill-surf-holo",
                name: "Sticker | Ocean Sunset Skill Surf (Holo)",
            },
            {
                id: "coral-skill-surf-holo",
                name: "Sticker | Coral Skill Surf (Holo)",
            },
            {
                id: "black-jaggyfish",
                name: "Sticker | Black Jaggyfish",
            },
            {
                id: "watermelon-tentaskull",
                name: "Sticker | Watermelon Tentaskull",
            },
            {
                id: "purple-jaggyfish",
                name: "Sticker | Purple Jaggyfish",
            },
            {
                id: "pink-jaggyfish",
                name: "Sticker | Pink Jaggyfish",
            },
            {
                id: "blood-moon-tentaskull",
                name: "Sticker | Blood Moon Tentaskull",
            },
            {
                id: "fade-lethal",
                name: "Sticker | Fade Lethal",
            },
            {
                id: "miami-stabbyfish",
                name: "Sticker | Miami Stabbyfish",
            },
            {
                id: "blue-gnar",
                name: "Sticker | Blue Gnar",
            },
            {
                id: "yellow-jaggyfish",
                name: "Sticker | Yellow Jaggyfish",
            },
            {
                id: "toxic-tentaskull",
                name: "Sticker | Toxic Tentaskull",
            },
            {
                id: "purple-gnar",
                name: "Sticker | Purple Gnar",
            },
            {
                id: "miami-wave-rider",
                name: "Sticker | Miami Wave Rider",
            },
            {
                id: "blood-moon-wave-rider",
                name: "Sticker | Blood Moon Wave Rider",
            },
            {
                id: "fools-gold-wave-rider",
                name: "Sticker | Fools Gold Wave Rider",
            },
            {
                id: "green-lethal",
                name: "Sticker | Green Lethal",
            },
            {
                id: "sunset-ocean-tentaskull",
                name: "Sticker | Sunset Ocean Tentaskull",
            },
            {
                id: "green-gnar",
                name: "Sticker | Green Gnar",
            },
            {
                id: "blue-lethal",
                name: "Sticker | Blue Lethal",
            },
            {
                id: "yellow-lethal",
                name: "Sticker | Yellow Lethal",
            },
            {
                id: "after-hours-stabbyfish",
                name: "Sticker | After Hours Stabbyfish",
            },
            {
                id: "ocean-sunset-stabbyfish",
                name: "Sticker | Ocean Sunset Stabbyfish",
            },
            {
                id: "orange-gnar",
                name: "Sticker | Orange Gnar",
            },
            {
                id: "watermelon-stabbyfish",
                name: "Sticker | Watermelon Stabbyfish",
            },
            {
                id: "blue-shark-shooter",
                name: "Sticker | Blue Shark Shooter",
            },
            {
                id: "green-shark-shooter",
                name: "Sticker | Green Shark Shooter",
            },
            {
                id: "red-shark-shooter",
                name: "Sticker | Red Shark Shooter",
            },
            {
                id: "red-cyclawps",
                name: "Sticker | Red Cyclawps",
            },
            {
                id: "toxic-wave-rider",
                name: "Sticker | Toxic Wave Rider",
            },
            {
                id: "green-bombster",
                name: "Sticker | Green Bombster",
            },
            {
                id: "yellow-cyclawps",
                name: "Sticker | Yellow Cyclawps",
            },
            {
                id: "black-shark-shooter",
                name: "Sticker | Black Shark Shooter",
            },
            {
                id: "green-cyclawps",
                name: "Sticker | Green Cyclawps",
            },
            {
                id: "yellow-bombster",
                name: "Sticker | Yellow Bombster",
            },
            {
                id: "purple-bombster",
                name: "Sticker | Purple Bombster",
            },
            {
                id: "white-bombster",
                name: "Sticker | White Bombster",
            },
            {
                id: "purple-cyclawps",
                name: "Sticker | Purple Cyclawps",
            },
        ],
    },
    {
        collectionName: "Broken Fang Sticker Collection",
        collectionId: "broken-fang-sticker-collection",
        stickers: [
            {
                id: "stone-scales-foil",
                name: "Sticker | Stone Scales (Foil)",
            },
            {
                id: "ancient-beast-foil",
                name: "Sticker | Ancient Beast (Foil)",
            },
            {
                id: "battle-scarred-holo",
                name: "Sticker | Battle Scarred (Holo)",
            },
            {
                id: "broken-fang-holo",
                name: "Sticker | Broken Fang (Holo)",
            },
            {
                id: "coiled-strike-holo",
                name: "Sticker | Coiled Strike (Holo)",
            },
            {
                id: "enemy-spotted-holo",
                name: "Sticker | Enemy Spotted (Holo)",
            },
            {
                id: "battle-scarred",
                name: "Sticker | Battle Scarred",
            },
            {
                id: "broken-fang",
                name: "Sticker | Broken Fang",
            },
            {
                id: "coiled-strike",
                name: "Sticker | Coiled Strike",
            },
            {
                id: "ancient-marauder",
                name: "Sticker | Ancient Marauder",
            },
            {
                id: "stalking-prey",
                name: "Sticker | Stalking Prey",
            },
            {
                id: "stone-scales",
                name: "Sticker | Stone Scales",
            },
            {
                id: "enemy-spotted",
                name: "Sticker | Enemy Spotted",
            },
            {
                id: "ancient-protector",
                name: "Sticker | Ancient Protector",
            },
            {
                id: "badge-of-service",
                name: "Sticker | Badge of Service",
            },
            {
                id: "ancient-beast",
                name: "Sticker | Ancient Beast",
            },
        ],
    },
    {
        collectionName: "Recoil Sticker Collection",
        collectionId: "recoil-stickers-collection",
        stickers: [
            {
                id: "",
                name: "Sticker | Hello AK-47 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello XM1014 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello AWP (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello UMP-45 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello M4A1-S (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello PP-Bizon (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello M4A4 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello Galil AR (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello FAMAS (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello P90 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello SG 553 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello AUG (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello CZ75-Auto (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello MP7 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello MP9 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello MAC-10 (Gold)",
            },
            {
                id: "",
                name: "Sticker | Hello Galil AR",
            },
            {
                id: "",
                name: "Sticker | Hello P90",
            },
            {
                id: "",
                name: "Sticker | Hello M4A4",
            },
            {
                id: "",
                name: "Sticker | Hello AK-47",
            },
            {
                id: "",
                name: "Sticker | Hello AUG",
            },
            {
                id: "",
                name: "Sticker | Hello XM1014",
            },
            {
                id: "",
                name: "Sticker | Hello AWP",
            },
            {
                id: "",
                name: "Sticker | Hello MP7",
            },
            {
                id: "",
                name: "Sticker | Hello SG 553",
            },
            {
                id: "",
                name: "Sticker | Hello FAMAS",
            },
            {
                id: "",
                name: "Sticker | Hello M4A1-S",
            },
            {
                id: "",
                name: "Sticker | Hello CZ75-Auto",
            },
            {
                id: "",
                name: "Sticker | Hello MP9",
            },
            {
                id: "",
                name: "Sticker | Hello MAC-10",
            },
            {
                id: "",
                name: "Sticker | Hello UMP-45",
            },
            {
                id: "",
                name: "Sticker | Hello PP-Bizon",
            },
        ],
    },
    {
        collectionName: "Shattered Web Sticker Collection",
        collectionId: "shattered-web-sticker-collection",
        stickers: [
            {
                id: "",
                name: "Sticker | Gold Web (Foil)",
            },
            {
                id: "",
                name: "Sticker | Web Stuck (Holo)",
            },
            {
                id: "",
                name: "Sticker | Mastermind (Holo)",
            },
            {
                id: "",
                name: "Sticker | Gold Web",
            },
            {
                id: "",
                name: "Sticker | Web Stuck",
            },
            {
                id: "",
                name: "Sticker | Shattered Web",
            },
            {
                id: "",
                name: "Sticker | Counter-Tech",
            },
            {
                id: "",
                name: "Sticker | Mastermind",
            },
            {
                id: "",
                name: "Sticker | Terrorist-Tech",
            },
        ],
    },
    {
        collectionName: "Community Stickers Series 5",
        collectionId: "community-stickers-series-5",
        stickers: [
            {
                id: "",
                name: "Sticker | Baaa-ckstabber!",
            },
            {
                id: "",
                name: "Sticker | Kawaii Killer Terrorist",
            },
            {
                id: "",
                name: "Sticker | CS On The Mind",
            },
            {
                id: "",
                name: "Sticker | Ninja Defuse",
            },
            {
                id: "",
                name: "Sticker | Pros Don't Fake",
            },
            {
                id: "",
                name: "Sticker | Chi Bomb",
            },
            {
                id: "",
                name: "Sticker | Knife Club",
            },
            {
                id: "",
                name: "Sticker | Awp Country",
            },
            {
                id: "",
                name: "Sticker | Doru The Fox",
            },
            {
                id: "",
                name: "Sticker | Delicious Tears",
            },
        ],
    },
    {
        collectionName: "Community Stickers Series 4",
        collectionId: "community-stickers-series-4",
        stickers: [
            {
                id: "",
                name: "Sticker | Lucky Cat (Foil)",
            },
            {
                id: "",
                name: "Sticker | Firestarter (Holo)",
            },
            {
                id: "",
                name: "Sticker | Headless Chicken",
            },
            {
                id: "",
                name: "Sticker | Witchcraft",
            },
            {
                id: "",
                name: "Sticker | Headshot Guarantee",
            },
            {
                id: "",
                name: "Sticker | Flickshot",
            },
            {
                id: "",
                name: "Sticker | Just Trolling",
            },
            {
                id: "",
                name: "Sticker | Hamster Hawk",
            },
            {
                id: "",
                name: "Sticker | Robo",
            },
            {
                id: "",
                name: "Sticker | Wanna Fight",
            },
            {
                id: "",
                name: "Sticker | Hostage Rescue",
            },
            {
                id: "",
                name: "Sticker | Eco Rush",
            },
        ],
    },
    {
        collectionName: "Community Stickers Series 3",
        collectionId: "community-stickers-series-3",
        stickers: [
            {
                id: "",
                name: "Sticker | Bomb Squad (Foil)",
            },
            {
                id: "",
                name: "Sticker | Phoenix (Foil)",
            },
            {
                id: "",
                name: "Sticker | Warowl",
            },
            {
                id: "",
                name: "Sticker | Drug War Veteran",
            },
            {
                id: "",
                name: "Sticker | Work For Ammo",
            },
            {
                id: "",
                name: "Sticker | Dinked",
            },
            {
                id: "",
                name: "Sticker | Massive Pear",
            },
            {
                id: "",
                name: "Sticker | SAS Chicken",
            },
            {
                id: "",
                name: "Sticker | My Little Friend",
            },
            {
                id: "",
                name: "Sticker | Pandamonium",
            },
            {
                id: "",
                name: "Sticker | Blood Boiler",
            },
            {
                id: "",
                name: "Sticker | Thug Life",
            },
            {
                id: "",
                name: "Sticker | T-Rekt",
            },
            {
                id: "",
                name: "Sticker | Piece Of Cake",
            },
            {
                id: "",
                name: "Sticker | Ho Ho Ho",
            },
        ],
    },
    {
        collectionName: "Community Stickers Series 2",
        collectionId: "community-stickers-series-2",
        stickers: [
            {
                id: "",
                name: "Sticker | Don't Worry, I'm Pro",
            },
            {
                id: "",
                name: "Sticker | One Shot One Kill",
            },
            {
                id: "",
                name: "Sticker | Stay Frosty",
            },
            {
                id: "",
                name: "Sticker | Terrorized",
            },
            {
                id: "",
                name: "Sticker | Blitzkrieg",
            },
            {
                id: "",
                name: "Sticker | Fight like a Girl",
            },
            {
                id: "",
                name: "Sticker | Cat Call",
            },
            {
                id: "",
                name: "Sticker | Windy Walking Club",
            },
            {
                id: "",
                name: "Sticker | Kawaii Killer CT",
            },
            {
                id: "",
                name: "Sticker | Chicken Strike",
            },
            {
                id: "",
                name: "Sticker | CT in Banana",
            },
            {
                id: "",
                name: "Sticker | War Penguin",
            },
            {
                id: "",
                name: "Sticker | Nelu the Bear",
            },
            {
                id: "",
                name: "Sticker | T On Cat",
            },
            {
                id: "",
                name: "Sticker | Bossy Burger",
            },
            {
                id: "",
                name: "Sticker | Till Death Do Us Part",
            },
            {
                id: "",
                name: "Sticker | Pigeon Master",
            },
            {
                id: "",
                name: "Sticker | Shooting Star Return",
            },
            {
                id: "",
                name: "Sticker | Flashbang",
            },
        ],
    },
    {
        collectionName: "Community Stickers Halloween 2014",
        collectionId: "community-stickers-halloween-2014",
        stickers: [
            {
                id: "",
                name: "Sticker | Trick Or Treat",
            },
            {
                id: "",
                name: "Sticker | Queen Of Pain",
            },
            {
                id: "",
                name: "Sticker | Witch",
            },
            {
                id: "",
                name: "Sticker | Doomed",
            },
            {
                id: "",
                name: "Sticker | Zombie Lover",
            },
            {
                id: "",
                name: "Sticker | Trick Or Threat",
            },
        ],
    },
];

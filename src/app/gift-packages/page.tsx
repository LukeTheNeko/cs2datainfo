import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";

interface Crate {
    id: string;
    name: string;
    description: string | null;
    image: string;
}

const targetNames = [
    "Audience Participation Parcel",
    "Pallet of Presents",
    "Gift Package",
];

async function fetchCrates() {
    const res = await fetch("https://api.cs2data.info/en/crates.json");
    const data = await res.json();

    return data.filter((crate: Crate) => targetNames.includes(crate.name));
}

export default async function GiftPackages() {
    const crates = await fetchCrates();

    return (
        <div className="bg-zinc-900">
            <Header />
            <div className="flex justify-center my-10 gap-10 items-center">
                <div className="flex flex-col text-white font-medium px-6 gap-1">
                    <span className="text-4xl">Gift Packages</span>
                </div>
            </div>

            <div className="flex justify-center items-center my-4">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                    {crates.map((crate: Crate) => (
                        <Link href={`/item/${crate.name}`} key={crate.id}>
                            <div className="bg-black-300 w-[370px] text-center rounded-lg h-[475px] items-center flex flex-col text-white border-transparent hover:outline hover:outline-1 hover:outline-indigo-600">
                                <div className="px-4 my-2 font-medium">
                                    <span>{crate.name}</span>
                                </div>
                                <div className="h-80 w-80 flex justify-center items-center">
                                    <div className="flex justify-center items-center">
                                        <div className="image-wrapper">
                                            <Image
                                                width={250}
                                                height={250}
                                                src={crate.image}
                                                alt={crate.name}
                                                className="h-full w-full"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="font-light my-4">
                                    <span>no price</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

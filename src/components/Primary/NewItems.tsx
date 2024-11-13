import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";

type Item = {
    src: string;
    name: string;
    href: string;
    amount: string;
    amountname: string;
};

interface NewItemsProps {
    items: Item[];
}

export default function NewItems({ items }: NewItemsProps) {
    return (
        <div className="flex flex-wrap items-center justify-center bg-black-300 rounded-xl shadow-lg mx-20 p-4">
            <div className="w-full px-4 text-center mb-6">
                <h2 className="flex items-center justify-center text-white text-base sm:text-xl font-semibold">
                    <FaInfoCircle className="mr-2" />
                    Check out all the new
                    <a
                        target="_blank"
                        href="https://store.steampowered.com/sale/armory"
                        className="font-semibold text-indigo-500 mx-1"
                    >
                        Armory
                    </a>
                    items!
                </h2>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative p-4 flex flex-col items-center justify-center"
                >
                    <a className="group block" href={item.href}>
                        <div className="flex flex-col items-center justify-center">
                            <Image
                                width={100}
                                height={100}
                                src={item.src}
                                alt={item.name}
                                className="crate-image"
                                priority
                            />
                            <div className="text-center text-sm text-white opacity-55 group-hover:opacity-100 mt-2 max-w-full">
                                {item.name}
                            </div>
                        </div>

                        <div className="absolute opacity-0 group-hover:opacity-100 z-10 text-sm font-medium text-white rounded-md shadow-sm px-3 py-1.5 top-0 left-1/2 transform -translate-x-1/2 mt-[-35px] w-auto transition-opacity duration-300 tooltip bg-black-400 whitespace-nowrap">
                            {item.amount} new {item.amountname}
                            <div className="tooltip-arrow absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black-400"></div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}

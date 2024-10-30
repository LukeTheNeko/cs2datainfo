"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface Collection {
    id: string;
    name: string;
    crates: Crate[];
    contains: Skin[];
    image: string;
}

export default function Cases() {
    const [crates, setCrates] = useState<Crate[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cratesPerPage = 15;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cratesResponse = await axios.get(
                    "https://api.cs2data.info/en/crates.json",
                );
                const collectionsResponse = await axios.get(
                    "https://api.cs2data.info/en/collections.json",
                );

                setCrates(cratesResponse.data);
                setCollections(collectionsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredCrates = crates.filter((crate) => crate.type === "Case");
    const sortedCrates = filteredCrates.sort((a, b) => {
        return (
            new Date(b.first_sale_date).getTime() -
            new Date(a.first_sale_date).getTime()
        );
    });

    const indexOfLastCrate = currentPage * cratesPerPage;
    const indexOfFirstCrate = indexOfLastCrate - cratesPerPage;
    const currentCrates = sortedCrates.slice(
        indexOfFirstCrate,
        indexOfLastCrate,
    );
    const totalPages = Math.ceil(sortedCrates.length / cratesPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(startPage + 2, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <>
            <div className="bg-zinc-900">
                <Header />
                <div className="flex justify-center my-10 gap-10 items-center">
                    <div className="flex flex-col text-white font-medium px-6 gap-1">
                        <span className="text-4xl">All Cases</span>
                    </div>
                </div>

                <div className="flex justify-center my-14 text-white">
                    {currentPage > 1 && (
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className="mx-2 px-4 py-2 rounded bg-black-300 text-white"
                        >
                            {"<"}
                        </button>
                    )}

                    {getPageNumbers().map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`mx-2 px-4 py-2 rounded ${
                                currentPage === pageNumber
                                    ? "bg-indigo-600"
                                    : "bg-black-300"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages),
                                )
                            }
                            className="mx-2 px-4 py-2 rounded bg-black-300 text-white"
                        >
                            {">"}
                        </button>
                    )}
                </div>

                <div className="flex justify-center items-center my-4">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mx-3 md:grid-cols-3 justify-center items-center">
                        {currentCrates.map((crate: Crate) => {
                            const collection = collections.find((col) =>
                                col.crates.some((c) => c.id === crate.id),
                            );

                            return (
                                <div
                                    key={crate.id}
                                    className="bg-black-300 w-[370px] hover:outline hover:outline-1 hover:outline-indigo-600 text-center rounded-lg h-[475px] items-center flex flex-col text-white"
                                >
                                    <Link
                                        href={`/item/${encodeURIComponent(
                                            crate.name
                                                .replace(
                                                    /^(cs:go|csgo)\s+/i,
                                                    "",
                                                )
                                                .replace(/cs:go|csgo/gi, "")
                                                .replace(/&/g, "")
                                                .replace(/\s+/g, "-")
                                                .toLowerCase()
                                                .trim()
                                                .replace(/^-+|-+$/g, ""),
                                        )}`}
                                        className="flex flex-col h-full"
                                    >
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
                                            <span>preço</span>
                                        </div>
                                    </Link>

                                    <div className="font-light my-4 flex text-sm text-zinc-300 justify-center items-center gap-2">
                                        <div className="collection-image">
                                            {collection?.image ? (
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    src={collection.image}
                                                    alt={collection.name}
                                                    className="h-full w-full"
                                                    priority
                                                />
                                            ) : (
                                                <span className="text-zinc-300"></span>
                                            )}
                                        </div>

                                        <Link
                                            className="hover:underline"
                                            href={`/collection/${
                                                collection?.name
                                                    ? encodeURIComponent(
                                                          collection.name
                                                              .replace(/&/g, "")
                                                              .replace(
                                                                  /\s+/g,
                                                                  "-",
                                                              )
                                                              .toLowerCase()
                                                              .trim()
                                                              .replace(
                                                                  /^-+|-+$/g,
                                                                  "",
                                                              ),
                                                      )
                                                    : "unknown-collection"
                                            }`}
                                            onClick={(e) => {
                                                if (!collection?.name) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <span>
                                                {collection?.name ||
                                                    "Unknown Collection"}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

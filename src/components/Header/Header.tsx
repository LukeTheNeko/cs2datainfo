"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import CountryDropdown from "./CountryDropdown";
import Dropdown from "./Dropdown";
import {
    pistols,
    midTier,
    rifles,
    knives,
    gloves,
    cases,
    collections,
    stickers,
    other,
    countries,
} from "./data";

export default function Header() {
    const [selectedFlag, setSelectedFlag] = useState("/img/flags/USD.png");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const updateFlag = (flag: string) => {
        setSelectedFlag(flag);
        Cookies.set("selectedFlag", flag, { expires: 7 });
    };

    useEffect(() => {
        const cookieFlag = Cookies.get("selectedFlag");
        if (cookieFlag) {
            setSelectedFlag(cookieFlag);
        }
    }, []);

    return (
        <>
            <div className="flex flex-col items-start">
                {/* MOBILE */}
                <div className="flex flex-col lg:hidden w-full my-2 px-1">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center">
                            <span className="font-medium text-2xl text-white">
                                CS2DATA
                            </span>
                            <span className="text-indigo-600">.info</span>
                        </div>

                        <div className="flex items-center space-x-4 text-indigo-600">
                            <FaSearch
                                className="cursor-pointer"
                                onClick={() => {
                                    setIsSearchBarVisible(!isSearchBarVisible);
                                }}
                            />
                            <button
                                className="focus:outline-none"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {isSearchBarVisible && (
                        <div className="flex justify-center">
                            <div className="flex justify-center items-center gap-2 px-2 border border-zinc-300 rounded-lg">
                                <FaSearch className="text-zinc-300" />
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="bg-transparent text-white p-[5px] border-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* MOBILE */}
            </div>

            <div className="bg-black-500 hidden lg:block">
                {/* DESKTOP */}
                <div className="hidden lg:flex justify-center items-center gap-36 py-4">
                    <div className="px-8">
                        <span className="text-white font-bold text-4xl">
                            CS2DATA
                        </span>
                        <span className="text-indigo-600">.info</span>
                    </div>
                    <div className="px-6">
                        <div className="hidden lg:flex bg-red-400 min-h-[90px] min-w-[728px] justify-center items-center">
                            <div className="font-black">Google ADS Here</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black-400 hidden lg:block px-32 py-4 w-full">
                <div className="flex justify-between items-center">
                    <div className="hidden lg:flex items-center">
                        <nav className="flex items-center">
                            <ul className="flex gap-[10px] m-0 p-0">
                                <li className="list-none m-0 p-0 flex">
                                    <a
                                        href="/"
                                        className="text-white no-underline flex"
                                    >
                                        <FaHome size={20} />
                                    </a>
                                </li>
                                {/* Dropdowns */}
                                <Dropdown
                                    title="Pistols"
                                    items={pistols}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Mid-Tier"
                                    items={midTier}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Rifles"
                                    items={rifles}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Knives"
                                    items={knives}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Gloves"
                                    items={gloves}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Cases"
                                    items={cases}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Collections"
                                    items={collections}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Stickers"
                                    items={stickers}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <Dropdown
                                    title="Others"
                                    items={other}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                                <CountryDropdown
                                    title={selectedFlag}
                                    items={countries}
                                    onSelect={updateFlag}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                            </ul>
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center justify-end px-2 border border-zinc-300 rounded-lg">
                        <div className="flex justify-center items-center gap-2">
                            <FaSearch className="text-zinc-300" />
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-transparent text-white p-[5px] border-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESKTOP */}
            </div>

            {isMenuOpen && (
                <div className="lg:hidden flex flex-col p-2 m-0 bg-black-400 rounded-md">
                    <ul className="flex flex-col gap-4">
                        <CountryDropdown
                            title={selectedFlag}
                            items={countries}
                            onSelect={updateFlag}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <li className="list-none">
                            <a
                                href="/"
                                className="text-white no-underline flex"
                            >
                                <FaHome size={20} /> <span>Home</span>
                            </a>
                        </li>
                        <Dropdown
                            title="Pistols"
                            items={pistols}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Mid-Tier"
                            items={midTier}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Rifles"
                            items={rifles}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Knives"
                            items={knives}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Gloves"
                            items={gloves}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Cases"
                            items={cases}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Collections"
                            items={collections}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Stickers"
                            items={stickers}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <Dropdown
                            title="Others"
                            items={other}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                    </ul>
                </div>
            )}
        </>
    );
}

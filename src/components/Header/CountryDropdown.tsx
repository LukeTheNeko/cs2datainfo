"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface Item {
    name: string;
    image: string;
    link: string;
}

interface CountryDropdownProps {
    title: string;
    items: Item[];
    activeDropdown: string | null;
    setActiveDropdown: (title: string | null) => void;
    onSelect: (image: string) => void;
}

export default function CountryDropdown({
    title,
    items,
    activeDropdown,
    setActiveDropdown,
    onSelect,
}: CountryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const checkIfMobile = useCallback(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
            setIsOpen(false);
            setActiveDropdown(null);
        }
    }, [setActiveDropdown]);

    useEffect(() => {
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, [checkIfMobile]);

    const toggleDropdown = () => {
        if (isMobile) {
            if (activeDropdown === title) {
                setIsOpen(false);
                setActiveDropdown(null);
                return;
            }

            setIsOpen(true);
            setActiveDropdown(title);
            return;
        }

        setIsOpen(!isOpen);
        setActiveDropdown(isOpen ? null : title);
    };

    useEffect(() => {
        setIsOpen(activeDropdown === title);
    }, [activeDropdown, title]);

    const handleSelect = (item: Item) => {
        onSelect(item.image);
        setIsOpen(false);
        setActiveDropdown(null);
    };

    return (
        <>
            <li
                className="group"
                onMouseEnter={() => !isMobile && setIsOpen(true)}
                onMouseLeave={() => !isMobile && setIsOpen(false)}
            >
                <span
                    className="text-white no-underline flex m-1 p-0 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <Image
                        src={title}
                        width={20}
                        height={20}
                        alt="Country Icon"
                        className="rounded-md"
                    />
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 text-indigo-600 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06-.02L10 10.44l3.71-3.25a.75.75 0 111.04 1.08l-4.25 3.75a.75.75 0 01-1.02 0l-4.25-3.75a.75.75 0 01-.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                {isOpen && (
                    <ul className="sm:absolute max-h-[450px] overflow-y-auto min-w-[110px] z-50 bg-black-300 text-white rounded shadow-lg">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center hover:bg-black-400 cursor-pointer"
                                onClick={() => handleSelect(item)}
                            >
                                <Image
                                    src={item.image}
                                    width={20}
                                    height={20}
                                    alt={item.name}
                                    className="m-2"
                                />
                                <span className="block pr-4 no-underline text-white font-medium text-xs">
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    );
}

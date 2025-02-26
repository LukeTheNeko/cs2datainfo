import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface Item {
  name: string;
  image: string;
  link: string;
  separator?: boolean;
  miniTitle?: string;
}

interface DropdownProps {
  title: string;
  items: Item[];
  activeDropdown: string | null;
  setActiveDropdown: (title: string | null) => void;
}

export default function Dropdown({
  title,
  items,
  activeDropdown,
  setActiveDropdown,
}: DropdownProps) {
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

  return (
    <>
      <li
        className="group"
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <div className="my-2">
          <span
            className="cursor-pointer flex items-center"
            onClick={toggleDropdown}
          >
            <div className="text-zinc-300 hover:text-white no-underline">
              {title}
            </div>
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
        </div>
        {isOpen && (
          <ul className="lg:absolute -mt-1 max-h-[450px] overflow-y-auto bg-black-300 z-50 text-white rounded shadow-xl w-full lg:w-auto">
            {items.map((item, index) => (
              <div key={index}>
                {item.miniTitle && (
                  <div className="text-[10px] text-zinc-400 pl-2 font-semibold my-0.5">
                    {item.miniTitle}
                  </div>
                )}
                <a
                  className="flex items-center hover:bg-black-400 cursor-pointer no-underline pr-4 text-white font-medium text-[12px]"
                  href={item.link}
                >
                  <li className="flex max-h-10 items-center p-1">
                    <Image
                      src={item.image}
                      width={55}
                      height={55}
                      alt={item.name}
                      className="pr-2 pl-2"
                      priority
                    />
                    {item.name}
                  </li>
                </a>
                {item.separator && (
                  <hr className="border-t text-black-300 my-1 opacity-80" />
                )}
              </div>
            ))}
          </ul>
        )}
      </li>
    </>
  );
}

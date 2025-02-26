"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import CurrencyMenu from "./CurrencyMenu";
import {
  cases,
  collections,
  gloves,
  knives,
  midTier,
  other,
  pistols,
  rifles,
  stickers,
} from "./data";
import Dropdown from "./Dropdown";
/* import LanguageMenu from "./LanguageMenu"; */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    const savedCurrency = Cookies.get("currency");

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleSave = () => {
    Cookies.set("language", selectedLanguage, { expires: 365 });
    Cookies.set("currency", selectedCurrency, { expires: 365 });
    setIsModalOpen(false);
  };

  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col items-start">
        <div className="flex flex-col lg:hidden w-full my-2 px-1">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <span className="font-medium text-2xl text-white">CS2DATA</span>
              <span className="text-indigo-600">.info</span>
            </div>

            <div className="flex items-center space-x-4 text-indigo-600">
              <div className="flex justify-center items-center px-2 gap-4">
                <li className="list-none m-0 p-0 flex">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-white no-underline flex"
                  >
                    <FaGear
                      className="text-indigo-600 hover:text-indigo-700"
                      size={20}
                    />
                  </button>
                </li>

                <div className="hidden lg:flex items-center justify-end px-4 border border-black-500 bg-black-300 rounded-md">
                  <div className="flex justify-center items-center gap-2">
                    <FaSearch className="text-zinc-300" />
                    <div>
                      <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-white text-opacity-75 p-[6px] border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

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
            <div className="flex justify-center mt-2">
              <div className="flex justify-start items-center gap-2 px-2 border border-black-500 bg-black-300 rounded-md w-[300px]">
                <FaSearch className="text-zinc-300" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-white text-opacity-75 p-[6px] border-transparent outline-none w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MOBILE */}

      {/* DESKTOP */}
      <div className="bg-black-400 mx-20 hidden lg:block">
        <div className="hidden lg:flex justify-center items-center gap-36 py-4">
          <div className="px-8">
            <span className="text-white font-bold text-4xl">CS2DATA</span>
            <span className="text-indigo-600">.info</span>
          </div>
          <div className="px-6">
            <div className="hidden lg:flex bg-red-400 min-h-[90px] min-w-[728px] justify-center items-center">
              <div className="font-black">Google ADS Here</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black-400 hidden lg:block mx-20 py-2 px-3 text-sm rounded-b-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center">
              <ul className="flex gap-[10px] m-0 p-0">
                <li className="list-none m-0 p-0 flex">
                  <a href="/" className="text-white no-underline flex my-2">
                    <FaHome
                      className="text-zinc-300 hover:text-white"
                      size={20}
                    />
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

                {/* Dropdowns */}
              </ul>
            </nav>
          </div>

          <div className="flex justify-center items-center px-2 gap-2">
            <li className="list-none m-0 p-0 flex">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white no-underline flex bg-black-300 p-1.5 rounded-md"
              >
                <FaGear className="text-zinc-300 hover:text-white" size={20} />
              </button>
            </li>

            <div className="hidden lg:flex items-center justify-end px-4 border border-black-500 bg-black-300 rounded-md">
              <div className="flex justify-center items-center gap-1">
                <FaSearch className="text-zinc-300" />
                <div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-white text-opacity-75 p-[6px] border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DESKTOP */}

      {/* LANGUAGE && CURRENCY  */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-500 bg-opacity-50">
          <div className="bg-black-400 p-6 text-white rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="px-2">
              <h2 className="text-2xl font-bold px-2 py-8">Settings</h2>

              {/*  <div className="px-2 py-2">
                <span className="font-medium block mb-1">Language</span>
                <LanguageMenu
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              </div> */}

              <div className="px-2 py-2">
                <span className="font-medium block mb-1">Currency</span>
                <CurrencyMenu
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                />
              </div>

              <div className="flex justify-end gap-2 px-2 pt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-black-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSave();
                    window.location.reload();
                  }}
                  className="bg-indigo-700 text-white px-6 py-2 rounded hover:bg-indigo-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* LANGUAGE && CURRENCY  */}

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col p-2 m-0 bg-black-400 rounded-md">
          <ul className="flex flex-col gap-4">
            <li className="list-none">
              <a href="/" className="text-white no-underline flex">
                <FaHome size={20} className="text-zinc-300 hover:text-white" />{" "}
                <span className="ml-2">Home</span>
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
      {/* MOBILE MENU */}
    </>
  );
}

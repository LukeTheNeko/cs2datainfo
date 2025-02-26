/* import React, { useState, useEffect, useRef } from "react";

interface Country {
  id: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  {
    id: "bg",
    name: "Bulgarian",
    flag: "https://hatscripts.github.io/circle-flags/flags/bg.svg",
  },
  {
    id: "cs",
    name: "Czech",
    flag: "https://hatscripts.github.io/circle-flags/flags/cz.svg",
  },
  {
    id: "da",
    name: "Danish",
    flag: "https://hatscripts.github.io/circle-flags/flags/dk.svg",
  },
  {
    id: "de",
    name: "German",
    flag: "https://hatscripts.github.io/circle-flags/flags/de.svg",
  },
  {
    id: "el",
    name: "Greek",
    flag: "https://hatscripts.github.io/circle-flags/flags/gr.svg",
  },
  {
    id: "en",
    name: "English",
    flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
  }, // English é agora o início
  {
    id: "es-ES",
    name: "Spanish",
    flag: "https://hatscripts.github.io/circle-flags/flags/es.svg",
  },
  {
    id: "es-MX",
    name: "Spanish (Latin America)",
    flag: "https://hatscripts.github.io/circle-flags/flags/mx.svg",
  },
  {
    id: "fi",
    name: "Finnish",
    flag: "https://hatscripts.github.io/circle-flags/flags/fi.svg",
  },
  {
    id: "fr",
    name: "French",
    flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
  },
  {
    id: "hu",
    name: "Hungarian",
    flag: "https://hatscripts.github.io/circle-flags/flags/hu.svg",
  },
  {
    id: "it",
    name: "Italian",
    flag: "https://hatscripts.github.io/circle-flags/flags/it.svg",
  },
  {
    id: "ja",
    name: "Japanese",
    flag: "https://hatscripts.github.io/circle-flags/flags/jp.svg",
  },
  {
    id: "ko",
    name: "Korean",
    flag: "https://hatscripts.github.io/circle-flags/flags/kr.svg",
  },
  {
    id: "nl",
    name: "Dutch",
    flag: "https://hatscripts.github.io/circle-flags/flags/nl.svg",
  },
  {
    id: "no",
    name: "Norwegian",
    flag: "https://hatscripts.github.io/circle-flags/flags/no.svg",
  },
  {
    id: "pl",
    name: "Polish",
    flag: "https://hatscripts.github.io/circle-flags/flags/pl.svg",
  },
  {
    id: "pt-BR",
    name: "Portuguese (Brazil)",
    flag: "https://hatscripts.github.io/circle-flags/flags/br.svg",
  },
  {
    id: "pt-PT",
    name: "Portuguese (Portugal)",
    flag: "https://hatscripts.github.io/circle-flags/flags/pt.svg",
  },
  {
    id: "ro",
    name: "Romanian",
    flag: "https://hatscripts.github.io/circle-flags/flags/ro.svg",
  },
  {
    id: "ru",
    name: "Russian",
    flag: "https://hatscripts.github.io/circle-flags/flags/ru.svg",
  },
  {
    id: "sk",
    name: "Slovak",
    flag: "https://hatscripts.github.io/circle-flags/flags/sk.svg",
  },
  {
    id: "sv",
    name: "Swedish",
    flag: "https://hatscripts.github.io/circle-flags/flags/se.svg",
  },
  {
    id: "th",
    name: "Thai",
    flag: "https://hatscripts.github.io/circle-flags/flags/th.svg",
  },
  {
    id: "tr",
    name: "Turkish",
    flag: "https://hatscripts.github.io/circle-flags/flags/tr.svg",
  },
  {
    id: "uk",
    name: "Ukrainian",
    flag: "https://hatscripts.github.io/circle-flags/flags/ua.svg",
  },
  {
    id: "vi",
    name: "Vietnamese",
    flag: "https://hatscripts.github.io/circle-flags/flags/vn.svg",
  },
  {
    id: "zh-CN",
    name: "Chinese (Simplified)",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
  },
  {
    id: "zh-TW",
    name: "Chinese (Traditional)",
    flag: "https://hatscripts.github.io/circle-flags/flags/tw.svg",
  },
];

interface LanguageMenuProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

export default function LanguageMenu({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleChange = (country: Country) => {
    setSelectedLanguage(country.id); // Atualiza a seleção do idioma
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fechar o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <div
          className="p-2 bg-black-300 text-white rounded-md cursor-pointer flex items-center justify-between"
          onClick={toggleMenu}
        >
          <div className="flex items-center">
            <img
              src={
                countries.find((country) => country.id === selectedLanguage)
                  ?.flag || ""
              }
              alt={selectedLanguage}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span>
              {
                countries.find((country) => country.id === selectedLanguage)
                  ?.name
              }
            </span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-300 text-indigo-600 ml-auto ${
              isMenuOpen ? "rotate-180" : ""
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
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 right-0 top-full mt-1 bg-black-300 text-white rounded-md shadow-lg w-full max-w-sm z-10 max-h-60 overflow-y-auto"
          >
            {countries.map((country) => (
              <div
                key={country.id}
                className="flex items-center p-2 cursor-pointer hover:bg-black-400"
                onClick={() => handleChange(country)}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 */
import React, { useState, useEffect, useRef } from "react";

interface Currency {
  id: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { id: "usd", name: "$ US Dollar", symbol: "$" },
  { id: "eur", name: "€ Euro", symbol: "€" },
  { id: "gbp", name: "£ British Pound", symbol: "£" },
  { id: "cny", name: "¥ Chinese Yuan", symbol: "¥" },
  { id: "jpy", name: "¥ Japanese Yen", symbol: "¥" },
  { id: "cad", name: "$ Canadian Dollar", symbol: "$" },
  { id: "aud", name: "$ Australian Dollar", symbol: "$" },
  { id: "hkd", name: "$ Hong Kong Dollar", symbol: "$" },
  { id: "isk", name: "kr Icelandic Krona", symbol: "kr" },
  { id: "php", name: "₱ Philippine Peso", symbol: "₱" },
  { id: "dkk", name: "kr Danish Krone", symbol: "kr" },
  { id: "huf", name: "Ft Hungarian Forint", symbol: "Ft" },
  { id: "czk", name: "Kč Czech Koruna", symbol: "Kč" },
  { id: "ron", name: "lei Romanian Leu", symbol: "lei" },
  { id: "sek", name: "kr Swedish Krona", symbol: "kr" },
  { id: "idr", name: "Rp Indonesian Rupiah", symbol: "Rp" },
  { id: "inr", name: "₹ Indian Rupee", symbol: "₹" },
  { id: "brl", name: "R$ Brazilian Real", symbol: "R$" },
  { id: "rub", name: "₽ Russian Ruble", symbol: "₽" },
  { id: "hrk", name: "kn Croatian Kuna", symbol: "kn" },
  { id: "thb", name: "฿ Thai Baht", symbol: "฿" },
  { id: "chf", name: "CHF Swiss Franc", symbol: "CHF" },
  { id: "myr", name: "RM Malaysian Ringgit", symbol: "RM" },
  { id: "bgn", name: "лв Bulgarian Lev", symbol: "лв" },
  { id: "try", name: "₺ Turkish Lira", symbol: "₺" },
  { id: "nok", name: "kr Norwegian Krone", symbol: "kr" },
  { id: "nzd", name: "$ New Zealand Dollar", symbol: "$" },
  { id: "zar", name: "R South African Rand", symbol: "R" },
  { id: "mxn", name: "$ Mexican Peso", symbol: "$" },
  { id: "sgd", name: "$ Singapore Dollar", symbol: "$" },
  { id: "ils", name: "₪ Israeli Shekel", symbol: "₪" },
  { id: "krw", name: "₩ South Korean Won", symbol: "₩" },
  { id: "pln", name: "zł Polish Zloty", symbol: "zł" },
  { id: "aed", name: "د.إ UAE Dirham", symbol: "د.إ" },
  { id: "ars", name: "$ Argentine Peso", symbol: "$" },
  { id: "clp", name: "$ Chilean Peso", symbol: "$" },
  { id: "cop", name: "$ Colombian Peso", symbol: "$" },
  { id: "crc", name: "₡ Costa Rican Colón", symbol: "₡" },
  { id: "kwd", name: "د.ك Kuwaiti Dinar", symbol: "د.ك" },
  { id: "kzt", name: "₸ Kazakhstani Tenge", symbol: "₸" },
  { id: "pen", name: "S/ Peruvian Sol", symbol: "S/" },
  { id: "qar", name: "ر.ق Qatari Riyal", symbol: "ر.ق" },
  { id: "sar", name: "ر.س Saudi Riyal", symbol: "ر.س" },
  { id: "twd", name: "$ New Taiwan Dollar", symbol: "$" },
  { id: "uah", name: "₴ Ukrainian Hryvnia", symbol: "₴" },
  { id: "uyu", name: "$ Uruguayan Peso", symbol: "$" },
  { id: "vnd", name: "₫ Vietnamese Dong", symbol: "₫" },
  { id: "gel", name: "₾ Georgian Lari", symbol: "₾" },
];

interface CurrencyMenuProps {
  selectedCurrency: string; // Recebe o ID da moeda selecionada
  setSelectedCurrency: (currencyId: string) => void; // Função para atualizar o ID da moeda selecionada
}

export default function CurrencyMenu({
  selectedCurrency,
  setSelectedCurrency,
}: CurrencyMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Encontra a moeda selecionada com base no ID
  const currentCurrency =
    currencies.find((currency) => currency.id === selectedCurrency) ||
    currencies[0];

  const handleChange = (currency: Currency) => {
    setSelectedCurrency(currency.id); // Atualiza o ID da moeda selecionada
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
          className="p-2 bg-black-300 text-white rounded-md cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="flex items-center">
            <span className="mr-2">{currentCurrency.symbol}</span>
            <span>{currentCurrency.name}</span>
            {/* SVG de seta */}
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
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 right-0 top-full mt-1 bg-black-300 text-white rounded-md shadow-lg w-full max-w-sm z-10 max-h-60 overflow-y-auto"
          >
            {currencies.map((currency) => (
              <div
                key={currency.id}
                className="flex items-center p-2 cursor-pointer hover:bg-black-400"
                onClick={() => handleChange(currency)}
              >
                <span className="mr-2">{currency.symbol}</span>
                <span>{currency.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

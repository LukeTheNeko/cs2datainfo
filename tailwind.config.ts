import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: {
          500: "#090909",
          450: "#101010",
          400: "#121212",
          300: "#212121",
          200: "#535353",
          100: "#b3b3b3",
        },
      },
    },
  },
  plugins: [],
};
export default config;

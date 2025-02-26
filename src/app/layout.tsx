import { Poppins } from "next/font/google";
import "../styles/globals.scss";
import "../styles/cardskins.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-900`}>
        <Header />
        <meta name="google-adsense-account" content="ca-pub-2763973119875552" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://cs2data.info/favicon.ico"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {children}
        <Footer />
      </body>
    </html>
  );
}

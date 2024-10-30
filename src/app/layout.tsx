import { Afacad } from "next/font/google";
import "../styles/globals.scss";
import "../styles/cardskins.scss";

const afacadFlux = Afacad({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={afacadFlux.className}>
                <meta
                    name="google-adsense-account"
                    content="ca-pub-2763973119875552"
                />

                <link
                    rel="icon"
                    type="image/x-icon"
                    href="https://cs2data.info/favicon.ico"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-touch-icon.png"
                    sizes="180x180"
                />
                <link rel="mask-icon" href="/mask-icon.svg" color="#4f46e5" />
                <meta name="theme-color" content="#4f46e5" />

                <meta
                    name="title"
                    content="CS2Data.info - Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />
                <meta
                    name="description"
                    content="Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cs2data.info/" />
                <meta
                    property="og:title"
                    content="CS2Data.info - Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />
                <meta
                    property="og:description"
                    content="Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />
                <meta
                    property="og:image"
                    content="https://cs2data.info/meta-tags.png"
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://cs2data.info/" />
                <meta
                    property="twitter:title"
                    content="CS2Data.info - Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />
                <meta
                    property="twitter:description"
                    content="Browse all CS2 skins, knives, gloves, cases, collections, stickers, music kits, and more."
                />
                <meta
                    property="twitter:image"
                    content="https://cs2data.info/meta-tags.png"
                />

                {children}
            </body>
        </html>
    );
}

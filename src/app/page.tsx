import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HomeCases from "@/components/Primary/HomeCases";

const metadata = {
    title: `Browse all CS2Skins skins, knives, gloves, cases, collections, stickers, music kits, and more. - CS2Data.info`,
    description: `Browse all CS2Skins skins, knives, gloves, cases, collections, stickers, music kits, and more.`,
    ogImageUrl: `https://cs2data.info/meta-tags.png`,
};

export default function Home() {
    return (
        <>
            {/* metatags */}
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="title" content={metadata.title} />
            <link rel="mask-icon" href="/mask-icon.svg" color="#4f46e5" />
            <meta name="theme-color" content="#4f46e5" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://cs2data.info/" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.ogImageUrl} />
            <meta property="twitter:url" content="https://cs2data.info/" />
            <meta property="twitter:title" content={metadata.title} />
            <meta
                property="twitter:description"
                content={metadata.description}
            />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={metadata.ogImageUrl} />
            {/* metatags */}

            <div className="bg-zinc-900">
                <Header />
                <div className="mt-10 mb-16">
                    <HomeCases />
                </div>
                <Footer />
            </div>
        </>
    );
}

const metadata = {
    title: `404 Not Found - CS2Data.info`,
    description: `CS2Data.info - Browse all skins, knives, gloves, cases, collections, stickers, music kits, and more.`,
    ogImageUrl: `/image-meta.png`,
};

export default function NotFound() {
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

            <section className="flex items-center h-screen p-16 bg-black-400">
                <div className="container flex flex-col items-center">
                    <div className="flex flex-col gap-6 max-w-md text-center">
                        <h2 className="font-extrabold text-9xl text-white">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl md:text-xl text-white">
                            Sorry, we could&apos;t find this page.
                        </p>
                        <a
                            href="/"
                            className="px-8 py-4 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-800 text-gray-50 hover:text-gray-200"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

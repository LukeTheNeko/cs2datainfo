"use client"

export default function ErrorPage() {
    return (
        <>
            <title>{`500 Internal Server Error`}</title>

            <section className="flex items-center h-screen p-16 bg-black-400">
                <div className="container flex flex-col items-center">
                    <div className="flex flex-col gap-6 max-w-md text-center">
                        <h2 className="font-extrabold text-9xl text-white">
                            <span className="sr-only">Error</span>500
                        </h2>
                        <p className="text-2xl md:text-xl text-white">
                            Internal Server Error.
                        </p>
                        <a
                            href="/"
                            className="px-8 py-4 text-xl font-semibold rounded-xl bg-indigo-600 text-gray-50 hover:text-gray-200"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

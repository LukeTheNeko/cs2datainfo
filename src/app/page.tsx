import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HomeCases from "@/components/Primary/HomeCases";

export default function Home() {
    return (
        <>
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

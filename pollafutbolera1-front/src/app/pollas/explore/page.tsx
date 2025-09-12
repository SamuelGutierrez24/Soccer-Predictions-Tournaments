import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import PollaExploreList from "@/src/components/polla/PollaExploreList";

export default function ExplorePage () {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">Pollas disponibles</h1>
                    <p>Here you can explore various pollas.</p>
                     <PollaExploreList />
                </main>
            <Footer />
        </div>
    );
    }
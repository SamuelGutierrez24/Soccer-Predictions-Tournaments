import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { SubPollaNav } from "@/src/components/subpollas/SubPolllaNav";


export default function SubPollaPage() {
  return (

    <div className="min-h-screen flex flex-col">
          <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <SubPollaNav />
            </main>
          <Footer />
        </div>
    
  );
}
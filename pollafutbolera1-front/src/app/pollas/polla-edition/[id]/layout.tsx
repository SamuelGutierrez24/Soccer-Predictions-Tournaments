'use client'
import Footer from "@/src/components/layout/Footer";
import { UpdatePollaProvider } from "../../../../context/updatePolla";
import { DM_Sans } from 'next/font/google'
import Navbar from "@/src/components/layout/Navbar";

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }
    : Readonly<{
      children: React.ReactNode;
    }>
    ) {
      return (
        <div className={`${dmSans.className}`}>
          <Navbar />
            <UpdatePollaProvider>
                {children}
            </UpdatePollaProvider>
            <Footer />
        </div>
      );
    }
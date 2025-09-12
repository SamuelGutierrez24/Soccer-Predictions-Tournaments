import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { User } from "lucide-react";
import { UsersList } from "@/src/components/subpollas/UsersList";

export default function UsersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <UsersList />
      </main>
      <Footer />
    </div>
  );
}
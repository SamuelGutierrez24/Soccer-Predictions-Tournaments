import NavbarAdmin from "@/src/components/layout/NavbarAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

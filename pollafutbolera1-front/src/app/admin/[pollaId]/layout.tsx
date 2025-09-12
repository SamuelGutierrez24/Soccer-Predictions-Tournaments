import AdminSidebar from '@/src/components/layout/SidebarAdmin';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pollaId: string }>;
}) {
  const { pollaId } = await params;
  console.log('AdminLayout pollaId:', pollaId);

  return (
    <div className="flex">
      <AdminSidebar pollaId={pollaId} />
      <main className="flex-1">{children}</main>
    </div>
  );
}

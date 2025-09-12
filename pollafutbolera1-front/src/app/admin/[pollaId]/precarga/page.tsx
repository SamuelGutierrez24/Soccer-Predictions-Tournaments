export default async function PrecargaPage({
  params,
}: {
  params: Promise<{ pollaId: string }>; // Promise y string
}) {
  const { pollaId } = await params;
  
  return (
    <div>
      Precarga con pollaId {pollaId}
    </div>
  );
}
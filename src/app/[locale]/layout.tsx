import Navbar from "@/components/Navbar/index";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

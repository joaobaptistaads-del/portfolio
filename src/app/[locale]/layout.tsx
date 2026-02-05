import Navbar from "@/components/Navbar/index";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

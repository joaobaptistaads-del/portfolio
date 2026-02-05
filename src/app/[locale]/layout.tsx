import Navbar from "@/components/Navbar/index";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  void params.locale;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

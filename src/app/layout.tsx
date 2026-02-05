import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/index";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ScrollProgress, FloatingActionButton } from "@/components/ui/ScrollIndicators";
import FuturisticCursor from "@/components/ui/FuturisticCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "João Baptista Adriano - Full Stack Developer",
  description: "Portfolio of João Baptista Adriano - Systems Analyst & Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
        style={{ cursor: 'none' }}
      >
        <FuturisticCursor />
        <ScrollProgress />
        <Navbar />
        {children}
        <FloatingActionButton />
        <ToastProvider />
      </body>
    </html>
  );
}

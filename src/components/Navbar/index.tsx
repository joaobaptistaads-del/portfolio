"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { detectBrowserLanguage, getTranslation } from "@/lib/i18n/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const t = getTranslation(language);

  useEffect(() => {
    setLanguage(detectBrowserLanguage());
  }, [setLanguage]);

  const navItems = [
    { href: "/#services", label: t.nav.services },
    { href: "/#about", label: t.nav.about },
    { href: "/#skills", label: t.nav.skills },
    { href: "/#portfolio", label: t.nav.portfolio },
    { href: "/#cv", label: t.nav.cv },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-sm z-40 border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-blue-400">
            JA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Admin */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full">
              <button
                onClick={() => setLanguage("pt")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "pt"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                PT
              </button>
              <div className="w-px h-4 bg-gray-700"></div>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/admin"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t.nav.admin}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

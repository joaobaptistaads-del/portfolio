"use client";

import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const { language, setLanguage } = useLanguageStore();
  const t = getTranslation(language);

  return (
    <motion.nav
      className="fixed top-0 w-full backdrop-blur-2xl bg-gray-950/80 z-50 border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-110 transition-transform">
          JA
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              {t.nav.about}
            </a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
              {t.nav.skills}
            </a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">
              {t.nav.portfolio}
            </a>
            <a href="#cv" className="text-gray-300 hover:text-white transition-colors">
              {t.nav.cv}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "pt" ? "🇬🇧 EN" : "🇵🇹 PT"}
            </motion.button>

            <Link href="/admin">
              <motion.span
                className="px-5 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

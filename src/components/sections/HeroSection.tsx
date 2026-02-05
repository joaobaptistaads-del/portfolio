"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { ClockworkBackground } from "@/components/three/Clockwork";

export function HeroSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* 3D Background */}
      <ClockworkBackground />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          className="text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.name}
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.button
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.cta}
          </motion.button>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-gray-900 pointer-events-none z-5" />
    </section>
  );
}

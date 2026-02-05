"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Variants } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);
  const hero = {
    greeting: overrides.hero?.greeting ?? t.hero.greeting,
    name: overrides.hero?.name ?? t.hero.name,
    subtitle: overrides.hero?.subtitle ?? t.hero.subtitle,
    description: overrides.hero?.description ?? t.hero.description,
    cta: overrides.hero?.cta ?? t.hero.cta,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background minimalista com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/20 to-black"></div>
      
      {/* Grid de fundo sutil */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-32 md:py-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Lado esquerdo - Texto */}
          <div className="md:col-span-7 space-y-8">
            {/* Greeting + Badge */}
            <motion.div
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                <span className="text-xl">👋</span>
              </div>
              <span className="text-sm font-medium text-blue-400 uppercase tracking-widest">
                {hero.greeting}
              </span>
            </motion.div>

            {/* Headline principal - MÁXIMO CONTRASTE */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                {hero.name}
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              className="text-xl md:text-2xl text-blue-400 font-semibold"
              variants={itemVariants}
            >
              {hero.subtitle}
            </motion.p>

            {/* Descrição */}
            <motion.p 
              className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              {hero.description}
            </motion.p>

            {/* CTA Botão */}
            <motion.div variants={itemVariants}>
              <Link href="#contact">
                <motion.button
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {hero.cta}
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="pt-8"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-slate-500" />
            </motion.div>
          </div>

          {/* Lado direito - Avatar */}
          <motion.div
            className="md:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full max-w-sm">
              {/* Avatar Container */}
              <div className="relative">
                {/* Glow sutil atrás */}
                <motion.div
                  className="absolute -inset-20 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Avatar Image - PNG sem fundo */}
                <img
                  src="/avatar.png"
                  alt={hero.name}
                  className="relative w-full h-auto object-contain"
                  onError={(e) => {
                    // Fallback: Avatar com iniciais
                    const target = e.target as HTMLImageElement;
                    target.outerHTML = `
                      <div class="relative w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-6xl font-bold">
                        ${hero.name.charAt(0).toUpperCase()}
                      </div>
                    `;
                  }}
                />

                {/* Status Badge */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-green-500 rounded-full px-4 py-2 text-sm font-medium text-white flex items-center gap-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Disponível para projetos
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


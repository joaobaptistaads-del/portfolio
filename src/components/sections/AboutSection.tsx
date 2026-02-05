"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";

export function AboutSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);
  const about = {
    title: overrides.about?.title ?? t.about.title,
    bio: overrides.about?.bio ?? t.about.bio,
    titlesLabel: overrides.about?.titlesLabel ?? t.about.titlesLabel,
    titles: overrides.about?.titles ?? t.about.titles,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-purple-950/20 via-gray-950 to-blue-950/20 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative z-10 max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-8">
          {about.title}
        </motion.h2>

        <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 leading-relaxed">
          {about.bio}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-6">{about.titlesLabel}</h3>
          {about.titles.map((title, index) => (
            <motion.div
              key={index}
              className="p-5 backdrop-blur-xl bg-white/5 rounded-xl border border-l-4 border-white/10 border-l-blue-500 hover:bg-white/10 transition-all group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <p className="text-white/90 group-hover:text-white transition-colors">{title}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

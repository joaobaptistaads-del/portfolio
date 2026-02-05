"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";

const DEFAULT_TECH_SKILLS = [
  "MERN Stack",
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "PHP",
  "Vanilla JavaScript",
  "Web Design",
  "Digital Marketing",
];

export function SkillsSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);

  const techSkills = overrides.skills?.techItems ?? DEFAULT_TECH_SKILLS;
  const languageSkills = overrides.skills?.languageItems ?? t.skills.languageItems;
  const skills = {
    title: overrides.skills?.title ?? t.skills.title,
    tech: overrides.skills?.tech ?? t.skills.tech,
    languages: overrides.skills?.languages ?? t.skills.languages,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-purple-950/20 via-gray-950 to-blue-950/20 overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity }}
          style={{ left: '5%', top: '10%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ right: '5%', bottom: '10%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {skills.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-8">{skills.tech}</h3>
            <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
              {techSkills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  className="group relative p-5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                  <p className="relative text-white/90 font-semibold group-hover:text-white transition-colors">{skill}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Language Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-8">{skills.languages}</h3>
            <motion.div className="space-y-6" variants={containerVariants}>
              {languageSkills.map((lang, idx) => (
                <motion.div 
                  key={lang.name} 
                  variants={itemVariants}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-white font-semibold">{lang.name}</span>
                    <span className="text-blue-400 font-medium">{lang.label}</span>
                  </div>
                  <div className="relative w-full h-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

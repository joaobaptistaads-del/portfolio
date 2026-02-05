"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";

const DEFAULT_EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2022 - Present",
    details: "Building web apps, dashboards, and e-commerce solutions with modern stacks.",
  },
  {
    role: "Digital Marketing Specialist",
    company: "Independent",
    period: "2020 - Present",
    details: "Growth strategies, YouTube optimization, and content performance analytics.",
  },
];

const DEFAULT_EDUCATION = [
  {
    title: "Systems Analysis",
    school: "Higher Education",
    period: "2018 - 2021",
  },
  {
    title: "Full Stack Development",
    school: "Continuous Learning",
    period: "2021 - Present",
  },
];

export function CVSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);
  const cv = {
    title: overrides.cv?.title ?? t.cv.title,
    download: overrides.cv?.download ?? t.cv.download,
    experience: overrides.cv?.experience ?? t.cv.experience,
    education: overrides.cv?.education ?? t.cv.education,
  };
  const experienceItems = overrides.cv?.experienceItems ?? DEFAULT_EXPERIENCE;
  const educationItems = overrides.cv?.educationItems ?? DEFAULT_EDUCATION;

  return (
    <section id="cv" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ x: [-50, 50, -50], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ left: '20%', top: '30%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {cv.title}
          </motion.h2>
          <motion.a
            href="/cv.pdf"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {cv.download}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-8">{cv.experience}</h3>
            <div className="space-y-6">
              {experienceItems.map((item, idx) => (
                <motion.div 
                  key={item.role} 
                  className="group relative p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                  <div className="relative flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">{item.role}</h4>
                    <span className="text-sm text-purple-400 font-medium px-3 py-1 bg-purple-500/20 rounded-full">{item.period}</span>
                  </div>
                  <p className="text-blue-300 font-semibold mb-3">{item.company}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-8">{cv.education}</h3>
            <div className="space-y-6">
              {educationItems.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className="group relative p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500" />
                  <div className="relative flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <span className="text-sm text-blue-400 font-medium px-3 py-1 bg-blue-500/20 rounded-full">{item.period}</span>
                  </div>
                  <p className="text-cyan-300 font-semibold">{item.school}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

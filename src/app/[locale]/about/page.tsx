"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("about");

  const techSkills = [
    "MERN Stack",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Three Fiber",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Supabase",
  ];

  const languages = [
    { name: "Portuguese", level: "Native/Fluent" },
    { name: "English", level: "Intermediate" },
    { name: "French", level: "Intermediate (Reading)" },
    { name: "Spanish", level: "Intermediate (Reading)" },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("title")}</h1>
          <p className="text-xl text-gray-300 mb-8">{t("description")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {t.rich("titles", {
              li: (chunks) => <div className="text-blue-400 font-semibold">{chunks}</div>,
            })}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techSkills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-800 hover:bg-blue-600 transition-colors p-4 rounded-lg text-center font-semibold"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Languages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Languages</h2>
          <div className="space-y-4">
            {languages.map((lang, idx) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="text-blue-400">{lang.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

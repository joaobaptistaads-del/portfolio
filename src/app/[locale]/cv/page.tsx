"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function CV() {
  const t = useTranslations("cv");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("title")}</h1>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("download")}
          </a>
        </motion.div>

        <div className="space-y-8">
          {/* Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("experience")}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="text-xl font-bold text-white">Experience Title</h3>
                <p className="text-blue-400">Company Name • 2021 - Present</p>
                <p className="text-gray-300 mt-2">
                  Worked on various projects developing full-stack web applications.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("education")}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="text-xl font-bold text-white">Degree Name</h3>
                <p className="text-blue-400">University Name • 2018 - 2021</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Projects() {
  const t = useTranslations("projects");

  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with MERN stack",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      demo: "#",
    },
    {
      title: "Project 2",
      description: "Next.js portfolio with 3D visualization",
      tags: ["Next.js", "Three.js", "TypeScript"],
      link: "#",
      demo: "#",
    },
    {
      title: "Project 3",
      description: "Marketing analytics dashboard",
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "#",
      demo: "#",
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("title")}</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center"
                  >
                    {t("viewProject")}
                  </a>
                  <a
                    href={project.demo}
                    className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors text-center"
                  >
                    {t("liveDemo")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

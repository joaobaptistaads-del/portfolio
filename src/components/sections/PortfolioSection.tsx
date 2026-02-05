"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image?: string;
    link?: string;
    technologies: string[];
    github?: string;
  };
  viewLabel: string;
  githubLabel: string;
}

export function ProjectCard({ project, viewLabel, githubLabel }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full"
      whileHover={{ scale: 1.03, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
      
      {project.image && (
        <div className="relative w-full h-48 bg-gray-900/50 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
        </div>
      )}
      <div className="relative p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2 group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
          {project.title}
        </h3>
        <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <motion.span 
              key={tech} 
              className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-medium backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-white/5 text-white/50 rounded-full text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              {viewLabel} →
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              {githubLabel} →
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);

  const [projects, setProjects] = useState<ProjectCardProps["project"][]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Full-stack MERN e-commerce platform with payment integration",
      image: "",
      link: "#",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: "2",
      title: "Social Media Dashboard",
      description: "Analytics dashboard for managing multiple social accounts",
      image: "",
      link: "#",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  ]);

  useEffect(() => {
    const loadFromStorage = () => {
      const saved = localStorage.getItem("projects");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setProjects(parsed);
          }
        } catch {
          // ignore invalid localStorage
        }
      }
    };

    const loadFromSupabase = async () => {
      if (!supabase) {
        loadFromStorage();
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("id,title,description,image,link,technologies,github")
        .order("updated_at", { ascending: false });

      if (error || !data) {
        loadFromStorage();
        return;
      }

      setProjects(data as ProjectCardProps["project"][]);
    };

    if (isSupabaseConfigured) {
      void loadFromSupabase();
      return;
    }

    loadFromStorage();
  }, []);

  return (
    <section id="portfolio" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-blue-950/20 via-gray-950 to-purple-950/20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.portfolio.title}
        </motion.h2>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-12">{t.portfolio.noProjects}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewLabel={t.portfolio.viewProject}
                githubLabel={t.portfolio.github}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

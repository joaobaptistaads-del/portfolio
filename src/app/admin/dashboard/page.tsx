"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GlassCard, GlassButton, GlassInput, GlassTextArea } from "@/components/ui/GlassComponents";
import { Tabs } from "@/components/ui/Tabs";
import {
  Plus, Trash2, Edit2, Save, X, GripVertical, Eye, BarChart3, Sparkles, Zap, TrendingUp,
  Image as ImageIcon, Globe, Github, LogOut, Briefcase, Code, User, Award, Mail, Layers, Home
} from "lucide-react";
import { loadSiteContent, saveSiteContent, type ContentOverrides } from "@/lib/store/siteContent";
import { translations } from "@/lib/i18n/translations";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  order?: number;
}

type SectionForm = {
  hero: { greeting: string; name: string; subtitle: string; description: string; cta: string };
  services: { kicker: string; title: string; subtitle: string };
  about: { title: string; bio: string };
  skills: { title: string };
  cv: { title: string };
  contact: { title: string; subtitle: string };
};

function SortableProject({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <motion.div ref={setNodeRef} style={style} layout className="group">
      <GlassCard className="relative overflow-hidden">
        <div {...attributes} {...listeners} className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-5 h-5 text-white/50" />
        </div>
        <div className="flex items-start gap-4 ml-8">
          {project.image && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onEdit} className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400">
              <Edit2 className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onDelete} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400">
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function CompleteAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [contentLang, setContentLang] = useState<"pt" | "en">("pt");
  const [sectionForm, setSectionForm] = useState<SectionForm>({
    hero: { greeting: "", name: "", subtitle: "", description: "", cta: "" },
    services: { kicker: "", title: "", subtitle: "" },
    about: { title: "", bio: "" },
    skills: { title: "" },
    cv: { title: "" },
    contact: { title: "", subtitle: "" },
  });

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "", description: "", technologies: [], link: "", github: "", image: "",
  });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const tabs = [
    { id: "projects", label: "Projetos", icon: <Layers className="w-4 h-4" /> },
    { id: "hero", label: "Hero", icon: <Home className="w-4 h-4" /> },
    { id: "services", label: "Serviços", icon: <Briefcase className="w-4 h-4" /> },
    { id: "about", label: "Sobre", icon: <User className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code className="w-4 h-4" /> },
    { id: "cv", label: "CV", icon: <Award className="w-4 h-4" /> },
    { id: "contact", label: "Contato", icon: <Mail className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin");
  }, [router]);

  useEffect(() => {
    const loadProjects = async () => {
      const saved = localStorage.getItem("projects");
      if (saved) setProjects(JSON.parse(saved));
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const stored = loadSiteContent();
    const content = stored[contentLang] || {};
    const t = translations[contentLang];
    
    setSectionForm({
      hero: {
        greeting: content.hero?.greeting ?? t.hero.greeting,
        name: content.hero?.name ?? t.hero.name,
        subtitle: content.hero?.subtitle ?? t.hero.subtitle,
        description: content.hero?.description ?? t.hero.description,
        cta: content.hero?.cta ?? t.hero.cta,
      },
      services: {
        kicker: content.services?.kicker ?? t.services.kicker,
        title: content.services?.title ?? t.services.title,
        subtitle: content.services?.subtitle ?? t.services.subtitle,
      },
      about: {
        title: content.about?.title ?? t.about.title,
        bio: content.about?.bio ?? t.about.bio,
      },
      skills: {
        title: content.skills?.title ?? t.skills.title,
      },
      cv: {
        title: content.cv?.title ?? t.cv.title,
      },
      contact: {
        title: content.contact?.title ?? t.contact.title,
        subtitle: content.contact?.subtitle ?? t.contact.subtitle,
      },
    });
  }, [contentLang]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        const updated = newItems.map((item, idx) => ({ ...item, order: idx }));
        localStorage.setItem("projects", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleSaveProject = () => {
    if (editingProject) {
      const updated = projects.map((p) => (p.id === editingProject.id ? { ...editingProject, ...formData } : p));
      setProjects(updated);
      localStorage.setItem("projects", JSON.stringify(updated));
    } else {
      const newProject = { id: Date.now().toString(), ...formData, order: projects.length };
      const updated = [...projects, newProject];
      setProjects(updated);
      localStorage.setItem("projects", JSON.stringify(updated));
    }
    closeModal();
  };

  const handleSaveContent = () => {
    const stored = loadSiteContent();
    const contentOverrides: ContentOverrides = {
      hero: sectionForm.hero,
      services: sectionForm.services,
      about: sectionForm.about,
      skills: sectionForm.skills,
      cv: sectionForm.cv,
      contact: sectionForm.contact,
    };
    stored[contentLang] = contentOverrides;
    saveSiteContent(stored);
    alert("Conteúdo salvo com sucesso!");
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({ title: "", description: "", technologies: [], link: "", github: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const stats = {
    totalProjects: projects.length,
    totalViews: 1250 + projects.length * 50,
    totalTech: new Set(projects.flatMap((p) => p.technologies)).size,
    completionRate: projects.length > 0 ? 87 + projects.length * 2 : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -top-48 -left-48 animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] top-1/2 right-0 animate-pulse" />
      </div>

      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Admin Completo 🚀
            </motion.h1>
            <div className="flex gap-3">
              <select value={contentLang} onChange={(e) => setContentLang(e.target.value as "pt" | "en")} className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white">
                <option value="pt">🇵🇹 PT</option>
                <option value="en">🇬🇧 EN</option>
              </select>
              <GlassButton variant="secondary" onClick={() => router.push("/")}>
                <Eye className="w-4 h-4 mr-2" /> Ver Site
              </GlassButton>
              <GlassButton variant="danger" onClick={() => { localStorage.removeItem("adminToken"); router.push("/admin"); }}>
                <LogOut className="w-4 h-4 mr-2" /> Sair
              </GlassButton>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Projetos", value: stats.totalProjects, icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
              { label: "Views", value: stats.totalViews.toLocaleString(), icon: TrendingUp, gradient: "from-purple-500 to-pink-500" },
              { label: "Tecnologias", value: stats.totalTech, icon: Zap, gradient: "from-green-500 to-emerald-500" },
              { label: "Conclusão", value: `${stats.completionRate}%`, icon: BarChart3, gradient: "from-orange-500 to-red-500" },
            ].map((stat, idx) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Projetos</h2>
                <GlassButton onClick={() => openModal()}>
                  <Plus className="w-5 h-5 mr-2" /> Novo Projeto
                </GlassButton>
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <SortableProject key={project.id} project={project} onEdit={() => openModal(project)} onDelete={() => handleDelete(project.id)} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Content Sections */}
          {activeTab !== "projects" && (
            <GlassCard>
              <h2 className="text-2xl font-bold text-white mb-6">Editar {tabs.find((t) => t.id === activeTab)?.label}</h2>
              <div className="space-y-4">
                {activeTab === "hero" && (
                  <>
                    <div><label className="text-white/80 text-sm mb-2 block">Saudação</label><GlassInput value={sectionForm.hero.greeting} onChange={(v) => setSectionForm({ ...sectionForm, hero: { ...sectionForm.hero, greeting: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Nome</label><GlassInput value={sectionForm.hero.name} onChange={(v) => setSectionForm({ ...sectionForm, hero: { ...sectionForm.hero, name: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Subtítulo</label><GlassInput value={sectionForm.hero.subtitle} onChange={(v) => setSectionForm({ ...sectionForm, hero: { ...sectionForm.hero, subtitle: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Descrição</label><GlassTextArea value={sectionForm.hero.description} onChange={(v) => setSectionForm({ ...sectionForm, hero: { ...sectionForm.hero, description: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Call to Action</label><GlassInput value={sectionForm.hero.cta} onChange={(v) => setSectionForm({ ...sectionForm, hero: { ...sectionForm.hero, cta: v } })} /></div>
                  </>
                )}
                {activeTab === "services" && (
                  <>
                    <div><label className="text-white/80 text-sm mb-2 block">Kicker</label><GlassInput value={sectionForm.services.kicker} onChange={(v) => setSectionForm({ ...sectionForm, services: { ...sectionForm.services, kicker: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={sectionForm.services.title} onChange={(v) => setSectionForm({ ...sectionForm, services: { ...sectionForm.services, title: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Subtítulo</label><GlassTextArea value={sectionForm.services.subtitle} onChange={(v) => setSectionForm({ ...sectionForm, services: { ...sectionForm.services, subtitle: v } })} /></div>
                  </>
                )}
                {activeTab === "about" && (
                  <>
                    <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={sectionForm.about.title} onChange={(v) => setSectionForm({ ...sectionForm, about: { ...sectionForm.about, title: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Bio</label><GlassTextArea rows={8} value={sectionForm.about.bio} onChange={(v) => setSectionForm({ ...sectionForm, about: { ...sectionForm.about, bio: v } })} /></div>
                  </>
                )}
                {activeTab === "skills" && (
                  <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={sectionForm.skills.title} onChange={(v) => setSectionForm({ ...sectionForm, skills: { ...sectionForm.skills, title: v } })} /></div>
                )}
                {activeTab === "cv" && (
                  <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={sectionForm.cv.title} onChange={(v) => setSectionForm({ ...sectionForm, cv: { ...sectionForm.cv, title: v } })} /></div>
                )}
                {activeTab === "contact" && (
                  <>
                    <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={sectionForm.contact.title} onChange={(v) => setSectionForm({ ...sectionForm, contact: { ...sectionForm.contact, title: v } })} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">Subtítulo</label><GlassTextArea value={sectionForm.contact.subtitle} onChange={(v) => setSectionForm({ ...sectionForm, contact: { ...sectionForm.contact, subtitle: v } })} /></div>
                  </>
                )}
                <GlassButton onClick={handleSaveContent} className="w-full">
                  <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                </GlassButton>
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{editingProject ? "Editar" : "Novo"} Projeto</h3>
                  <button onClick={closeModal} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4">
                  <div><label className="text-white/80 text-sm mb-2 block">Título</label><GlassInput value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} /></div>
                  <div><label className="text-white/80 text-sm mb-2 block">Descrição</label><GlassTextArea value={formData.description} onChange={(v) => setFormData({ ...formData, description: v })} rows={4} /></div>
                  <div><label className="text-white/80 text-sm mb-2 block">Tecnologias (separadas por vírgula)</label><GlassInput value={formData.technologies.join(", ")} onChange={(v) => setFormData({ ...formData, technologies: v.split(",").map((t) => t.trim()).filter(Boolean) })} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-white/80 text-sm mb-2 block">Link</label><GlassInput value={formData.link || ""} onChange={(v) => setFormData({ ...formData, link: v })} icon={<Globe className="w-4 h-4" />} /></div>
                    <div><label className="text-white/80 text-sm mb-2 block">GitHub</label><GlassInput value={formData.github || ""} onChange={(v) => setFormData({ ...formData, github: v })} icon={<Github className="w-4 h-4" />} /></div>
                  </div>
                  <div><label className="text-white/80 text-sm mb-2 block">Imagem URL</label><GlassInput value={formData.image || ""} onChange={(v) => setFormData({ ...formData, image: v })} icon={<ImageIcon className="w-4 h-4" />} /></div>
                  <div className="flex gap-3 pt-4">
                    <GlassButton onClick={handleSaveProject} className="flex-1"><Save className="w-4 h-4 mr-2" /> Salvar</GlassButton>
                    <GlassButton variant="secondary" onClick={closeModal} className="flex-1">Cancelar</GlassButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

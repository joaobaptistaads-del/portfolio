"use client";

import { motion } from "framer-motion";
import ServiceShowcase3D from "@/components/3d/ServiceShowcase";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";

export function ServicesSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);

  const services = {
    kicker: overrides.services?.kicker ?? t.services.kicker,
    title: overrides.services?.title ?? t.services.title,
    subtitle: overrides.services?.subtitle ?? t.services.subtitle,
    items: overrides.services?.items ?? t.services.items,
    stats: overrides.services?.stats ?? t.services.stats,
  };

  return (
    <section id="services" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-gray-950 via-blue-950/20 to-purple-950/20 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
          animate={{ x: [-50, 50, -50], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ x: [50, -50, 50], y: [100, 0, 100] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300/80 mb-4">
            {services.kicker}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {services.title}
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl">
            {services.subtitle}
          </p>

          <div className="space-y-4">
            {services.items.map((item: { title: string; projects: string }, idx: number) => (
              <motion.div
                key={item.title}
                className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-5 py-4 hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div>
                  <p className="text-white font-semibold group-hover:text-blue-300 transition-colors">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.projects}</p>
                </div>
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                >
                  ↗
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex gap-10">
            {services.stats.map((stat: { value: string; label: string }) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-pink-300">{stat.value}</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
              <ServiceShowcase3D />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

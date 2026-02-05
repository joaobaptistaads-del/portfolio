"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/languageStore";
import { getTranslation } from "@/lib/i18n/utils";
import { useSiteContent } from "@/lib/store/siteContent";

export function ContactSection() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);
  const overrides = useSiteContent(language);
  const contact = {
    title: overrides.contact?.title ?? t.contact.title,
    subtitle: overrides.contact?.subtitle ?? t.contact.subtitle,
    name: overrides.contact?.name ?? t.contact.name,
    email: overrides.contact?.email ?? t.contact.email,
    message: overrides.contact?.message ?? t.contact.message,
    send: overrides.contact?.send ?? t.contact.send,
    infoEmail: overrides.contact?.infoEmail ?? "joaobadriano@gmail.com",
    infoPhone: overrides.contact?.infoPhone ?? "+244 924 000 000",
    infoLocation: overrides.contact?.infoLocation ?? "Luanda, Angola",
  };

  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">{contact.title}</h2>
            <p className="text-xl text-white/70 mb-12">{contact.subtitle}</p>

            <div className="space-y-6 text-white">
              <motion.div
                className="group p-5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <p className="text-sm uppercase tracking-widest text-blue-400 mb-2">Email</p>
                <p className="text-lg font-semibold">{contact.infoEmail}</p>
              </motion.div>
              <motion.div
                className="group p-5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <p className="text-sm uppercase tracking-widest text-purple-400 mb-2">Phone</p>
                <p className="text-lg font-semibold">{contact.infoPhone}</p>
              </motion.div>
              <motion.div
                className="group p-5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <p className="text-sm uppercase tracking-widest text-pink-400 mb-2">Location</p>
                <p className="text-lg font-semibold">{contact.infoLocation}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="block text-white/80 mb-3 font-medium">{contact.name}</label>
              <input
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-xl"
                placeholder="João"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-3 font-medium">{contact.email}</label>
              <input
                type="email"
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-xl"
                placeholder="joao@email.com"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-3 font-medium">{contact.message}</label>
              <textarea
                rows={6}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition-colors backdrop-blur-xl resize-none"
                placeholder="Write your message..."
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {contact.send}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

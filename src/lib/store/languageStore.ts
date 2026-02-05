import { create } from "zustand";
import { Language } from "../i18n/translations";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "pt",
  setLanguage: (lang: Language) => set({ language: lang }),
}));

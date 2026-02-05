import { Language, translations } from "./translations";

export function getLanguageFromLocale(locale: string): Language {
  // Brazilian Portuguese and Portugal Portuguese
  if (locale.startsWith("pt-BR") || locale.startsWith("pt-PT") || locale.startsWith("pt")) {
    return "pt";
  }
  // Angola Portuguese
  if (locale.startsWith("pt-AO")) {
    return "pt";
  }
  // Default to English
  return "en";
}

export function getTranslation(lang: Language) {
  return translations[lang];
}

export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";
  
  const locale = navigator.language || navigator.languages?.[0] || "en";
  return getLanguageFromLocale(locale);
}

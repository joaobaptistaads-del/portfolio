"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type ServiceItem = { title: string; projects: string };
export type StatItem = { value: string; label: string };
export type LanguageItem = { name: string; level: number; label: string };
export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  details: string;
};
export type EducationItem = {
  title: string;
  school: string;
  period: string;
};

export type ContentOverrides = {
  hero?: {
    greeting?: string;
    name?: string;
    subtitle?: string;
    description?: string;
    cta?: string;
  };
  services?: {
    kicker?: string;
    title?: string;
    subtitle?: string;
    items?: ServiceItem[];
    stats?: StatItem[];
  };
  about?: {
    title?: string;
    bio?: string;
    titlesLabel?: string;
    titles?: string[];
  };
  skills?: {
    title?: string;
    tech?: string;
    languages?: string;
    techItems?: string[];
    languageItems?: LanguageItem[];
  };
  cv?: {
    title?: string;
    download?: string;
    experience?: string;
    education?: string;
    experienceItems?: ExperienceItem[];
    educationItems?: EducationItem[];
  };
  contact?: {
    title?: string;
    subtitle?: string;
    name?: string;
    email?: string;
    message?: string;
    send?: string;
    infoEmail?: string;
    infoPhone?: string;
    infoLocation?: string;
  };
};

export type SiteContent = {
  pt?: ContentOverrides;
  en?: ContentOverrides;
};

const STORAGE_KEY = "siteContent";
const EVENT_NAME = "siteContentUpdated";

export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as SiteContent;
  } catch {
    return {};
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useSiteContent(language: "pt" | "en") {
  const [overrides, setOverrides] = useState<ContentOverrides>({});

  const loadFromStorage = () => {
    const content = loadSiteContent();
    setOverrides(content[language] || {});
  };

  const loadFromSupabase = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("language", language)
      .single();

    if (error || !data) {
      loadFromStorage();
      return;
    }

    setOverrides((data.content || {}) as ContentOverrides);
  };

  useEffect(() => {
    if (isSupabaseConfigured) {
      void loadFromSupabase();
      return;
    }
    loadFromStorage();
  }, [language]);

  useEffect(() => {
    const handler = () => {
      if (isSupabaseConfigured) {
        void loadFromSupabase();
        return;
      }
      loadFromStorage();
    };

    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [language]);

  return overrides;
}

import HeroSection from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CVSection } from "@/components/sections/CVSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <main className="bg-gray-950">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <CVSection />
      <ContactSection />
    </main>
  );
}

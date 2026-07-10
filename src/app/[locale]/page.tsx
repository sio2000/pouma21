import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PersonalizationSection from "@/components/sections/PersonalizationSection";
import CommunicationSection from "@/components/sections/CommunicationSection";
import MethodSection from "@/components/sections/MethodSection";
import PumaStory from "@/components/sections/PumaStory";
import PumaClawDivider from "@/components/puma/PumaClawDivider";
import DifferenceSection from "@/components/sections/DifferenceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <MethodSection />
      <CommunicationSection />
      <PhilosophySection />
      <PersonalizationSection />
      <PumaClawDivider className="bg-dark-section" tone="dark" />
      <PumaStory />
      <DifferenceSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutPillars } from '@/components/sections/AboutPillars';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { TechMatrix } from '@/components/sections/TechMatrix';
import { OpenSourceTelemetry } from '@/components/sections/OpenSourceTelemetry';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <AboutPillars />
        <CaseStudies />
        <ExperienceTimeline />
        <TechMatrix />
        <OpenSourceTelemetry />
      </main>
      <Footer />
    </div>
  );
}

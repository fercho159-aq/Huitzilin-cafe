import { PageLayout } from "@/components/page-layout";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { MenuSection } from "@/components/sections/menu-section";
import { DoorDashStrip } from "@/components/sections/doordash-strip";
import { Locations } from "@/components/sections/locations";
import { Loyalty } from "@/components/sections/loyalty";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <MenuSection />
      <DoorDashStrip />
      <Locations />
      <Loyalty />
      <ContactSection />
    </PageLayout>
  );
}

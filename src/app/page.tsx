import OSShell from "@/components/os/OSShell";
import Artboard00Hero from "@/components/artboards/Artboard00Hero";
import Artboard01About from "@/components/artboards/Artboard01About";
import Artboard03Experience from "@/components/artboards/Artboard03Experience";
import Artboard05Achievements from "@/components/artboards/Artboard05Achievements";
import Artboard04Skills from "@/components/artboards/Artboard04Skills";
import Artboard08Contact from "@/components/artboards/Artboard08Contact";

export default function Home() {
  return (
    <OSShell>
      {/* Each artboard is a section of the OS workspace */}
      <Artboard00Hero />

      <Artboard01About />

      <Artboard03Experience />

      <Artboard05Achievements />

      <Artboard04Skills />

      <Artboard08Contact />
    </OSShell>
  );
}

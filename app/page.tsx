import { AboutMe } from "@/components/about-me";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 space-y-20 max-w-full">
        <AboutMe />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}
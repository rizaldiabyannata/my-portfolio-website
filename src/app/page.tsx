import Header from './components/Header';
import SocialLinks from "./components/SocialLinks";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import type { Project, Skill } from '@prisma/client';

// This is a server component, so we can fetch data directly
async function getProjects(): Promise<Project[]> {
  // The fetch URL must be absolute on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("Failed to fetch projects");
    return [];
  }
  return res.json();
}

async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/skills`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("Failed to fetch skills");
    return [];
  }
  return res.json();
}


export default async function Home() {
  const projects = await getProjects();
  const skills = await getSkills();

  return (
    <div className="bg-navy text-slate font-sans leading-relaxed antialiased">
      <Header />
      <SocialLinks />

      <Hero />

      <main>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <About />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <Skills skills={skills} />
            <Projects projects={projects} />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <Contact />
        </div>
      </main>
      
      <footer className="text-center py-6">
        <p className="text-slate text-sm font-mono">
          Designed & Built by Rizaldi Abyannata
        </p>
      </footer>
    </div>
  );
}

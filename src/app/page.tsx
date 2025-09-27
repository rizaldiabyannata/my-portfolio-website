import SocialLinks from "./components/SocialLinks";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import React from "react";

export default function Home() {
  return (
    <>
      {/* Floating social links */}
      <SocialLinks />
      <Hero />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <section id="about" className="py-24">
          <About />
        </section>
        <section id="skills" className="py-24">
          <Skills />
        </section>
        <section id="projects" className="py-24">
          <Projects />
        </section>
        <section id="contact" className="py-24">
          <Contact />
        </section>
      </main>
      <footer className="text-center py-10">
        <p className="text-muted-foreground text-sm font-mono">
          Designed & Built by Rizaldi Abyannata
        </p>
      </footer>
    </>
  );
}

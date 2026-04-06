import React from "react";
import {
  PROJECTS_DATA,
  SITE_CONTENT,
  SKILL_GROUPS,
} from "../../constants";
import { getAllPosts } from "@/lib/blog";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WritingPreview from "./components/WritingPreview";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 2);
  const totalSkills = SKILL_GROUPS.reduce(
    (count, group) => count + group.skills.length,
    0
  );

  const heroStats = [
    {
      value: String(PROJECTS_DATA.length).padStart(2, "0"),
      label: "Selected builds",
      detail: "Projects spanning full-stack delivery, backend design, and academic execution.",
    },
    {
      value: String(totalSkills).padStart(2, "0"),
      label: "Core tools",
      detail: "Stack coverage across backend systems, frontend delivery, data, and workflow.",
    },
    {
      value: String(posts.length).padStart(2, "0"),
      label: "Published notes",
      detail: "Writing that documents practical work across Next.js, Tailwind, and implementation detail.",
    },
  ];

  const heroSignals = [
    {
      label: "Status",
      value: SITE_CONTENT.availability,
    },
    {
      label: "Focus",
      value: "Backend systems, API design, and product-facing delivery.",
    },
    {
      label: "Proof",
      value: `${PROJECTS_DATA.length} selected projects and ${posts.length} published notes in the archive.`,
    },
  ];

  return (
    <>
      <Hero stats={heroStats} signals={heroSignals} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <About />
        <Skills />
        <Projects />
        <WritingPreview posts={latestPosts} />
        <Contact />
      </main>
    </>
  );
}

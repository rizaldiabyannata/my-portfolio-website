"use client";

import { Button } from "@/components/ui/button";
import { generateSlugFromTitle } from "@/lib/slugs";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { PROJECTS_DATA } from "../../../constants";
import Reveal from "./Reveal";
import SpotlightSurface from "./interactive/SpotlightSurface";
import SectionTitle from "./SectionTitle";

const Projects = () => {
  const featuredProject =
    PROJECTS_DATA.find((project) => project.featured) ?? PROJECTS_DATA[0];
  const supportingProjects = PROJECTS_DATA.filter(
    (project) => project.title !== featuredProject.title
  );

  return (
    <section id="projects" className="py-24">
      <SectionTitle
        index="03"
        title="Selected work with clear delivery context."
        description="Each project shows the kind of problems I have handled so far: system design, backend implementation, product-facing delivery, and team execution."
      />

      <div className="grid gap-6">
        <Reveal className="h-full">
          <SpotlightSurface className="overflow-hidden p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="label-chip">Featured case study</span>
                  {featuredProject.status ? (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors duration-200 group-hover:border-primary/30 group-focus-within:border-primary/30">
                      {featuredProject.status}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-3xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary sm:text-4xl">
                    {featuredProject.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 group-focus-within:text-foreground/85 sm:text-lg">
                    {featuredProject.summary}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.2rem] border border-border/70 bg-background/45 p-4 transition-colors duration-200 group-hover:border-border/90 group-focus-within:border-border/90">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                      Role
                    </p>
                    <p className="mt-2 text-sm text-foreground sm:text-base">
                      {featuredProject.role ?? "Contributor"}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-border/70 bg-background/45 p-4 transition-colors duration-200 group-hover:border-border/90 group-focus-within:border-border/90">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                      Focus
                    </p>
                    <p className="mt-2 text-sm text-foreground sm:text-base">
                      Full-stack product flow
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-border/70 bg-background/45 p-4 transition-colors duration-200 group-hover:border-border/90 group-focus-within:border-border/90">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                      Surface
                    </p>
                    <p className="mt-2 text-sm text-foreground sm:text-base">
                      Customer and admin experience
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {featuredProject.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="flex gap-4 rounded-[1.2rem] border border-border/70 bg-background/40 px-4 py-4 transition-colors duration-200 group-hover:border-primary/20 group-focus-within:border-primary/20"
                    >
                      <span className="font-mono text-sm text-primary/80">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-6 text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 group-focus-within:text-foreground/85 sm:text-base">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[1.4rem] border border-border/70 bg-background/40 p-5 transition-colors duration-200 group-hover:border-border/90 group-focus-within:border-border/90">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                    Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag} className="label-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link
                      href={`/projects/${generateSlugFromTitle(
                        featuredProject.title
                      )}`}
                    >
                      Read case study
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={featuredProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repository
                      <Github className="ml-2 size-4" />
                    </a>
                  </Button>
                  {featuredProject.demoUrl || featuredProject.liveUrl ? (
                    <Button asChild variant="secondary" size="lg">
                      <a
                        href={featuredProject.demoUrl || featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live preview
                        <ExternalLink className="ml-2 size-4" />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </SpotlightSurface>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {supportingProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06} className="h-full">
              <SpotlightSurface className="h-full p-6">
                <article className="flex h-full flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {project.status ? (
                          <span className="label-chip transition-colors duration-200 group-hover:border-primary/25 group-focus-within:border-primary/25">
                            {project.status}
                          </span>
                        ) : null}
                      </div>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/45 text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-primary/40 hover:bg-background/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={`Open ${project.title} repository`}
                      >
                        <Github className="size-4" />
                      </a>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading text-2xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 group-focus-within:text-foreground/85 sm:text-base">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <p
                          key={highlight}
                          className="rounded-[1rem] border border-border/70 bg-background/40 px-3.5 py-3 text-sm leading-6 text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-focus-within:border-primary/20 group-hover:text-foreground/85 group-focus-within:text-foreground/85"
                        >
                          {highlight}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="label-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${generateSlugFromTitle(project.title)}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5"
                    >
                      Read the breakdown
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </SpotlightSurface>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

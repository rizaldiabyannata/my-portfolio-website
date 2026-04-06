"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectDetailSectionId } from "@/../../types";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface ProjectSectionLink {
  id: ProjectDetailSectionId;
  label: string;
}

interface ProjectDetailShellProps extends PropsWithChildren {
  repoUrl: string;
  liveUrl?: string;
  sections: ProjectSectionLink[];
}

function useActiveSection(sections: ProjectSectionLink[]) {
  const [activeSection, setActiveSection] = useState<ProjectDetailSectionId>(
    sections[0]?.id ?? "overview"
  );

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id as ProjectDetailSectionId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (!element) {
        return;
      }

      element.dataset.active = activeSection === id ? "true" : "false";
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);

        if (element) {
          delete element.dataset.active;
        }
      });
    };
  }, [activeSection, sectionIds]);

  return activeSection;
}

function SectionLinks({
  sections,
  activeSection,
}: {
  sections: ProjectSectionLink[];
  activeSection: ProjectDetailSectionId;
}) {
  return (
    <>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={activeSection === section.id ? "true" : undefined}
          className={cn(
            "inline-flex items-center rounded-full border px-4 py-2.5 text-sm transition-[border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            activeSection === section.id
              ? "border-primary/35 bg-primary/10 text-foreground"
              : "border-border/70 bg-background/45 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {section.label}
        </a>
      ))}
    </>
  );
}

export default function ProjectDetailShell({
  repoUrl,
  liveUrl,
  sections,
  children,
}: ProjectDetailShellProps) {
  const activeSection = useActiveSection(sections);

  return (
    <>
      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
        <SectionLinks sections={sections} activeSection={activeSection} />
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-border/70 bg-background/45 px-4 py-2.5 text-sm text-muted-foreground transition-[border-color,background-color,color] duration-200 hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Github className="mr-2 size-4" />
          Repository
        </a>
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Live preview
            <ExternalLink className="ml-2 size-4" />
          </a>
        ) : null}
        <Link
          href="/#contact"
          className="inline-flex items-center rounded-full border border-border/70 bg-background/45 px-4 py-2.5 text-sm text-muted-foreground transition-[border-color,background-color,color] duration-200 hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Contact
          <ArrowUpRight className="ml-2 size-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="min-w-0 space-y-6">{children}</div>

        <aside className="sticky top-28 hidden lg:block">
          <div className="surface-panel p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
              Quick jump
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Move through the case study and keep supporting actions nearby.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <SectionLinks sections={sections} activeSection={activeSection} />
            </div>

            <div className="editorial-rule my-4" />

            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  Repository
                  <Github className="ml-2 size-4" />
                </a>
              </Button>

              {liveUrl ? (
                <Button asChild size="sm">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    Live preview
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              ) : null}

              <Button asChild variant="brand" size="sm">
                <Link href="/#contact">
                  Continue to contact
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

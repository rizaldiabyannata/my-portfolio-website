import { PROJECTS_DATA } from "@/../../constants";
import type { ProjectDetailSectionId } from "@/../../types";
import { generateSlugFromTitle } from "@/lib/slugs";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers3,
  NotebookPen,
} from "lucide-react";
import ProjectDetailShell from "./ProjectDetailShell";

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: generateSlugFromTitle(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find(
    (item) => generateSlugFromTitle(item.title) === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find(
    (item) => generateSlugFromTitle(item.title) === slug
  );

  if (!project) {
    notFound();
  }

  const sections: Array<{ id: ProjectDetailSectionId; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "stack", label: "Tech stack" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to selected work</span>
        </Link>

        <div className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="label-chip">Project case study</span>
                {project.status ? (
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm text-primary">
                    {project.status}
                  </span>
                ) : null}
              </div>

              <div className="space-y-4">
                <h1 className="font-heading text-4xl font-semibold text-foreground md:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="label-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.4rem] border border-border/70 bg-background/45 p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Role
                </p>
                <p className="mt-3 text-base text-foreground">
                  {project.role ?? "Contributor"}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-border/70 bg-background/45 p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Stack coverage
                </p>
                <p className="mt-3 text-base text-foreground">
                  {project.tags.length} technologies highlighted
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-border/70 bg-background/45 p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Case study links
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/35 hover:text-primary"
                  >
                    <Github size={16} />
                    Repository
                    <ExternalLink size={14} />
                  </a>
                  {project.demoUrl || project.liveUrl ? (
                    <a
                      href={project.demoUrl || project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Live preview
                      <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProjectDetailShell
          repoUrl={project.repoUrl}
          liveUrl={project.demoUrl || project.liveUrl}
          sections={sections}
        >
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <section
              id="overview"
              className="project-section surface-panel p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <NotebookPen className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Project overview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Context and delivery summary
                  </p>
                </div>
              </div>
              <div className="article-prose">
                <p>{project.description}</p>
              </div>
            </section>

            <section
              id="highlights"
              className="project-section surface-panel p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Layers3 className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Delivery highlights
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Structured points from the implementation
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <article
                    key={highlight}
                    className="project-section-card rounded-[1.2rem] border border-border/70 bg-background/45 px-4 py-4"
                  >
                    <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/80">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                      {highlight}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section
            id="stack"
            className="project-section surface-panel p-6 sm:p-8"
          >
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Tech stack
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Primary technologies used in this project.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {project.tags.map((tech) => (
                <div
                  key={tech}
                  className="project-section-card rounded-[1.2rem] border border-border/70 bg-background/45 px-4 py-4 text-sm font-medium text-foreground sm:text-base"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="project-section surface-panel p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Next step
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                  Continue the conversation from this case study.
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  If this project maps to what your team needs, continue to the
                  contact section for a direct follow-up.
                </p>
              </div>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Continue to contact
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </section>
        </ProjectDetailShell>
      </div>
    </div>
  );
}

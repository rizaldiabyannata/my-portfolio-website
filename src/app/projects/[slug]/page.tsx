import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS_DATA } from "@/../../constants";
import { generateSlugFromTitle } from "@/lib/blog";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

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
    (p) => generateSlugFromTitle(p.title) === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find(
    (p) => generateSlugFromTitle(p.title) === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-all duration-300"
              >
                <Github size={20} />
                <span>View Repository</span>
                <ExternalLink size={16} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-all duration-300"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            About This Project
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8 mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.tags.map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
              >
                <span className="text-[var(--color-text)] font-medium">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features (parsed from description) */}
        {project.description.includes("Features") && (
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Key Features
            </h2>
            <div className="space-y-3">
              {project.description
                .split(".")
                .filter((sentence) => sentence.trim().length > 0)
                .map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-text-secondary)]"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed">{feature.trim()}.</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

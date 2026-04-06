"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { BlogHeading } from "@/lib/headings";
import { ListTree } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface BlogReaderShellProps extends PropsWithChildren {
  headings: BlogHeading[];
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(
        100,
        Math.max(0, (window.scrollY / scrollHeight) * 100)
      );

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
}

function useActiveHeading(headings: BlogHeading[]) {
  const [activeHeading, setActiveHeading] = useState<string>(headings[0]?.id ?? "");

  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    if (!headingIds.length) {
      return undefined;
    }

    const elements = headingIds
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
          setActiveHeading(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headingIds]);

  return activeHeading;
}

function TableOfContents({
  headings,
  activeHeading,
}: {
  headings: BlogHeading[];
  activeHeading: string;
}) {
  return (
    <nav aria-label="Table of contents" className="space-y-1.5">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          aria-current={activeHeading === heading.id ? "true" : undefined}
          className={cn(
            "flex items-center rounded-[1rem] border px-3 py-2.5 text-sm transition-[border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            heading.level === 3 ? "ml-4" : "",
            activeHeading === heading.id
              ? "border-primary/35 bg-primary/10 text-foreground"
              : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-background/55 hover:text-foreground"
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

export default function BlogReaderShell({
  headings,
  children,
}: BlogReaderShellProps) {
  const progress = useReadingProgress();
  const activeHeading = useActiveHeading(headings);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-[5.65rem] z-40 h-px bg-border/60">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {headings.length ? (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-[1.25rem] border border-border/70 bg-card/80 px-4 py-3 lg:hidden">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
              Reading tools
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Jump between article sections.
            </p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <ListTree className="mr-2 size-4" />
                On this page
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l-border/70 bg-background/96 px-6 py-12">
              <SheetHeader className="text-left">
                <SheetTitle>On this page</SheetTitle>
                <SheetDescription>
                  Navigate the current article without losing your reading position.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 overflow-y-auto">
                <TableOfContents headings={headings} activeHeading={activeHeading} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : null}

      <div
        className={cn(
          "grid gap-6",
          headings.length ? "lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start" : ""
        )}
      >
        <div className="min-w-0">{children}</div>

        {headings.length ? (
          <aside className="sticky top-28 hidden lg:block">
            <div className="surface-panel p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                On this page
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Section links update as you move through the article.
              </p>

              <div className="mt-4">
                <TableOfContents headings={headings} activeHeading={activeHeading} />
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </>
  );
}

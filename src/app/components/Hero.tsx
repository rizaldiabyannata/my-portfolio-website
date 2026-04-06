"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, FolderOpenDot, Mail } from "lucide-react";
import type { MouseEvent } from "react";
import { useMemo } from "react";
import { PROJECTS_DATA, SITE_CONTENT } from "../../../constants";

interface HeroStat {
  value: string;
  label: string;
  detail: string;
}

interface HeroSignal {
  label: string;
  value: string;
}

interface HeroProps {
  stats: HeroStat[];
  signals: HeroSignal[];
}

const Hero = ({ stats, signals }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 26 });
  const springY = useSpring(y, { stiffness: 160, damping: 26 });

  const featuredProject = useMemo(
    () => PROJECTS_DATA.find((project) => project.featured) ?? PROJECTS_DATA[0],
    []
  );

  const codeLines = [
    'const builder = {',
    '  focus: ["API design", "Backend systems", "Product UI"],',
    `  current: "${SITE_CONTENT.title}",`,
    '  stack: ["Node.js", "Express.js", "Next.js", "PostgreSQL"],',
    `  featuredBuild: "${featuredProject.title}",`,
    '};',
  ];

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    x.set(offsetX * 18);
    y.set(offsetY * 18);
  };

  const resetPointer = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-6 lg:px-10 lg:pt-36"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="label-chip">{SITE_CONTENT.heroEyebrow}</span>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm text-primary">
                {SITE_CONTENT.availability}
              </span>
            </div>

            <div className="max-w-3xl space-y-7">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80">
                  {SITE_CONTENT.title}
                </p>
                <h1 className="font-heading text-5xl font-semibold leading-none text-foreground sm:text-6xl lg:text-7xl">
                  {SITE_CONTENT.name}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  {SITE_CONTENT.heroDescription}
                </p>
              </div>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {SITE_CONTENT.heroSupportingCopy}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#contact">
                    Start a conversation
                    <Mail className="ml-2 size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#projects">
                    View selected work
                    <FolderOpenDot className="ml-2 size-4" />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {["Node.js", "Express.js", "Next.js", "PostgreSQL"].map(
                  (item) => (
                    <span key={item} className="label-chip">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    x: springX,
                    y: springY,
                  }
            }
            className="surface-panel relative overflow-hidden p-5 sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--hero-orb),transparent_38%)]" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-yellow-400/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                </div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                  profile.ts
                </p>
              </div>

              <div className="inset-panel overflow-hidden p-4 sm:p-5">
                <div className="space-y-2 font-mono text-[0.78rem] leading-6 text-muted-foreground sm:text-[0.85rem]">
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.06, duration: 0.28 }}
                      className="flex gap-3"
                    >
                      <span className="w-4 shrink-0 text-primary/70">
                        {index + 1}
                      </span>
                      <code className="text-pretty text-foreground/90">{line}</code>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={
                      prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }
                    }
                    animate={
                      prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                    }
                    transition={{ delay: 0.28 + index * 0.06, duration: 0.3 }}
                    className="inset-panel p-4"
                  >
                    <p className="font-heading text-3xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {stat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-[1.35rem] border border-primary/20 bg-primary/10 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Featured case study
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {featuredProject.summary}
                  </p>
                </div>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Explore
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="surface-panel grid gap-4 p-4 sm:grid-cols-3 sm:p-5"
        >
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-[1.2rem] border border-border/70 bg-background/45 px-4 py-4"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary/75">
                {signal.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground sm:text-base">
                {signal.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

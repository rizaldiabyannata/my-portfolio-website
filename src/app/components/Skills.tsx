"use client";

import { motion, useReducedMotion } from "motion/react";
import { SKILL_GROUPS } from "../../../constants";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const Skills = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24">
      <SectionTitle
        index="02"
        title="Capability clusters, not a random stack list."
        description="These are the tools I use most often when the work requires solid backend delivery, practical frontend execution, and dependable shipping habits."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            delay={groupIndex * 0.05}
            className="surface-panel p-6 sm:p-8"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary/75">
                  Capability cluster
                </p>
                <div className="space-y-3">
                  <h3 className="font-heading text-3xl font-semibold text-foreground">
                    {group.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {group.summary}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-[1.25rem] border border-border/70 bg-background/45 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <div className="size-5">{skill.icon}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground sm:text-base">
                          {skill.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;

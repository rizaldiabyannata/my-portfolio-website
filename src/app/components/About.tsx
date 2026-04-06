import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SITE_CONTENT } from "../../../constants";
import { Blocks, DatabaseZap, PanelsTopLeft } from "lucide-react";

const focusAreas = [
  {
    icon: DatabaseZap,
    title: "Backend architecture",
    description:
      "API contracts, service structure, and database design shaped around actual product needs.",
  },
  {
    icon: PanelsTopLeft,
    title: "Product-facing delivery",
    description:
      "Interfaces built to support the system clearly, not compete with it.",
  },
  {
    icon: Blocks,
    title: "Maintainable execution",
    description:
      "Readable code, practical decisions, and delivery choices that keep a team moving.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <SectionTitle
        index="01"
        title="A backend-first builder with product awareness."
        description="I work best where architecture, implementation detail, and product clarity need to meet in one place."
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="surface-panel h-full p-6 sm:p-8">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-primary/75">
                Current profile
              </p>
              <h3 className="mt-4 font-heading text-3xl font-semibold text-foreground">
                {SITE_CONTENT.title}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.2rem] border border-border/70 bg-background/50 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Graduation target
                </p>
                <p className="mt-2 text-base text-foreground">2026</p>
              </div>
              <div className="rounded-[1.2rem] border border-border/70 bg-background/50 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Preferred work
                </p>
                <p className="mt-2 text-base text-foreground">
                  Backend-heavy product execution
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-border/70 bg-background/50 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                  Open to
                </p>
                <p className="mt-2 text-base text-foreground">
                  Internships, freelance work, and collaboration
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal className="surface-panel p-6 sm:p-8">
            <div className="article-prose">
              {SITE_CONTENT.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.06}
                  className="surface-panel p-5"
                >
                  <div className="space-y-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

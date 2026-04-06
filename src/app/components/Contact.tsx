import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { SITE_CONTENT } from "../../../constants";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <Reveal className="surface-panel overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <SectionTitle
              index="05"
              title={SITE_CONTENT.contactTitle}
              description={SITE_CONTENT.contactDescription}
              className="mb-0"
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.3rem] border border-border/70 bg-background/45 p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary/75">
                Preferred conversation
              </p>
              <p className="mt-3 text-base leading-7 text-foreground">
                Product teams, freelance projects, or internship roles that need
                dependable backend execution and practical delivery support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${SITE_CONTENT.email}`}>
                  Say hello
                  <Mail className="ml-2 size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                  <Download className="ml-2 size-4" />
                </a>
              </Button>
            </div>

            <a
              href={`mailto:${SITE_CONTENT.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              {SITE_CONTENT.email}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;

import type { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Reveal from "./Reveal";
import SpotlightSurface from "./interactive/SpotlightSurface";
import SectionTitle from "./SectionTitle";

interface WritingPreviewProps {
  posts: BlogPost[];
}

const WritingPreview = ({ posts }: WritingPreviewProps) => {
  return (
    <section className="py-24">
      <SectionTitle
        index="04"
        title="Latest writing on frontend and backend craft."
        description="A small archive of notes around modern React, Next.js, Tailwind, and practical implementation details."
      />

      {posts.length === 0 ? (
        <Reveal className="surface-panel p-6 sm:p-8">
          <p className="text-base leading-7 text-muted-foreground">
            No published notes yet. The archive is ready for future writing.
          </p>
        </Reveal>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal
              key={post.slug}
              delay={index * 0.06}
              className="h-full"
            >
              <SpotlightSurface className="h-full p-6 sm:p-8">
                <article className="relative flex h-full flex-col justify-between gap-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                    className="absolute inset-0 z-20 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  />

                  <div className="relative z-10 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 group-focus-within:text-foreground/85">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="size-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {post.readTime ? (
                        <span className="inline-flex items-center gap-2">
                          <Clock className="size-4" />
                          {post.readTime}
                        </span>
                      ) : null}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading text-3xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground transition-colors duration-200 group-hover:text-foreground/85 group-focus-within:text-foreground/85 sm:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-4">
                    {post.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="label-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5">
                      Read article
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              </SpotlightSurface>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default WritingPreview;

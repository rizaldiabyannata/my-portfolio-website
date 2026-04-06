import type { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Reveal from "./Reveal";
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
              className="surface-panel h-full p-6 sm:p-8"
            >
              <article className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                    <h3 className="font-heading text-3xl font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="label-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Read article
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default WritingPreview;

import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog | Portfolio",
  description: "Technical articles and implementation notes",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>

        <div className="surface-panel mb-8 p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl space-y-4">
            <span className="label-chip">Writing archive</span>
            <h1 className="font-heading text-5xl font-semibold text-foreground md:text-6xl">
              Technical notes and implementation breakdowns.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              A running archive of articles about modern React, Next.js,
              Tailwind, and the practical decisions behind building web
              products.
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="surface-panel py-16 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No published notes yet. The archive is ready for the first post.
            </p>
            <p className="text-sm text-muted-foreground">
              Add your first post in{" "}
              <code className="rounded-md bg-background/60 px-2 py-1 font-mono text-foreground">
                content/blog/
              </code>
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="surface-panel group flex h-full flex-col justify-between p-6 sm:p-8"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.readTime ? (
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>

                  {post.excerpt ? (
                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-base">
                      {post.excerpt}
                    </p>
                  ) : null}

                  {post.tags?.length ? (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="label-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Read article
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

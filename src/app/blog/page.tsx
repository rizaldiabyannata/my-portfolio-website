import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog | Portfolio",
  description: "Technical articles and insights",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[var(--color-text)] mb-4">
            Blog
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            Technical articles, tutorials, and insights
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-secondary)] text-lg mb-4">
              No blog posts yet. Check back soon!
            </p>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Add your first post in{" "}
              <code className="bg-[var(--color-surface)] px-2 py-1 rounded">
                content/blog/
              </code>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)] mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  {post.excerpt && (
                    <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import "highlight.js/styles/github-dark.css";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Blog`,
      description: post.excerpt,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const MDXContent = (await import(`@/../../content/blog/${slug}.mdx`)).default;

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-20 px-4">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </Link>

        <header className="mb-8 pb-8 border-b border-[var(--color-border)]">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-secondary)] mb-4">
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

            {post.author && (
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </article>
    </div>
  );
}

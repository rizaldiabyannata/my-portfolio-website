import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { extractBlogHeadings } from "@/lib/headings";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import BlogReaderShell from "./BlogReaderShell";
import BlogShareButton from "./BlogShareButton";

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
  const headings = extractBlogHeadings(post.content);

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-10">
      <article className="mx-auto max-w-7xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to archive</span>
        </Link>

        <header className="surface-panel mb-6 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <span className="label-chip">Technical note</span>

            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-semibold text-foreground md:text-6xl">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

              {post.author ? (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </span>
              ) : null}
            </div>

            {post.tags?.length ? (
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="label-chip">
                    {tag}
                  </span>
                ))}
                <div className="ml-auto">
                  <BlogShareButton title={post.title} />
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <BlogShareButton title={post.title} />
              </div>
            )}
          </div>
        </header>

        <BlogReaderShell headings={headings}>
          <div className="surface-panel p-6 sm:p-8 lg:p-10">
            <div className="article-prose max-w-none">
              <MDXContent />
            </div>
          </div>
        </BlogReaderShell>
      </article>
    </div>
  );
}

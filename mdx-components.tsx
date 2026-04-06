import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/mdx/CodeBlock";
import HeadingAnchor from "@/components/mdx/HeadingAnchor";
import { extractHeadingText, slugifyHeading } from "@/lib/headings";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-heading first:mt-0 mt-10 text-4xl font-semibold text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children, className, id, ...props }) => (
      <HeadingAnchor
        as="h2"
        id={id ?? slugifyHeading(extractHeadingText(children))}
        className={cn("font-heading mt-12 text-3xl font-semibold text-foreground", className)}
        {...props}
      >
        {children}
      </HeadingAnchor>
    ),
    h3: ({ children, className, id, ...props }) => (
      <HeadingAnchor
        as="h3"
        id={id ?? slugifyHeading(extractHeadingText(children))}
        className={cn("font-heading mt-10 text-2xl font-semibold text-foreground", className)}
        {...props}
      >
        {children}
      </HeadingAnchor>
    ),
    p: ({ children }) => (
      <p className="text-base leading-8 text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="ml-5 list-disc space-y-3 text-base leading-8 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-3 text-base leading-8 text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary/85"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="rounded-r-[1.2rem] border-l-4 border-primary bg-primary/8 px-5 py-4 text-base italic leading-8 text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <code className="rounded-md border border-border/70 bg-background/70 px-1.5 py-0.5 font-mono text-sm text-foreground">
            {children}
          </code>
        );
      }

      return (
        <code className={`${className} font-mono text-sm`}>{children}</code>
      );
    },
    pre: ({ children, className, ...props }) => (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto rounded-[1.2rem] border border-border/70">
        <table className="min-w-full border-collapse bg-background/45">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border/70 bg-card/80 px-4 py-3 text-left text-sm font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border/60 px-4 py-3 text-sm text-muted-foreground">
        {children}
      </td>
    ),
    hr: () => <hr className="my-10 border-border/70" />,
    ...components,
  };
}

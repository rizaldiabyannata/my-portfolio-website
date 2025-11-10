import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-[var(--color-primary)]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-6 text-[var(--color-text)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-5 text-[var(--color-text)]">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-[var(--color-text-secondary)]">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-[var(--color-text-secondary)]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-[var(--color-text-secondary)]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-[var(--color-primary)] hover:text-[var(--color-accent)] underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic my-4 text-[var(--color-text-secondary)]">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-[var(--color-surface)] text-[var(--color-accent)] px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="bg-[var(--color-surface)] p-4 rounded-lg overflow-x-auto mb-4 border border-[var(--color-border)]">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-[var(--color-border)]">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-[var(--color-border)] px-4 py-2 bg-[var(--color-surface)] font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-[var(--color-border)] px-4 py-2">
        {children}
      </td>
    ),
    hr: () => <hr className="my-8 border-[var(--color-border)]" />,
    ...components,
  };
}

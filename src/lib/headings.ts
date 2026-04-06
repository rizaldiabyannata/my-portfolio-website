import { isValidElement, type ReactNode } from "react";

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const STRIP_MARKDOWN_PATTERNS: Array<[RegExp, string]> = [
  [/!\[([^\]]*)\]\([^)]+\)/g, "$1"],
  [/\[([^\]]+)\]\([^)]+\)/g, "$1"],
  [/`([^`]+)`/g, "$1"],
  [/\*\*([^*]+)\*\*/g, "$1"],
  [/__([^_]+)__/g, "$1"],
  [/\*([^*]+)\*/g, "$1"],
  [/_([^_]+)_/g, "$1"],
  [/~~([^~]+)~~/g, "$1"],
  [/<[^>]+>/g, ""],
];

function stripInlineMarkdown(value: string) {
  return STRIP_MARKDOWN_PATTERNS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value
  );
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function extractHeadingText(value: ReactNode | string): string {
  if (typeof value === "string" || typeof value === "number") {
    return normalizeWhitespace(stripInlineMarkdown(String(value)));
  }

  if (Array.isArray(value)) {
    return normalizeWhitespace(value.map((item) => extractHeadingText(item)).join(" "));
  }

  if (isValidElement(value)) {
    return extractHeadingText(
      (value.props as { children?: ReactNode }).children ?? ""
    );
  }

  return "";
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['".,/#!$%^*;:{}=\_`~()?[\]+<>@|]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveHeadingId(text: string, seen: Map<string, number>) {
  const base = slugifyHeading(text) || "section";
  const nextCount = (seen.get(base) ?? 0) + 1;
  seen.set(base, nextCount);

  return nextCount === 1 ? base : `${base}-${nextCount}`;
}

export function extractBlogHeadings(content: string): BlogHeading[] {
  const seen = new Map<string, number>();
  const headings: BlogHeading[] = [];
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+)$/.exec(trimmed);

    if (!match) {
      continue;
    }

    const text = extractHeadingText(match[2]);

    if (!text) {
      continue;
    }

    headings.push({
      id: resolveHeadingId(text, seen),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}

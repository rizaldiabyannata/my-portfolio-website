"use client";

import { copyTextToClipboard } from "@/lib/client-clipboard";
import { cn } from "@/lib/utils";
import { Check, Link2 } from "lucide-react";
import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

interface HeadingAnchorProps extends ComponentPropsWithoutRef<"h2"> {
  as: "h2" | "h3";
  id: string;
  children: ReactNode;
}

export default function HeadingAnchor({
  as,
  id,
  children,
  className,
  ...props
}: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false);
  const Component = as as ElementType;

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${id}`;
    const didCopy = await copyTextToClipboard(url);
    setCopied(didCopy);
  };

  return (
    <Component id={id} className={cn("group/heading scroll-mt-32", className)} {...props}>
      <span className="inline-flex max-w-full items-start gap-3">
        <span>{children}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground transition-[border-color,background-color,color,opacity] duration-200 hover:border-primary/45 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 opacity-100 sm:opacity-0 sm:group-hover/heading:opacity-100 sm:group-focus-within/heading:opacity-100"
          aria-label={copied ? "Section link copied" : "Copy section link"}
        >
          {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        </button>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Section link copied to clipboard" : ""}
      </span>
    </Component>
  );
}

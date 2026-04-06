"use client";

import { copyTextToClipboard } from "@/lib/client-clipboard";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import {
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

function extractCodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((value) => extractCodeText(value)).join("");
  }

  if (isValidElement(node)) {
    return extractCodeText((node.props as { children?: ReactNode }).children ?? "");
  }

  return "";
}

export default function CodeBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);

  const rawCode = useMemo(
    () => extractCodeText(children).replace(/\n$/, ""),
    [children]
  );

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    const didCopy = await copyTextToClipboard(rawCode);
    setCopied(didCopy);
  };

  return (
    <div className="group/code relative">
      <pre
        className={cn(
          "overflow-x-auto rounded-[1.4rem] border border-border/70 bg-[#0b1120] p-5 pr-16 text-sm text-slate-100 shadow-xl shadow-black/20",
          "[&>code]:block [&>code]:min-w-full [&>code]:font-mono [&>code]:text-sm",
          className
        )}
        {...props}
      >
        {children}
      </pre>

      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2">
        <span className="sr-only" aria-live="polite">
          {copied ? "Code copied to clipboard" : ""}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-xs font-medium text-slate-100 transition-[border-color,background-color,color,opacity] duration-200 hover:border-primary/50 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120] sm:opacity-0 sm:group-hover/code:opacity-100 sm:group-focus-within/code:opacity-100"
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}

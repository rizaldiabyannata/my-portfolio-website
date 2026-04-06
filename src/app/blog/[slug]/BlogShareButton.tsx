"use client";

import { Button } from "@/components/ui/button";
import { copyTextToClipboard } from "@/lib/client-clipboard";
import { Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogShareButtonProps {
  title: string;
}

export default function BlogShareButton({ title }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        return;
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return;
      }
    }

    const didCopy = await copyTextToClipboard(url);
    setCopied(didCopy);
  };

  return (
    <Button
      type="button"
      variant="brand"
      size="sm"
      onClick={handleShare}
      aria-label={copied ? "Article link copied" : "Share article"}
    >
      {copied ? <Check className="mr-2 size-4" /> : <Share2 className="mr-2 size-4" />}
      {copied ? "Link copied" : "Share note"}
    </Button>
  );
}

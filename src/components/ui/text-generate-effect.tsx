"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration: duration ?? 1, delay: stagger(0.15) }
    );
  }, [animate, filter, duration]);

  return (
    <div className={cn("font-mono", className)}>
      <motion.div ref={scope} className="leading-relaxed tracking-wide">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0 inline-block text-muted-foreground dark:text-foreground"
            style={{ filter: filter ? "blur(10px)" : "none" }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

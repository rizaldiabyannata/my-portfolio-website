"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
}

const Reveal = ({ children, className, delay = 0, y = 28 }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface HoverItem {
  title: string;
  description?: string;
  link?: string;
  icon?: React.ReactNode;
}

interface HoverEffectProps {
  items: HoverItem[];
  className?: string;
  cardClassName?: string;
  showDescription?: boolean; // allow hiding empty descriptions (skills)
}

export const HoverEffect = ({
  items,
  className,
  cardClassName,
  showDescription = true,
}: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("relative grid gap-4", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link || "#"}
          key={item.title + idx}
          className="relative group block p-2 h-full w-full skill-item"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-accent/60 dark:bg-accent/10 rounded-2xl ring-1 ring-border block"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <HoverCard className={cardClassName}>
            {item.icon && (
              <div className="text-brand w-10 h-10 mb-2 flex items-center justify-center">
                {item.icon}
              </div>
            )}
            <HoverCardTitle>{item.title}</HoverCardTitle>
            {showDescription && item.description ? (
              <HoverCardDescription>{item.description}</HoverCardDescription>
            ) : null}
          </HoverCard>
        </a>
      ))}
    </div>
  );
};

export const HoverCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-10 rounded-2xl h-full w-full overflow-hidden border border-border bg-card/70 backdrop-blur-sm transition-colors group-hover:border-brand/60 p-4",
        className
      )}
    >
      <div className="relative z-20 flex flex-col">{children}</div>
    </div>
  );
};
export const HoverCardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn("text-foreground font-semibold tracking-wide", className)}
    >
      {children}
    </h4>
  );
};
export const HoverCardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-muted-foreground tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

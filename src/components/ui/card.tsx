import * as React from "react";
import { cn } from "@/lib/utils";

// Using a type alias instead of an empty interface to satisfy @typescript-eslint/no-empty-object-type
export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-border/80 bg-card/80 shadow-xl shadow-black/5 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-200 ease-out dark:shadow-black/30",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 flex items-start justify-between gap-4", className)}
      {...props}
    />
  );
}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-semibold text-foreground", className)} {...props} />
  );
}
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 pb-6 text-muted-foreground", className)}
      {...props}
    />
  );
}
export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

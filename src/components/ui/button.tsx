import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border text-sm font-medium ring-offset-background transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92",
        secondary:
          "border-border/80 bg-card/80 text-foreground hover:bg-card",
        outline:
          "border-border/80 bg-background/40 text-foreground hover:border-primary/50 hover:bg-accent/60",
        ghost: "border-transparent text-foreground hover:bg-accent/70",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "border-primary/35 bg-primary/10 text-primary hover:border-primary/55 hover:bg-primary/16",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4",
        lg: "h-12 px-7 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  glass: "liquid-glass-strong text-white hover:text-white",
  white: "bg-white text-black hover:bg-white/90",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

export const Button = React.forwardRef(
  ({ className, variant = "glass", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

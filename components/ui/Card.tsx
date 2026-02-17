import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white transition-all",
          variant === "default"
            ? "border border-border rounded-sm p-6 shadow-sm hover:shadow"
            : "p-6",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export default Card;


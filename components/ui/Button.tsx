import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-primary text-neutral-light hover:bg-primary-light active:scale-[0.98]":
          variant === "primary",
        "bg-accent text-primary-dark hover:bg-accent-light active:scale-[0.98]":
          variant === "secondary",
        "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-neutral-light":
          variant === "outline",
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
      },
      className
    );

    if (asChild) {
      if (href) {
        return (
          <Link href={href} className={baseClasses}>
            {children}
          </Link>
        );
      }
      // If asChild is true but no href, clone the child and add className
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          className: cn(baseClasses, (children as React.ReactElement<any>).props.className),
        });
      }
    }

    return (
      <button className={baseClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;


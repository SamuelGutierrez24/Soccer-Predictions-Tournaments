import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        secondary: "bg-secondary/20",
        blue: "bg-blue-200",
        gray: "bg-gray-200"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        blue: "bg-blue-600",
        gray: "bg-gray-500"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CustomProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  indicatorClassName?: string;
  containerClassName?: string;
  indicatorVariant?: VariantProps<typeof indicatorVariants>["variant"];
}

const CustomProgress = React.forwardRef<HTMLDivElement, CustomProgressProps>(
  ({ 
    className, 
    value = 0, 
    variant, 
    indicatorClassName, 
    containerClassName = "",
    indicatorVariant,
    ...props 
  }, ref) => {
    return (
      <div className={`w-full flex items-center justify-center ${containerClassName}`}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          className={cn(progressVariants({ variant }), className)}
          {...props}
        >
          <div
            className={cn(
              indicatorVariants({ variant: indicatorVariant || variant }), 
              indicatorClassName
            )}
            style={{ transform: `translateX(-${100 - value}%)` }}
          />
        </div>
      </div>
    );
  }
);

CustomProgress.displayName = "CustomProgress";

export { CustomProgress };
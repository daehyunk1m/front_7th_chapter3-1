import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold font-[Arial,sans-serif] whitespace-nowrap border-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        danger: "bg-danger text-danger-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground",
      },
      size: {
        small: "px-1 py-0 text-[0.625rem] h-4 leading-4",
        medium: "px-2 py-0 text-[0.75rem] h-5 leading-5",
        large: "px-[10px] py-0 text-[0.8125rem] h-6 leading-6",
      },
      pill: {
        true: "rounded-[10px]",
        false: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      pill: false,
    },
  }
)

function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "default" | "bordered" | "elevated" | "flat";
  headerActions?: React.ReactNode;
}

const cardVariants = cva("rounded mb-4 overflow-hidden bg-background font-sans", {
  variants: {
    variant: {
      default:
        "border border-black/12 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]",
      bordered: "border border-black/12 shadow-none",
      elevated:
        "border border-black/8 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.12),0px_1px_2px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.08)]",
      flat: "border border-black/8 shadow-none bg-muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = "default",
  headerActions,
}) => {
  return (
    <ShadcnCard className={cn(cardVariants({ variant }))}>
      {(title || subtitle || headerActions) && (
        <CardHeader className='p-5 border-b border-black/8 flex justify-between items-center'>
          <div>
            {title && (
              <CardTitle className='m-0 text-lg font-medium leading-relaxed text-black/87'>
                {title}
              </CardTitle>
            )}
            {subtitle && (
              <CardDescription className='mt-1 mb-0 text-sm font-normal leading-snug text-black/60'>
                {subtitle}
              </CardDescription>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </CardHeader>
      )}
      <CardContent className='p-5'>{children}</CardContent>
    </ShadcnCard>
  );
};

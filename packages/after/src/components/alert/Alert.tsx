import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { InfoIcon, TriangleAlertIcon, CheckIcon, XIcon, CircleIcon } from "lucide-react";

const alertVariants = cva(
  "py-2.5 px-3 mb-4 rounded-sm border font-sans flex gap-2 items-start",
  {
    variants: {
      variant: {
        default: "bg-muted border-muted-border text-foreground",
        info: "bg-info-light border-info-border text-info-text",
        success: "bg-success-light border-success-border text-success-text",
        warning: "bg-warning-light border-warning-border text-warning-text",
        error: "bg-danger-light border-danger-border text-danger-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const variantIcons = {
  default: CircleIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: TriangleAlertIcon,
  error: XIcon,
} as const;

interface AlertProps extends VariantProps<typeof alertVariants> {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  title,
  onClose,
  showIcon = true,
}) => {
  const IconComponent = variantIcons[variant ?? "default"];

  return (
    <div className={cn(alertVariants({ variant }))}>
      {showIcon && <div className='text-xl shrink-0'><IconComponent /></div>}
      <div className='flex-1'>
        {title && <div className='font-bold mb-1 text-[15px]'>{title}</div>}
        <div className='text-sm leading-normal'>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className='bg-transparent border-none cursor-pointer text-xl px-1 ml-auto shrink-0 hover:opacity-70'
        >
          <XIcon />
        </button>
      )}
    </div>
  );
};

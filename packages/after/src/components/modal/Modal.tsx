import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";

const modalVariants = cva(
  [
    // 기본 스타일 리셋
    "p-0 gap-0 border-none",
    // 커스텀 스타일
    "bg-background rounded-lg shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]",
    "w-full max-h-[90vh] flex flex-col",
  ],
  {
    variants: {
      size: {
        small: "max-w-[400px]",
        medium: "max-w-[600px]",
        large: "max-w-[900px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showFooter = false,
  footerContent,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(modalVariants({ size }))}
        showCloseButton={false}
        aria-describedby={undefined}
      >
        {title && (
          <DialogHeader className='px-6 py-4 border-b border-black/12 flex flex-row justify-between items-center'>
            <DialogTitle className='m-0 text-xl font-medium text-black/87'>{title}</DialogTitle>
            <DialogClose className='bg-transparent border-none text-[28px] leading-none text-black/54 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/4'>
              ×
            </DialogClose>
          </DialogHeader>
        )}
        <div className='p-6 overflow-y-auto flex-1'>{children}</div>
        {showFooter && footerContent && (
          <DialogFooter className='px-6 py-4 border-t border-black/12 flex gap-2 justify-end'>
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

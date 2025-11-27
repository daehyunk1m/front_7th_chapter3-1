import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

const sizeClasses = {
  small: 'max-w-[400px]',
  medium: 'max-w-[600px]',
  large: 'max-w-[900px]',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-background rounded shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]",
          "w-full max-h-[90vh] flex flex-col",
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-black/12 flex justify-between items-center">
            <h3 className="m-0 text-xl font-medium text-black/87">{title}</h3>
            <button
              className="bg-transparent border-none text-[28px] leading-none text-black/54 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/4"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
        {showFooter && footerContent && (
          <div className="px-6 py-4 border-t border-black/12 flex gap-2 justify-end">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

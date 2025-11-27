import React from 'react';
import { cn } from '@/lib/utils';

// Alert - Different styling approach with inconsistent variants
interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

const variantStyles = {
  info: 'bg-info-light border-info-border text-info-text',
  success: 'bg-success-light border-success-border text-success-text',
  warning: 'bg-warning-light border-warning-border text-warning-text',
  error: 'bg-danger-light border-danger-border text-danger-text',
  default: 'bg-muted border-muted-border text-foreground',
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return '•';
    }
  };

  return (
    <div
      className={cn(
        "py-2.5 px-3 mb-4 rounded-sm border font-sans flex gap-2 items-start",
        variantStyles[variant]
      )}
    >
      {showIcon && <div className="text-xl shrink-0">{getIcon()}</div>}
      <div className="flex-1">
        {title && <div className="font-bold mb-1 text-[15px]">{title}</div>}
        <div className="text-sm leading-normal">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="bg-transparent border-none cursor-pointer text-xl px-1 ml-auto shrink-0 hover:opacity-70"
        >
          ×
        </button>
      )}
    </div>
  );
};

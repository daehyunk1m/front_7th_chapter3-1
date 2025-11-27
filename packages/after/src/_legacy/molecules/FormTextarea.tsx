import React from 'react';
import { cn } from '@/lib/utils';

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1.5 text-foreground text-[13px] font-bold font-sans">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          "w-full min-h-[6em] px-3.5 py-4 text-base font-sans font-normal leading-tight text-foreground",
          "border border-border rounded bg-background box-border resize-y outline-none",
          "transition-colors duration-200",
          "focus:border-primary focus:border-2 focus:px-[13px] focus:py-[15px]",
          "disabled:bg-muted/50",
          error && "border-danger"
        )}
      />

      {error && (
        <span className="block mt-1 text-xs font-sans text-danger">{error}</span>
      )}
      {helpText && !error && (
        <span className="block mt-1 text-xs font-sans text-muted-foreground">{helpText}</span>
      )}
    </div>
  );
};

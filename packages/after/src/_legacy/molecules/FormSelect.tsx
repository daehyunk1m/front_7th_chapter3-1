import React from 'react';
import { cn } from '@/lib/utils';

// Select Component - Inconsistent with Input component
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
}) => {
  void size; // Keep for API consistency but not used in rendering

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1.5 text-foreground text-[13px] font-bold font-sans">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(
          "w-full px-2.5 py-2 text-sm font-sans text-foreground border border-border rounded-sm bg-background box-border",
          "focus:border-primary focus:outline-none",
          "disabled:bg-muted disabled:cursor-not-allowed",
          error && "border-danger"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="block mt-1 text-xs font-sans text-danger">{error}</span>
      )}
      {helpText && !error && (
        <span className="block mt-1 text-xs font-sans text-muted-foreground">{helpText}</span>
      )}
    </div>
  );
};
